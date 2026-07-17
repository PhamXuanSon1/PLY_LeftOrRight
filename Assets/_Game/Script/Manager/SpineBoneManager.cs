using UnityEngine;
using Spine.Unity;
using Spine;
using DG.Tweening;
using System.Collections.Generic;

#if UNITY_EDITOR
using Sirenix.OdinInspector;
#endif

[System.Serializable]
public class BoneOverrideData
{
    [Tooltip("Mã ID để gọi từ script khác. VD: MatTrai, MatPhai, Mieng")]
    public string id;
    
    [SpineBone(dataField = "", fallbackToTextField = true)]
    [Tooltip("Tên Bone trong Spine (Gõ chính xác hoa thường). VD: Control_Eye")]
    public string boneName;
    
    [HideInInspector] public Bone spineBone;
    
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    [Header("Thời gian chuyển đổi trạng thái")]
    public float transitionDuration = 0.2f;

#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    [Header("Trục Y (Lên/Xuống)")]
    public bool overrideY = false;
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    public float openY = 0f;
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    public float closeY = -20f;
    
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    [Header("Trục X (Trái/Phải)")]
    public bool overrideX = false;
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    public float openX = 0f;
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    public float closeX = 0f;
    
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    [Header("Xoay (Rotation)")]
    public bool overrideRotation = false;
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    public float openRotation = 0f;
#if UNITY_EDITOR
    [Sirenix.OdinInspector.FoldoutGroup("Thông số chi tiết")]
#endif
    public float closeRotation = 0f;

    [Header("Bỏ qua Animation")]
    [Tooltip("Nếu bật, xương này sẽ giữ nguyên tư thế gốc (Setup Pose) và bỏ qua mọi thay đổi của Animation đang chạy, chỉ áp dụng Override ở trên.")]
    public bool blockAnimation = false;

    // Các biến lưu giá trị hiện tại để Spine override mỗi frame
    [HideInInspector] public float currentY;
    [HideInInspector] public float currentX;
    [HideInInspector] public float currentRotation;

    public void InitDefault(bool close = false)
    {
        currentX = close ? closeX : openX;
        currentY = close ? closeY : openY;
        currentRotation = close ? closeRotation : openRotation;
    }
}

public class SpineBoneManager : MonoBehaviour
{
    public static SpineBoneManager Instance;

    public SkeletonAnimation skeletonAnimation;
    
    [Header("Tuỳ chọn khởi động")]
    [Tooltip("Tick vào đây nếu muốn vừa vào game là tất cả các xương trong danh sách này bị Close ngay lập tức (Ví dụ: ngủ nhắm mắt).")]
    public bool closeAllOnStart = false;
    
    [Space(10)]
    public List<BoneOverrideData> boneList = new List<BoneOverrideData>();
    
    private Dictionary<string, BoneOverrideData> boneDict = new Dictionary<string, BoneOverrideData>();

    void Awake()
    {
        Instance = this;
    }

    private bool hasInitialized = false;

    void Start()
    {
        InitializeBones();
    }

    void OnEnable()
    {
        if (hasInitialized && skeletonAnimation != null)
        {
            skeletonAnimation.UpdateLocal -= OverrideBones;
            skeletonAnimation.UpdateLocal += OverrideBones;
        }
    }

    void OnDisable()
    {
        if (skeletonAnimation != null)
        {
            skeletonAnimation.UpdateLocal -= OverrideBones;
            // Trả xương về vị trí gốc của file Spine để hết nhắm mắt
            foreach (var b in boneList)
            {
                if (b.spineBone != null) b.spineBone.SetToSetupPose();
            }
        }
    }

    void InitializeBones()
    {
        if (skeletonAnimation == null) skeletonAnimation = GetComponent<SkeletonAnimation>();

        // Lấy ref của Spine Bone và đưa vào Dictionary
        if (skeletonAnimation != null && skeletonAnimation.Skeleton != null)
        {
            foreach (var b in boneList)
            {
                b.spineBone = skeletonAnimation.Skeleton.FindBone(b.boneName);
                b.InitDefault(closeAllOnStart);
                boneDict[b.id] = b;
            }
            // Đăng ký event
            skeletonAnimation.UpdateLocal -= OverrideBones;
            skeletonAnimation.UpdateLocal += OverrideBones;
            hasInitialized = true;
        }
    }

    private void OverrideBones(ISkeletonAnimation animated)
    {
        foreach (var b in boneList)
        {
            if (b.spineBone != null)
            {
                if (b.blockAnimation)
                {
                    b.spineBone.SetToSetupPose();
                }

                if (b.overrideX) b.spineBone.X = b.currentX;
                if (b.overrideY) b.spineBone.Y = b.currentY;
                if (b.overrideRotation) b.spineBone.Rotation = b.currentRotation;
            }
        }
    }

    // --- API ĐIỀU KHIỂN ---
    
    public void OpenBone(string id)
    {
        if (boneDict.TryGetValue(id, out var b))
        {
            DOTween.Kill(b); // Kill tween cũ của bone này
            if (b.overrideX) DOTween.To(() => b.currentX, x => b.currentX = x, b.openX, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
            if (b.overrideY) DOTween.To(() => b.currentY, x => b.currentY = x, b.openY, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
            if (b.overrideRotation) DOTween.To(() => b.currentRotation, x => b.currentRotation = x, b.openRotation, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
        }
        else
        {
            Debug.LogWarning("Không tìm thấy Bone ID: " + id);
        }
    }

    public void CloseBone(string id)
    {
        if (boneDict.TryGetValue(id, out var b))
        {
            DOTween.Kill(b);
            if (b.overrideX) DOTween.To(() => b.currentX, x => b.currentX = x, b.closeX, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
            if (b.overrideY) DOTween.To(() => b.currentY, x => b.currentY = x, b.closeY, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
            if (b.overrideRotation) DOTween.To(() => b.currentRotation, x => b.currentRotation = x, b.closeRotation, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
        }
        else
        {
            Debug.LogWarning("Không tìm thấy Bone ID: " + id);
        }
    }

    public void CloseAllBones()
    {
        foreach (var b in boneList)
        {
            CloseBone(b.id);
        }
    }
    
    public void OpenAllBones()
    {
        foreach (var b in boneList)
        {
            OpenBone(b.id);
        }
    }

#if UNITY_EDITOR
    [Title("Test Khung Giao Diện")]
    [InfoBox("Nhập ID của Bone muốn test (VD: MatTrai) rồi bấm nút để test.")]
    public string testBoneID;

#if UNITY_EDITOR
    [Sirenix.OdinInspector.Button("Test Mở (Open Bone)", Sirenix.OdinInspector.ButtonSizes.Medium)]
#endif
    public void TestOpen()
    {
        OpenBone(testBoneID);
    }

#if UNITY_EDITOR
    [Sirenix.OdinInspector.Button("Test Đóng (Close Bone)", Sirenix.OdinInspector.ButtonSizes.Medium)]
#endif
    public void TestClose()
    {
        CloseBone(testBoneID);
    }
#endif
}
