using UnityEngine;

[CreateAssetMenu(fileName = "NewSlotData", menuName = "ScriptableObjects/Slot Data", order = 1)]
public class SlotDataSO : ScriptableObject
{
    [Header("Thông tin cơ bản")]
    public string slotName;

    [Header("Hình ảnh cho 2 lựa chọn trong Balloon")]
    public Sprite leftItemSprite;   // Hình ảnh của Item sẽ hiện bên trái
    public Sprite rightItemSprite;  // Hình ảnh của Item sẽ hiện bên phải
}
