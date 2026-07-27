using System;
using System.Collections.Generic;
using UnityEngine;

namespace Spine.Unity
{
	[Serializable]
	public class BlendModeMaterials
	{
		[Serializable]
		public class ReplacementMaterial
		{
			public string pageName;

			public Material material;
		}

		[Serializable]
		public class TemplateMaterials
		{
			public Material additiveTemplate;

			public Material multiplyTemplate;

			public Material screenTemplate;
		}

		public delegate bool CreateForRegionDelegate(ref List<ReplacementMaterial> replacementMaterials, ref bool anyReplacementMaterialsChanged, AtlasRegion originalRegion, Material materialTemplate, string materialSuffix, SkeletonDataAsset skeletonDataAsset);

		public const string MATERIAL_SUFFIX_MULTIPLY = "-Multiply";

		public const string MATERIAL_SUFFIX_SCREEN = "-Screen";

		public const string MATERIAL_SUFFIX_ADDITIVE = "-Additive";

		[SerializeField]
		[HideInInspector]
		protected bool requiresBlendModeMaterials = false;

		public bool applyAdditiveMaterial = false;

		public List<ReplacementMaterial> additiveMaterials = new List<ReplacementMaterial>();

		public List<ReplacementMaterial> multiplyMaterials = new List<ReplacementMaterial>();

		public List<ReplacementMaterial> screenMaterials = new List<ReplacementMaterial>();

		public bool RequiresBlendModeMaterials
		{
			get
			{
				return requiresBlendModeMaterials;
			}
			set
			{
				requiresBlendModeMaterials = value;
			}
		}

		public BlendMode BlendModeForMaterial(Material material)
		{
			foreach (ReplacementMaterial pair3 in multiplyMaterials)
			{
				if (pair3.material == material)
				{
					return BlendMode.Multiply;
				}
			}
			foreach (ReplacementMaterial pair2 in additiveMaterials)
			{
				if (pair2.material == material)
				{
					return BlendMode.Additive;
				}
			}
			foreach (ReplacementMaterial pair in screenMaterials)
			{
				if (pair.material == material)
				{
					return BlendMode.Screen;
				}
			}
			return BlendMode.Normal;
		}

		public bool UpdateBlendmodeMaterialsRequiredState(SkeletonData skeletonData)
		{
			requiresBlendModeMaterials = false;
			if (skeletonData == null)
			{
				return false;
			}
			List<Skin.SkinEntry> skinEntries = new List<Skin.SkinEntry>();
			SlotData[] slotsItems = skeletonData.Slots.Items;
			int slotIndex = 0;
			for (int slotCount = skeletonData.Slots.Count; slotIndex < slotCount; slotIndex++)
			{
				SlotData slot = slotsItems[slotIndex];
				if (slot.BlendMode == BlendMode.Normal || (!applyAdditiveMaterial && slot.BlendMode == BlendMode.Additive))
				{
					continue;
				}
				skinEntries.Clear();
				foreach (Skin skin in skeletonData.Skins)
				{
					skin.GetAttachments(slotIndex, skinEntries);
				}
				foreach (Skin.SkinEntry item in skinEntries)
				{
					if (item.Attachment is IHasTextureRegion)
					{
						requiresBlendModeMaterials = true;
						return true;
					}
				}
			}
			return false;
		}

		public static bool CreateAndAssignMaterials(SkeletonDataAsset skeletonDataAsset, TemplateMaterials templateMaterials, ref bool anyReplacementMaterialsChanged)
		{
			return CreateAndAssignMaterials(skeletonDataAsset, templateMaterials, ref anyReplacementMaterialsChanged, delegate(SkeletonDataAsset asset)
			{
				asset.Clear();
			}, null, CreateForRegion);
		}

