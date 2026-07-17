using UnityEngine;

public class DipTarget : MonoBehaviour
{
    [Tooltip("Đánh dấu xem hộp phấn/màu này đã được mở nắp chưa. Nếu chưa mở thì cọ không thể nhúng vào được.")]
    public bool isOpen = false;

    // Hàm này dùng để gọi trong OnCompleteEvent của nắp hộp phấn
    public void OpenBox()
    {
        isOpen = true;
    }

    // Tuỳ chọn: Hàm dùng để đóng lại nếu cần
    public void CloseBox()
    {
        isOpen = false;
    }
}
