using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class LunaAppLovinAnalyticsTestHelper : MonoBehaviour
{
	[SerializeField]
	private TextMeshProUGUI logText;

	[SerializeField]
	private Transform buttonContainer;

	private List<string> eventLog = new List<string>();

	private const int maxLogLines = 20;

	private void Start()
	{
		AddLog("[START] AppLovin Analytics Test Helper Started");
		AddLog("[CHECK] Available: " + AppLovinAnalytics.IsAvailable());
		AppLovinAnalytics.TrackDisplayed();
		AddLog("[OK] DISPLAYED event tracked");
		SetupCanvasRaycaster();
		EnsureEventSystem();
		CreateTestButtons();
	}

	private void SetupCanvasRaycaster()
	{
		Canvas canvas = GetComponentInParent<Canvas>();
		if (canvas == null)
		{
			Debug.LogError("TestHelper must be inside a Canvas!");
			return;
		}
		GraphicRaycaster raycaster = canvas.GetComponent<GraphicRaycaster>();
		if (raycaster == null)
		{
			canvas.gameObject.AddComponent<GraphicRaycaster>();
			AddLog("[SETUP] GraphicRaycaster added to Canvas");
		}
	}

	private void EnsureEventSystem()
	{
		if (UnityEngine.Object.FindObjectOfType<EventSystem>() == null)
		{
			GameObject eventSystemObj = new GameObject("EventSystem");
			eventSystemObj.AddComponent<EventSystem>();
			eventSystemObj.AddComponent<StandaloneInputModule>();
			AddLog("[SETUP] EventSystem created");
		}
	}

	private void CreateTestButtons()
	{
		if (buttonContainer == null)
		{
			Debug.LogError("ButtonContainer not assigned!");
			return;
		}
		foreach (Transform child in buttonContainer)
		{
			UnityEngine.Object.Destroy(child.gameObject);
		}
		CreateButton("LOADING", delegate
		{
			AppLovinAnalytics.TrackLoading();
			AddLog("[LOADING] Event tracked");
		});
		CreateButton("LOADED", delegate
		{
			AppLovinAnalytics.TrackLoaded();
			AddLog("[LOADED] Event tracked");
		});
		CreateButton("DISPLAYED", delegate
		{
			AppLovinAnalytics.TrackDisplayed();
			AddLog("[DISPLAYED] Event tracked");
		});
		CreateButton("CHALLENGE_STARTED", delegate
		{
			AppLovinAnalytics.TrackChallengeStarted();
			AddLog("[CHALLENGE_STARTED] Event tracked");
		});
		CreateButton("CHALLENGE_FAILED", delegate
		{
			AppLovinAnalytics.TrackChallengeFailed();
			AddLog("[CHALLENGE_FAILED] Event tracked");
		});
		CreateButton("CHALLENGE_RETRY", delegate
		{
			AppLovinAnalytics.TrackChallengeRetry();
			AddLog("[CHALLENGE_RETRY] Event tracked");
		});
		CreateButton("CHALLENGE_PASS_25", delegate
		{
			AppLovinAnalytics.TrackChallengePass25();
			AddLog("[PASS_25] Event tracked");
		});
		CreateButton("CHALLENGE_PASS_50", delegate
		{
			AppLovinAnalytics.TrackChallengePass50();
			AddLog("[PASS_50] Event tracked");
		});
		CreateButton("CHALLENGE_PASS_75", delegate
		{
			AppLovinAnalytics.TrackChallengePass75();
			AddLog("[PASS_75] Event tracked");
		});
		CreateButton("CHALLENGE_SOLVED", delegate
		{
			AppLovinAnalytics.TrackChallengeSolved();
			AddLog("[CHALLENGE_SOLVED] Event tracked");
		});
		CreateButton("ENDCARD_SHOWN", delegate
		{
			AppLovinAnalytics.TrackEndcardShown();
			AddLog("[ENDCARD_SHOWN] Event tracked");
		});
		CreateButton("CTA_CLICKED", delegate
		{
			AppLovinAnalytics.TrackCTAClicked();
			AddLog("[CTA_CLICKED] Event tracked");
		});
		CreateButton("CLEAR_LOG", delegate
		{
			eventLog.Clear();
			UpdateLogDisplay();
			AddLog("[LOG] Cleared");
		});
	}

	private void CreateButton(string buttonName, UnityAction onClick)
	{
		GameObject buttonObj = new GameObject(buttonName);
		buttonObj.transform.SetParent(buttonContainer, false);
		RectTransform rectTransform = buttonObj.AddComponent<RectTransform>();
		rectTransform.sizeDelta = new Vector2(140f, 45f);
		Image image = buttonObj.AddComponent<Image>();
		image.color = new Color(0.2f, 0.7f, 1f, 1f);
		image.raycastTarget = true;
		Button button = buttonObj.AddComponent<Button>();
		button.targetGraphic = image;
		button.interactable = true;
		ColorBlock colors = button.colors;
		colors.normalColor = new Color(0.2f, 0.7f, 1f, 1f);
		colors.highlightedColor = new Color(0.3f, 0.8f, 1f, 1f);
		colors.pressedColor = new Color(0.1f, 0.6f, 0.9f, 1f);
		colors.disabledColor = new Color(0.5f, 0.5f, 0.5f, 1f);
		button.colors = colors;
		button.onClick.AddListener(onClick);
		GameObject textObj = new GameObject("Text");
		textObj.transform.SetParent(buttonObj.transform, false);
		TextMeshProUGUI buttonText = textObj.AddComponent<TextMeshProUGUI>();
		buttonText.text = buttonName;
		buttonText.fontSize = 30f;
		buttonText.alignment = TextAlignmentOptions.Center;
		buttonText.color = Color.white;
		buttonText.raycastTarget = false;
		RectTransform textRect = textObj.GetComponent<RectTransform>();
		textRect.anchorMin = Vector2.zero;
		textRect.anchorMax = Vector2.one;
		textRect.offsetMin = Vector2.zero;
		textRect.offsetMax = Vector2.zero;
	}

	private void AddLog(string message)
	{
		string timestamp = DateTime.Now.ToString("HH:mm:ss");
		eventLog.Insert(0, "[" + timestamp + "] " + message);
		if (eventLog.Count > 20)
		{
			eventLog.RemoveAt(eventLog.Count - 1);
		}
		UpdateLogDisplay();
		Debug.Log("[AppLovin Test] " + message);
	}

	private void UpdateLogDisplay()
	{
		if (logText != null)
		{
			logText.text = string.Join("\n", eventLog);
		}
	}
}
