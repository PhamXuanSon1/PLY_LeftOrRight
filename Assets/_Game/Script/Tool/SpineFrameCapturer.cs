#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using Spine.Unity;
using System.IO;
using System.Collections.Generic;

/// <summary>
/// Tool chụp ảnh từng frame của Spine animation trong Editor.
/// Mở từ menu: Tools/Spine/Spine Frame Capturer
/// </summary>
public class SpineFrameCapturer : EditorWindow
{
    // ────────────────────────────────────────────────
    //  TARGET
    // ────────────────────────────────────────────────
    private SkeletonAnimation targetSkeleton;
    private Camera            captureCamera;

    // ────────────────────────────────────────────────
    //  ANIMATION SETTINGS
    // ────────────────────────────────────────────────
    private string selectedAnimation = "";
    private int    animationIndex    = 0;
    private bool   loopAnimation     = false;

    // ────────────────────────────────────────────────
    //  FPS / FRAME SETTINGS
    // ────────────────────────────────────────────────
    private enum FpsPreset { FPS_12 = 12, FPS_24 = 24, FPS_30 = 30, FPS_60 = 60, Custom = 0 }
    private FpsPreset fpsPreset    = FpsPreset.FPS_30;
    private int       customFps    = 30;
    private int       startFrame   = 0;
    private int       endFrame     = -1;   // -1 = toàn bộ animation
    private bool      captureRange = false;

    // ────────────────────────────────────────────────
    //  OUTPUT SETTINGS
    // ────────────────────────────────────────────────
    private string outputFolder    = "Assets/_Game/SpineCaptures";
    private string filePrefix      = "frame_";
    private int    textureWidth    = 512;
    private int    textureHeight   = 512;
    private bool   transparentBG   = true;
    private Color  backgroundColor = new Color(0f, 0f, 0f, 0f);

    // ────────────────────────────────────────────────
    //  STATE
    // ────────────────────────────────────────────────
    private bool      isCapturing     = false;
    private int       currentFrame    = 0;
    private int       totalFrames     = 0;
    private float     captureProgress = 0f;
    private string    statusMessage   = "Sẵn sàng";
    private List<string> capturedFiles = new List<string>();

    // Preview
    private Texture2D previewTexture;
    private Vector2   scrollPos;

    // Style cache
    private GUIStyle  headerStyle;
    private GUIStyle  subHeaderStyle;
    private GUIStyle  statusStyle;
    private bool      stylesInit = false;

    // ────────────────────────────────────────────────
    //  COLORS
    // ────────────────────────────────────────────────
    private static readonly Color ColorAccent  = new Color(0.2f, 0.6f, 1f);
    private static readonly Color ColorSuccess = new Color(0.2f, 0.85f, 0.4f);
    private static readonly Color ColorWarning = new Color(1f, 0.75f, 0.1f);
    private static readonly Color ColorDanger  = new Color(1f, 0.3f, 0.3f);
    private static readonly Color ColorBg      = new Color(0.15f, 0.15f, 0.18f);
    private static readonly Color ColorCard    = new Color(0.2f, 0.2f, 0.24f);

    // ────────────────────────────────────────────────
    //  MENU
    // ────────────────────────────────────────────────
    [MenuItem("Tools/Spine/Spine Frame Capturer")]
    public static void Open()
    {
        var window = GetWindow<SpineFrameCapturer>("🎬 Spine Frame Capturer");
        window.minSize = new Vector2(420, 650);
    }

    // ────────────────────────────────────────────────
    //  INIT STYLES
    // ────────────────────────────────────────────────
    private void InitStyles()
    {
        if (stylesInit) return;
        stylesInit = true;

        headerStyle = new GUIStyle(EditorStyles.boldLabel)
        {
            fontSize  = 14,
            alignment = TextAnchor.MiddleLeft,
            normal    = { textColor = Color.white }
        };

        subHeaderStyle = new GUIStyle(EditorStyles.boldLabel)
        {
            fontSize  = 11,
            normal    = { textColor = new Color(0.8f, 0.8f, 0.8f) }
        };

        statusStyle = new GUIStyle(EditorStyles.label)
        {
            fontSize  = 11,
            wordWrap  = true,
            alignment = TextAnchor.MiddleLeft
        };
    }

