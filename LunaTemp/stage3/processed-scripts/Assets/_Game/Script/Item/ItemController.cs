using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class ItemAttachmentSetup
{
    public Character characterSetup;
    public string slotName;
    public string attachName;
}

public class ItemController : MonoBehaviour
{
    [Header("Danh sách các part của Item")]
    public List<ItemAttachmentSetup> itemAttachments = new List<ItemAttachmentSetup>();
}
