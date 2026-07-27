using UnityEngine;

public static class AppLovinAnalytics
{
	public static bool IsAvailable()
	{
		return false;
	}

	private static void TrackEvent(string eventName)
	{
		Debug.Log("[AppLovin Analytics] (Editor Mode) Event: " + eventName);
	}

	public static void TrackLoading()
	{
		TrackEvent("LOADING");
	}

	public static void TrackLoaded()
	{
		TrackEvent("LOADED");
	}

	public static void TrackDisplayed()
	{
		TrackEvent("DISPLAYED");
	}

	public static void TrackChallengeStarted()
	{
		TrackEvent("CHALLENGE_STARTED");
	}

	public static void TrackChallengeFailed()
	{
		TrackEvent("CHALLENGE_FAILED");
	}

	public static void TrackChallengeRetry()
	{
		TrackEvent("CHALLENGE_RETRY");
	}

	public static void TrackChallengePass25()
	{
		TrackEvent("CHALLENGE_PASS_25");
	}

	public static void TrackChallengePass50()
	{
		TrackEvent("CHALLENGE_PASS_50");
	}

	public static void TrackChallengePass75()
	{
		TrackEvent("CHALLENGE_PASS_75");
	}

	public static void TrackChallengeSolved()
	{
		TrackEvent("CHALLENGE_SOLVED");
	}

	public static void TrackCTAClicked()
	{
		TrackEvent("CTA_CLICKED");
	}

	public static void TrackEndcardShown()
	{
		TrackEvent("ENDCARD_SHOWN");
	}
}
