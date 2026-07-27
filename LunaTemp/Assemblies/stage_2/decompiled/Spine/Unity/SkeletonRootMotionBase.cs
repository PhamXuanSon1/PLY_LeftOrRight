using System;
using System.Collections.Generic;
using Spine.Unity.AnimationTools;
using UnityEngine;

namespace Spine.Unity
{
	[DefaultExecutionOrder(1)]
	public abstract class SkeletonRootMotionBase : MonoBehaviour
	{
		public delegate void RootMotionDelegate(SkeletonRootMotionBase component, Vector2 translation, float rotation);

		public struct RootMotionInfo
		{
			public Vector2 start;

			public Vector2 current;

			public Vector2 mid;

			public Vector2 end;

			public bool timeIsPastMid;
		}

		[SpineBone("", "", true, false)]
		public string rootMotionBoneName = "root";

		public bool transformPositionX = true;

		public bool transformPositionY = true;

		public bool transformRotation = false;

		public float rootMotionScaleX = 1f;

		public float rootMotionScaleY = 1f;

		public float rootMotionScaleRotation = 1f;

		public float rootMotionTranslateXPerY = 0f;

		public float rootMotionTranslateYPerX = 0f;

		[Header("Optional")]
		public Rigidbody2D rigidBody2D;

		public bool applyRigidbody2DGravity = false;

		public Rigidbody rigidBody;

		public bool disableOnOverride = true;

		protected ISkeletonComponent skeletonComponent;

		protected Bone rootMotionBone;

		protected int rootMotionBoneIndex;

		protected List<int> transformConstraintIndices = new List<int>();

		protected List<Vector2> transformConstraintLastPos = new List<Vector2>();

		protected List<float> transformConstraintLastRotation = new List<float>();

		protected List<Bone> topLevelBones = new List<Bone>();

		protected Vector2 initialOffset = Vector2.zero;

		protected bool accumulatedUntilFixedUpdate = false;

		protected Vector2 tempSkeletonDisplacement;

		protected Vector3 rigidbodyDisplacement;

		protected Vector3 previousRigidbodyRootMotion = Vector2.zero;

		protected Vector2 additionalRigidbody2DMovement = Vector2.zero;

		protected Quaternion rigidbodyLocalRotation = Quaternion.identity;

		protected float rigidbody2DRotation;

		protected float initialOffsetRotation;

		protected float tempSkeletonRotation;

		public Bone RootMotionBone => rootMotionBone;

		public bool UsesRigidbody => rigidBody != null || rigidBody2D != null;

		public Vector2 PreviousRigidbodyRootMotion2D => new Vector2(previousRigidbodyRootMotion.x, previousRigidbodyRootMotion.y);

		public Vector3 PreviousRigidbodyRootMotion3D => previousRigidbodyRootMotion;

		public Vector2 AdditionalRigidbody2DMovement
		{
			get
			{
				return additionalRigidbody2DMovement;
			}
			set
			{
				additionalRigidbody2DMovement = value;
			}
		}

		protected bool SkeletonAnimationUsesFixedUpdate
		{
			get
			{
				if (skeletonComponent is ISkeletonAnimation skeletonAnimation)
				{
					return skeletonAnimation.UpdateTiming == UpdateTiming.InFixedUpdate;
				}
				return false;
			}
		}

		protected virtual float AdditionalScale => 1f;

		public ISkeletonComponent TargetSkeletonComponent
		{
			get
			{
				if (skeletonComponent == null)
				{
					skeletonComponent = GetComponent<ISkeletonComponent>();
				}
				return skeletonComponent;
			}
		}

		public ISkeletonAnimation TargetSkeletonAnimationComponent => TargetSkeletonComponent as ISkeletonAnimation;

		public event RootMotionDelegate ProcessRootMotionOverride;

		public event RootMotionDelegate PhysicsUpdateRootMotionOverride;

		protected virtual void Reset()
		{
			FindRigidbodyComponent();
		}

