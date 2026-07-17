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
    [Title("Dữ Liệu Trang Bị")]
    [HorizontalGroup("SkeletonGroup")]
    [HideLabel]
    public SkeletonDataAsset targetSkeletonDataAsset;

    [HorizontalGroup("SkeletonGroup", Width = 150)]
    [Button("Gán Skeleton Data", ButtonSizes.Medium)]
    [GUIColor(0.2f, 0.8f, 0.2f)]
    public void AssignSkeletonData()
    {
        for (int i = 0; i < equipmentSet.Count; i++)
        {
            equipmentSet[i].skeletonDataAsset = targetSkeletonDataAsset;
        }
    }

    [TableList]
    [Searchable]
#endif
    public List<SlotAttachmentPair> equipmentSet = new List<SlotAttachmentPair>();
}