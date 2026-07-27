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

}