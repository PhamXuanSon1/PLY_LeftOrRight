using System.Collections.Generic;
using Spine;
using Spine.Unity;
using UnityEngine;


[ExecuteAlways]
public class Character : Ply_GameUnit
{
    [SerializeField] protected SkeletonAnimation skeletonAnimation;
    public SkeletonAnimation SkeletonAnimation => skeletonAnimation;

    // ===== HỆ THỐNG MIX SKIN MỚI =====
    // Skin tuỳ chỉnh đang được đắp lên nhân vật
    private Skin customSkin;

    // Lưu lại cấu hình trang bị (bảng) để tự động áp dụng lại khi Skeleton bị rebuild (ví dụ khi chuyển selection trong Editor)
    [SerializeField, HideInInspector]
    private List<SlotAttachmentPair> currentAppliedPairs = new List<SlotAttachmentPair>();

    // Lưu lại danh sách Skin (phiên bản gộp skin name cũ) để tương thích
    [SerializeField, HideInInspector]
    private List<string> currentAppliedSkinNames = new List<string>();

    // Dictionary để lưu lại trạng thái ép buộc của các slot (dùng cho SpineEmotionController, ToggleBoneSlot)
    private Dictionary<string, string> forcedAttachments = new Dictionary<string, string>();
    private List<string> forcedAttachmentKeys = new List<string>();

    private void OnEnable()
    {
        if (skeletonAnimation != null)
        {
            // Đăng ký event OnRebuild: Khi Skeleton bị khởi tạo lại (ví dụ khi chuyển selection trong Editor),
            // tự động đắp lại bộ đồ đã lưu
            skeletonAnimation.OnRebuild -= OnSkeletonRebuild;
            skeletonAnimation.OnRebuild += OnSkeletonRebuild;
        }
    }

    private void OnDisable()
    {
        if (skeletonAnimation != null)
        {
            skeletonAnimation.OnRebuild -= OnSkeletonRebuild;
        }
    }

