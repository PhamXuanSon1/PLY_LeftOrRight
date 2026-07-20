using UnityEngine;
using UnityEditor;
using System.IO;

public class TextureResizerTool : EditorWindow
{
    private int targetWidth = 512;
    private int targetHeight = 512;
    private float scaleFactor = 0.5f;
    private bool keepAspectRatio = true;
    private bool useWidthAsBase = true;

    [MenuItem("Tools/Texture Resizer")]
    public static void ShowWindow()
    {
        GetWindow<TextureResizerTool>("Texture Resizer");
    }

    private void OnGUI()
    {
        GUILayout.Label("Texture Resizer Tool", EditorStyles.boldLabel);
        EditorGUILayout.Space();

        // Lấy danh sách các texture đang được chọn trong cửa sổ Project
        Texture2D[] selectedTextures = Selection.GetFiltered<Texture2D>(SelectionMode.Assets);

        if (selectedTextures.Length == 0)
        {
            EditorGUILayout.HelpBox("Hãy chọn một hoặc nhiều ảnh (Textures) trong cửa sổ Project.", MessageType.Warning);
            GUI.enabled = false;
        }
        else
        {
            EditorGUILayout.HelpBox($"Đã chọn {selectedTextures.Length} ảnh.", MessageType.Info);
        }

        EditorGUILayout.Space();

        // --- 1. Thay đổi theo kích thước cố định ---
        GUILayout.Label("1. Thay đổi theo kích thước tuỳ chỉnh:", EditorStyles.boldLabel);
        
        keepAspectRatio = EditorGUILayout.Toggle("Giữ tỷ lệ gốc", keepAspectRatio);
        
        if (keepAspectRatio)
        {
            useWidthAsBase = EditorGUILayout.Toggle("Dựa theo Width", useWidthAsBase);
            if (useWidthAsBase)
            {
                targetWidth = EditorGUILayout.IntField("Width mong muốn", targetWidth);
            }
            else
            {
                targetHeight = EditorGUILayout.IntField("Height mong muốn", targetHeight);
            }
        }
        else
        {
            EditorGUILayout.BeginHorizontal();
            targetWidth = EditorGUILayout.IntField("Width", targetWidth);
            targetHeight = EditorGUILayout.IntField("Height", targetHeight);
            EditorGUILayout.EndHorizontal();
        }

        if (GUILayout.Button(keepAspectRatio ? "Resize (Giữ tỷ lệ)" : "Resize theo Width & Height"))
        {
            foreach (var tex in selectedTextures)
            {
                int finalWidth = targetWidth;
                int finalHeight = targetHeight;

                if (keepAspectRatio)
                {
                    if (useWidthAsBase)
                    {
                        finalWidth = targetWidth;
                        finalHeight = Mathf.RoundToInt((float)tex.height / tex.width * targetWidth);
                    }
                    else
                    {
                        finalHeight = targetHeight;
                        finalWidth = Mathf.RoundToInt((float)tex.width / tex.height * targetHeight);
                    }
                }

                ResizeTexture(tex, finalWidth, finalHeight);
            }
        }

        EditorGUILayout.Space();

        // --- 2. Thay đổi theo tỷ lệ ---
        GUILayout.Label("2. Thay đổi theo tỷ lệ (Scale):", EditorStyles.boldLabel);
        scaleFactor = EditorGUILayout.Slider("Scale Factor", scaleFactor, 0.1f, 2.0f);
        if (GUILayout.Button($"Resize bằng {Mathf.RoundToInt(scaleFactor * 100)}%"))
        {
            foreach (var tex in selectedTextures)
            {
                int newWidth = Mathf.Max(1, Mathf.RoundToInt(tex.width * scaleFactor));
                int newHeight = Mathf.Max(1, Mathf.RoundToInt(tex.height * scaleFactor));
                ResizeTexture(tex, newWidth, newHeight);
            }
        }

        EditorGUILayout.Space();

        // --- 3. Đưa về kích thước chuẩn NPOT -> POT ---
        GUILayout.Label("3. Sửa lỗi NPOT (Đưa về kích thước chuẩn POT):", EditorStyles.boldLabel);
        if (GUILayout.Button("Ép về Power of Two gần nhất (ví dụ: 427x594 -> 512x512)"))
        {
            foreach (var tex in selectedTextures)
            {
                int newWidth = Mathf.ClosestPowerOfTwo(tex.width);
                int newHeight = Mathf.ClosestPowerOfTwo(tex.height);
                ResizeTexture(tex, newWidth, newHeight);
            }
        }

        GUI.enabled = true;
    }

    private void ResizeTexture(Texture2D sourceTex, int newWidth, int newHeight)
    {
        string path = AssetDatabase.GetAssetPath(sourceTex);
        if (string.IsNullOrEmpty(path)) return;

        TextureImporter importer = AssetImporter.GetAtPath(path) as TextureImporter;
        if (importer == null) return;

        // Lưu lại cấu hình cũ để trả về sau khi resize xong
        bool wasReadable = importer.isReadable;
        TextureImporterCompression previousCompression = importer.textureCompression;

        // Cần bật Read/Write và tắt nén để lấy được data pixel chính xác nhất
        if (!wasReadable || previousCompression != TextureImporterCompression.Uncompressed)
        {
            importer.isReadable = true;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.SaveAndReimport();
        }

        // Tạo RenderTexture để scale ảnh bằng GPU (chất lượng bilinear mượt mà)
        RenderTexture rt = RenderTexture.GetTemporary(newWidth, newHeight, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.Default);
        rt.filterMode = FilterMode.Bilinear;

        RenderTexture.active = rt;
        Graphics.Blit(sourceTex, rt);

        // Đọc pixel từ RenderTexture ra một Texture2D mới
        Texture2D result = new Texture2D(newWidth, newHeight, TextureFormat.RGBA32, false);
        result.ReadPixels(new Rect(0, 0, newWidth, newHeight), 0, 0);
        result.Apply();

        RenderTexture.active = null;
        RenderTexture.ReleaseTemporary(rt);

        // Trả lại cấu hình cho file gốc
        if (!wasReadable || previousCompression != TextureImporterCompression.Uncompressed)
        {
            importer.isReadable = wasReadable;
            importer.textureCompression = previousCompression;
            importer.SaveAndReimport();
        }

        byte[] bytes;
        string extension = Path.GetExtension(path).ToLower();

        // Ghi lại file dựa theo đuôi mở rộng
        if (extension == ".png")
            bytes = result.EncodeToPNG();
        else if (extension == ".jpg" || extension == ".jpeg")
            bytes = result.EncodeToJPG(100);
        else if (extension == ".tga")
            bytes = result.EncodeToTGA();
        else
        {
            // Với các file như PSD, BMP, TIF, thay vì ghi đè làm lỗi file, ta lưu thành PNG mới
            Debug.LogWarning($"[Texture Resizer] Không hỗ trợ ghi đè trực tiếp định dạng {extension}. Tạo file PNG mới thay thế.");
            path = Path.ChangeExtension(path, ".png");
            bytes = result.EncodeToPNG();
        }

        File.WriteAllBytes(path, bytes);
        AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceUpdate);

        Debug.Log($"[Texture Resizer] Đã resize thành công: {sourceTex.name} về kích thước {newWidth}x{newHeight}");
    }
}
