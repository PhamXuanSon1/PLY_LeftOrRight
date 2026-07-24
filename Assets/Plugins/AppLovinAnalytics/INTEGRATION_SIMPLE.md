# AppLovin Analytics - Cách sử dụng đơn giản nhất

## 🎯 Quick Integration

Chỉ cần 1 file duy nhất để integrate vào game của bạn!

---

## 📋 Bước 1: Copy code này vào game manager của bạn

```csharp
// Ở trong GameManager hoặc main script của bạn:

void Start()
{
    // Khi game bắt đầu load UI
    AppLovinAnalytics.TrackDisplayed();
}

void OnGameStart()
{
    // Khi player click "Start Game"
    AppLovinAnalytics.TrackChallengeStarted();
}

void OnGameWin()
{
    // Khi player win
    AppLovinAnalytics.TrackChallengeSolved();
    
    // Show endcard/install screen
    ShowInstallScreen();
    AppLovinAnalytics.TrackEndcardShown();
}

void OnGameOver()
{
    // Khi player lose
    AppLovinAnalytics.TrackChallengeFailed();
}

void OnInstallClick()
{
    // Khi player click install button
    AppLovinAnalytics.TrackCTAClicked();
}
```

That's it! ✅

---

## 🎮 Ví dụ thực tế: 3D Game

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    private int score = 0;
    private bool gameStarted = false;
    private bool pass25 = false, pass50 = false, pass75 = false;
    
    void Start()
    {
        // Show game UI
        AppLovinAnalytics.TrackDisplayed();
    }
    
    void OnStartButtonClicked()
    {
        gameStarted = true;
        score = 0;
        pass25 = false;
        pass50 = false;
        pass75 = false;
        
        // Tell AppLovin: game started
        AppLovinAnalytics.TrackChallengeStarted();
        
        // Start game...
        StartGame();
    }
    
    void Update()
    {
        if (!gameStarted) return;
        
        // Track progress
        UpdateProgress();
    }
    
    void UpdateProgress()
    {
        // Tính progress (0-100)
        int maxScore = 100;
        int progressPercent = (score * 100) / maxScore;
        
        // Track mốc 25%, 50%, 75%
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
            AppLovinAnalytics.TrackChallengePass75();
            pass75 = true;
        }
    }
    
    void OnPlayerWin()
    {
        gameStarted = false;
        
        // Track win
        AppLovinAnalytics.TrackChallengeSolved();
        
        // Show win screen
        ShowWinScreen();
        
        // Show install screen
        AppLovinAnalytics.TrackEndcardShown();
        ShowInstallButton();
    }
    
    void OnPlayerLose()
    {
        gameStarted = false;
        
        // Track fail
        AppLovinAnalytics.TrackChallengeFailed();
        
        // Show lose screen with retry button
        ShowLoseScreen();
    }
    
    void OnRetryClicked()
    {
        // Track retry
        AppLovinAnalytics.TrackChallengeRetry();
        
        // Restart game
        OnStartButtonClicked();
    }
    
    void OnInstallClicked()
    {
        // Track CTA click
        AppLovinAnalytics.TrackCTAClicked();
        
        // Open app store
        // Application.OpenURL("...");
    }
    
    // Game logic...
    void StartGame() { }
    void ShowWinScreen() { }
    void ShowLoseScreen() { }
    void ShowInstallButton() { }
}
```

---

## 🔥 Minimal Setup (Simplest version)

**Chỉ track 3 events quan trọng nhất:**

```csharp
public class SimpleGameManager : MonoBehaviour
{
    void Start()
    {
        AppLovinAnalytics.TrackDisplayed();  // Game UI ready
    }
    
    public void StartGame()
    {
        AppLovinAnalytics.TrackChallengeStarted();  // Game started
    }
    
