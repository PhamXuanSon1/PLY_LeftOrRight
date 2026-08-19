using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Spine;
using Spine.Unity;
#if UNITY_EDITOR
using Sirenix.OdinInspector;
#endif

[System.Serializable]
public class SlotAttachmentPair
#if UNITY_EDITOR
    : ISearchFilterable
#endif
{
#if UNITY_EDITOR
    [TableColumnWidth(60, Resizable = false)]
    [LabelText("Bật")]
#endif
    public bool isEnabled = true;

#if UNITY_EDITOR
  [LabelText("Skin Nguồn")]
  [ValueDropdown(nameof(GetSkinNames), DropdownWidth = 300)]
  [OnValueChanged(nameof(AutoFillPlaceholder))]
  [SpineSkin(dataField: nameof(skeletonDataAsset))]
  [Tooltip("Lấy Skin Placeholder từ Skin nào. BẮT BUỘC nếu placeholder trùng tên ở nhiều Skin.")]
#endif
  public string skinName;

#if UNITY_EDITOR
  [LabelText("Slot")]
  [ValueDropdown(nameof(GetSlotNames), IsUniqueList = true, DropdownWidth = 300)]
  [OnValueChanged(nameof(AutoFillPlaceholder))]
  [SpineSlot(dataField: nameof(skeletonDataAsset))]
#endif
  public string slotName;

#if UNITY_EDITOR
  [LabelText("Skin Placeholder")]
  [ValueDropdown(nameof(GetPlaceholderNames), DropdownWidth = 300)]
  [SpineAttachment(false, slotField: nameof(slotName), dataField: nameof(skeletonDataAsset),
      skinField: nameof(skinName), placeholdersOnly: true)]
#endif
  public string attachmentName;

  // This is required so Odin can resolve the slot list contextually
  public SkeletonDataAsset skeletonDataAsset;

    // ===== ẢNH THAY THẾ =====
    // Field này KHÔNG nằm trong #if UNITY_EDITOR vì nó phải tồn tại lúc chạy game.

#if UNITY_EDITOR
    [LabelText("Ảnh Thay Thế")]
    [PreviewField(45, ObjectFieldAlignment.Center)]
    [TableColumnWidth(60, Resizable = false)]
#endif
    [Tooltip("Kéo ảnh vào đây để nhân vật dùng ảnh này THAY CHO hình trong atlas Spine. " +
             "Ảnh phải bật Read/Write Enabled trong Import Settings. Để trống = dùng hình gốc.")]
    public Texture2D customPreview;

    /// <summary>
    /// Tên placeholder thật sự dùng để đăng ký vào Skin. Nếu chưa chọn placeholder mà đã có
    /// ảnh thay thế thì lấy luôn tên file ảnh làm tên placeholder.
    /// </summary>
    public string ResolvedPlaceholderName
    {
        get
        {
            if (!string.IsNullOrEmpty(attachmentName)) return attachmentName;
            return customPreview != null ? customPreview.name : null;
        }
    }

#if UNITY_EDITOR
    private static Dictionary<string, Texture2D> _previewCache = new Dictionary<string, Texture2D>();
    private static HashSet<string> _previewMisses = new HashSet<string>();

    [ShowInInspector]
    [PreviewField(45, ObjectFieldAlignment.Center)]
    [TableColumnWidth(55, Resizable = false)]
    [LabelText("Ảnh")]
    public Texture2D AttachmentPreview
    {
        get
        {
            // Tầng 1: ảnh do người dùng kéo vào
            if (customPreview != null) return customPreview;

            if (skeletonDataAsset == null || string.IsNullOrEmpty(slotName) || string.IsNullOrEmpty(attachmentName))
                return null;

            string key = $"{skeletonDataAsset.GetInstanceID()}_{skinName}_{slotName}_{attachmentName}";
            if (_previewCache.TryGetValue(key, out var cached) && cached != null)
                return cached;

            // Nhớ luôn các key không có ảnh, nếu không mỗi lần Inspector vẽ lại sẽ dựng preview lại từ đầu
            // cho từng dòng -> bảng nhiều dòng sẽ rất giật.
            if (_previewMisses.Contains(key)) return null;

            var preview = GeneratePreview();
            if (preview != null) _previewCache[key] = preview;
            else _previewMisses.Add(key);

            return preview;
        }
    }


    /// <summary>
    /// Xoá toàn bộ cache preview (gọi khi cần refresh ảnh)
    /// </summary>
    public static void ClearPreviewCache()
    {
        foreach (var tex in _previewCache.Values)
        {
            if (tex != null) Object.DestroyImmediate(tex);
        }
        _previewCache.Clear();
        _previewMisses.Clear();
    }

    private Texture2D GeneratePreview()
    {
        var skeletonData = skeletonDataAsset.GetSkeletonData(true);
        if (skeletonData == null) return null;

        var sd = skeletonData.FindSlot(slotName);
        if (sd == null) return null;

        int slotIndex = sd.Index;

        // Ưu tiên đúng Skin nguồn đã chọn, vì cùng một placeholder có thể tồn tại ở nhiều Skin
        var sourceSkin = string.IsNullOrEmpty(skinName) ? null : skeletonData.FindSkin(skinName);
        if (sourceSkin != null)
        {
            var fromSource = ExtractAttachmentTexture(sourceSkin.GetAttachment(slotIndex, attachmentName));
            if (fromSource != null) return fromSource;
            // Skin nguồn không có placeholder này -> vẫn quét tiếp để có ảnh tham khảo
        }

        for (int s = 0; s < skeletonData.Skins.Count; s++)
        {
            var texture = ExtractAttachmentTexture(skeletonData.Skins.Items[s].GetAttachment(slotIndex, attachmentName));
            if (texture != null) return texture;
        }

        return null;
    }

    private static Texture2D ExtractAttachmentTexture(Attachment attachment)
    {
        AtlasRegion region = null;
        if (attachment is RegionAttachment regionAtt)
            region = regionAtt.Region as AtlasRegion;
        else if (attachment is MeshAttachment meshAtt)
            region = meshAtt.Region as AtlasRegion;

        return region != null ? ExtractRegionTexture(region) : null;
    }

    private static Texture2D ExtractRegionTexture(AtlasRegion region)
    {
        // Spine-Unity lưu Material trong page.rendererObject, cần lấy mainTexture từ đó
        Texture2D atlasTexture = null;
        if (region.page.rendererObject is Material mat)
            atlasTexture = mat.mainTexture as Texture2D;
        else if (region.page.rendererObject is Texture2D tex)
            atlasTexture = tex;
        if (atlasTexture == null) return null;

        // Lấy tọa độ UV đúng (xử lý cả trường hợp UV bị đảo)
        float minU = Mathf.Min(region.u, region.u2);
        float minV = Mathf.Min(region.v, region.v2);
        float maxU = Mathf.Max(region.u, region.u2);
        float maxV = Mathf.Max(region.v, region.v2);

        int regionW = Mathf.Max(1, Mathf.RoundToInt((maxU - minU) * atlasTexture.width));
        int regionH = Mathf.Max(1, Mathf.RoundToInt((maxV - minV) * atlasTexture.height));

        // Giới hạn kích thước preview để tiết kiệm bộ nhớ
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

        // Dùng RenderTexture để cắt vùng ảnh (hoạt động cả khi texture không bật Read/Write)
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
#endif

#if UNITY_EDITOR
  // ===== TÌM KIẾM TRONG BẢNG =====

  /// <summary>
  /// Gõ vào ô Search phía trên bảng:
  ///   hair            -> tìm trong cả Skin nguồn, Slot và Placeholder
  ///   skin:hair_Kpop  -> chỉ lọc theo tên Skin nguồn
  ///   slot:head       -> chỉ lọc theo tên Slot
  ///   ph:front_Hair   -> chỉ lọc theo tên Skin Placeholder
  ///   on / off        -> lọc theo trạng thái tick
  /// Nhiều từ khoá cách nhau bằng dấu cách thì phải khớp TẤT CẢ.
  /// </summary>
  public bool IsMatch(string searchString)
  {
    if (string.IsNullOrEmpty(searchString)) return true;

    string[] terms = searchString.Split(' ');
    for (int i = 0; i < terms.Length; i++)
    {
      string term = terms[i].Trim();
      if (term.Length == 0) continue;
      if (!IsMatchSingleTerm(term)) return false;
    }

    return true;
  }

  private bool IsMatchSingleTerm(string term)
  {
    if (TryTakePrefix(term, "skin:", out string skinTerm)) return Contains(skinName, skinTerm);
    if (TryTakePrefix(term, "slot:", out string slotTerm)) return Contains(slotName, slotTerm);
    if (TryTakePrefix(term, "ph:", out string phTerm)) return Contains(attachmentName, phTerm);

    if (term.Equals("on", System.StringComparison.OrdinalIgnoreCase)) return isEnabled;
    if (term.Equals("off", System.StringComparison.OrdinalIgnoreCase)) return !isEnabled;

    return Contains(skinName, term) || Contains(slotName, term) || Contains(attachmentName, term);
  }

  private static bool TryTakePrefix(string term, string prefix, out string rest)
  {
    if (term.StartsWith(prefix, System.StringComparison.OrdinalIgnoreCase))
    {
      rest = term.Substring(prefix.Length);
      return true;
    }

    rest = null;
    return false;
  }

  private static bool Contains(string source, string term)
  {
    if (string.IsNullOrEmpty(term)) return true;
    if (string.IsNullOrEmpty(source)) return false;
    return source.IndexOf(term, System.StringComparison.OrdinalIgnoreCase) >= 0;
  }
#endif

  // ===== DROPDOWN =====

  private SkeletonData GetSkeletonData()
  {
    return skeletonDataAsset != null ? skeletonDataAsset.GetSkeletonData(true) : null;
  }

#if UNITY_EDITOR
  /// <summary>
  /// Chỉ liệt kê Skin thật sự có hình (bỏ 'default' và các Skin rỗng như 'empty').
  /// </summary>
  private IEnumerable<ValueDropdownItem<string>> GetSkinNames()
  {
    var items = new List<ValueDropdownItem<string>>
    {
      new ValueDropdownItem<string>("(Chưa chọn)", string.Empty)
    };

    SkeletonData skeletonData = GetSkeletonData();
    if (skeletonData == null) return items;

    for (int i = 0; i < skeletonData.Skins.Count; i++)
    {
      Skin skin = skeletonData.Skins.Items[i];
      if (skin.Name == "default") continue;

      int count = 0;
      foreach (Skin.SkinEntry unused in skin.Attachments) count++;
      if (count == 0) continue; // Skin rỗng, tách ra cũng không có gì

      items.Add(new ValueDropdownItem<string>($"{skin.Name}  ({count} phần)", skin.Name));
    }

    return items;
  }
#endif

  /// <summary>
  /// Nếu đã chọn Skin nguồn thì chỉ liệt kê các slot mà Skin đó có, cho gọn.
  /// </summary>
  private IEnumerable<string> GetSlotNames()
  {
    SkeletonData skeletonData = GetSkeletonData();
    if (skeletonData == null)
      return new[] { "(Chưa gán SkeletonDataAsset)" };

    var names = new List<string>();

    Skin sourceSkin = string.IsNullOrEmpty(skinName) ? null : skeletonData.FindSkin(skinName);
    if (sourceSkin != null)
    {
      var slotIndexes = new HashSet<int>();
      foreach (Skin.SkinEntry entry in sourceSkin.Attachments)
        slotIndexes.Add(entry.SlotIndex);

      foreach (SlotData slot in skeletonData.Slots)
        if (slotIndexes.Contains(slot.Index)) names.Add(slot.Name);

      if (names.Count > 0) return names;
    }

    foreach (SlotData slot in skeletonData.Slots)
      names.Add(slot.Name);

    return names;
  }

  /// <summary>
  /// Liệt kê tên Skin Placeholder của slot đang chọn, trong Skin nguồn đang chọn.
  /// </summary>
  private IEnumerable<string> GetPlaceholderNames()
  {
    SkeletonData skeletonData = GetSkeletonData();
    if (skeletonData == null)
      return new[] { "(Chưa gán SkeletonDataAsset)" };
    if (string.IsNullOrEmpty(slotName))
      return new[] { "(Hãy chọn Slot trước)" };

    SlotData slotData = skeletonData.FindSlot(slotName);
    if (slotData == null)
      return new[] { "(Không tìm thấy slot)" };

    var names = new List<string> { string.Empty };
    var entries = new List<Skin.SkinEntry>();

    Skin sourceSkin = string.IsNullOrEmpty(skinName) ? null : skeletonData.FindSkin(skinName);
    if (sourceSkin != null)
    {
      sourceSkin.GetAttachments(slotData.Index, entries);
      for (int i = 0; i < entries.Count; i++)
        if (!names.Contains(entries[i].Name)) names.Add(entries[i].Name);

      if (names.Count == 1)
        return new[] { $"(Skin '{skinName}' không có phần nào ở slot này)" };

      return names;
    }

    // Chưa chọn Skin nguồn -> gom placeholder từ mọi Skin (có thể trùng tên giữa các Skin)
    for (int s = 0; s < skeletonData.Skins.Count; s++)
    {
      entries.Clear();
      skeletonData.Skins.Items[s].GetAttachments(slotData.Index, entries);
      for (int i = 0; i < entries.Count; i++)
        if (!names.Contains(entries[i].Name)) names.Add(entries[i].Name);
    }

    return names;
  }

#if UNITY_EDITOR
  /// <summary>
  /// Tự điền Skin Placeholder cho dòng này khi có thể suy ra chắc chắn.
  /// Trả về true nếu vừa điền được giá trị mới.
  /// Gọi tự động mỗi khi đổi Skin nguồn hoặc Slot, và gọi hàng loạt được từ CharacterManager.
  /// </summary>
  public bool AutoFillPlaceholder()
  {
    if (skeletonDataAsset == null || string.IsNullOrEmpty(slotName)) return false;

    SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
    if (skeletonData == null) return false;

    SlotData slotData = skeletonData.FindSlot(slotName);
    if (slotData == null) return false;

    int slotIndex = slotData.Index;

    // Placeholder hiện tại vẫn hợp lệ với Skin nguồn đang chọn -> không đụng vào
    if (!string.IsNullOrEmpty(attachmentName))
    {
      Skin currentSkin = string.IsNullOrEmpty(skinName) ? null : skeletonData.FindSkin(skinName);
      if (currentSkin == null || currentSkin.GetAttachment(slotIndex, attachmentName) != null) return false;
    }

    var candidates = new List<string>();
    var entries = new List<Skin.SkinEntry>();

    Skin sourceSkin = string.IsNullOrEmpty(skinName) ? null : skeletonData.FindSkin(skinName);
    if (sourceSkin != null)
    {
      sourceSkin.GetAttachments(slotIndex, entries);
      for (int i = 0; i < entries.Count; i++)
        if (!candidates.Contains(entries[i].Name)) candidates.Add(entries[i].Name);
    }
    else
    {
      // Chưa chọn Skin nguồn -> gom tên placeholder từ mọi Skin. Thường các Skin dùng
      // CÙNG một tên placeholder cho cùng một slot, nên vẫn suy ra được chính xác.
      for (int s = 0; s < skeletonData.Skins.Count; s++)
      {
        entries.Clear();
        skeletonData.Skins.Items[s].GetAttachments(slotIndex, entries);
        for (int i = 0; i < entries.Count; i++)
          if (!candidates.Contains(entries[i].Name)) candidates.Add(entries[i].Name);
      }
    }

    // Chỉ tự điền khi không nhập nhằng
    if (candidates.Count != 1) return false;

    attachmentName = candidates[0];
    return true;
  }
#endif
}