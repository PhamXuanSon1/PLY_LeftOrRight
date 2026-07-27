using UnityEngine;

public class ProgressTrackingManager : MonoBehaviour
{
	[Header("Progress Settings")]
	[Tooltip("Tổng số điểm/item tối đa (Nhập tay trên Inspector)")]
	public int maxScore = 10;

	[Header("Debug (Chỉ xem khi đang chơi)")]
	[Tooltip("Số điểm hiện tại đang đạt được")]
	[SerializeField]
	private int currentScore = 0;

	[Tooltip("Phần trăm tiến độ hiện tại (%)")]
	[SerializeField]
	private int currentPercent = 0;

	private bool isStarted = false;

	private bool pass25 = false;

	private bool pass50 = false;

	private bool pass75 = false;

	private bool pass100 = false;

	public static ProgressTrackingManager Instance { get; private set; }

	private void Awake()
	{
		if (Instance == null)
		{
			Instance = this;
		}
	}

	public void AddProgress(int amount = 1)
	{
		UpdateGameProgress(currentScore + amount);
	}

	public void UpdateGameProgress(int score)
	{
		currentScore = score;
		if (!isStarted && currentScore > 0)
		{
			Debug.Log("Track: Challenge Started");
			isStarted = true;
		}
		if (maxScore > 0)
		{
			int progressPercent = (currentPercent = currentScore * 100 / maxScore);
			if (progressPercent >= 25 && !pass25)
			{
				Debug.Log("Track: Challenge Pass 25%");
				pass25 = true;
			}
			if (progressPercent >= 50 && !pass50)
			{
				Debug.Log("Track: Challenge Pass 50%");
				pass50 = true;
			}
			if (progressPercent >= 75 && !pass75)
			{
				Debug.Log("Track: Challenge Pass 75%");
				pass75 = true;
			}
			if (progressPercent >= 100 && !pass100)
			{
				Debug.Log("Track: Challenge Solved 100%");
				pass100 = true;
			}
		}
	}
}
