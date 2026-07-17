using UnityEngine;
using Luna.Unity;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;


#if UNITY_EDITOR
using Sirenix.OdinInspector;
#endif

public class GameManager : MonoBehaviour
{
    [LunaPlaygroundField("Google Build", 0, "Build Settings")]
    public bool isGoogleBuild = false;

    [Header("Google Build Disables")]
    public List<GameObject> googleDisabledObjects = new List<GameObject>();
    public List<Behaviour> googleDisabledBehaviours = new List<Behaviour>();

    [Header("UI & Objects")]
    public List<GameObject> listObjectInIntro = new List<GameObject>();
    public List<GameObject> listObjectInMap1 = new List<GameObject>();
    public List<GameObject> listObjectInMap2 = new List<GameObject>();
    public List<GameObject> listObjectInMap3 = new List<GameObject>();
    public List<GameObject> listObjectInMap4 = new List<GameObject>();

    [System.Serializable]
    public class AnimSequenceStep
    {
        [Tooltip("Animator của object cần chạy Anim (Có thể để trống nếu chỉ dùng Event)")]
        public Animator targetAnimator;
        
        [Tooltip("Tên Trigger để kích hoạt Anim (VD: Play)")]
        public string triggerName = "Play";
        
        [Tooltip("Thời gian chờ TRƯỚC KHI chạy bước tiếp theo (hoặc trước khi tự động chuyển sang Map 3)")]
        public float delayAfter = 1f;
        
        [Tooltip("Event tùy chọn để gọi thêm logic (bật/tắt object, phát âm thanh...)")]
        public UnityEngine.Events.UnityEvent onStepStart;
    }

    [Header("Map 2 -> Map 3 Animation Sequence")]
    [Tooltip("Nếu tắt, game sẽ KHÔNG tự động bật Map 3 ở cuối chuỗi. Bạn sẽ phải tự gọi hàm GameManager.TurnOnMap3() thông qua Event.")]
    public bool autoSwitchToMap3AtEnd = true;
    public List<AnimSequenceStep> map2ToMap3Sequence = new List<AnimSequenceStep>();

    public static GameManager instance;

    private Dictionary<GameObject, Vector3> map2InitialPositions = new Dictionary<GameObject, Vector3>();
    private bool map2Recorded = false;

    void Awake()
    {
        instance = this;
        
        if (isGoogleBuild)
        {
            foreach (var obj in googleDisabledObjects)
            {
                if (obj != null) obj.SetActive(false);
            }
            foreach (var comp in googleDisabledBehaviours)
            {
                if (comp != null) comp.enabled = false;
            }
        }
    }

    public void GotoStore()
    {
        LifeCycle.GameEnded();

        Playable.InstallFullGame();
    }

    // Viết thành 1 hàm chung để xử lý List
    public void SetListActive(List<GameObject> list, bool isActive)
    {
        foreach (var obj in list)
        {
            if (obj != null)
            {
                if (isActive && isGoogleBuild && googleDisabledObjects.Contains(obj))
                {
                    obj.SetActive(false);
                    continue;
                }
                obj.SetActive(isActive);
            }
        }
    }

    public void TurnOnIntro()
    {
        
        SetListActive(listObjectInMap1, false);
        SetListActive(listObjectInMap2, false);
        SetListActive(listObjectInMap3, false);
        SetListActive(listObjectInMap4, false);
        SetListActive(listObjectInIntro, true);
    }

    public void TurnOnMap1()
    {
        SetListActive(listObjectInIntro, false);
        
        SetListActive(listObjectInMap2, false);
        SetListActive(listObjectInMap3, false);
        SetListActive(listObjectInMap4, false);
        SetListActive(listObjectInMap1, true);
        if (HandHintManager.Instance != null) HandHintManager.Instance.ShowHintImmediately();
    }

    public void TurnOnMap2()
    {
        SetListActive(listObjectInIntro, false);
        SetListActive(listObjectInMap1, false);
        
        SetListActive(listObjectInMap3, false);
        SetListActive(listObjectInMap4, false);
        SetListActive(listObjectInMap2, true);
        
        if (DrawItemManager.Instance != null) DrawItemManager.Instance.currentMapIndex = 1;
    }

