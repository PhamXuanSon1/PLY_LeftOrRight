using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;

public class HandHintManager : MonoBehaviour
{
    public static HandHintManager Instance;

    [Header("UI Objects")]
    public GameObject handIcon;
    public Animator handAnimator; // Chứa trigger "Click"

    [System.Serializable]
    public class MapHintConfig
    {
        [Tooltip("Tên của Map để dễ quản lý (Ví dụ: Map 1, Map 2)")]
        public string mapName = "New Map";

        [Tooltip("Kéo danh sách các đồ vật (DrawItemController) theo đúng thứ tự bạn muốn hiển thị bàn tay gợi ý.")]
        public List<DrawItemController> orderedHintItems = new List<DrawItemController>();
    }

    [Header("Hint Settings")]
    public float delayBeforeHint = 2.5f;
    [Tooltip("Bán kính vòng xoay chà xát (dành cho đồ vật có Continuous Mode)")]
    public float circleRadius = 2f;
    [Tooltip("Thời gian hoàn thành 1 vòng xoay chà xát (số càng to thì bàn tay xoay càng chậm)")]
    public float circleDuration = 1.5f;

    [Header("Danh Sách Hint Từng Map (Điền tự động)")]
    public MapHintConfig map1_Hints = new MapHintConfig { mapName = "Map 1" };
    public MapHintConfig map2_Hints = new MapHintConfig { mapName = "Map 2" };
    public MapHintConfig map3_Hints = new MapHintConfig { mapName = "Map 3" };
    public MapHintConfig map4_Hints = new MapHintConfig { mapName = "Map 4" };

    [Header("Debug Status (Chỉ để xem)")]
    #if UNITY_EDITOR
    [Sirenix.OdinInspector.ShowInInspector, Sirenix.OdinInspector.ReadOnly]
    #endif
    private string currentStatus = "Đang rảnh (Idle)";

    #if UNITY_EDITOR
    [Sirenix.OdinInspector.ShowInInspector, Sirenix.OdinInspector.ReadOnly]
    #endif
    private float idleTime = 0f;
    private bool isCounting = false;

    private Coroutine delayCoroutine;
    private Tween currentTween;

    void Awake()
    {
        Instance = this;
        if (handIcon != null) handIcon.SetActive(false); // Ẩn khi mới vào game
    }

    void Update()
    {
        // Chặn hoàn toàn việc đếm thời gian nếu người chơi đang cầm/kéo đồ vật
        if (DrawInputManager.Instance != null && DrawInputManager.Instance.currentDrawItem != null)
        {
            idleTime = 0f; // Reset thời gian chờ
            return;
        }

        if (isCounting)
        {
            idleTime += Time.deltaTime;
            currentStatus = "Đang chờ... " + idleTime.ToString("F1") + "s / " + delayBeforeHint + "s";
            
            if (idleTime >= delayBeforeHint)
            {
                isCounting = false;
                ShowHint();
            }
        }
    }

    public void ShowHintImmediately()
    {
        StopAllHintLogic();
        delayCoroutine = StartCoroutine(WaitAFrameAndShowHint());
    }

    private IEnumerator WaitAFrameAndShowHint()
    {
        yield return new WaitForEndOfFrame();
        ShowHint();
    }

    public void HideHintTemporarily()
    {
        StopAllHintLogic();
        if (handIcon != null) handIcon.SetActive(false);
    }

    public void ShowHintWithDelay()
    {
        StopAllHintLogic();
        isCounting = true;
        idleTime = 0f;
        currentStatus = "Bắt đầu đếm thời gian: 0s";
    }

    public void CheckAndAdvanceHint()
    {
        ShowHintWithDelay();
    }



    private void StopAllHintLogic()
    {
        isCounting = false;
        if (delayCoroutine != null) StopCoroutine(delayCoroutine);
        if (currentTween != null) currentTween.Kill();
        if (handIcon != null) handIcon.transform.DOKill();
        isCounting = false;
        idleTime = 0f;
        currentStatus = "Đã dừng (Đang cầm đồ hoặc ẩn)";
    }

