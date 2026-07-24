# Hướng dẫn Test AppLovin Analytics Plugin trên Luna

## 🎯 Overview

Bạn đã setup test UI xong. Bây giờ ta sẽ:
1. Build WebGL
2. Upload lên Luna
3. Test trên Luna platform
4. Verify events

**Estimated time:** 15-20 phút

---

## 📋 Bước 1: Chuẩn bị Build Settings

### 1.1 Verify Scene

```
File → Build Settings
```

**Checklist:**
- ✅ Scenes In Build: Select scene có LunaAppLovinAnalyticsTestHelper
- ✅ Platform: WebGL (nếu chưa, Click "Switch Platform")
- ✅ Compression Format: Brotli (recommended)
- ✅ Decompression Fallback: ✅ (checked)

### 1.2 Player Settings (Optional nhưng recommended)

```
File → Build Settings → Player Settings
```

Trong "Player" tab:
- **Product Name:** "AppLovin Analytics Test"
- **Company Name:** Có thể leave mặc định
- **Resolution and Presentation:**
  - Default Width: 1280
  - Default Height: 720
  - WebGL Canvas: Full Screen

---

## 🔨 Bước 2: Build WebGL

### Method A: Sử dụng Luna CLI (Recommended ⭐)

**Chuẩn bị:**
```bash
# Check Luna CLI installed
luna --version
```

**Build:**
```bash
cd d:\TrashProject\TestSpawn3dObject

# Build cho Luna
luna build
```

✅ Output sẽ ở: `Builds/Luna/` hoặc `LunaTemp/stage4/`

---

### Method B: Manual WebGL Build

1. **File → Build Settings**
2. **Click "Build"**
3. **Chọn output folder:** 
   ```
   d:\TrashProject\TestSpawn3dObject\Builds\WebGL
   ```
4. **Click "Save"** → Chờ build hoàn thành

✅ Build folder sẽ có:
```
Builds/WebGL/
├── Build/
│   ├── build.wasm
│   ├── build.js
│   ├── build.json
│   └── ...
├── TemplateData/
└── index.html
```

---

## 📤 Bước 3: Upload lên Luna Platform

### 3.1 Login vào Luna Console

1. Mở https://console.applovin.com/
2. Đăng nhập tài khoản AppLovin
3. Chọn project của bạn

### 3.2 Tạo Playable Mới

**Path:**
```
Creative → Playables → Create New Playable
```

**Form:**
```
Playable Name: "AppLovin Analytics Test v1.0"
Type: "HTML5"
Format: "Vertical" hoặc "Horizontal" (tùy test UI của bạn)
```

### 3.3 Upload WebGL Build

**Select Build Folder:**
- Click "Select Folder" hoặc "Upload"
- Chọn: `d:\TrashProject\TestSpawn3dObject\Builds\WebGL\`
- **Hoặc** zip folder rồi upload file zip

**Verify Files:**
```
✅ index.html
✅ Build/build.wasm
✅ Build/build.js
✅ Build/build.json
✅ TemplateData/
```

### 3.4 Submit

- Click "Upload" hoặc "Create"
- Chờ processing (1-5 phút)
- Sẽ thấy status: "Processing" → "Ready"

---

## 🧪 Bước 4: Test trên Luna Preview

### 4.1 Open Preview

```
Creative → Playables → [Your Playable Name]
Click "Preview" hoặc "Test"
```

Playable sẽ load trong browser.

### 4.2 Verify Playable Loaded

- ✅ UI bersih load
- ✅ Event log visible
- ✅ Test buttons visible
- ✅ Tidak có error console

Nếu có issues, xem [Troubleshooting](#troubleshooting).

---

## 🔍 Bước 5: Test Events

### 5.1 Open Browser DevTools

```
Press: F12
Tab: Console
```

### 5.2 Test Event Flow

**Sequence nên test:**

```
1. Clear Log (UI button)
   → Check: "Clear Log" event mới nhất

2. Click "DISPLAYED" (hoặc auto tracked)
   Console sẽ show:
   ✅ [AppLovin Analytics] Event tracked: DISPLAYED

3. Click "CHALLENGE_STARTED"
   Console:
   ✅ [AppLovin Analytics] Event tracked: CHALLENGE_STARTED

4. Click "CHALLENGE_PASS_25"
   Console:
   ✅ [AppLovin Analytics] Event tracked: CHALLENGE_PASS_25

5. Click "CHALLENGE_PASS_50"
   ✅ CHALLENGE_PASS_50

6. Click "CHALLENGE_PASS_75"
   ✅ CHALLENGE_PASS_75

7. Click "CHALLENGE_SOLVED"
   ✅ CHALLENGE_SOLVED

8. Click "ENDCARD_SHOWN"
   ✅ ENDCARD_SHOWN

9. Click "CTA_CLICKED"
   ✅ CTA_CLICKED
```

### 5.3 Expected Console Output

```javascript
[AppLovin Analytics] Event tracked: DISPLAYED
[ALPlayableAnalytics] Event: DISPLAYED
Timestamp: 2026-07-22T10:30:45.123Z

