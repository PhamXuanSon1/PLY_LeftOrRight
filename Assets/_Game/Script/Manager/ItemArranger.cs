using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class ArrangedItem
{
    public Transform itemTransform;
    
    [Tooltip("Khoảng cách từ item này tới item tiếp theo")]
    public float spacingToNext = 2f;
}

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

    void Start()
    {
        lastScreenWidth = Screen.width;
        lastScreenHeight = Screen.height;
        if (referenceYObject != null) lastRefY = referenceYObject.position.y;
        if (scrollbar != null) lastScrollValue = scrollbar.normalizedValue;
        
        ArrangeItems();

        // if (GameManager.instance != null)
        // {
        //     int activeCount = 0;
        //     for (int i = 0; i < itemsToArrange.Count; i++)
        //     {
        //         if (itemsToArrange[i].itemTransform != null && itemsToArrange[i].itemTransform.gameObject.activeInHierarchy)
        //         {
        //             activeCount++;
        //         }
        //     }
        //     GameManager.instance.SetTotalItems(activeCount);
        // }
    }

    private void LateUpdate()
    {
        if (!realignOnUpdate) return;

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

        // Kiểm tra xem Scrollbar có bị kéo đi vị trí khác không (người chơi chủ động kéo)
        if (scrollbar != null && scrollbar.gameObject.activeInHierarchy && scrollbar.normalizedValue != lastScrollValue)
        {
            shouldUpdate = true;
            if (HandHintManager.Instance != null)
            {
                HandHintManager.Instance.ShowHintWithDelay(); // Reset Hand Hint
            }
        }

        // Kiểm tra xem số lượng item đang bật có thay đổi không (bị tắt đi/xóa đi)
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
        if (itemsToArrange.Count == 0) return;
        
        if (referenceYObject == null)
        {
            Debug.LogWarning("ItemArranger: Chưa gắn Reference Y Object!");
            return;
        }

        Camera cam = Camera.main;
        if (cam == null) return;

        // Bỏ qua các item bị null hoặc bị tắt
        Transform firstActiveItem = null;
        int activeCount = 0;
        float totalItemsWidth = 0f;

        for (int i = 0; i < itemsToArrange.Count; i++)
        {
            if (itemsToArrange[i].itemTransform != null && itemsToArrange[i].itemTransform.gameObject.activeInHierarchy)
            {
                if (firstActiveItem == null) firstActiveItem = itemsToArrange[i].itemTransform;
                activeCount++;
                
                // Trừ khoảng cách của item cuối cùng để tính chính xác chiều dài
                if (i < itemsToArrange.Count - 1)
                {
                    totalItemsWidth += itemsToArrange[i].spacingToNext;
                }
            }
        }

        float zDist = cam.nearClipPlane;
        if (firstActiveItem != null) 
        {
            zDist = cam.WorldToViewportPoint(firstActiveItem.position).z;
        }

        Vector3 leftEdge = cam.ViewportToWorldPoint(new Vector3(0, 0, zDist));
        Vector3 rightEdge = cam.ViewportToWorldPoint(new Vector3(1, 0, zDist));
        
        // TÍNH TOÁN QUÃNG ĐƯỜNG CUỘN (SCROLL) TỰ ĐỘNG
        float startX = leftEdge.x + startOffsetX;
        
        // Chiều rộng hiển thị thực tế trên màn hình (đã trừ lề trái và lề phải)
        float visibleScreenWidth = rightEdge.x - startX - startOffsetX;
        
        // Khoảng cách cuộn tối đa = Tổng độ dài các item - Chiều rộng màn hình
        float maxScrollDistance = totalItemsWidth - visibleScreenWidth;

        float itemWidth = 2f;
        if (itemsToArrange.Count > 0) itemWidth = itemsToArrange[0].spacingToNext;

        // Giới hạn trái phải là 0 để item đầu tiên ở đúng mép, không bị dịch sang phải
        float extendedMinScroll = 0f; 
        float extendedMaxScroll = maxScrollDistance + itemWidth; // Dư ra 1 khoảng bên phải theo ý bạn

        if (scrollbar != null)
        {
            if (maxScrollDistance <= 0.1f || activeCount == 0)
            {
                // Đồ vật ít, hiển thị vừa đủ trên màn hình -> Tắt thanh scrollbar
                scrollbar.gameObject.SetActive(false);
                physicalScrollOffset = 0f;
                scrollbar.ResetToStart();
                lastScrollValue = 0f;
            }
            else
            {
                // Đồ vật tràn màn hình -> Bật thanh scrollbar
                scrollbar.gameObject.SetActive(true);

                // Nếu người chơi CHỦ ĐỘNG KÉO THAY ĐỔI
                if (scrollbar.normalizedValue != lastScrollValue)
                {
                    physicalScrollOffset = Mathf.Lerp(extendedMinScroll, extendedMaxScroll, scrollbar.normalizedValue);
                    lastScrollValue = scrollbar.normalizedValue;
                }
                else
                {
                    // NẾU GỌI DO ITEM BIẾN MẤT HOẶC MÀN HÌNH ĐỔI KÍCH THƯỚC:
                    // Giữ nguyên physicalScrollOffset để các item không bị giật lùi,
                    // nhưng ép không vượt quá khoảng giới hạn mới
                    physicalScrollOffset = Mathf.Clamp(physicalScrollOffset, extendedMinScroll, extendedMaxScroll);
                    
                    // Cập nhật lại cục Handle của Scrollbar cho khớp với offset mới
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
                
                // Cập nhật lại vị trí SpawnPos để HandHint và thả rơi không bị sai
                DrawItemMovement movement = itemsToArrange[i].itemTransform.GetComponent<DrawItemMovement>();
                if (movement != null)
                {
                    movement.UpdateSpawnPos();
                }

                // Cộng khoảng cách chuẩn bị cho item tiếp theo
                currentX += itemsToArrange[i].spacingToNext;
            }
        }
    }

    [ContextMenu("Auto Get Items From Children (Tự động lấy tất cả các con)")]
    public void GetItemsFromChildren()
    {
        itemsToArrange.Clear();
        foreach (Transform child in transform)
        {
            ArrangedItem newItem = new ArrangedItem();
            newItem.itemTransform = child;
            newItem.spacingToNext = 2f; // Mặc định là 2
            itemsToArrange.Add(newItem);
        }
        Debug.Log("Đã lấy " + itemsToArrange.Count + " items từ con!");
    }
}
