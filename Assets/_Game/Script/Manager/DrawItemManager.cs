using System.Collections.Generic;
using UnityEngine;

public class DrawItemManager : MonoBehaviour
{
    public static DrawItemManager Instance;

    [Header("Cài Đặt Danh Sách Makeup ID")]
    [Tooltip("Nhập danh sách tất cả các ID makeup bạn muốn sử dụng vào đây (ví dụ: son_moi, danh_nen, ke_mat). Các ID này sẽ tự động hiện thành Menu thả xuống ở DrawItemController và MakeupTarget.")]
    public List<string> availableMakeupIDs = new List<string>();

    [Header("Spine Character")]
    public Spine.Unity.SkeletonAnimation characterSkeleton;

    public void PlayHappyAnim()
    {
        if (characterSkeleton == null || characterSkeleton.Skeleton == null) return;

        var skeleton = characterSkeleton.Skeleton;
        
        skeleton.SetAttachment("Set_P1_DryMouth", "Base/smile");
        skeleton.SetAttachment("Set_P1_Mouth", "Base/mouth smile");
        skeleton.SetAttachment("Set_P1_DVAMouth", "Set_DVA/DVA_smile");
    }

    [System.Serializable]
    public class MapMakeupConfig
    {
        [Tooltip("Tên của màn (Chỉ dùng để dễ nhìn trong Inspector)")]
        public string mapName = "New Map";

        [Tooltip("Kéo các điểm tô phấn (Makeup Target) vào đây")]
        public List<MakeupTarget> targetsInMap = new List<MakeupTarget>();
        
        [Tooltip("Kéo trực tiếp các Đồ vật (Draw Item Controller) không dùng Makeup Target (VD: SnapToTarget, ClickOnly) vào đây")]
        public List<DrawItemController> itemsInMap = new List<DrawItemController>();
        
        [Tooltip("Vị trí (Transform) để làm cha của hiệu ứng Heart khi hoàn thành nét vẽ")]
        public Transform heartSpawnPos;
        
        [Tooltip("Vị trí hiển thị vòng Progress Fill cho Map này (Tuỳ chọn).")]
        public Transform progressUIPos;

        public UnityEngine.Events.UnityEvent OnMapCompleted;
    }

    [Header("Cấu Hình Chuyển Map")]
    [Tooltip("Kéo các Makeup Target của từng map vào đây. Khi TẤT CẢ target trong 1 map được makeup xong (isApplied = true), nó sẽ tự động chạy Event chuyển sang map tiếp theo.")]
    public List<MapMakeupConfig> mapConfigs = new List<MapMakeupConfig>();

    [Header("Trạng Thái Hiện Tại (Chỉ Xem)")]
    [Sirenix.OdinInspector.ReadOnly]
    [Sirenix.OdinInspector.ShowInInspector]
    public string currentMapStatus = "Đang ở Map 1";

    [Sirenix.OdinInspector.ReadOnly]
    [Sirenix.OdinInspector.ShowInInspector]
    public int currentMapIndex = 0;

    void Awake()
    {
        Instance = this;
        UpdateMapStatusDisplay();
    }

    public bool CheckMapCompletion()
    {
        // Nếu đã hoàn thành hết tất cả map rồi thì thôi, không cần check nữa
        if (currentMapIndex >= mapConfigs.Count) return false;

        // Lấy config của map hiện tại đang chơi
        MapMakeupConfig currentConfig = mapConfigs[currentMapIndex];
        
        bool isAllCompleted = true;
        foreach (var target in currentConfig.targetsInMap)
        {
            if (target != null && !target.isApplied)
            {
                isAllCompleted = false;
                break;
            }
        }

        foreach (var item in currentConfig.itemsInMap)
        {
            if (item != null)
            {
                // Chỉ kiểm tra isCompleted đối với ClickOnly, SnapToTarget, và DragAwayToFade
                if (item.itemType == DrawItemType.ClickOnly || item.itemType == DrawItemType.SnapToTarget || item.itemType == DrawItemType.DragAwayToFade)
                {
                    if (!item.isCompleted)
                    {
                        isAllCompleted = false;
                        break;
                    }
                }
            }
        }

        if (isAllCompleted)
        {
            // Spawn heart và chạy anim Happy khi hoàn thành cả 1 Map
            if (Ply_SoundManager.Ins != null) Ply_SoundManager.Ins.PlayFx(FxType.Happy);
            if (CharacterManager.instance != null) CharacterManager.instance.PlayHappyAnim();
            
            if (Ply_Pool.Ins != null)
            {
                Transform spawnParent = currentConfig.heartSpawnPos;
                Vector3 spawnPos = spawnParent != null ? spawnParent.position : transform.position;
                
                var heartUnit = Ply_Pool.Ins.Spawn(PoolType.Heart, spawnPos, Quaternion.identity);
                if (heartUnit != null && spawnParent != null)
                {
                    heartUnit.transform.SetParent(spawnParent);
                    var prefabScale = Ply_Pool.Ins.GetPrefab(PoolType.Heart).transform.localScale;
                    heartUnit.transform.localScale = prefabScale; // Sẽ được nhân với scale của spawnParent do đã là child
                }
            }

            // Tăng map index TRƯỚC KHI chạy event chuyển map (để code lấy đúng index mới)
            currentMapIndex++;
            UpdateMapStatusDisplay();

            // Chạy event chuyển map
            currentConfig.OnMapCompleted?.Invoke();
            
            return true; // Báo hiệu đã chuyển map
        }

        return false;
    }

