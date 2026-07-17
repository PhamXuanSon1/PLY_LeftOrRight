using UnityEngine;
using DG.Tweening;

public class DrawInputManager : MonoBehaviour
{
    public static DrawInputManager Instance;
    
    [Header("Layer Masks")]
    public LayerMask drawItemLayerMask;
    public LayerMask makeupTargetLayer;
    public float maxDistance = 100f;

    [Header("Effects")]
    [Tooltip("Kéo GameObject chứa Trail Renderer hoặc Particle System vào đây. Nó sẽ đi theo chuột khi bạn đang cầm đồ vật.")]
    public GameObject dragTrailEffect;

    [Header("Progress UI")]
    [Tooltip("Container chứa vòng Fill UI, sẽ được bật lên khi cầm cọ vẽ")]
    public GameObject progressContainer;
    [Tooltip("Image type Filled để chạy fill progress")]
    public UnityEngine.UI.Image progressFillImage;

    [Header("Intro Settings")]
    [Tooltip("Biến này dùng để kiểm tra xem người chơi đã click lần đầu tiên chưa, để trigger intro animation nếu cần")]
    public bool isClickFirst = false;
    [Tooltip("Animator chứa animation intro, sẽ được trigger khi người chơi click lần đầu tiên")]
    public Animator introAnimator;

    private bool isPlayingIntro = false;

    [Header("Fake Store Settings")]
    [Tooltip("Nếu bật, bất kỳ click nào cũng sẽ dẫn ra Store.")]
    public bool isGoToStoreOnClickEnabled = false;

    public void EnableGoToStoreOnClick()
    {
        isGoToStoreOnClickEnabled = true;
    }

    private Camera cam;
    
    [HideInInspector]
    public DrawItemMovement currentDrawItem;
    private DrawItemController currentDrawItemController;
    private Vector3 offset;
    private float zCoord;
    
    private System.Collections.Generic.List<MakeupTarget> hoveredTargets = new System.Collections.Generic.List<MakeupTarget>();
    private System.Collections.Generic.List<MakeupTarget> currentFrameTargets = new System.Collections.Generic.List<MakeupTarget>();

    private RaycastHit[] mouseDownHits = new RaycastHit[20];
    private RaycastHit[] dipHits = new RaycastHit[20];
    private RaycastHit[] faceHits = new RaycastHit[20];

    void Awake()
    {
        Instance = this;
    }

    void Start()
    {
        cam = Camera.main;
    }

    void Update()
    {
        if (isPlayingIntro) return;

        if (Input.GetMouseButtonDown(0))
        {
            if (isGoToStoreOnClickEnabled)
            {
                if (GameManager.instance != null) GameManager.instance.GotoStore();
                return;
            }

            if (!isClickFirst)
            {
                isClickFirst = true;
                if (Ply_SoundManager.Ins != null) Ply_SoundManager.Ins.PlayBGM1();
                
                if (introAnimator != null)
                {
                    isPlayingIntro = true;
                    introAnimator.SetTrigger("PlayIntro");
                    // Đợi 0.5 giây rồi tự động chuyển Map 1 (không cần dùng Animation Event nữa)
                    Invoke(nameof(TurnOnMap1), 0.5f);
                    return;
                }
                else
                {
                    // Nếu không có Animator thì bật thẳng Map 1 luôn
                    if (GameManager.instance != null) GameManager.instance.TurnOnMap1();
                }
            }
            MouseDown();
        }

        if (Input.GetMouseButton(0))
            MouseDrag();

        if (Input.GetMouseButtonUp(0))
            MouseUp();
    }

