using System.Runtime.InteropServices;
using UnityEngine;

// All events defined by AppLovin Playable Analytics
// Docs: https://support.applovin.com/en/growth/promoting-your-apps/welcome-to-applovin/playable-analytics-integration
public enum ALEvent
{
    LOADING,
    LOADED,
    DISPLAYED,
    CHALLENGE_STARTED,
    CHALLENGE_FAILED,
    CHALLENGE_RETRY,
    CHALLENGE_PASS_25,
    CHALLENGE_PASS_50,
    CHALLENGE_PASS_75,
    CHALLENGE_SOLVED,
    CTA_CLICKED,
    ENDCARD_SHOWN
}

public static class AppLovinAnalytics
{
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void ALTrackEvent(string eventName);
#endif

    public static void Track(ALEvent evt)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        ALTrackEvent(evt.ToString());
#else
        // In Editor, mirror what the jslib does so you can test with Console filter
        Debug.Log("[ALPlayableEvent] " + evt.ToString());
#endif
    }
}
