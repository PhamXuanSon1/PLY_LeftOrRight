using UnityEngine;
using UnityEngine.EventSystems;

public class CustomUIScrollbar : MonoBehaviour, IBeginDragHandler, IEventSystemHandler, IDragHandler, IEndDragHandler
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

	public void OnBeginDrag(PointerEventData eventData)
	{
		UpdateHandlePosition(eventData);
	}

	public void OnDrag(PointerEventData eventData)
	{
		UpdateHandlePosition(eventData);
	}

	public void OnEndDrag(PointerEventData eventData)
	{
	}

	private void UpdateHandlePosition(PointerEventData eventData)
	{
		if (!(scrollBarRect == null) && !(handleRect == null) && RectTransformUtility.ScreenPointToLocalPointInRectangle(scrollBarRect, eventData.position, eventData.pressEventCamera, out var localPoint))
		{
			float halfHandleWidth = handleRect.rect.width / 2f;
			float minX = scrollBarRect.rect.xMin + halfHandleWidth;
			float maxX = scrollBarRect.rect.xMax - halfHandleWidth;
			float clampedX = Mathf.Clamp(localPoint.x, minX, maxX);
			handleRect.anchoredPosition = new Vector2(clampedX, handleRect.anchoredPosition.y);
			normalizedValue = ((maxX > minX) ? Mathf.InverseLerp(minX, maxX, clampedX) : 0f);
		}
	}

	public void UpdateHandleSize(float visibleRatio)
	{
		if (!(scrollBarRect == null) && !(handleRect == null))
		{
			visibleRatio = Mathf.Clamp(visibleRatio, 0.1f, 1f);
			float newWidth = scrollBarRect.rect.width * visibleRatio;
			handleRect.sizeDelta = new Vector2(newWidth, handleRect.sizeDelta.y);
			float halfHandleWidth = newWidth / 2f;
			float minX = scrollBarRect.rect.xMin + halfHandleWidth;
			float maxX = scrollBarRect.rect.xMax - halfHandleWidth;
			float clampedX = ((maxX > minX) ? Mathf.Lerp(minX, maxX, normalizedValue) : minX);
			handleRect.anchoredPosition = new Vector2(clampedX, handleRect.anchoredPosition.y);
		}
	}

	public void ResetToStart()
	{
		normalizedValue = 0f;
		if (!(scrollBarRect == null) && !(handleRect == null))
		{
			float halfHandleWidth = handleRect.rect.width / 2f;
			float minX = scrollBarRect.rect.xMin + halfHandleWidth;
			handleRect.anchoredPosition = new Vector2(minX, handleRect.anchoredPosition.y);
		}
	}
}