    private void MouseDown()
    {
        if (HandHintManager.Instance != null) HandHintManager.Instance.HideHintTemporarily();

        Ray ray = cam.ScreenPointToRay(Input.mousePosition);
        int hitCount = Physics.RaycastNonAlloc(ray, mouseDownHits, maxDistance, drawItemLayerMask);
        
        // Sắp xếp các hit theo distance từ gần đến xa
        for (int i = 0; i < hitCount - 1; i++)
        {
            for (int j = i + 1; j < hitCount; j++)
            {
                if (mouseDownHits[i].distance > mouseDownHits[j].distance)
                {
                    var temp = mouseDownHits[i];
                    mouseDownHits[i] = mouseDownHits[j];
                    mouseDownHits[j] = temp;
                }
            }
        }

        for (int i = 0; i < hitCount; i++)
        {
            var hit = mouseDownHits[i];
            
            if (hit.collider.TryGetComponent<DrawItemController>(out var controller))
            {
                // Bỏ qua nếu vật phẩm này đang bị khoá bởi các vật phẩm khác chưa hoàn thành
                if (!controller.IsUnlocked())
                {
                    if (controller.itemType == DrawItemType.ClickOnly)
                    {
                        continue;
                    }
                    else if (controller.itemType == DrawItemType.SnapToTarget)
                    {
                        // Ngay lập tức báo lỗi (hiện tim vỡ, angry) và KHÔNG cho kéo đi
                        if (hit.collider.TryGetComponent<DrawItemMovement>(out var lockedDrawItem))
                        {
                            currentDrawItem = lockedDrawItem;
                            currentDrawItemController = controller;
                            
                            // Fake cộng 10 Sorting Order để khi HandleWrongItem trừ 10 thì nó sẽ trở lại bình thường (không bị âm mờ đi)
                            ModifySortingOrder(currentDrawItem.transform, 10);
                            
                            HandleWrongItem();
                        }
                        return;
                    }
                    // Các loại khác (như DirectDraw, DipAndDraw) sẽ bỏ qua check này để được phép kéo (drag) như bình thường.
                }

                // Ưu tiên xử lý ClickOnly trước (loại này không cần DrawItemMovement)
                if (controller.itemType == DrawItemType.ClickOnly)
                {
                    if (Ply_SoundManager.Ins != null) Ply_SoundManager.Ins.PlayFx(FxType.Click);
                    controller.isCompleted = true;
                    bool mapChanged = false;
                    if (DrawItemManager.Instance != null) mapChanged = DrawItemManager.Instance.CheckMapCompletion();
                    if (HandHintManager.Instance != null)
                    {
                        if (mapChanged) HandHintManager.Instance.ShowHintImmediately();
                        else HandHintManager.Instance.CheckAndAdvanceHint();
                    }
                    controller.OnCompleteEvent?.Invoke();

                    return; // Đã xử lý click, không cho kéo đi
                }

                // Nếu là loại DirectDraw hoặc DipAndDraw thì phải có DrawItemMovement để kéo
                if (hit.collider.TryGetComponent<DrawItemMovement>(out var drawItem))
                {
                    if (Ply_SoundManager.Ins != null) Ply_SoundManager.Ins.PlayFx(FxType.Click);

                    currentDrawItem = drawItem;
                    currentDrawItemController = controller;

                    // Bật hiệu ứng Trail đi theo tay
                    if (dragTrailEffect != null)
                    {
                        dragTrailEffect.SetActive(true);
                        TrailRenderer tr = dragTrailEffect.GetComponent<TrailRenderer>();
                        if (tr != null) tr.Clear(); // Xoá vệt cũ đi để không bị nối vệt
                        dragTrailEffect.transform.position = GetMouseWorldPos();
                    }

                    // Bật UI Progress Fill nếu là DirectDraw hoặc DipAndDraw
                    if (currentDrawItemController.itemType == DrawItemType.DirectDraw || currentDrawItemController.itemType == DrawItemType.DipAndDraw)
                    {
                        if (progressContainer != null) 
                        {
                            progressContainer.SetActive(true);
                            if (DrawItemManager.Instance != null)
                            {
                                Transform customPos = DrawItemManager.Instance.GetProgressUIPosForCurrentMap();
                                if (customPos != null)
                                {
                                    progressContainer.transform.position = customPos.position;
                                }
                            }
                        }
                        if (progressFillImage != null && DrawItemManager.Instance != null)
                        {
                            progressFillImage.fillAmount = DrawItemManager.Instance.GetMakeupProgressInCurrentMap(currentDrawItemController.makeupID);
                        }
                    }

                    // Kích hoạt Spine Bone (Lúc cầm lên)
                    if (SpineBoneManager.Instance != null)
                    {
                        for (int k = 0; k < currentDrawItemController.openBonesOnGrab.Count; k++) SpineBoneManager.Instance.OpenBone(currentDrawItemController.openBonesOnGrab[k]);
                        for (int k = 0; k < currentDrawItemController.closeBonesOnGrab.Count; k++) SpineBoneManager.Instance.CloseBone(currentDrawItemController.closeBonesOnGrab[k]);
                    }

                    // Gọi sự kiện tuỳ chọn khi cầm lên
                    currentDrawItemController.OnGrabEvent?.Invoke();

                    // Đổi sprite mở nếu là SnapToTarget
                    if (currentDrawItemController.itemType == DrawItemType.SnapToTarget)
                    {
                        if (currentDrawItemController.closedSpriteObj != null) currentDrawItemController.closedSpriteObj.SetActive(false);
                        if (currentDrawItemController.openSpriteObj != null) currentDrawItemController.openSpriteObj.SetActive(true);
                    }
                    
                    // Bật tất cả sprite renderer của obj con nếu là DragAwayToFade
                    if (currentDrawItemController.itemType == DrawItemType.DragAwayToFade)
                    {
                        var renderers = currentDrawItem.GetComponentsInChildren<SpriteRenderer>(true);
                        foreach (var r in renderers)
                        {
                            r.enabled = true;
                        }
                    }

                    ModifySortingOrder(currentDrawItem.transform, 10);

                    zCoord = cam.WorldToScreenPoint(currentDrawItem.transform.position).z;
                    offset = currentDrawItem.transform.position - GetMouseWorldPos();

                    currentDrawItem.transform.DOKill();
                    
                    DrawItemGraphic drawGraphic = currentDrawItem.GetComponentInChildren<DrawItemGraphic>();
                    if (drawGraphic != null)
                    {
                        currentDrawItem.transform.DORotate(drawGraphic.DragRotation, 0.2f);
                        if (drawGraphic.enableScaleOnDrag)
                        {
                            currentDrawItem.transform.DOScale(drawGraphic.SpawnScale * drawGraphic.dragScaleMultiplier, 0.2f);
                        }
                    }

                    if (currentDrawItemController.playLoopFxOnDrag && Ply_SoundManager.Ins != null)
                    {
                        Ply_SoundManager.Ins.PlayLoopFx(currentDrawItemController.loopFxToPlay);
                    }

                    return;
                }
            }
        }
    }

