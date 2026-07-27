using UnityEngine;

[ExecuteAlways]
[RequireComponent(typeof(Camera))]
public class AutoCameraFit : MonoBehaviour
{
	[SerializeField]
	private Transform targetArea;

	[SerializeField]
	private float paddingLandscape = 0.6f;

	[SerializeField]
	private float paddingPortrait = 0.22f;

	[SerializeField]
	private float extraPaddingSmallScreen = 0.12f;

	[SerializeField]
	private int smallScreenThreshold = 720;

	[SerializeField]
	private bool autoUpdateOnResize = true;

	[SerializeField]
	private bool adjustInEditMode = true;

	[Header("Tall Screen Adjustments")]
	public Transform tallScreenObject;

	public float tallScreenRatioThreshold = 0.49f;

	public float tallScreenYOffset = 1f;

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
		if ((Application.isPlaying || adjustInEditMode) && autoUpdateOnResize && (Screen.width != lastScreenWidth || Screen.height != lastScreenHeight))
		{
			UpdateCameraNow();
		}
	}

	[ContextMenu("Update Camera Fit")]
	public void UpdateCameraNow()
	{
		if (targetArea == null)
		{
			return;
		}
		Renderer[] renderers = targetArea.GetComponentsInChildren<Renderer>();
		if (renderers.Length == 0)
		{
			return;
		}
		float padding = ((Screen.width > Screen.height) ? paddingLandscape : paddingPortrait);
		if (Screen.height < smallScreenThreshold || Screen.width < smallScreenThreshold)
		{
			padding += extraPaddingSmallScreen;
		}
		Bounds bounds = renderers[0].bounds;
		Renderer[] array = renderers;
		foreach (Renderer r in array)
		{
			bounds.Encapsulate(r.bounds);
		}
		float screenRatio = (float)Screen.width / (float)Screen.height;
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
		if (tallScreenObject != null)
		{
			if (!hasOriginalObjectY)
			{
				originalObjectY = tallScreenObject.localPosition.y;
				hasOriginalObjectY = true;
			}
			if (screenRatio <= tallScreenRatioThreshold)
			{
				tallScreenObject.localPosition = new Vector3(tallScreenObject.localPosition.x, originalObjectY + tallScreenYOffset, tallScreenObject.localPosition.z);
			}
			else
			{
				tallScreenObject.localPosition = new Vector3(tallScreenObject.localPosition.x, originalObjectY, tallScreenObject.localPosition.z);
			}
		}
		lastScreenWidth = Screen.width;
		lastScreenHeight = Screen.height;
	}
}
