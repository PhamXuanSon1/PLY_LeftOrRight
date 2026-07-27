using System.Collections.Generic;
using UnityEngine;

public class ItemArranger : MonoBehaviour
{
	[Tooltip("Danh sách các object cần được sắp xếp")]
	public List<ArrangedItem> itemsToArrange = new List<ArrangedItem>();

	[Tooltip("Object làm mốc để lấy toạ độ Y. Bắt buộc phải có để các item đi theo Y của object này.")]
	public Transform referenceYObject;

	[Tooltip("Khoảng cách từ mép trái màn hình đến object đầu tiên (theo đơn vị world)")]
	public float startOffsetX = 2f;

	[Tooltip("Tự động sắp xếp lại khi màn hình hoặc Camera thay đổi")]
	public bool realignOnUpdate = true;

	private int lastScreenWidth;

	private int lastScreenHeight;

	private float lastRefY;

	private int lastActiveCount = -1;

	[Header("Scrollbar Setup (Tuỳ chọn)")]
	[Tooltip("Kéo script WorldSpaceScrollbar vào đây để điều khiển cuộn")]
	public WorldSpaceScrollbar scrollbar;

	private float lastScrollValue = -1f;

	private float physicalScrollOffset = 0f;

	private void Start()
	{
		lastScreenWidth = Screen.width;
		lastScreenHeight = Screen.height;
		if (referenceYObject != null)
		{
			lastRefY = referenceYObject.position.y;
		}
		if (scrollbar != null)
		{
			lastScrollValue = scrollbar.normalizedValue;
		}
		ArrangeItems();
	}

	private void LateUpdate()
	{
		if (!realignOnUpdate)
		{
			return;
		}
		bool shouldUpdate = false;
		if (lastScreenWidth != Screen.width || lastScreenHeight != Screen.height)
		{
			lastScreenWidth = Screen.width;
			lastScreenHeight = Screen.height;
			shouldUpdate = true;
		}
		if (referenceYObject != null && referenceYObject.position.y != lastRefY)
		{
			lastRefY = referenceYObject.position.y;
			shouldUpdate = true;
		}
		if (scrollbar != null && scrollbar.gameObject.activeInHierarchy && scrollbar.normalizedValue != lastScrollValue)
		{
			shouldUpdate = true;
		}
		int currentActiveCount = 0;
		for (int i = 0; i < itemsToArrange.Count; i++)
		{
			if (itemsToArrange[i].itemTransform != null && itemsToArrange[i].itemTransform.gameObject.activeInHierarchy)
			{
				currentActiveCount++;
			}
		}
		if (currentActiveCount != lastActiveCount)
		{
			lastActiveCount = currentActiveCount;
			shouldUpdate = true;
		}
		if (shouldUpdate)
		{
			ArrangeItems();
		}
	}

	[ContextMenu("Arrange Items Now (Sắp xếp thử ngay trên Editor)")]
	public void ArrangeItems()
	{
		if (itemsToArrange.Count == 0)
		{
			return;
		}
		if (referenceYObject == null)
		{
			Debug.LogWarning("ItemArranger: Chưa gắn Reference Y Object!");
			return;
		}
		Camera cam = Camera.main;
		if (cam == null)
		{
			return;
		}
		Transform firstActiveItem = null;
		int activeCount = 0;
		float totalItemsWidth = 0f;
		for (int j = 0; j < itemsToArrange.Count; j++)
		{
			if (itemsToArrange[j].itemTransform != null && itemsToArrange[j].itemTransform.gameObject.activeInHierarchy)
			{
				if (firstActiveItem == null)
				{
					firstActiveItem = itemsToArrange[j].itemTransform;
				}
				activeCount++;
				if (j < itemsToArrange.Count - 1)
				{
					totalItemsWidth += itemsToArrange[j].spacingToNext;
				}
			}
		}
		float zDist = cam.nearClipPlane;
		if (firstActiveItem != null)
		{
			zDist = cam.WorldToViewportPoint(firstActiveItem.position).z;
		}
		Vector3 leftEdge = cam.ViewportToWorldPoint(new Vector3(0f, 0f, zDist));
		Vector3 rightEdge = cam.ViewportToWorldPoint(new Vector3(1f, 0f, zDist));
		float startX = leftEdge.x + startOffsetX;
		float visibleScreenWidth = rightEdge.x - startX - startOffsetX;
		float maxScrollDistance = totalItemsWidth - visibleScreenWidth;
		float itemWidth = 2f;
		if (itemsToArrange.Count > 0)
		{
			itemWidth = itemsToArrange[0].spacingToNext;
		}
		float extendedMinScroll = 0f;
		float extendedMaxScroll = maxScrollDistance + itemWidth;
		if (scrollbar != null)
		{
			if (maxScrollDistance <= 0.1f || activeCount == 0)
			{
				scrollbar.gameObject.SetActive(false);
				physicalScrollOffset = 0f;
				scrollbar.ResetToStart();
				lastScrollValue = 0f;
			}
			else
			{
				scrollbar.gameObject.SetActive(true);
				if (scrollbar.normalizedValue != lastScrollValue)
				{
					physicalScrollOffset = Mathf.Lerp(extendedMinScroll, extendedMaxScroll, scrollbar.normalizedValue);
					lastScrollValue = scrollbar.normalizedValue;
				}
				else
				{
					physicalScrollOffset = Mathf.Clamp(physicalScrollOffset, extendedMinScroll, extendedMaxScroll);
					float newNormalized = Mathf.InverseLerp(extendedMinScroll, extendedMaxScroll, physicalScrollOffset);
					scrollbar.SetNormalizedValue(newNormalized);
					lastScrollValue = newNormalized;
				}
			}
		}
		else
		{
			physicalScrollOffset = 0f;
		}
		float currentX = startX - physicalScrollOffset;
		float targetY = referenceYObject.position.y;
		for (int i = 0; i < itemsToArrange.Count; i++)
		{
			if (itemsToArrange[i].itemTransform != null && itemsToArrange[i].itemTransform.gameObject.activeInHierarchy)
			{
				itemsToArrange[i].itemTransform.position = new Vector3(currentX, targetY, itemsToArrange[i].itemTransform.position.z);
				currentX += itemsToArrange[i].spacingToNext;
			}
		}
	}

	[ContextMenu("Auto Get Items From Children (Tự động lấy tất cả các con)")]
	public void GetItemsFromChildren()
	{
		itemsToArrange.Clear();
		foreach (Transform child in base.transform)
		{
			ArrangedItem newItem = new ArrangedItem();
			newItem.itemTransform = child;
			newItem.spacingToNext = 2f;
			itemsToArrange.Add(newItem);
		}
		Debug.Log("Đã lấy " + itemsToArrange.Count + " items từ con!");
	}
}
