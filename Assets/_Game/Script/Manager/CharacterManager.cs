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
    [Searchable(FilterOptions = SearchFilterOptions.ISearchFilterableInterface)]
    public List<SkinToggleEntry> mySkinSet = new List<SkinToggleEntry>();

    // ===== DANH SÁCH OVERRIDE TỪNG SLOT =====
    [Title("Override Từng Slot (Đè Lên Skin)")]
    [InfoBox("Mỗi dòng = lấy 1 Skin Placeholder từ 1 Skin nguồn rồi đắp lên 1 slot.\n" +
             "Tick = ép mặc placeholder đó lên slot (kể cả Skin nền không có).\n" +
             "Bỏ tick + CÓ placeholder = ép TẮT slot đó (khoét bớt Skin nền).\n" +
             "Bỏ tick + TRỐNG placeholder = bỏ qua dòng, slot giữ nguyên theo Skin nền.\n" +
             "LƯU Ý: file Spine này có nhiều placeholder trùng tên ở nhiều Skin (face, head, hair1/front_Hair...) " +
             "nên BẮT BUỘC phải điền Skin Nguồn.\n\n" +
             "TÌM KIẾM (ô Search ngay trên bảng):\n" +
             "   hair                 → tìm ở cả Skin, Slot, Placeholder\n" +
             "   skin:hair_Kpop_3     → chỉ lọc theo Skin nguồn\n" +
             "   slot:head            → chỉ lọc theo Slot\n" +
             "   ph:front_Hair        → chỉ lọc theo Placeholder\n" +
             "   on / off             → lọc theo trạng thái tick\n" +
             "   skin:shirt on        → nhiều từ khoá = phải khớp TẤT CẢ")]
    [TableList(ShowIndexLabels = true)]
    [Searchable(FilterOptions = SearchFilterOptions.ISearchFilterableInterface)]
    public List<SlotAttachmentPair> myAttachmentSet = new List<SlotAttachmentPair>();



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
        character.MixSkinsAndAttachments(equipmentData.skinNames, equipmentData.attachmentPairs);
    }

    // Mặc đồ từ thông tin của ItemController (Hỗ trợ Item có nhiều part/slot)
    public void Add1ItemToEquipment(ItemController item)
    {
        if (item == null) return;
        for (int i = 0; i < item.itemAttachments.Count; i++)
        {
            var setup = item.itemAttachments[i];
            if (setup.characterSetup != null)
                setup.characterSetup.AddAttachmentOverride(setup.skinName, setup.slotName, setup.attachName, true);
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

    // ===== NÚT TÁCH 1 SKIN THÀNH TỪNG PHẦN =====
    [Title("Tách Skin Thành Từng Phần")]
    [InfoBox("Chọn 1 Skin rồi bấm nút: mỗi Skin Placeholder trong Skin đó thành 1 dòng ở bảng dưới.\n" +
             "Sau đó XOÁ những dòng không muốn dùng (ví dụ bỏ dòng 'head' để không đè đầu).")]
    [ValueDropdown("GetSkinChoices")]
    [LabelText("Skin Cần Tách")]
    public string skinToSplit;

    [Button("Tách Skin Thành Các Dòng", ButtonSizes.Large)]
    [GUIColor(0.2f, 0.6f, 0.9f)]
    public void SplitSkinIntoParts()
    {
        var skeletonDataAsset = GetTargetSkeletonDataAsset();
        if (skeletonDataAsset == null)
        {
            Debug.LogError("Chưa gán Target Test Character hoặc SkeletonAnimation chưa khởi tạo!");
            return;
        }

        if (string.IsNullOrEmpty(skinToSplit))
        {
            Debug.LogError("Chưa chọn Skin cần tách! Hãy chọn ở ô 'Skin Cần Tách' ngay phía trên nút này.");
            return;
        }

        SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
        if (skeletonData == null) return;

        Skin skin = skeletonData.FindSkin(skinToSplit);
        if (skin == null)
        {
            Debug.LogError($"Không tìm thấy Skin '{skinToSplit}'.");
            return;
        }

        if (myAttachmentSet == null) myAttachmentSet = new List<SlotAttachmentPair>();

        int added = 0;
        foreach (Skin.SkinEntry entry in skin.Attachments)
        {
            string slotName = skeletonData.Slots.Items[entry.SlotIndex].Name;

            // Đã có dòng cho slot này rồi thì cập nhật, chưa có thì thêm mới
            bool exists = false;
            for (int i = 0; i < myAttachmentSet.Count; i++)
            {
                if (myAttachmentSet[i] == null || myAttachmentSet[i].slotName != slotName) continue;

                myAttachmentSet[i].isEnabled = true;
                myAttachmentSet[i].skinName = skinToSplit;
                myAttachmentSet[i].attachmentName = entry.Name;
                myAttachmentSet[i].skeletonDataAsset = skeletonDataAsset;
                exists = true;
                break;
            }
            if (exists) continue;

            myAttachmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = true,
                skinName = skinToSplit,
                slotName = slotName,
                attachmentName = entry.Name,
                skeletonDataAsset = skeletonDataAsset
            });
            added++;
        }

        Debug.Log($"Đã tách Skin '{skinToSplit}' thành {added} dòng mới (tổng {myAttachmentSet.Count}).");
    }

    /// <summary>
    /// Chỉ liệt kê Skin thật sự có hình. Bỏ 'default' và các Skin rỗng (ví dụ 'empty')
    /// vì tách chúng ra sẽ không sinh được dòng nào.
    /// </summary>
    private IEnumerable<ValueDropdownItem<string>> GetSkinChoices()
    {
        var items = new List<ValueDropdownItem<string>>
        {
            new ValueDropdownItem<string>("(Chưa chọn)", string.Empty)
        };

        var skeletonDataAsset = GetTargetSkeletonDataAsset();
        if (skeletonDataAsset == null) return items;

        SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
        if (skeletonData == null) return items;

        for (int i = 0; i < skeletonData.Skins.Count; i++)
        {
            Skin skin = skeletonData.Skins.Items[i];
            if (skin.Name == "default") continue;

            int count = 0;
            foreach (Skin.SkinEntry unused in skin.Attachments) count++;
            if (count == 0) continue;

            items.Add(new ValueDropdownItem<string>($"{skin.Name}  ({count} phần)", skin.Name));
        }

        return items;
    }

    [Button("Làm Mới Ảnh Preview", ButtonSizes.Medium)]
    [GUIColor(0.8f, 0.8f, 1f)]
    public void RefreshPreviews()
    {
        SlotAttachmentPair.ClearPreviewCache();
        SkinToggleEntry.ClearPreviewCache();
        Debug.Log("Đã xoá cache ảnh preview, Inspector sẽ dựng lại ảnh.");
    }

    // ===== DỌN BẢNG =====
    [HorizontalGroup("CleanTable")]
    [Button("Xoá Các Dòng Rỗng", ButtonSizes.Medium)]
    [GUIColor(1f, 0.85f, 0.5f)]
    public void RemoveEmptyRows()
    {
        if (myAttachmentSet == null) return;

        int before = myAttachmentSet.Count;
        for (int i = myAttachmentSet.Count - 1; i >= 0; i--)
        {
            var pair = myAttachmentSet[i];
            if (pair == null || (!pair.isEnabled && string.IsNullOrEmpty(pair.attachmentName)))
                myAttachmentSet.RemoveAt(i);
        }

        Debug.Log($"Đã xoá {before - myAttachmentSet.Count} dòng rỗng, còn lại {myAttachmentSet.Count} dòng.");
    }

    [HorizontalGroup("CleanTable")]
    [Button("Sắp Xếp Theo Skin", ButtonSizes.Medium)]
    [GUIColor(0.6f, 0.9f, 1f)]
    public void SortRowsBySkin()
    {
        if (myAttachmentSet == null) return;

        myAttachmentSet.Sort((a, b) =>
        {
            if (a == null) return b == null ? 0 : 1;
            if (b == null) return -1;

            int bySkin = string.Compare(a.skinName ?? string.Empty, b.skinName ?? string.Empty,
                System.StringComparison.OrdinalIgnoreCase);
            if (bySkin != 0) return bySkin;

            return string.Compare(a.slotName ?? string.Empty, b.slotName ?? string.Empty,
                System.StringComparison.OrdinalIgnoreCase);
        });

        Debug.Log($"Đã sắp xếp {myAttachmentSet.Count} dòng theo Skin nguồn.");
    }

    [HorizontalGroup("CleanTable")]
    [Button("Xoá Sạch Bảng", ButtonSizes.Medium)]
    [GUIColor(1f, 0.5f, 0.5f)]
    public void ClearAttachmentTable()
    {
        int before = myAttachmentSet != null ? myAttachmentSet.Count : 0;
        myAttachmentSet = new List<SlotAttachmentPair>();
        Debug.Log($"Đã xoá sạch {before} dòng trong bảng override.");
    }

    private SkeletonDataAsset GetTargetSkeletonDataAsset()
    {
        if (targetTestCharacter == null || targetTestCharacter.SkeletonAnimation == null) return null;
        return targetTestCharacter.SkeletonAnimation.SkeletonDataAsset;
    }

    private List<string> GetEnabledSkinNames()
    {
        var enabledSkins = new List<string>();
        if (mySkinSet == null) return enabledSkins;

        for (int i = 0; i < mySkinSet.Count; i++)
        {
            if (mySkinSet[i].isEnabled && !string.IsNullOrEmpty(mySkinSet[i].skinName))
                enabledSkins.Add(mySkinSet[i].skinName);
        }
        return enabledSkins;
    }

    /// <summary>
    /// Chỉ lấy các dòng thật sự có tác dụng: đã chọn slot VÀ (bật kèm attachment HOẶC tắt slot chủ động).
    /// Dòng trống (chưa tick, chưa chọn attachment) được bỏ qua để không tắt oan slot của Skin nền.
    /// </summary>
    private List<SlotAttachmentPair> GetMeaningfulPairs()
    {
        var result = new List<SlotAttachmentPair>();
        if (myAttachmentSet == null) return result;

        for (int i = 0; i < myAttachmentSet.Count; i++)
        {
            var pair = myAttachmentSet[i];
            if (pair == null || string.IsNullOrEmpty(pair.slotName)) continue;
            if (!pair.isEnabled && string.IsNullOrEmpty(pair.attachmentName)) continue;

            result.Add(pair);
        }
        return result;
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
        testEquipmentDataAsset.skinNames.AddRange(GetEnabledSkinNames());

        // Lưu Override từng slot
        var dataAsset = GetTargetSkeletonDataAsset();
        if (dataAsset != null) testEquipmentDataAsset.targetSkeletonDataAsset = dataAsset;

        testEquipmentDataAsset.attachmentPairs.Clear();
        var meaningfulPairs = GetMeaningfulPairs();
        for (int i = 0; i < meaningfulPairs.Count; i++)
        {
            testEquipmentDataAsset.attachmentPairs.Add(new SlotAttachmentPair
            {
                isEnabled = meaningfulPairs[i].isEnabled,
                skinName = meaningfulPairs[i].skinName,
                slotName = meaningfulPairs[i].slotName,
                attachmentName = meaningfulPairs[i].attachmentName,
                skeletonDataAsset = dataAsset
            });
        }

        UnityEditor.EditorUtility.SetDirty(testEquipmentDataAsset);
        UnityEditor.AssetDatabase.SaveAssets();
        Debug.Log($"Đã lưu {testEquipmentDataAsset.skinNames.Count} skin + " +
                  $"{testEquipmentDataAsset.attachmentPairs.Count} override vào Asset: {testEquipmentDataAsset.name}");
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

        // Tải Override từng slot
        var dataAsset = GetTargetSkeletonDataAsset();
        myAttachmentSet = new List<SlotAttachmentPair>();
        for (int i = 0; i < testEquipmentDataAsset.attachmentPairs.Count; i++)
        {
            var saved = testEquipmentDataAsset.attachmentPairs[i];
            if (saved == null) continue;

            myAttachmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = saved.isEnabled,
                skinName = saved.skinName,
                slotName = saved.slotName,
                attachmentName = saved.attachmentName,
                skeletonDataAsset = dataAsset != null ? dataAsset : saved.skeletonDataAsset
            });
        }

        Debug.Log($"Đã tải {testEquipmentDataAsset.skinNames.Count} skin + " +
                  $"{myAttachmentSet.Count} override từ Asset: {testEquipmentDataAsset.name}");
        EditorEquip(); // Cập nhật luôn lên màn hình test
    }

    // ===== MẶC ĐỒ NGAY =====
    [Button("Mặc Đồ Ngay (Chỉ Target)", ButtonSizes.Medium)]
    [GUIColor(0.4f, 1f, 0.4f)]
    public void EditorEquip()
    {
        if (targetTestCharacter == null) return;

        List<string> enabledSkins = GetEnabledSkinNames();
        List<SlotAttachmentPair> pairs = GetMeaningfulPairs();

        targetTestCharacter.MixSkinsAndAttachments(enabledSkins, pairs);
        Debug.Log($"Đã mặc {enabledSkins.Count} skin + {pairs.Count} override.");
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

        if (myAttachmentSet != null)
        {
            // CHỈ bỏ tick, GIỮ NGUYÊN Skin nguồn + Placeholder để còn thấy ảnh và bật lại được.
            for (int i = 0; i < myAttachmentSet.Count; i++)
            {
                if (myAttachmentSet[i] == null) continue;
                myAttachmentSet[i].isEnabled = false;
            }
        }

        // Đắp lại rỗng
        targetTestCharacter.MixSkinsAndAttachments(new List<string>(), new List<SlotAttachmentPair>());
    }

#endif
}

#if UNITY_EDITOR
/// <summary>
/// Một entry trong danh sách skin, có checkbox bật/tắt.
/// </summary>
[System.Serializable]
public class SkinToggleEntry : ISearchFilterable
{
    /// <summary>
    /// Gõ vào ô Search: tên skin bất kỳ, hoặc "on" / "off" để lọc theo trạng thái tick.
    /// </summary>
    public bool IsMatch(string searchString)
    {
        if (string.IsNullOrEmpty(searchString)) return true;

        string[] terms = searchString.Split(' ');
        for (int i = 0; i < terms.Length; i++)
        {
            string term = terms[i].Trim();
            if (term.Length == 0) continue;

            if (term.Equals("on", System.StringComparison.OrdinalIgnoreCase))
            {
                if (!isEnabled) return false;
                continue;
            }
            if (term.Equals("off", System.StringComparison.OrdinalIgnoreCase))
            {
                if (isEnabled) return false;
                continue;
            }

            if (string.IsNullOrEmpty(skinName)) return false;
            if (skinName.IndexOf(term, System.StringComparison.OrdinalIgnoreCase) < 0) return false;
        }

        return true;
    }

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