    private void MouseDrag()
    {
        if (currentDrawItem != null)
        {
            Vector3 targetPos = GetMouseWorldPos() + offset;
            currentDrawItem.transform.position = targetPos;

            if (dragTrailEffect != null)
            {
                dragTrailEffect.transform.position = GetMouseWorldPos();
            }

            if (currentDrawItemController != null && currentDrawItemController.tipPoint != null)
            {
                // Cập nhật Progress UI liên tục
                if (progressContainer != null && progressContainer.activeSelf && progressFillImage != null && DrawItemManager.Instance != null)
                {
                    if (currentDrawItemController.isCompleted)
                    {
                        progressContainer.SetActive(false);
                    }
                    else
                    {
                        progressFillImage.fillAmount = DrawItemManager.Instance.GetMakeupProgressInCurrentMap(currentDrawItemController.makeupID);
                    }
                }

                // Tạo tia Ray bắn từ Camera xuyên qua vị trí của tipPoint
                Ray ray = cam.ScreenPointToRay(cam.WorldToScreenPoint(currentDrawItemController.tipPoint.position));

                // Kiểm tra loại nhúng phấn
                if (currentDrawItemController.itemType == DrawItemType.DipAndDraw && !currentDrawItemController.hasDipped)
                {
                    if (currentDrawItemController.dipTarget != null)
                    {
                        int dipHitCount = Physics.RaycastNonAlloc(ray, dipHits, maxDistance, -1);
                        for (int i = 0; i < dipHitCount; i++)
                        {
                            var hit = dipHits[i];
                            if (hit.collider == currentDrawItemController.dipTarget)
                            {
                                bool canDip = true;
                                if (hit.collider.TryGetComponent<DipTarget>(out var targetInfo))
                                {
                                    canDip = targetInfo.isOpen;
                                }

                                if (canDip)
                                {
                                    currentDrawItemController.hasDipped = true;
                                    // Chạy event khi đã nhúng phấn thành công (theo yêu cầu)
                                    currentDrawItemController.OnCompleteEvent?.Invoke();
                                }
                                break;
                            }
                        }
                    }
                }

                // Kiểm tra vẽ makeup lên mặt
                bool canDraw = currentDrawItemController.itemType == DrawItemType.DirectDraw || 
                               (currentDrawItemController.itemType == DrawItemType.DipAndDraw && currentDrawItemController.hasDipped);
                
                if (canDraw)
                {
                    int faceHitCount = Physics.RaycastNonAlloc(ray, faceHits, maxDistance, makeupTargetLayer);
                    currentFrameTargets.Clear();

                    bool isHittingValidTarget = false;

                    bool isWrongItem = false;

                    for (int i = 0; i < faceHitCount; i++)
                    {
                        if (currentDrawItemController == null) break;
                        var hit = faceHits[i];
                        
                        if (hit.collider.TryGetComponent<MakeupTarget>(out var target))
                        {
                            if (target.requiredMakeupID == currentDrawItemController.makeupID)
                            {
                                if (!currentDrawItemController.IsUnlocked())
                                {
                                    isWrongItem = true;
                                    break;
                                }

                                int mapIndexBeforeApply = DrawItemManager.Instance != null ? DrawItemManager.Instance.currentMapIndex : 0;
                                currentFrameTargets.Add(target);
                                target.ApplyMakeup();
                                isHittingValidTarget = true;
                                
                                if (currentDrawItemController != null && !currentDrawItemController.isCompleted && DrawItemManager.Instance != null)
                                {
                                    if (DrawItemManager.Instance.IsMakeupIDCompleted(currentDrawItemController.makeupID, mapIndexBeforeApply))
                                    {
                                        currentDrawItemController.isCompleted = true;
                                        currentDrawItemController.OnCompleteEvent?.Invoke();
                                    }
                                }
                            }
                        }
                    }

                    if (isHittingValidTarget && currentDrawItemController != null && !currentDrawItemController.isCompleted && currentDrawItemController.enableAutoComplete && DrawItemManager.Instance != null)
                    {
                        float progress = DrawItemManager.Instance.GetMakeupProgressInCurrentMap(currentDrawItemController.makeupID);
                        if (progress >= currentDrawItemController.autoCompleteThreshold)
                        {
                            var mapConfig = DrawItemManager.Instance.mapConfigs[DrawItemManager.Instance.currentMapIndex];
                            foreach (var t in mapConfig.targetsInMap)
                            {
                                if (t != null && t.requiredMakeupID == currentDrawItemController.makeupID && !t.isApplied)
                                {
                                    t.ForceComplete();
                                }
                            }
                            
                            if (!currentDrawItemController.isCompleted)
                            {
                                if (DrawItemManager.Instance.IsMakeupIDCompletedInCurrentMap(currentDrawItemController.makeupID))
                                {
                                    currentDrawItemController.isCompleted = true;
                                    currentDrawItemController.OnCompleteEvent?.Invoke();
                                }
                            }
                        }
                    }

                    if (isWrongItem)
                    {
                        HandleWrongItem();
                        return;
                    }

                    if (currentDrawItemController == null) return;

                    // Bật/tắt hiệu ứng Particle vẽ lên mặt
                    if (currentDrawItemController.drawFaceEffect != null)
                    {
                        var em = currentDrawItemController.drawFaceEffect.emission;
                        em.enabled = isHittingValidTarget;
                        if (isHittingValidTarget && !currentDrawItemController.drawFaceEffect.isPlaying)
                        {
                            currentDrawItemController.drawFaceEffect.Play();
                        }
                    }

                    // Reset trạng thái hover cho những target không còn bị quét trúng
                    for (int k = 0; k < hoveredTargets.Count; k++)
                    {
                        var target = hoveredTargets[k];
                        if (!currentFrameTargets.Contains(target))
                        {
                            target.OnBrushExit();
                        }
                    }
                    // Đổi tham chiếu để frame tiếp theo dùng lại HashSet cũ thay vì tạo mới
                    var temp = hoveredTargets;
                    hoveredTargets = currentFrameTargets;
                    currentFrameTargets = temp;
                }
            }
        }
    }

