using System.Collections.Generic;
using UnityEngine;

namespace Spine.Unity
{
	[HelpURL("http://esotericsoftware.com/spine-unity#SkeletonMecanimRootMotion")]
	public class SkeletonMecanimRootMotion : SkeletonRootMotionBase
	{
		private const int DefaultMecanimLayerFlags = -1;

		public int mecanimLayerFlags = -1;

		protected Vector2 movementDelta;

		protected float rotationDelta;

		private SkeletonMecanim skeletonMecanim;

		public SkeletonMecanim SkeletonMecanim => skeletonMecanim ? skeletonMecanim : (skeletonMecanim = GetComponent<SkeletonMecanim>());

		public override Vector2 GetRemainingRootMotion(int layerIndex)
		{
			KeyValuePair<Animation, float> pair = skeletonMecanim.Translator.GetActiveAnimationAndTime(layerIndex);
			Animation animation = pair.Key;
			float time = pair.Value;
			if (animation == null)
			{
				return Vector2.zero;
			}
			float start = time;
			float end = animation.Duration;
			return GetAnimationRootMotion(start, end, animation);
		}

		public override RootMotionInfo GetRootMotionInfo(int layerIndex)
		{
			KeyValuePair<Animation, float> pair = skeletonMecanim.Translator.GetActiveAnimationAndTime(layerIndex);
			Animation animation = pair.Key;
			float time = pair.Value;
			if (animation == null)
			{
				return default(RootMotionInfo);
			}
			return GetAnimationRootMotionInfo(animation, time);
		}

		protected override void Reset()
		{
			base.Reset();
			mecanimLayerFlags = -1;
		}

		public override void Initialize()
		{
			base.Initialize();
			skeletonMecanim = GetComponent<SkeletonMecanim>();
			if ((bool)skeletonMecanim)
			{
				skeletonMecanim.Translator.OnClipApplied -= OnClipApplied;
				skeletonMecanim.Translator.OnClipApplied += OnClipApplied;
			}
		}

		private void OnClipApplied(Animation animation, int layerIndex, float weight, float time, float lastTime, bool playsBackward)
		{
			if ((mecanimLayerFlags & (1 << layerIndex)) == 0 || weight == 0f)
			{
				return;
			}
			if (!playsBackward)
			{
				movementDelta += weight * GetAnimationRootMotion(lastTime, time, animation);
			}
			else
			{
				movementDelta -= weight * GetAnimationRootMotion(time, lastTime, animation);
			}
			if (transformRotation)
			{
				if (!playsBackward)
				{
					rotationDelta += weight * GetAnimationRootMotionRotation(lastTime, time, animation);
				}
				else
				{
					rotationDelta -= weight * GetAnimationRootMotionRotation(time, lastTime, animation);
				}
			}
		}

		protected override Vector2 CalculateAnimationsMovementDelta()
		{
			Vector2 result = movementDelta;
			movementDelta = Vector2.zero;
			return result;
		}

		protected override float CalculateAnimationsRotationDelta()
		{
			float result = rotationDelta;
			rotationDelta = 0f;
			return result;
		}
	}
}