    private void OnSkeletonRebuild(SkeletonRenderer renderer)
    {
        if (currentAppliedPairs == null || currentAppliedPairs.Count == 0) return;

#if UNITY_EDITOR
        if (!Application.isPlaying)
        {
            // Dùng delayCall để đắp lại đồ SAU KHI Spine Editor Inspector
            // hoàn tất quá trình khởi tạo lại Skeleton.
            UnityEditor.EditorApplication.delayCall += ReapplyInEditor;
            return;
        }
#endif
        EquipFromSlotAttachmentPairs(currentAppliedPairs, false);
    }

#if UNITY_EDITOR
    private void ReapplyInEditor()
    {
        if (this == null || skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;
        if (currentAppliedPairs == null || currentAppliedPairs.Count == 0) return;

        EquipFromSlotAttachmentPairs(currentAppliedPairs, false);

        // Bắt buộc render lại hình ảnh trong Edit mode
        skeletonAnimation.LateUpdate();
        UnityEditor.SceneView.RepaintAll();
    }
#endif

    // Xử lý xung đột với Animation
    protected virtual void Start()
    {
        // Chỉ chạy khi đang Play game, không chạy ở Editor Mode
        if (!Application.isPlaying) return;

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

    // ===== API MỚI: Mix Skin =====

    /// <summary>
    /// Gộp danh sách các Skin lại với nhau rồi đắp lên nhân vật.
    /// Đây là hàm chính để thay đồ theo hệ thống Skin mới.
    /// </summary>
    public void MixAndApplySkins(List<string> skinNames)
    {
        // Lưu lại danh sách Skin đang mặc để tự động đắp lại khi Skeleton bị rebuild
        currentAppliedSkinNames = new List<string>(skinNames);

#if UNITY_EDITOR
        // Đánh dấu đối tượng đã bị thay đổi để Unity lưu lại vào Scene
        if (!Application.isPlaying)
        {
            UnityEditor.EditorUtility.SetDirty(this);
        }
#endif

        ApplySkinsMix(skinNames);
    }

    /// <summary>
    /// Hàm nội bộ: Thực hiện gộp Skin và đắp lên nhân vật.
    /// Không lưu lại state (tránh vòng lặp vô hạn khi gọi từ OnRebuild).
    /// </summary>
    private void ApplySkinsMix(List<string> skinNames)
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;

        var skeleton = skeletonAnimation.Skeleton;
        var skeletonData = skeleton.Data;

        // Tạo một Skin tuỳ chỉnh mới
        customSkin = new Skin("custom-mix");

        // Gộp Default Skin vào trước (nền tảng cơ bản của nhân vật)
        if (skeletonData.DefaultSkin != null)
        {
            customSkin.AddSkin(skeletonData.DefaultSkin);
        }

        // Gộp từng Skin mà người dùng đã chọn vào (đè đúng thứ tự)
        for (int i = 0; i < skinNames.Count; i++)
        {
            string skinName = skinNames[i];
            if (string.IsNullOrEmpty(skinName)) continue;

            Skin foundSkin = skeletonData.FindSkin(skinName);
            if (foundSkin != null)
            {
                customSkin.AddSkin(foundSkin);
            }
            else
            {
                Debug.LogWarning($"[Character] Không tìm thấy Skin '{skinName}' trong file Spine của {gameObject.name}");
            }
        }

        // Đắp Skin lên nhân vật
        skeleton.SetSkin(customSkin);
        skeleton.SetSlotsToSetupPose();

        // Thông báo cho AnimationState cập nhật lại
        if (skeletonAnimation.AnimationState != null)
        {
            skeletonAnimation.AnimationState.Apply(skeleton);
        }

        // Nếu đang chạy trong Editor (không play), cần gọi LateUpdate để refresh render
        if (!Application.isPlaying)
        {
            skeletonAnimation.LateUpdate();
        }
    }

    /// <summary>
    /// Thêm 1 Skin vào bộ đồ hiện tại (không xoá đồ cũ).
    /// Dùng khi bạn muốn thêm 1 món đồ mà không cần reset toàn bộ set.
    /// </summary>
    public void AddSkinToCurrentMix(string skinName)
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;
        if (string.IsNullOrEmpty(skinName)) return;

        var skeleton = skeletonAnimation.Skeleton;
        var skeletonData = skeleton.Data;

        // Nếu chưa có customSkin, tạo mới từ Skin hiện tại
        if (customSkin == null)
        {
            customSkin = new Skin("custom-mix");
            if (skeleton.Skin != null)
                customSkin.AddSkin(skeleton.Skin);
            else if (skeletonData.DefaultSkin != null)
                customSkin.AddSkin(skeletonData.DefaultSkin);
        }

        Skin foundSkin = skeletonData.FindSkin(skinName);
        if (foundSkin != null)
        {
            customSkin.AddSkin(foundSkin);
            skeleton.SetSkin(customSkin);
            skeleton.SetSlotsToSetupPose();

            if (skeletonAnimation.AnimationState != null)
                skeletonAnimation.AnimationState.Apply(skeleton);

            if (!Application.isPlaying)
                skeletonAnimation.LateUpdate();
        }
        else
        {
            Debug.LogWarning($"[Character] Không tìm thấy Skin '{skinName}' trong file Spine.");
        }
    }

    // ===== API CHO BẢNG SlotAttachmentPair =====

