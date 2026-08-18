using System.Collections.Generic;
using Spine;
using Spine.Unity;
using Spine.Unity.AttachmentTools;
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

    // Nhớ luôn Skin nguồn của từng slot bị ép, vì cùng một Skin Placeholder có thể tồn tại ở nhiều Skin
    private Dictionary<string, string> forcedSourceSkins = new Dictionary<string, string>();


    private static readonly int StraightAlphaProperty = Shader.PropertyToID("_StraightAlphaInput");

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
        if (!HasEquipmentToReapply) return;

        ApplyLunaSafeSettings();

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

        if (!HasEquipmentToReapply) return;

        // Gọi thẳng hàm Mix mới với cả 2 danh sách
        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);

        // Bắt buộc render lại hình ảnh trong Edit mode
        skeletonAnimation.LateUpdate();
        UnityEditor.SceneView.RepaintAll();
    }
#endif

    private bool isSkinAppliedAtRuntime = false;

    protected virtual void Awake()
    {
        ApplyLunaSafeSettings();
    }

    protected virtual void Update()
    {
        if (Application.isPlaying && !isSkinAppliedAtRuntime)
        {
            Debug.Log($"[LunaDebug] Character Update() running for {gameObject.name}.");
            if (skeletonAnimation != null && skeletonAnimation.Skeleton != null)
            {
                skeletonAnimation.updateWhenInvisible = Spine.Unity.UpdateMode.FullUpdate;

                bool hasSkins = currentAppliedSkinNames != null && currentAppliedSkinNames.Count > 0;
                bool hasPairs = currentAppliedPairs != null && currentAppliedPairs.Count > 0;
                
                Debug.Log($"[LunaDebug] {gameObject.name} hasSkins: {hasSkins}, Skin count: {(hasSkins ? currentAppliedSkinNames.Count : 0)}");

                if (hasSkins || hasPairs)
                {
                    ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
                    skeletonAnimation.LateUpdate();
                }

                ApplyLunaSafeSettings();
                isSkinAppliedAtRuntime = true;
            }
        }
    }

    // FIX LUNA CULLING 2: Đẩy bounds lên liên tục bằng LateUpdate, 
    // dùng Execution Order hack (chạy sau Spine)
    private void LateUpdate()
    {
        ApplyLunaSafeSettings();
    }

    private void ApplyLunaSafeSettings()
    {
        if (skeletonAnimation == null) return;

        if (Application.isPlaying)
        {
            // Giữ Spine cập nhật dù object nằm ngoài khung nhìn hoặc chỉ có alpha nhỏ.
            skeletonAnimation.updateWhenInvisible = Spine.Unity.UpdateMode.FullUpdate;

            // Không dùng zSpacing để fake depth cho Luna.
            // zSpacing làm thay đổi thứ tự render giữa các attachment, gây việc attachment "nằm trên"
            // bị đẩy xuống dưới khi giá trị z tăng.
            skeletonAnimation.zSpacing = 0f;
        }

        var meshFilter = skeletonAnimation.GetComponent<MeshFilter>();
        if (meshFilter == null || meshFilter.sharedMesh == null) return;

        var mesh = meshFilter.sharedMesh;
        mesh.RecalculateBounds();

        var bounds = mesh.bounds;
        var safeSize = new Vector3(
            Mathf.Max(bounds.size.x, 1000f),
            Mathf.Max(bounds.size.y, 1000f),
            Mathf.Max(bounds.size.z, 1000f));

        mesh.bounds = new Bounds(Vector3.zero, safeSize);
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
                var source = attachmentPairs[i];
                if (source == null || string.IsNullOrEmpty(source.slotName)) continue;

                UpsertPair(currentAppliedPairs, source.skinName, source.slotName, source.attachmentName,
                    source.isEnabled, source.skeletonDataAsset, source.customPreview);
            }
        }

#if UNITY_EDITOR
        if (!Application.isPlaying) UnityEditor.EditorUtility.SetDirty(this);
