using System;
using System.Collections.Generic;

namespace Spine
{
	public class Animation
	{
		internal string name;

		internal ExposedList<Timeline> timelines;

		internal HashSet<string> timelineIds;

		internal float duration;

		public ExposedList<Timeline> Timelines
		{
			get
			{
				return timelines;
			}
			set
			{
				SetTimelines(value);
			}
		}

		public float Duration
		{
			get
			{
				return duration;
			}
			set
			{
				duration = value;
			}
		}

		public string Name => name;

		public Animation(string name, ExposedList<Timeline> timelines, float duration)
		{
			if (name == null)
			{
				throw new ArgumentNullException("name", "name cannot be null.");
			}
			this.name = name;
			SetTimelines(timelines);
			this.duration = duration;
		}

		public void SetTimelines(ExposedList<Timeline> timelines)
		{
			if (timelines == null)
			{
				throw new ArgumentNullException("timelines", "timelines cannot be null.");
			}
			this.timelines = timelines;
			int idCount = 0;
			int timelinesCount = timelines.Count;
			Timeline[] timelinesItems = timelines.Items;
			for (int t2 = 0; t2 < timelinesCount; t2++)
			{
				idCount += timelinesItems[t2].PropertyIds.Length;
			}
			string[] propertyIds = new string[idCount];
			int currentId = 0;
			for (int t = 0; t < timelinesCount; t++)
			{
				string[] ids = timelinesItems[t].PropertyIds;
				int i = 0;
				for (int idsLength = ids.Length; i < idsLength; i++)
				{
					propertyIds[currentId++] = ids[i];
				}
			}
			timelineIds = new HashSet<string>(propertyIds);
		}

		public bool HasTimeline(string[] propertyIds)
		{
			foreach (string id in propertyIds)
			{
				if (timelineIds.Contains(id))
				{
					return true;
				}
			}
			return false;
		}

		public void Apply(Skeleton skeleton, float lastTime, float time, bool loop, ExposedList<Event> events, float alpha, MixBlend blend, MixDirection direction)
		{
			if (skeleton == null)
			{
				throw new ArgumentNullException("skeleton", "skeleton cannot be null.");
			}
			if (loop && duration != 0f)
			{
				time %= duration;
				if (lastTime > 0f)
				{
					lastTime %= duration;
				}
			}
			Timeline[] timelines = this.timelines.Items;
			int i = 0;
			for (int j = this.timelines.Count; i < j; i++)
			{
				timelines[i].Apply(skeleton, lastTime, time, events, alpha, blend, direction);
			}
		}

		public override string ToString()
		{
			return name;
		}
	}
}
