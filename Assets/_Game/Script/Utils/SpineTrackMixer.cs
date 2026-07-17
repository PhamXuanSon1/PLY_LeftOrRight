using UnityEngine;
using Spine.Unity;

public class SpineTrackMixer : MonoBehaviour
{
    [Header("Thành phần Spine")]
    public SkeletonAnimation skeletonAnimation;

    [Header("Cấu hình Animation")]
    [SpineAnimation]
    public string idleAnimation = "idle";
    
    [SpineAnimation]
    public string finalAttachAnimation = "final attach";

    private void Start()
    {
        // Tự động tìm SkeletonAnimation nếu bạn chưa kéo thả vào
        if (skeletonAnimation == null)
        {
            skeletonAnimation = GetComponent<SkeletonAnimation>();
        }
        
        PlayMixedAnimations();
    }

    public void PlayMixedAnimations()
    {
        if (skeletonAnimation == null || skeletonAnimation.AnimationState == null) return;

        // Track 0: Chạy chuyển động nền (idle) liên tục
        skeletonAnimation.AnimationState.SetAnimation(0, idleAnimation, true);

        // Track 1: Chạy pose đè lên (final attach). 
        // Các bộ phận được set key trong 'final attach' sẽ ghi đè lên 'idle'.
        skeletonAnimation.AnimationState.SetAnimation(1, finalAttachAnimation, true);
    }
}