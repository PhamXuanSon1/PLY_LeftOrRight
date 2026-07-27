using UnityEngine;

namespace Spine.Unity
{
	[HelpURL("http://esotericsoftware.com/spine-unity#SkeletonRootMotion")]
	public class SkeletonRootMotion : SkeletonRootMotionBase
	{
		private const int DefaultAnimationTrackFlags = -1;

		public int animationTrackFlags = -1;

		private AnimationState animationState;

		private SkeletonGraphic skeletonGraphic;

		protected override float AdditionalScale => skeletonGraphic ? skeletonGraphic.MeshScale : 1f;

		public override Vector2 GetRemainingRootMotion(int trackIndex)
		{
			TrackEntry track = animationState.GetCurrent(trackIndex);
			if (track == null)
			{
				return Vector2.zero;
			}
			Animation animation = track.Animation;
			float start = track.AnimationTime;
			float end = animation.Duration;
			return GetAnimationRootMotion(start, end, animation);
		}

		public override RootMotionInfo GetRootMotionInfo(int trackIndex)
		{
			TrackEntry track = animationState.GetCurrent(trackIndex);
			if (track == null)
			{
				return default(RootMotionInfo);
			}
			Animation animation = track.Animation;
			float time = track.AnimationTime;
			return GetAnimationRootMotionInfo(track.Animation, time);
		}

		protected override void Reset()
		{
			base.Reset();
			animationTrackFlags = -1;
		}

		public override void Initialize()
		{
			base.Initialize();
			animationState = (skeletonComponent as IAnimationStateComponent)?.AnimationState;
			skeletonGraphic = GetComponent<SkeletonGraphic>();
		}

		protected override Vector2 CalculateAnimationsMovementDelta()
		{
			Vector2 localDelta = Vector2.zero;
			int trackCount = animationState.Tracks.Count;
			for (int trackIndex = 0; trackIndex < trackCount; trackIndex++)
			{
				if (animationTrackFlags != -1 && (animationTrackFlags & (1 << trackIndex)) == 0)
				{
					continue;
				}
				TrackEntry track = animationState.GetCurrent(trackIndex);
				TrackEntry next = null;
				while (track != null)
				{
					Animation animation = track.Animation;
					float start = track.AnimationLast;
					float end = track.AnimationTime;
					Vector2 currentDelta = GetAnimationRootMotion(start, end, animation);
					if (currentDelta != Vector2.zero)
					{
						ApplyMixAlphaToDelta(ref currentDelta, next, track);
						localDelta += currentDelta;
					}
					next = track;
					track = track.MixingFrom;
				}
			}
			return localDelta;
		}

		protected override float CalculateAnimationsRotationDelta()
		{
			float localDelta = 0f;
			int trackCount = animationState.Tracks.Count;
			for (int trackIndex = 0; trackIndex < trackCount; trackIndex++)
			{
				if (animationTrackFlags != -1 && (animationTrackFlags & (1 << trackIndex)) == 0)
				{
					continue;
				}
				TrackEntry track = animationState.GetCurrent(trackIndex);
				TrackEntry next = null;
				while (track != null)
				{
					Animation animation = track.Animation;
					float start = track.AnimationLast;
					float end = track.AnimationTime;
					float currentDelta = GetAnimationRootMotionRotation(start, end, animation);
					if (currentDelta != 0f)
					{
						ApplyMixAlphaToDelta(ref currentDelta, next, track);
						localDelta += currentDelta;
					}
					next = track;
					track = track.MixingFrom;
				}
			}
			return localDelta;
		}

		private void ApplyMixAlphaToDelta(ref Vector2 currentDelta, TrackEntry next, TrackEntry track)
		{
			float mixAlpha = 1f;
			GetMixAlpha(ref mixAlpha, next, track);
			currentDelta *= mixAlpha;
		}

		private void ApplyMixAlphaToDelta(ref float currentDelta, TrackEntry next, TrackEntry track)
		{
			float mixAlpha = 1f;
			GetMixAlpha(ref mixAlpha, next, track);
			currentDelta *= mixAlpha;
		}

		private void GetMixAlpha(ref float cumulatedMixAlpha, TrackEntry next, TrackEntry track)
		{
			float mix;
			if (next != null)
			{
				if (next.MixDuration == 0f)
				{
					mix = 1f;
				}
				else
				{
					mix = next.MixTime / next.MixDuration;
					if (mix > 1f)
					{
						mix = 1f;
					}
				}
				float mixAndAlpha = track.Alpha * next.InterruptAlpha * (1f - mix);
				cumulatedMixAlpha *= mixAndAlpha;
				return;
			}
			if (track.MixDuration == 0f)
			{
				mix = 1f;
			}
			else
			{
				mix = track.Alpha * (track.MixTime / track.MixDuration);
				if (mix > 1f)
				{
					mix = 1f;
				}
			}
			cumulatedMixAlpha *= mix;
		}
	}
}