    public void WinGame()
    {
        AppLovinAnalytics.TrackChallengeSolved();   // Game won
    }
}
```

Đó là tất cả! ✅

---

## 📊 Recommended Event Sequence

### **Flow 1: Win (Đơn giản nhất)**
```csharp
Start()
  → AppLovinAnalytics.TrackDisplayed()

OnStartClicked()
  → AppLovinAnalytics.TrackChallengeStarted()

// Gameplay...

OnWin()
  → AppLovinAnalytics.TrackChallengeSolved()
  → AppLovinAnalytics.TrackEndcardShown()
  → AppLovinAnalytics.TrackCTAClicked() (khi click install)
```

### **Flow 2: Có progress tracking**
```csharp
TrackDisplayed()
  ↓
TrackChallengeStarted()
  ↓
TrackChallengePass25() (25% progress)
  ↓
TrackChallengePass50() (50% progress)
  ↓
TrackChallengePass75() (75% progress)
  ↓
TrackChallengeSolved() (WIN)
  ↓
TrackEndcardShown()
  ↓
TrackCTAClicked()
```

### **Flow 3: Fail & Retry**
```csharp
TrackDisplayed()
  ↓
TrackChallengeStarted()
  ↓
TrackChallengeFailed() (LOSE)
  ↓
TrackChallengeRetry() (Click retry)
  ↓
TrackChallengeSolved() (WIN second try)
  ↓
TrackCTAClicked()
```

---

## ✅ Checklist sử dụng

- [ ] Call `TrackDisplayed()` lúc UI show
- [ ] Call `TrackChallengeStarted()` khi game start
- [ ] Call `TrackChallengeSolved()` khi win
- [ ] Call `TrackChallengeFailed()` khi lose
- [ ] Call `TrackCTAClicked()` khi click install
- [ ] (Optional) Track progress: `Pass25/50/75`
- [ ] (Optional) Track retry: `TrackChallengeRetry()`

---

## 🎯 Events Reference (Quick lookup)

| When | What | Code |
|------|------|------|
| UI loaded | Show UI | `TrackDisplayed()` |
| Player clicks start | Start game | `TrackChallengeStarted()` |
| Progress 25% | Milestone | `TrackChallengePass25()` |
| Progress 50% | Milestone | `TrackChallengePass50()` |
| Progress 75% | Milestone | `TrackChallengePass75()` |
| Player wins | Complete | `TrackChallengeSolved()` |
| Player loses | Fail | `TrackChallengeFailed()` |
| Click retry | Retry | `TrackChallengeRetry()` |
| Show install | Endcard | `TrackEndcardShown()` |
| Click install | CTA | `TrackCTAClicked()` |

---

## 🚀 Copy-Paste Template

Dán code này vào game manager của bạn:

```csharp
using UnityEngine;

public class YourGameManager : MonoBehaviour
{
    void Start()
    {
        // Game ready
        AppLovinAnalytics.TrackDisplayed();
    }
    
    public void OnPlayButtonClicked()
    {
        AppLovinAnalytics.TrackChallengeStarted();
        // Start game
    }
    
    public void OnGameComplete()
    {
        AppLovinAnalytics.TrackChallengeSolved();
        // Show win screen
    }
    
    public void OnGameFailed()
    {
        AppLovinAnalytics.TrackChallengeFailed();
        // Show lose screen
    }
    
    public void OnInstallButtonClicked()
    {
        AppLovinAnalytics.TrackCTAClicked();
        // Open app store
    }
}
```

---

## 📌 Notes

- ✅ Không cần tracking events theo thứ tự strict (optional events có thể skip)
- ✅ `TrackDisplayed()` là **BẮT BUỘC** (tất cả playable phải có)
- ✅ Nếu có challenge (game state), track `TrackChallengeStarted()`
- ✅ Editor mode sẽ log ra console (không call JavaScript)
- ✅ WebGL Luna sẽ call JavaScript thực

---

**Version:** 1.0.0  
**Mục đích:** Simple & Quick integration
