# Testing AppLovin Analytics Plugin trên Luna

## 🎯 Overview

Hướng dẫn step-by-step để test AppLovin Analytics plugin trên Luna platform.

---

## 📋 Bước 1: Setup Test Scene

### Option A: Sử dụng Test Helper Script (Khuyến nghị)

1. **Tạo một Canvas UI mới:**
   - Right-click trong Hierarchy → UI → Canvas
   - Tên: `LunaTestCanvas`

2. **Add Text element:**
   - Right-click Canvas → TextMeshPro - Text
   - Tên: `EventLog`
   - Adjust size để full canvas

3. **Attach Test Helper Script:**
   - Tạo empty GameObject: `LunaTestHelper`
   - Attach script: `LunaAppLovinAnalyticsTestHelper.cs`
   - Drag EventLog text vào `Log Text` field

4. **Run trong Play Mode:**
   - Sẽ thấy event log trên screen + Unity Console

### Option B: Manual Tracking trong Game

```csharp
void Start()
{
    // Check availability
    if (AppLovinAnalytics.IsAvailable())
    {
        Debug.Log("AppLovin Analytics Available!");
    }
    
    // Track displayed
    AppLovinAnalytics.TrackDisplayed();
}

void Update()
{
    if (Input.GetKeyDown(KeyCode.S))
    {
        AppLovinAnalytics.TrackChallengeStarted();
    }
    
    if (Input.GetKeyDown(KeyCode.W))
    {
        AppLovinAnalytics.TrackChallengeSolved();
    }
}
```

---

## 🔨 Bước 2: Build WebGL cho Luna

### Cách 1: Sử dụng Luna CLI

```bash
cd d:\TrashProject\TestSpawn3dObject
luna build
```

### Cách 2: Manual Build

1. **Build Settings:**
   - File → Build Settings
   - Switch Platform → WebGL
   - Scenes: Chọn scene chứa test script

2. **Build:**
   - Build (không Play) → chọn output folder

3. **Package cho Luna:**
   ```bash
   luna package ./Builds/WebGL
   ```

---

## 🌐 Bước 3: Test trên Luna Platform

### Method 1: Luna Console (Recommended)

1. **Upload playable lên Luna:**
   - Login vào https://applovin.com/
   - Creative → Playables
   - Upload WebGL build

2. **Open Browser DevTools:**
   - F12 hoặc Right-click → Inspect
   - Tab: Console

3. **Monitor Events:**
   ```javascript
   // Gõ trong Console để verify events được track:
   window.ALPlayableAnalytics
   
   // Check nếu object này available = plugin hoạt động
   ```

4. **Click buttons trong playable:**
   - Observe Console logs: `[AppLovin Analytics] Event tracked: ...`
   - Check Luna Dashboard → Analytics

### Method 2: Local Testing (Trước upload)

1. **Create local HTML test file:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>AppLovin Analytics Test</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { margin: 0; overflow: hidden; }
        #gameContainer { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="gameContainer"></div>
    
    <!-- Simulate AppLovin SDK -->
    <script>
        window.ALPlayableAnalytics = {
            trackEvent: function(eventName) {
                console.log('[ALPlayableAnalytics] Event: ' + eventName);
                console.log('Timestamp: ' + new Date().toISOString());
            }
        };
    </script>
    
    <!-- Your Unity WebGL build -->
    <script src="Build/UnityLoader.js"></script>
    <script>
        UnityLoader.instantiate("gameContainer", "Build/build.json");
    </script>
