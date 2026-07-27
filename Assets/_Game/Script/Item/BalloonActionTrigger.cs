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

    [Header("Tuỳ chọn nâng cao")]
    [Tooltip("Nếu bật, sẽ xoá toàn bộ animation hiện tại (như idle) để chỉ tập trung chạy animation tay này")]
    public bool clearOtherAnimations = true;

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
                // DEBUG: In ra danh sách skin đang bật trước khi play anim
                DebugActiveSkinsAndAttachments("TRƯỚC KHI PLAY ANIMATION");

                string previousAnim = null;
                bool previousLoop = true;

                if (clearOtherAnimations)
                {
                    // Lưu lại animation đang chạy ở Track 0 (như Idle) để trả về sau
                    var track0 = targetCharacter.SkeletonAnimation.AnimationState.GetCurrent(0);
                    if (track0 != null && track0.Animation != null)
                    {
                        previousAnim = track0.Animation.Name;
                        previousLoop = track0.Loop;
                    }

                    // Xoá tất cả các track đang chạy (ví dụ Track 0 đang chạy Idle)
                    targetCharacter.SkeletonAnimation.AnimationState.ClearTracks();
                    // Đưa toàn bộ xương về trạng thái gốc để không bị kẹt ở dáng của animation cũ
                    targetCharacter.SkeletonAnimation.Skeleton.SetBonesToSetupPose();
                }

                // Play animation 1 lần (loop = false)
                var trackEntry = targetCharacter.SkeletonAnimation.AnimationState.SetAnimation(animationTrack, animationName, false);
                
                if (clearOtherAnimations && !string.IsNullOrEmpty(previousAnim))
                {
                    // Chờ bằng đúng thời gian của animation tay, sau đó tự động bật lại animation cũ (như Idle) vào Track 0
                    targetCharacter.SkeletonAnimation.AnimationState.AddAnimation(0, previousAnim, previousLoop, trackEntry.Animation.Duration);
                }

                // Sau khi play xong, từ từ xoá bỏ animation trên track này đi (thời gian mix 0.2s) để trở về dáng idle
                if (animationTrack != 0) 
                {
                    targetCharacter.SkeletonAnimation.AnimationState.AddEmptyAnimation(animationTrack, 0.2f, 0);
                }

                Debug.Log($"[BalloonActionTrigger] Đã play animation: {animationName} trên track {animationTrack}");

                // Đợi 1 chút để animation cập nhật (vì coroutine bị huỷ khi Balloon ẩn đi)
                DG.Tweening.DOVirtual.DelayedCall(0.05f, () => {
                    DebugActiveSkinsAndAttachments("SAU KHI PLAY ANIMATION");
                });
            }
        }
        else
        {
            Debug.LogWarning("[BalloonActionTrigger] Thiếu targetCharacter hoặc SkeletonAnimation chưa có!");
        }
    }

    private void DebugActiveSkinsAndAttachments(string contextInfo)
    {
        if (targetCharacter == null || targetCharacter.SkeletonAnimation == null) return;
        
        var skeleton = targetCharacter.SkeletonAnimation.Skeleton;
        if (skeleton == null || skeleton.Skin == null) return;

        string debugStr = $"--- {contextInfo} ---\n";
        debugStr += $"- Tên Skin tổng hợp hiện tại: {skeleton.Skin.Name}\n";

        // In ra danh sách các Skin đang bật trong bộ trộn của Character
        debugStr += "- Các Skin cơ sở đang bật:\n";
        if (targetCharacter.currentAppliedSkinNames != null && targetCharacter.currentAppliedSkinNames.Count > 0)
        {
            foreach (var sName in targetCharacter.currentAppliedSkinNames)
            {
                debugStr += $"  + {sName}\n";
            }
        }
        else
        {
            debugStr += $"  + (Không có Skin nào)\n";
        }

        // Thêm thông tin về tay (vì animation tay hay làm mất đồ tay áo)
        debugStr += "- Attachments liên quan đến tay đang hiển thị:\n";
        foreach (var slot in skeleton.Slots)
        {
            if (slot.Data.Name.ToLower().Contains("hand") || slot.Data.Name.ToLower().Contains("arm") || slot.Data.Name.ToLower().Contains("sleeve"))
            {
                debugStr += $"  + Slot '{slot.Data.Name}': {(slot.Attachment != null ? slot.Attachment.Name : "NULL")}\n";
            }
        }

        Debug.Log(debugStr);
    }
}
