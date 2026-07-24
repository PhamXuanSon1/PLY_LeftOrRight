using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using TMPro;
using System.Collections.Generic;

/// <summary>
/// Luna AppLovin Analytics Testing Script - Fixed for WebGL
/// Attach to empty GameObject in your Canvas
/// </summary>
public class LunaAppLovinAnalyticsTestHelper : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI logText;
    [SerializeField] private Transform buttonContainer; // Panel to hold buttons
    
    private List<string> eventLog = new List<string>();
    private const int maxLogLines = 20;
    
    void Start()
    {
        AddLog("[START] AppLovin Analytics Test Helper Started");
        AddLog("[CHECK] Available: " + AppLovinAnalytics.IsAvailable());
        
        // Auto track displayed when scene loads
        AppLovinAnalytics.TrackDisplayed();
        AddLog("[OK] DISPLAYED event tracked");
        
        // Ensure Canvas has GraphicRaycaster for button clicks to work
        SetupCanvasRaycaster();
        
        // Ensure EventSystem exists
        EnsureEventSystem();
        
        // Create UI buttons
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
        if (FindObjectOfType<EventSystem>() == null)
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
        
        // Clear existing buttons
        foreach (Transform child in buttonContainer)
        {
            Destroy(child.gameObject);
        }
        
        // Create buttons with event handlers
        CreateButton("LOADING", () =>
        {
            AppLovinAnalytics.TrackLoading();
            AddLog("[LOADING] Event tracked");
        });
        
        CreateButton("LOADED", () =>
        {
            AppLovinAnalytics.TrackLoaded();
            AddLog("[LOADED] Event tracked");
        });
        
        CreateButton("DISPLAYED", () =>
        {
            AppLovinAnalytics.TrackDisplayed();
            AddLog("[DISPLAYED] Event tracked");
        });
        
        // Challenge Events
        CreateButton("CHALLENGE_STARTED", () =>
        {
            AppLovinAnalytics.TrackChallengeStarted();
            AddLog("[CHALLENGE_STARTED] Event tracked");
        });
        
        CreateButton("CHALLENGE_FAILED", () =>
        {
            AppLovinAnalytics.TrackChallengeFailed();
            AddLog("[CHALLENGE_FAILED] Event tracked");
        });
        
        CreateButton("CHALLENGE_RETRY", () =>
        {
            AppLovinAnalytics.TrackChallengeRetry();
            AddLog("[CHALLENGE_RETRY] Event tracked");
        });
        
        // Progress Events
        CreateButton("CHALLENGE_PASS_25", () =>
        {
            AppLovinAnalytics.TrackChallengePass25();
            AddLog("[PASS_25] Event tracked");
        });
        
        CreateButton("CHALLENGE_PASS_50", () =>
        {
            AppLovinAnalytics.TrackChallengePass50();
            AddLog("[PASS_50] Event tracked");
        });
        
        CreateButton("CHALLENGE_PASS_75", () =>
        {
            AppLovinAnalytics.TrackChallengePass75();
            AddLog("[PASS_75] Event tracked");
        });
        
        // Completion Events
        CreateButton("CHALLENGE_SOLVED", () =>
        {
            AppLovinAnalytics.TrackChallengeSolved();
            AddLog("[CHALLENGE_SOLVED] Event tracked");
        });
        
        CreateButton("ENDCARD_SHOWN", () =>
        {
            AppLovinAnalytics.TrackEndcardShown();
            AddLog("[ENDCARD_SHOWN] Event tracked");
        });
        
        // Conversion
        CreateButton("CTA_CLICKED", () =>
        {
            AppLovinAnalytics.TrackCTAClicked();
            AddLog("[CTA_CLICKED] Event tracked");
        });
        
        // Clear Log
        CreateButton("CLEAR_LOG", () =>
        {
            eventLog.Clear();
            UpdateLogDisplay();
            AddLog("[LOG] Cleared");
        });
    }
    
    private void CreateButton(string buttonName, UnityAction onClick)
    {
        // Create button GameObject
        GameObject buttonObj = new GameObject(buttonName);
        buttonObj.transform.SetParent(buttonContainer, false);
        
        // Setup RectTransform
        RectTransform rectTransform = buttonObj.AddComponent<RectTransform>();
        rectTransform.sizeDelta = new Vector2(140, 45);
        
        // Setup Image (button background)
        Image image = buttonObj.AddComponent<Image>();
        image.color = new Color(0.2f, 0.7f, 1f, 1f); // Blue color
        image.raycastTarget = true; // IMPORTANT: Must be true for clicks
        
        // Setup Button component
        Button button = buttonObj.AddComponent<Button>();
        button.targetGraphic = image;
        button.interactable = true;
        
        // Add hover color transition
        ColorBlock colors = button.colors;
        colors.normalColor = new Color(0.2f, 0.7f, 1f, 1f);
        colors.highlightedColor = new Color(0.3f, 0.8f, 1f, 1f);
        colors.pressedColor = new Color(0.1f, 0.6f, 0.9f, 1f);
        colors.disabledColor = new Color(0.5f, 0.5f, 0.5f, 1f);
        button.colors = colors;
        
        // Add listener
        button.onClick.AddListener(onClick);
        
        // Create text label
        GameObject textObj = new GameObject("Text");
        textObj.transform.SetParent(buttonObj.transform, false);
        
        TextMeshProUGUI buttonText = textObj.AddComponent<TextMeshProUGUI>();
        buttonText.text = buttonName;
        buttonText.fontSize = 30;
        buttonText.alignment = TextAlignmentOptions.Center;
        buttonText.color = Color.white;
        buttonText.raycastTarget = false; // Text should NOT block raycasts
        
        RectTransform textRect = textObj.GetComponent<RectTransform>();
        textRect.anchorMin = Vector2.zero;
        textRect.anchorMax = Vector2.one;
        textRect.offsetMin = Vector2.zero;
        textRect.offsetMax = Vector2.zero;
    }
    
    private void AddLog(string message)
    {
        string timestamp = System.DateTime.Now.ToString("HH:mm:ss");
        eventLog.Insert(0, "[" + timestamp + "] " + message);
        
        // Keep only last N lines
        if (eventLog.Count > maxLogLines)
        {
            eventLog.RemoveAt(eventLog.Count - 1);
        }
        
        UpdateLogDisplay();
        
        // Also log to console
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
