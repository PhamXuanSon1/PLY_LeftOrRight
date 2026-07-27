using UnityEngine;

public class AppLovinAnalyticsExample : MonoBehaviour
{
	[Header("Settings")]
	[SerializeField]
	private bool hasLoadingScreen = true;

	[SerializeField]
	private bool hasChallenge = true;

	private int currentProgress = 0;

	private bool challengeStarted = false;

	private void Start()
	{
		if (hasLoadingScreen)
		{
			AppLovinAnalytics.TrackLoading();
			Invoke("OnLoadingComplete", 1f);
		}
		else
		{
			OnLoadingComplete();
		}
	}

	private void OnLoadingComplete()
	{
		if (hasLoadingScreen)
		{
			AppLovinAnalytics.TrackLoaded();
		}
		AppLovinAnalytics.TrackDisplayed();
		Debug.Log("Playable đã displayed, sẵn sàng để user tương tác!");
	}

	public void OnUserStartChallenge()
	{
		if (hasChallenge && !challengeStarted)
		{
			challengeStarted = true;
			currentProgress = 0;
			AppLovinAnalytics.TrackChallengeStarted();
			Debug.Log("Challenge started!");
		}
	}

	public void OnProgressUpdate(int progress)
	{
		if (challengeStarted)
		{
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
	}

	public void OnChallengeCompleted()
	{
		if (challengeStarted)
		{
			AppLovinAnalytics.TrackChallengeSolved();
			Debug.Log("Challenge completed!");
			ShowEndcard();
		}
	}

	public void OnChallengeFailed()
	{
		if (challengeStarted)
		{
			AppLovinAnalytics.TrackChallengeFailed();
			Debug.Log("Challenge failed!");
		}
	}

	public void OnRetryChallenge()
	{
		currentProgress = 0;
		AppLovinAnalytics.TrackChallengeRetry();
		Debug.Log("Retrying challenge...");
	}

	private void ShowEndcard()
	{
		AppLovinAnalytics.TrackEndcardShown();
		Debug.Log("Endcard shown!");
	}

	public void OnCTAClicked()
	{
		AppLovinAnalytics.TrackCTAClicked();
		Debug.Log("CTA clicked!");
	}
}
