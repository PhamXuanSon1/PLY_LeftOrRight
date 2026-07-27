using UnityEngine;
using Spine.Unity;
using System.Collections;
using System.Collections.Generic;

[System.Serializable]
public class EmotionSlotConfig
{
    [Tooltip("Tên Slot trên Spine (VD: Set_P1_Mouth)")]
    public string slotName;
    
    [Tooltip("Tên Attachment muốn đổi thành khi cười (VD: Base/mouth smile)")]
    public string targetAttachmentName;
    
    [Tooltip("CHỈ ĐỔI SANG MẶT CƯỜI NẾU rãnh này đang hiển thị Attachment này (VD: Base/dry mouth 3). Để trống nếu muốn luôn đổi.")]
    public string requiredCurrentAttachment;

    [Tooltip("Tên Attachment gốc để quay về sau khi cười. Nếu để trống, code sẽ tự lấy Attachment đang mặc định lúc đó.")]
    public string defaultAttachmentName;
}

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
        // Tự động gán SkeletonAnimation nếu cùng nằm trên 1 GameObject
        if (skeletonAnimation == null)
            skeletonAnimation = GetComponent<SkeletonAnimation>();
    }

    public void PlayHappyAnim()
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;
        StartCoroutine(EmotionRoutine(happyAnimationName, smileSlots));
    }

    public void PlayAngryAnim()
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;
        StartCoroutine(EmotionRoutine(angryAnimationName, angrySlots));
    }

    private IEnumerator EmotionRoutine(string animName, List<EmotionSlotConfig> slots)
    {
        List<System.Action> revertActions = new List<System.Action>();
        var skeleton = skeletonAnimation.Skeleton;
        
        // Cố gắng tìm component Character để gọi TurnSlotAttachment (nhằm tương thích với cơ chế ép buộc Attachment cũ của bạn)
        Character charComponent = GetComponent<Character>();

        foreach (var config in slots)
        {
            var slot = skeleton.FindSlot(config.slotName);
            if (slot != null)
            {
                string originalAttachmentName = slot.Attachment != null ? slot.Attachment.Name : null;

                // KIỂM TRA ĐIỀU KIỆN: Nếu có yêu cầu requiredCurrentAttachment mà attachment hiện tại không khớp, thì bỏ qua không làm gì cả
                if (!string.IsNullOrEmpty(config.requiredCurrentAttachment))
                {
                    if (originalAttachmentName != config.requiredCurrentAttachment)
                    {
                        continue; // Bỏ qua slot này, không đổi sang mặt cảm xúc
                    }
                }
                else
                {
                    // Nếu không điền requiredCurrentAttachment, nhưng slot đang trống (không có miệng) thì cũng không nên bật miệng lên
                    if (slot.Attachment == null) continue;
                }

                // Nếu defaultAttachmentName rỗng, tự lấy Attachment hiện tại làm gốc
                string revertTo = string.IsNullOrEmpty(config.defaultAttachmentName) ? originalAttachmentName : config.defaultAttachmentName;

                if (charComponent != null)
                {
                    charComponent.TurnSlotAttachment(config.slotName, config.targetAttachmentName);
                    revertActions.Add(() => charComponent.TurnSlotAttachment(config.slotName, revertTo));
                }
                else
                {
                    skeleton.SetAttachment(config.slotName, config.targetAttachmentName);
                    revertActions.Add(() => skeleton.SetAttachment(config.slotName, revertTo));
                }
            }
        }

        // Chạy animation
        if (skeletonAnimation.state != null && !string.IsNullOrEmpty(animName))
        {
            var track = skeletonAnimation.state.SetAnimation(animationTrack, animName, false);
            if (track != null) skeletonAnimation.state.AddEmptyAnimation(animationTrack, 0.2f, 0);
        }

        yield return new WaitForSeconds(emotionDuration);

        // Hoàn tác trả lại trạng thái khuôn mặt gốc
        foreach (var action in revertActions)
        {
            action.Invoke();
        }
    }
}
