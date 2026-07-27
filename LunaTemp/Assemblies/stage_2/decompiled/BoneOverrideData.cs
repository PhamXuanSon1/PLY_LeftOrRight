using System;
using Spine;
using Spine.Unity;
using UnityEngine;

[Serializable]
public class BoneOverrideData
{
	[Tooltip("Mã ID để gọi từ script khác. VD: MatTrai, MatPhai, Mieng")]
	public string id;

	[SpineBone("", "", true, false, dataField = "", fallbackToTextField = true)]
	[Tooltip("Tên Bone trong Spine (Gõ chính xác hoa thường). VD: Control_Eye")]
	public string boneName;

	[HideInInspector]
	public Bone spineBone;

	[Header("Thời gian chuyển đổi trạng thái")]
	public float transitionDuration = 0.2f;

	[Header("Trục Y (Lên/Xuống)")]
	public bool overrideY = false;

	public float openY = 0f;

	public float closeY = -20f;

	[Header("Trục X (Trái/Phải)")]
	public bool overrideX = false;

	public float openX = 0f;

	public float closeX = 0f;

	[Header("Xoay (Rotation)")]
	public bool overrideRotation = false;

	public float openRotation = 0f;

	public float closeRotation = 0f;

	[Header("Bỏ qua Animation")]
	[Tooltip("Nếu bật, xương này sẽ giữ nguyên tư thế gốc (Setup Pose) và bỏ qua mọi thay đổi của Animation đang chạy, chỉ áp dụng Override ở trên.")]
	public bool blockAnimation = false;

	[HideInInspector]
	public float currentY;

	[HideInInspector]
	public float currentX;

	[HideInInspector]
	public float currentRotation;

	public void InitDefault(bool close = false)
	{
		currentX = (close ? closeX : openX);
		currentY = (close ? closeY : openY);
		currentRotation = (close ? closeRotation : openRotation);
	}
}
