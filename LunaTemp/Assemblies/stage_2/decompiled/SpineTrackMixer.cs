using Spine.Unity;
using UnityEngine;

public class SpineTrackMixer : MonoBehaviour
{
	[Header("Thành phần Spine")]
	public SkeletonAnimation skeletonAnimation;

	[Header("Cấu hình Animation")]
	[SpineAnimation("", "", true, false, false)]
	public string idleAnimation = "idle";

	[SpineAnimation("", "", true, false, false)]
	public string finalAttachAnimation = "final attach";

	private void Start()
	{
		if (skeletonAnimation == null)
		{
			skeletonAnimation = GetComponent<SkeletonAnimation>();
		}
		PlayMixedAnimations();
	}

	public void PlayMixedAnimations()
	{
		if (!(skeletonAnimation == null) && skeletonAnimation.AnimationState != null)
		{
			skeletonAnimation.AnimationState.SetAnimation(0, idleAnimation, true);
			skeletonAnimation.AnimationState.SetAnimation(1, finalAttachAnimation, true);
		}
	}
}
