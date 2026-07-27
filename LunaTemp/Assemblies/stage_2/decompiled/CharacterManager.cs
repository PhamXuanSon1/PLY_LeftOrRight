using System.Collections.Generic;
using UnityEngine;

public class CharacterManager : MonoBehaviour
{
	public static CharacterManager instance;

	[Header("Danh Sách Nhân Vật & Set Đồ")]
	public List<CharacterEquipmentSetup> characterSetups = new List<CharacterEquipmentSetup>();

	[Header("Các nhân vật cần Scale")]
	public Transform character1;

	private int lastScreenWidth;

	private int lastScreenHeight;

	private Dictionary<Transform, Vector3> originalScales = new Dictionary<Transform, Vector3>();

	private Dictionary<Transform, Vector3> originalPositions = new Dictionary<Transform, Vector3>();

	private void Awake()
	{
		instance = this;
	}

	private void Start()
	{
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
				if (!originalScales.ContainsKey(t))
				{
					originalScales[t] = t.localScale;
				}
				if (!originalPositions.ContainsKey(t))
				{
					originalPositions[t] = t.position;
				}
			}
		}
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
		if (!(character == null) && !(equipmentData == null))
		{
			character.MixSkinsAndAttachments(equipmentData.skinNames, null);
		}
	}

	public void Add1ItemToEquipment(ItemController item)
	{
		if (item == null)
		{
			return;
		}
		for (int i = 0; i < item.itemAttachments.Count; i++)
		{
			ItemAttachmentSetup setup = item.itemAttachments[i];
			if (setup.characterSetup != null)
			{
				setup.characterSetup.TurnSlotAttachment(setup.slotName, setup.attachName);
			}
		}
	}

	public void PlayHappyAnim()
	{
		for (int i = 0; i < characterSetups.Count; i++)
		{
			if (characterSetups[i] != null && characterSetups[i].character != null)
			{
				SpineEmotionController emotionController = characterSetups[i].character.GetComponent<SpineEmotionController>();
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
				SpineEmotionController emotionController = characterSetups[i].character.GetComponent<SpineEmotionController>();
				if (emotionController != null)
				{
					emotionController.PlayAngryAnim();
				}
			}
		}
	}
}
