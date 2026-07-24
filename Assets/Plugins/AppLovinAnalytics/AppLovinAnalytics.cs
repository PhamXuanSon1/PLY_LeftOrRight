using System.Runtime.InteropServices;
using UnityEngine;

/// <summary>
/// AppLovin Playable Analytics Plugin
/// Tham khảo: https://support.applovin.com/en/growth/promoting-your-apps/welcome-to-applovin/playable-analytics-integration
/// </summary>
public static class AppLovinAnalytics
{
    #region External Calls
    
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void AppLovinAnalytics_TrackEvent(string eventName);
    
    [DllImport("__Internal")]
    private static extern int AppLovinAnalytics_IsAvailable();
#endif
    
    #endregion
    
    #region Public Methods
    
    /// <summary>
    /// Check xem AppLovin Analytics có available không
    /// </summary>
    public static bool IsAvailable()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        return AppLovinAnalytics_IsAvailable() == 1;
#else
        return false;
#endif
    }
    
    /// <summary>
    /// Track event chung (internal use)
    /// </summary>
    private static void TrackEvent(string eventName)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        AppLovinAnalytics_TrackEvent(eventName);
#else
        Debug.Log($"[AppLovin Analytics] (Editor Mode) Event: {eventName}");
#endif
    }
    
    #endregion
    
    #region Loading và Display Events
    
    /// <summary>
    /// In-playable loading starts
    /// Optional - Implement nếu có loading screen
    /// </summary>
    public static void TrackLoading()
    {
        TrackEvent("LOADING");
    }
    
    /// <summary>
    /// In-playable loading completes
    /// Conditional - Bắt buộc nếu đã implement LOADING
    /// </summary>
    public static void TrackLoaded()
    {
        TrackEvent("LOADED");
    }
    
    /// <summary>
    /// HTML creative displays và ready để user interact
    /// REQUIRED - Luôn phải có event này
    /// </summary>
    public static void TrackDisplayed()
    {
        TrackEvent("DISPLAYED");
    }
    
    #endregion
    
    #region Challenge Events
    
    /// <summary>
    /// User bắt đầu challenge
    /// Optional - Trigger khi user click "start" hoặc có meaningful interaction
    /// </summary>
    public static void TrackChallengeStarted()
    {
        TrackEvent("CHALLENGE_STARTED");
    }
    
    /// <summary>
    /// User fail challenge
    /// Conditional - Bắt buộc implement nếu có CHALLENGE_STARTED
    /// </summary>
    public static void TrackChallengeFailed()
    {
        TrackEvent("CHALLENGE_FAILED");
    }
    
    /// <summary>
    /// User retry challenge sau khi fail
    /// Conditional - Chỉ implement nếu có CHALLENGE_FAILED
    /// </summary>
    public static void TrackChallengeRetry()
    {
        TrackEvent("CHALLENGE_RETRY");
    }
    
    /// <summary>
    /// User đạt 25% challenge
    /// Conditional - Chỉ implement nếu có CHALLENGE_STARTED
    /// </summary>
    public static void TrackChallengePass25()
    {
        TrackEvent("CHALLENGE_PASS_25");
    }
    
    /// <summary>
    /// User đạt 50% challenge
    /// Conditional - Chỉ implement nếu có CHALLENGE_STARTED
    /// </summary>
    public static void TrackChallengePass50()
    {
        TrackEvent("CHALLENGE_PASS_50");
    }
    
    /// <summary>
    /// User đạt 75% challenge
    /// Conditional - Chỉ implement nếu có CHALLENGE_STARTED
    /// </summary>
    public static void TrackChallengePass75()
    {
        TrackEvent("CHALLENGE_PASS_75");
    }
    
    /// <summary>
    /// User hoàn thành challenge thành công
    /// Conditional - Bắt buộc implement nếu có CHALLENGE_STARTED
    /// </summary>
    public static void TrackChallengeSolved()
    {
        TrackEvent("CHALLENGE_SOLVED");
    }
    
    #endregion
    
    #region Completion và Conversion Events
    
    /// <summary>
    /// User click CTA button trong creative
    /// Optional
    /// </summary>
    public static void TrackCTAClicked()
    {
        TrackEvent("CTA_CLICKED");
    }
    
    /// <summary>
    /// End card hoặc summary screen được hiển thị
    /// Optional - Chỉ cho endcard trong HTML experience, không phải template bên ngoài
    /// </summary>
    public static void TrackEndcardShown()
    {
        TrackEvent("ENDCARD_SHOWN");
    }
    
    #endregion
}