    // ────────────────────────────────────────────────
    //  ON GUI
    // ────────────────────────────────────────────────
    private void OnGUI()
    {
        InitStyles();

        // Background tổng
        EditorGUI.DrawRect(new Rect(0, 0, position.width, position.height), ColorBg);

        scrollPos = EditorGUILayout.BeginScrollView(scrollPos);

        DrawHeader();
        DrawSectionTarget();
        DrawSectionAnimation();
        DrawSectionFPS();
        DrawSectionOutput();
        DrawSectionPreview();
        DrawSectionCapture();
        DrawStatusBar();

        EditorGUILayout.EndScrollView();
    }

    // ────────────────────────────────────────────────
    //  HEADER
    // ────────────────────────────────────────────────
    private void DrawHeader()
    {
        EditorGUILayout.Space(8);
        using (new EditorGUILayout.HorizontalScope())
        {
            GUILayout.Space(12);
            GUILayout.Label("🎬  Spine Frame Capturer", headerStyle);
        }

        // Divider
        Rect divider = GUILayoutUtility.GetRect(position.width, 1f);
        EditorGUI.DrawRect(divider, ColorAccent);
        EditorGUILayout.Space(6);
    }

    // ────────────────────────────────────────────────
    //  SECTION: TARGET
    // ────────────────────────────────────────────────
    private void DrawSectionTarget()
    {
        DrawCard(() =>
        {
            DrawSectionLabel("🎯  Target");
            EditorGUILayout.Space(4);

            targetSkeleton = (SkeletonAnimation)EditorGUILayout.ObjectField(
                "Skeleton Animation", targetSkeleton, typeof(SkeletonAnimation), true);

            captureCamera = (Camera)EditorGUILayout.ObjectField(
                "Capture Camera", captureCamera, typeof(Camera), true);

            if (captureCamera == null)
            {
                EditorGUILayout.HelpBox("Chưa gán Camera. Tool sẽ dùng Camera.main khi capture.", MessageType.Info);
            }

            if (targetSkeleton == null)
            {
                EditorGUILayout.HelpBox("Kéo SkeletonAnimation vào đây để bắt đầu.", MessageType.Warning);
            }
        });
    }

    // ────────────────────────────────────────────────
    //  SECTION: ANIMATION
    // ────────────────────────────────────────────────
    private void DrawSectionAnimation()
    {
        DrawCard(() =>
        {
            DrawSectionLabel("🎞  Animation");
            EditorGUILayout.Space(4);

            if (targetSkeleton == null ||
                targetSkeleton.SkeletonDataAsset == null ||
                targetSkeleton.SkeletonDataAsset.GetSkeletonData(false) == null)
            {
                EditorGUILayout.HelpBox("Cần gán SkeletonAnimation hợp lệ.", MessageType.Info);
                return;
            }

            // Lấy danh sách animation
            var skeletonData = targetSkeleton.SkeletonDataAsset.GetSkeletonData(false);
            var animations   = skeletonData.Animations;
            string[] animNames = new string[animations.Count];
            for (int i = 0; i < animations.Count; i++)
                animNames[i] = animations.Items[i].Name;

            animationIndex = EditorGUILayout.Popup("Animation", animationIndex,
                animNames.Length > 0 ? animNames : new[] { "<none>" });

            if (animNames.Length > 0 && animationIndex < animNames.Length)
                selectedAnimation = animNames[animationIndex];

            loopAnimation = EditorGUILayout.Toggle("Loop", loopAnimation);

            // Thời lượng animation
            if (!string.IsNullOrEmpty(selectedAnimation) && animations.Count > animationIndex)
            {
                float dur = animations.Items[animationIndex].Duration;
                int fps   = GetActiveFPS();
                int total = Mathf.CeilToInt(dur * fps);

                EditorGUILayout.Space(4);
                using (new EditorGUILayout.HorizontalScope())
                {
                    GUILayout.Label("Thời lượng:", GUILayout.Width(100));
                    GUILayout.Label($"{dur:F3}s  →  {total} frames @ {fps}fps",
                        EditorStyles.boldLabel);
                }

                // Range capture
                captureRange = EditorGUILayout.Toggle("Chỉ Capture Range", captureRange);
                if (captureRange)
                {
                    EditorGUI.indentLevel++;
                    startFrame = EditorGUILayout.IntSlider("Frame Bắt Đầu", startFrame, 0, total - 1);
                    endFrame   = EditorGUILayout.IntSlider("Frame Kết Thúc", endFrame < 0 ? total - 1 : endFrame, startFrame, total - 1);
                    EditorGUI.indentLevel--;
                }
                else
                {
                    startFrame = 0;
                    endFrame   = total - 1;
                }
            }
        });
    }