		protected virtual void Start()
		{
			Initialize();
		}

		protected void InitializeOnRebuild(ISkeletonAnimation animatedSkeletonComponent)
		{
			Initialize();
		}

		public virtual void Initialize()
		{
			skeletonComponent = GetComponent<ISkeletonComponent>();
			GatherTopLevelBones();
			SetRootMotionBone(rootMotionBoneName);
			if (rootMotionBone != null)
			{
				initialOffset = new Vector2(rootMotionBone.X, rootMotionBone.Y);
				initialOffsetRotation = rootMotionBone.Rotation;
			}
			if (skeletonComponent is ISkeletonAnimation skeletonAnimation)
			{
				skeletonAnimation.UpdateLocal -= HandleUpdateLocal;
				skeletonAnimation.UpdateLocal += HandleUpdateLocal;
				skeletonAnimation.OnAnimationRebuild -= InitializeOnRebuild;
				skeletonAnimation.OnAnimationRebuild += InitializeOnRebuild;
				SkeletonUtility skeletonUtility = GetComponent<SkeletonUtility>();
				if (skeletonUtility != null)
				{
					skeletonUtility.ResubscribeEvents();
				}
			}
		}

		protected virtual void FixedUpdate()
		{
			if (base.isActiveAndEnabled && !SkeletonAnimationUsesFixedUpdate)
			{
				PhysicsUpdate(false);
			}
		}

		protected virtual void PhysicsUpdate(bool skeletonAnimationUsesFixedUpdate)
		{
			Vector2 callbackDisplacement = tempSkeletonDisplacement;
			float callbackRotation = tempSkeletonRotation;
			if (this.PhysicsUpdateRootMotionOverride == null || !disableOnOverride)
			{
				if (rigidBody2D != null)
				{
					Vector2 gravityAndVelocityMovement = Vector2.zero;
					if (applyRigidbody2DGravity)
					{
						float deltaTime = Time.fixedDeltaTime;
						float deltaTimeSquared = deltaTime * deltaTime;
						rigidBody2D.linearVelocity += rigidBody2D.gravityScale * Physics2D.gravity * deltaTime;
						gravityAndVelocityMovement = 0.5f * rigidBody2D.gravityScale * Physics2D.gravity * deltaTimeSquared + rigidBody2D.linearVelocity * deltaTime;
					}
					Vector2 rigidbodyDisplacement2D = new Vector2(rigidbodyDisplacement.x, rigidbodyDisplacement.y);
					rigidBody2D.MovePosition(gravityAndVelocityMovement + new Vector2(rigidBody2D.position.x, rigidBody2D.position.y) + rigidbodyDisplacement2D + additionalRigidbody2DMovement);
					rigidBody2D.MoveRotation(rigidbody2DRotation + rigidBody2D.rotation);
				}
				else if (rigidBody != null)
				{
					rigidBody.MovePosition(rigidBody.position + new Vector3(rigidbodyDisplacement.x, rigidbodyDisplacement.y, rigidbodyDisplacement.z));
					rigidBody.MoveRotation(rigidBody.rotation * rigidbodyLocalRotation);
				}
			}
			previousRigidbodyRootMotion = rigidbodyDisplacement;
			if (accumulatedUntilFixedUpdate)
			{
				GetScaleAffectingRootMotion(out var parentBoneScale);
				ClearEffectiveBoneOffsets(parentBoneScale);
				skeletonComponent.Skeleton.UpdateWorldTransform(Skeleton.Physics.Pose);
			}
			ClearRigidbodyTempMovement();
			if (this.PhysicsUpdateRootMotionOverride != null)
			{
				this.PhysicsUpdateRootMotionOverride(this, callbackDisplacement, callbackRotation);
			}
		}

		protected virtual void OnDisable()
		{
			ClearRigidbodyTempMovement();
		}

