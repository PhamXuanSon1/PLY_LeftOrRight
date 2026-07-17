using System.Collections.Generic;
using Spine.Unity;
using UnityEngine;


public class Character : Ply_GameUnit
{
    [SerializeField] protected SkeletonAnimation skeletonAnimation;
    public SkeletonAnimation SkeletonAnimation => skeletonAnimation;

    // Dictionary để lưu lại trạng thái ép buộc của các slot
    private Dictionary<string, string> forcedAttachments = new Dictionary<string, string>();
    private List<string> forcedAttachmentKeys = new List<string>();

    // Xử lý xung đột với Animation
    protected virtual void Start()
    {
        if (skeletonAnimation != null)
        {
            // Đăng ký event để chạy hàm ApplyForcedAttachments mỗi khi animation tính toán xong 1 frame
            skeletonAnimation.UpdateComplete += ApplyForcedAttachments;
        }
    }

    private void ApplyForcedAttachments(ISkeletonAnimation animated)
    {
        for (int i = 0; i < forcedAttachmentKeys.Count; i++)
        {
            string key = forcedAttachmentKeys[i];
            string value = forcedAttachments[key];
            try
            {
                skeletonAnimation.Skeleton.SetAttachment(key, value);
            }
            catch (System.Exception)
            {
                // Bỏ log warning ở đây để tránh spam mỗi frame
            }
        }
    }

    public void TurnSlotAttachment(string slotName, string attachmentName = null)
    {
        try
        {
            skeletonAnimation.Skeleton.SetAttachment(slotName, attachmentName);
            if (!forcedAttachments.ContainsKey(slotName))
            {
                forcedAttachmentKeys.Add(slotName);
            }
            forcedAttachments[slotName] = attachmentName; // Chỉ lưu lại trạng thái mong muốn nếu set thành công
        }
        catch (System.Exception e)
        {
            Debug.LogWarning($"[TurnSlotAttachment] Lỗi khi set attachment '{attachmentName}' cho slot '{slotName}': {e.Message}");
        }
    }

    public void TurnOnSlotsAttachment(List<SlotAttachmentPair> slotAttachmentPairs)
    {
        for (int i = 0; i < slotAttachmentPairs.Count; i++)
        {
            SlotAttachmentPair pair = slotAttachmentPairs[i];
            TurnSlotAttachment(pair.slotName, pair.attachmentName);
        }
    }

    public void TurnOffSlotsAttachment(List<SlotAttachmentPair> slotAttachmentPairs)
    {
        for (int i = 0; i < slotAttachmentPairs.Count; i++)
        {
            SlotAttachmentPair pair = slotAttachmentPairs[i];
            TurnSlotAttachment(pair.slotName, null);
        }
    }

    // Hàm tiện ích để dễ dàng gọi từ UnityEvent (OnCompleteEvent) trên Editor (Tắt)
    public void TurnOffSlot(string slotName)
    {
        TurnSlotAttachment(slotName, null);
    }

    // Hàm tiện ích để dễ dàng gọi từ UnityEvent trên Editor (Bật)
    // Mẹo: Vì UnityEvent chỉ cho phép truyền 1 chuỗi, nên mình dùng dấu phẩy (,) để ngăn cách.
    // Ví dụ gõ vào: "mimat_phai,mat_cuoi"
    public void TurnOnSlotWithAttachment(string combinedString)
    {
        if (string.IsNullOrEmpty(combinedString)) return;

        string[] parts = combinedString.Split(',');
        if (parts.Length == 2)
        {
            TurnSlotAttachment(parts[0].Trim(), parts[1].Trim());
        }
        else
        {
            Debug.LogWarning($"[TurnOnSlotWithAttachment] Nhập sai định dạng. Vui lòng nhập kiểu 'SlotName,AttachmentName'. Của bạn là: {combinedString}");
        }
    }

    public void SetAlphaSlotName(string slotName, float alphaSlotName)
    {
        var slot = skeletonAnimation.Skeleton.FindSlot(slotName);
        if (slot != null)
        {
            slot.A = alphaSlotName;
        }
        else
        {
            Debug.LogWarning($"Slot {slotName} not found in skeleton.");
        }
    }
}