using System;

namespace Spine
{
	public abstract class CurveTimeline : Timeline
	{
		public const int LINEAR = 0;

		public const int STEPPED = 1;

		public const int BEZIER = 2;

		public const int BEZIER_SIZE = 18;

		internal float[] curves;

		public CurveTimeline(int frameCount, int bezierCount, params string[] propertyIds)
			: base(frameCount, propertyIds)
		{
			curves = new float[frameCount + bezierCount * 18];
			curves[frameCount - 1] = 1f;
		}

		public void SetLinear(int frame)
		{
			curves[frame] = 0f;
		}

		public void SetStepped(int frame)
		{
			curves[frame] = 1f;
		}

		public float GetCurveType(int frame)
		{
			return (int)curves[frame];
		}

		public void Shrink(int bezierCount)
		{
			int size = FrameCount + bezierCount * 18;
			if (curves.Length > size)
			{
				float[] newCurves = new float[size];
				Array.Copy(curves, 0, newCurves, 0, size);
				curves = newCurves;
			}
		}

		public void SetBezier(int bezier, int frame, int value, float time1, float value1, float cx1, float cy1, float cx2, float cy2, float time2, float value2)
		{
			float[] curves = this.curves;
			int i = FrameCount + bezier * 18;
			if (value == 0)
			{
				curves[frame] = 2 + i;
			}
			float tmpx = (time1 - cx1 * 2f + cx2) * 0.03f;
			float tmpy = (value1 - cy1 * 2f + cy2) * 0.03f;
			float dddx = ((cx1 - cx2) * 3f - time1 + time2) * 0.006f;
			float dddy = ((cy1 - cy2) * 3f - value1 + value2) * 0.006f;
			float ddx = tmpx * 2f + dddx;
			float ddy = tmpy * 2f + dddy;
			float dx = (cx1 - time1) * 0.3f + tmpx + dddx * (1f / 6f);
			float dy = (cy1 - value1) * 0.3f + tmpy + dddy * (1f / 6f);
			float x = time1 + dx;
			float y = value1 + dy;
			for (int j = i + 18; i < j; i += 2)
			{
				curves[i] = x;
				curves[i + 1] = y;
				dx += ddx;
				dy += ddy;
				ddx += dddx;
				ddy += dddy;
				x += dx;
				y += dy;
			}
		}

		public float GetBezierValue(float time, int frameIndex, int valueOffset, int i)
		{
			float[] curves = this.curves;
			if (curves[i] > time)
			{
				float x2 = frames[frameIndex];
				float y3 = frames[frameIndex + valueOffset];
				return y3 + (time - x2) / (curves[i] - x2) * (curves[i + 1] - y3);
			}
			int j = i + 18;
			for (i += 2; i < j; i += 2)
			{
				if (curves[i] >= time)
				{
					float x = curves[i - 2];
					float y = curves[i - 1];
					return y + (time - x) / (curves[i] - x) * (curves[i + 1] - y);
				}
			}
			frameIndex += FrameEntries;
			float x3 = curves[j - 2];
			float y2 = curves[j - 1];
			return y2 + (time - x3) / (frames[frameIndex] - x3) * (frames[frameIndex + valueOffset] - y2);
		}
	}
}
