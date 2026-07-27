namespace Spine
{
	public class TransformConstraintTimeline : CurveTimeline
	{
		public const int ENTRIES = 7;

		private const int ROTATE = 1;

		private const int X = 2;

		private const int Y = 3;

		private const int SCALEX = 4;

		private const int SCALEY = 5;

		private const int SHEARY = 6;

		private readonly int constraintIndex;

		public override int FrameEntries => 7;

		public int TransformConstraintIndex => constraintIndex;

		public TransformConstraintTimeline(int frameCount, int bezierCount, int transformConstraintIndex)
			: base(frameCount, bezierCount, 16 + "|" + transformConstraintIndex)
		{
			constraintIndex = transformConstraintIndex;
		}

		public void SetFrame(int frame, float time, float mixRotate, float mixX, float mixY, float mixScaleX, float mixScaleY, float mixShearY)
		{
			frame *= 7;
			frames[frame] = time;
			frames[frame + 1] = mixRotate;
			frames[frame + 2] = mixX;
			frames[frame + 3] = mixY;
			frames[frame + 4] = mixScaleX;
			frames[frame + 5] = mixScaleY;
			frames[frame + 6] = mixShearY;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			TransformConstraint constraint = skeleton.transformConstraints.Items[constraintIndex];
			if (!constraint.active)
			{
				return;
			}
			float[] frames = base.frames;
			if (time < frames[0])
			{
				TransformConstraintData data2 = constraint.data;
				switch (blend)
				{
				case MixBlend.Setup:
					constraint.mixRotate = data2.mixRotate;
					constraint.mixX = data2.mixX;
					constraint.mixY = data2.mixY;
					constraint.mixScaleX = data2.mixScaleX;
					constraint.mixScaleY = data2.mixScaleY;
					constraint.mixShearY = data2.mixShearY;
					break;
				case MixBlend.First:
					constraint.mixRotate += (data2.mixRotate - constraint.mixRotate) * alpha;
					constraint.mixX += (data2.mixX - constraint.mixX) * alpha;
					constraint.mixY += (data2.mixY - constraint.mixY) * alpha;
					constraint.mixScaleX += (data2.mixScaleX - constraint.mixScaleX) * alpha;
					constraint.mixScaleY += (data2.mixScaleY - constraint.mixScaleY) * alpha;
					constraint.mixShearY += (data2.mixShearY - constraint.mixShearY) * alpha;
					break;
				}
			}
			else
			{
				GetCurveValue(out var rotate, out var x, out var y, out var scaleX, out var scaleY, out var shearY, time);
				if (blend == MixBlend.Setup)
				{
					TransformConstraintData data = constraint.data;
					constraint.mixRotate = data.mixRotate + (rotate - data.mixRotate) * alpha;
					constraint.mixX = data.mixX + (x - data.mixX) * alpha;
					constraint.mixY = data.mixY + (y - data.mixY) * alpha;
					constraint.mixScaleX = data.mixScaleX + (scaleX - data.mixScaleX) * alpha;
					constraint.mixScaleY = data.mixScaleY + (scaleY - data.mixScaleY) * alpha;
					constraint.mixShearY = data.mixShearY + (shearY - data.mixShearY) * alpha;
				}
				else
				{
					constraint.mixRotate += (rotate - constraint.mixRotate) * alpha;
					constraint.mixX += (x - constraint.mixX) * alpha;
					constraint.mixY += (y - constraint.mixY) * alpha;
					constraint.mixScaleX += (scaleX - constraint.mixScaleX) * alpha;
					constraint.mixScaleY += (scaleY - constraint.mixScaleY) * alpha;
					constraint.mixShearY += (shearY - constraint.mixShearY) * alpha;
				}
			}
		}

		public void GetCurveValue(out float rotate, out float x, out float y, out float scaleX, out float scaleY, out float shearY, float time)
		{
			float[] frames = base.frames;
			int i = Timeline.Search(frames, time, 7);
			int curveType = (int)curves[i / 7];
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				rotate = frames[i + 1];
				x = frames[i + 2];
				y = frames[i + 3];
				scaleX = frames[i + 4];
				scaleY = frames[i + 5];
				shearY = frames[i + 6];
				float t = (time - before) / (frames[i + 7] - before);
				rotate += (frames[i + 7 + 1] - rotate) * t;
				x += (frames[i + 7 + 2] - x) * t;
				y += (frames[i + 7 + 3] - y) * t;
				scaleX += (frames[i + 7 + 4] - scaleX) * t;
				scaleY += (frames[i + 7 + 5] - scaleY) * t;
				shearY += (frames[i + 7 + 6] - shearY) * t;
				break;
			}
			case 1:
				rotate = frames[i + 1];
				x = frames[i + 2];
				y = frames[i + 3];
				scaleX = frames[i + 4];
				scaleY = frames[i + 5];
				shearY = frames[i + 6];
				break;
			default:
				rotate = GetBezierValue(time, i, 1, curveType - 2);
				x = GetBezierValue(time, i, 2, curveType + 18 - 2);
				y = GetBezierValue(time, i, 3, curveType + 36 - 2);
				scaleX = GetBezierValue(time, i, 4, curveType + 54 - 2);
				scaleY = GetBezierValue(time, i, 5, curveType + 72 - 2);
				shearY = GetBezierValue(time, i, 6, curveType + 90 - 2);
				break;
			}
		}
	}
}
