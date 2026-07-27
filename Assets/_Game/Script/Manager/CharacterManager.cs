using System.Collections.Generic;
using UnityEngine;
using Spine.Unity;
#if UNITY_EDITOR
using Sirenix.OdinInspector;
using Spine;
#endif

[System.Serializable]
public class CharacterEquipmentSetup
{
    public Character character;
    public EquipmentSetData equipmentData;
}

public class CharacterManager : MonoBehaviour
{
    public static CharacterManager instance;

    private void Awake()
    {
        instance = this;
    }

    [Header("Danh Sách Nhân Vật & Set Đồ")]
    public List<CharacterEquipmentSetup> characterSetups = new List<CharacterEquipmentSetup>();

    [Header("Các nhân vật cần Scale")]
    public Transform character1;

    private int lastScreenWidth;
    private int lastScreenHeight;
    private Dictionary<Transform, Vector3> originalScales = new Dictionary<Transform, Vector3>();
    private Dictionary<Transform, Vector3> originalPositions = new Dictionary<Transform, Vector3>();

#if UNITY_EDITOR
    [Title("Cấu hình Set Đồ (Skin-Based)")]
    [Header("Chọn Nhân Vật Để Test")]
    [ValueDropdown("GetCharacterChoices")]
    public Character targetTestCharacter;

    [Header("File Data Để Lưu / Tải")]
    [InlineEditor]
    public EquipmentSetData testEquipmentDataAsset;

    // ===== DANH SÁCH SKIN ĐỂ MIX =====
    [Title("Danh Sách Skin Đang Chọn (Base)")]
    [InfoBox("Tick vào các Skin nền tảng bạn muốn mặc cho nhân vật. Có thể chọn nhiều Skin cùng lúc (mix).")]
    [ListDrawerSettings(ShowFoldout = true)]
    [Searchable]
    public List<SkinToggleEntry> mySkinSet = new List<SkinToggleEntry>();

    // ===== DANH SÁCH ATTACHMENT GHI ĐÈ =====
    [Title("Danh Sách Attachment Ghi Đè (Overrides)")]
    [InfoBox("Tick vào các chi tiết bạn muốn ép bật/tắt đè lên các Skin ở trên.")]
    [LabelText("Sử dụng bảng Attachment")]
    public bool useEquipmentOverrides = true;

    [EnableIf("useEquipmentOverrides")]
    [ListDrawerSettings(ShowFoldout = true)]
    [Searchable]
    public List<SlotAttachmentPair> myEquipmentSet = new List<SlotAttachmentPair>();

    private IEnumerable<Character> GetCharacterChoices()
    {
        var choices = new List<Character>();
        if (characterSetups != null)
        { 
            for(int i = 0; i < characterSetups.Count; i++)
            {
                if (characterSetups[i] != null && characterSetups[i].character != null)
                    choices.Add(characterSetups[i].character);
            }
        }
        return choices;
    }
#endif

    private void Start()
    {
        // Lưu lại origin scale của các nhân vật
        if (character1 != null)
        {
            originalScales[character1] = character1.localScale;
            originalPositions[character1] = character1.position;
        }
        for (int i = 0; i < characterSetups.Count; i++)
        {
            if (characterSetups[i] != null && characterSetups[i].character != null)
            {
                Transform t = characterSetups[i].character.transform;
                if (!originalScales.ContainsKey(t)) originalScales[t] = t.localScale;
                if (!originalPositions.ContainsKey(t)) originalPositions[t] = t.position;
            }
        }

        // Tự động mặc đồ khi bắt đầu game
        if (Application.isPlaying)
        {
            EquipAll();
            lastScreenWidth = Screen.width;
            lastScreenHeight = Screen.height;
            UpdateCharacterScale();
        }
    }


    private void UpdateCharacterScale()
    {
        // Removed auto-scale logic
    }

    public void EquipAll()
    {
        for (int i = 0; i < characterSetups.Count; i++)
        {
            EquipCharacter(characterSetups[i].character, characterSetups[i].equipmentData);
        }
    }

    /// <summary>
    /// Mặc đồ cho nhân vật bằng hệ thống Mix Skin kết hợp Attachment.
    /// </summary>
    public void EquipCharacter(Character character, EquipmentSetData equipmentData)
    {
        if (character == null || equipmentData == null) return;
        List<SlotAttachmentPair> pairsToUse = equipmentData.useEquipmentSet ? equipmentData.equipmentSet : null;
        character.MixSkinsAndAttachments(equipmentData.skinNames, pairsToUse);
    }

