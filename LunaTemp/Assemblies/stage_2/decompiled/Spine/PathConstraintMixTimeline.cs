namespace Spine
{
	public class PathConstraintMixTimeline : CurveTimeline
	{
		public const int ENTRIES = 4;

		private const int ROTATE = 1;

		private const int X = 2;

		private const int Y = 3;

		private readonly int constraintIndex;

		public override int FrameEntries => 4;

		public int PathConstraintIndex => constraintIndex;

		public PathConstraintMixTimeline(int frameCount, int bezierCount, int pathConstraintIndex)
			: base(frameCount, bezierCount, 19 + "|" + pathConstraintIndex)
		{
			constraintIndex = pathConstraintIndex;
		}

		public void SetFrame(int frame, float time, float mixRotate, float mixX, float mixY)
		{
			frame <<= 2;
			frames[frame] = time;
			frames[frame + 1] = mixRotate;
			frames[frame + 2] = mixX;
			frames[frame + 3] = mixY;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			PathConstraint constraint = skeleton.pathConstraints.Items[constraintIndex];
			if (!constraint.active)
			{
				return;
			}
			float[] frames = base.frames;
			if (time < frames[0])
			{
				switch (blend)
				{
				case MixBlend.Setup:
					constraint.mixRotate = constraint.data.mixRotate;
					constraint.mixX = constraint.data.mixX;
					constraint.mixY = constraint.data.mixY;
					break;
				case MixBlend.First:
					constraint.mixRotate += (constraint.data.mixRotate - constraint.mixRotate) * alpha;
					constraint.mixX += (constraint.data.mixX - constraint.mixX) * alpha;
					constraint.mixY += (constraint.data.mixY - constraint.mixY) * alpha;
					break;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 4);
			int curveType = (int)curves[i >> 2];
			float rotate;
			float x;
			float y;
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				rotate = frames[i + 1];
				x = frames[i + 2];
				y = frames[i + 3];
				float t = (time - before) / (frames[i + 4] - before);
				rotate += (frames[i + 4 + 1] - rotate) * t;
				x += (frames[i + 4 + 2] - x) * t;
				y += (frames[i + 4 + 3] - y) * t;
				break;
			}
			case 1:
				rotate = frames[i + 1];
				x = frames[i + 2];
				y = frames[i + 3];
				break;
			default:
				rotate = GetBezierValue(time, i, 1, curveType - 2);
				x = GetBezierValue(time, i, 2, curveType + 18 - 2);
				y = GetBezierValue(time, i, 3, curveType + 36 - 2);
				break;
			}
			if (blend == MixBlend.Setup)
			{
				PathConstraintData data = constraint.data;
				constraint.mixRotate = data.mixRotate + (rotate - data.mixRotate) * alpha;
				constraint.mixX = data.mixX + (x - data.mixX) * alpha;
				constraint.mixY = data.mixY + (y - data.mixY) * alpha;
			}
			else
			{
				constraint.mixRotate += (rotate - constraint.mixRotate) * alpha;
				constraint.mixX += (x - constraint.mixX) * alpha;
				constraint.mixY += (y - constraint.mixY) * alpha;
			}
		}
	}
}