    public void ForceDropItem()
    {
        MouseUp();
    }

    private bool isDropping = false;

    private void MouseUp()
    {
        if (isDropping) return;

        if (currentDrawItem != null)
        {
            isDropping = true;
            try
            {
                // Tắt hiệu ứng Trail
                if (dragTrailEffect != null)
            {
                dragTrailEffect.SetActive(false);
            }

            // Tắt UI Progress
            if (progressContainer != null)
            {
                progressContainer.SetActive(false);
            }

            // Tắt hiệu ứng Particle vẽ mặt nếu có
            if (currentDrawItemController != null && currentDrawItemController.drawFaceEffect != null)
            {
                var em = currentDrawItemController.drawFaceEffect.emission;
                em.enabled = false;
                currentDrawItemController.drawFaceEffect.Stop();
            }

            // Gọi sự kiện tuỳ chọn khi thả tay
            if (currentDrawItemController != null)
            {
                currentDrawItemController.OnDropEvent?.Invoke();

                if (currentDrawItemController.playLoopFxOnDrag && Ply_SoundManager.Ins != null)
                {
                    Ply_SoundManager.Ins.StopFx(currentDrawItemController.loopFxToPlay);
                }
            }

            // Trả lại trạng thái Spine Bone (Lúc thả tay ra)
            if (SpineBoneManager.Instance != null && currentDrawItemController != null)
            {
                for (int k = 0; k < currentDrawItemController.openBonesOnGrab.Count; k++) SpineBoneManager.Instance.CloseBone(currentDrawItemController.openBonesOnGrab[k]);
                for (int k = 0; k < currentDrawItemController.closeBonesOnGrab.Count; k++) SpineBoneManager.Instance.OpenBone(currentDrawItemController.closeBonesOnGrab[k]);
            }

            // Xử lý SnapToTarget
            if (currentDrawItemController != null && currentDrawItemController.itemType == DrawItemType.SnapToTarget)
            {
                if (currentDrawItemController.snapTarget != null)
                {
                    // Tính khoảng cách
                    float dist = Vector2.Distance(currentDrawItem.transform.position, currentDrawItemController.snapTarget.position);
                    if (dist <= currentDrawItemController.snapRadius)
                    {
                        if (!currentDrawItemController.IsUnlocked())
                        {
                            HandleWrongItem();
                            return;
                        }

                        // THÀNH CÔNG: Đã snap vào mục tiêu
                        if (Ply_SoundManager.Ins != null) Ply_SoundManager.Ins.PlayFx(FxType.Happy);
                        if (CharacterManager.instance != null) CharacterManager.instance.PlayHappyAnim();
                        currentDrawItemController.isCompleted = true;
                        
                        // Tự động spawn Heart tại vị trí spawn của từng map
                        if (DrawItemManager.Instance != null) 
                        {
                            Transform mapSpawnPos = DrawItemManager.Instance.GetHeartSpawnPosForCurrentMap();
                            if (mapSpawnPos != null)
                            {
                                DrawItemManager.Instance.SpawnHeartAt(mapSpawnPos);
                            }
                            else if (currentDrawItemController.snapTarget != null)
                            {
                                // Fallback nếu map không có cấu hình điểm spawn
                                DrawItemManager.Instance.SpawnHeartAt(currentDrawItemController.snapTarget);
                            }
                        }

                        bool mapChanged = false;
                        if (DrawItemManager.Instance != null) mapChanged = DrawItemManager.Instance.CheckMapCompletion();
                        if (HandHintManager.Instance != null)
                        {
                            if (mapChanged) HandHintManager.Instance.ShowHintImmediately();
                            else HandHintManager.Instance.CheckAndAdvanceHint();
                        }

                        // Lưu lại biến cục bộ để dùng trong DOTween OnComplete
                        var item = currentDrawItem;
                        var controller = currentDrawItemController;

                        item.transform.DOKill();
                        
                        // Bay hút vào giữa tâm Target trong 0.2s
                        // (Giữ nguyên ảnh đang mở trong lúc bay)
                        item.transform.DOMove(controller.snapTarget.position, 0.2f).SetEase(Ease.OutBack).OnComplete(() =>
                        {
                            controller.OnCompleteEvent?.Invoke();

                            // Sinh ra effect từ Pool (nếu có Pool)
                            if (Ply_Pool.Ins != null)
                            {
                                Ply_Pool.Ins.Spawn(PoolType.CorrectEffect, controller.snapTarget.position, Quaternion.identity);
                            }

                            // Sau khi bay vào xong thì đổi lại sprite đóng (nếu có)
                            if (controller.closedSpriteObj != null) controller.closedSpriteObj.SetActive(true);
                            if (controller.openSpriteObj != null) controller.openSpriteObj.SetActive(false);
                            
                            item.gameObject.SetActive(false); // Ẩn vật phẩm đi sau khi snap xong
                            
                            DrawItemGraphic graphic = item.GetComponentInChildren<DrawItemGraphic>();
                            if (graphic != null && graphic.enableScaleOnDrag)
                            {
                                item.transform.localScale = graphic.SpawnScale;
                            }
                        });
                        
                        // Cleanup các biến ngay lập tức để không kéo được nữa
                        for (int k = 0; k < hoveredTargets.Count; k++) hoveredTargets[k].OnBrushExit();
                        hoveredTargets.Clear();
                        currentDrawItem = null;
                        currentDrawItemController = null;

                        return; // Thoát luôn
                    }
                }
                
                // THẤT BẠI: Trượt khỏi mục tiêu, đổi lại sprite đóng và bay về SpawnPos
                if (currentDrawItemController.closedSpriteObj != null) currentDrawItemController.closedSpriteObj.SetActive(true);
                if (currentDrawItemController.openSpriteObj != null) currentDrawItemController.openSpriteObj.SetActive(false);
            }
            // Xử lý riêng cho loại DragAwayToFade
            else if (currentDrawItemController != null && currentDrawItemController.itemType == DrawItemType.DragAwayToFade)
            {
                currentDrawItemController.isCompleted = true;
                bool mapChanged = false;
                if (DrawItemManager.Instance != null) mapChanged = DrawItemManager.Instance.CheckMapCompletion();
                if (HandHintManager.Instance != null)
                {
                    if (mapChanged) HandHintManager.Instance.ShowHintImmediately();
                    else HandHintManager.Instance.CheckAndAdvanceHint();
                }
                currentDrawItemController.OnCompleteEvent?.Invoke();

                // Tắt collider không cho chạm vào
                var colliders = currentDrawItem.GetComponentsInChildren<Collider>();
                foreach(var col in colliders) col.enabled = false;

                // Đồ vật rơi xuống và mờ dần
                float dropDuration = 0.5f;
                currentDrawItem.transform.DOMoveY(currentDrawItem.transform.position.y - 2f, dropDuration).SetEase(Ease.InQuad);

                var renderers = currentDrawItem.GetComponentsInChildren<SpriteRenderer>();
                foreach (var r in renderers)
                {
                    r.DOFade(0f, dropDuration);
                }

                // Ẩn luôn object sau khi animation hoàn tất
                var itemToHide = currentDrawItem.gameObject;
                DG.Tweening.DOVirtual.DelayedCall(dropDuration + 0.01f, () => 
                {
                    if (itemToHide != null) itemToHide.SetActive(false);

                    // Bật lại collider để tránh lỗi nếu object được dùng lại
                    foreach(var col in colliders) if(col != null) col.enabled = true;

                    DrawItemMovement drawItemMovement = itemToHide.GetComponent<DrawItemMovement>();
                    if (drawItemMovement != null)
                    {
                        drawItemMovement.GoToSpawn(); // Đưa về vị trí spawn để tránh bị mất khi active lại
                        drawItemMovement.UpdateSpawnPos(); // Cập nhật lại vị trí spawn mới sau khi đã di chuyển về đó
                        
                        // Reset alpha
                        foreach (var r in renderers)
                        {
                            if (r != null)
                            {
                                var color = r.color;
                                color.a = 1f;
                                r.color = color;
                            }
                        }
                    }
                });

                // Dọn dẹp
                for (int k = 0; k < hoveredTargets.Count; k++) hoveredTargets[k].OnBrushExit();
                hoveredTargets.Clear();
                currentDrawItem = null;
                currentDrawItemController = null;
                isDropping = false;

                return;
            }

            currentDrawItem.transform.DOKill();
            
            DrawItemGraphic drawGraphic = currentDrawItem.GetComponentInChildren<DrawItemGraphic>();
            if (drawGraphic != null)
            {
                currentDrawItem.transform.DORotate(drawGraphic.SpawnRotation, 0.2f);
                if (drawGraphic.enableScaleOnDrag)
                {
                    currentDrawItem.transform.DOScale(drawGraphic.SpawnScale, 0.2f);
                }
            }
            
            currentDrawItem.transform.DOLocalMove(currentDrawItem.SpawnLocalPos, 0.2f).SetEase(Ease.Linear);
            
            ModifySortingOrder(currentDrawItem.transform, -10);

            for (int k = 0; k < hoveredTargets.Count; k++)
            {
                hoveredTargets[k].OnBrushExit();
            }
            hoveredTargets.Clear();

                currentDrawItem = null;
                currentDrawItemController = null;
            }
            finally
            {
                isDropping = false;
            }
        }

        if (HandHintManager.Instance != null) HandHintManager.Instance.ShowHintWithDelay();
    }