    // Mặc đồ từ thông tin của ItemController (Hỗ trợ Item có nhiều part/slot)
    public void Add1ItemToEquipment(ItemController item)
    {
        if (item == null) return;
        for (int i = 0; i < item.itemAttachments.Count; i++)
        {
            var setup = item.itemAttachments[i];
            if (setup.characterSetup != null)
                setup.characterSetup.TurnSlotAttachment(setup.slotName, setup.attachName);
        }
    }

    public void PlayHappyAnim()
    {
        for (int i = 0; i < characterSetups.Count; i++)
        {
            if (characterSetups[i] != null && characterSetups[i].character != null)
            {
                var emotionController = characterSetups[i].character.GetComponent<SpineEmotionController>();
                if (emotionController != null)
                {
                    emotionController.PlayHappyAnim();
                }
            }
        }
    }

    public void PlayAngryAnim()
    {
        for (int i = 0; i < characterSetups.Count; i++)
        {
            if (characterSetups[i] != null && characterSetups[i].character != null)
            {
                var emotionController = characterSetups[i].character.GetComponent<SpineEmotionController>();
                if (emotionController != null)
                {
                    emotionController.PlayAngryAnim();
                }
            }
        }
    }

#if UNITY_EDITOR
    // ===== NÚT LẤY TẤT CẢ SKIN TỪ TARGET =====
    [Button("Lấy Tất Cả Skin Từ Target", ButtonSizes.Large)]
    [GUIColor(0.2f, 0.8f, 0.2f)]
    public void GetAllSkins()
    {
        if (targetTestCharacter == null || targetTestCharacter.SkeletonAnimation == null)
        {
            Debug.LogError("Chưa gán Target Test Character hoặc SkeletonAnimation chưa khởi tạo!");
            return;
        }

        var skeletonDataAsset = targetTestCharacter.SkeletonAnimation.SkeletonDataAsset;
        if (skeletonDataAsset == null) return;

        SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
        if (skeletonData == null) return;

        if (mySkinSet == null) mySkinSet = new List<SkinToggleEntry>();
        mySkinSet.Clear();

        for (int s = 0; s < skeletonData.Skins.Count; s++)
        {
            Skin skin = skeletonData.Skins.Items[s];
            if (skin.Name == "default") continue;

            mySkinSet.Add(new SkinToggleEntry
            {
                isEnabled = false,
                skinName = skin.Name,
                skeletonDataAsset = skeletonDataAsset
            });
        }

        Debug.Log($"Đã lấy {mySkinSet.Count} skin từ skeleton.");
    }