    // ────────────────────────────────────────────────
    //  SECTION: FPS
    // ────────────────────────────────────────────────
    private void DrawSectionFPS()
    {
        DrawCard(() =>
        {
            DrawSectionLabel("⏱  FPS & Frame Rate");
            EditorGUILayout.Space(4);

            fpsPreset = (FpsPreset)EditorGUILayout.EnumPopup("FPS Preset", fpsPreset);

            if (fpsPreset == FpsPreset.Custom)
            {
                EditorGUI.indentLevel++;
                customFps = EditorGUILayout.IntField("Custom FPS", customFps);
                customFps = Mathf.Clamp(customFps, 1, 240);
                EditorGUI.indentLevel--;
            }

            int activeFps = GetActiveFPS();
            float interval = 1f / activeFps;

            EditorGUILayout.Space(4);
            using (new EditorGUILayout.HorizontalScope())
            {
                DrawInfoChip($"Active FPS: {activeFps}");
                GUILayout.Space(6);
                DrawInfoChip($"Interval: {interval * 1000:F1}ms");
            }
        });
    }

    // ────────────────────────────────────────────────
    //  SECTION: OUTPUT
    // ────────────────────────────────────────────────
    private void DrawSectionOutput()
    {
        DrawCard(() =>
        {
            DrawSectionLabel("💾  Output");
            EditorGUILayout.Space(4);

            // Output folder
            using (new EditorGUILayout.HorizontalScope())
            {
                outputFolder = EditorGUILayout.TextField("Thư Mục Lưu", outputFolder);
                if (GUILayout.Button("...", GUILayout.Width(30)))
                {
                    string chosen = EditorUtility.OpenFolderPanel("Chọn Thư Mục Lưu", outputFolder, "");
                    if (!string.IsNullOrEmpty(chosen))
                    {
                        // Convert absolute path → relative if inside project
                        if (chosen.StartsWith(Application.dataPath))
                            outputFolder = "Assets" + chosen.Substring(Application.dataPath.Length);
                        else
                            outputFolder = chosen;
                    }
                }
            }

            filePrefix = EditorGUILayout.TextField("Tiền Tố File", filePrefix);

            EditorGUILayout.Space(4);
            using (new EditorGUILayout.HorizontalScope())
            {
                textureWidth  = EditorGUILayout.IntField("Chiều Rộng (px)", textureWidth);
                textureHeight = EditorGUILayout.IntField("Chiều Cao (px)", textureHeight);
            }

            // Resolution presets
            EditorGUILayout.BeginHorizontal();
            GUILayout.Label("Preset:", GUILayout.Width(50));
            if (GUILayout.Button("256²",  GUILayout.Height(20))) { textureWidth = 256;  textureHeight = 256; }
            if (GUILayout.Button("512²",  GUILayout.Height(20))) { textureWidth = 512;  textureHeight = 512; }
            if (GUILayout.Button("1024²", GUILayout.Height(20))) { textureWidth = 1024; textureHeight = 1024; }
            if (GUILayout.Button("1080p", GUILayout.Height(20))) { textureWidth = 1920; textureHeight = 1080; }
            EditorGUILayout.EndHorizontal();

            EditorGUILayout.Space(4);
            transparentBG = EditorGUILayout.Toggle("Nền Trong Suốt (PNG)", transparentBG);
            if (!transparentBG)
            {
                backgroundColor = EditorGUILayout.ColorField("Màu Nền", backgroundColor);
            }

            // Hiển thị preview path
            string previewPath = GetFullOutputPath(0);
            EditorGUILayout.Space(4);
            EditorGUILayout.LabelField("Ví dụ file:", EditorStyles.miniLabel);
            EditorGUILayout.SelectableLabel(previewPath,
                EditorStyles.helpBox, GUILayout.Height(32));
        });
    }

