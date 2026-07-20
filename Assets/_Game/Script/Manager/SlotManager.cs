using System.Collections.Generic;
using UnityEngine;

public class SlotManager : MonoBehaviour
{
    public static SlotManager Instance { get; private set; }

    [Header("Kéo thả các Slot (Slot1, Slot2...) vào đây")]
    public List<SlotSetup> allSlots = new List<SlotSetup>();

    [Header("Số slot cho phép chơi trước khi ra Store")]
    public int maxSlotsToPlay = 3;

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

        if (allSlots.Count > 0 && allSlots[0] != null)
        {
            // Bật trạng thái đang chơi (Playing) cho slot đầu tiên
            allSlots[currentSlotIndex].ChangeState(SlotState.Playing);
            allSlots[currentSlotIndex].LoadSlotDataToBalloons();
            allSlots[currentSlotIndex].ShowBalloons(true);
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

    public void LoadNextSlot()
    {
        // Đánh dấu slot hiện tại đã hoàn thành (Played)
        if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
        {
            allSlots[currentSlotIndex].ChangeState(SlotState.Played);
        }

        currentSlotIndex++;

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
            }
        }
        else
        {
            Debug.Log("Đã hoàn thành tất cả các Slot!");
            IsEndGame = true;
        }
    }
}
