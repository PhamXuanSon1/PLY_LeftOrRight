using System.Collections.Generic;
using UnityEngine;

public enum DrawItemType
{
    ClickOnly,
    DirectDraw,
    DipAndDraw,
    SnapToTarget,
    DragAwayToFade
}

public class DrawItemController : MonoBehaviour 
{

    [Header("Cấu hình Loại Tương tác")]
    [Tooltip("ClickOnly: Chỉ cần click 1 cái.\nDirectDraw: Cầm lên vẽ trực tiếp.\nDipAndDraw: Phải chấm vào phấn trước rồi mới vẽ được.\nSnapToTarget: Kéo thả vào 1 vị trí cố định.\nDragAwayToFade: Kéo ra xa vị trí ban đầu 1f thì mờ đi và biến mất.")]
    public DrawItemType itemType;
    
    [Header("Điều kiện mở khoá")]
    [Tooltip("Danh sách các vật phẩm CẦN PHẢI hoàn thành trước khi mở khoá vật phẩm này (dành cho trường hợp cần nhiều hơn 1 điều kiện).")]
    public List<DrawItemController> requireItemsToUnlock = new List<DrawItemController>();

    public bool IsUnlocked()
    {
        if (requireItemsToUnlock != null)
        {
            for (int i = 0; i < requireItemsToUnlock.Count; i++)
            {
                if (requireItemsToUnlock[i] != null && !requireItemsToUnlock[i].isCompleted) return false;
            }
        }
        return true;
    }

#if UNITY_EDITOR
    [Sirenix.OdinInspector.ValueDropdown("@DrawItemManager.GetAvailableMakeupIDs()")]
#endif
    [Tooltip("ID dùng để đối chiếu với Makeup Target. Chỉ khi DrawItem và Target có cùng ID thì mới vẽ/tương tác được.")]
    public string makeupID;

    [Header("Điểm xét va chạm (Đầu cọ/đầu son)")]
    [Tooltip("Kéo 1 Transform rỗng (đặt ở đầu cọ) vào đây. Tia quét (Raycast) sẽ bắn từ vị trí này để nhận diện mặt.")]
    public Transform tipPoint;
    
    [HideInInspector]
    public float tipRadius = 0.5f;

    [Header("Dành cho Dip And Draw")]
    [Tooltip("Kéo Collider của hộp phấn vào đây. Cọ phải quẹt trúng hộp phấn này thì hasDipped mới thành true.")]
    public Collider dipTarget; // Vị trí hộp phấn
    
    [Tooltip("Xác định xem cọ đã có phấn chưa. Sẽ tự động reset về false khi bắt đầu game.")]
    public bool hasDipped = false;
    
    [Header("Dành cho Snap To Target")]
    [Tooltip("Vị trí đích (Transform) mà đồ vật này cần được thả vào. Dùng cho loại SnapToTarget.")]
    public Transform snapTarget;
    
    [Tooltip("Khoảng cách bắt dính (hút). Nếu thả đồ vật cách đích nhỏ hơn bán kính này, nó sẽ tự dính vào và tính là hoàn thành.")]
    public float snapRadius = 1.0f;
    [Tooltip("Sprite hiển thị khi chưa cầm (hoặc thả trượt)")]
    public GameObject closedSpriteObj;
    [Tooltip("Sprite hiển thị khi đang cầm (đang kéo)")]
    public GameObject openSpriteObj;

    [Header("Tương tác Spine Bone (Khi cầm lên)")]
    [Tooltip("Gõ ID của các Bone muốn MỞ khi cầm item này (VD: Mieng)")]
    public List<string> openBonesOnGrab = new List<string>();
    [Tooltip("Gõ ID của các Bone muốn ĐÓNG khi cầm item này (VD: MatTrai, MatPhai)")]
    public List<string> closeBonesOnGrab = new List<string>();
    
    [Header("Hiệu ứng Particle (Chỉ phát khi quẹt trúng mặt)")]
    [Tooltip("Kéo Particle System (VD: Bụi phấn, ngôi sao) vào đây. Nó sẽ tự động bật khi bạn quẹt trúng điểm Makeup, và tắt khi quẹt trượt.")]
    public ParticleSystem drawFaceEffect;

    [Header("Âm thanh lúc kéo (Loop)")]
    [Tooltip("Bật cái này nếu muốn phát âm thanh lặp lại liên tục trong suốt quá trình cầm/kéo đồ vật này.")]
    public bool playLoopFxOnDrag = false;
    public FxType loopFxToPlay;
    
    [HideInInspector]
    public bool isCompleted = false;

    [Header("Tự động hoàn thành (Tuỳ chọn)")]
    [Tooltip("Bật cái này nếu muốn tự động hoàn thành tất cả các mục tiêu còn lại khi đạt đến một mức % nhất định (Ví dụ 70%). Chỉ dành cho DirectDraw và DipAndDraw.")]
    public bool enableAutoComplete = false;
    
    [Tooltip("Mức độ hoàn thành để tự động hoàn thành (Ví dụ: 0.7 = 70%)")]
    [Range(0f, 1f)]
    public float autoCompleteThreshold = 0.7f;

    private void Awake()
    {
        // Reset lại trạng thái ban đầu để tránh bị lưu đè data trên Scene/Prefab (vì biến này từng là public)
        isCompleted = false;
        hasDipped = false;
    }

    [Header("Sự kiện mở rộng (Tuỳ chọn)")]
    [Tooltip("Chạy các lệnh trong này khi người chơi vừa click chuột CẦM đồ vật lên.")]
    public UnityEngine.Events.UnityEvent OnGrabEvent;
    
    [Tooltip("Chạy các lệnh trong này khi người chơi nhả chuột THẢ đồ vật ra.")]
    public UnityEngine.Events.UnityEvent OnDropEvent;

    [Header("Sự kiện hoàn thành (Hoặc Click)")]
    [Tooltip("Chạy khi vật phẩm hoàn thành mục tiêu (Click xong, Snap trúng đích, hoặc nhúng cọ xong).")]
    [UnityEngine.Serialization.FormerlySerializedAs("OnClickEvent")]
    public UnityEngine.Events.UnityEvent OnCompleteEvent;
}