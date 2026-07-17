using System.Collections.Generic;
using UnityEngine;
#if UNITY_EDITOR
using Sirenix.OdinInspector;
using Spine;
#endif

[System.Serializable]
public class CharacterEquipmentSetup
{
    public Character character;
    public EquipmentSetData equipmentData;
}

public class CharacterManager : MonoBehaviour
{
    public static CharacterManager instance;

    private void Awake()
    {
        instance = this;
    }

    [Header("Danh Sách Nhân Vật & Set Đồ")]
    public List<CharacterEquipmentSetup> characterSetups = new List<CharacterEquipmentSetup>();

    [Header("Các nhân vật cần Scale")]
    public Transform character1;

    private int lastScreenWidth;
    private int lastScreenHeight;
    private Dictionary<Transform, Vector3> originalScales = new Dictionary<Transform, Vector3>();
    private Dictionary<Transform, Vector3> originalPositions = new Dictionary<Transform, Vector3>();

#if UNITY_EDITOR
    [Title("Cấu hình Set Đồ (Test)")]
    [Header("Chọn Nhân Vật Để Test")]
    [ValueDropdown("GetCharacterChoices")]
    public Character targetTestCharacter;

    [Header("File Data Để Lưu / Tải")]
    [InlineEditor]
    public EquipmentSetData testEquipmentDataAsset;

    [TableList]
    [Searchable]
    public List<SlotAttachmentPair> myEquipmentSet;

    private IEnumerable<Character> GetCharacterChoices()
    {
        var choices = new List<Character>();
        if (characterSetups != null)
        { 
            for(int i = 0; i < characterSetups.Count; i++)
            {
                if (characterSetups[i] != null && characterSetups[i].character != null)
                    choices.Add(characterSetups[i].character);
            }
        }
        return choices;
    }
#endif

    private void Start()
    {
        // Lưu lại origin scale của các nhân vật
        if (character1 != null)
        {
            originalScales[character1] = character1.localScale;
            originalPositions[character1] = character1.position;
        }
        for (int i = 0; i < characterSetups.Count; i++)
        {
            if (characterSetups[i] != null && characterSetups[i].character != null)
            {
                Transform t = characterSetups[i].character.transform;
                if (!originalScales.ContainsKey(t)) originalScales[t] = t.localScale;
                if (!originalPositions.ContainsKey(t)) originalPositions[t] = t.position;
            }
        }

        // Tự động mặc đồ khi bắt đầu game
        if (Application.isPlaying)
        {
            EquipAll();
            lastScreenWidth = Screen.width;
            lastScreenHeight = Screen.height;
            UpdateCharacterScale();
        }
    }


    private void UpdateCharacterScale()
    {
        // Removed auto-scale logic
    }

    public void EquipAll()
    {
        for (int i = 0; i < characterSetups.Count; i++)
        {
            EquipCharacter(characterSetups[i].character, characterSetups[i].equipmentData);
        }
    }

    public void EquipCharacter(Character character, EquipmentSetData equipmentData)
    {
        if (character == null || equipmentData == null) return;

        for(int i = 0; i < equipmentData.equipmentSet.Count; i++)
        {
            SlotAttachmentPair pair = equipmentData.equipmentSet[i];
            string attachName = pair.isEnabled ? pair.attachmentName : null;
            // Debug.Log(attachName);
            character.TurnSlotAttachment(pair.slotName, attachName);
        }
    }

    // Mặc đồ từ thông tin của ItemController (Hỗ trợ Item có nhiều part/slot)
    public void Add1ItemToEquipment(ItemController item)
    {
        if (item == null) return;
        for (int i = 0; i < item.itemAttachments.Count; i++)
        {
            var setup = item.itemAttachments[i];
            if (setup.characterSetup != null)
                setup.characterSetup.TurnSlotAttachment(setup.slotName, setup.attachName);
        }
    }

    public void PlayHappyAnim()
    {
        for (int i = 0; i < characterSetups.Count; i++)
        {
            if (characterSetups[i] != null && characterSetups[i].character != null)
            {
                var emotionController = characterSetups[i].character.GetComponent<SpineEmotionController>();
                if (emotionController != null)
                {
                    emotionController.PlayHappyAnim();
                }
            }
        }
    }

