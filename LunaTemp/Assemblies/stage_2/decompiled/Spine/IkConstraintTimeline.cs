namespace Spine
{
	public class IkConstraintTimeline : CurveTimeline
	{
		public const int ENTRIES = 6;

		private const int MIX = 1;

		private const int SOFTNESS = 2;

		private const int BEND_DIRECTION = 3;

		private const int COMPRESS = 4;

		private const int STRETCH = 5;

		private readonly int constraintIndex;

		public override int FrameEntries => 6;

		public int IkConstraintIndex => constraintIndex;

		public IkConstraintTimeline(int frameCount, int bezierCount, int ikConstraintIndex)
			: base(frameCount, bezierCount, 15 + "|" + ikConstraintIndex)
		{
			constraintIndex = ikConstraintIndex;
		}

		public void SetFrame(int frame, float time, float mix, float softness, int bendDirection, bool compress, bool stretch)
		{
			frame *= 6;
			frames[frame] = time;
			frames[frame + 1] = mix;
			frames[frame + 2] = softness;
			frames[frame + 3] = bendDirection;
			frames[frame + 4] = (compress ? 1 : 0);
			frames[frame + 5] = (stretch ? 1 : 0);
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			IkConstraint constraint = skeleton.ikConstraints.Items[constraintIndex];
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
					constraint.mix = constraint.data.mix;
					constraint.softness = constraint.data.softness;
					constraint.bendDirection = constraint.data.bendDirection;
					constraint.compress = constraint.data.compress;
					constraint.stretch = constraint.data.stretch;
					break;
				case MixBlend.First:
					constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
					constraint.softness += (constraint.data.softness - constraint.softness) * alpha;
					constraint.bendDirection = constraint.data.bendDirection;
					constraint.compress = constraint.data.compress;
					constraint.stretch = constraint.data.stretch;
					break;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 6);
			int curveType = (int)curves[i / 6];
			float mix;
			float softness;
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				mix = frames[i + 1];
				softness = frames[i + 2];
				float t = (time - before) / (frames[i + 6] - before);
				mix += (frames[i + 6 + 1] - mix) * t;
				softness += (frames[i + 6 + 2] - softness) * t;
				break;
			}
			case 1:
				mix = frames[i + 1];
				softness = frames[i + 2];
				break;
			default:
				mix = GetBezierValue(time, i, 1, curveType - 2);
				softness = GetBezierValue(time, i, 2, curveType + 18 - 2);
				break;
			}
			if (blend == MixBlend.Setup)
			{
				constraint.mix = constraint.data.mix + (mix - constraint.data.mix) * alpha;
				constraint.softness = constraint.data.softness + (softness - constraint.data.softness) * alpha;
				if (direction == MixDirection.Out)
				{
					constraint.bendDirection = constraint.data.bendDirection;
					constraint.compress = constraint.data.compress;
					constraint.stretch = constraint.data.stretch;
				}
				else
				{
					constraint.bendDirection = (int)frames[i + 3];
					constraint.compress = frames[i + 4] != 0f;
					constraint.stretch = frames[i + 5] != 0f;
				}
			}
			else
			{
				constraint.mix += (mix - constraint.mix) * alpha;
				constraint.softness += (softness - constraint.softness) * alpha;
				if (direction == MixDirection.In)
				{
					constraint.bendDirection = (int)frames[i + 3];
					constraint.compress = frames[i + 4] != 0f;
					constraint.stretch = frames[i + 5] != 0f;
				}
			}
		}
	}
}
