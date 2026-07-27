using System;
using UnityEngine;
using UnityEngine.Serialization;

namespace Spine.Unity
{
	[ExecuteAlways]
	[AddComponentMenu("Spine/BoneFollower")]
	[HelpURL("http://esotericsoftware.com/spine-unity#BoneFollower")]
	public class BoneFollower : MonoBehaviour
	{
		public enum AxisOrientation
		{
			XAxis = 1,
			YAxis
		}

		public SkeletonRenderer skeletonRenderer;

		[SpineBone("", "skeletonRenderer", true, false)]
		public string boneName;

		public bool followXYPosition = true;

		public bool followZPosition = true;

		public bool followAttachmentZSpacing = false;

		public bool followBoneRotation = true;

		[Tooltip("Follows the skeleton's flip state by controlling this Transform's local scale.")]
		public bool followSkeletonFlip = true;

		[Tooltip("Follows the target bone's local scale.")]
		[FormerlySerializedAs("followScale")]
		public bool followLocalScale = false;

		[Tooltip("Includes the parent bone's lossy world scale. BoneFollower cannot inherit rotated/skewed scale because of UnityEngine.Transform property limitations.")]
		public bool followParentWorldScale = false;

		[Tooltip("Applies when 'Follow Skeleton Flip' is disabled but 'Follow Bone Rotation' is enabled. When flipping the skeleton by scaling its Transform, this follower's rotation is adjusted instead of its scale to follow the bone orientation. When one of the axes is flipped,  only one axis can be followed, either the X or the Y axis, which is selected here.")]
		public AxisOrientation maintainedAxisOrientation = AxisOrientation.XAxis;

		[FormerlySerializedAs("resetOnAwake")]
		public bool initializeOnAwake = true;

		[NonSerialized]
		public bool valid;

		[NonSerialized]
		public Bone bone;

		private Transform skeletonTransform;

		private bool skeletonTransformIsParent;

		public SkeletonRenderer SkeletonRenderer
		{
			get
			{
				return skeletonRenderer;
			}
			set
			{
				skeletonRenderer = value;
				Initialize();
			}
		}

		public bool SetBone(string name)
		{
			bone = skeletonRenderer.skeleton.FindBone(name);
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

		public void HandleRebuildRenderer(SkeletonRenderer skeletonRenderer)
		{
			Initialize();
		}

		public virtual void Initialize()
		{
			bone = null;
			valid = skeletonRenderer != null && skeletonRenderer.valid;
			if (valid)
			{
				skeletonTransform = skeletonRenderer.transform;
				skeletonRenderer.OnRebuild -= HandleRebuildRenderer;
				skeletonRenderer.OnRebuild += HandleRebuildRenderer;
				skeletonTransformIsParent = (object)skeletonTransform == base.transform.parent;
				if (!string.IsNullOrEmpty(boneName))
				{
					bone = skeletonRenderer.skeleton.FindBone(boneName);
				}
			}
		}

		private void OnDestroy()
		{
			if (skeletonRenderer != null)
			{
				skeletonRenderer.OnRebuild -= HandleRebuildRenderer;
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
				bone = skeletonRenderer.skeleton.FindBone(boneName);
				if (!SetBone(boneName))
				{
					return;
				}
			}
			Transform thisTransform = base.transform;
			float additionalFlipScale = 1f;
			if (skeletonTransformIsParent)
			{
				thisTransform.localPosition = new Vector3(followXYPosition ? bone.WorldX : thisTransform.localPosition.x, followXYPosition ? bone.WorldY : thisTransform.localPosition.y, (!followZPosition) ? thisTransform.localPosition.z : (followAttachmentZSpacing ? GetAttachmentZPosition() : 0f));
				if (followBoneRotation)
				{
					float halfRotation = Mathf.Atan2(bone.C, bone.A) * 0.5f;
					if (followLocalScale && bone.ScaleX < 0f)
					{
						halfRotation += 3.14159265f / 2f;
					}
					Quaternion q = default(Quaternion);
					q.z = Mathf.Sin(halfRotation);
					q.w = Mathf.Cos(halfRotation);
					thisTransform.localRotation = q;
				}
			}
			else
			{
				if (!skeletonTransform)
				{
					return;
				}
				float z0Position = ((followZPosition && followAttachmentZSpacing) ? GetAttachmentZPosition() : 0f);
				Vector3 targetWorldPosition = skeletonTransform.TransformPoint(new Vector3(bone.WorldX, bone.WorldY, z0Position));
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
					if (followSkeletonFlip || maintainedAxisOrientation == AxisOrientation.XAxis)
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
			int boneIndex = skeletonRenderer.Skeleton.DrawOrder.FindIndex((Slot slot) => slot.Bone == bone);
			if (boneIndex < 0)
			{
				return 0f;
			}
			return skeletonRenderer.zSpacing * (float)boneIndex;
		}
	}
}