</body>
</html>
```

2. **Run local server:**
   ```bash
   python -m http.server 8000
   # hoặc
   npx http-server
   ```

3. **Open http://localhost:8000**
   - F12 → Console
   - Click buttons → Monitor events

---

## 🔍 Bước 4: Verify Events

### Check Unity Console
```
[AppLovin Analytics] Event tracked: DISPLAYED
[AppLovin Analytics] Event tracked: CHALLENGE_STARTED
[AppLovin Analytics] Event tracked: CHALLENGE_PASS_25
...
```

### Check Browser Console (DevTools)
```
[AppLovin Analytics] Event tracked: DISPLAYED
[ALPlayableAnalytics] Event: DISPLAYED
Timestamp: 2026-07-22T10:30:45.123Z
```

### Check Luna Dashboard
1. Đăng nhập Luna
2. Creative → Analytics
3. Xem real-time events:
   - Impressions
   - Events by type
   - User engagement

---

## 📊 Expected Event Sequence

### Success Flow Test:
```
1. ✅ DISPLAYED (auto on scene load)
2. ✅ CHALLENGE_STARTED (click button)
3. ✅ CHALLENGE_PASS_25 (click button)
4. ✅ CHALLENGE_PASS_50 (click button)
5. ✅ CHALLENGE_PASS_75 (click button)
6. ✅ CHALLENGE_SOLVED (click button)
7. ✅ ENDCARD_SHOWN (click button)
8. ✅ CTA_CLICKED (click button)
```

### Failure & Retry Flow Test:
```
1. ✅ DISPLAYED
2. ✅ CHALLENGE_STARTED
3. ✅ CHALLENGE_PASS_25
4. ✅ CHALLENGE_FAILED (click button)
5. ✅ CHALLENGE_RETRY (click button)
6. ✅ CHALLENGE_PASS_50
7. ✅ CHALLENGE_SOLVED
```

---

## 🐛 Troubleshooting

### Events không được track

**Kiểm tra 1: Plugin Available?**
```csharp
if (!AppLovinAnalytics.IsAvailable())
{
    Debug.LogWarning("AppLovin Analytics not available!");
    // - Không phải WebGL build
    // - Không chạy trên AppLovin network
    // - SDK chưa load
}
```

**Kiểm tra 2: Console errors?**
- F12 → Console tab
- Tìm red errors
- Check jslib bridge có được load không

**Kiểm tra 3: JavaScript Object?**
```javascript
// Trong DevTools console:
typeof window.ALPlayableAnalytics
// Nếu 'undefined' = SDK chưa inject
// Nếu 'object' = SDK loaded correctly
```

### Build WebGL có lỗi

**Error: "jslib not found"**
- Confirm `AppLovinAnalytics.jslib` ở đúng folder: `Assets/Plugins/AppLovinAnalytics/`
- File extension phải `.jslib` (không `.js`)

**Error: "Can't compile"**
- Check script không có syntax error
- Verify import statements

### Luna build fail

**Lỗi upload:**
```bash
# Verify build folder structure:
Build/
  ├── build.json
  ├── build.wasm
  ├── build.js
  └── ...

# Check luna.json config:
cat luna.json | grep -A 5 "unity"
```

---

## ✅ Success Checklist

- [ ] Test Helper script attached vào Canvas
- [ ] Play mode → thấy event buttons
- [ ] Click "DISPLAYED" → log appear
- [ ] Build WebGL successfully
- [ ] Upload lên Luna
- [ ] Browser console show "[ALPlayableAnalytics] Event:"
- [ ] Luna Dashboard show event counts
- [ ] Event sequence follow recommended order

---

## 📈 Monitoring Events trên Luna Dashboard

1. **Analytics Tab:**
   - Xem event counts
   - Engagement rates
   - Completion rates

2. **Real-time Events:**
   - Check event names
   - Verify timestamps
   - Monitor user retention

3. **Custom Dashboard:**
   - Filter by event type
   - Compare success vs failure rates
   - Track conversion funnel

---

## 🎬 Quick Test Flow

**Nhân viên Luna:**
```
1. Attach LunaAppLovinAnalyticsTestHelper vào scene
2. Build → Upload
3. Mở playable trên Luna
4. Click các buttons theo sequence
5. F12 → Check console logs
6. Luna Dashboard → Verify analytics
7. Done! ✅
```

---

## 📝 Notes

- **Editor Mode:** Plugin sẽ log event names ra console (không call JavaScript)
- **WebGL Build:** Plugin sẽ call JavaScript `ALPlayableAnalytics.trackEvent()`
- **Luna Platform:** `ALPlayableAnalytics` tự động inject từ SDK
- **Local Testing:** Cần mock `ALPlayableAnalytics` object (xem HTML example)

---

**Version:** 1.0.0  
**Last Updated:** 2026-07-22
