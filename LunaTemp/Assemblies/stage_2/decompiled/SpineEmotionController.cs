using System;
using System.Collections;
using System.Collections.Generic;
using Spine;
using Spine.Unity;
using UnityEngine;

public class SpineEmotionController : MonoBehaviour
{
	[Header("References")]
	public SkeletonAnimation skeletonAnimation;

	[Header("Animation Config")]
	[Tooltip("Tên animation cười trong Spine (VD: Happy)")]
	public string happyAnimationName = "Happy";

	[Tooltip("Tên animation tức giận trong Spine (VD: Angry)")]
	public string angryAnimationName = "Angry";

	public int animationTrack = 1;

	public float emotionDuration = 1f;

	[Header("Slot Configs")]
	[Tooltip("Danh sách các slot cần thay đổi attachment (miệng, mắt...) khi cười")]
	public List<EmotionSlotConfig> smileSlots = new List<EmotionSlotConfig>();

	[Tooltip("Danh sách các slot cần thay đổi attachment khi tức giận/sai")]
	public List<EmotionSlotConfig> angrySlots = new List<EmotionSlotConfig>();

	private void Reset()
	{
		if (skeletonAnimation == null)
		{
			skeletonAnimation = GetComponent<SkeletonAnimation>();
		}
	}

	public void PlayHappyAnim()
	{
		if (!(skeletonAnimation == null) && skeletonAnimation.Skeleton != null)
		{
			StartCoroutine(EmotionRoutine(happyAnimationName, smileSlots));
		}
	}

	public void PlayAngryAnim()
	{
		if (!(skeletonAnimation == null) && skeletonAnimation.Skeleton != null)
		{
			StartCoroutine(EmotionRoutine(angryAnimationName, angrySlots));
		}
	}

	private IEnumerator EmotionRoutine(string animName, List<EmotionSlotConfig> slots)
	{
		List<Action> revertActions = new List<Action>();
		Skeleton skeleton = skeletonAnimation.Skeleton;
		Character charComponent = GetComponent<Character>();
		foreach (EmotionSlotConfig config in slots)
		{
			Slot slot = skeleton.FindSlot(config.slotName);
			if (slot == null)
			{
				continue;
			}
			string originalAttachmentName = ((slot.Attachment != null) ? slot.Attachment.Name : null);
			if (!string.IsNullOrEmpty(config.requiredCurrentAttachment))
			{
				if (originalAttachmentName != config.requiredCurrentAttachment)
				{
					continue;
				}
			}
			else if (slot.Attachment == null)
			{
				continue;
			}
			string revertTo = (string.IsNullOrEmpty(config.defaultAttachmentName) ? originalAttachmentName : config.defaultAttachmentName);
			if (charComponent != null)
			{
				charComponent.TurnSlotAttachment(config.slotName, config.targetAttachmentName);
				revertActions.Add(delegate
				{
					charComponent.TurnSlotAttachment(config.slotName, revertTo);
				});
			}
			else
			{
				skeleton.SetAttachment(config.slotName, config.targetAttachmentName);
				revertActions.Add(delegate
				{
					skeleton.SetAttachment(config.slotName, revertTo);
				});
			}
		}
		if (skeletonAnimation.state != null && !string.IsNullOrEmpty(animName))
		{
			TrackEntry track = skeletonAnimation.state.SetAnimation(animationTrack, animName, false);
			if (track != null)
			{
				skeletonAnimation.state.AddEmptyAnimation(animationTrack, 0.2f, 0f);
			}
		}
		yield return new WaitForSeconds(emotionDuration);
		foreach (Action action in revertActions)
		{
			action();
		}
	}
}
