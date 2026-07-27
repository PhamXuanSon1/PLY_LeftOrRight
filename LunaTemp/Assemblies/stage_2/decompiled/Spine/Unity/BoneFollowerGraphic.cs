using System;
using UnityEngine;

namespace Spine.Unity
{
	[ExecuteAlways]
	[RequireComponent(typeof(RectTransform))]
	[DisallowMultipleComponent]
	[AddComponentMenu("Spine/UI/BoneFollowerGraphic")]
	[HelpURL("http://esotericsoftware.com/spine-unity#BoneFollowerGraphic")]
	public class BoneFollowerGraphic : MonoBehaviour
	{
		public SkeletonGraphic skeletonGraphic;

		public bool initializeOnAwake = true;

		[SpineBone("", "skeletonGraphic", true, false)]
		public string boneName;

		public bool followBoneRotation = true;

		[Tooltip("Follows the skeleton's flip state by controlling this Transform's local scale.")]
		public bool followSkeletonFlip = true;

		[Tooltip("Follows the target bone's local scale.")]
		public bool followLocalScale = false;

		[Tooltip("Includes the parent bone's lossy world scale. BoneFollower cannot inherit rotated/skewed scale because of UnityEngine.Transform property limitations.")]
		public bool followParentWorldScale = false;

		public bool followXYPosition = true;

		public bool followZPosition = true;

		public bool followAttachmentZSpacing = false;

		[Tooltip("Applies when 'Follow Skeleton Flip' is disabled but 'Follow Bone Rotation' is enabled. When flipping the skeleton by scaling its Transform, this follower's rotation is adjusted instead of its scale to follow the bone orientation. When one of the axes is flipped,  only one axis can be followed, either the X or the Y axis, which is selected here.")]
		public BoneFollower.AxisOrientation maintainedAxisOrientation = BoneFollower.AxisOrientation.XAxis;

		[NonSerialized]
		public Bone bone;

		private Transform skeletonTransform;

		private bool skeletonTransformIsParent;

		[NonSerialized]
		public bool valid;

		public SkeletonGraphic SkeletonGraphic
		{
			get
			{
				return skeletonGraphic;
			}
			set
			{
				skeletonGraphic = value;
				Initialize();
			}
		}

		public bool SetBone(string name)
		{
			bone = skeletonGraphic.Skeleton.FindBone(name);
			if (bone == null)
			{
				Debug.LogError("Bone not found: " + name, this);
				return false;
			}
			boneName = name;
			return true;
		}

		public void Awake()
		{
			if (initializeOnAwake)
			{
				Initialize();
			}
		}

		public virtual void Initialize()
		{
			bone = null;
			valid = skeletonGraphic != null && skeletonGraphic.IsValid;
			if (valid)
			{
				skeletonTransform = skeletonGraphic.transform;
				skeletonTransformIsParent = (object)skeletonTransform == base.transform.parent;
				if (!string.IsNullOrEmpty(boneName))
				{
					bone = skeletonGraphic.Skeleton.FindBone(boneName);
				}
			}
		}

		public virtual void LateUpdate()
		{
			if (!valid)
			{
				Initialize();
				return;
			}
			if (bone == null)
			{
				if (string.IsNullOrEmpty(boneName))
				{
					return;
				}
				bone = skeletonGraphic.Skeleton.FindBone(boneName);
				if (!SetBone(boneName))
				{
					return;
				}
			}
			RectTransform thisTransform = base.transform as RectTransform;
			if (thisTransform == null)
			{
				return;
			}
			float scale = skeletonGraphic.MeshScale;
			Vector2 offset = skeletonGraphic.MeshOffset;
			float additionalFlipScale = 1f;
			if (skeletonTransformIsParent)
			{
				thisTransform.localPosition = new Vector3(followXYPosition ? (bone.WorldX * scale + offset.x) : thisTransform.localPosition.x, followXYPosition ? (bone.WorldY * scale + offset.y) : thisTransform.localPosition.y, (!followZPosition) ? thisTransform.localPosition.z : (followAttachmentZSpacing ? GetAttachmentZPosition() : 0f));
				if (followBoneRotation)
				{
					thisTransform.localRotation = bone.GetQuaternion();
				}
			}
			else
			{
				if (!skeletonTransform)
				{
					return;
				}
				float z0Position = ((followZPosition && followAttachmentZSpacing) ? GetAttachmentZPosition() : 0f);
				Vector3 targetWorldPosition = skeletonTransform.TransformPoint(new Vector3(bone.WorldX * scale + offset.x, bone.WorldY * scale + offset.y, z0Position));
				if (!followZPosition)
				{
					targetWorldPosition.z = thisTransform.position.z;
				}
				if (!followXYPosition)
				{
					targetWorldPosition.x = thisTransform.position.x;
					targetWorldPosition.y = thisTransform.position.y;
				}
				Vector3 skeletonLossyScale = skeletonTransform.lossyScale;
				Transform transformParent = thisTransform.parent;
				Vector3 parentLossyScale = ((transformParent != null) ? transformParent.lossyScale : Vector3.one);
				if (followBoneRotation)
				{
					float boneWorldRotation = bone.WorldRotationX;
					if (skeletonLossyScale.x * skeletonLossyScale.y < 0f)
					{
						boneWorldRotation = 0f - boneWorldRotation;
					}
					if (followSkeletonFlip || maintainedAxisOrientation == BoneFollower.AxisOrientation.XAxis)
					{
						if (skeletonLossyScale.x * parentLossyScale.x < 0f)
						{
							boneWorldRotation += 180f;
						}
					}
					else if (skeletonLossyScale.y * parentLossyScale.y < 0f)
					{
						boneWorldRotation += 180f;
					}
					Vector3 worldRotation = skeletonTransform.rotation.eulerAngles;
					if (followLocalScale && bone.ScaleX < 0f)
					{
						boneWorldRotation += 180f;
					}
					thisTransform.SetPositionAndRotation(targetWorldPosition, Quaternion.Euler(worldRotation.x, worldRotation.y, worldRotation.z + boneWorldRotation));
				}
				else
				{
					thisTransform.position = targetWorldPosition;
				}
				additionalFlipScale = Mathf.Sign(skeletonLossyScale.x * parentLossyScale.x * skeletonLossyScale.y * parentLossyScale.y);
			}
			Bone parentBone = bone.Parent;
			if (followParentWorldScale || followLocalScale || followSkeletonFlip)
			{
				Vector3 localScale = new Vector3(1f, 1f, 1f);
				if (followParentWorldScale && parentBone != null)
				{
					localScale = new Vector3(parentBone.WorldScaleX, parentBone.WorldScaleY, 1f);
				}
				if (followLocalScale)
				{
					localScale.Scale(new Vector3(bone.ScaleX, bone.ScaleY, 1f));
				}
				if (followSkeletonFlip)
				{
					localScale.y *= Mathf.Sign(bone.Skeleton.ScaleX * bone.Skeleton.ScaleY) * additionalFlipScale;
				}
				thisTransform.localScale = localScale;
			}
		}

		private float GetAttachmentZPosition()
		{
			int boneIndex = skeletonGraphic.Skeleton.DrawOrder.FindIndex((Slot slot) => slot.Bone == bone);
			if (boneIndex < 0)
			{
				return 0f;
			}
			return skeletonGraphic.MeshGenerator.settings.zSpacing * skeletonGraphic.MeshScale * (float)boneIndex;
		}
	}
}
