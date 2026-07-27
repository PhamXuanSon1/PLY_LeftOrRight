using System;

namespace Spine
{
	public class SequenceTimeline : Timeline, ISlotTimeline
	{
		public const int ENTRIES = 3;

		private const int MODE = 1;

		private const int DELAY = 2;

		private readonly int slotIndex;

		private readonly IHasTextureRegion attachment;

		public override int FrameEntries => 3;

		public int SlotIndex => slotIndex;

		public Attachment Attachment => (Attachment)attachment;

		public SequenceTimeline(int frameCount, int slotIndex, Attachment attachment)
			: base(frameCount, 28 + "|" + slotIndex + "|" + ((IHasTextureRegion)attachment).Sequence.Id)
		{
			this.slotIndex = slotIndex;
			this.attachment = (IHasTextureRegion)attachment;
		}

		public void SetFrame(int frame, float time, SequenceMode mode, int index, float delay)
		{
			frame *= 3;
			frames[frame] = time;
			frames[frame + 1] = (int)mode | (index << 4);
			frames[frame + 2] = delay;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			Slot slot = skeleton.slots.Items[slotIndex];
			if (!slot.bone.active)
			{
				return;
			}
			Attachment slotAttachment = slot.attachment;
			if (slotAttachment != attachment && (!(slotAttachment is VertexAttachment vertexAttachment) || vertexAttachment.TimelineAttachment != attachment))
			{
				return;
			}
			Sequence sequence = ((IHasTextureRegion)slotAttachment).Sequence;
			if (sequence == null)
			{
				return;
			}
			if (direction == MixDirection.Out)
			{
				if (blend == MixBlend.Setup)
				{
					slot.SequenceIndex = -1;
				}
				return;
			}
			float[] frames = base.frames;
			if (time < frames[0])
			{
				if (blend == MixBlend.Setup || blend == MixBlend.First)
				{
					slot.SequenceIndex = -1;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 3);
			float before = frames[i];
			int modeAndIndex = (int)frames[i + 1];
			float delay = frames[i + 2];
			int index = modeAndIndex >> 4;
			int count = sequence.Regions.Length;
			SequenceMode mode = (SequenceMode)(modeAndIndex & 0xF);
			if (mode != 0)
			{
				index += (int)((time - before) / delay + 0.0001f);
				switch (mode)
				{
				case SequenceMode.Once:
					index = Math.Min(count - 1, index);
					break;
				case SequenceMode.Loop:
					index %= count;
					break;
				case SequenceMode.Pingpong:
				{
					int j = (count << 1) - 2;
					index = ((j != 0) ? (index % j) : 0);
					if (index >= count)
					{
						index = j - index;
					}
					break;
				}
				case SequenceMode.OnceReverse:
					index = Math.Max(count - 1 - index, 0);
					break;
				case SequenceMode.LoopReverse:
					index = count - 1 - index % count;
					break;
				case SequenceMode.PingpongReverse:
				{
					int k = (count << 1) - 2;
					index = ((k != 0) ? ((index + count - 1) % k) : 0);
					if (index >= count)
					{
						index = k - index;
					}
					break;
				}
				}
			}
			slot.SequenceIndex = index;
		}
	}
}