    private void ShowHint()
    {
        isCounting = false;
        idleTime = 0f;
        if (DrawItemManager.Instance == null) { currentStatus = "LỖI: Không có DrawItemManager!"; return; }
        if (handIcon == null) { currentStatus = "LỖI: Chưa kéo Hand Icon vào Inspector!"; return; }
        
        int mapIndex = DrawItemManager.Instance.currentMapIndex;

        MapHintConfig config = null;
        if (mapIndex == 0) config = map1_Hints;
        else if (mapIndex == 1) config = map2_Hints;
        else if (mapIndex == 2) config = map3_Hints;
        else if (mapIndex == 3) config = map4_Hints;

        if (config == null) { currentStatus = "Bỏ qua: Không có cài đặt cho Map " + mapIndex; return; }

        DrawItemController nextItem = null;

        // Tìm món đồ đầu tiên chưa hoàn thành theo danh sách thủ công
        Debug.Log("HandHint: Bắt đầu quét lại TỪ ĐẦU danh sách orderedHintItems gồm " + config.orderedHintItems.Count + " món.");
        foreach (var item in config.orderedHintItems)
        {
            // BỎ QUA nếu item bị trống, hoặc ITEM CHƯA ĐƯỢC BẬT (ví dụ đang ở Intro, Map 1 chưa bật)
            if (item == null) continue;
            // if (!item.gameObject.activeInHierarchy)
            // {
            //     Debug.Log("HandHint: Bỏ qua [" + item.name + "] vì nó đang bị ẨN (Inactive) trong Hierarchy!");
            //     continue;
            // }
            
            if (item.itemType == DrawItemType.ClickOnly || item.itemType == DrawItemType.SnapToTarget || item.itemType == DrawItemType.DragAwayToFade)
            {
                if (!item.isCompleted) 
                { 
                    Debug.Log("HandHint: Đã chọn " + item.name + " (Chưa Completed)");
                    nextItem = item; 
                    break; 
                }
                else Debug.Log("HandHint: Bỏ qua " + item.name + " vì đã Completed.");
            }
            else // DirectDraw, DipAndDraw
            {
                MakeupTarget target = FindTargetFor(item.makeupID, mapIndex);
                if (target != null && !target.isApplied)
                {
                    Debug.Log("HandHint: Đã chọn cọ " + item.name + " trỏ vào Target chưa tô: " + target.name);
                    nextItem = item;
                    break;
                }
                else
                {
                    Debug.Log("HandHint: Bỏ qua cọ " + item.name + " vì TẤT CẢ Target có ID '" + item.makeupID + "' đều đã tô xong (hoặc không tìm thấy)!");
                }
            }
        }

        if (nextItem == null) 
        {
            currentStatus = "Xong: Tất cả đồ vật đã làm xong hoặc List đang trống!";
            handIcon.SetActive(false);
            return; // Tất cả đã xong
        }

        currentStatus = "Đang chỉ tay vào: " + nextItem.name;
        handIcon.SetActive(true);
        if (handAnimator != null) 
        {
            handAnimator.Rebind(); // Reset hoàn toàn Animator về trạng thái mặc định ban đầu
        }

        // Lấy vị trí hiện tại của vật thể làm điểm bắt đầu
        Vector3 startPos = nextItem.transform.position;
        // KHÔNG dùng SpawnPos nữa vì nếu vật thể có Animator di chuyển nó, 
        // SpawnPos (lưu từ Awake) sẽ bị sai vị trí.
        // DrawItemMovement movement = nextItem.GetComponent<DrawItemMovement>();
        // if (movement != null) startPos = movement.SpawnPos;

        if (nextItem.itemType == DrawItemType.ClickOnly)
        {
            Debug.Log("HandHint: ClickOnly tại " + startPos);
            handIcon.transform.position = startPos;
            
            // Nghỉ 0.1s để chờ Animator khởi động xong (nếu vừa SetActive) rồi mới Click
            Sequence seq = DOTween.Sequence();
            seq.AppendInterval(0.1f);
            seq.AppendCallback(() => {
                if (handAnimator != null) handAnimator.SetTrigger("Click");
            });
            seq.AppendInterval(1f); // Chờ animation click xong (khoảng 1s)
            seq.OnComplete(ShowHint); // Gọi lại ShowHint để cập nhật vị trí mới (Loop)
            currentTween = seq;
        }
        else if (nextItem.itemType == DrawItemType.SnapToTarget)
        {
            if (nextItem.snapTarget != null)
            {
                Debug.Log("HandHint: Kéo SnapToTarget từ " + startPos + " đến " + nextItem.snapTarget.position);
                AnimateDrag(startPos, nextItem.snapTarget.position);
            }
            else Debug.LogWarning("HandHint LỖI: Chưa kéo snapTarget cho món đồ " + nextItem.name);
        }
        else if (nextItem.itemType == DrawItemType.DirectDraw)
        {
            MakeupTarget target = FindTargetFor(nextItem.makeupID, mapIndex);
            if (target != null) 
            {
                Vector3 targetPos = GetTargetPos(target);
                if (target.continuousMode)
                {
                    Debug.Log("HandHint: Kéo DirectDraw và xoay vòng tại " + targetPos);
                    AnimateDragAndCircle(startPos, targetPos);
                }
                else
                {
                    Debug.Log("HandHint: Kéo DirectDraw từ " + startPos + " đến " + targetPos);
                    AnimateDrag(startPos, targetPos);
                }
            }
            else Debug.LogWarning("HandHint LỖI: Không tìm thấy MakeupTarget nào có ID là " + nextItem.makeupID);
        }
        else if (nextItem.itemType == DrawItemType.DipAndDraw)
        {
            MakeupTarget target = FindTargetFor(nextItem.makeupID, mapIndex);
            if (target != null && nextItem.dipTarget != null)
            {
                Vector3 targetPos = GetTargetPos(target);
                if (target.continuousMode)
                {
                    Debug.Log("HandHint: DipAndDraw từ " + startPos + " tới khay phấn rồi xoay vòng tại " + targetPos);
                    AnimateDipAndDraw(startPos, nextItem.dipTarget.bounds.center, targetPos, true);
                }
                else
                {
                    Debug.Log("HandHint: DipAndDraw từ " + startPos + " tới khay phấn rồi tới " + targetPos);
                    AnimateDipAndDraw(startPos, nextItem.dipTarget.bounds.center, targetPos, false);
                }
            }
            else Debug.LogWarning("HandHint LỖI: Thiếu MakeupTarget hoặc Khay phấn cho " + nextItem.name);
        }
        else if (nextItem.itemType == DrawItemType.DragAwayToFade)
        {
            Debug.Log("HandHint: Kéo DragAwayToFade sang phải 1f");
            AnimateDrag(startPos, startPos + new Vector3(2f, 0, 0));
        }
    }