    [Button("Lấy Tất Cả Attachment Từ Target", ButtonSizes.Large)]
    [GUIColor(0.2f, 0.7f, 0.4f)]
    public void GetAllAttachments()
    {
        if (targetTestCharacter == null || targetTestCharacter.SkeletonAnimation == null || targetTestCharacter.SkeletonAnimation.Skeleton == null)
        {
            Debug.LogError("Chưa gán Target Test Character hoặc SkeletonAnimation chưa khởi tạo!");
            return;
        }

        if (myEquipmentSet == null) myEquipmentSet = new List<SlotAttachmentPair>();
        myEquipmentSet.Clear();

        Skeleton skeleton = targetTestCharacter.SkeletonAnimation.Skeleton;
        SkeletonData skeletonData = skeleton.Data;
        var skeletonDataAsset = targetTestCharacter.SkeletonAnimation.SkeletonDataAsset;

        for (int i = 0; i < skeleton.Slots.Count; i++)
        {
            Slot slot = skeleton.Slots.Items[i];
            string finalAttachmentName = null;
            bool foundInAnySkin = false;

            for (int s = 0; s < skeletonData.Skins.Count; s++)
            {
                Skin skin = skeletonData.Skins.Items[s];
                List<Skin.SkinEntry> entries = new List<Skin.SkinEntry>();
                skin.GetAttachments(i, entries);

                if (entries.Count > 0)
                {
                    finalAttachmentName = entries[0].Name;
                    foundInAnySkin = true;
                    break;
                }
            }

            if (!foundInAnySkin)
            {
                finalAttachmentName = slot.Data.AttachmentName;
            }

            bool shouldEnable = (slot.Attachment != null);

            myEquipmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = shouldEnable,
                slotName = slot.Data.Name,
                attachmentName = finalAttachmentName,
                skeletonDataAsset = skeletonDataAsset
            });
        }

        Debug.Log($"Đã lấy {myEquipmentSet.Count} attachment từ skeleton.");
    }

    // ===== LƯU / TẢI =====
    [HorizontalGroup("SaveLoad")]
    [Button("Lưu vào Asset", ButtonSizes.Medium)]
    [GUIColor(1f, 0.8f, 0.4f)]
    public void SaveToAsset()
    {
        if (testEquipmentDataAsset == null)
        {
            Debug.LogError("Chưa gán Test Equipment Data Asset để lưu! Hãy tạo file data và kéo vào ô phía trên.");
            return;
        }

        // Lưu Skin
        testEquipmentDataAsset.skinNames.Clear();
        for (int i = 0; i < mySkinSet.Count; i++)
        {
            if (mySkinSet[i].isEnabled && !string.IsNullOrEmpty(mySkinSet[i].skinName))
            {
                testEquipmentDataAsset.skinNames.Add(mySkinSet[i].skinName);
            }
        }

        // Lưu Attachment
        testEquipmentDataAsset.useEquipmentSet = this.useEquipmentOverrides;
        testEquipmentDataAsset.equipmentSet.Clear();
        if (myEquipmentSet != null)
        {
            for (int i = 0; i < myEquipmentSet.Count; i++)
            {
                var pair = myEquipmentSet[i];
                testEquipmentDataAsset.equipmentSet.Add(new SlotAttachmentPair
                {
                    isEnabled = pair.isEnabled,
                    slotName = pair.slotName,
                    attachmentName = pair.attachmentName,
                    skeletonDataAsset = pair.skeletonDataAsset
                });
            }
        }

        UnityEditor.EditorUtility.SetDirty(testEquipmentDataAsset);
        UnityEditor.AssetDatabase.SaveAssets();
        Debug.Log($"Đã lưu {testEquipmentDataAsset.skinNames.Count} skin và {testEquipmentDataAsset.equipmentSet.Count} attachment vào Asset: {testEquipmentDataAsset.name}");
    }

    [HorizontalGroup("SaveLoad")]
    [Button("Tải từ Asset", ButtonSizes.Medium)]
    [GUIColor(0.4f, 0.8f, 1f)]
    public void LoadFromAsset()
    {
        if (testEquipmentDataAsset == null)
        {
            Debug.LogError("Chưa gán Test Equipment Data Asset để tải!");
            return;
        }

        // Tải Skin
        if (mySkinSet == null || mySkinSet.Count == 0) GetAllSkins();
        HashSet<string> savedSkins = new HashSet<string>(testEquipmentDataAsset.skinNames);
        for (int i = 0; i < mySkinSet.Count; i++)
        {
            mySkinSet[i].isEnabled = savedSkins.Contains(mySkinSet[i].skinName);
        }

        // Tải Attachment
        this.useEquipmentOverrides = testEquipmentDataAsset.useEquipmentSet;
        if (myEquipmentSet == null) myEquipmentSet = new List<SlotAttachmentPair>();
        myEquipmentSet.Clear();
        for (int i = 0; i < testEquipmentDataAsset.equipmentSet.Count; i++)
        {
            var pair = testEquipmentDataAsset.equipmentSet[i];
            myEquipmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = pair.isEnabled,
                slotName = pair.slotName,
                attachmentName = pair.attachmentName,
                skeletonDataAsset = pair.skeletonDataAsset
            });
        }

        Debug.Log($"Đã tải {testEquipmentDataAsset.skinNames.Count} skin và {testEquipmentDataAsset.equipmentSet.Count} attachment từ Asset: {testEquipmentDataAsset.name}");
        EditorEquip(); // Cập nhật luôn lên màn hình test
    }

    // ===== MẶC ĐỒ NGAY =====
    [Button("Mặc Đồ Ngay (Chỉ Target)", ButtonSizes.Medium)]
    [GUIColor(0.4f, 1f, 0.4f)]
    public void EditorEquip()
    {
        if (targetTestCharacter == null) return;

        List<string> enabledSkins = new List<string>();
        if (mySkinSet != null)
        {
            for (int i = 0; i < mySkinSet.Count; i++)
            {
                if (mySkinSet[i].isEnabled && !string.IsNullOrEmpty(mySkinSet[i].skinName))
                {
                    enabledSkins.Add(mySkinSet[i].skinName);
                }
            }
        }

        List<SlotAttachmentPair> pairsToUse = useEquipmentOverrides ? myEquipmentSet : null;
        targetTestCharacter.MixSkinsAndAttachments(enabledSkins, pairsToUse);
        Debug.Log($"Đã mặc {enabledSkins.Count} skin và {pairsToUse?.Count ?? 0} cấu hình attachment.");
    }

    [Button("Tắt Tất Cả Đồ (Chỉ Target)", ButtonSizes.Medium)]
    [GUIColor(1f, 0.4f, 0.4f)]
    public void DisableAllItems()
    {
        if (targetTestCharacter == null) return;

        if (mySkinSet != null)
        {
            for (int i = 0; i < mySkinSet.Count; i++) mySkinSet[i].isEnabled = false;
        }

        if (myEquipmentSet != null)
        {
            for (int i = 0; i < myEquipmentSet.Count; i++) myEquipmentSet[i].isEnabled = false;
        }

        // Đắp lại rỗng
        List<SlotAttachmentPair> pairsToUse = useEquipmentOverrides ? myEquipmentSet : null;
        targetTestCharacter.MixSkinsAndAttachments(new List<string>(), pairsToUse);
    }

