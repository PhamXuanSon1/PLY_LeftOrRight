using UnityEngine;

[ExecuteAlways]
[RequireComponent(typeof(Camera))]
public class AutoCameraFit : MonoBehaviour
{
    [SerializeField] private Transform targetArea;  // vùng chứa toàn bộ bếp
    [SerializeField] private float paddingLandscape = 0.6f;
    [SerializeField] private float paddingPortrait = 0.22f;
    [SerializeField] private float extraPaddingSmallScreen = 0.12f;
    [SerializeField] private int smallScreenThreshold = 720; // thêm đệm cho màn nhỏ (vd: 510x683)
    [SerializeField] private bool autoUpdateOnResize = true;
    [SerializeField] private bool adjustInEditMode = true;

    [Header("Tall Screen Adjustments")]
    public Transform tallScreenObject;
    public float tallScreenRatioThreshold = 0.49f; // Ngưỡng tỉ lệ màn hình dài (ví dụ: 400/824 = 0.485)
    public float tallScreenYOffset = 1f; // Độ cao sẽ được cộng thêm
    private float originalObjectY;
    private bool hasOriginalObjectY = false;

    private Camera cam;
    private int lastScreenWidth;
    private int lastScreenHeight;
    public GameObject canvasBtn;

    private void Awake()
    {
        cam = GetComponent<Camera>();
        UpdateCameraNow();
    }

    private void Update()
    {
        if (!Application.isPlaying && !adjustInEditMode) return;

        if (autoUpdateOnResize)
        {
            if (Screen.width != lastScreenWidth || Screen.height != lastScreenHeight)
            {
                UpdateCameraNow();
            }
        }

        // if (Screen.width > Screen.height)
        // {
        //     canvasBtn.SetActive(true);
        // }
        // else
        // {
        //     canvasBtn.SetActive(false);
        // }
    }

    [ContextMenu("Update Camera Fit")]
    public void UpdateCameraNow()
    {
        if (targetArea == null) return;
        var renderers = targetArea.GetComponentsInChildren<Renderer>();
        if (renderers.Length == 0) return;

        bool isLandscape = Screen.width > Screen.height;
        float padding = isLandscape ? paddingLandscape : paddingPortrait;

        // Nếu màn nhỏ (như 510x683) thì cộng thêm padding để tránh mất cạnh trên/dưới
        if (Screen.height < smallScreenThreshold || Screen.width < smallScreenThreshold)
        {
            padding += extraPaddingSmallScreen;
        }

        Bounds bounds = renderers[0].bounds;
        foreach (var r in renderers)
            bounds.Encapsulate(r.bounds);

        float screenRatio = (float)Screen.width / Screen.height;
        float targetRatio = bounds.size.x / bounds.size.y;

        if (screenRatio >= targetRatio)
        {
            cam.orthographicSize = bounds.size.y / 2f + padding;
        }
        else
        {
            float differenceInSize = targetRatio / screenRatio;
            cam.orthographicSize = bounds.size.y / 2f * differenceInSize + padding;
        }

        // Logic tăng độ cao cho object khi màn hình dài (như 400x824)
        if (tallScreenObject != null)
        {
            if (!hasOriginalObjectY)
            {
                originalObjectY = tallScreenObject.localPosition.y;
                hasOriginalObjectY = true;
            }

            if (screenRatio <= tallScreenRatioThreshold)
            {
                tallScreenObject.localPosition = new Vector3(
                    tallScreenObject.localPosition.x, 
                    originalObjectY + tallScreenYOffset, 
                    tallScreenObject.localPosition.z);
            }
            else
            {
                tallScreenObject.localPosition = new Vector3(
                    tallScreenObject.localPosition.x, 
                    originalObjectY, 
                    tallScreenObject.localPosition.z);
            }
        }

#if UNITY_EDITOR
        cam.transform.position = new Vector3(
            bounds.center.x,
            bounds.center.y,
            cam.transform.position.z
        );
#endif

        lastScreenWidth = Screen.width;
        lastScreenHeight = Screen.height;
    }
}