    private Vector3 GetTargetPos(MakeupTarget target)
    {
        if (target == null) return Vector3.zero;
        Collider2D col = target.GetComponent<Collider2D>();
        if (col != null) return col.bounds.center;
        return target.transform.position;
    }

    private void AnimateDrag(Vector3 start, Vector3 end)
    {
        handIcon.transform.position = start;
        currentTween = handIcon.transform.DOMove(end, 1.5f).SetEase(Ease.InOutSine).OnComplete(ShowHint);
    }

    private void AnimateDragAndCircle(Vector3 start, Vector3 end)
    {
        handIcon.transform.position = start;
        
        Sequence seq = DOTween.Sequence();
        seq.Append(handIcon.transform.DOMove(end + new Vector3(circleRadius, 0, 0), 1f).SetEase(Ease.InOutSine));
        
        // Mảng toạ độ để tạo thành vòng tròn
        Vector3[] path = new Vector3[] {
            end + new Vector3(0, circleRadius, 0),
            end + new Vector3(-circleRadius, 0, 0),
            end + new Vector3(0, -circleRadius, 0),
            end + new Vector3(circleRadius, 0, 0)
        };
        
        seq.Append(handIcon.transform.DOPath(path, circleDuration, PathType.CatmullRom).SetEase(Ease.Linear).SetLoops(2, LoopType.Restart));
        seq.OnComplete(ShowHint);
        
        currentTween = seq;
    }

    private void AnimateDipAndDraw(Vector3 start, Vector3 dip, Vector3 end, bool circleAtEnd = false)
    {
        handIcon.transform.position = start;
        
        Sequence seq = DOTween.Sequence();
        seq.Append(handIcon.transform.DOMove(dip, 1f).SetEase(Ease.InOutSine));
        seq.AppendInterval(0.2f); // Nghỉ 1 chút ở điểm nhúng phấn
        
        if (circleAtEnd)
        {
            seq.Append(handIcon.transform.DOMove(end + new Vector3(circleRadius, 0, 0), 1f).SetEase(Ease.InOutSine));
            
            Vector3[] path = new Vector3[] {
                end + new Vector3(0, circleRadius, 0),
                end + new Vector3(-circleRadius, 0, 0),
                end + new Vector3(0, -circleRadius, 0),
                end + new Vector3(circleRadius, 0, 0)
            };
            
            seq.Append(handIcon.transform.DOPath(path, circleDuration, PathType.CatmullRom).SetEase(Ease.Linear).SetLoops(2, LoopType.Restart));
        }
        else
        {
            seq.Append(handIcon.transform.DOMove(end, 1f).SetEase(Ease.InOutSine));
        }
        
        seq.OnComplete(ShowHint);
        currentTween = seq;
    }

    private MakeupTarget FindTargetFor(string makeupID, int mapIndex)
    {
        if (mapIndex >= DrawItemManager.Instance.mapConfigs.Count) return null;
        
        var targets = DrawItemManager.Instance.mapConfigs[mapIndex].targetsInMap;
        foreach (var t in targets)
        {
            if (t == null) continue;
            
            // LOG CHI TIẾT TỪNG TARGET ĐỂ DEBUG
            if (t.requiredMakeupID.Trim().ToLower() == makeupID.Trim().ToLower() && !t.isApplied) 
            {
                return t;
            }
        }
        
        // Nếu không tìm thấy, in ra danh sách toàn bộ target để bắt lỗi sai chính tả
        Debug.LogWarning("HandHint: TÌM THẤT BẠI ID [" + makeupID + "]. Đang in ra danh sách thực tế của " + targets.Count + " targets để kiểm tra:");
        for (int i = 0; i < targets.Count; i++)
        {
            if (targets[i] != null)
            {
                Debug.Log("Target " + i + " | Name: " + targets[i].name + " | ID: [" + targets[i].requiredMakeupID + "] | isApplied: " + targets[i].isApplied);
            }
        }
        
        return null;
    }
}
