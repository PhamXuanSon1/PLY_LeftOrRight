using UnityEngine;

public class AlignToScreenLeft : MonoBehaviour
{
	[Tooltip("Khoảng cách từ mép trái màn hình đến object (giống startOffsetX trong ItemArranger)")]
	public float startOffsetX = 2f;

	[Tooltip("Nếu bật, object sẽ liên tục tự căn chỉnh lại mỗi khi kích thước màn hình thay đổi")]
	public bool realignOnUpdate = true;

	private int lastScreenWidth;

	private int lastScreenHeight;

	private void Start()
	{
		lastScreenWidth = Screen.width;
		lastScreenHeight = Screen.height;
		AlignToLeft();
	}

	private void LateUpdate()
	{
		if (realignOnUpdate && (lastScreenWidth != Screen.width || lastScreenHeight != Screen.height))
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
		if (!(cam == null))
		{
			float zDist = cam.WorldToViewportPoint(base.transform.position).z;
			float targetX = cam.ViewportToWorldPoint(new Vector3(0f, 0f, zDist)).x + startOffsetX;
			base.transform.position = new Vector3(targetX, base.transform.position.y, base.transform.position.z);
		}
	}
}
