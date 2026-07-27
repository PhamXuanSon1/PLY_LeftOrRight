using System;
using UnityEngine;

[Serializable]
public class EmotionSlotConfig
{
	[Tooltip("Tên Slot trên Spine (VD: Set_P1_Mouth)")]
	public string slotName;

	[Tooltip("Tên Attachment muốn đổi thành khi cười (VD: Base/mouth smile)")]
	public string targetAttachmentName;

	[Tooltip("CHỈ ĐỔI SANG MẶT CƯỜI NẾU rãnh này đang hiển thị Attachment này (VD: Base/dry mouth 3). Để trống nếu muốn luôn đổi.")]
	public string requiredCurrentAttachment;

	[Tooltip("Tên Attachment gốc để quay về sau khi cười. Nếu để trống, code sẽ tự lấy Attachment đang mặc định lúc đó.")]
	public string defaultAttachmentName;
}
