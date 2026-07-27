namespace Spine
{
	public class RGBA2Timeline : CurveTimeline, ISlotTimeline
	{
		public const int ENTRIES = 8;

		protected const int R = 1;

		protected const int G = 2;

		protected const int B = 3;

		protected const int A = 4;

		protected const int R2 = 5;

		protected const int G2 = 6;

		protected const int B2 = 7;

		private readonly int slotIndex;

		public override int FrameEntries => 8;

		public int SlotIndex => slotIndex;

		public RGBA2Timeline(int frameCount, int bezierCount, int slotIndex)
			: base(frameCount, bezierCount, 8 + "|" + slotIndex, 9 + "|" + slotIndex, 10 + "|" + slotIndex)
		{
			this.slotIndex = slotIndex;
		}

		public void SetFrame(int frame, float time, float r, float g, float b, float a, float r2, float g2, float b2)
		{
			frame <<= 3;
			frames[frame] = time;
			frames[frame + 1] = r;
			frames[frame + 2] = g;
			frames[frame + 3] = b;
			frames[frame + 4] = a;
			frames[frame + 5] = r2;
			frames[frame + 6] = g2;
			frames[frame + 7] = b2;
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
				SlotData setup = slot.data;
				switch (blend)
				{
				case MixBlend.Setup:
					slot.r = setup.r;
					slot.g = setup.g;
					slot.b = setup.b;
					slot.a = setup.a;
					slot.ClampColor();
					slot.r2 = setup.r2;
					slot.g2 = setup.g2;
					slot.b2 = setup.b2;
					slot.ClampSecondColor();
					break;
				case MixBlend.First:
					slot.r += (slot.r - setup.r) * alpha;
					slot.g += (slot.g - setup.g) * alpha;
					slot.b += (slot.b - setup.b) * alpha;
					slot.a += (slot.a - setup.a) * alpha;
					slot.ClampColor();
					slot.r2 += (slot.r2 - setup.r2) * alpha;
					slot.g2 += (slot.g2 - setup.g2) * alpha;
					slot.b2 += (slot.b2 - setup.b2) * alpha;
					slot.ClampSecondColor();
					break;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 8);
			int curveType = (int)curves[i >> 3];
			float r;
			float g;
			float b;
			float a;
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
				a = frames[i + 4];
				r2 = frames[i + 5];
				g2 = frames[i + 6];
				b2 = frames[i + 7];
				float t = (time - before) / (frames[i + 8] - before);
				r += (frames[i + 8 + 1] - r) * t;
				g += (frames[i + 8 + 2] - g) * t;
				b += (frames[i + 8 + 3] - b) * t;
				a += (frames[i + 8 + 4] - a) * t;
				r2 += (frames[i + 8 + 5] - r2) * t;
				g2 += (frames[i + 8 + 6] - g2) * t;
				b2 += (frames[i + 8 + 7] - b2) * t;
				break;
			}
			case 1:
				r = frames[i + 1];
				g = frames[i + 2];
				b = frames[i + 3];
				a = frames[i + 4];
				r2 = frames[i + 5];
				g2 = frames[i + 6];
				b2 = frames[i + 7];
				break;
			default:
				r = GetBezierValue(time, i, 1, curveType - 2);
				g = GetBezierValue(time, i, 2, curveType + 18 - 2);
				b = GetBezierValue(time, i, 3, curveType + 36 - 2);
				a = GetBezierValue(time, i, 4, curveType + 54 - 2);
				r2 = GetBezierValue(time, i, 5, curveType + 72 - 2);
				g2 = GetBezierValue(time, i, 6, curveType + 90 - 2);
				b2 = GetBezierValue(time, i, 7, curveType + 108 - 2);
				break;
			}
			if (alpha == 1f)
			{
				slot.r = r;
				slot.g = g;
				slot.b = b;
				slot.a = a;
				slot.r2 = r2;
				slot.g2 = g2;
				slot.b2 = b2;
			}
			else
			{
				float br;
				float bg;
				float bb;
				float ba;
				float br2;
				float bg2;
				float bb2;
				if (blend == MixBlend.Setup)
				{
					br = slot.data.r;
					bg = slot.data.g;
					bb = slot.data.b;
					ba = slot.data.a;
					br2 = slot.data.r2;
					bg2 = slot.data.g2;
					bb2 = slot.data.b2;
				}
				else
				{
					br = slot.r;
					bg = slot.g;
					bb = slot.b;
					ba = slot.a;
					br2 = slot.r2;
					bg2 = slot.g2;
					bb2 = slot.b2;
				}
				slot.r = br + (r - br) * alpha;
				slot.g = bg + (g - bg) * alpha;
				slot.b = bb + (b - bb) * alpha;
				slot.a = ba + (a - ba) * alpha;
				slot.r2 = br2 + (r2 - br2) * alpha;
				slot.g2 = bg2 + (g2 - bg2) * alpha;
				slot.b2 = bb2 + (b2 - bb2) * alpha;
			}
			slot.ClampColor();
			slot.ClampSecondColor();
		}
	}
}