		protected void FindRigidbodyComponent()
		{
			rigidBody2D = GetComponent<Rigidbody2D>();
			if (!rigidBody2D)
			{
				rigidBody = GetComponent<Rigidbody>();
			}
			if (!rigidBody2D && !rigidBody)
			{
				rigidBody2D = GetComponentInParent<Rigidbody2D>();
				if (!rigidBody2D)
				{
					rigidBody = GetComponentInParent<Rigidbody>();
				}
			}
		}

		protected abstract Vector2 CalculateAnimationsMovementDelta();

		protected virtual float CalculateAnimationsRotationDelta()
		{
			return 0f;
		}

		public abstract Vector2 GetRemainingRootMotion(int trackIndex = 0);

		public abstract RootMotionInfo GetRootMotionInfo(int trackIndex = 0);

		public void SetRootMotionBone(string name)
		{
			Skeleton skeleton = skeletonComponent.Skeleton;
			Bone bone = skeleton.FindBone(name);
			if (bone != null)
			{
				rootMotionBoneIndex = bone.Data.Index;
				rootMotionBone = bone;
				FindTransformConstraintsAffectingBone();
			}
			else
			{
				Debug.Log("Bone named \"" + name + "\" could not be found. Set 'skeletonRootMotion.rootMotionBoneName' before calling 'skeletonAnimation.Initialize(true)'.");
				rootMotionBoneIndex = 0;
				rootMotionBone = skeleton.RootBone;
			}
		}

		public void AdjustRootMotionToDistance(Vector2 distanceToTarget, int trackIndex = 0, bool adjustX = true, bool adjustY = true, float minX = 0f, float maxX = float.MaxValue, float minY = 0f, float maxY = float.MaxValue, bool allowXTranslation = false, bool allowYTranslation = false)
		{
			Vector2 distanceToTargetSkeletonSpace = base.transform.InverseTransformVector(distanceToTarget);
			Vector2 scaleAffectingRootMotion = GetScaleAffectingRootMotion();
			if (UsesRigidbody)
			{
				distanceToTargetSkeletonSpace -= tempSkeletonDisplacement;
			}
			Vector2 remainingRootMotionSkeletonSpace = GetRemainingRootMotion(trackIndex);
			remainingRootMotionSkeletonSpace.Scale(scaleAffectingRootMotion);
			if (remainingRootMotionSkeletonSpace.x == 0f)
			{
				remainingRootMotionSkeletonSpace.x = 0.0001f;
			}
			if (remainingRootMotionSkeletonSpace.y == 0f)
			{
				remainingRootMotionSkeletonSpace.y = 0.0001f;
			}
			if (adjustX)
			{
				rootMotionScaleX = Math.Min(maxX, Math.Max(minX, distanceToTargetSkeletonSpace.x / remainingRootMotionSkeletonSpace.x));
			}
			if (adjustY)
			{
				rootMotionScaleY = Math.Min(maxY, Math.Max(minY, distanceToTargetSkeletonSpace.y / remainingRootMotionSkeletonSpace.y));
			}
			if (allowXTranslation)
			{
				rootMotionTranslateXPerY = (distanceToTargetSkeletonSpace.x - remainingRootMotionSkeletonSpace.x * rootMotionScaleX) / remainingRootMotionSkeletonSpace.y;
			}
			if (allowYTranslation)
			{
				rootMotionTranslateYPerX = (distanceToTargetSkeletonSpace.y - remainingRootMotionSkeletonSpace.y * rootMotionScaleY) / remainingRootMotionSkeletonSpace.x;
			}
		}

		public Vector2 GetAnimationRootMotion(Animation animation)
		{
			return GetAnimationRootMotion(0f, animation.Duration, animation);
		}

