using UnityEngine;
using UnityEditor;

public class SpineTextureFixerTool : EditorWindow
{
    [MenuItem("Tools/Spine/Bật 'Alpha Is Transparency' cho ảnh đã chọn")]
    public static void FixAlphaIsTransparency()
    {
        // Lấy danh sách các texture đang được bôi đen trong Project
        Texture2D[] selectedTextures = Selection.GetFiltered<Texture2D>(SelectionMode.Assets);

        if (selectedTextures.Length == 0)
        {
            Debug.LogWarning("[Spine Fixer] Vui lòng chọn ít nhất 1 ảnh (Texture) trong thư mục Project!");
            return;
        }

        int count = 0;
        foreach (Texture2D tex in selectedTextures)
        {
            string path = AssetDatabase.GetAssetPath(tex);
            TextureImporter importer = AssetImporter.GetAtPath(path) as TextureImporter;

            if (importer != null)
            {
                // Kiểm tra xem ảnh đã bật Alpha Is Transparency chưa
                if (!importer.alphaIsTransparency)
                {
                    importer.alphaIsTransparency = true;
                    importer.SaveAndReimport();
                    count++;
                    Debug.Log($"[Spine Fixer] Đã sửa lỗi viền đen thành công cho ảnh: {tex.name}");
                }
            }
        }

        if (count > 0)
        {
            EditorUtility.DisplayDialog("Hoàn thành", $"Đã bật thành công 'Alpha Is Transparency' cho {count} ảnh!", "OK");
        }
        else
        {
            EditorUtility.DisplayDialog("Thông báo", "Các ảnh bạn chọn đều ĐÃ ĐƯỢC bật sẵn tính năng này rồi, không cần sửa thêm!", "OK");
        }
    }
}