    public void TurnOnMap3()
    {
        SetListActive(listObjectInIntro, false);
        SetListActive(listObjectInMap1, false);
        SetListActive(listObjectInMap2, false);
        SetListActive(listObjectInMap3, true);
        SetListActive(listObjectInMap4, false);
        
        if (DrawItemManager.Instance != null) DrawItemManager.Instance.currentMapIndex = 2;

        if (HandHintManager.Instance != null)
        {
            HandHintManager.Instance.ShowHintImmediately();
        }
    }

    public void TurnOnMap4()
    {
        SetListActive(listObjectInIntro, false);
        SetListActive(listObjectInMap1, false);
        SetListActive(listObjectInMap2, false);
        SetListActive(listObjectInMap3, false);
        SetListActive(listObjectInMap4, true);
        
        if (DrawItemManager.Instance != null) DrawItemManager.Instance.currentMapIndex = 3;
        if (HandHintManager.Instance != null) HandHintManager.Instance.ShowHintWithDelay();
        if (DrawInputManager.Instance != null) DrawInputManager.Instance.EnableGoToStoreOnClick();
    }

    public void GoToMap3WithAnimation()
    {
         if (DrawInputManager.Instance != null) DrawInputManager.Instance.ForceDropItem();

         StartCoroutine(Map2ToMap3SequenceRoutine());
    }

    private IEnumerator Map2ToMap3SequenceRoutine()
    {
        if (map2ToMap3Sequence != null && map2ToMap3Sequence.Count > 0)
        {
            foreach (var step in map2ToMap3Sequence)
            {
                if (step.targetAnimator != null && !string.IsNullOrEmpty(step.triggerName))
                {
                    step.targetAnimator.SetTrigger(step.triggerName);
                }
                
                step.onStepStart?.Invoke();

                if (step.delayAfter > 0)
                {
                    yield return new WaitForSeconds(step.delayAfter);
                }
            }
        }

        // Sau khi chạy hết chuỗi anim (hoặc nếu chuỗi trống), tự động bật Map 3 nếu được cho phép
        if (autoSwitchToMap3AtEnd)
        {
            TurnOnMap3();
        }
    }

#if UNITY_EDITOR
    [TitleGroup("Công Cụ Test Map (Chỉ dùng trên Editor)")]
    [HorizontalGroup("Công Cụ Test Map (Chỉ dùng trên Editor)/Buttons")]
    [Button("Chỉ bật Intro", ButtonSizes.Medium), GUIColor(0.4f, 0.8f, 1f)]
    public void ToolTurnOnIntro()
    {
        TurnOnIntro();
    }

    [HorizontalGroup("Công Cụ Test Map (Chỉ dùng trên Editor)/Buttons")]
    [Button("Chỉ bật Map 1", ButtonSizes.Medium), GUIColor(0.4f, 1f, 0.4f)]
    public void ToolTurnOnMap1()
    {
        TurnOnMap1();
    }

    [HorizontalGroup("Công Cụ Test Map (Chỉ dùng trên Editor)/Buttons")]
    [Button("Chỉ bật Map 2", ButtonSizes.Medium), GUIColor(1f, 0.8f, 0.4f)]
    public void ToolTurnOnMap2()
    {
        TurnOnMap2();
    }

    [HorizontalGroup("Công Cụ Test Map (Chỉ dùng trên Editor)/Buttons")]
    [Button("Chỉ bật Map 3", ButtonSizes.Medium), GUIColor(1f, 0.4f, 0.8f)]
    public void ToolTurnOnMap3()
    {
        TurnOnMap3();
    }

    [HorizontalGroup("Công Cụ Test Map (Chỉ dùng trên Editor)/Buttons")]
    [Button("Chỉ bật Map 4", ButtonSizes.Medium), GUIColor(0.8f, 0.4f, 1f)]
    public void ToolTurnOnMap4()
    {
        TurnOnMap4();
    }
#endif
}