		public static bool CreateAndAssignMaterials(SkeletonDataAsset skeletonDataAsset, TemplateMaterials templateMaterials, ref bool anyReplacementMaterialsChanged, Action<SkeletonDataAsset> clearSkeletonDataAssetFunc, Action<SkeletonDataAsset> afterAssetModifiedFunc, CreateForRegionDelegate createForRegionFunc)
		{
			bool anyCreationFailed = false;
			BlendModeMaterials blendModeMaterials = skeletonDataAsset.blendModeMaterials;
			bool applyAdditiveMaterial = blendModeMaterials.applyAdditiveMaterial;
			List<Skin.SkinEntry> skinEntries = new List<Skin.SkinEntry>();
			clearSkeletonDataAssetFunc(skeletonDataAsset);
			skeletonDataAsset.isUpgradingBlendModeMaterials = true;
			SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
			SlotData[] slotsItems = skeletonData.Slots.Items;
			int slotIndex = 0;
			for (int slotCount = skeletonData.Slots.Count; slotIndex < slotCount; slotIndex++)
			{
				SlotData slot = slotsItems[slotIndex];
				if (slot.BlendMode == BlendMode.Normal || (!applyAdditiveMaterial && slot.BlendMode == BlendMode.Additive))
				{
					continue;
				}
				List<ReplacementMaterial> replacementMaterials = null;
				Material materialTemplate = null;
				string materialSuffix = null;
				switch (slot.BlendMode)
				{
				case BlendMode.Multiply:
					replacementMaterials = blendModeMaterials.multiplyMaterials;
					materialTemplate = templateMaterials.multiplyTemplate;
					materialSuffix = "-Multiply";
					break;
				case BlendMode.Screen:
					replacementMaterials = blendModeMaterials.screenMaterials;
					materialTemplate = templateMaterials.screenTemplate;
					materialSuffix = "-Screen";
					break;
				case BlendMode.Additive:
					replacementMaterials = blendModeMaterials.additiveMaterials;
					materialTemplate = templateMaterials.additiveTemplate;
					materialSuffix = "-Additive";
					break;
				}
				skinEntries.Clear();
				foreach (Skin skin in skeletonData.Skins)
				{
					skin.GetAttachments(slotIndex, skinEntries);
				}
				foreach (Skin.SkinEntry item in skinEntries)
				{
					if (!(item.Attachment is IHasTextureRegion renderableAttachment))
					{
						continue;
					}
					AtlasRegion originalRegion = (AtlasRegion)renderableAttachment.Region;
					if (originalRegion != null)
					{
						anyCreationFailed |= createForRegionFunc(ref replacementMaterials, ref anyReplacementMaterialsChanged, originalRegion, materialTemplate, materialSuffix, skeletonDataAsset);
						continue;
					}
					Sequence sequence = renderableAttachment.Sequence;
					if (sequence != null && sequence.Regions != null)
					{
						int i = 0;
						for (int count = sequence.Regions.Length; i < count; i++)
						{
							originalRegion = (AtlasRegion)sequence.Regions[i];
							anyCreationFailed |= createForRegionFunc(ref replacementMaterials, ref anyReplacementMaterialsChanged, originalRegion, materialTemplate, materialSuffix, skeletonDataAsset);
						}
					}
				}
			}
			skeletonDataAsset.isUpgradingBlendModeMaterials = false;
			afterAssetModifiedFunc?.Invoke(skeletonDataAsset);
			return !anyCreationFailed;
		}

		protected static bool CreateForRegion(ref List<ReplacementMaterial> replacementMaterials, ref bool anyReplacementMaterialsChanged, AtlasRegion originalRegion, Material materialTemplate, string materialSuffix, SkeletonDataAsset skeletonDataAsset)
		{
			bool anyCreationFailed = false;
			if (!replacementMaterials.Exists((ReplacementMaterial replacement) => replacement.pageName == originalRegion.page.name))
			{
				ReplacementMaterial replacement2 = CreateReplacementMaterial(originalRegion, materialTemplate, materialSuffix);
				if (replacement2 != null)
				{
					replacementMaterials.Add(replacement2);
					anyReplacementMaterialsChanged = true;
				}
				else
				{
					Debug.LogError($"Failed creating blend mode Material for SkeletonData asset '{skeletonDataAsset.name}', atlas page '{originalRegion.page.name}', template '{materialTemplate.name}'.", skeletonDataAsset);
					anyCreationFailed = true;
				}
			}
			return anyCreationFailed;
		}

