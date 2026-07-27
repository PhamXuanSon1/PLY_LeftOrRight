using DG.Tweening;
using UnityEngine;
using UnityEngine.Events;

public class BalloonController : MonoBehaviour
{
	[Header("Kéo thả GameObject Item muốn tắt vào đây")]
	public GameObject targetItem;

	[Header("Layer của Balloon (chọn layer 'Item')")]
	public LayerMask interactableLayer;

	[Header("Cấu hình thời gian Animation")]
	[Tooltip("Thời gian bay tới Slot")]
	public float flyDuration = 0.5f;

	[Tooltip("Thời gian thu nhỏ về 0 (chạy song song với bay)")]
	public float scaleDuration = 0.5f;

	[Header("Thời gian chờ thêm trước khi load Slot tiếp theo")]
	public float delayBeforeNextSlot = 0.2f;

	[Header("Sự kiện khi click vào balloon")]
	public UnityEvent onBalloonClicked;

	private bool isAnimating = false;

	private void Update()
	{
		if (isAnimating || !Input.GetMouseButtonDown(0) || (SlotManager.Instance != null && SlotManager.Instance.IsEndGame))
		{
			return;
		}
		Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (!Physics.Raycast(ray, out var hit, float.PositiveInfinity, interactableLayer) || !(hit.collider.gameObject == base.gameObject))
		{
			return;
		}
		if (targetItem != null && SlotManager.Instance != null)
		{
			isAnimating = true;
			onBalloonClicked?.Invoke();
			SlotManager.Instance.HideBalloons();
			Transform itemTransform = targetItem.transform;
			Transform originalParent = itemTransform.parent;
			Vector3 originalLocalPos = itemTransform.localPosition;
			Vector3 originalLocalScale = itemTransform.localScale;
			itemTransform.SetParent(null);
			Transform currentSlot = SlotManager.Instance.GetCurrentSlotTransform();
			Vector3 targetPos = ((currentSlot != null) ? currentSlot.position : originalParent.position);
			Sequence seq = DOTween.Sequence();
			seq.Append(itemTransform.DOMove(targetPos, flyDuration).SetEase(Ease.InOutQuad));
			seq.Append(itemTransform.DOScale(Vector3.zero, scaleDuration).SetEase(Ease.InBack));
			seq.AppendInterval(delayBeforeNextSlot);
			seq.OnComplete(delegate
			{
				itemTransform.SetParent(originalParent);
				itemTransform.localPosition = originalLocalPos;
				itemTransform.localScale = originalLocalScale;
				targetItem.SetActive(false);
				isAnimating = false;
				SlotManager.Instance.LoadNextSlot();
			});
			Debug.Log("Bắt đầu bay item tới Slot!");
		}
		else
		{
			Debug.LogWarning("Thiếu targetItem hoặc SlotManager chưa có trên Scene!");
		}
	}
}