		public Vector2 GetAnimationRootMotion(float startTime, float endTime, Animation animation)
		{
			if (startTime == endTime)
			{
				return Vector2.zero;
			}
			TranslateTimeline translateTimeline = animation.FindTranslateTimelineForBone(rootMotionBoneIndex);
			TranslateXTimeline xTimeline = animation.FindTimelineForBone<TranslateXTimeline>(rootMotionBoneIndex);
			TranslateYTimeline yTimeline = animation.FindTimelineForBone<TranslateYTimeline>(rootMotionBoneIndex);
			Vector2 endPos = Vector2.zero;
			Vector2 startPos = Vector2.zero;
			if (translateTimeline != null)
			{
				endPos = translateTimeline.Evaluate(endTime);
				startPos = translateTimeline.Evaluate(startTime);
			}
			else if (xTimeline != null || yTimeline != null)
			{
				endPos = TimelineExtensions.Evaluate(xTimeline, yTimeline, endTime);
				startPos = TimelineExtensions.Evaluate(xTimeline, yTimeline, startTime);
			}
			TransformConstraint[] transformConstraintsItems = skeletonComponent.Skeleton.TransformConstraints.Items;
			foreach (int constraintIndex2 in transformConstraintIndices)
			{
				TransformConstraint constraint2 = transformConstraintsItems[constraintIndex2];
				ApplyConstraintToPos(animation, constraint2, constraintIndex2, endTime, false, ref endPos);
				ApplyConstraintToPos(animation, constraint2, constraintIndex2, startTime, true, ref startPos);
			}
			Vector2 currentDelta = endPos - startPos;
			if (startTime > endTime)
			{
				Vector2 loopPos = Vector2.zero;
				Vector2 zeroPos = Vector2.zero;
				if (translateTimeline != null)
				{
					loopPos = translateTimeline.Evaluate(animation.Duration);
					zeroPos = translateTimeline.Evaluate(0f);
				}
				else if (xTimeline != null || yTimeline != null)
				{
					loopPos = TimelineExtensions.Evaluate(xTimeline, yTimeline, animation.Duration);
					zeroPos = TimelineExtensions.Evaluate(xTimeline, yTimeline, 0f);
				}
				foreach (int constraintIndex in transformConstraintIndices)
				{
					TransformConstraint constraint = transformConstraintsItems[constraintIndex];
					ApplyConstraintToPos(animation, constraint, constraintIndex, animation.Duration, false, ref loopPos);
					ApplyConstraintToPos(animation, constraint, constraintIndex, 0f, false, ref zeroPos);
				}
				currentDelta += loopPos - zeroPos;
			}
			UpdateLastConstraintPos(transformConstraintsItems);
			return currentDelta;
		}

		public float GetAnimationRootMotionRotation(Animation animation)
		{
			return GetAnimationRootMotionRotation(0f, animation.Duration, animation);
		}

		public float GetAnimationRootMotionRotation(float startTime, float endTime, Animation animation)
		{
			if (startTime == endTime)
			{
				return 0f;
			}
			RotateTimeline rotateTimeline = animation.FindTimelineForBone<RotateTimeline>(rootMotionBoneIndex);
			float endRotation = 0f;
			float startRotation = 0f;
			if (rotateTimeline != null)
			{
				endRotation = rotateTimeline.Evaluate(endTime);
				startRotation = rotateTimeline.Evaluate(startTime);
			}
			TransformConstraint[] transformConstraintsItems = skeletonComponent.Skeleton.TransformConstraints.Items;
			foreach (int constraintIndex2 in transformConstraintIndices)
			{
				TransformConstraint constraint2 = transformConstraintsItems[constraintIndex2];
				ApplyConstraintToRotation(animation, constraint2, constraintIndex2, endTime, false, ref endRotation);
				ApplyConstraintToRotation(animation, constraint2, constraintIndex2, startTime, true, ref startRotation);
			}
			float currentDelta = endRotation - startRotation;
			if (startTime > endTime)
			{
				float loopRotation = 0f;
				float zeroPos = 0f;
				if (rotateTimeline != null)
				{
					loopRotation = rotateTimeline.Evaluate(animation.Duration);
					zeroPos = rotateTimeline.Evaluate(0f);
				}
				foreach (int constraintIndex in transformConstraintIndices)
				{
					TransformConstraint constraint = transformConstraintsItems[constraintIndex];
					ApplyConstraintToRotation(animation, constraint, constraintIndex, animation.Duration, false, ref loopRotation);
					ApplyConstraintToRotation(animation, constraint, constraintIndex, 0f, false, ref zeroPos);
				}
				currentDelta += loopRotation - zeroPos;
			}
			UpdateLastConstraintRotation(transformConstraintsItems);
			return currentDelta;
		}

