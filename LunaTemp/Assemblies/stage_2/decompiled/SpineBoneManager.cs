using System.Collections.Generic;
using DG.Tweening;
using Spine.Unity;
using UnityEngine;

public class SpineBoneManager : MonoBehaviour
{
	public static SpineBoneManager Instance;

	public SkeletonAnimation skeletonAnimation;

	[Header("Tuỳ chọn khởi động")]
	[Tooltip("Tick vào đây nếu muốn vừa vào game là tất cả các xương trong danh sách này bị Close ngay lập tức (Ví dụ: ngủ nhắm mắt).")]
	public bool closeAllOnStart = false;

	[Space(10f)]
	public List<BoneOverrideData> boneList = new List<BoneOverrideData>();

	private Dictionary<string, BoneOverrideData> boneDict = new Dictionary<string, BoneOverrideData>();

	private bool hasInitialized = false;

	private void Awake()
	{
		Instance = this;
	}

	private void Start()
	{
		InitializeBones();
	}

	private void OnEnable()
	{
		if (hasInitialized && skeletonAnimation != null)
		{
			skeletonAnimation.UpdateLocal -= OverrideBones;
			skeletonAnimation.UpdateLocal += OverrideBones;
		}
	}

	private void OnDisable()
	{
		if (!(skeletonAnimation != null))
		{
			return;
		}
		skeletonAnimation.UpdateLocal -= OverrideBones;
		foreach (BoneOverrideData b in boneList)
		{
			if (b.spineBone != null)
			{
				b.spineBone.SetToSetupPose();
			}
		}
	}

	private void InitializeBones()
	{
		if (skeletonAnimation == null)
		{
			skeletonAnimation = GetComponent<SkeletonAnimation>();
		}
		if (!(skeletonAnimation != null) || skeletonAnimation.Skeleton == null)
		{
			return;
		}
		foreach (BoneOverrideData b in boneList)
		{
			b.spineBone = skeletonAnimation.Skeleton.FindBone(b.boneName);
			b.InitDefault(closeAllOnStart);
			boneDict[b.id] = b;
		}
		skeletonAnimation.UpdateLocal -= OverrideBones;
		skeletonAnimation.UpdateLocal += OverrideBones;
		hasInitialized = true;
	}

	private void OverrideBones(ISkeletonAnimation animated)
	{
		foreach (BoneOverrideData b in boneList)
		{
			if (b.spineBone != null)
			{
				if (b.blockAnimation)
				{
					b.spineBone.SetToSetupPose();
				}
				if (b.overrideX)
				{
					b.spineBone.X = b.currentX;
				}
				if (b.overrideY)
				{
					b.spineBone.Y = b.currentY;
				}
				if (b.overrideRotation)
				{
					b.spineBone.Rotation = b.currentRotation;
				}
			}
		}
	}

	public void OpenBone(string id)
	{
		if (boneDict.TryGetValue(id, out var b))
		{
			DOTween.Kill(b);
			if (b.overrideX)
			{
				DOTween.To(() => b.currentX, delegate(float x)
				{
					b.currentX = x;
				}, b.openX, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
			}
			if (b.overrideY)
			{
				DOTween.To(() => b.currentY, delegate(float x)
				{
					b.currentY = x;
				}, b.openY, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
			}
			if (b.overrideRotation)
			{
				DOTween.To(() => b.currentRotation, delegate(float x)
				{
					b.currentRotation = x;
				}, b.openRotation, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
			}
		}
		else
		{
			Debug.LogWarning("Không tìm thấy Bone ID: " + id);
		}
	}

	public void CloseBone(string id)
	{
		if (boneDict.TryGetValue(id, out var b))
		{
			DOTween.Kill(b);
			if (b.overrideX)
			{
				DOTween.To(() => b.currentX, delegate(float x)
				{
					b.currentX = x;
				}, b.closeX, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
			}
			if (b.overrideY)
			{
				DOTween.To(() => b.currentY, delegate(float x)
				{
					b.currentY = x;
				}, b.closeY, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
			}
			if (b.overrideRotation)
			{
				DOTween.To(() => b.currentRotation, delegate(float x)
				{
					b.currentRotation = x;
				}, b.closeRotation, b.transitionDuration).SetEase(Ease.OutQuad).SetTarget(b);
			}
		}
		else
		{
			Debug.LogWarning("Không tìm thấy Bone ID: " + id);
		}
	}

	public void CloseAllBones()
	{
		foreach (BoneOverrideData b in boneList)
		{
			CloseBone(b.id);
		}
	}

	public void OpenAllBones()
	{
		foreach (BoneOverrideData b in boneList)
		{
			OpenBone(b.id);
		}
	}
}
