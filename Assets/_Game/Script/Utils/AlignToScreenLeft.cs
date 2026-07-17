using UnityEngine;

public class AlignToScreenLeft : MonoBehaviour
{
    [Tooltip("Khoảng cách từ mép trái màn hình đến object (giống startOffsetX trong ItemArranger)")]
    public float startOffsetX = 2f;
    
    [Tooltip("Nếu bật, object sẽ liên tục tự căn chỉnh lại mỗi khi kích thước màn hình thay đổi")]
    public bool realignOnUpdate = true;

    private int lastScreenWidth;
    private int lastScreenHeight;

    void Start()
    {
        lastScreenWidth = Screen.width;
        lastScreenHeight = Screen.height;
        AlignToLeft();
    }

    void LateUpdate()
    {
        if (!realignOnUpdate) return;

        // Chỉ căn chỉnh lại nếu màn hình thực sự bị thay đổi kích thước (để tối ưu hiệu năng)
        if (lastScreenWidth != Screen.width || lastScreenHeight != Screen.height)
        {
            lastScreenWidth = Screen.width;
            lastScreenHeight = Screen.height;
            AlignToLeft();
        }
    }

    [ContextMenu("Align Now (Căn chỉnh thử ngay trên Editor)")]
    public void AlignToLeft()
    {
        Camera cam = Camera.main;
        if (cam == null) return;

        // Lấy khoảng cách chiều sâu (Z) từ Camera đến Object hiện tại
        float zDist = cam.WorldToViewportPoint(transform.position).z;

        // Tính toán toạ độ mép trái cùng của màn hình tại độ sâu Z đó
        Vector3 leftEdge = cam.ViewportToWorldPoint(new Vector3(0, 0, zDist));
        
        // Áp dụng vị trí X mới (mép trái + offset), giữ nguyên Y và Z
        float targetX = leftEdge.x + startOffsetX;
        transform.position = new Vector3(targetX, transform.position.y, transform.position.z);
    }
}