		private void ApplyConstraintToPos(Animation animation, TransformConstraint constraint, int constraintIndex, float time, bool useLastConstraintPos, ref Vector2 pos)
		{
			TransformConstraintTimeline timeline = animation.FindTransformConstraintTimeline(constraintIndex);
			if (timeline != null)
			{
				Vector2 mixXY = timeline.EvaluateTranslateXYMix(time);
				Vector2 invMixXY = timeline.EvaluateTranslateXYMix(time);
				Vector2 constraintPos;
				if (useLastConstraintPos)
				{
					constraintPos = transformConstraintLastPos[GetConstraintLastPosIndex(constraintIndex)];
				}
				else
				{
					Bone targetBone = constraint.Target;
					constraintPos = new Vector2(targetBone.X, targetBone.Y);
				}
				pos = new Vector2(pos.x * invMixXY.x + constraintPos.x * mixXY.x, pos.y * invMixXY.y + constraintPos.y * mixXY.y);
			}
		}

		private void ApplyConstraintToRotation(Animation animation, TransformConstraint constraint, int constraintIndex, float time, bool useLastConstraintRotation, ref float rotation)
		{
			TransformConstraintTimeline timeline = animation.FindTransformConstraintTimeline(constraintIndex);
			if (timeline != null)
			{
				float mixRotate = timeline.EvaluateRotateMix(time);
				float invMixRotate = timeline.EvaluateRotateMix(time);
				float constraintRotation;
				if (useLastConstraintRotation)
				{
					constraintRotation = transformConstraintLastRotation[GetConstraintLastPosIndex(constraintIndex)];
				}
				else
				{
					Bone targetBone = constraint.Target;
					constraintRotation = targetBone.Rotation;
				}
				rotation = rotation * invMixRotate + constraintRotation * mixRotate;
			}
		}

		private void UpdateLastConstraintPos(TransformConstraint[] transformConstraintsItems)
		{
			foreach (int constraintIndex in transformConstraintIndices)
			{
				TransformConstraint constraint = transformConstraintsItems[constraintIndex];
				Bone targetBone = constraint.Target;
				transformConstraintLastPos[GetConstraintLastPosIndex(constraintIndex)] = new Vector2(targetBone.X, targetBone.Y);
			}
		}

		private void UpdateLastConstraintRotation(TransformConstraint[] transformConstraintsItems)
		{
			foreach (int constraintIndex in transformConstraintIndices)
			{
				TransformConstraint constraint = transformConstraintsItems[constraintIndex];
				Bone targetBone = constraint.Target;
				transformConstraintLastRotation[GetConstraintLastPosIndex(constraintIndex)] = targetBone.Rotation;
			}
		}

		public RootMotionInfo GetAnimationRootMotionInfo(Animation animation, float currentTime)
		{
			RootMotionInfo rootMotion = default(RootMotionInfo);
			float duration = animation.Duration;
			float mid = duration * 0.5f;
			rootMotion.timeIsPastMid = currentTime > mid;
			TranslateTimeline timeline = animation.FindTranslateTimelineForBone(rootMotionBoneIndex);
			if (timeline != null)
			{
				rootMotion.start = timeline.Evaluate(0f);
				rootMotion.current = timeline.Evaluate(currentTime);
				rootMotion.mid = timeline.Evaluate(mid);
				rootMotion.end = timeline.Evaluate(duration);
				return rootMotion;
			}
			TranslateXTimeline xTimeline = animation.FindTimelineForBone<TranslateXTimeline>(rootMotionBoneIndex);
			TranslateYTimeline yTimeline = animation.FindTimelineForBone<TranslateYTimeline>(rootMotionBoneIndex);
			if (xTimeline != null || yTimeline != null)
			{
				rootMotion.start = TimelineExtensions.Evaluate(xTimeline, yTimeline, 0f);
				rootMotion.current = TimelineExtensions.Evaluate(xTimeline, yTimeline, currentTime);
				rootMotion.mid = TimelineExtensions.Evaluate(xTimeline, yTimeline, mid);
				rootMotion.end = TimelineExtensions.Evaluate(xTimeline, yTimeline, duration);
				return rootMotion;
			}
			return rootMotion;
		}

