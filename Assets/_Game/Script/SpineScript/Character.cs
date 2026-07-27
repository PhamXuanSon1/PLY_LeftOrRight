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
    public List<string> currentAppliedSkinNames = new List<string>();

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
        bool hasSkins = currentAppliedSkinNames != null && currentAppliedSkinNames.Count > 0;
        bool hasPairs = currentAppliedPairs != null && currentAppliedPairs.Count > 0;
        if (!hasSkins && !hasPairs) return;

#if UNITY_EDITOR
        if (!Application.isPlaying)
        {
            // Dùng delayCall để đắp lại đồ SAU KHI Spine Editor Inspector
            // hoàn tất quá trình khởi tạo lại Skeleton.
            UnityEditor.EditorApplication.delayCall += ReapplyInEditor;
            return;
        }
#endif
        // Gọi thẳng hàm Mix mới với cả 2 danh sách
        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
    }

#if UNITY_EDITOR
    private void ReapplyInEditor()
    {
        if (this == null || skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;

        bool hasSkins = currentAppliedSkinNames != null && currentAppliedSkinNames.Count > 0;
        bool hasPairs = currentAppliedPairs != null && currentAppliedPairs.Count > 0;
        if (!hasSkins && !hasPairs) return;

        // Gọi thẳng hàm Mix mới với cả 2 danh sách
        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);

        // Bắt buộc render lại hình ảnh trong Edit mode
        skeletonAnimation.LateUpdate();
        UnityEditor.SceneView.RepaintAll();
    }
