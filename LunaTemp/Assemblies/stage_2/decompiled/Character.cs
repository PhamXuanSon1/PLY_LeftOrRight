using System;
using System.Collections.Generic;
using Spine;
using Spine.Unity;
using UnityEngine;

[ExecuteAlways]
public class Character : Ply_GameUnit
{
	[SerializeField]
	protected SkeletonAnimation skeletonAnimation;

	private Skin customSkin;

	[SerializeField]
	[HideInInspector]
	private List<SlotAttachmentPair> currentAppliedPairs = new List<SlotAttachmentPair>();

	[SerializeField]
	[HideInInspector]
	public List<string> currentAppliedSkinNames = new List<string>();

	private Dictionary<string, string> forcedAttachments = new Dictionary<string, string>();

	private List<string> forcedAttachmentKeys = new List<string>();

	private bool isSkinAppliedAtRuntime = false;

	public SkeletonAnimation SkeletonAnimation => skeletonAnimation;

	private void OnEnable()
	{
		if (skeletonAnimation != null)
		{
			skeletonAnimation.OnRebuild -= OnSkeletonRebuild;
			skeletonAnimation.OnRebuild += OnSkeletonRebuild;
		}
	}

	private void OnDisable()
	{
		if (skeletonAnimation != null)
		{
			skeletonAnimation.OnRebuild -= OnSkeletonRebuild;
		}
	}

	private void OnSkeletonRebuild(SkeletonRenderer renderer)
	{
		bool hasSkins = currentAppliedSkinNames != null && currentAppliedSkinNames.Count > 0;
		bool hasPairs = currentAppliedPairs != null && currentAppliedPairs.Count > 0;
		if (hasSkins || hasPairs)
		{
			ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
		}
	}

	protected virtual void Update()
	{
		if (Application.isPlaying && !isSkinAppliedAtRuntime && skeletonAnimation != null && skeletonAnimation.Skeleton != null)
		{
			skeletonAnimation.OnMeshAndMaterialsUpdated += OnSpineMeshUpdated;
			bool hasSkins = currentAppliedSkinNames != null && currentAppliedSkinNames.Count > 0;
			bool hasPairs = currentAppliedPairs != null && currentAppliedPairs.Count > 0;
			if (hasSkins || hasPairs)
			{
				ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
				skeletonAnimation.LateUpdate();
			}
			isSkinAppliedAtRuntime = true;
		}
	}

	private void OnSpineMeshUpdated(SkeletonRenderer renderer)
	{
		MeshFilter meshFilter = renderer.GetComponent<MeshFilter>();
		if (meshFilter != null && meshFilter.sharedMesh != null)
		{
			meshFilter.sharedMesh.bounds = new Bounds(Vector3.zero, Vector3.one * 1000f);
		}
	}

	public void MixSkinsAndAttachments(List<string> skinNames, List<SlotAttachmentPair> attachmentPairs)
	{
		currentAppliedSkinNames = new List<string>(skinNames ?? new List<string>());
		currentAppliedPairs = new List<SlotAttachmentPair>();
		if (attachmentPairs != null)
		{
			for (int i = 0; i < attachmentPairs.Count; i++)
			{
				currentAppliedPairs.Add(new SlotAttachmentPair
				{
					isEnabled = attachmentPairs[i].isEnabled,
					slotName = attachmentPairs[i].slotName,
					attachmentName = attachmentPairs[i].attachmentName,
					skeletonDataAsset = attachmentPairs[i].skeletonDataAsset
				});
			}
		}
		ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
	}