		private int GetConstraintLastPosIndex(int constraintIndex)
		{
			ExposedList<TransformConstraint> constraints = skeletonComponent.Skeleton.TransformConstraints;
			return transformConstraintIndices.FindIndex((int addedIndex) => addedIndex == constraintIndex);
		}

		private void FindTransformConstraintsAffectingBone()
		{
			ExposedList<TransformConstraint> constraints = skeletonComponent.Skeleton.TransformConstraints;
			TransformConstraint[] constraintsItems = constraints.Items;
			int i = 0;
			for (int j = constraints.Count; i < j; i++)
			{
				TransformConstraint constraint = constraintsItems[i];
				if (constraint.Bones.Contains(rootMotionBone))
				{
					transformConstraintIndices.Add(i);
					Bone targetBone = constraint.Target;
					Vector2 constraintPos = new Vector2(targetBone.X, targetBone.Y);
					transformConstraintLastPos.Add(constraintPos);
					transformConstraintLastRotation.Add(targetBone.Rotation);
				}
			}
		}

		private Vector2 GetTimelineMovementDelta(float startTime, float endTime, TranslateXTimeline xTimeline, TranslateYTimeline yTimeline, Animation animation)
		{
			if (startTime > endTime)
			{
				return TimelineExtensions.Evaluate(xTimeline, yTimeline, animation.Duration) - TimelineExtensions.Evaluate(xTimeline, yTimeline, startTime) + (TimelineExtensions.Evaluate(xTimeline, yTimeline, endTime) - TimelineExtensions.Evaluate(xTimeline, yTimeline, 0f));
			}
			if (startTime != endTime)
			{
				return TimelineExtensions.Evaluate(xTimeline, yTimeline, endTime) - TimelineExtensions.Evaluate(xTimeline, yTimeline, startTime);
			}
			return Vector2.zero;
		}

		private void GatherTopLevelBones()
		{
			topLevelBones.Clear();
			Skeleton skeleton = skeletonComponent.Skeleton;
			foreach (Bone bone in skeleton.Bones)
			{
				if (bone.Parent == null)
				{
					topLevelBones.Add(bone);
				}
			}
		}

		private void HandleUpdateLocal(ISkeletonAnimation animatedSkeletonComponent)
		{
			if (base.isActiveAndEnabled)
			{
				Vector2 boneLocalDelta = CalculateAnimationsMovementDelta();
				Vector2 parentBoneScale;
				Vector2 totalScale;
				Vector2 skeletonTranslationDelta = GetSkeletonSpaceMovementDelta(boneLocalDelta, out parentBoneScale, out totalScale);
				float skeletonRotationDelta = 0f;
				if (transformRotation)
				{
					float boneLocalDeltaRotation = CalculateAnimationsRotationDelta();
					boneLocalDeltaRotation *= rootMotionScaleRotation;
					skeletonRotationDelta = GetSkeletonSpaceRotationDelta(boneLocalDeltaRotation, totalScale);
				}
				bool usesFixedUpdate = SkeletonAnimationUsesFixedUpdate;
				ApplyRootMotion(skeletonTranslationDelta, skeletonRotationDelta, parentBoneScale, usesFixedUpdate);
				if (usesFixedUpdate)
				{
					PhysicsUpdate(usesFixedUpdate);
				}
			}
		}