    // ────────────────────────────────────────────────
    //  SECTION: PREVIEW
    // ────────────────────────────────────────────────
    private void DrawSectionPreview()
    {
        if (previewTexture == null) return;

        DrawCard(() =>
        {
            DrawSectionLabel("🖼  Preview (Frame Cuối)");
            EditorGUILayout.Space(4);

            float aspectRatio = (float)previewTexture.height / previewTexture.width;
            float previewWidth = position.width - 60f;
            float previewHeight = previewWidth * aspectRatio;
            previewHeight = Mathf.Min(previewHeight, 200f);
            previewWidth  = previewHeight / aspectRatio;

            Rect previewRect = GUILayoutUtility.GetRect(previewWidth, previewHeight);
            previewRect.x = (position.width - previewWidth) / 2f;
            previewRect.width = previewWidth;
            GUI.DrawTexture(previewRect, previewTexture, ScaleMode.ScaleToFit);
        });
    }

    // ────────────────────────────────────────────────
    //  SECTION: CAPTURE CONTROLS
    // ────────────────────────────────────────────────
    private void DrawSectionCapture()
    {
        DrawCard(() =>
        {
            DrawSectionLabel("▶  Điều Khiển");
            EditorGUILayout.Space(6);

            if (!isCapturing)
            {
                bool canCapture = targetSkeleton != null && !string.IsNullOrEmpty(selectedAnimation);

                // --- Nút CAPTURE ---
                GUI.enabled = canCapture;
                GUI.backgroundColor = canCapture ? ColorSuccess : Color.gray;
                if (GUILayout.Button("▶  Bắt Đầu Capture", GUILayout.Height(40)))
                {
                    StartCapture();
                }
                GUI.backgroundColor = Color.white;
                GUI.enabled = true;

                GUILayout.Space(6);

                // --- Nút phụ ---
                using (new EditorGUILayout.HorizontalScope())
                {
                    GUI.backgroundColor = ColorAccent;
                    if (GUILayout.Button("📂  Mở Thư Mục Output", GUILayout.Height(28)))
                    {
                        OpenOutputFolder();
                    }
                    GUI.backgroundColor = ColorWarning;
                    if (GUILayout.Button("🗑  Xóa Captures", GUILayout.Height(28)))
                    {
                        if (EditorUtility.DisplayDialog("Xác nhận",
                            $"Xóa tất cả file trong '{outputFolder}'?", "Xóa", "Huỷ"))
                        {
                            DeleteCaptures();
                        }
                    }
                    GUI.backgroundColor = Color.white;
                }

                // Thống kê file đã chụp
                if (capturedFiles.Count > 0)
                {
                    EditorGUILayout.Space(6);
                    EditorGUILayout.LabelField($"✅  Đã chụp {capturedFiles.Count} frames lần trước.",
                        EditorStyles.miniLabel);
                }
            }
            else
            {
                // --- PROGRESS BAR ---
                EditorGUILayout.Space(4);
                string progressLabel = $"Frame {currentFrame} / {totalFrames}  ({captureProgress * 100f:F0}%)";
                EditorGUI.ProgressBar(
                    GUILayoutUtility.GetRect(position.width - 30, 22),
                    captureProgress,
                    progressLabel);

                EditorGUILayout.Space(8);
                GUI.backgroundColor = ColorDanger;
                if (GUILayout.Button("⏹  Dừng Capture", GUILayout.Height(36)))
                {
                    StopCapture("Người dùng dừng capture.");
                }
                GUI.backgroundColor = Color.white;
            }
        });
    }

    // ────────────────────────────────────────────────
    //  STATUS BAR
    // ────────────────────────────────────────────────
    private void DrawStatusBar()
    {
        EditorGUILayout.Space(6);
        using (new EditorGUILayout.HorizontalScope())
        {
            GUILayout.Space(12);
            statusStyle.normal.textColor = isCapturing ? ColorWarning : ColorSuccess;
            GUILayout.Label(statusMessage, statusStyle);
        }
        EditorGUILayout.Space(10);
    }

    // ════════════════════════════════════════════════
    //  CAPTURE LOGIC
    // ════════════════════════════════════════════════