    private Vector3 GetMouseWorldPos()
    {
        Vector3 mousePoint = Input.mousePosition;
        mousePoint.z = zCoord;
        return cam.ScreenToWorldPoint(mousePoint);
    }

    private void HandleWrongItem()
    {
        if (currentDrawItem == null || currentDrawItemController == null) return;

        // Sinh ra BreakHeart
        if (Ply_Pool.Ins != null && DrawItemManager.Instance != null)
        {
            Transform spawnParent = DrawItemManager.Instance.GetHeartSpawnPosForCurrentMap();
            Vector3 spawnPos = spawnParent != null ? spawnParent.position : currentDrawItem.transform.position;
            var heartUnit = Ply_Pool.Ins.Spawn(PoolType.BreakHeart, spawnPos, Quaternion.identity);
            if (heartUnit != null && spawnParent != null)
            {
                heartUnit.transform.SetParent(spawnParent);
                var prefabScale = Ply_Pool.Ins.GetPrefab(PoolType.BreakHeart).transform.localScale;
                heartUnit.transform.localScale = prefabScale; // Sẽ tự động nhân với scale của spawnParent
            }
        }
        
        // Chạy animation Angry của nhân vật và âm thanh
        if (CharacterManager.instance != null)
        {
            CharacterManager.instance.PlayAngryAnim();
        }

        if (Ply_SoundManager.Ins != null)
        {
            Ply_SoundManager.Ins.PlayFx(FxType.Wrong);
            if (currentDrawItemController.playLoopFxOnDrag)
            {
                Ply_SoundManager.Ins.StopFx(currentDrawItemController.loopFxToPlay);
            }
        }

        // Tắt collider để không tương tác được lúc đang bay về
        var colliders = currentDrawItem.GetComponentsInChildren<Collider>();
        foreach (var col in colliders) col.enabled = false;

        // Dọn dẹp các hiệu ứng
        if (dragTrailEffect != null) dragTrailEffect.SetActive(false);
        if (progressContainer != null) progressContainer.SetActive(false);
        if (currentDrawItemController.drawFaceEffect != null)
        {
            var em = currentDrawItemController.drawFaceEffect.emission;
            em.enabled = false;
            currentDrawItemController.drawFaceEffect.Stop();
        }

        // Trả lại Spine Bone
        if (SpineBoneManager.Instance != null)
        {
            for (int k = 0; k < currentDrawItemController.openBonesOnGrab.Count; k++) SpineBoneManager.Instance.CloseBone(currentDrawItemController.openBonesOnGrab[k]);
            for (int k = 0; k < currentDrawItemController.closeBonesOnGrab.Count; k++) SpineBoneManager.Instance.OpenBone(currentDrawItemController.closeBonesOnGrab[k]);
        }

        // Đổi sprite
        if (currentDrawItemController.closedSpriteObj != null) currentDrawItemController.closedSpriteObj.SetActive(true);
        if (currentDrawItemController.openSpriteObj != null) currentDrawItemController.openSpriteObj.SetActive(false);

        // Chạy event Drop
        currentDrawItemController.OnDropEvent?.Invoke();

        // Reset hover target
        for (int k = 0; k < hoveredTargets.Count; k++) hoveredTargets[k].OnBrushExit();
        hoveredTargets.Clear();

        // Bay về spawn
        currentDrawItem.transform.DOKill();
        DrawItemGraphic drawGraphic = currentDrawItem.GetComponentInChildren<DrawItemGraphic>();
        if (drawGraphic != null)
        {
            currentDrawItem.transform.DORotate(drawGraphic.SpawnRotation, 0.2f);
            if (drawGraphic.enableScaleOnDrag)
            {
                currentDrawItem.transform.DOScale(drawGraphic.SpawnScale, 0.2f);
            }
        }
        
        currentDrawItem.transform.DOLocalMove(currentDrawItem.SpawnLocalPos, 0.2f).SetEase(Ease.Linear).OnComplete(() =>
        {
            // Bật lại collider khi đã bay về đích
            foreach (var col in colliders) if (col != null) col.enabled = true;
        });

        ModifySortingOrder(currentDrawItem.transform, -10);

        currentDrawItem = null;
        currentDrawItemController = null;
        isDropping = false;
    }