		private void ApplyRootMotion(Vector2 skeletonTranslationDelta, float skeletonRotationDelta, Vector2 parentBoneScale, bool skeletonAnimationUsesFixedUpdate)
		{
			bool usesRigidbody = UsesRigidbody;
			bool applyToTransform = !usesRigidbody && (this.ProcessRootMotionOverride == null || !disableOnOverride);
			accumulatedUntilFixedUpdate = !applyToTransform && !skeletonAnimationUsesFixedUpdate;
			if (this.ProcessRootMotionOverride != null)
			{
				this.ProcessRootMotionOverride(this, skeletonTranslationDelta, skeletonRotationDelta);
			}
			if (usesRigidbody)
			{
				rigidbodyDisplacement += base.transform.TransformVector(skeletonTranslationDelta);
				if (skeletonRotationDelta != 0f)
				{
					if (rigidBody != null)
					{
						Quaternion addedWorldRotation = Quaternion.Euler(0f, 0f, skeletonRotationDelta);
						rigidbodyLocalRotation *= addedWorldRotation;
					}
					else if (rigidBody2D != null)
					{
						Vector3 lossyScale2 = base.transform.lossyScale;
						float rotationSign2 = ((lossyScale2.x * lossyScale2.y > 0f) ? 1 : (-1));
						rigidbody2DRotation += rotationSign2 * skeletonRotationDelta;
					}
				}
			}
			else if (applyToTransform)
			{
				base.transform.position += base.transform.TransformVector(skeletonTranslationDelta);
				if (skeletonRotationDelta != 0f)
				{
					Vector3 lossyScale = base.transform.lossyScale;
					float rotationSign = ((lossyScale.x * lossyScale.y > 0f) ? 1 : (-1));
					base.transform.Rotate(0f, 0f, rotationSign * skeletonRotationDelta);
				}
			}
			tempSkeletonDisplacement += skeletonTranslationDelta;
			tempSkeletonRotation += skeletonRotationDelta;
			if (accumulatedUntilFixedUpdate)
			{
				SetEffectiveBoneOffsetsTo(tempSkeletonDisplacement, tempSkeletonRotation, parentBoneScale);
			}
			else
			{
				ClearEffectiveBoneOffsets(parentBoneScale);
			}
		}

		private void ApplyTransformConstraints()
		{
			rootMotionBone.AX = rootMotionBone.X;
			rootMotionBone.AY = rootMotionBone.Y;
			rootMotionBone.AppliedRotation = rootMotionBone.Rotation;
			TransformConstraint[] transformConstraintsItems = skeletonComponent.Skeleton.TransformConstraints.Items;
			foreach (int constraintIndex in transformConstraintIndices)
			{
				TransformConstraint constraint = transformConstraintsItems[constraintIndex];
				constraint.Update(Skeleton.Physics.None);
			}
		}

		private Vector2 GetScaleAffectingRootMotion()
		{
			Vector2 parentBoneScale;
			return GetScaleAffectingRootMotion(out parentBoneScale);
		}

		private Vector2 GetScaleAffectingRootMotion(out Vector2 parentBoneScale)
		{
			Skeleton skeleton = skeletonComponent.Skeleton;
			Vector2 totalScale = Vector2.one;
			totalScale.x *= skeleton.ScaleX;
			totalScale.y *= skeleton.ScaleY;
			parentBoneScale = Vector2.one;
			Bone scaleBone = rootMotionBone;
			while ((scaleBone = scaleBone.Parent) != null)
			{
				parentBoneScale.x *= scaleBone.AScaleX;
				parentBoneScale.y *= scaleBone.AScaleY;
			}
			totalScale = Vector2.Scale(totalScale, parentBoneScale);
			return totalScale * AdditionalScale;
		}