    private void StartCapture()
    {
        if (targetSkeleton == null || string.IsNullOrEmpty(selectedAnimation)) return;

        // Validate
        if (!Directory.Exists(outputFolder))
            Directory.CreateDirectory(outputFolder);

        Camera cam = captureCamera != null ? captureCamera : Camera.main;
        if (cam == null)
        {
            EditorUtility.DisplayDialog("Lỗi", "Không tìm thấy Camera. Hãy gán Camera vào tool.", "OK");
            return;
        }

        capturedFiles.Clear();
        isCapturing = true;

        // Tính số frame
        var skeleton    = targetSkeleton.SkeletonDataAsset.GetSkeletonData(false);
        var anim        = skeleton.FindAnimation(selectedAnimation);
        if (anim == null)
        {
            StopCapture($"Không tìm thấy animation '{selectedAnimation}'.");
            return;
        }

        int fps         = GetActiveFPS();
        float duration  = anim.Duration;
        int totalF      = Mathf.CeilToInt(duration * fps);

        int frameStart  = captureRange ? Mathf.Clamp(startFrame, 0, totalF - 1) : 0;
        int frameEnd    = captureRange ? Mathf.Clamp(endFrame, frameStart, totalF - 1) : totalF - 1;

        totalFrames  = frameEnd - frameStart + 1;
        currentFrame = 0;

        statusMessage = $"Đang capture '{selectedAnimation}' — {fps}fps — {totalFrames} frames...";

        // Thực hiện capture
        DoCaptureAllFrames(cam, fps, duration, frameStart, frameEnd, totalF);
    }

    private void DoCaptureAllFrames(Camera cam, int fps, float duration,
                                    int frameStart, int frameEnd, int totalFrameCount)
    {
        // Tạo RenderTexture để render off-screen
        RenderTexture rt = new RenderTexture(textureWidth, textureHeight, 24, RenderTextureFormat.ARGB32);
        rt.antiAliasing = 1;
        rt.Create();

        Camera prevTarget = cam;
        RenderTexture prevCamRT = cam.targetTexture;
        CameraClearFlags prevClearFlags = cam.clearFlags;
        Color prevBgColor = cam.backgroundColor;

        // Set camera
        cam.targetTexture = rt;
        if (transparentBG)
        {
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = Color.clear;
        }
        else
        {
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = backgroundColor;
        }

        Texture2D tex2D = new Texture2D(textureWidth, textureHeight,
            transparentBG ? TextureFormat.RGBA32 : TextureFormat.RGB24, false);

        float frameInterval = 1f / fps;
        previewTexture      = null;

        try
        {
            for (int i = frameStart; i <= frameEnd; i++)
            {
                currentFrame = i - frameStart + 1;
                captureProgress = (float)currentFrame / totalFrames;

                float time = i * frameInterval;

                // Seek skeleton đến đúng thời điểm
                SeekSkeletonToTime(time, frameInterval);

                // Force render
                cam.Render();

                // Đọc pixel
                RenderTexture.active = rt;
                tex2D.ReadPixels(new Rect(0, 0, textureWidth, textureHeight), 0, 0);
                tex2D.Apply();
                RenderTexture.active = null;

                // Lưu PNG
                string path  = GetFullOutputPath(i);
                byte[] bytes = tex2D.EncodeToPNG();
                File.WriteAllBytes(path, bytes);
                capturedFiles.Add(path);

                // Lưu preview frame cuối
                if (i == frameEnd)
                {
                    previewTexture = new Texture2D(textureWidth, textureHeight,
                        tex2D.format, false);
                    previewTexture.SetPixels(tex2D.GetPixels());
                    previewTexture.Apply();
                }

                // Update progress bar
                statusMessage = $"Frame {currentFrame}/{totalFrames}  ({captureProgress * 100f:F0}%)  → {Path.GetFileName(path)}";
                Repaint();
            }

            statusMessage = $"✅ Hoàn thành! Đã lưu {capturedFiles.Count} frames vào '{outputFolder}'";
        }
        catch (System.Exception e)
        {
            statusMessage = $"❌ Lỗi: {e.Message}";
            Debug.LogError($"[SpineFrameCapturer] {e}");
        }
        finally
        {
            // Khôi phục camera
            cam.targetTexture   = prevCamRT;
            cam.clearFlags      = prevClearFlags;
            cam.backgroundColor = prevBgColor;

            rt.Release();
            DestroyImmediate(tex2D);
            DestroyImmediate(rt);

            isCapturing = false;
            AssetDatabase.Refresh();
            Repaint();
        }
    }