		protected static ReplacementMaterial CreateReplacementMaterial(AtlasRegion originalRegion, Material materialTemplate, string materialSuffix)
		{
			ReplacementMaterial newReplacement = new ReplacementMaterial();
			AtlasPage originalPage = originalRegion.page;
			Material originalMaterial = originalPage.rendererObject as Material;
			newReplacement.pageName = originalPage.name;
			Material blendModeMaterial = (newReplacement.material = new Material(materialTemplate)
			{
				name = originalMaterial.name + " " + materialTemplate.name,
				mainTexture = originalMaterial.mainTexture
			});
			if ((bool)newReplacement.material)
			{
				return newReplacement;
			}
			return null;
		}

		public void ApplyMaterials(SkeletonData skeletonData)
		{
			if (skeletonData == null)
			{
				throw new ArgumentNullException("skeletonData");
			}
			if (!requiresBlendModeMaterials)
			{
				return;
			}
			List<Skin.SkinEntry> skinEntries = new List<Skin.SkinEntry>();
			SlotData[] slotsItems = skeletonData.Slots.Items;
			int slotIndex = 0;
			for (int slotCount = skeletonData.Slots.Count; slotIndex < slotCount; slotIndex++)
			{
				SlotData slot = slotsItems[slotIndex];
				if (slot.BlendMode == BlendMode.Normal || (!applyAdditiveMaterial && slot.BlendMode == BlendMode.Additive))
				{
					continue;
				}
				List<ReplacementMaterial> replacementMaterials = null;
				switch (slot.BlendMode)
				{
				case BlendMode.Multiply:
					replacementMaterials = multiplyMaterials;
					break;
				case BlendMode.Screen:
					replacementMaterials = screenMaterials;
					break;
				case BlendMode.Additive:
					replacementMaterials = additiveMaterials;
					break;
				}
				if (replacementMaterials == null)
				{
					continue;
				}
				skinEntries.Clear();
				foreach (Skin skin in skeletonData.Skins)
				{
					skin.GetAttachments(slotIndex, skinEntries);
				}
				foreach (Skin.SkinEntry item in skinEntries)
				{
					if (!(item.Attachment is IHasTextureRegion renderableAttachment))
					{
						continue;
					}
					if (renderableAttachment.Region != null)
					{
						renderableAttachment.Region = CloneAtlasRegionWithMaterial((AtlasRegion)renderableAttachment.Region, replacementMaterials);
					}
					else if (renderableAttachment.Sequence != null)
					{
						TextureRegion[] regions = renderableAttachment.Sequence.Regions;
						for (int i = 0; i < regions.Length; i++)
						{
							regions[i] = CloneAtlasRegionWithMaterial((AtlasRegion)regions[i], replacementMaterials);
						}
					}
				}
			}
		}

		protected AtlasRegion CloneAtlasRegionWithMaterial(AtlasRegion originalRegion, List<ReplacementMaterial> replacementMaterials)
		{
			AtlasRegion newRegion = originalRegion.Clone();
			Material material = null;
			foreach (ReplacementMaterial replacement in replacementMaterials)
			{
				if (replacement.pageName == originalRegion.page.name)
				{
					material = replacement.material;
					break;
				}
			}
			AtlasPage originalPage = originalRegion.page;
			AtlasPage newPage = originalPage.Clone();
			newPage.rendererObject = material;
			newRegion.page = newPage;
			return newRegion;
		}
	}
}
