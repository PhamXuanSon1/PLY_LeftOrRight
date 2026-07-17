using UnityEngine;
using UnityEngine.EventSystems;

public class CustomUIScrollbar : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler
{
    [Header("Cấu hình UI")]
    [Tooltip("Kéo object ScrollBar (Background) vào đây")]
    public RectTransform scrollBarRect;
    
    [Tooltip("Kéo object Handle (Nút kéo) vào đây")]
    public RectTransform handleRect;

    [Header("Giá trị đầu ra (Output)")]
    [Tooltip("Giá trị cuộn từ 0 (trái cùng) đến 1 (phải cùng)")]
    [Range(0f, 1f)]
    public float normalizedValue = 0f;

    // Gọi khi bắt đầu nhấn chuột/chạm tay vào Handle để kéo
    public void OnBeginDrag(PointerEventData eventData)
    {
        // Cập nhật vị trí ngay lúc vừa chạm vào
        UpdateHandlePosition(eventData);
    }

    // Gọi liên tục trong suốt quá trình người chơi kéo Handle
    public void OnDrag(PointerEventData eventData)
    {
        UpdateHandlePosition(eventData);
    }

    // Gọi khi người chơi nhả chuột/tay ra
    public void OnEndDrag(PointerEventData eventData)
    {
        // Bạn có thể thêm các logic khi nhả tay tại đây (ví dụ: hiệu ứng bounce, âm thanh...)
    }

    private void UpdateHandlePosition(PointerEventData eventData)
    {
        if (scrollBarRect == null || handleRect == null) return;

        // 1. Chuyển đổi vị trí chuột (Screen Space) sang Local Space của ScrollBar
        if (RectTransformUtility.ScreenPointToLocalPointInRectangle(
            scrollBarRect, 
            eventData.position, 
            eventData.pressEventCamera, 
            out Vector2 localPoint))
        {
            // 2 & 3. Tính giới hạn trái/phải dựa trên chiều rộng ScrollBar và trừ đi nửa chiều rộng Handle
            // Sử dụng rect.xMin và rect.xMax để đảm bảo script luôn chạy đúng dù Pivot của thanh nền nằm ở đâu
            float halfHandleWidth = handleRect.rect.width / 2f;
            float minX = scrollBarRect.rect.xMin + halfHandleWidth;
            float maxX = scrollBarRect.rect.xMax - halfHandleWidth;

            // 4. Dùng Mathf.Clamp() để khóa giá trị X, không cho Handle vượt ra ngoài 2 biên
            float clampedX = Mathf.Clamp(localPoint.x, minX, maxX);

            // 5. Gán lại vị trí X cho Handle (giữ nguyên trục Y)
            handleRect.anchoredPosition = new Vector2(clampedX, handleRect.anchoredPosition.y);

            // 6. Tính toán biến normalizedValue (0 -> 1)
            // Sử dụng Mathf.InverseLerp để tự động chuyển đổi khoảng (minX, maxX) về khoảng (0, 1)
            normalizedValue = maxX > minX ? Mathf.InverseLerp(minX, maxX, clampedX) : 0f;
        }
    }

    public void UpdateHandleSize(float visibleRatio)
    {
        if (scrollBarRect == null || handleRect == null) return;
        
        // Đảm bảo tỷ lệ nằm trong khoảng hợp lý (không để nút kéo biến mất)
        visibleRatio = Mathf.Clamp(visibleRatio, 0.1f, 1f);
        
        // Cập nhật chiều rộng Handle
        float newWidth = scrollBarRect.rect.width * visibleRatio;
        handleRect.sizeDelta = new Vector2(newWidth, handleRect.sizeDelta.y);

        // Cập nhật lại vị trí Handle cho phù hợp với chiều rộng mới
        float halfHandleWidth = newWidth / 2f;
        float minX = scrollBarRect.rect.xMin + halfHandleWidth;
        float maxX = scrollBarRect.rect.xMax - halfHandleWidth;
        
        // Nếu Handle bằng hoặc lớn hơn thanh cuộn, ép về minX (normalized = 0)
        float clampedX = maxX > minX ? Mathf.Lerp(minX, maxX, normalizedValue) : minX;
        handleRect.anchoredPosition = new Vector2(clampedX, handleRect.anchoredPosition.y);
    }

    public void ResetToStart()
    {
        normalizedValue = 0f;
        if (scrollBarRect == null || handleRect == null) return;
        
        float halfHandleWidth = handleRect.rect.width / 2f;
        float minX = scrollBarRect.rect.xMin + halfHandleWidth;
        handleRect.anchoredPosition = new Vector2(minX, handleRect.anchoredPosition.y);
    }
}