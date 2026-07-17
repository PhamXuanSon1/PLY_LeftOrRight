using UnityEngine;

public class WorldSpaceScrollbar : MonoBehaviour
{
    [Header("Cấu hình World Space")]
    [Tooltip("Kéo object ScrollBar (Background) vào đây. Yêu cầu object phải có SpriteRenderer và Collider 3D.")]
    public Transform scrollBarTransform;
    
    [Tooltip("Kéo object Handle (Nút kéo) vào đây. Yêu cầu object phải có SpriteRenderer và Collider 3D.")]
    public Transform handleTransform;

    [Header("Giá trị đầu ra (Output)")]
    [Tooltip("Giá trị cuộn từ 0 (trái cùng) đến 1 (phải cùng)")]
    [Range(0f, 1f)]
    public float normalizedValue = 0f;

    private bool isDragging = false;
    private Camera cam;

    private void Start()
    {
        cam = Camera.main;
    }

    private void Update()
    {
        if (scrollBarTransform == null || handleTransform == null) return;
        if (cam == null) cam = Camera.main;

        // Bắt đầu nhấn chuột/chạm tay
        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = cam.ScreenPointToRay(Input.mousePosition);
            
            // Chỉ kiểm tra Collider 3D
            if (Physics.Raycast(ray, out RaycastHit hit3D))
            {
                if (hit3D.transform == handleTransform || hit3D.transform == scrollBarTransform)
                {
                    isDragging = true;
                    UpdateHandlePosition();
                }
            }
        }

        // Đang giữ và kéo
        if (isDragging && Input.GetMouseButton(0))
        {
            UpdateHandlePosition();
        }

        // Nhả tay ra
        if (Input.GetMouseButtonUp(0))
        {
            isDragging = false;
        }
    }

    private void UpdateHandlePosition()
    {
        Vector3 mouseWorldPos = cam.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, Mathf.Abs(cam.transform.position.z - scrollBarTransform.position.z)));
        
        SpriteRenderer bgRenderer = scrollBarTransform.GetComponent<SpriteRenderer>();
        if (bgRenderer == null) return;

        // Lấy giới hạn trái phải của Background
        float minX = bgRenderer.bounds.min.x;
        float maxX = bgRenderer.bounds.max.x;

        // Trừ hao kích thước của Handle để nó không lọt ra ngoài mép
        SpriteRenderer handleRenderer = handleTransform.GetComponent<SpriteRenderer>();
        if (handleRenderer != null)
        {
            float halfWidth = handleRenderer.bounds.size.x / 2f;
            minX += halfWidth;
            maxX -= halfWidth;
        }

        // Giới hạn toạ độ X của Handle
        float clampedX = Mathf.Clamp(mouseWorldPos.x, minX, maxX);
        
        // Gán toạ độ mới cho Handle (chỉ thay đổi X)
        handleTransform.position = new Vector3(clampedX, handleTransform.position.y, handleTransform.position.z);

        // Tính toán lại giá trị normalizedValue (0 -> 1)
        normalizedValue = maxX > minX ? Mathf.InverseLerp(minX, maxX, clampedX) : 0f;
    }

    public void ResetToStart()
    {
        normalizedValue = 0f;
        if (scrollBarTransform == null || handleTransform == null) return;
        
        SpriteRenderer bgRenderer = scrollBarTransform.GetComponent<SpriteRenderer>();
        if (bgRenderer == null) return;

        float minX = bgRenderer.bounds.min.x;

        SpriteRenderer handleRenderer = handleTransform.GetComponent<SpriteRenderer>();
        if (handleRenderer != null)
        {
            float halfWidth = handleRenderer.bounds.size.x / 2f;
            minX += halfWidth;
        }

        handleTransform.position = new Vector3(minX, handleTransform.position.y, handleTransform.position.z);
    }

    public void SetNormalizedValue(float value)
    {
        normalizedValue = Mathf.Clamp01(value);
        if (scrollBarTransform == null || handleTransform == null) return;
        
        SpriteRenderer bgRenderer = scrollBarTransform.GetComponent<SpriteRenderer>();
        if (bgRenderer == null) return;

        float minX = bgRenderer.bounds.min.x;
        float maxX = bgRenderer.bounds.max.x;

        SpriteRenderer handleRenderer = handleTransform.GetComponent<SpriteRenderer>();
        if (handleRenderer != null)
        {
            float halfWidth = handleRenderer.bounds.size.x / 2f;
            minX += halfWidth;
            maxX -= halfWidth;
        }

        float clampedX = Mathf.Lerp(minX, maxX, normalizedValue);
        handleTransform.position = new Vector3(clampedX, handleTransform.position.y, handleTransform.position.z);
    }
}