    private void UpdateMapStatusDisplay()
    {
        if (currentMapIndex < mapConfigs.Count)
        {
            currentMapStatus = "Đang ở Map " + (currentMapIndex + 1) + " (Index: " + currentMapIndex + ")";
        }
        else
        {
            currentMapStatus = "Hoàn Thành (Tất cả Map đã xong)";
        }
    }

    public void SpawnHeartAt(Transform spawnParent)
    {
        if (Ply_Pool.Ins != null && spawnParent != null)
        {
            var heartUnit = Ply_Pool.Ins.Spawn(PoolType.Heart, spawnParent.position, Quaternion.identity);
            if (heartUnit != null)
            {
                heartUnit.transform.SetParent(spawnParent);
                var prefabScale = Ply_Pool.Ins.GetPrefab(PoolType.Heart).transform.localScale;
                heartUnit.transform.localScale = prefabScale;
            }
        }
    }

    public void SpawnHeartAndHappyAt(Transform spawnParent)
    {
        if (Ply_SoundManager.Ins != null) Ply_SoundManager.Ins.PlayFx(FxType.Happy);
        SpawnHeartAt(spawnParent);
    }

    public bool IsMakeupIDCompletedInCurrentMap(string makeupID)
    {
        return IsMakeupIDCompleted(makeupID, currentMapIndex);
    }

    public bool IsMakeupIDCompleted(string makeupID, int mapIndex)
    {
        if (mapIndex >= mapConfigs.Count) return false;

        MapMakeupConfig config = mapConfigs[mapIndex];
        foreach (var target in config.targetsInMap)
        {
            if (target != null && target.requiredMakeupID == makeupID)
            {
                if (!target.isApplied)
                {
                    return false;
                }
            }
        }
        return true;
    }

    public float GetMakeupProgressInCurrentMap(string makeupID)
    {
        if (currentMapIndex >= mapConfigs.Count) return 0f;

        MapMakeupConfig currentConfig = mapConfigs[currentMapIndex];
        float totalRequired = 0f;
        float totalCurrent = 0f;

        foreach (var target in currentConfig.targetsInMap)
        {
            if (target != null && target.requiredMakeupID == makeupID)
            {
                float targetMax = target.continuousMode ? target.continuousRequiredSeconds : (float)target.requiredDrawTimes;
                totalRequired += targetMax;
                totalCurrent += target.CurrentDrawTimes;
            }
        }

        if (totalRequired <= 0f) return 0f;
        return Mathf.Clamp01(totalCurrent / totalRequired);
    }

    public Transform GetHeartSpawnPosForCurrentMap()
    {
        if (currentMapIndex < mapConfigs.Count)
        {
            return mapConfigs[currentMapIndex].heartSpawnPos;
        }
        return null;
    }

    public Transform GetProgressUIPosForCurrentMap()
    {
        if (currentMapIndex < mapConfigs.Count)
        {
            return mapConfigs[currentMapIndex].progressUIPos;
        }
        return null;
    }

    // Cung cấp danh sách ID hiển thị ở các script khác
#if UNITY_EDITOR
    public static IEnumerable<string> GetAvailableMakeupIDs()
    {
        var manager = FindObjectOfType<DrawItemManager>();
        if (manager != null && manager.availableMakeupIDs != null && manager.availableMakeupIDs.Count > 0)
        {
            return manager.availableMakeupIDs;
        }
        return new string[] { "[Chưa có ID nào ở DrawItemManager]" };
    }
#endif
}
