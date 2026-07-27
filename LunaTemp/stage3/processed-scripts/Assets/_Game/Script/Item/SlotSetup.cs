using UnityEngine;

public enum SlotState
{
    Unplayed,
    Playing,
    Played
}

public class SlotSetup : MonoBehaviour
{
    [Header("Dữ liệu (ScriptableObject) của Slot này")]
    public SlotDataSO slotData;

    [Header("UI Trạng thái Card")]
    public GameObject borderGold;
    public GameObject borderWhite;
    public GameObject greyCard;
    public GameObject blueCard;
    public GameObject greenCard;
    public GameObject greenTick;

    [Header("Tham chiếu tới Balloon GameObjects (cha của Renderer)")]
    public GameObject leftBalloonObj;
    public GameObject rightBalloonObj;

    [Header("Tham chiếu tới Item (SpriteRenderer) trong 2 Balloon")]
    public SpriteRenderer leftBalloonItemRenderer;
    public SpriteRenderer rightBalloonItemRenderer;

    public void ChangeState(SlotState state)
    {
        switch (state)
        {
            case SlotState.Unplayed:
                if (borderGold != null) borderGold.SetActive(false);
                if (borderWhite != null) borderWhite.SetActive(true);
                if (greyCard != null) greyCard.SetActive(true);
                if (blueCard != null) blueCard.SetActive(false);
                if (greenCard != null) greenCard.SetActive(false);
                if (greenTick != null) greenTick.SetActive(false);
                break;

            case SlotState.Playing:
                if (borderGold != null) borderGold.SetActive(true);
                if (borderWhite != null) borderWhite.SetActive(false);
                if (greyCard != null) greyCard.SetActive(false);
                if (blueCard != null) blueCard.SetActive(true);
                if (greenCard != null) greenCard.SetActive(false);
                if (greenTick != null) greenTick.SetActive(false);
                break;

            case SlotState.Played:
                if (borderGold != null) borderGold.SetActive(true);
                if (borderWhite != null) borderWhite.SetActive(false);
                if (greyCard != null) greyCard.SetActive(false);
                if (blueCard != null) blueCard.SetActive(false);
                if (greenCard != null) greenCard.SetActive(true);
                if (greenTick != null) greenTick.SetActive(true);
                break;
        }
    }

    public void LoadData(SlotDataSO newData)
    {
        slotData = newData; // Gán lại để dễ theo dõi trên inspector
        if (slotData == null)
        {
            Debug.LogWarning("Chưa gán SlotDataSO cho Slot: " + gameObject.name);
            return;
        }

        // Cập nhật sprite cho Item bên trái và bật nó lên
        if (leftBalloonItemRenderer != null)
        {
            leftBalloonItemRenderer.sprite = slotData.leftItemSprite;
            leftBalloonItemRenderer.gameObject.SetActive(true); 
        }

        // Cập nhật sprite cho Item bên phải và bật nó lên
        if (rightBalloonItemRenderer != null)
        {
            rightBalloonItemRenderer.sprite = slotData.rightItemSprite;
            rightBalloonItemRenderer.gameObject.SetActive(true); 
        }

        Debug.Log("Đã load dữ liệu của " + slotData.slotName + " lên 2 balloons!");
    }

    public void ShowBalloons(bool isShow)
    {
        if (leftBalloonObj != null) leftBalloonObj.SetActive(isShow);
        if (rightBalloonObj != null) rightBalloonObj.SetActive(isShow);
    }

    // Hàm này dùng để hiển thị 2 texture (sprite) lên 2 balloon tương ứng
    // Bạn có thể gọi hàm này thông qua sự kiện OnClick của UI Button trên Slot
    [ContextMenu("Show Item Textures")]
#if UNITY_EDITOR
    [Sirenix.OdinInspector.Button("Hiện 2 Items lên Balloons", Sirenix.OdinInspector.ButtonSizes.Medium)]
    [Sirenix.OdinInspector.GUIColor(0.4f, 1f, 0.4f)]
#endif
    public void LoadSlotDataToBalloons()
    {
        LoadData(slotData);
    }
}