#endif

    private bool isSkinAppliedAtRuntime = false;
    private MeshFilter cachedMeshFilter;

    // Chủ động mặc đồ khi game bắt đầu (fix lỗi mất nhân vật trên Luna)
    protected virtual void Update()
    {
        if (Application.isPlaying && !isSkinAppliedAtRuntime)
        {
            if (skeletonAnimation != null && skeletonAnimation.Skeleton != null)
            {
                cachedMeshFilter = skeletonAnimation.GetComponent<MeshFilter>();

                bool hasSkins = currentAppliedSkinNames != null && currentAppliedSkinNames.Count > 0;
                bool hasPairs = currentAppliedPairs != null && currentAppliedPairs.Count > 0;
                if (hasSkins || hasPairs)
                {
                    ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
                    skeletonAnimation.LateUpdate();
                }
                isSkinAppliedAtRuntime = true;
            }
        }
    }

    // === FIX LUNA FRUSTUM CULLING ===
    // Spine tạo lại mesh mỗi frame với bounds rất sát người.
    // Luna dựa vào bounds này để cull (ẩn) nhân vật khi nó ở rìa camera.
    // LateUpdate chạy SAU khi Spine đã tạo xong mesh → ta ép bounds cực lớn.
    private void LateUpdate()
    {
        if (!Application.isPlaying) return;
        if (cachedMeshFilter == null && skeletonAnimation != null)
            cachedMeshFilter = skeletonAnimation.GetComponent<MeshFilter>();
        if (cachedMeshFilter != null && cachedMeshFilter.sharedMesh != null)
        {
            cachedMeshFilter.sharedMesh.bounds = new Bounds(Vector3.zero, Vector3.one * 2000f);
        }
    }

    // ===== API MỚI: Kết hợp cả Skin và Attachment =====

    /// <summary>
    /// Gộp cả danh sách Skin và danh sách Attachment lại với nhau.
    /// Hỗ trợ cả 2 hệ thống cùng lúc (Skin làm nền, Attachment làm chi tiết đè lên).
    /// </summary>
    public void MixSkinsAndAttachments(List<string> skinNames, List<SlotAttachmentPair> attachmentPairs)
    {
        currentAppliedSkinNames = new List<string>(skinNames ?? new List<string>());
        
        currentAppliedPairs = new List<SlotAttachmentPair>();
        if (attachmentPairs != null)
        {
            for (int i = 0; i < attachmentPairs.Count; i++)
            {
                currentAppliedPairs.Add(new SlotAttachmentPair
                {
                    isEnabled = attachmentPairs[i].isEnabled,
                    slotName = attachmentPairs[i].slotName,
                    attachmentName = attachmentPairs[i].attachmentName,
                    skeletonDataAsset = attachmentPairs[i].skeletonDataAsset
                });
            }
        }

#if UNITY_EDITOR
        if (!Application.isPlaying) UnityEditor.EditorUtility.SetDirty(this);
#endif

        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
    }

    private void ApplySkinsAndAttachmentsMix(List<string> skinNames, List<SlotAttachmentPair> pairs)
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;

        var skeleton = skeletonAnimation.Skeleton;
        var skeletonData = skeleton.Data;
        customSkin = new Skin("custom-mix");

        // 1. Gộp Default Skin
        if (skeletonData.DefaultSkin != null)
            customSkin.AddSkin(skeletonData.DefaultSkin);

        HashSet<string> addedSkinNames = new HashSet<string>();

        // 2. Gộp các Skin từ danh sách tên
        if (skinNames != null)
        {
            for (int i = 0; i < skinNames.Count; i++)
            {
                string skinName = skinNames[i];
                if (string.IsNullOrEmpty(skinName)) continue;

                Skin foundSkin = skeletonData.FindSkin(skinName);
                if (foundSkin != null && !addedSkinNames.Contains(foundSkin.Name))
                {
                    customSkin.AddSkin(foundSkin);
                    addedSkinNames.Add(foundSkin.Name);
                }
            }
        }

        // 3. Quét các Attachment, tìm Skin chứa chúng và gộp vào (nếu chưa có)
        if (pairs != null)
        {
            for (int i = 0; i < pairs.Count; i++)
            {
                var pair = pairs[i];
                if (!pair.isEnabled || string.IsNullOrEmpty(pair.attachmentName)) continue;

                SlotData slotData = skeletonData.FindSlot(pair.slotName);
                if (slotData == null) continue;
                int slotIndex = slotData.Index;

                for (int s = 0; s < skeletonData.Skins.Count; s++)
                {
                    Skin skin = skeletonData.Skins.Items[s];
                    Attachment attachment = skin.GetAttachment(slotIndex, pair.attachmentName);
                    if (attachment != null)
                    {
                        if (!addedSkinNames.Contains(skin.Name))
                        {
                            customSkin.AddSkin(skin);
                            addedSkinNames.Add(skin.Name);
                        }
                        break;
                    }
                }
            }
        }

        // 4. Đắp tổng hợp Skin lên nhân vật
        skeleton.SetSkin(customSkin);
        skeleton.SetSlotsToSetupPose();

        // 5. Ép bật/tắt chính xác các attachment theo danh sách pairs
        if (pairs != null)
        {
            for (int i = 0; i < pairs.Count; i++)
            {
                var pair = pairs[i];
                if (!string.IsNullOrEmpty(pair.slotName))
                {
                    try
                    {
                        if (pair.isEnabled && !string.IsNullOrEmpty(pair.attachmentName))
                        {
                            skeleton.SetAttachment(pair.slotName, pair.attachmentName);
                            if (!forcedAttachments.ContainsKey(pair.slotName)) forcedAttachmentKeys.Add(pair.slotName);
                            forcedAttachments[pair.slotName] = pair.attachmentName;
                        }
                        else
                        {
                            skeleton.SetAttachment(pair.slotName, null);
                            if (!forcedAttachments.ContainsKey(pair.slotName)) forcedAttachmentKeys.Add(pair.slotName);
                            forcedAttachments[pair.slotName] = null;
                        }
                    }
                    catch (System.Exception)
                    {
                        // Ignore if slot or attachment not found
                    }
                }
            }
        }

        if (skeletonAnimation.AnimationState != null)
            skeletonAnimation.AnimationState.Apply(skeleton);

        if (!Application.isPlaying)
            skeletonAnimation.LateUpdate();
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
                    try 
                    { 
                        skeleton.SetAttachment(pair.slotName, pair.attachmentName); 
                        if (!forcedAttachments.ContainsKey(pair.slotName)) forcedAttachmentKeys.Add(pair.slotName);
                        forcedAttachments[pair.slotName] = pair.attachmentName;
                    }
                    catch (System.Exception) { }
                }
                else
                {
                    // Ép tắt nếu không tick
                    try 
                    { 
                        skeleton.SetAttachment(pair.slotName, null); 
                        if (!forcedAttachments.ContainsKey(pair.slotName)) forcedAttachmentKeys.Add(pair.slotName);
                        forcedAttachments[pair.slotName] = null;
                    }
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