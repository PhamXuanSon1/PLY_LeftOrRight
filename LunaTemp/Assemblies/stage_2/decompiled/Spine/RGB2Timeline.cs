namespace Spine
{
	public class RGB2Timeline : CurveTimeline, ISlotTimeline
	{
		public const int ENTRIES = 7;

		protected const int R = 1;

		protected const int G = 2;

		protected const int B = 3;

		protected const int R2 = 4;

		protected const int G2 = 5;

		protected const int B2 = 6;

		private readonly int slotIndex;

		public override int FrameEntries => 7;

		public int SlotIndex => slotIndex;

		public RGB2Timeline(int frameCount, int bezierCount, int slotIndex)
			: base(frameCount, bezierCount, 8 + "|" + slotIndex, 10 + "|" + slotIndex)
		{
			this.slotIndex = slotIndex;
		}

		public void SetFrame(int frame, float time, float r, float g, float b, float r2, float g2, float b2)
		{
			frame *= 7;
			frames[frame] = time;
			frames[frame + 1] = r;
			frames[frame + 2] = g;
			frames[frame + 3] = b;
			frames[frame + 4] = r2;
			frames[frame + 5] = g2;
			frames[frame + 6] = b2;
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
					slot.ClampColor();
					slot.r2 = setup2.r2;
					slot.g2 = setup2.g2;
					slot.b2 = setup2.b2;
					slot.ClampSecondColor();
					break;
				case MixBlend.First:
					slot.r += (slot.r - setup2.r) * alpha;
					slot.g += (slot.g - setup2.g) * alpha;
					slot.b += (slot.b - setup2.b) * alpha;
					slot.ClampColor();
					slot.r2 += (slot.r2 - setup2.r2) * alpha;
					slot.g2 += (slot.g2 - setup2.g2) * alpha;
					slot.b2 += (slot.b2 - setup2.b2) * alpha;
					slot.ClampSecondColor();
					break;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 7);
			int curveType = (int)curves[i / 7];
			float r;
			float g;
			float b;
			float r2;
			float g2;
			float b2;
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				r = frames[i + 1];
				g = frames[i + 2];
				b = frames[i + 3];
				r2 = frames[i + 4];
				g2 = frames[i + 5];
				b2 = frames[i + 6];
				float t = (time - before) / (frames[i + 7] - before);
				r += (frames[i + 7 + 1] - r) * t;
				g += (frames[i + 7 + 2] - g) * t;
				b += (frames[i + 7 + 3] - b) * t;
				r2 += (frames[i + 7 + 4] - r2) * t;
				g2 += (frames[i + 7 + 5] - g2) * t;
				b2 += (frames[i + 7 + 6] - b2) * t;
				break;
			}
			case 1:
				r = frames[i + 1];
				g = frames[i + 2];
				b = frames[i + 3];
				r2 = frames[i + 4];
				g2 = frames[i + 5];
				b2 = frames[i + 6];
				break;
			default:
				r = GetBezierValue(time, i, 1, curveType - 2);
				g = GetBezierValue(time, i, 2, curveType + 18 - 2);
				b = GetBezierValue(time, i, 3, curveType + 36 - 2);
				r2 = GetBezierValue(time, i, 4, curveType + 54 - 2);
				g2 = GetBezierValue(time, i, 5, curveType + 72 - 2);
				b2 = GetBezierValue(time, i, 6, curveType + 90 - 2);
				break;
			}
			if (alpha == 1f)
			{
				slot.r = r;
				slot.g = g;
				slot.b = b;
				slot.r2 = r2;
				slot.g2 = g2;
				slot.b2 = b2;
			}
			else
			{
				float br;
				float bg;
				float bb;
				float br2;
				float bg2;
				float bb2;
				if (blend == MixBlend.Setup)
				{
					SlotData setup = slot.data;
					br = setup.r;
					bg = setup.g;
					bb = setup.b;
					br2 = setup.r2;
					bg2 = setup.g2;
					bb2 = setup.b2;
				}
				else
				{
					br = slot.r;
					bg = slot.g;
					bb = slot.b;
					br2 = slot.r2;
					bg2 = slot.g2;
					bb2 = slot.b2;
				}
				slot.r = br + (r - br) * alpha;
				slot.g = bg + (g - bg) * alpha;
				slot.b = bb + (b - bb) * alpha;
				slot.r2 = br2 + (r2 - br2) * alpha;
				slot.g2 = bg2 + (g2 - bg2) * alpha;
				slot.b2 = bb2 + (b2 - bb2) * alpha;
			}
			slot.ClampColor();
			slot.ClampSecondColor();
		}
	}
}
