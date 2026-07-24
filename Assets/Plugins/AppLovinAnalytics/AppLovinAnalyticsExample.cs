using UnityEngine;

/// <summary>
/// Example script minh họa cách sử dụng AppLovin Analytics Plugin
/// </summary>
public class AppLovinAnalyticsExample : MonoBehaviour
{
    [Header("Settings")]
    [SerializeField] private bool hasLoadingScreen = true;
    [SerializeField] private bool hasChallenge = true;
    
    private int currentProgress = 0;
    private bool challengeStarted = false;
    
    void Start()
    {
        // Bước 1: (Optional) Track loading nếu có loading screen
        if (hasLoadingScreen)
        {
            AppLovinAnalytics.TrackLoading();
            
            // Giả lập loading xong sau 1 giây
            Invoke(nameof(OnLoadingComplete), 1f);
        }
        else
        {
            // Không có loading screen, track displayed luôn
            OnLoadingComplete();
        }
    }
    
    private void OnLoadingComplete()
    {
        // Bước 2: (Conditional) Track loaded nếu đã có loading
        if (hasLoadingScreen)
        {
            AppLovinAnalytics.TrackLoaded();
        }
        
        // Bước 3: (REQUIRED) Track displayed - bắt buộc phải có
        AppLovinAnalytics.TrackDisplayed();
        
        Debug.Log("Playable đã displayed, sẵn sàng để user tương tác!");
    }
    
    /// <summary>
    /// Gọi khi user bắt đầu chơi (click start button hoặc first meaningful interaction)
    /// </summary>
    public void OnUserStartChallenge()
    {
        if (!hasChallenge || challengeStarted) return;
        
        challengeStarted = true;
        currentProgress = 0;
        
        // Bước 4: Track challenge started
        AppLovinAnalytics.TrackChallengeStarted();
        
        Debug.Log("Challenge started!");
    }
    
    /// <summary>
    /// Gọi khi user đạt được progress trong game
    /// </summary>
    public void OnProgressUpdate(int progress)
    {
        if (!challengeStarted) return;
        
        // Track các mốc 25%, 50%, 75%
        if (progress >= 25 && currentProgress < 25)
        {
            AppLovinAnalytics.TrackChallengePass25();
            Debug.Log("Progress: 25%");
        }
        else if (progress >= 50 && currentProgress < 50)
        {
            AppLovinAnalytics.TrackChallengePass50();
            Debug.Log("Progress: 50%");
        }
        else if (progress >= 75 && currentProgress < 75)
        {
            AppLovinAnalytics.TrackChallengePass75();
            Debug.Log("Progress: 75%");
        }
        
        currentProgress = progress;
    }
    
    /// <summary>
    /// Gọi khi user hoàn thành challenge thành công
    /// </summary>
    public void OnChallengeCompleted()
    {
        if (!challengeStarted) return;
        
        // Track challenge solved
        AppLovinAnalytics.TrackChallengeSolved();
        
        Debug.Log("Challenge completed!");
        
        // Show endcard (optional)
        ShowEndcard();
    }
    
    /// <summary>
    /// Gọi khi user fail challenge
    /// </summary>
    public void OnChallengeFailed()
    {
        if (!challengeStarted) return;
        
        // Track challenge failed
        AppLovinAnalytics.TrackChallengeFailed();
        
        Debug.Log("Challenge failed!");
    }
    
    /// <summary>
    /// Gọi khi user retry sau khi fail
    /// </summary>
    public void OnRetryChallenge()
    {
        // Reset progress
        currentProgress = 0;
        
        // Track retry
        AppLovinAnalytics.TrackChallengeRetry();
        
        Debug.Log("Retrying challenge...");
    }
    
    /// <summary>
    /// Hiển thị endcard/summary screen
    /// </summary>
    private void ShowEndcard()
    {
        // Track endcard shown
        AppLovinAnalytics.TrackEndcardShown();
        
        Debug.Log("Endcard shown!");
    }
    
    /// <summary>
    /// Gọi khi user click CTA button (Install/Download)
    /// </summary>
    public void OnCTAClicked()
    {
        // Track CTA clicked
        AppLovinAnalytics.TrackCTAClicked();
        
        Debug.Log("CTA clicked!");
    }
}
