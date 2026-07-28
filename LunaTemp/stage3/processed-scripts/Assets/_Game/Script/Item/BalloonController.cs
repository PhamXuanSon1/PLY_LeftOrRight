using UnityEngine;
using DG.Tweening;

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
    public UnityEngine.Events.UnityEvent onBalloonClicked;

    private bool isAnimating = false;

    void Update()
    {
        if (isAnimating) return;

        // Nhận diện click chuột trái hoặc chạm màn hình
        if (Input.GetMouseButtonDown(0))
        {
            // Nếu đã hết số lượt chơi (EndGame), bỏ qua click ở đây để SlotManager gọi ra Store
            if (SlotManager.Instance != null && SlotManager.Instance.IsEndGame) return;

            // Bắn ray từ camera tới vị trí click
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            // Kiểm tra va chạm, CHỈ check trên những object thuộc interactableLayer (Layer Item)
            if (Physics.Raycast(ray, out hit, Mathf.Infinity, interactableLayer))
            {
                // Nếu tia ray bắn trúng collider của chính GameObject đang gắn script này
                if (hit.collider.gameObject == this.gameObject)
                {
                    if (targetItem != null && SlotManager.Instance != null)
                    {
                        isAnimating = true;

                        // Play sound click
                        if (Ply_SoundManager.Ins != null)
                        {
                            Ply_SoundManager.Ins.PlayFx(FxType.Click);
                        }

                        // Kích hoạt sự kiện click (Ví dụ: để gọi PlayAnimation)
                        onBalloonClicked?.Invoke();

                        // Tạm ẩn 2 balloon
                        SlotManager.Instance.HideBalloons();

                        // Tách item khỏi balloon
                        Transform itemTransform = targetItem.transform;
                        Transform originalParent = itemTransform.parent;
                        Vector3 originalLocalPos = itemTransform.localPosition;
                        Vector3 originalLocalScale = itemTransform.localScale;

                        itemTransform.SetParent(null);

                        // Lấy vị trí Slot đích
                        Transform currentSlot = SlotManager.Instance.GetCurrentSlotTransform();
                        Vector3 targetPos = currentSlot != null 
                            ? currentSlot.position 
                            : originalParent.position;

                        // Animation bay đến Slot, SAU ĐÓ mới Scale về 0
                        Sequence seq = DOTween.Sequence();
                        seq.Append(itemTransform.DOMove(targetPos, flyDuration).SetEase(Ease.InOutQuad));
                        
                        // Khi bay đến slot xong thì play sound Yeah
                        seq.AppendCallback(() => 
                        {
                            if (Ply_SoundManager.Ins != null)
                            {
                                Ply_SoundManager.Ins.PlayFx(FxType.Yeah);
                            }
                        });

                        seq.Append(itemTransform.DOScale(Vector3.zero, scaleDuration).SetEase(Ease.InBack));
                        seq.AppendInterval(delayBeforeNextSlot);

                        seq.OnComplete(() =>
                        {
                            // Trả lại làm con của Balloon
                            itemTransform.SetParent(originalParent);
                            itemTransform.localPosition = originalLocalPos;
                            itemTransform.localScale = originalLocalScale;
                            targetItem.SetActive(false); // Tắt nó đi trước khi bật balloon lên (nếu cần)

                            isAnimating = false;

                            // Load data của slot tiếp theo
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
        }
    }
}
