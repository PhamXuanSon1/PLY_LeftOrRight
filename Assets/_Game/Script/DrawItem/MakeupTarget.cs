using UnityEngine;
using System.Collections.Generic;

[System.Serializable]
public class MakeupSlotConfig
{
    public string slotName;
    public string attachmentName;
}

public class MakeupTarget : MonoBehaviour
{
    public Character targetCharacter; 
    
#if UNITY_EDITOR
    [Sirenix.OdinInspector.ValueDropdown("@DrawItemManager.GetAvailableMakeupIDs()")]
#endif
    public string requiredMakeupID;   
    
    [Header("Turn On Settings")]
    public string slotName;           
    public string attachmentName;     
    
    public List<MakeupSlotConfig> multipleTurnOnSlots = new List<MakeupSlotConfig>();
    
    [Header("Turn Off Settings (Optional)")]
    [Tooltip("Nhập tên Slot mà bạn muốn tắt đi khi vẽ cái mới lên. Để trống nếu không cần.")]
    public string slotNameToTurnOff;
    
    public List<string> multipleTurnOffSlots = new List<string>();
    
    [Tooltip("Bật cái này nếu CHỈ muốn tắt slot khi đã vẽ xong 100% (không làm mờ dần trong lúc vẽ).")]
    public bool turnOffOnlyWhenDone = false;

    [Header("Status")]
#if UNITY_EDITOR
    [Sirenix.OdinInspector.ShowInInspector, Sirenix.OdinInspector.ReadOnly]
#endif
    [Tooltip("Check xem vị trí này đã hoàn thành makeup chưa")]
    public bool isApplied = false;    

    [Header("Draw Settings")]
    [Tooltip("Bật tuỳ chọn này nếu bạn muốn tiến độ tăng liên tục khi di chuột đè lên (không cần nhấc ra).")]
    public bool continuousMode = false;
    
#if UNITY_EDITOR
    [Sirenix.OdinInspector.HideIf("continuousMode")]
#endif
    [Tooltip("Số lần quẹt (vào rồi ra) để hiển thị đầy đủ 100% alpha")]
    public int requiredDrawTimes = 1;
    
#if UNITY_EDITOR
    [Sirenix.OdinInspector.ShowIf("continuousMode")]
#endif
    [Tooltip("Thời gian chà xát để hiển thị 100% (tính bằng giây). Dành riêng cho Continuous Mode.")]
    public float continuousRequiredSeconds = 1f;
    
    public float CurrentDrawTimes => currentDrawTimes;
    private float currentDrawTimes = 0f;
    private bool isBeingHovered = false;
    private Vector3 lastMousePos;
    
    // Caches to prevent heavy string-based search every frame
    private Spine.Slot cachedSlot;
    private Spine.Slot cachedSlotOff;
    private List<Spine.Slot> cachedMultipleSlotsOn = new List<Spine.Slot>();
    private List<Spine.Slot> cachedMultipleSlotsOff = new List<Spine.Slot>();
    private bool isAttachmentTurnedOn = false;
    private bool isAttachmentTurnedOff = false;

    private void Start()
    {
        if (targetCharacter != null && targetCharacter.SkeletonAnimation != null && targetCharacter.SkeletonAnimation.Skeleton != null)
        {
            var skeleton = targetCharacter.SkeletonAnimation.Skeleton;
            
            // Lấy sẵn tham chiếu vào RAM để dùng cho tối ưu
            if (!string.IsNullOrEmpty(slotName))
            {
                cachedSlot = skeleton.FindSlot(slotName);
            }
            if (!string.IsNullOrEmpty(slotNameToTurnOff))
            {
                cachedSlotOff = skeleton.FindSlot(slotNameToTurnOff);
            }
            if (multipleTurnOnSlots != null)
            {
                foreach (var config in multipleTurnOnSlots)
                {
                    if (!string.IsNullOrEmpty(config.slotName))
                    {
                        var slot = skeleton.FindSlot(config.slotName);
                        if (slot != null) cachedMultipleSlotsOn.Add(slot);
                    }
                }
            }
            if (multipleTurnOffSlots != null)
            {
                foreach (var slotNameOff in multipleTurnOffSlots)
                {
                    if (!string.IsNullOrEmpty(slotNameOff))
                    {
                        var slot = skeleton.FindSlot(slotNameOff);
                        if (slot != null) cachedMultipleSlotsOff.Add(slot);
                    }
                }
            }

#if UNITY_EDITOR
            // Check Turn On Settings
            if (!string.IsNullOrEmpty(slotName))
            {
                var slot = cachedSlot;
                if (slot == null)
                {
                    Debug.LogError($"[MakeupTarget] '{gameObject.name}' - LỖI: Không tìm thấy Slot '{slotName}' trong Spine!");
                }
                else if (!string.IsNullOrEmpty(attachmentName))
                {
                    var attachment = skeleton.GetAttachment(slot.Data.Index, attachmentName);
                    if (attachment == null)
                    {
                        Debug.LogError($"[MakeupTarget] '{gameObject.name}' - LỖI: Không tìm thấy Attachment '{attachmentName}' trong Slot '{slotName}'!");
                    }
                }
            }

            // Check Turn Off Settings
            if (!string.IsNullOrEmpty(slotNameToTurnOff))
            {
                var slotOff = cachedSlotOff;
                if (slotOff == null)
                {
                    Debug.LogError($"[MakeupTarget] '{gameObject.name}' - LỖI: Không tìm thấy Slot cần tắt '{slotNameToTurnOff}' trong Spine!");
                }
            }
#endif
        }
    }

