using UnityEngine;
using Spine.Unity;

public class BalloonActionTrigger : MonoBehaviour
{
    [Header("Nhân vật sẽ play animation")]
    public Character targetCharacter;

    [Header("Track Index để play anim (mặc định là 1)")]
    public int animationTrack = 1;

    [Header("Tên Animation (Ví dụ: hands_left_up)")]
    [SpineAnimation(dataField: "skeletonDataAsset")]
    public string animationName;

    // Ẩn trên Inspector vì tự động lấy từ targetCharacter
    [HideInInspector]
    public SkeletonDataAsset skeletonDataAsset;

#if UNITY_EDITOR
    private void OnValidate()
    {
        if (targetCharacter != null && targetCharacter.SkeletonAnimation != null)
        {
            skeletonDataAsset = targetCharacter.SkeletonAnimation.SkeletonDataAsset;
        }
        else
        {
            skeletonDataAsset = null;
        }
    }
#endif

    /// <summary>
    /// Kích hoạt play animation. Gắn hàm này vào event OnBalloonClicked của BalloonController.
    /// </summary>
    public void TriggerAction()
    {
        if (targetCharacter != null && targetCharacter.SkeletonAnimation != null)
        {
            if (!string.IsNullOrEmpty(animationName))
            {
                // Play animation 1 lần (loop = false)
                targetCharacter.SkeletonAnimation.AnimationState.SetAnimation(animationTrack, animationName, false);
                // Sau khi play xong, từ từ xoá bỏ animation trên track này đi (thời gian mix 0.2s) để trở về dáng idle
                targetCharacter.SkeletonAnimation.AnimationState.AddEmptyAnimation(animationTrack, 0.2f, 0);
                
                Debug.Log($"[BalloonActionTrigger] Đã play animation: {animationName} trên track {animationTrack}");
            }
        }
        else
        {
            Debug.LogWarning("[BalloonActionTrigger] Thiếu targetCharacter hoặc SkeletonAnimation chưa có!");
        }
    }
}