#endif

        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
    }

    /// <summary>
    /// Có bộ đồ nào đang được lưu để đắp lại hay không.
    /// </summary>
    public bool HasEquipmentToReapply =>
        (currentAppliedSkinNames != null && currentAppliedSkinNames.Count > 0) ||
        (currentAppliedPairs != null && currentAppliedPairs.Count > 0);

    /// <summary>
    /// Đắp lại đúng bộ đồ đang lưu (skin nền + các override). Dùng sau khi Skeleton bị rebuild.
    /// </summary>
    public void ReapplyCurrentEquipment()
    {
        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
    }

    /// <summary>
    /// Thêm / cập nhật một override cho 1 slot rồi đắp lại ngay.
    /// Dùng cho item nhặt được lúc chơi.
    /// </summary>
    /// <param name="sourceSkinName">Skin chứa placeholder này. Nên điền, vì cùng một placeholder
    /// (ví dụ "face", "hair1/front_Hair") có mặt ở nhiều Skin khác nhau.</param>
    /// <param name="customTexture">Ảnh PNG rời dùng thay cho hình gốc. Để null nếu dùng hình trong atlas.</param>
    public void AddAttachmentOverride(string sourceSkinName, string slotName, string placeholderName,
        bool enabled = true, Texture2D customTexture = null)
    {
        if (string.IsNullOrEmpty(slotName)) return;

        if (currentAppliedPairs == null) currentAppliedPairs = new List<SlotAttachmentPair>();
        UpsertPair(currentAppliedPairs, sourceSkinName, slotName, placeholderName, enabled,
            skeletonAnimation != null ? skeletonAnimation.SkeletonDataAsset : null, customTexture);

#if UNITY_EDITOR
        if (!Application.isPlaying) UnityEditor.EditorUtility.SetDirty(this);
#endif

        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
    }

    /// <summary>
    /// Bỏ override của 1 slot, trả slot đó về đúng những gì Skin nền quy định.
    /// </summary>
    public void RemoveAttachmentOverride(string slotName)
    {
        if (string.IsNullOrEmpty(slotName) || currentAppliedPairs == null) return;

        for (int i = currentAppliedPairs.Count - 1; i >= 0; i--)
        {
            if (currentAppliedPairs[i] != null && currentAppliedPairs[i].slotName == slotName)
                currentAppliedPairs.RemoveAt(i);
        }

        if (forcedAttachments.Remove(slotName)) forcedAttachmentKeys.Remove(slotName);
        forcedSourceSkins.Remove(slotName);

#if UNITY_EDITOR
        if (!Application.isPlaying) UnityEditor.EditorUtility.SetDirty(this);
#endif

        ApplySkinsAndAttachmentsMix(currentAppliedSkinNames, currentAppliedPairs);
    }

    private static void UpsertPair(List<SlotAttachmentPair> list, string skinName, string slotName,
        string placeholderName, bool enabled, SkeletonDataAsset dataAsset, Texture2D customTexture)
    {
        for (int i = 0; i < list.Count; i++)
        {
            if (list[i] == null || list[i].slotName != slotName) continue;

            list[i].isEnabled = enabled;
            list[i].skinName = skinName;
            list[i].attachmentName = placeholderName;
            list[i].customPreview = customTexture;
            if (dataAsset != null) list[i].skeletonDataAsset = dataAsset;
            return;
        }

        list.Add(new SlotAttachmentPair
        {
            isEnabled = enabled,
            skinName = skinName,
            slotName = slotName,
            attachmentName = placeholderName,
            customPreview = customTexture,
            skeletonDataAsset = dataAsset
        });
    }

    private void ApplySkinsAndAttachmentsMix(List<string> skinNames, List<SlotAttachmentPair> pairs)
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;

        var skeleton = skeletonAnimation.Skeleton;
        var skeletonData = skeleton.Data;
        customSkin = new Skin("custom-mix");

        // 1. Gộp Default Skin (lớp nền)
        if (skeletonData.DefaultSkin != null)
            customSkin.AddSkin(skeletonData.DefaultSkin);

        HashSet<string> addedSkinNames = new HashSet<string>();

        // 2. Gộp các Skin nền từ danh sách tên
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

        // 3. Gom danh sách override: pairs (ưu tiên cao nhất) + các slot bị ép ở runtime
        //    (item nhặt được, emotion...) mà pairs không nhắc tới.
        List<SlotAttachmentPair> overrides = new List<SlotAttachmentPair>();
        HashSet<string> overriddenSlots = new HashSet<string>();

        if (pairs != null)
        {
            for (int i = 0; i < pairs.Count; i++)
            {
                var pair = pairs[i];
                if (pair == null || string.IsNullOrEmpty(pair.slotName)) continue;

                // Bỏ tick = không dùng dòng này. Slot giữ nguyên theo Skin nền.
                // Dòng chỉ có ảnh rời (chưa chọn placeholder) vẫn hợp lệ: lấy tên file ảnh làm placeholder.
                if (!pair.isEnabled || string.IsNullOrEmpty(pair.ResolvedPlaceholderName)) continue;

                if (!overriddenSlots.Add(pair.slotName)) continue;
                overrides.Add(pair);
            }
        }

        for (int i = 0; i < forcedAttachmentKeys.Count; i++)
        {
            string slotName = forcedAttachmentKeys[i];
            if (string.IsNullOrEmpty(slotName) || overriddenSlots.Contains(slotName)) continue;

            string attachmentName;
            if (!forcedAttachments.TryGetValue(slotName, out attachmentName)) continue;

            overriddenSlots.Add(slotName);
            overrides.Add(new SlotAttachmentPair
            {
                isEnabled = !string.IsNullOrEmpty(attachmentName),
                skinName = forcedSourceSkins.TryGetValue(slotName, out var forcedSkin) ? forcedSkin : null,
                slotName = slotName,
                attachmentName = attachmentName
            });
        }

        // 4. Nhặt CHÍNH XÁC từng Skin Placeholder cần dùng từ đúng Skin nguồn của nó.
        //    Không AddSkin cả bộ để tránh kéo theo đồ lạ ở các slot khác.
        for (int i = 0; i < overrides.Count; i++)
        {
            var pair = overrides[i];
            if (!pair.isEnabled || string.IsNullOrEmpty(pair.ResolvedPlaceholderName)) continue;

            SlotData slotData = skeletonData.FindSlot(pair.slotName);
            if (slotData == null) continue;

            MergeAttachmentIntoCustomSkin(skeletonData, pair.skinName, slotData.Index, pair.attachmentName,
                pair.customPreview);
        }

        // 5. Đắp tổng hợp Skin lên nhân vật
        skeleton.SetSkin(customSkin);
        skeleton.SetSlotsToSetupPose();

        // 6. Ép bật/tắt chính xác từng slot theo danh sách override
        for (int i = 0; i < overrides.Count; i++)
        {
            var pair = overrides[i];
            string placeholderName = pair.ResolvedPlaceholderName;
            bool turnOn = pair.isEnabled && !string.IsNullOrEmpty(placeholderName);
            ForceSlotAttachment(skeleton, pair.slotName, turnOn ? placeholderName : null, pair.skinName);
        }

        if (Application.isPlaying)
        {
            RefreshSkeletonAndRender();
        }
        else
        {
            skeletonAnimation.LateUpdate();
        }
    }

    private static bool IsStraightAlpha(Material material)
    {
        return material.HasProperty(StraightAlphaProperty) && material.GetFloat(StraightAlphaProperty) > 0.5f;
    }

    /// <summary>
    /// Copy đúng MỘT Skin Placeholder (slot + placeholder) từ Skin nguồn vào customSkin.
    /// Bắt buộc phải có sourceSkinName khi placeholder trùng tên ở nhiều Skin — nếu để trống,
    /// hàm sẽ quét lần lượt và lấy Skin đầu tiên khớp (dễ ra nhầm hình).
    /// </summary>
    private bool MergeAttachmentIntoCustomSkin(SkeletonData skeletonData, string sourceSkinName, int slotIndex,
        string placeholderName, Texture2D customTexture = null)
    {
        if (string.IsNullOrEmpty(placeholderName)) return false;

        string slotDisplayName = skeletonData.Slots.Items[slotIndex].Name;

        // Có chỉ định Skin nguồn -> lấy chính xác từ đó
        if (!string.IsNullOrEmpty(sourceSkinName))
        {
            Skin sourceSkin = skeletonData.FindSkin(sourceSkinName);
            if (sourceSkin == null)
            {
                Debug.LogWarning($"[{name}] Không tìm thấy Skin '{sourceSkinName}'.");
                return false;
            }

            Attachment sourceAttachment = sourceSkin.GetAttachment(slotIndex, placeholderName);
            if (sourceAttachment == null)
            {
                // Không có hình gốc, nhưng nếu có ảnh rời thì vẫn dựng được attachment mới
                if (customTexture != null)
                    return CreateAttachmentFromTexture(customTexture, slotIndex, placeholderName);

                Debug.LogWarning($"[{name}] Skin '{sourceSkinName}' không có placeholder '{placeholderName}' " +
                                 $"ở slot '{slotDisplayName}'.");
                return false;
            }

            customSkin.SetAttachment(slotIndex, placeholderName,
                ApplyCustomTexture(sourceAttachment, customTexture));
            return true;
        }

        // Không chỉ định Skin nguồn -> quét toàn bộ, cảnh báo nếu nhập nhằng
        Attachment found = null;
        string foundSkinName = null;

        for (int s = 0; s < skeletonData.Skins.Count; s++)
        {
            Skin skin = skeletonData.Skins.Items[s];
            Attachment attachment = skin.GetAttachment(slotIndex, placeholderName);
            if (attachment == null) continue;

            if (found == null)
            {
                found = attachment;
                foundSkinName = skin.Name;
                continue;
            }

            Debug.LogWarning($"[{name}] Placeholder '{placeholderName}' ở slot " +
                             $"'{slotDisplayName}' có mặt ở nhiều Skin " +
                             $"(ví dụ '{foundSkinName}' và '{skin.Name}'). Hãy điền Skin Nguồn để chọn đúng hình.");
            break;
        }

        if (found == null)
        {
            // Slot rỗng (không Skin nào có hình cho nó). Đây là trường hợp gắn art hoàn toàn mới
            // từ file PNG rời — dựng thẳng RegionAttachment thay vì báo lỗi.
            if (customTexture != null)
                return CreateAttachmentFromTexture(customTexture, slotIndex, placeholderName);

            return false;
        }

        customSkin.SetAttachment(slotIndex, placeholderName, ApplyCustomTexture(found, customTexture));
        return true;
    }

    /// <summary>
    /// Tạo attachment mới hoàn toàn từ một file ảnh rời, dùng cho slot chưa có hình ở bất kỳ Skin nào.
    /// </summary>
    private bool CreateAttachmentFromTexture(Texture2D customTexture, int slotIndex, string placeholderName)
    {
        Material sourceMaterial = GetAtlasMaterial();
        if (sourceMaterial == null)
        {
            Debug.LogWarning($"[{name}] Không lấy được Material của atlas nên chưa gắn được ảnh " +
                             $"'{customTexture.name}'.");
            return false;
        }

        AtlasRegion region = GetOrCreateCustomRegion(customTexture, sourceMaterial);
        if (region == null) return false;

        float scale = skeletonAnimation != null && skeletonAnimation.SkeletonDataAsset != null
            ? skeletonAnimation.SkeletonDataAsset.scale
            : 0.01f;

        RegionAttachment attachment = region.ToRegionAttachment(placeholderName, scale);
        if (attachment == null) return false;

        customSkin.SetAttachment(slotIndex, placeholderName, attachment);
        return true;
    }

    /// <summary>
    /// Material của atlas Spine, dùng làm nguồn shader/thuộc tính cho ảnh rời.
    /// </summary>
    private Material GetAtlasMaterial()
    {
        var dataAsset = skeletonAnimation != null ? skeletonAnimation.SkeletonDataAsset : null;
        if (dataAsset == null || dataAsset.atlasAssets == null) return null;

        for (int i = 0; i < dataAsset.atlasAssets.Length; i++)
        {
            var atlasAsset = dataAsset.atlasAssets[i];
            if (atlasAsset != null && atlasAsset.PrimaryMaterial != null) return atlasAsset.PrimaryMaterial;
        }

        return null;
    }

    // Cache region đã dựng từ ảnh thay thế: (texture, material) -> AtlasRegion.
    // Nếu không cache thì mỗi lần đắp đồ lại tạo thêm 1 Texture2D + 1 Material -> rò rỉ bộ nhớ.
    private static Dictionary<long, AtlasRegion> customRegionCache = new Dictionary<long, AtlasRegion>();

    /// <summary>
    /// Nếu dòng có gán Ảnh Thay Thế thì dựng bản sao của attachment dùng ảnh đó.
    /// MeshAttachment được clone dạng linked mesh nên vẫn ăn theo animation biến dạng của bản gốc.
    /// </summary>
    private Attachment ApplyCustomTexture(Attachment original, Texture2D customTexture)
    {
        if (original == null || customTexture == null) return original;

        Material sourceMaterial = GetAttachmentMaterial(original);
        if (sourceMaterial == null)
        {
            Debug.LogWarning($"[{name}] Không lấy được Material gốc của attachment '{original.Name}', " +
                             "bỏ qua ảnh thay thế.");
            return original;
        }

        AtlasRegion region = GetOrCreateCustomRegion(customTexture, sourceMaterial);
        if (region == null) return original;

        // useOriginalRegionSize = true: giữ đúng kích thước của attachment gốc, không phình theo pixel của ảnh mới
        return original.GetRemappedClone(region, cloneMeshAsLinked: true, useOriginalRegionSize: true);
    }

    /// <summary>
    /// Dựng (và cache) AtlasRegion từ một ảnh rời, chọn đúng cách xử lý alpha theo material của atlas.
    /// </summary>
    private AtlasRegion GetOrCreateCustomRegion(Texture2D customTexture, Material sourceMaterial)
    {
        long cacheKey = ((long)customTexture.GetInstanceID() << 32) ^ (uint)sourceMaterial.GetInstanceID();

        AtlasRegion region;
        if (customRegionCache.TryGetValue(cacheKey, out region) && region != null) return region;

        if (IsStraightAlpha(sourceMaterial))
        {
            // Material của atlas đang bật Straight Alpha Input -> shader tự xử lý alpha,
            // KHÔNG được nhân alpha trước, nếu không ảnh sẽ bị tối đi.
            // Đường này cũng không cần ảnh bật Read/Write.
            region = customTexture.ToAtlasRegion(sourceMaterial);
        }
        else if (customTexture.isReadable)
        {
            // Atlas dùng premultiplied alpha -> phải nhân alpha vào màu cho khớp
            region = customTexture.ToAtlasRegionPMAClone(sourceMaterial);
        }
        else
        {
            Debug.LogWarning($"[{name}] Atlas dùng premultiplied alpha nhưng ảnh '{customTexture.name}' " +
                             "chưa bật Read/Write Enabled nên không chuyển sang PMA được. " +
                             "Ảnh vẫn hiện nhưng viền có thể bị sáng/tối bất thường. " +
                             "Vào Import Settings của ảnh và tick Read/Write Enabled.");
            region = customTexture.ToAtlasRegion(sourceMaterial);
        }

        customRegionCache[cacheKey] = region;
        return region;
    }

    private static Material GetAttachmentMaterial(Attachment attachment)
    {
        AtlasRegion region = null;
        if (attachment is RegionAttachment regionAttachment)
            region = regionAttachment.Region as AtlasRegion;
        else if (attachment is MeshAttachment meshAttachment)
            region = meshAttachment.Region as AtlasRegion;

        if (region == null || region.page == null) return null;
        return region.page.rendererObject as Material;
    }

    /// <summary>
    /// Set Skin Placeholder cho slot và ghi nhớ vào bảng forcedAttachments để đắp lại sau mỗi lần mix.
    /// </summary>
    private void ForceSlotAttachment(Skeleton skeleton, string slotName, string placeholderName,
        string sourceSkinName)
    {
        if (skeleton == null || string.IsNullOrEmpty(slotName)) return;

        try
        {
            skeleton.SetAttachment(slotName, placeholderName);
        }
        catch (System.Exception)
        {
            // Bỏ qua nếu slot hoặc placeholder không tồn tại
            return;
        }

        if (!forcedAttachments.ContainsKey(slotName)) forcedAttachmentKeys.Add(slotName);
        forcedAttachments[slotName] = placeholderName;

        if (string.IsNullOrEmpty(sourceSkinName)) forcedSourceSkins.Remove(slotName);
        else forcedSourceSkins[slotName] = sourceSkinName;
    }

    private void RefreshSkeletonAndRender()
    {
        if (skeletonAnimation == null || skeletonAnimation.Skeleton == null) return;

        // Update Spine once with the current state and keep manual attachment changes.
        skeletonAnimation.Update(0f);
        skeletonAnimation.LateUpdate();
        ApplyLunaSafeSettings();
    }

    // ===== API CŨ (Giữ lại để tương thích với SpineEmotionController, ToggleBoneSlot) =====

    public void TurnSlotAttachment(string slotName, string attachmentName = null, string sourceSkinName = null)
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
                    if (attachment == null && customSkin != null)
                    {
                        // Skin hiện tại chưa có món đồ này -> nhặt nó từ Skin nguồn rồi đắp thêm vào
                        if (MergeAttachmentIntoCustomSkin(skeletonAnimation.Skeleton.Data, sourceSkinName, slotIndex,
                                attachmentName))
                            attachment = skeletonAnimation.Skeleton.GetAttachment(slotIndex, attachmentName);
                    }

                    if (attachment != null)
                    {
                        skeletonAnimation.Skeleton.SetAttachment(slotName, attachmentName);
                    }
                    else
                    {
                        // Không tìm thấy ở bất kỳ Skin nào -> Bỏ qua, không báo lỗi
                        return;
                    }
                }
            }

            if (!forcedAttachments.ContainsKey(slotName))
            {
                forcedAttachmentKeys.Add(slotName);
            }
            forcedAttachments[slotName] = attachmentName;

            if (string.IsNullOrEmpty(sourceSkinName)) forcedSourceSkins.Remove(slotName);
            else forcedSourceSkins[slotName] = sourceSkinName;

            if (skeletonAnimation.AnimationState != null)
            {
                skeletonAnimation.AnimationState.Apply(skeletonAnimation.Skeleton);
            }

            skeletonAnimation.LateUpdate();
            ApplyLunaSafeSettings();
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
            TurnSlotAttachment(pair.slotName, pair.attachmentName, pair.skinName);
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