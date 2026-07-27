using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class SlotManager : MonoBehaviour
{
	[Header("Kéo thả các Slot (Slot1, Slot2...) vào đây")]
	public List<SlotSetup> allSlots = new List<SlotSetup>();

	[Header("Số slot cho phép chơi trước khi ra Store")]
	public int maxSlotsToPlay = 3;

	[Header("Tuỳ chọn: Tắt object (Vd: Bàn tay hướng dẫn) ở lần click đầu tiên")]
	public GameObject objectToHideOnFirstClick;

	private bool isFirstClick = true;

	private int currentSlotIndex = 0;

	[Header("Hiệu ứng hoàn thành Slot (Right Effect)")]
	public GameObject rightEffectPrefab;

	public Transform rightEffectSpawnPoint;

	public List<Sprite> rightEffectSprites;

	public static SlotManager Instance { get; private set; }

	public bool IsEndGame { get; private set; } = false;


	private void Awake()
	{
		if (Instance == null)
		{
			Instance = this;
		}
		else
		{
			Object.Destroy(base.gameObject);
		}
	}

	private void Start()
	{
		foreach (SlotSetup slot in allSlots)
		{
			if (slot != null)
			{
				slot.ChangeState(SlotState.Unplayed);
			}
		}
		if (ProgressTrackingManager.Instance != null)
		{
			ProgressTrackingManager.Instance.maxScore = maxSlotsToPlay;
		}
		if (allSlots.Count > 0 && allSlots[0] != null)
		{
			allSlots[currentSlotIndex].ChangeState(SlotState.Playing);
			allSlots[currentSlotIndex].LoadSlotDataToBalloons();
			allSlots[currentSlotIndex].ShowBalloons(true);
			PlaySlotStartSounds();
		}
	}

	private void Update()
	{
		if (IsEndGame && Input.GetMouseButtonDown(0) && GameManager.instance != null)
		{
			GameManager.instance.GotoStore();
		}
	}

	public void HideBalloons()
	{
		if (isFirstClick)
		{
			isFirstClick = false;
			if (objectToHideOnFirstClick != null)
			{
				objectToHideOnFirstClick.SetActive(false);
			}
		}
		if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
		{
			allSlots[currentSlotIndex].ShowBalloons(false);
		}
	}

	public Transform GetCurrentSlotTransform()
	{
		if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
		{
			return allSlots[currentSlotIndex].transform;
		}
		return null;
	}

	public void LoadNextSlot()
	{
		if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
		{
			allSlots[currentSlotIndex].ChangeState(SlotState.Played);
		}
		int completedSlotIndex = currentSlotIndex;
		currentSlotIndex++;
		SpawnRightEffect(completedSlotIndex);
		if (ProgressTrackingManager.Instance != null)
		{
			ProgressTrackingManager.Instance.AddProgress();
		}
		if (currentSlotIndex >= maxSlotsToPlay)
		{
			IsEndGame = true;
			Debug.Log("Đã chơi đủ " + maxSlotsToPlay + " slots. Click anywhere to go to Store!");
			if (currentSlotIndex < allSlots.Count && allSlots[currentSlotIndex] != null)
			{
				allSlots[currentSlotIndex].ChangeState(SlotState.Playing);
				allSlots[currentSlotIndex].LoadSlotDataToBalloons();
				allSlots[currentSlotIndex].ShowBalloons(true);
				PlaySlotStartSounds();
			}
		}
		else if (currentSlotIndex < allSlots.Count)
		{
			if (allSlots[currentSlotIndex] != null)
			{
				allSlots[currentSlotIndex].ChangeState(SlotState.Playing);
				allSlots[currentSlotIndex].LoadSlotDataToBalloons();
				allSlots[currentSlotIndex].ShowBalloons(true);
				PlaySlotStartSounds();
			}
		}
		else
		{
			Debug.Log("Đã hoàn thành tất cả các Slot!");
			IsEndGame = true;
		}
	}

	private void PlaySlotStartSounds()
	{
		if (!(Ply_Singleton<Ply_SoundManager>.Ins != null))
		{
			return;
		}
		Ply_Singleton<Ply_SoundManager>.Ins.PlayFx(FxType.Left);
		DOVirtual.DelayedCall(0.5f, delegate
		{
			if (Ply_Singleton<Ply_SoundManager>.Ins != null)
			{
				Ply_Singleton<Ply_SoundManager>.Ins.PlayFx(FxType.Right);
			}
		});
	}

	private void SpawnRightEffect(int slotIndex)
	{
		if (!(rightEffectPrefab != null) || !(rightEffectSpawnPoint != null) || rightEffectSprites == null || rightEffectSprites.Count <= 0)
		{
			return;
		}
		GameObject effect = Object.Instantiate(rightEffectPrefab, rightEffectSpawnPoint.position, rightEffectSpawnPoint.rotation);
		Transform imageChild = effect.transform.Find("Image");
		if (imageChild != null)
		{
			SpriteRenderer sr = imageChild.GetComponent<SpriteRenderer>();
			if (sr != null)
			{
				int spriteIndex2 = slotIndex % rightEffectSprites.Count;
				sr.sprite = rightEffectSprites[spriteIndex2];
			}
			else
			{
				Image uiImage = imageChild.GetComponent<Image>();
				if (uiImage != null)
				{
					int spriteIndex = slotIndex % rightEffectSprites.Count;
					uiImage.sprite = rightEffectSprites[spriteIndex];
				}
			}
		}
		Object.Destroy(effect, 2f);
	}
}