#endif
}

#if UNITY_EDITOR
/// <summary>
/// Một entry trong danh sách skin, có checkbox bật/tắt.
/// </summary>
[System.Serializable]
public class SkinToggleEntry
{
    [TableColumnWidth(50, Resizable = false)]
    [LabelText("Bật")]
    public bool isEnabled;

    [LabelText("Tên Skin")]
    public string skinName;

    [HideInInspector]
    public SkeletonDataAsset skeletonDataAsset;

    // ===== PREVIEW ẢNH SKIN =====
    private static Dictionary<string, Texture2D> _previewCache = new Dictionary<string, Texture2D>();

    [ShowInInspector]
    [PreviewField(45, ObjectFieldAlignment.Center)]
    [TableColumnWidth(55, Resizable = false)]
    [LabelText("Ảnh")]
    public Texture2D SkinPreview
    {
        get
        {
            if (skeletonDataAsset == null || string.IsNullOrEmpty(skinName))
                return null;

            string key = $"{skeletonDataAsset.GetInstanceID()}_{skinName}";
            if (_previewCache.TryGetValue(key, out var cached) && cached != null)
                return cached;

            var preview = GeneratePreview();
            if (preview != null)
                _previewCache[key] = preview;
            return preview;
        }
    }

    public static void ClearPreviewCache()
    {
        foreach (var tex in _previewCache.Values)
        {
            if (tex != null) Object.DestroyImmediate(tex);
        }
        _previewCache.Clear();
    }

    private Texture2D GeneratePreview()
    {
        var skeletonData = skeletonDataAsset.GetSkeletonData(true);
        if (skeletonData == null) return null;

        var skin = skeletonData.FindSkin(skinName);
        if (skin == null) return null;

        // Lấy attachment đầu tiên có chứa hình ảnh trong skin này
        foreach (var entry in skin.Attachments)
        {
            var attachment = entry.Attachment;
            AtlasRegion region = null;
            if (attachment is RegionAttachment regionAtt)
                region = regionAtt.Region as AtlasRegion;
            else if (attachment is MeshAttachment meshAtt)
                region = meshAtt.Region as AtlasRegion;

            if (region != null)
                return ExtractRegionTexture(region);
        }

        return null;
    }

    private static Texture2D ExtractRegionTexture(AtlasRegion region)
    {
        Texture2D atlasTexture = null;
        if (region.page.rendererObject is Material mat)
            atlasTexture = mat.mainTexture as Texture2D;
        else if (region.page.rendererObject is Texture2D tex)
            atlasTexture = tex;
        if (atlasTexture == null) return null;

        float minU = Mathf.Min(region.u, region.u2);
        float minV = Mathf.Min(region.v, region.v2);
        float maxU = Mathf.Max(region.u, region.u2);
        float maxV = Mathf.Max(region.v, region.v2);

        int regionW = Mathf.Max(1, Mathf.RoundToInt((maxU - minU) * atlasTexture.width));
        int regionH = Mathf.Max(1, Mathf.RoundToInt((maxV - minV) * atlasTexture.height));

        int maxSize = 64;
        int previewW = regionW;
        int previewH = regionH;
        if (previewW > maxSize || previewH > maxSize)
        {
            float aspect = (float)previewW / previewH;
            if (previewW >= previewH)
            {
                previewW = maxSize;
                previewH = Mathf.Max(1, Mathf.RoundToInt(maxSize / aspect));
            }
            else
            {
                previewH = maxSize;
                previewW = Mathf.Max(1, Mathf.RoundToInt(maxSize * aspect));
            }
        }

        RenderTexture rt = RenderTexture.GetTemporary(previewW, previewH, 0, RenderTextureFormat.ARGB32);
        rt.filterMode = FilterMode.Bilinear;

        Vector2 scale = new Vector2(maxU - minU, maxV - minV);
        Vector2 offset = new Vector2(minU, minV);
        Graphics.Blit(atlasTexture, rt, scale, offset);

        RenderTexture previous = RenderTexture.active;
        RenderTexture.active = rt;

        Texture2D preview = new Texture2D(previewW, previewH, TextureFormat.ARGB32, false);
        preview.ReadPixels(new Rect(0, 0, previewW, previewH), 0, 0);
        preview.Apply();
        preview.hideFlags = HideFlags.HideAndDontSave;

        RenderTexture.active = previous;
        RenderTexture.ReleaseTemporary(rt);

        return preview;
    }
}
#endif