    public void ApplyMakeup()
    {
        if (isApplied || targetCharacter == null) return;

        if (continuousMode)
        {
            // Tính khoảng cách di chuyển của chuột so với frame trước
            float mouseDelta = (Input.mousePosition - lastMousePos).sqrMagnitude;
            lastMousePos = Input.mousePosition;

            // Nếu chuột gần như đứng im thì không tính tiến độ
            if (mouseDelta < 0.1f) return;
        }

        bool canProgress = continuousMode || !isBeingHovered;

        if (canProgress)
        {
            isBeingHovered = true;
            
            if (continuousMode)
            {
                currentDrawTimes += Time.deltaTime;
            }
            else
            {
                currentDrawTimes += 1f;
            }

            float targetMaxDraws = continuousMode ? continuousRequiredSeconds : (float)requiredDrawTimes;
            float targetAlpha = targetMaxDraws > 0 ? Mathf.Clamp01(currentDrawTimes / targetMaxDraws) : 1f;

            if (!string.IsNullOrEmpty(slotName) || (multipleTurnOnSlots != null && multipleTurnOnSlots.Count > 0))
            {
                // Gọi 1 lần duy nhất để tránh lag khi quét cọ
                if (!isAttachmentTurnedOn)
                {
                    if (!string.IsNullOrEmpty(slotName))
                        targetCharacter.TurnSlotAttachment(slotName, attachmentName);
                        
                    if (multipleTurnOnSlots != null)
                    {
                        foreach (var config in multipleTurnOnSlots)
                        {
                            if (!string.IsNullOrEmpty(config.slotName))
                                targetCharacter.TurnSlotAttachment(config.slotName, config.attachmentName);
                        }
                    }
                    isAttachmentTurnedOn = true;
                }
                
                // Từ từ tăng Alpha siêu mượt qua RAM thay vì quét chuỗi
                if (cachedSlot != null)
                {
                    cachedSlot.A = targetAlpha;
                }
                foreach (var slot in cachedMultipleSlotsOn)
                {
                    if (slot != null) slot.A = targetAlpha;
                }
            }

            // Xử lý cái cần tắt (nếu có nhập tên slot cần tắt)
            if (!string.IsNullOrEmpty(slotNameToTurnOff) || (multipleTurnOffSlots != null && multipleTurnOffSlots.Count > 0))
            {
                if (!turnOffOnlyWhenDone)
                {
                    // Từ từ giảm Alpha của cái đang bị xóa đi (ví dụ: vết bẩn mờ dần)
                    if (cachedSlotOff != null)
                    {
                        cachedSlotOff.A = 1f - targetAlpha;
                    }
                    foreach (var slotOff in cachedMultipleSlotsOff)
                    {
                        if (slotOff != null) slotOff.A = 1f - targetAlpha;
                    }
                }

                // Nếu đã quẹt xong thì tắt hẳn nó đi luôn cho nhẹ (chỉ gọi 1 lần)
                if (currentDrawTimes >= targetMaxDraws && !isAttachmentTurnedOff)
                {
                    if (!string.IsNullOrEmpty(slotNameToTurnOff))
                        targetCharacter.TurnSlotAttachment(slotNameToTurnOff, null);
                        
                    if (multipleTurnOffSlots != null)
                    {
                        foreach (var slotNameOff in multipleTurnOffSlots)
                        {
                            if (!string.IsNullOrEmpty(slotNameOff))
                                targetCharacter.TurnSlotAttachment(slotNameOff, null);
                        }
                    }
                    isAttachmentTurnedOff = true;
                }
            }
            
            // Nếu đã quẹt đủ số lần yêu cầu thì đánh dấu là đã hoàn thành makeup
            if (currentDrawTimes >= targetMaxDraws)
            {
                if (!isApplied)
                {
                    isApplied = true;
                    if (DrawItemManager.Instance != null)
                    {
                        if (DrawItemManager.Instance.IsMakeupIDCompletedInCurrentMap(requiredMakeupID))
                        {
                            if (Ply_SoundManager.Ins != null) Ply_SoundManager.Ins.PlayFx(FxType.Happy);
                            if (CharacterManager.instance != null) CharacterManager.instance.PlayHappyAnim();
                            
                            if (Ply_Pool.Ins != null)
                            {
                                Transform spawnParent = DrawItemManager.Instance.GetHeartSpawnPosForCurrentMap();
                                Vector3 spawnPos = spawnParent != null ? spawnParent.position : transform.position;
                                
                                var heartUnit = Ply_Pool.Ins.Spawn(PoolType.Heart, spawnPos, Quaternion.identity);
                                if (heartUnit != null && spawnParent != null)
                                {
                                    // heartUnit.transform.SetParent(spawnParent);
                                    // heartUnit.transform.localPosition = Vector3.zero;
                                    var prefabScale = Ply_Pool.Ins.GetPrefab(PoolType.Heart).transform.localScale;
                                    heartUnit.transform.localScale = prefabScale;
                                }
                            }
                        }
                        DrawItemManager.Instance.CheckMapCompletion();
                    }
                    if (HandHintManager.Instance != null)
                    {
                        HandHintManager.Instance.CheckAndAdvanceHint();
                    }
                }
            }
        }
    }

    public void ForceComplete()
    {
        if (isApplied || targetCharacter == null) return;
        
        float targetMaxDraws = continuousMode ? continuousRequiredSeconds : requiredDrawTimes;
        
        while (!isApplied && currentDrawTimes < targetMaxDraws)
        {
            isBeingHovered = false; 
            ApplyMakeup();
        }
    }

    public void OnBrushExit()
    {
        isBeingHovered = false;
    }
}
