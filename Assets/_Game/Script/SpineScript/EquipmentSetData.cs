using System.Collections.Generic;
using UnityEngine;
using Spine.Unity;
#if UNITY_EDITOR
using Sirenix.OdinInspector;
#endif

// Thuộc tính này giúp bạn có thể tạo file data từ menu chuột phải trong cửa sổ Project:
// Right Click -> Create -> Spine -> Equipment Set Data
[CreateAssetMenu(fileName = "New Equipment Set", menuName = "Spine/Equipment Set Data")]
public class EquipmentSetData : ScriptableObject
{
#if UNITY_EDITOR
    [Title("Dữ Liệu Trang Bị (Skin-Based)")]
    [HorizontalGroup("SkeletonGroup")]
    [HideLabel]
    public SkeletonDataAsset targetSkeletonDataAsset;
#endif

    [Tooltip("Danh sách tên các Skin sẽ được gộp (mix) lại để mặc cho nhân vật")]
    public List<string> skinNames = new List<string>();

#if UNITY_EDITOR
    [Title("Override Từng Slot")]
    [InfoBox("Mỗi dòng = lấy 1 Skin Placeholder từ 1 Skin nguồn rồi đắp lên 1 slot.\n" +
             "Tick = ép mặc placeholder đó lên slot (kể cả Skin nền không có).\n" +
             "Bỏ tick + CÓ placeholder = ép TẮT slot đó (khoét bớt Skin nền).\n" +
             "Bỏ tick + TRỐNG placeholder = bỏ qua dòng, slot giữ nguyên theo Skin nền.\n" +
             "LƯU Ý: nhiều placeholder trùng tên ở nhiều Skin nên BẮT BUỘC phải điền Skin Nguồn.")]
    [TableList(ShowIndexLabels = true)]
    [Searchable(FilterOptions = SearchFilterOptions.ISearchFilterableInterface)]
#endif
    [Tooltip("Đè/tắt từng slot lẻ trên nền các Skin ở trên")]
    public List<SlotAttachmentPair> attachmentPairs = new List<SlotAttachmentPair>();

#if UNITY_EDITOR
    private void OnValidate()
    {
        // Gán SkeletonDataAsset xuống từng dòng để dropdown Slot/Attachment hiển thị đúng
        if (attachmentPairs == null) return;

        for (int i = 0; i < attachmentPairs.Count; i++)
        {
            if (attachmentPairs[i] != null)
                attachmentPairs[i].skeletonDataAsset = targetSkeletonDataAsset;
        }
    }
#endif
}