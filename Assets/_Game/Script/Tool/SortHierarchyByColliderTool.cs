#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.Linq;

public class SortHierarchyByColliderTool : EditorWindow
{
    public List<GameObject> objects = new List<GameObject>();

    [MenuItem("Tools/Item/Sort Hierarchy By Collider")]
    public static void Open()
    {
        GetWindow<SortHierarchyByColliderTool>("Sort Hierarchy Tool");
    }

    void OnGUI()
    {
        GUILayout.Label("Sort Hierarchy By Collider Size", EditorStyles.boldLabel);

        SerializedObject so = new SerializedObject(this);
        SerializedProperty listProp = so.FindProperty("objects");

        EditorGUILayout.PropertyField(listProp, true);
        so.ApplyModifiedProperties();

        GUILayout.Space(10);

        if (GUILayout.Button("FILL FROM SELECTION"))
        {
            FillFromSelection();
        }

        GUILayout.Space(10);

        // 🔽 SMALL → BIG
        if (GUILayout.Button("SORT SMALL → BIG"))
        {
            SortHierarchy(true);
        }

        // 🔼 BIG → SMALL
        if (GUILayout.Button("SORT BIG → SMALL"))
        {
            SortHierarchy(false);
        }

        GUILayout.Space(10);

        if (GUILayout.Button("CLEAR"))
        {
            objects.Clear();
        }
    }

    void FillFromSelection()
    {
        objects.Clear();

        foreach (var obj in Selection.gameObjects)
        {
            objects.Add(obj);
        }

        Debug.Log($"[SortTool] Added {objects.Count} objects");
    }

    float GetSize(GameObject obj)
    {
        if (obj == null) return 0f;

        Collider col = obj.GetComponent<Collider>();
        if (col != null)
        {
            Bounds b = col.bounds;
            return b.size.x * b.size.y;
        }

        Collider2D col2D = obj.GetComponent<Collider2D>();
        if (col2D != null)
        {
            Bounds b = col2D.bounds;
            return b.size.x * b.size.y;
        }

        return 0f;
    }

    void SortHierarchy(bool smallToBig)
    {
        if (objects.Count == 0)
        {
            Debug.LogWarning("List empty!");
            return;
        }

        // 👉 chọn kiểu sort
        if (smallToBig)
        {
            objects = objects
                .Where(o => o != null)
                .OrderBy(o => GetSize(o))   // SMALL → BIG
                .ToList();
        }
        else
        {
            objects = objects
                .Where(o => o != null)
                .OrderByDescending(o => GetSize(o)) // BIG → SMALL
                .ToList();
        }

        // apply hierarchy
        for (int i = 0; i < objects.Count; i++)
        {
            if (objects[i] == null) continue;

            Undo.RecordObject(objects[i].transform, "Sort Hierarchy");

            objects[i].transform.SetSiblingIndex(i);
        }

        Debug.Log($"[SortTool] Sorted ({(smallToBig ? "SMALL → BIG" : "BIG → SMALL")})");
    }
}
#endif