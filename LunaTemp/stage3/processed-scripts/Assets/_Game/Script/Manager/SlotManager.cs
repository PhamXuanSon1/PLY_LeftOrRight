using System.Collections.Generic;
using UnityEngine;

public class SlotManager : MonoBehaviour
{
    public static SlotManager Instance { get; private set; }

    [Header("Kéo thả các Slot (Slot1, Slot2...) vào đây")]
    public List<SlotSetup> allSlots = new List<SlotSetup>();

    [Header("Số slot cho phép chơi trước khi ra Store")]
    public int maxSlotsToPlay = 3;

    [Header("Tuỳ chọn: Tắt object (Vd: Bàn tay hướng dẫn) ở lần click đầu tiên")]
    public GameObject objectToHideOnFirstClick;
    private bool isFirstClick = true;

    public bool IsEndGame { get; private set; } = false;

    private int currentSlotIndex = 0;

    private void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);
    }

    private void Start()
    {
        // Đặt tất cả slot về trạng thái chưa chơi (Unplayed)
        foreach (var slot in allSlots)
        {
            if (slot != null) slot.ChangeState(SlotState.Unplayed);
        }

        // Cập nhật maxScore cho ProgressTrackingManager
        if (ProgressTrackingManager.Instance != null)
        {
            ProgressTrackingManager.Instance.maxScore = maxSlotsToPlay;
        }

        if (allSlots.Count > 0 && allSlots[0] != null)
        {
            // Bật trạng thái đang chơi (Playing) cho slot đầu tiên
            allSlots[currentSlotIndex].ChangeState(SlotState.Playing);
            allSlots[currentSlotIndex].LoadSlotDataToBalloons();
            allSlots[currentSlotIndex].ShowBalloons(true);
            
            PlaySlotStartSounds();
        }
    }

    private void Update()
    {
        // Nếu đã hết lượt chơi, click bất cứ đâu trên màn hình đều gọi GotoStore
        if (IsEndGame)
        {
            if (Input.GetMouseButtonDown(0))
            {
                if (GameManager.instance != null)
                {
                    GameManager.instance.GotoStore();
                }
            }
        }
    }

    public void HideBalloons()
    {
        if (isFirstClick)
        {
            AppLovinAnalytics.Track(ALEvent.CHALLENGE_STARTED);
            isFirstClick = false;
            if (objectToHideOnFirstClick != null)
            {
                objectToHideOnFirstClick.SetActive(false);
            }
        }

        if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
        {
            allSlots[currentSlotIndex].ShowBalloons(false);
        }
    }

    public Transform GetCurrentSlotTransform()
    {
        if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
        {
            return allSlots[currentSlotIndex].transform;
        }
        return null;
    }

    [Header("Hiệu ứng hoàn thành Slot (Right Effect)")]
    public GameObject rightEffectPrefab;
    public Transform rightEffectSpawnPoint;
    public List<Sprite> rightEffectSprites;

    public void LoadNextSlot()
    {
        // Đánh dấu slot hiện tại đã hoàn thành (Played)
        if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
        {
            allSlots[currentSlotIndex].ChangeState(SlotState.Played);
        }

        int completedSlotIndex = currentSlotIndex;
        currentSlotIndex++;

        // Spawn hiệu ứng hoàn thành slot
        SpawnRightEffect(completedSlotIndex);

        // Tăng tiến trình game
        if (ProgressTrackingManager.Instance != null)
        {
            ProgressTrackingManager.Instance.AddProgress(1);
        }

        // Kiểm tra nếu đã chơi đủ số slot tối đa
        if (currentSlotIndex >= maxSlotsToPlay)
        {
            IsEndGame = true;
            Debug.Log("Đã chơi đủ " + maxSlotsToPlay + " slots. Click anywhere to go to Store!");
            
            // Vẫn cho hiện Balloon tiếp theo để dụ người chơi click
            if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
            {
                allSlots[currentSlotIndex].ChangeState(SlotState.Playing);
                allSlots[currentSlotIndex].LoadSlotDataToBalloons();
                allSlots[currentSlotIndex].ShowBalloons(true);
                PlaySlotStartSounds();
            }
            return;
        }

        if (currentSlotIndex < allSlots.Count)
        {
            if (allSlots[currentSlotIndex] != null)
            {
                allSlots[currentSlotIndex].ChangeState(SlotState.Playing);
                allSlots[currentSlotIndex].LoadSlotDataToBalloons();
                allSlots[currentSlotIndex].ShowBalloons(true);
                PlaySlotStartSounds();
            }
        }
        else
        {
            Debug.Log("Đã hoàn thành tất cả các Slot!");
            IsEndGame = true;
        }
    }

    private void PlaySlotStartSounds()
    {
        if (Ply_SoundManager.Ins != null)
        {
            Ply_SoundManager.Ins.PlayFx(FxType.Left);
            DG.Tweening.DOVirtual.DelayedCall(0.5f, () => {
                if (Ply_SoundManager.Ins != null)
                {
                    Ply_SoundManager.Ins.PlayFx(FxType.Right);
                }
            });
        }
    }

    private void SpawnRightEffect(int slotIndex)
    {
        if (rightEffectPrefab != null && rightEffectSpawnPoint != null && rightEffectSprites != null && rightEffectSprites.Count > 0)
        {
            GameObject effect = Instantiate(rightEffectPrefab, rightEffectSpawnPoint.position, rightEffectSpawnPoint.rotation);
            Transform imageChild = effect.transform.Find("Image");
            if (imageChild != null)
            {
                // Thử lấy SpriteRenderer (nếu dùng Sprite)
                var sr = imageChild.GetComponent<SpriteRenderer>();
                if (sr != null)
                {
                    int spriteIndex = slotIndex % rightEffectSprites.Count;
                    sr.sprite = rightEffectSprites[spriteIndex];
                }
                else 
                {
                    // Nếu dùng UI Image
                    var uiImage = imageChild.GetComponent<UnityEngine.UI.Image>();
                    if (uiImage != null)
                    {
                        int spriteIndex = slotIndex % rightEffectSprites.Count;
                        uiImage.sprite = rightEffectSprites[spriteIndex];
                    }
                }
            }
            // Tự huỷ sau 2 giây (có thể điều chỉnh tuỳ theo độ dài animation)
            Destroy(effect, 2f);
        }
    }
}
