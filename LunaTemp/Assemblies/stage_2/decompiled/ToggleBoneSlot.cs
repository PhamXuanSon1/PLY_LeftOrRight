using System;
using System.Collections.Generic;
using Spine.Unity;
using UnityEngine;

public class ToggleBoneSlot : MonoBehaviour
{
	[SerializeField]
	private SkeletonAnimation skeletonAnimation;

	[SerializeField]
	private List<SlotAttachmentPair> initialAttachments = new List<SlotAttachmentPair>();

	public SkeletonAnimation SkeletonAnimation => skeletonAnimation;

	private void Start()
	{
		SkeletonDataAsset dataAsset = skeletonAnimation?.SkeletonDataAsset;
		foreach (SlotAttachmentPair pair in initialAttachments)
		{
			pair.skeletonDataAsset = dataAsset;
			TurnSlotAttachment(pair.slotName, pair.attachmentName);
		}
	}

	public void TurnSlotAttachment(string slotName, string attachmentName = null)
	{
		try
		{
			if (string.IsNullOrEmpty(attachmentName))
			{
				attachmentName = null;
			}
			skeletonAnimation.Skeleton.SetAttachment(slotName, attachmentName);
		}
		catch (Exception e)
		{
			Debug.LogError("Error setting attachment '" + attachmentName + "' on slot '" + slotName + "': " + e.Message);
		}
	}
}