[AppLovin Analytics] Event tracked: CHALLENGE_STARTED
[ALPlayableAnalytics] Event: CHALLENGE_STARTED
Timestamp: 2026-07-22T10:30:46.456Z

// ... more events ...
```

---

## 📊 Bước 6: Verify trên Luna Analytics

### 6.1 Check Analytics Dashboard

**Path:**
```
Creative → Playables → [Your Playable] → Analytics
```

### 6.2 Metrics to Check

| Metric | Expected | Notes |
|--------|----------|-------|
| **Impressions** | 1+ | Playable được load 1 lần |
| **Events by Type** | Display ✅ | DISPLAYED event recorded |
| **Challenge Events** | Multiple | CHALLENGE_* events showing |
| **Completion Rate** | 1 (100%) | Hoàn thành challenge |
| **Event Timeline** | Sequential | Events in correct order |

### 6.3 Detailed Event View

Click vào event type để xem:
- ✅ Event name
- ✅ Timestamp
- ✅ Event count
- ✅ User engagement

---

## ✅ Success Verification Checklist

**Playable Load:**
- [ ] Playable load không error
- [ ] Test UI visible
- [ ] Event log visible

**Console Events:**
- [ ] "[AppLovin Analytics] Event tracked:" appear
- [ ] "[ALPlayableAnalytics] Event:" appear
- [ ] Timestamps correct

**Analytics Dashboard:**
- [ ] Impressions: 1+
- [ ] Events recorded: 8+ (DISPLAYED + challenge events)
- [ ] Timeline sequential
- [ ] Real-time update

**Functionality:**
- [ ] All buttons clickable
- [ ] Log scrolls properly
- [ ] Clear button works
- [ ] No JavaScript errors (F12 → ❌ no red errors)

---

## 🐛 Troubleshooting

### Problem 1: "Playable not loading"

**Check:**
```javascript
// In console:
typeof window.ALPlayableAnalytics
// Should be: 'object' (not 'undefined')
```

**Solutions:**
1. Check network tab (F12) for failed requests
2. Verify all files uploaded correctly
3. Check index.html has correct paths
4. Rebuild and reupload

---

### Problem 2: "Events not appearing in console"

**Check:**
```javascript
// In console:
console.log(window.ALPlayableAnalytics)
// Should show object with trackEvent method
```

**Solutions:**
1. Verify `ALPlayableAnalytics.trackEvent()` being called
2. Check Script có `jslib` attached correct
3. Rebuild WebGL with fresh build
4. Clear browser cache (Ctrl+Shift+Delete)

---

### Problem 3: "Analytics Dashboard shows no events"

**Check:**
1. Wait 5-10 minutes (dashboard updates delay)
2. Refresh dashboard page
3. Check impressions > 0
4. Look at "Real-time" tab

**Solutions:**
1. Test again with fresh playable load
2. Check browser console show "[ALPlayableAnalytics]" logs
3. Verify correct playable selected in dashboard

---

### Problem 4: "WebGL Build Upload Failed"

**Check:**
```bash
# Verify build structure
dir d:\TrashProject\TestSpawn3dObject\Builds\WebGL

# Should show:
# Build/ (folder)
# TemplateData/ (folder)
# index.html (file)
```

**Solutions:**
1. Rebuild: Delete `Builds/` folder, rebuild from scratch
2. Zip build folder, upload .zip instead
3. Check Luna supports WebGL (should be default)

---

## 🎬 Example: Full Test Walkthrough

### Time: 5 minutes

```
1. [0:00] Open playable preview in Luna
2. [0:30] Press F12 → Console tab
3. [1:00] Click "DISPLAYED" button
         → Verify: "[AppLovin Analytics] Event tracked: DISPLAYED"
4. [1:30] Click "CHALLENGE_STARTED"
         → Verify event in console
5. [2:00] Click "CHALLENGE_PASS_25", "50", "75"
         → Verify each event
6. [3:00] Click "CHALLENGE_SOLVED"
         → Verify event
7. [3:30] Click "CTA_CLICKED"
         → Verify event
8. [4:00] Wait 10s
9. [4:30] Refresh Luna Analytics dashboard
         → Verify events showing
10.[5:00] Success! ✅
```

---

## 📝 Notes

- **First time:** Dashboard may take 5-10 minutes to update
- **Event Validation:** Console logs are immediate, Dashboard is delayed
- **Browser Cache:** If seeing old version, do Ctrl+Shift+Delete (full cache clear)
- **Console Persistence:** Check "Preserve log" checkbox in console (persistence across navigations)
- **Mobile Testing:** Can test on mobile device if Luna supports (check platform requirements)

---

## 🎓 Next Steps After Successful Test

1. ✅ Plugin confirmed working on Luna
2. ✅ Events being tracked correctly
3. ✅ Dashboard analytics populated

**Next:**
- Integrate `AppLovinAnalytics.Track*()` calls into your actual game logic
- Replace test buttons with real game events
- Monitor analytics dashboard during gameplay
- Optimize event sequence if needed

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-07-22  
**Status:** Ready to test
