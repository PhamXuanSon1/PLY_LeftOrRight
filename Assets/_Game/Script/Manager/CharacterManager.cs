using System.Collections.Generic;
using UnityEngine;
using Spine.Unity;
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

    /// <summary>
    /// Mặc đồ cho nhân vật bằng hệ thống Mix Skin.
    /// Quét bảng SlotAttachmentPair, tìm các Skin chứa attachment tương ứng, gộp lại và đắp lên nhân vật.
    /// </summary>
    public void EquipCharacter(Character character, EquipmentSetData equipmentData)
    {
        if (character == null || equipmentData == null) return;
        character.EquipFromSlotAttachmentPairs(equipmentData.equipmentSet);
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
        SkeletonData skeletonData = skeleton.Data;
        Skin defaultSkin = skeletonData.DefaultSkin;

        // Quét TẤT CẢ các Skin (bao gồm Default + Named Skins) để tìm Placeholder Name cho mỗi Slot
        for (int i = 0; i < skeleton.Slots.Count; i++)
        {
            Slot slot = skeleton.Slots.Items[i];
            string finalAttachmentName = null;
            bool foundInAnySkin = false;

            // Tìm attachment name (Skin Placeholder) từ TẤT CẢ các skin
            for (int s = 0; s < skeletonData.Skins.Count; s++)
            {
                Skin skin = skeletonData.Skins.Items[s];
                List<Skin.SkinEntry> entries = new List<Skin.SkinEntry>();
                skin.GetAttachments(i, entries);

                if (entries.Count > 0)
                {
                    finalAttachmentName = entries[0].Name; // Tên Skin Placeholder
                    foundInAnySkin = true;
                    break;
                }
            }

            // Fallback: dùng Setup Pose attachment name
            if (!foundInAnySkin)
            {
                finalAttachmentName = slot.Data.AttachmentName;
            }

            // Kiểm tra isEnabled:
            // Nếu bạn muốn lấy đúng những gì đang hiện trên Scene (kể cả khi không Play game)
            // thì ta phải kiểm tra xem slot.Attachment có thực sự khác null không (đang có hình ảnh đắp lên).
            bool shouldEnable = false;
            
            // Lấy attachment hiện tại đang gắn vào slot (chính xác những gì đang vẽ trên màn hình)
            if (slot.Attachment != null)
            {
                // Nếu slot đang có đồ, và đồ đó khớp với tên placeholder hoặc chứa chữ của placeholder
                if (!string.IsNullOrEmpty(finalAttachmentName) && 
                   (slot.Attachment.Name.Contains(finalAttachmentName) || finalAttachmentName.Contains(slot.Attachment.Name)))
                {
                    shouldEnable = true;
                }
                else
                {
                    shouldEnable = true; // Cứ có đồ hiển thị là bật
                }
            }
            else if (!string.IsNullOrEmpty(slot.Data.AttachmentName))
            {
                // Hoặc nếu nó là đồ mặc định của Setup Pose (bạn muốn bật mặc định)
                shouldEnable = true;
            }

            Debug.Log($"Slot: {slot.Data.Name} | Hiện trên Scene (slot.Attachment): {(slot.Attachment != null ? slot.Attachment.Name : "NULL")} | Setup Pose: {slot.Data.AttachmentName ?? "NULL"} | => TICK: {shouldEnable}");

            myEquipmentSet.Add(new SlotAttachmentPair
            {
                isEnabled = shouldEnable,
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
        
        targetTestCharacter.EquipFromSlotAttachmentPairs(myEquipmentSet);
    }

    [Button("Tắt Tất Cả Đồ (Chỉ Target)", ButtonSizes.Medium)]
    [GUIColor(1f, 0.4f, 0.4f)]
    public void DisableAllItems()
    {
        if (myEquipmentSet == null || targetTestCharacter == null) return;
        
        for (int i = 0; i < myEquipmentSet.Count; i++)
        {
            var pair = myEquipmentSet[i];
            pair.isEnabled = false;
        }
        
        // Đắp lại skin rỗng (chỉ có Default Skin)
        targetTestCharacter.EquipFromSlotAttachmentPairs(myEquipmentSet);
    }

#endif
}