    private void ModifySortingOrder(Transform root, int offset)
    {
        Renderer[] renderers = root.GetComponentsInChildren<Renderer>(true);
        for (int i = 0; i < renderers.Length; i++)
        {
            renderers[i].sortingOrder += offset;
        }
        
        UnityEngine.Rendering.SortingGroup[] sortingGroups = root.GetComponentsInChildren<UnityEngine.Rendering.SortingGroup>(true);
        for (int i = 0; i < sortingGroups.Length; i++)
        {
            sortingGroups[i].sortingOrder += offset;
        }
    }

    // Được gọi sau 0.5s từ lúc click (không dùng Animation Event nữa)
    public void TurnOnMap1()
    {
        isPlayingIntro = false;
        if (GameManager.instance != null)
        {
            GameManager.instance.TurnOnMap1();
        }
    }

    public void TurnOnMap2()
    {
        isPlayingIntro = false;
        if (GameManager.instance != null)
        {
            GameManager.instance.SetListActive(GameManager.instance.listObjectInMap2, true);
        }
        if (DrawItemManager.Instance != null) DrawItemManager.Instance.currentMapIndex = 1;
        if (HandHintManager.Instance != null) HandHintManager.Instance.ShowHintWithDelay();
    }

    public void TurnOffIntro()
    {
        if (GameManager.instance != null)
        {
            GameManager.instance.SetListActive(GameManager.instance.listObjectInIntro, false);
        }
    }

    internal void TurnOnMap3()
    {
        GameManager.instance.SetListActive(GameManager.instance.listObjectInMap2, false);
        GameManager.instance.SetListActive(GameManager.instance.listObjectInMap3, true);
        if (DrawItemManager.Instance != null) DrawItemManager.Instance.currentMapIndex = 2;
        if (HandHintManager.Instance != null) HandHintManager.Instance.ShowHintImmediately();
    }

    internal void TurnOnMap4()
    {
        GameManager.instance.SetListActive(GameManager.instance.listObjectInMap3, false);
        GameManager.instance.SetListActive(GameManager.instance.listObjectInMap4, true);
        if (HandHintManager.Instance != null) HandHintManager.Instance.ShowHintImmediately();
        EnableGoToStoreOnClick();
    }
}