    public void PlayAngryAnim()
    {
        for (int i = 0; i < characterSetups.Count; i++)
        {
            if (characterSetups[i] != null && characterSetups[i].character != null)
            {
                var emotionController = characterSetups[i].character.GetComponent<SpineEmotionController>();
                if (emotionController != null)
                {
                    emotionController.PlayAngryAnim();
                }
            }
        }
    }

#if UNITY_EDITOR
    [Button("Lấy Tất Cả Slot Từ Target", ButtonSizes.Large)]
    [GUIColor(0.2f, 0.8f, 0.2f)]
    public void GetAllSlots()
    {
        if (targetTestCharacter == null || targetTestCharacter.SkeletonAnimation == null || targetTestCharacter.SkeletonAnimation.Skeleton == null)
        {
            Debug.LogError("Chưa gán Target Test Character hoặc SkeletonAnimation chưa khởi tạo!");
            return;
        }

        if (myEquipmentSet == null) myEquipmentSet = new List<SlotAttachmentPair>();
        myEquipmentSet.Clear();

        Skeleton skeleton = targetTestCharacter.SkeletonAnimation.Skeleton;
        Skin defaultSkin = skeleton.Data.DefaultSkin;
        Skin currentSkin = skeleton.Skin;

        for (int i = 0; i < skeleton.Slots.Count; i++)
        {
            Slot slot = skeleton.Slots.Items[i];
            string finalAttachmentName = null;

            if (slot.Attachment != null)
            {
                finalAttachmentName = slot.Attachment.Name;
            }
            else
            {
                // Tìm attachment name đầu tiên trong skin
                List<Skin.SkinEntry> slotAttachments = new List<Skin.SkinEntry>();
                if (defaultSkin != null)
                {
                    defaultSkin.GetAttachments(i, slotAttachments);
                }
                
                if (slotAttachments.Count == 0 && currentSkin != null)
                {
                    currentSkin.GetAttachments(i, slotAttachments);
                }

                if (slotAttachments.Count > 0)
                {
                    finalAttachmentName = slotAttachments[0].Name;
                }
                else
                {
                    finalAttachmentName = slot.Data.AttachmentName;
                }
            }

            myEquipmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = slot.Attachment != null,
                slotName = slot.Data.Name,
                attachmentName = finalAttachmentName,
                skeletonDataAsset = targetTestCharacter.SkeletonAnimation.SkeletonDataAsset
            });
        }

        Debug.Log($"Đã lấy {myEquipmentSet.Count} slot từ skeleton.");
    }

    [HorizontalGroup("SaveLoad")]
    [Button("Lưu vào Asset", ButtonSizes.Medium)]
    [GUIColor(1f, 0.8f, 0.4f)]
    public void SaveToAsset()
    {
        if (testEquipmentDataAsset == null)
        {
            Debug.LogError("Chưa gán Test Equipment Data Asset để lưu! Hãy tạo file data và kéo vào ô phía trên.");
            return;
        }

        testEquipmentDataAsset.equipmentSet.Clear();
        for (int i = 0; i < myEquipmentSet.Count; i++)
        {
            var pair = myEquipmentSet[i];
            testEquipmentDataAsset.equipmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = pair.isEnabled,
                slotName = pair.slotName,
                attachmentName = pair.attachmentName,
                skeletonDataAsset = pair.skeletonDataAsset
            });
        }

        UnityEditor.EditorUtility.SetDirty(testEquipmentDataAsset);
        UnityEditor.AssetDatabase.SaveAssets();
        Debug.Log($"Đã lưu dữ liệu trang bị vào Asset: {testEquipmentDataAsset.name}");
    }

    [HorizontalGroup("SaveLoad")]
    [Button("Tải từ Asset", ButtonSizes.Medium)]
    [GUIColor(0.4f, 0.8f, 1f)]
    public void LoadFromAsset()
    {
        if (testEquipmentDataAsset == null)
        {
            Debug.LogError("Chưa gán Test Equipment Data Asset để tải!");
            return;
        }

        if (myEquipmentSet == null) myEquipmentSet = new List<SlotAttachmentPair>();
        myEquipmentSet.Clear();

        for (int i = 0; i < testEquipmentDataAsset.equipmentSet.Count; i++)
        {
            var pair = testEquipmentDataAsset.equipmentSet[i];
            myEquipmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = pair.isEnabled,
                slotName = pair.slotName,
                attachmentName = pair.attachmentName,
                skeletonDataAsset = pair.skeletonDataAsset
            });
        }

        Debug.Log($"Đã tải dữ liệu trang bị từ Asset: {testEquipmentDataAsset.name}");
        EditorEquip(); // Cập nhật luôn lên màn hình test
    }

    [Button("Gán Skeleton Data Từ Target", ButtonSizes.Medium)]
    [GUIColor(0.2f, 0.8f, 0.2f)]
    public void AssignSkeletonDataToAll()
    {
        if (myEquipmentSet == null || targetTestCharacter == null || targetTestCharacter.SkeletonAnimation == null) return;
        var skeletonData = targetTestCharacter.SkeletonAnimation.SkeletonDataAsset;
        for (int i = 0; i < myEquipmentSet.Count; i++)
        {
            myEquipmentSet[i].skeletonDataAsset = skeletonData;
        }
    }

    [Button("Mặc Đồ Ngay (Chỉ Target)")]
    public void EditorEquip()
    {
        if (myEquipmentSet == null || targetTestCharacter == null) return;
        
        for (int i = 0; i < myEquipmentSet.Count; i++)
        {
            var pair = myEquipmentSet[i];
            string attachName = string.IsNullOrEmpty(pair.attachmentName) ? null : pair.attachmentName;
            targetTestCharacter.TurnSlotAttachment(pair.slotName, pair.isEnabled ? attachName : null);
        }

        if (!Application.isPlaying && targetTestCharacter.SkeletonAnimation != null)
        {
            targetTestCharacter.SkeletonAnimation.LateUpdate();
        }
    }

    [Button("Tắt Tất Cả Đồ (Chỉ Target)", ButtonSizes.Medium)]
    [GUIColor(1f, 0.4f, 0.4f)]
    public void DisableAllItems()
    {
        if (myEquipmentSet == null || targetTestCharacter == null) return;
        
        for (int i = 0; i < myEquipmentSet.Count; i++)
        {
            var pair = myEquipmentSet[i];
            pair.isEnabled = false; // Tắt luôn dấu tick trên Inspector
            targetTestCharacter.TurnSlotAttachment(pair.slotName, null); // Tắt trên Spine
        }
    }

#endif
}
