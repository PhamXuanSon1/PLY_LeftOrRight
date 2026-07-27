namespace Spine
{
	public class EventTimeline : Timeline
	{
		private static readonly string[] propertyIds = new string[1] { 13.ToString() };

		private readonly Event[] events;

		public Event[] Events => events;

		public EventTimeline(int frameCount)
			: base(frameCount, propertyIds)
		{
			events = new Event[frameCount];
		}

		public void SetFrame(int frame, Event e)
		{
			frames[frame] = e.time;
			events[frame] = e;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			if (firedEvents == null)
			{
				return;
			}
			float[] frames = base.frames;
			int frameCount = frames.Length;
			if (lastTime > time)
			{
				Apply(skeleton, lastTime, 2.1474836E+09f, firedEvents, alpha, blend, direction);
				lastTime = -1f;
			}
			else if (lastTime >= frames[frameCount - 1])
			{
				return;
			}
			if (time < frames[0])
			{
				return;
			}
			int i;
			if (lastTime < frames[0])
			{
				i = 0;
			}
			else
			{
				i = Timeline.Search(frames, lastTime) + 1;
				float frameTime = frames[i];
				while (i > 0 && frames[i - 1] == frameTime)
				{
					i--;
				}
			}
			for (; i < frameCount && time >= frames[i]; i++)
			{
				firedEvents.Add(events[i]);
			}
		}
	}
}