    /// <summary>
    /// Mặc đồ từ bảng SlotAttachmentPair (Is Enabled, Slot Name, Attachment Name).
    /// Quét tất cả các Skin trong file Spine để tìm attachment tương ứng, gộp lại và đắp lên nhân vật.
    /// </summary>
    public void EquipFromSlotAttachmentPairs(List<SlotAttachmentPair> pairs, bool saveState = true)
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null || pairs == null) return;

        // Lưu lại để tái tạo khi OnRebuild
        if (saveState)
        {
            currentAppliedPairs = new List<SlotAttachmentPair>();
            for (int i = 0; i < pairs.Count; i++)
            {
                currentAppliedPairs.Add(new SlotAttachmentPair
                {
                    isEnabled = pairs[i].isEnabled,
                    slotName = pairs[i].slotName,
                    attachmentName = pairs[i].attachmentName,
                    skeletonDataAsset = pairs[i].skeletonDataAsset
                });
            }
        }

        var skeleton = skeletonAnimation.Skeleton;
        var skeletonData = skeleton.Data;

        // Tạo Skin tuỳ chỉnh mới
        customSkin = new Skin("custom-mix");

        // Gộp Default Skin vào trước
        if (skeletonData.DefaultSkin != null)
        {
            customSkin.AddSkin(skeletonData.DefaultSkin);
        }

        // Tập hợp các Skin đã được thêm (tránh thêm trùng)
        HashSet<string> addedSkinNames = new HashSet<string>();

        for (int i = 0; i < pairs.Count; i++)
        {
            SlotAttachmentPair pair = pairs[i];
            if (!pair.isEnabled || string.IsNullOrEmpty(pair.attachmentName)) continue;

            // Tìm slot index
            SlotData slotData = skeletonData.FindSlot(pair.slotName);
            if (slotData == null) continue;
            int slotIndex = slotData.Index;

            // Quét TẤT CẢ các Skin để tìm Skin nào chứa attachment này ở slot này
            for (int s = 0; s < skeletonData.Skins.Count; s++)
            {
                Skin skin = skeletonData.Skins.Items[s];
                Attachment attachment = skin.GetAttachment(slotIndex, pair.attachmentName);

                if (attachment != null)
                {
                    // Tìm thấy! Gộp toàn bộ Skin này vào (nếu chưa thêm)
                    if (!addedSkinNames.Contains(skin.Name))
                    {
                        customSkin.AddSkin(skin);
                        addedSkinNames.Add(skin.Name);
                    }
                    break;
                }
            }
        }

        // Đắp Skin lên nhân vật
        skeleton.SetSkin(customSkin);
        skeleton.SetSlotsToSetupPose(); // Lấy form mặc định

        // QUAN TRỌNG: Spine SetSlotsToSetupPose chỉ bật những thứ có sẵn ở Setup Pose.
        // Với những món đồ ta muốn BẬT nhưng mặc định nó TẮT ở Setup Pose, ta PHẢI gọi SetAttachment thủ công!
        for (int i = 0; i < pairs.Count; i++)
        {
            SlotAttachmentPair pair = pairs[i];
            if (!string.IsNullOrEmpty(pair.slotName))
            {
                if (pair.isEnabled && !string.IsNullOrEmpty(pair.attachmentName))
                {
                    // Ép bật món đồ này lên
                    try { skeleton.SetAttachment(pair.slotName, pair.attachmentName); }
                    catch (System.Exception) { }
                }
                else
                {
                    // Ép tắt nếu không tick
                    try { skeleton.SetAttachment(pair.slotName, null); }
                    catch (System.Exception) { }
                }
            }
        }

        if (skeletonAnimation.AnimationState != null)
        {
            skeletonAnimation.AnimationState.Apply(skeleton);
        }

#if UNITY_EDITOR
        // Đăng ký event thủ công vì script này không có [ExecuteInEditMode] nên OnEnable không chạy ở Editor
        skeletonAnimation.OnRebuild -= OnSkeletonRebuild;
        skeletonAnimation.OnRebuild += OnSkeletonRebuild;

        if (!Application.isPlaying)
        {
            if (saveState)
            {
                UnityEditor.EditorUtility.SetDirty(this);
                skeletonAnimation.LateUpdate();
            }
        }
#endif
    }

    // ===== API CŨ (Giữ lại để tương thích với SpineEmotionController, ToggleBoneSlot) =====

    public void TurnSlotAttachment(string slotName, string attachmentName = null)
    {
        try
        {
            // Nếu truyền null, Spine hiểu là tắt đồ đi
            if (string.IsNullOrEmpty(attachmentName))
            {
                skeletonAnimation.Skeleton.SetAttachment(slotName, null);
            }
            else
            {
                // Kiểm tra xem Skin hiện tại có chứa món đồ này không
                var slot = skeletonAnimation.Skeleton.FindSlot(slotName);
                if (slot != null)
                {
                    int slotIndex = slot.Data.Index;
                    var attachment = skeletonAnimation.Skeleton.GetAttachment(slotIndex, attachmentName);
                    if (attachment != null)
                    {
                        skeletonAnimation.Skeleton.SetAttachment(slotName, attachmentName);
                    }
                    else
                    {
                        // Skin hiện tại không có món đồ này -> Bỏ qua, không báo lỗi
                        return;
                    }
                }
            }

            if (!forcedAttachments.ContainsKey(slotName))
            {
                forcedAttachmentKeys.Add(slotName);
            }
            forcedAttachments[slotName] = attachmentName;
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