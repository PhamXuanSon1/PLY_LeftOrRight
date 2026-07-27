namespace Spine
{
	public class RGBTimeline : CurveTimeline, ISlotTimeline
	{
		public const int ENTRIES = 4;

		protected const int R = 1;

		protected const int G = 2;

		protected const int B = 3;

		private readonly int slotIndex;

		public override int FrameEntries => 4;

		public int SlotIndex => slotIndex;

		public RGBTimeline(int frameCount, int bezierCount, int slotIndex)
			: base(frameCount, bezierCount, 8 + "|" + slotIndex)
		{
			this.slotIndex = slotIndex;
		}

		public void SetFrame(int frame, float time, float r, float g, float b)
		{
			frame <<= 2;
			frames[frame] = time;
			frames[frame + 1] = r;
			frames[frame + 2] = g;
			frames[frame + 3] = b;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			Slot slot = skeleton.slots.Items[slotIndex];
			if (!slot.bone.active)
			{
				return;
			}
			float[] frames = base.frames;
			if (time < frames[0])
			{
				SlotData setup2 = slot.data;
				switch (blend)
				{
				case MixBlend.Setup:
					slot.r = setup2.r;
					slot.g = setup2.g;
					slot.b = setup2.b;
					break;
				case MixBlend.First:
					slot.r += (setup2.r - slot.r) * alpha;
					slot.g += (setup2.g - slot.g) * alpha;
					slot.b += (setup2.b - slot.b) * alpha;
					slot.ClampColor();
					break;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 4);
			int curveType = (int)curves[i >> 2];
			float r;
			float g;
			float b;
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				r = frames[i + 1];
				g = frames[i + 2];
				b = frames[i + 3];
				float t = (time - before) / (frames[i + 4] - before);
				r += (frames[i + 4 + 1] - r) * t;
				g += (frames[i + 4 + 2] - g) * t;
				b += (frames[i + 4 + 3] - b) * t;
				break;
			}
			case 1:
				r = frames[i + 1];
				g = frames[i + 2];
				b = frames[i + 3];
				break;
			default:
				r = GetBezierValue(time, i, 1, curveType - 2);
				g = GetBezierValue(time, i, 2, curveType + 18 - 2);
				b = GetBezierValue(time, i, 3, curveType + 36 - 2);
				break;
			}
			if (alpha == 1f)
			{
				slot.r = r;
				slot.g = g;
				slot.b = b;
			}
			else
			{
				float br;
				float bg;
				float bb;
				if (blend == MixBlend.Setup)
				{
					SlotData setup = slot.data;
					br = setup.r;
					bg = setup.g;
					bb = setup.b;
				}
				else
				{
					br = slot.r;
					bg = slot.g;
					bb = slot.b;
				}
				slot.r = br + (r - br) * alpha;
				slot.g = bg + (g - bg) * alpha;
				slot.b = bb + (b - bb) * alpha;
			}
			slot.ClampColor();
		}
	}
}
