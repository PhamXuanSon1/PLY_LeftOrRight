using System;

namespace Spine
{
	public abstract class CurveTimeline1 : CurveTimeline
	{
		public const int ENTRIES = 2;

		internal const int VALUE = 1;

		public override int FrameEntries => 2;

		public CurveTimeline1(int frameCount, int bezierCount, string propertyId)
			: base(frameCount, bezierCount, propertyId)
		{
		}

		public void SetFrame(int frame, float time, float value)
		{
			frame <<= 1;
			frames[frame] = time;
			frames[frame + 1] = value;
		}

		public float GetCurveValue(float time)
		{
			float[] frames = base.frames;
			int i = frames.Length - 2;
			for (int ii = 2; ii <= i; ii += 2)
			{
				if (frames[ii] > time)
				{
					i = ii - 2;
					break;
				}
			}
			int curveType = (int)curves[i >> 1];
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				float value = frames[i + 1];
				return value + (time - before) / (frames[i + 2] - before) * (frames[i + 2 + 1] - value);
			}
			case 1:
				return frames[i + 1];
			default:
				return GetBezierValue(time, i, 1, curveType - 2);
			}
		}

		public float GetRelativeValue(float time, float alpha, MixBlend blend, float current, float setup)
		{
			if (time < frames[0])
			{
				switch (blend)
				{
				case MixBlend.Setup:
					return setup;
				case MixBlend.First:
					return current + (setup - current) * alpha;
				default:
					return current;
				}
			}
			float value = GetCurveValue(time);
			switch (blend)
			{
			case MixBlend.Setup:
				return setup + value * alpha;
			case MixBlend.First:
			case MixBlend.Replace:
				value += setup - current;
				break;
			}
			return current + value * alpha;
		}

		public float GetAbsoluteValue(float time, float alpha, MixBlend blend, float current, float setup)
		{
			if (time < frames[0])
			{
				switch (blend)
				{
				case MixBlend.Setup:
					return setup;
				case MixBlend.First:
					return current + (setup - current) * alpha;
				default:
					return current;
				}
			}
			float value = GetCurveValue(time);
			if (blend == MixBlend.Setup)
			{
				return setup + (value - setup) * alpha;
			}
			return current + (value - current) * alpha;
		}

		public float GetAbsoluteValue(float time, float alpha, MixBlend blend, float current, float setup, float value)
		{
			if (time < frames[0])
			{
				switch (blend)
				{
				case MixBlend.Setup:
					return setup;
				case MixBlend.First:
					return current + (setup - current) * alpha;
				default:
					return current;
				}
			}
			if (blend == MixBlend.Setup)
			{
				return setup + (value - setup) * alpha;
			}
			return current + (value - current) * alpha;
		}

		public float GetScaleValue(float time, float alpha, MixBlend blend, MixDirection direction, float current, float setup)
		{
			float[] frames = base.frames;
			if (time < frames[0])
			{
				switch (blend)
				{
				case MixBlend.Setup:
					return setup;
				case MixBlend.First:
					return current + (setup - current) * alpha;
				default:
					return current;
				}
			}
			float value = GetCurveValue(time) * setup;
			if (alpha == 1f)
			{
				if (blend == MixBlend.Add)
				{
					return current + value - setup;
				}
				return value;
			}
			if (direction == MixDirection.Out)
			{
				switch (blend)
				{
				case MixBlend.Setup:
					return setup + (Math.Abs(value) * (float)Math.Sign(setup) - setup) * alpha;
				case MixBlend.First:
				case MixBlend.Replace:
					return current + (Math.Abs(value) * (float)Math.Sign(current) - current) * alpha;
				}
			}
			else
			{
				switch (blend)
				{
				case MixBlend.Setup:
				{
					float s = Math.Abs(setup) * (float)Math.Sign(value);
					return s + (value - s) * alpha;
				}
				case MixBlend.First:
				case MixBlend.Replace:
				{
					float s = Math.Abs(current) * (float)Math.Sign(value);
					return s + (value - s) * alpha;
				}
				}
			}
			return current + (value - setup) * alpha;
		}
	}
}
