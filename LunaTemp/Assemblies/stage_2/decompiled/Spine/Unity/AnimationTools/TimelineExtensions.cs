using UnityEngine;

namespace Spine.Unity.AnimationTools
{
	public static class TimelineExtensions
	{
		public static Vector2 Evaluate(this TranslateTimeline timeline, float time, SkeletonData skeletonData = null)
		{
			if (time < timeline.Frames[0])
			{
				return Vector2.zero;
			}
			timeline.GetCurveValue(out var x, out var y, time);
			if (skeletonData == null)
			{
				return new Vector2(x, y);
			}
			BoneData boneData = skeletonData.Bones.Items[timeline.BoneIndex];
			return new Vector2(boneData.X + x, boneData.Y + y);
		}

		public static Vector2 Evaluate(TranslateXTimeline xTimeline, TranslateYTimeline yTimeline, float time, SkeletonData skeletonData = null)
		{
			float x = 0f;
			float y = 0f;
			if (xTimeline != null && time > xTimeline.Frames[0])
			{
				x = xTimeline.GetCurveValue(time);
			}
			if (yTimeline != null && time > yTimeline.Frames[0])
			{
				y = yTimeline.GetCurveValue(time);
			}
			if (skeletonData == null)
			{
				return new Vector2(x, y);
			}
			BoneData[] bonesItems = skeletonData.Bones.Items;
			BoneData boneDataX = bonesItems[xTimeline.BoneIndex];
			BoneData boneDataY = bonesItems[yTimeline.BoneIndex];
			return new Vector2(boneDataX.X + x, boneDataY.Y + y);
		}

		public static float Evaluate(this RotateTimeline timeline, float time, SkeletonData skeletonData = null)
		{
			if (time < timeline.Frames[0])
			{
				return 0f;
			}
			float rotation = timeline.GetCurveValue(time);
			if (skeletonData == null)
			{
				return rotation;
			}
			BoneData boneData = skeletonData.Bones.Items[timeline.BoneIndex];
			return boneData.Rotation + rotation;
		}

		public static Vector2 EvaluateTranslateXYMix(this TransformConstraintTimeline timeline, float time)
		{
			if (time < timeline.Frames[0])
			{
				return Vector2.zero;
			}
			timeline.GetCurveValue(out var _, out var mixX, out var mixY, out var _, out var _, out var _, time);
			return new Vector2(mixX, mixY);
		}

		public static float EvaluateRotateMix(this TransformConstraintTimeline timeline, float time)
		{
			if (time < timeline.Frames[0])
			{
				return 0f;
			}
			timeline.GetCurveValue(out var rotate, out var _, out var _, out var _, out var _, out var _, time);
			return rotate;
		}

		public static TranslateTimeline FindTranslateTimelineForBone(this Animation a, int boneIndex)
		{
			foreach (Timeline timeline in a.Timelines)
			{
				if (timeline.GetType().IsSubclassOf(typeof(TranslateTimeline)) || !(timeline is TranslateTimeline translateTimeline) || translateTimeline.BoneIndex != boneIndex)
				{
					continue;
				}
				return translateTimeline;
			}
			return null;
		}

		public static T FindTimelineForBone<T>(this Animation a, int boneIndex) where T : class, IBoneTimeline
		{
			foreach (Timeline timeline in a.Timelines)
			{
				if (timeline is T translateTimeline && translateTimeline.BoneIndex == boneIndex)
				{
					return translateTimeline;
				}
			}
			return null;
		}

		public static TransformConstraintTimeline FindTransformConstraintTimeline(this Animation a, int transformConstraintIndex)
		{
			foreach (Timeline timeline in a.Timelines)
			{
				if (timeline.GetType().IsSubclassOf(typeof(TransformConstraintTimeline)) || !(timeline is TransformConstraintTimeline transformConstraintTimeline) || transformConstraintTimeline.TransformConstraintIndex != transformConstraintIndex)
				{
					continue;
				}
				return transformConstraintTimeline;
			}
			return null;
		}
	}
}
