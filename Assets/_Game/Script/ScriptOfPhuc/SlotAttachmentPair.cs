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
{
#if UNITY_EDITOR
    [TableColumnWidth(60, Resizable = false)]
    [LabelText("Bật")]
#endif
    public bool isEnabled = true;

#if UNITY_EDITOR
  [ValueDropdown(nameof(GetSlotNames), IsUniqueList = true, DropdownWidth = 300)]
  [SpineSlot(dataField: nameof(skeletonDataAsset))]
#endif
  public string slotName;

#if UNITY_EDITOR
  [SpineAttachment(false, slotField: nameof(slotName), dataField: nameof(skeletonDataAsset))]
#endif
  public string attachmentName;

  // This is required so Odin can resolve the slot list contextually
  public SkeletonDataAsset skeletonDataAsset;

#if UNITY_EDITOR
    // ===== PREVIEW ẢNH ATTACHMENT =====
    private static Dictionary<string, Texture2D> _previewCache = new Dictionary<string, Texture2D>();

    [ShowInInspector]
    [PreviewField(45, ObjectFieldAlignment.Center)]
    [TableColumnWidth(55, Resizable = false)]
    [LabelText("Ảnh")]
    public Texture2D AttachmentPreview
    {
        get
        {
            if (skeletonDataAsset == null || string.IsNullOrEmpty(slotName) || string.IsNullOrEmpty(attachmentName))
                return null;

            string key = $"{skeletonDataAsset.GetInstanceID()}_{slotName}_{attachmentName}";
            if (_previewCache.TryGetValue(key, out var cached) && cached != null)
                return cached;

            var preview = GeneratePreview();
            if (preview != null)
                _previewCache[key] = preview;
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
    }

    private Texture2D GeneratePreview()
    {
        var skeletonData = skeletonDataAsset.GetSkeletonData(true);
        if (skeletonData == null) return null;

        var sd = skeletonData.FindSlot(slotName);
        if (sd == null) return null;

        int slotIndex = sd.Index;

        for (int s = 0; s < skeletonData.Skins.Count; s++)
        {
            var skin = skeletonData.Skins.Items[s];
            var attachment = skin.GetAttachment(slotIndex, attachmentName);

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

  // Dropdown function
  private IEnumerable<string> GetSlotNames()
  {
    if (skeletonDataAsset == null)
      return new[] { "(No SkeletonDataAsset assigned)" };

    SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
    if (skeletonData == null)
      return new[] { "(SkeletonData not loaded)" };

    var names = new List<string>();
    foreach (SlotData slot in skeletonData.Slots)
      names.Add(slot.Name);

    return names;
  }

#if UNITY_EDITOR
  private void OnSlotNameChanged()
  {
    if (string.IsNullOrEmpty(slotName) || skeletonDataAsset == null)
      return;

    SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(true);
    if (skeletonData == null)
      return;

    var slotData = skeletonData.FindSlot(slotName);
    if (slotData == null)
      return;

    int slotIndex = slotData.Index;
    var skin = skeletonData.DefaultSkin;
    if (skin == null)
      return;

    var entries = new List<Skin.SkinEntry>();
    skin.GetAttachments(slotIndex, entries);

    if (entries.Count > 0)
      attachmentName = entries[0].Name;
  }
#endif
}