#if UNITY_EDITOR 
using System.IO;
using System.Text;
using UnityEditor;
using UnityEngine;
using Spine.Unity;

public class SpineExporterTool : EditorWindow
{
    private SkeletonAnimation skeletonAnimation;

    [MenuItem("Tools/Spine Exporter")]
    public static void ShowWindow()
    {
        GetWindow<SpineExporterTool>("Spine Exporter");
    }

    private void OnGUI()
    {
        GUILayout.Space(10);

        GUILayout.Label("SPINE EXPORT TOOL", EditorStyles.boldLabel);

        GUILayout.Space(10);

        skeletonAnimation = (SkeletonAnimation)EditorGUILayout.ObjectField(
            "Skeleton Animation",
            skeletonAnimation,
            typeof(SkeletonAnimation),
            true
        );

        GUILayout.Space(20);

        if (GUILayout.Button("EXPORT TO TXT", GUILayout.Height(40)))
        {
            ExportData();
        }
    }

    private void ExportData()
    {
        if (skeletonAnimation == null)
        {
            Debug.LogError("SkeletonAnimation NULL!");
            return;
        }

        StringBuilder sb = new StringBuilder();

        sb.AppendLine("===== SPINE EXPORT =====");
        sb.AppendLine();

        //------------------------------------
        // SLOTS
        //------------------------------------
        sb.AppendLine("=== SLOTS ===");

        foreach (var slot in skeletonAnimation.Skeleton.Slots)
        {
            sb.AppendLine($"Slot: {slot.Data.Name}");

            if (slot.Attachment != null)
            {
                sb.AppendLine($"   Attachment: {slot.Attachment.Name}");
            }
            else
            {
                sb.AppendLine("   Attachment: NULL");
            }

            sb.AppendLine();
        }

        //------------------------------------
        // SKINS
        //------------------------------------
        sb.AppendLine("=== SKINS ===");

        foreach (var skin in skeletonAnimation.Skeleton.Data.Skins)
        {
            sb.AppendLine($"Skin: {skin.Name}");
        }

        sb.AppendLine();

        //------------------------------------
        // ANIMATIONS
        //------------------------------------
        sb.AppendLine("=== ANIMATIONS ===");

        foreach (var anim in skeletonAnimation.Skeleton.Data.Animations)
        {
            sb.AppendLine($"Animation: {anim.Name}");
        }

        sb.AppendLine();

        //------------------------------------
        // BONES
        //------------------------------------
        sb.AppendLine("=== BONES ===");

        foreach (var bone in skeletonAnimation.Skeleton.Bones)
        {
            sb.AppendLine($"Bone: {bone.Data.Name}");
        }

        string path = EditorUtility.SaveFilePanel(
            "Save Spine Data",
            Application.dataPath,
            "SpineData.txt",
            "txt"
        );

        if (string.IsNullOrEmpty(path))
            return;

        File.WriteAllText(path, sb.ToString());

        Debug.Log("Export Success!");
        Debug.Log(path);

        EditorUtility.RevealInFinder(path);
    }
}
#endif