		private Vector2 GetSkeletonSpaceMovementDelta(Vector2 boneLocalDelta, out Vector2 parentBoneScale, out Vector2 totalScale)
		{
			Vector2 skeletonDelta = boneLocalDelta;
			totalScale = GetScaleAffectingRootMotion(out parentBoneScale);
			skeletonDelta.Scale(totalScale);
			Vector2 rootMotionTranslation = new Vector2(rootMotionTranslateXPerY * skeletonDelta.y, rootMotionTranslateYPerX * skeletonDelta.x);
			skeletonDelta.x *= rootMotionScaleX;
			skeletonDelta.y *= rootMotionScaleY;
			skeletonDelta.x += rootMotionTranslation.x;
			skeletonDelta.y += rootMotionTranslation.y;
			if (!transformPositionX)
			{
				skeletonDelta.x = 0f;
			}
			if (!transformPositionY)
			{
				skeletonDelta.y = 0f;
			}
			return skeletonDelta;
		}

		private float GetSkeletonSpaceRotationDelta(float boneLocalDelta, Vector2 totalScaleAffectingRootMotion)
		{
			float rotationSign = ((totalScaleAffectingRootMotion.x * totalScaleAffectingRootMotion.y > 0f) ? 1 : (-1));
			return rotationSign * boneLocalDelta;
		}

		private void SetEffectiveBoneOffsetsTo(Vector2 displacementSkeletonSpace, float rotationSkeletonSpace, Vector2 parentBoneScale)
		{
			ApplyTransformConstraints();
			Skeleton skeleton = skeletonComponent.Skeleton;
			foreach (Bone topLevelBone in topLevelBones)
			{
				if (topLevelBone == rootMotionBone)
				{
					if (transformPositionX)
					{
						topLevelBone.X = displacementSkeletonSpace.x / skeleton.ScaleX;
					}
					if (transformPositionY)
					{
						topLevelBone.Y = displacementSkeletonSpace.y / skeleton.ScaleY;
					}
					if (transformRotation)
					{
						float rotationSign = ((skeleton.ScaleX * skeleton.ScaleY > 0f) ? 1 : (-1));
						topLevelBone.Rotation = rotationSign * rotationSkeletonSpace;
					}
					continue;
				}
				bool useAppliedTransform = transformConstraintIndices.Count > 0;
				float rootMotionBoneX = (useAppliedTransform ? rootMotionBone.AX : rootMotionBone.X);
				float rootMotionBoneY = (useAppliedTransform ? rootMotionBone.AY : rootMotionBone.Y);
				float offsetX = (initialOffset.x - rootMotionBoneX) * parentBoneScale.x;
				float offsetY = (initialOffset.y - rootMotionBoneY) * parentBoneScale.y;
				if (transformPositionX)
				{
					topLevelBone.X = displacementSkeletonSpace.x / skeleton.ScaleX + offsetX;
				}
				if (transformPositionY)
				{
					topLevelBone.Y = displacementSkeletonSpace.y / skeleton.ScaleY + offsetY;
				}
				if (transformRotation)
				{
					float rootMotionBoneRotation = (useAppliedTransform ? rootMotionBone.AppliedRotation : rootMotionBone.Rotation);
					float parentBoneRotationSign = ((parentBoneScale.x * parentBoneScale.y > 0f) ? 1 : (-1));
					float offsetRotation = (initialOffsetRotation - rootMotionBoneRotation) * parentBoneRotationSign;
					float skeletonRotationSign = ((skeleton.ScaleX * skeleton.ScaleY > 0f) ? 1 : (-1));
					topLevelBone.Rotation = rotationSkeletonSpace * skeletonRotationSign + offsetRotation;
				}
			}
		}

		private void ClearEffectiveBoneOffsets(Vector2 parentBoneScale)
		{
			SetEffectiveBoneOffsetsTo(Vector2.zero, 0f, parentBoneScale);
		}

		private void ClearRigidbodyTempMovement()
		{
			rigidbodyDisplacement = Vector2.zero;
			tempSkeletonDisplacement = Vector2.zero;
			rigidbodyLocalRotation = Quaternion.identity;
			rigidbody2DRotation = 0f;
			tempSkeletonRotation = 0f;
		}
	}
}
