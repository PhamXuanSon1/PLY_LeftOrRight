using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName = "New Equipment Set", menuName = "Spine/Equipment Set Data")]
public class EquipmentSetData : ScriptableObject
{
	[Tooltip("Danh sách tên các Skin sẽ được gộp (mix) lại để mặc cho nhân vật")]
	public List<string> skinNames = new List<string>();
}
