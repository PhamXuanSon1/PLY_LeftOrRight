using UnityEngine;

public class ProgressTrackingManager : MonoBehaviour
{
    public static ProgressTrackingManager Instance { get; private set; }

    [Header("Progress Settings")]
    [Tooltip("Tổng số điểm/item tối đa (Nhập tay trên Inspector)")]
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
        AppLovinAnalytics.Track(ALEvent.LOADING);
        if (Instance == null)
        {
            Instance = this;
        }
    }
    void Start()
    {
        AppLovinAnalytics.Track(ALEvent.LOADED);
        AppLovinAnalytics.Track(ALEvent.DISPLAYED); 
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

        // Bắn event Started ngay lần đầu tiên user hoàn thành 1 item
        if (!isStarted && currentScore > 0)
        {
            isStarted = true;
        }
        
        if (maxScore <= 0) return; // Tránh lỗi chia cho 0 nếu quên set maxScore

        int progressPercent = (currentScore * 100) / maxScore;
        currentPercent = progressPercent; // Lưu lại để hiện ra ngoài Inspector

        if (progressPercent >= 25 && !pass25)
        {
        AppLovinAnalytics.Track(ALEvent.CHALLENGE_PASS_25); 
            pass25 = true;
        }

        if (progressPercent >= 50 && !pass50)
        {
        AppLovinAnalytics.Track(ALEvent.CHALLENGE_PASS_50); 

            pass50 = true;
        }

        if (progressPercent >= 75 && !pass75)
        {
        AppLovinAnalytics.Track(ALEvent.CHALLENGE_PASS_75); 
            
            pass75 = true;
        }

        if (progressPercent >= 100 && !pass100)
        {
        AppLovinAnalytics.Track(ALEvent.CHALLENGE_SOLVED); 
            
            pass100 = true;
        }
    }
}
