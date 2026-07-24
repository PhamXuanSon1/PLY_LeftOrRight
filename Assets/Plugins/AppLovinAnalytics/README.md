# AppLovin Playable Analytics Plugin

Plugin Unity độc lập để tích hợp AppLovin Playable Analytics vào Unity WebGL playable.

## 📚 Tài liệu tham khảo
- [AppLovin Playable Analytics Integration](https://support.applovin.com/en/growth/promoting-your-apps/welcome-to-applovin/playable-analytics-integration)

## 🎯 Tính năng

Plugin này cho phép bạn track các events sau trong playable:

### Loading và Display Events
- ✅ `LOADING` - Bắt đầu loading (optional)
- ✅ `LOADED` - Loading hoàn thành (conditional)
- ✅ `DISPLAYED` - Playable sẵn sàng tương tác (**REQUIRED**)

### Challenge Events
- ✅ `CHALLENGE_STARTED` - User bắt đầu challenge (optional)
- ✅ `CHALLENGE_PASS_25` - Đạt 25% progress (conditional)
- ✅ `CHALLENGE_PASS_50` - Đạt 50% progress (conditional)
- ✅ `CHALLENGE_PASS_75` - Đạt 75% progress (conditional)
- ✅ `CHALLENGE_SOLVED` - Hoàn thành challenge (conditional)
- ✅ `CHALLENGE_FAILED` - Fail challenge (conditional)
- ✅ `CHALLENGE_RETRY` - Retry sau khi fail (conditional)

### Conversion Events
- ✅ `CTA_CLICKED` - Click CTA button (optional)
- ✅ `ENDCARD_SHOWN` - Hiển thị endcard (optional)

## 📦 Cài đặt

Plugin đã được cài đặt tại: `Assets/Plugins/AppLovinAnalytics/`

Gồm 2 files chính:
- `AppLovinAnalytics.cs` - C# wrapper
- `AppLovinAnalytics.jslib` - JavaScript bridge

## 🚀 Cách sử dụng

### Basic Usage

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    void Start()
    {
        // 1. Track displayed (REQUIRED - luôn phải có)
        AppLovinAnalytics.TrackDisplayed();
    }
    
    public void OnStartGame()
    {
        // 2. Track challenge started khi user bắt đầu chơi
        AppLovinAnalytics.TrackChallengeStarted();
    }
    
    public void OnLevelComplete()
    {
        // 3. Track challenge solved khi hoàn thành
        AppLovinAnalytics.TrackChallengeSolved();
        
        // 4. Show endcard
        AppLovinAnalytics.TrackEndcardShown();
    }
    
    public void OnInstallButtonClick()
    {
        // 5. Track CTA clicked
        AppLovinAnalytics.TrackCTAClicked();
    }
}
```

### Với Loading Screen

```csharp
void Start()
{
    // Track loading start
    AppLovinAnalytics.TrackLoading();
    
    // Load resources...
    StartCoroutine(LoadResources());
}

IEnumerator LoadResources()
{
    // Loading logic...
    yield return new WaitForSeconds(2f);
    
    // Track loading complete
    AppLovinAnalytics.TrackLoaded();
    
    // Track displayed
    AppLovinAnalytics.TrackDisplayed();
}
```

### Tracking Progress

```csharp
public void UpdateGameProgress(int score, int maxScore)
{
    int progressPercent = (score * 100) / maxScore;
    
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
```

### Fail và Retry Flow

```csharp
public void OnGameOver()
{
    // Track failed
    AppLovinAnalytics.TrackChallengeFailed();
    
    // Show retry UI
    ShowRetryButton();
}

public void OnRetryButton()
{
    // Track retry
    AppLovinAnalytics.TrackChallengeRetry();
    
    // Restart game
    RestartGame();
}
```

## 📊 Event Flow khuyến nghị

### Success Flow (không có fail)
```
1. LOADING (optional)
2. LOADED (nếu có LOADING)
3. DISPLAYED (REQUIRED)
4. CHALLENGE_STARTED
5. CHALLENGE_PASS_25 (optional)
6. CHALLENGE_PASS_50 (optional)
7. CHALLENGE_PASS_75 (optional)
8. CHALLENGE_SOLVED
9. ENDCARD_SHOWN (optional)
10. CTA_CLICKED (optional)
```

### Fail và Retry Flow
```
1. DISPLAYED
2. CHALLENGE_STARTED
3. CHALLENGE_PASS_25
4. CHALLENGE_FAILED
5. CHALLENGE_RETRY
6. CHALLENGE_PASS_50
7. CHALLENGE_PASS_75
8. CHALLENGE_SOLVED
9. ENDCARD_SHOWN
10. CTA_CLICKED
```

## ⚠️ Lưu ý quan trọng

### 1. Event Requirements
- **DISPLAYED** là **BẮT BUỘC** - luôn phải track event này
- Nếu có `LOADING` → bắt buộc phải có `LOADED`
- Nếu có `CHALLENGE_STARTED` → bắt buộc phải có ít nhất 1 trong: `CHALLENGE_SOLVED` hoặc `CHALLENGE_FAILED`
- `CHALLENGE_RETRY` chỉ dùng sau `CHALLENGE_FAILED`

### 2. Khi nào KHÔNG nên dùng Analytics
- Playable có ít hơn 3 interactions để complete
- Playable redirect trong vòng dưới 5 giây từ first interaction
- Playable không có challenge (chỉ là interactive demo)

### 3. Challenge Failed vs Technical Error
- **KHÔNG** dùng `CHALLENGE_FAILED` cho:
  - Crashes
  - JS exceptions
  - Load failures
  - Timeouts do technical issues
- Chỉ dùng cho game over state do user fail

### 4. Endcard Definition
- `ENDCARD_SHOWN` chỉ dùng cho endcard/summary screen **bên trong** HTML playable
- **KHÔNG** dùng cho post-playable endcard template bên ngoài

## 🔍 Debugging

### Check Plugin Available
```csharp
if (AppLovinAnalytics.IsAvailable())
{
    Debug.Log("AppLovin Analytics is available!");
}
else
{
    Debug.Log("AppLovin Analytics is not available (Editor or not AppLovin network)");
}
```

### Editor Mode
- Trong Unity Editor, plugin sẽ log events ra Console thay vì call JavaScript
- Để test thực tế, cần build WebGL và test trên AppLovin platform

### Example Script
Xem `AppLovinAnalyticsExample.cs` để có đầy đủ example với test buttons.

## 📈 Metrics có thể track

### Performance Metrics
- Load success rates (LOADING, LOADED)
- Display performance (DISPLAYED)

### Engagement Metrics
- Challenge engagement rates (CHALLENGE_STARTED)
- Challenge progression (CHALLENGE_PASS_*)
- Completion rates (CHALLENGE_SOLVED)

### Conversion Metrics
- CTA performance (CTA_CLICKED)
- Endcard effectiveness (ENDCARD_SHOWN)

### Challenge Performance
- Success vs failure rates (CHALLENGE_SOLVED vs CHALLENGE_FAILED)
- Retry behavior (CHALLENGE_RETRY)

## 🛠️ Build Settings

Không cần config đặc biệt. Plugin tự động hoạt động khi build WebGL.

## 📝 License

Plugin này được tạo riêng cho project của bạn. Có thể sử dụng và chỉnh sửa tự do.

---

**Version:** 1.0.0  
**Last Updated:** 2026-07-22  
**Author:** Custom Plugin for AppLovin Analytics Integration
