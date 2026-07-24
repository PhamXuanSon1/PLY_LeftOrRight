using UnityEngine;

public class ProgressTrackingManager : MonoBehaviour
{
    public static ProgressTrackingManager Instance { get; private set; }

    [Header("Progress Settings")]
    [Tooltip("Tổng số điểm/item tối đa (Sẽ được tự động tính toán dựa trên Flow Mode của UIManager)")]
    public int maxScore = 10; 

    [Header("Debug (Chỉ xem khi đang chơi)")]
    [Tooltip("Số điểm hiện tại đang đạt được")]
    [SerializeField] private int currentScore = 0;
    [Tooltip("Phần trăm tiến độ hiện tại (%)")]
    [SerializeField] private int currentPercent = 0;

    private bool isStarted = false;
    private bool pass25 = false;
    private bool pass50 = false;
    private bool pass75 = false;
    private bool pass100 = false;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
    }

    void Start()
    {
        AppLovinAnalytics.TrackChallengeStarted();
    }
    /// <summary>
    /// Cộng thêm điểm (mặc định thêm 1). Bạn có thể gọi hàm này mỗi khi user hoàn thành 1 item.
    /// Vd: ProgressTrackingManager.Instance.AddProgress();
    /// </summary>
    public void AddProgress(int amount = 1)
    {
        UpdateGameProgress(currentScore + amount);
    }

    /// <summary>
    /// Gán trực tiếp số điểm hiện tại và kiểm tra %
    /// </summary>
    public void UpdateGameProgress(int score)
    {
        currentScore = score;

        int dynamicMaxScore = GetDynamicMaxScore();
        if (dynamicMaxScore > 0)
        {
            maxScore = dynamicMaxScore;
        }

        // Bắn event Started ngay lần đầu tiên user hoàn thành 1 item
        if (!isStarted && currentScore > 0)
        {
            AppLovinAnalytics.TrackChallengeStarted();
            Debug.Log("Track: Challenge Started");
            isStarted = true;
        }
        
        if (maxScore <= 0) return; // Tránh lỗi chia cho 0 nếu quên set maxScore

        int progressPercent = (currentScore * 100) / maxScore;
        currentPercent = progressPercent; // Lưu lại để hiện ra ngoài Inspector

        if (progressPercent >= 25 && !pass25)
        {
            AppLovinAnalytics.TrackChallengePass25();
            pass25 = true;
        }

        if (progressPercent >= 50 && !pass50)
        {
            AppLovinAnalytics.TrackChallengePass50();
            pass50 = true;
        }

        if (progressPercent >= 75 && !pass75)
        {
            
            Debug.Log("Track: Challenge Pass 75%");
            pass75 = true;
        }

        if (progressPercent >= 100 && !pass100)
        {
            
            Debug.Log("Track: Challenge Solved 100%");
            pass100 = true;
        }
    }

    private int GetDynamicMaxScore()
    {
        if (UIManager.Instance == null || ItemManager.Instance == null) return maxScore;

        PlayableFlowMode mode = UIManager.Instance.flowMode;
        int totalItems = UIManager.Instance.mauSo;
        int phase1Count = ItemManager.Instance.stages != null && ItemManager.Instance.stages.Length > 0 
            ? ItemManager.Instance.stages[0].itemList.Length : totalItems;
        int endCount = UIManager.Instance.endGameCount;

        switch (mode)
        {
            case PlayableFlowMode.PlayAll_NoStore:
            case PlayableFlowMode.StoreAfterPhase1_CanContinue:
            case PlayableFlowMode.PlayAll_ShowEndcard_Store:
                return totalItems;
                
            case PlayableFlowMode.StoreAfterPhase1_End:
                // Nếu dừng ở Phase 1 thì max score là tổng số item của Phase 1 hoặc endGameCount
                return Mathf.Min(phase1Count, endCount);

            case PlayableFlowMode.StoreAtLastItem_End:
                // Trò chơi dừng ngay khi NHẤC item cuối lên, nghĩa là số lượng item 
                // ĐẶT THÀNH CÔNG (arrived) tối đa sẽ là endGameCount - 1
                return Mathf.Min(endCount - 1, totalItems - 1);
        }

        return totalItems;
    }
}
