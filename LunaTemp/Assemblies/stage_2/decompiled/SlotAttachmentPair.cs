using System;
using System.Collections.Generic;
using Spine;
using Spine.Unity;

[Serializable]
public class SlotAttachmentPair
{
	public bool isEnabled = true;

	public string slotName;

	public string attachmentName;

	public SkeletonDataAsset skeletonDataAsset;

	private IEnumerable<string> GetSlotNames()
	{
		if (skeletonDataAsset == null)
		{
			return new string[1] { "(No SkeletonDataAsset assigned)" };
		}
		SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
		if (skeletonData == null)
		{
			return new string[1] { "(SkeletonData not loaded)" };
		}
		List<string> names = new List<string>();
		foreach (SlotData slot in skeletonData.Slots)
		{
			names.Add(slot.Name);
		}
		return names;
	}
}
