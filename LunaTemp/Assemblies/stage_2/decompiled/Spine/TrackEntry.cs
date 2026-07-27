using System;

namespace Spine
{
	public class TrackEntry : Pool<TrackEntry>.IPoolable
	{
		internal Animation animation;

		internal TrackEntry previous;

		internal TrackEntry next;

		internal TrackEntry mixingFrom;

		internal TrackEntry mixingTo;

		internal int trackIndex;

		internal bool loop;

		internal bool holdPrevious;

		internal bool reverse;

		internal bool shortestRotation;

		internal float eventThreshold;

		internal float mixAttachmentThreshold;

		internal float alphaAttachmentThreshold;

		internal float mixDrawOrderThreshold;

		internal float animationStart;

		internal float animationEnd;

		internal float animationLast;

		internal float nextAnimationLast;

		internal float delay;

		internal float trackTime;

		internal float trackLast;

		internal float nextTrackLast;

		internal float trackEnd;

		internal float timeScale = 1f;

		internal float alpha;

		internal float mixTime;

		internal float mixDuration;

		internal float interruptAlpha;

		internal float totalAlpha;

		internal MixBlend mixBlend = MixBlend.Replace;

		internal readonly ExposedList<int> timelineMode = new ExposedList<int>();

		internal readonly ExposedList<TrackEntry> timelineHoldMix = new ExposedList<TrackEntry>();

		internal readonly ExposedList<float> timelinesRotation = new ExposedList<float>();

		public int TrackIndex => trackIndex;

		public Animation Animation => animation;

		public bool Loop
		{
			get
			{
				return loop;
			}
			set
			{
				loop = value;
			}
		}

		public float Delay
		{
			get
			{
				return delay;
			}
			set
			{
				if (delay < 0f)
				{
					throw new ArgumentException("delay must be >= 0.", "delay");
				}
				delay = value;
			}
		}

		public float TrackTime
		{
			get
			{
				return trackTime;
			}
			set
			{
				trackTime = value;
			}
		}

		public float TrackEnd
		{
			get
			{
				return trackEnd;
			}
			set
			{
				trackEnd = value;
			}
		}

		public float TrackComplete
		{
			get
			{
				float duration = animationEnd - animationStart;
				if (duration != 0f)
				{
					if (loop)
					{
						return duration * (float)(1 + (int)(trackTime / duration));
					}
					if (trackTime < duration)
					{
						return duration;
					}
				}
				return trackTime;
			}
		}

		public float AnimationStart
		{
			get
			{
				return animationStart;
			}
			set
			{
				animationStart = value;
			}
		}

		public float AnimationEnd
		{
			get
			{
				return animationEnd;
			}
			set
			{
				animationEnd = value;
			}
		}

		public float AnimationLast
		{
			get
			{
				return animationLast;
			}
			set
			{
				animationLast = value;
				nextAnimationLast = value;
			}
		}

		public float AnimationTime
		{
			get
			{
				if (loop)
				{
					float duration = animationEnd - animationStart;
					if (duration == 0f)
					{
						return animationStart;
					}
					return trackTime % duration + animationStart;
				}
				float animationTime = trackTime + animationStart;
				return (animationEnd >= animation.duration) ? animationTime : Math.Min(animationTime, animationEnd);
			}
		}

		public float TimeScale
		{
			get
			{
				return timeScale;
			}
			set
			{
				timeScale = value;
			}
		}

		public float Alpha
		{
			get
			{
				return alpha;
			}
			set
			{
				alpha = value;
			}
		}

		public float InterruptAlpha => interruptAlpha;

		public float EventThreshold
		{
			get
			{
				return eventThreshold;
			}
			set
			{
				eventThreshold = value;
			}
		}

		public float AlphaAttachmentThreshold
		{
			get
			{
				return alphaAttachmentThreshold;
			}
			set
			{
				alphaAttachmentThreshold = value;
			}
		}

		public float MixAttachmentThreshold
		{
			get
			{
				return mixAttachmentThreshold;
			}
			set
			{
				mixAttachmentThreshold = value;
			}
		}

		public float MixDrawOrderThreshold
		{
			get
			{
				return mixDrawOrderThreshold;
			}
			set
			{
				mixDrawOrderThreshold = value;
			}
		}

		public TrackEntry Next => next;

		public TrackEntry Previous => previous;

		public bool WasApplied => nextTrackLast != -1f;

		public bool IsNextReady => next != null && nextTrackLast - next.delay >= 0f;

		public bool IsComplete => trackTime >= animationEnd - animationStart;

		public float MixTime
		{
			get
			{
				return mixTime;
			}
			set
			{
				mixTime = value;
			}
		}

		public float MixDuration
		{
			get
			{
				return mixDuration;
			}
			set
			{
				mixDuration = value;
			}
		}

		public MixBlend MixBlend
		{
			get
			{
				return mixBlend;
			}
			set
			{
				mixBlend = value;
			}
		}

		public TrackEntry MixingFrom => mixingFrom;

		public TrackEntry MixingTo => mixingTo;

		public bool HoldPrevious
		{
			get
			{
				return holdPrevious;
			}
			set
			{
				holdPrevious = value;
			}
		}

		public bool Reverse
		{
			get
			{
				return reverse;
			}
			set
			{
				reverse = value;
			}
		}

		public bool ShortestRotation
		{
			get
			{
				return shortestRotation;
			}
			set
			{
				shortestRotation = value;
			}
		}

		public bool IsEmptyAnimation => animation == AnimationState.EmptyAnimation;

		public event AnimationState.TrackEntryDelegate Start;

		public event AnimationState.TrackEntryDelegate Interrupt;

		public event AnimationState.TrackEntryDelegate End;

		public event AnimationState.TrackEntryDelegate Dispose;

		public event AnimationState.TrackEntryDelegate Complete;

		public event AnimationState.TrackEntryEventDelegate Event;

		internal void OnStart()
		{
			if (this.Start != null)
			{
				this.Start(this);
			}
		}

		internal void OnInterrupt()
		{
			if (this.Interrupt != null)
			{
				this.Interrupt(this);
			}
		}

		internal void OnEnd()
		{
			if (this.End != null)
			{
				this.End(this);
			}
		}

		internal void OnDispose()
		{
			if (this.Dispose != null)
			{
				this.Dispose(this);
			}
		}

		internal void OnComplete()
		{
			if (this.Complete != null)
			{
				this.Complete(this);
			}
		}

		internal void OnEvent(Event e)
		{
			if (this.Event != null)
			{
				this.Event(this, e);
			}
		}

		public void Reset()
		{
			previous = null;
			next = null;
			mixingFrom = null;
			mixingTo = null;
			animation = null;
			this.Start = null;
			this.Interrupt = null;
			this.End = null;
			this.Dispose = null;
			this.Complete = null;
			this.Event = null;
			timelineMode.Clear();
			timelineHoldMix.Clear();
			timelinesRotation.Clear();
		}

		public void SetMixDuration(float mixDuration, float delay)
		{
			this.mixDuration = mixDuration;
			if (delay <= 0f)
			{
				delay = ((previous == null) ? 0f : Math.Max(delay + previous.TrackComplete - mixDuration, 0f));
			}
			this.delay = delay;
		}

		public void ResetRotationDirections()
		{
			timelinesRotation.Clear();
		}

		public override string ToString()
		{
			return (animation == null) ? "<none>" : animation.name;
		}

		public void AllowImmediateQueue()
		{
			if (nextTrackLast < 0f)
			{
				nextTrackLast = 0f;
			}
		}
	}
}
