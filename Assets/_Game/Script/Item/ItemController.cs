using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class ItemAttachmentSetup
{
    public Character characterSetup;

    [Tooltip("Skin chứa placeholder này. Nên điền vì cùng 1 placeholder có ở nhiều Skin (face, head, hair1/front_Hair...)")]
    public string skinName;

    public string slotName;

    [Tooltip("Tên Skin Placeholder trong slot")]
    public string attachName;
}

public class ItemController : MonoBehaviour
{
    [Header("Danh sách các part của Item")]
    public List<ItemAttachmentSetup> itemAttachments = new List<ItemAttachmentSetup>();
}
