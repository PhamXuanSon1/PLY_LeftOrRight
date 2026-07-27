using System;
using UnityEngine;

namespace Spine.Unity
{
	[ExecuteAlways]
	[AddComponentMenu("Spine/SkeletonUtilityBone")]
	[HelpURL("http://esotericsoftware.com/spine-unity#SkeletonUtilityBone")]
	public class SkeletonUtilityBone : MonoBehaviour
	{
		public enum Mode
		{
			Follow,
			Override
		}

		public enum UpdatePhase
		{
			Local,
			World,
			Complete
		}

		public string boneName;

		public Transform parentReference;

		public Mode mode;

		public bool position;

		public bool rotation;

		public bool scale;

		public bool zPosition = true;

		[Range(0f, 1f)]
		public float overrideAlpha = 1f;

		public SkeletonUtility hierarchy;

		[NonSerialized]
		public Bone bone;

		[NonSerialized]
		public bool transformLerpComplete;

		[NonSerialized]
		public bool valid;

		private Transform cachedTransform;

		private Transform skeletonTransform;

		private bool incompatibleTransformMode;

		public bool IncompatibleTransformMode => incompatibleTransformMode;

		public void Reset()
		{
			bone = null;
			cachedTransform = base.transform;
			valid = hierarchy != null && hierarchy.IsValid;
			if (valid)
			{
				skeletonTransform = hierarchy.transform;
				hierarchy.OnReset -= HandleOnReset;
				hierarchy.OnReset += HandleOnReset;
				DoUpdate(UpdatePhase.Local);
			}
		}

		private void OnEnable()
		{
			if (hierarchy == null)
			{
				hierarchy = base.transform.GetComponentInParent<SkeletonUtility>();
			}
			if (!(hierarchy == null))
			{
				hierarchy.RegisterBone(this);
				hierarchy.OnReset += HandleOnReset;
			}
		}

		private void HandleOnReset()
		{
			Reset();
		}

		private void OnDisable()
		{
			if (hierarchy != null)
			{
				hierarchy.OnReset -= HandleOnReset;
				hierarchy.UnregisterBone(this);
			}
		}

		public void DoUpdate(UpdatePhase phase)
		{
			if (!valid)
			{
				Reset();
				return;
			}
			Skeleton skeleton = hierarchy.Skeleton;
			if (bone == null)
			{
				if (string.IsNullOrEmpty(boneName))
				{
					return;
				}
				bone = skeleton.FindBone(boneName);
				if (bone == null)
				{
					Debug.LogError("Bone not found: " + boneName, this);
					return;
				}
			}
			if (!bone.Active)
			{
				return;
			}
			float positionScale = hierarchy.PositionScale;
			Transform thisTransform = cachedTransform;
			float skeletonFlipRotation = Mathf.Sign(skeleton.ScaleX * skeleton.ScaleY);
			if (mode == Mode.Follow)
			{
				switch (phase)
				{
				case UpdatePhase.Local:
					if (position)
					{
						thisTransform.localPosition = new Vector3(bone.X * positionScale, bone.Y * positionScale, zPosition ? 0f : thisTransform.localPosition.z);
					}
					if (rotation)
					{
						if (bone.Data.Inherit.InheritsRotation())
						{
							thisTransform.localRotation = Quaternion.Euler(0f, 0f, bone.Rotation);
						}
						else
						{
							Vector3 euler2 = skeletonTransform.rotation.eulerAngles;
							thisTransform.rotation = Quaternion.Euler(euler2.x, euler2.y, euler2.z + bone.WorldRotationX * skeletonFlipRotation);
						}
					}
					if (scale)
					{
						thisTransform.localScale = new Vector3(bone.ScaleX, bone.ScaleY, 1f);
						incompatibleTransformMode = BoneTransformModeIncompatible(bone);
					}
					break;
				case UpdatePhase.World:
				case UpdatePhase.Complete:
					if (position)
					{
						thisTransform.localPosition = new Vector3(bone.AX * positionScale, bone.AY * positionScale, zPosition ? 0f : thisTransform.localPosition.z);
					}
					if (rotation)
					{
						if (bone.Data.Inherit.InheritsRotation())
						{
							thisTransform.localRotation = Quaternion.Euler(0f, 0f, bone.AppliedRotation);
						}
						else
						{
							Vector3 euler = skeletonTransform.rotation.eulerAngles;
							thisTransform.rotation = Quaternion.Euler(euler.x, euler.y, euler.z + bone.WorldRotationX * skeletonFlipRotation);
						}
					}
					if (scale)
					{
						thisTransform.localScale = new Vector3(bone.AScaleX, bone.AScaleY, 1f);
						incompatibleTransformMode = BoneTransformModeIncompatible(bone);
					}
					break;
				}
			}
			else
			{
				if (mode != Mode.Override || transformLerpComplete)
				{
					return;
				}
				if (parentReference == null)
				{
					if (position)
					{
						Vector3 clp = thisTransform.localPosition / positionScale;
						bone.X = Mathf.Lerp(bone.X, clp.x, overrideAlpha);
						bone.Y = Mathf.Lerp(bone.Y, clp.y, overrideAlpha);
					}
					if (rotation)
					{
						float angle2 = Mathf.LerpAngle(bone.Rotation, thisTransform.localRotation.eulerAngles.z, overrideAlpha);
						bone.Rotation = angle2;
						bone.AppliedRotation = angle2;
					}
					if (scale)
					{
						Vector3 cls2 = thisTransform.localScale;
						bone.ScaleX = Mathf.Lerp(bone.ScaleX, cls2.x, overrideAlpha);
						bone.ScaleY = Mathf.Lerp(bone.ScaleY, cls2.y, overrideAlpha);
					}
				}
				else
				{
					if (transformLerpComplete)
					{
						return;
					}
					if (position)
					{
						Vector3 pos = parentReference.InverseTransformPoint(thisTransform.position) / positionScale;
						bone.X = Mathf.Lerp(bone.X, pos.x, overrideAlpha);
						bone.Y = Mathf.Lerp(bone.Y, pos.y, overrideAlpha);
					}
					if (rotation)
					{
						float angle = Mathf.LerpAngle(bone.Rotation, Quaternion.LookRotation(Vector3.forward, parentReference.InverseTransformDirection(thisTransform.up)).eulerAngles.z, overrideAlpha);
						bone.Rotation = angle;
						bone.AppliedRotation = angle;
					}
					if (scale)
					{
						Vector3 cls = thisTransform.localScale;
						bone.ScaleX = Mathf.Lerp(bone.ScaleX, cls.x, overrideAlpha);
						bone.ScaleY = Mathf.Lerp(bone.ScaleY, cls.y, overrideAlpha);
					}
					incompatibleTransformMode = BoneTransformModeIncompatible(bone);
				}
				transformLerpComplete = true;
			}
		}

		public static bool BoneTransformModeIncompatible(Bone bone)
		{
			return !bone.Data.Inherit.InheritsScale();
		}

		public void AddBoundingBox(string skinName, string slotName, string attachmentName)
		{
			SkeletonUtility.AddBoneRigidbody2D(base.transform.gameObject);
			SkeletonUtility.AddBoundingBoxGameObject(bone.Skeleton, skinName, slotName, attachmentName, base.transform);
		}
	}
}