	private void ApplySkinsAndAttachmentsMix(List<string> skinNames, List<SlotAttachmentPair> pairs)
	{
		if (skeletonAnimation == null || skeletonAnimation.Skeleton == null)
		{
			return;
		}
		Skeleton skeleton = skeletonAnimation.Skeleton;
		SkeletonData skeletonData = skeleton.Data;
		customSkin = new Skin("custom-mix");
		if (skeletonData.DefaultSkin != null)
		{
			customSkin.AddSkin(skeletonData.DefaultSkin);
		}
		HashSet<string> addedSkinNames = new HashSet<string>();
		if (skinNames != null)
		{
			for (int k = 0; k < skinNames.Count; k++)
			{
				string skinName = skinNames[k];
				if (!string.IsNullOrEmpty(skinName))
				{
					Skin foundSkin = skeletonData.FindSkin(skinName);
					if (foundSkin != null && !addedSkinNames.Contains(foundSkin.Name))
					{
						customSkin.AddSkin(foundSkin);
						addedSkinNames.Add(foundSkin.Name);
					}
				}
			}
		}
		if (pairs != null)
		{
			for (int j = 0; j < pairs.Count; j++)
			{
				SlotAttachmentPair pair2 = pairs[j];
				if (!pair2.isEnabled || string.IsNullOrEmpty(pair2.attachmentName))
				{
					continue;
				}
				SlotData slotData = skeletonData.FindSlot(pair2.slotName);
				if (slotData == null)
				{
					continue;
				}
				int slotIndex = slotData.Index;
				for (int s = 0; s < skeletonData.Skins.Count; s++)
				{
					Skin skin = skeletonData.Skins.Items[s];
					Attachment attachment = skin.GetAttachment(slotIndex, pair2.attachmentName);
					if (attachment != null)
					{
						if (!addedSkinNames.Contains(skin.Name))
						{
							customSkin.AddSkin(skin);
							addedSkinNames.Add(skin.Name);
						}
						break;
					}
				}
			}
		}
		skeleton.SetSkin(customSkin);
		skeleton.SetSlotsToSetupPose();
		if (pairs != null)
		{
			for (int i = 0; i < pairs.Count; i++)
			{
				SlotAttachmentPair pair = pairs[i];
				if (string.IsNullOrEmpty(pair.slotName))
				{
					continue;
				}
				try
				{
					if (pair.isEnabled && !string.IsNullOrEmpty(pair.attachmentName))
					{
						skeleton.SetAttachment(pair.slotName, pair.attachmentName);
						if (!forcedAttachments.ContainsKey(pair.slotName))
						{
							forcedAttachmentKeys.Add(pair.slotName);
						}
						forcedAttachments[pair.slotName] = pair.attachmentName;
					}
					else
					{
						skeleton.SetAttachment(pair.slotName, null);
						if (!forcedAttachments.ContainsKey(pair.slotName))
						{
							forcedAttachmentKeys.Add(pair.slotName);
						}
						forcedAttachments[pair.slotName] = null;
					}
				}
				catch (Exception)
				{
				}
			}
		}
		if (skeletonAnimation.AnimationState != null)
		{
			skeletonAnimation.AnimationState.Apply(skeleton);
		}
		if (!Application.isPlaying)
		{
			skeletonAnimation.LateUpdate();
		}
	}

	public void EquipFromSlotAttachmentPairs(List<SlotAttachmentPair> pairs, bool saveState = true)
	{
		if (skeletonAnimation == null || skeletonAnimation.Skeleton == null || pairs == null)
		{
			return;
		}
		if (saveState)
		{
			currentAppliedPairs = new List<SlotAttachmentPair>();
			for (int i = 0; i < pairs.Count; i++)
			{
				currentAppliedPairs.Add(new SlotAttachmentPair
				{
					isEnabled = pairs[i].isEnabled,
					slotName = pairs[i].slotName,
					attachmentName = pairs[i].attachmentName,
					skeletonDataAsset = pairs[i].skeletonDataAsset
				});
			}
		}
		Skeleton skeleton = skeletonAnimation.Skeleton;
		SkeletonData skeletonData = skeleton.Data;
		customSkin = new Skin("custom-mix");
		if (skeletonData.DefaultSkin != null)
		{
			customSkin.AddSkin(skeletonData.DefaultSkin);
		}
		HashSet<string> addedSkinNames = new HashSet<string>();
		for (int k = 0; k < pairs.Count; k++)
		{
			SlotAttachmentPair pair = pairs[k];
			if (!pair.isEnabled || string.IsNullOrEmpty(pair.attachmentName))
			{
				continue;
			}
			SlotData slotData = skeletonData.FindSlot(pair.slotName);
			if (slotData == null)
			{
				continue;
			}
			int slotIndex = slotData.Index;
			for (int s = 0; s < skeletonData.Skins.Count; s++)
			{
				Skin skin = skeletonData.Skins.Items[s];
				Attachment attachment = skin.GetAttachment(slotIndex, pair.attachmentName);
				if (attachment != null)
				{
					if (!addedSkinNames.Contains(skin.Name))
					{
						customSkin.AddSkin(skin);
						addedSkinNames.Add(skin.Name);
					}
					break;
				}
			}
		}
		skeleton.SetSkin(customSkin);
		skeleton.SetSlotsToSetupPose();
		for (int j = 0; j < pairs.Count; j++)
		{
			SlotAttachmentPair pair2 = pairs[j];
			if (string.IsNullOrEmpty(pair2.slotName))
			{
				continue;
			}
			if (pair2.isEnabled && !string.IsNullOrEmpty(pair2.attachmentName))
			{
				try
				{
					skeleton.SetAttachment(pair2.slotName, pair2.attachmentName);
					if (!forcedAttachments.ContainsKey(pair2.slotName))
					{
						forcedAttachmentKeys.Add(pair2.slotName);
					}
					forcedAttachments[pair2.slotName] = pair2.attachmentName;
				}
				catch (Exception)
				{
				}
				continue;
			}
			try
			{
				skeleton.SetAttachment(pair2.slotName, null);
				if (!forcedAttachments.ContainsKey(pair2.slotName))
				{
					forcedAttachmentKeys.Add(pair2.slotName);
				}
				forcedAttachments[pair2.slotName] = null;
			}
			catch (Exception)
			{
			}
		}
		if (skeletonAnimation.AnimationState != null)
		{
			skeletonAnimation.AnimationState.Apply(skeleton);
		}
	}

