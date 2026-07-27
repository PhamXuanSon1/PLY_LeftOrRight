namespace Spine
{
	public class RGBATimeline : CurveTimeline, ISlotTimeline
	{
		public const int ENTRIES = 5;

		protected const int R = 1;

		protected const int G = 2;

		protected const int B = 3;

		protected const int A = 4;

		private readonly int slotIndex;

		public override int FrameEntries => 5;

		public int SlotIndex => slotIndex;

		public RGBATimeline(int frameCount, int bezierCount, int slotIndex)
			: base(frameCount, bezierCount, 8 + "|" + slotIndex, 9 + "|" + slotIndex)
		{
			this.slotIndex = slotIndex;
		}

		public void SetFrame(int frame, float time, float r, float g, float b, float a)
		{
			frame *= 5;
			frames[frame] = time;
			frames[frame + 1] = r;
			frames[frame + 2] = g;
			frames[frame + 3] = b;
			frames[frame + 4] = a;
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
					break;
				case MixBlend.First:
					slot.r += (setup.r - slot.r) * alpha;
					slot.g += (setup.g - slot.g) * alpha;
					slot.b += (setup.b - slot.b) * alpha;
					slot.a += (setup.a - slot.a) * alpha;
					slot.ClampColor();
					break;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 5);
			int curveType = (int)curves[i / 5];
			float r;
			float g;
			float b;
			float a;
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				r = frames[i + 1];
				g = frames[i + 2];
				b = frames[i + 3];
				a = frames[i + 4];
				float t = (time - before) / (frames[i + 5] - before);
				r += (frames[i + 5 + 1] - r) * t;
				g += (frames[i + 5 + 2] - g) * t;
				b += (frames[i + 5 + 3] - b) * t;
				a += (frames[i + 5 + 4] - a) * t;
				break;
			}
			case 1:
				r = frames[i + 1];
				g = frames[i + 2];
				b = frames[i + 3];
				a = frames[i + 4];
				break;
			default:
				r = GetBezierValue(time, i, 1, curveType - 2);
				g = GetBezierValue(time, i, 2, curveType + 18 - 2);
				b = GetBezierValue(time, i, 3, curveType + 36 - 2);
				a = GetBezierValue(time, i, 4, curveType + 54 - 2);
				break;
			}
			if (alpha == 1f)
			{
				slot.r = r;
				slot.g = g;
				slot.b = b;
				slot.a = a;
			}
			else
			{
				float br;
				float bg;
				float bb;
				float ba;
				if (blend == MixBlend.Setup)
				{
					br = slot.data.r;
					bg = slot.data.g;
					bb = slot.data.b;
					ba = slot.data.a;
				}
				else
				{
					br = slot.r;
					bg = slot.g;
					bb = slot.b;
					ba = slot.a;
				}
				slot.r = br + (r - br) * alpha;
				slot.g = bg + (g - bg) * alpha;
				slot.b = bb + (b - bb) * alpha;
				slot.a = ba + (a - ba) * alpha;
			}
			slot.ClampColor();
		}
	}
}
