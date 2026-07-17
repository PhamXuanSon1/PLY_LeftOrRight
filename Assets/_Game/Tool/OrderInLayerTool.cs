#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using UnityEngine.Rendering; // Dùng cho SortingGroup nếu có

/// <summary>
/// Tool hỗ trợ cộng/trừ hàng loạt giá trị Order in Layer cho các object con.
/// </summary>
public class OrderInLayerTool : EditorWindow
{
    private int valueToAdd = 1;
    private bool includeParent = false;
    private bool includeInactive = true;

    [MenuItem("Tools/Modify Order In Layer")]
    public static void ShowWindow()
    {
        GetWindow<OrderInLayerTool>("Order In Layer");
    }

    private void OnGUI()
    {
        GUILayout.Label("Công cụ chỉnh Order in Layer hàng loạt", EditorStyles.boldLabel);
        
        GUILayout.Space(10);
        valueToAdd = EditorGUILayout.IntField("Giá trị cộng thêm", valueToAdd);
        GUILayout.Label("(Nhập số âm nếu muốn trừ đi)", EditorStyles.miniLabel);

        GUILayout.Space(10);
        includeParent = EditorGUILayout.Toggle("Áp dụng cả cho Obj Cha", includeParent);
        includeInactive = EditorGUILayout.Toggle("Áp dụng cho cả Obj đang tắt", includeInactive);

        GUILayout.Space(20);

        // Nút bấm chính
        GUI.backgroundColor = Color.green;
        if (GUILayout.Button("Áp Dụng Cho Object Đang Chọn", GUILayout.Height(40)))
        {
            ApplyOrderInLayer();
        }
        GUI.backgroundColor = Color.white;

        GUILayout.Space(15);
        EditorGUILayout.HelpBox("HƯỚNG DẪN:\n1. Mở cửa sổ này.\n2. Chọn 1 hoặc nhiều Object cha ở cửa sổ Hierarchy.\n3. Nhập số cần cộng.\n4. Bấm Áp dụng.\n(Tool có hỗ trợ Ctrl+Z nếu lỡ bấm nhầm)", MessageType.Info);
    }

    private void ApplyOrderInLayer()
    {
        // Kiểm tra xem có đang chọn object nào không
        if (Selection.gameObjects.Length == 0)
        {
            Debug.LogWarning("[Tool] Bạn chưa chọn Object nào trong Hierarchy!");
            return;
        }

        int count = 0;

        // Duyệt qua tất cả các Object đang được chọn
        foreach (GameObject selectedObj in Selection.gameObjects)
        {
            // 1. Tìm tất cả Renderer (SpriteRenderer, MeshRenderer...)
            Renderer[] renderers = selectedObj.GetComponentsInChildren<Renderer>(includeInactive);
            foreach (Renderer r in renderers)
            {
                // Bỏ qua object cha nếu user không tick chọn
                if (!includeParent && r.gameObject == selectedObj) continue;

                Undo.RecordObject(r, "Change Order In Layer"); // Ghi lại lịch sử để có thể Ctrl + Z
                r.sortingOrder += valueToAdd;
                EditorUtility.SetDirty(r);
                count++;
            }

            // 2. Tìm tất cả SortingGroup (nếu bạn có xài Group)
            SortingGroup[] sortingGroups = selectedObj.GetComponentsInChildren<SortingGroup>(includeInactive);
            foreach (SortingGroup sg in sortingGroups)
            {
                if (!includeParent && sg.gameObject == selectedObj) continue;

                Undo.RecordObject(sg, "Change Order In Layer");
                sg.sortingOrder += valueToAdd;
                EditorUtility.SetDirty(sg);
                count++;
            }

            // 3. Tìm tất cả Canvas (trong trường hợp UI Canvas đè sortingOrder)
            Canvas[] canvases = selectedObj.GetComponentsInChildren<Canvas>(includeInactive);
            foreach (Canvas c in canvases)
            {
                if (!includeParent && c.gameObject == selectedObj) continue;

                if (c.overrideSorting)
                {
                    Undo.RecordObject(c, "Change Order In Layer");
                    c.sortingOrder += valueToAdd;
                    EditorUtility.SetDirty(c);
                    count++;
                }
            }
        }

        Debug.Log($"[Tool] Đã cộng thêm {valueToAdd} vào Order in Layer cho {count} object con!");
    }
}
#endif