	public void TurnSlotAttachment(string slotName, string attachmentName = null)
	{
		try
		{
			if (string.IsNullOrEmpty(attachmentName))
			{
				skeletonAnimation.Skeleton.SetAttachment(slotName, null);
			}
			else
			{
				Slot slot = skeletonAnimation.Skeleton.FindSlot(slotName);
				if (slot != null)
				{
					int slotIndex = slot.Data.Index;
					Attachment attachment = skeletonAnimation.Skeleton.GetAttachment(slotIndex, attachmentName);
					if (attachment == null)
					{
						return;
					}
					skeletonAnimation.Skeleton.SetAttachment(slotName, attachmentName);
				}
			}
			if (!forcedAttachments.ContainsKey(slotName))
			{
				forcedAttachmentKeys.Add(slotName);
			}
			forcedAttachments[slotName] = attachmentName;
		}
		catch (Exception e)
		{
			Debug.LogWarning("[TurnSlotAttachment] Lỗi khi set attachment '" + attachmentName + "' cho slot '" + slotName + "': " + e.Message);
		}
	}

	public void TurnOnSlotsAttachment(List<SlotAttachmentPair> slotAttachmentPairs)
	{
		for (int i = 0; i < slotAttachmentPairs.Count; i++)
		{
			SlotAttachmentPair pair = slotAttachmentPairs[i];
			TurnSlotAttachment(pair.slotName, pair.attachmentName);
		}
	}

	public void TurnOffSlotsAttachment(List<SlotAttachmentPair> slotAttachmentPairs)
	{
		for (int i = 0; i < slotAttachmentPairs.Count; i++)
		{
			SlotAttachmentPair pair = slotAttachmentPairs[i];
			TurnSlotAttachment(pair.slotName);
		}
	}

	public void TurnOffSlot(string slotName)
	{
		TurnSlotAttachment(slotName);
	}

	public void TurnOnSlotWithAttachment(string combinedString)
	{
		if (!string.IsNullOrEmpty(combinedString))
		{
			string[] parts = combinedString.Split(',');
			if (parts.Length == 2)
			{
				TurnSlotAttachment(parts[0].Trim(), parts[1].Trim());
			}
			else
			{
				Debug.LogWarning("[TurnOnSlotWithAttachment] Nhập sai định dạng. Vui lòng nhập kiểu 'SlotName,AttachmentName'. Của bạn là: " + combinedString);
			}
		}
	}

	public void SetAlphaSlotName(string slotName, float alphaSlotName)
	{
		Slot slot = skeletonAnimation.Skeleton.FindSlot(slotName);
		if (slot != null)
		{
			slot.A = alphaSlotName;
		}
		else
		{
			Debug.LogWarning("Slot " + slotName + " not found in skeleton.");
		}
	}
}
