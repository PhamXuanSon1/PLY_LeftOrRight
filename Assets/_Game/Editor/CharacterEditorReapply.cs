using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

/// <summary>
/// Editor script tự động đắp lại đồ cho Character khi click chọn object trong Editor.
/// Hỗ trợ cả hệ thống Skin-based (MixAndApplySkins) và SlotAttachmentPair.
/// </summary>
[InitializeOnLoad]
public static class CharacterEditorReapply
{
    private static Character activeCharacter;
    private static int reapplyCounter;
    private const int MAX_REAPPLY = 30;

    static CharacterEditorReapply()
    {
        Selection.selectionChanged += OnSelectionChanged;
        EditorApplication.update += OnEditorUpdate;
    }

    private static void OnSelectionChanged()
    {
        activeCharacter = null;
        reapplyCounter = 0;

        if (Application.isPlaying) return;
        if (Selection.activeGameObject == null) return;

        Character character = Selection.activeGameObject.GetComponent<Character>();
        if (character == null)
            character = Selection.activeGameObject.GetComponentInChildren<Character>();
        if (character == null)
            character = Selection.activeGameObject.GetComponentInParent<Character>();

        if (character != null && character.SkeletonAnimation != null)
        {
            activeCharacter = character;
            reapplyCounter = MAX_REAPPLY;
        }
    }

    private static void OnEditorUpdate()
    {
        if (Application.isPlaying) return;
        if (activeCharacter == null || reapplyCounter <= 0) return;

        reapplyCounter--;

        if (activeCharacter.SkeletonAnimation == null || activeCharacter.SkeletonAnimation.Skeleton == null)
        {
            activeCharacter = null;
            reapplyCounter = 0;
            return;
        }

        var skinNamesField = typeof(Character).GetField("currentAppliedSkinNames",
            System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
        var pairsField = typeof(Character).GetField("currentAppliedPairs",
            System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);

        List<string> skinNames = null;
        List<SlotAttachmentPair> pairs = null;

        if (skinNamesField != null)
            skinNames = skinNamesField.GetValue(activeCharacter) as List<string>;
        
        if (pairsField != null)
            pairs = pairsField.GetValue(activeCharacter) as List<SlotAttachmentPair>;

        if ((skinNames != null && skinNames.Count > 0) || (pairs != null && pairs.Count > 0))
        {
            activeCharacter.MixSkinsAndAttachments(skinNames, pairs);
            activeCharacter.SkeletonAnimation.LateUpdate();
            if (reapplyCounter <= 0) SceneView.RepaintAll();
        }
        else
        {
            activeCharacter = null;
            reapplyCounter = 0;
        }
    }
}
