using DG.Tweening;
using Spine;
using Spine.Unity;
using UnityEngine;

public class BalloonActionTrigger : MonoBehaviour
{
	[Header("Nhân vật sẽ play animation")]
	public Character targetCharacter;

	[Header("Track Index để play anim (mặc định là 1)")]
	public int animationTrack = 1;

	[Header("Tên Animation (Ví dụ: hands_left_up)")]
	[SpineAnimation("", "skeletonDataAsset", true, false, false)]
	public string animationName;

	[Header("Tuỳ chọn nâng cao")]
	[Tooltip("Nếu bật, sẽ xoá toàn bộ animation hiện tại (như idle) để chỉ tập trung chạy animation tay này")]
	public bool clearOtherAnimations = true;

	[HideInInspector]
	public SkeletonDataAsset skeletonDataAsset;

	public void TriggerAction()
	{
		if (targetCharacter != null && targetCharacter.SkeletonAnimation != null)
		{
			if (string.IsNullOrEmpty(animationName))
			{
				return;
			}
			DebugActiveSkinsAndAttachments("TRƯỚC KHI PLAY ANIMATION");
			string previousAnim = null;
			bool previousLoop = true;
			if (clearOtherAnimations)
			{
				TrackEntry track0 = targetCharacter.SkeletonAnimation.AnimationState.GetCurrent(0);
				if (track0 != null && track0.Animation != null)
				{
					previousAnim = track0.Animation.Name;
					previousLoop = track0.Loop;
				}
				targetCharacter.SkeletonAnimation.AnimationState.ClearTracks();
				targetCharacter.SkeletonAnimation.Skeleton.SetBonesToSetupPose();
			}
			TrackEntry trackEntry = targetCharacter.SkeletonAnimation.AnimationState.SetAnimation(animationTrack, animationName, false);
			if (clearOtherAnimations && !string.IsNullOrEmpty(previousAnim))
			{
				targetCharacter.SkeletonAnimation.AnimationState.AddAnimation(0, previousAnim, previousLoop, trackEntry.Animation.Duration);
			}
			if (animationTrack != 0)
			{
				targetCharacter.SkeletonAnimation.AnimationState.AddEmptyAnimation(animationTrack, 0.2f, 0f);
			}
			Debug.Log($"[BalloonActionTrigger] Đã play animation: {animationName} trên track {animationTrack}");
			DOVirtual.DelayedCall(0.05f, delegate
			{
				DebugActiveSkinsAndAttachments("SAU KHI PLAY ANIMATION");
			});
		}
		else
		{
			Debug.LogWarning("[BalloonActionTrigger] Thiếu targetCharacter hoặc SkeletonAnimation chưa có!");
		}
	}

	private void DebugActiveSkinsAndAttachments(string contextInfo)
	{
		if (targetCharacter == null || targetCharacter.SkeletonAnimation == null)
		{
			return;
		}
		Skeleton skeleton = targetCharacter.SkeletonAnimation.Skeleton;
		if (skeleton == null || skeleton.Skin == null)
		{
			return;
		}
		string debugStr = "--- " + contextInfo + " ---\n";
		debugStr = debugStr + "- Tên Skin tổng hợp hiện tại: " + skeleton.Skin.Name + "\n";
		debugStr += "- Các Skin cơ sở đang bật:\n";
		if (targetCharacter.currentAppliedSkinNames != null && targetCharacter.currentAppliedSkinNames.Count > 0)
		{
			foreach (string sName in targetCharacter.currentAppliedSkinNames)
			{
				debugStr = debugStr + "  + " + sName + "\n";
			}
		}
		else
		{
			debugStr += "  + (Không có Skin nào)\n";
		}
		debugStr += "- Attachments liên quan đến tay đang hiển thị:\n";
		foreach (Slot slot in skeleton.Slots)
		{
			if (slot.Data.Name.ToLower().Contains("hand") || slot.Data.Name.ToLower().Contains("arm") || slot.Data.Name.ToLower().Contains("sleeve"))
			{
				debugStr = debugStr + "  + Slot '" + slot.Data.Name + "': " + ((slot.Attachment != null) ? slot.Attachment.Name : "NULL") + "\n";
			}
		}
		Debug.Log(debugStr);
	}
}