    /// <summary>
    /// Seek SkeletonAnimation đến đúng thời điểm <paramref name="time"/> giây.
    /// </summary>
    private void SeekSkeletonToTime(float time, float deltaTime)
    {
        if (targetSkeleton == null) return;

        var animState = targetSkeleton.AnimationState;
        var skeleton  = targetSkeleton.Skeleton;

        if (animState == null || skeleton == null) return;

        // Set animation nếu chưa set
        var currentEntry = animState.GetCurrent(0);
        if (currentEntry == null || currentEntry.Animation.Name != selectedAnimation)
        {
            animState.SetAnimation(0, selectedAnimation, loopAnimation);
        }

        // Seek track entry đến time
        var entry = animState.GetCurrent(0);
        if (entry != null)
        {
            entry.TrackTime = time;
        }

        // Step một delta nhỏ để apply
        animState.Update(0f);
        animState.Apply(skeleton);
        skeleton.UpdateWorldTransform(Spine.Skeleton.Physics.Update);

        // Force mesh update
        targetSkeleton.LateUpdate();
    }

    private void StopCapture(string reason)
    {
        isCapturing   = false;
        statusMessage = $"⏹ Đã dừng: {reason}";
        Repaint();
    }

    // ════════════════════════════════════════════════
    //  HELPERS
    // ════════════════════════════════════════════════

    private int GetActiveFPS()
    {
        if (fpsPreset == FpsPreset.Custom) return Mathf.Max(1, customFps);
        return (int)fpsPreset;
    }

    private string GetFullOutputPath(int frameIndex)
    {
        string animName = string.IsNullOrEmpty(selectedAnimation) ? "anim" : selectedAnimation;
        animName = animName.Replace(" ", "_").Replace("/", "-");
        string filename = $"{filePrefix}{animName}_{frameIndex:D4}.png";
        return Path.Combine(outputFolder, filename);
    }

    private void OpenOutputFolder()
    {
        string absPath = Path.GetFullPath(outputFolder);
        if (!Directory.Exists(absPath))
        {
            Directory.CreateDirectory(absPath);
            AssetDatabase.Refresh();
        }
        EditorUtility.RevealInFinder(absPath);
    }

    private void DeleteCaptures()
    {
        string absPath = Path.GetFullPath(outputFolder);
        if (!Directory.Exists(absPath)) return;

        var files = Directory.GetFiles(absPath, "*.png");
        foreach (string f in files) File.Delete(f);

        capturedFiles.Clear();
        previewTexture = null;
        AssetDatabase.Refresh();
        statusMessage  = $"🗑 Đã xóa {files.Length} file PNG trong '{outputFolder}'.";
        Repaint();
    }

    // ════════════════════════════════════════════════
    //  UI HELPERS
    // ════════════════════════════════════════════════

    private void DrawCard(System.Action content)
    {
        EditorGUILayout.Space(4);
        Rect rect = EditorGUILayout.BeginVertical(GUILayout.MinHeight(10));
        EditorGUI.DrawRect(new Rect(rect.x + 8, rect.y, rect.width - 16, rect.height), ColorCard);
        GUILayout.Space(8);
        GUILayout.BeginHorizontal();
        GUILayout.Space(16);
        GUILayout.BeginVertical();
        content?.Invoke();
        GUILayout.EndVertical();
        GUILayout.Space(8);
        GUILayout.EndHorizontal();
        GUILayout.Space(8);
        EditorGUILayout.EndVertical();
    }

    private void DrawSectionLabel(string text)
    {
        EditorGUILayout.LabelField(text, subHeaderStyle);
        Rect r = GUILayoutUtility.GetRect(position.width - 40, 1f);
        EditorGUI.DrawRect(r, new Color(1f, 1f, 1f, 0.07f));
    }

    private void DrawInfoChip(string text)
    {
        var chipStyle = new GUIStyle(EditorStyles.miniLabel)
        {
            normal   = { textColor = ColorAccent },
            fontStyle = FontStyle.Bold
        };
        GUILayout.Label(text, chipStyle);
    }
}
#endif
