using System;

namespace Spine
{
	public class ScaleTimeline : CurveTimeline2, IBoneTimeline
	{
		private readonly int boneIndex;

		public int BoneIndex => boneIndex;

		public ScaleTimeline(int frameCount, int bezierCount, int boneIndex)
			: base(frameCount, bezierCount, 3 + "|" + boneIndex, 4 + "|" + boneIndex)
		{
			this.boneIndex = boneIndex;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			Bone bone = skeleton.bones.Items[boneIndex];
			if (!bone.active)
			{
				return;
			}
			float[] frames = base.frames;
			if (time < frames[0])
			{
				switch (blend)
				{
				case MixBlend.Setup:
					bone.scaleX = bone.data.scaleX;
					bone.scaleY = bone.data.scaleY;
					break;
				case MixBlend.First:
					bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
					bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
					break;
				}
				return;
			}
			int i = Timeline.Search(frames, time, 3);
			int curveType = (int)curves[i / 3];
			float x;
			float y;
			switch (curveType)
			{
			case 0:
			{
				float before = frames[i];
				x = frames[i + 1];
				y = frames[i + 2];
				float t = (time - before) / (frames[i + 3] - before);
				x += (frames[i + 3 + 1] - x) * t;
				y += (frames[i + 3 + 2] - y) * t;
				break;
			}
			case 1:
				x = frames[i + 1];
				y = frames[i + 2];
				break;
			default:
				x = GetBezierValue(time, i, 1, curveType - 2);
				y = GetBezierValue(time, i, 2, curveType + 18 - 2);
				break;
			}
			x *= bone.data.scaleX;
			y *= bone.data.scaleY;
			if (alpha == 1f)
			{
				if (blend == MixBlend.Add)
				{
					bone.scaleX += x - bone.data.scaleX;
					bone.scaleY += y - bone.data.scaleY;
				}
				else
				{
					bone.scaleX = x;
					bone.scaleY = y;
				}
			}
			else if (direction == MixDirection.Out)
			{
				switch (blend)
				{
				case MixBlend.Setup:
				{
					float bx = bone.data.scaleX;
					float by = bone.data.scaleY;
					bone.scaleX = bx + (Math.Abs(x) * (float)Math.Sign(bx) - bx) * alpha;
					bone.scaleY = by + (Math.Abs(y) * (float)Math.Sign(by) - by) * alpha;
					break;
				}
				case MixBlend.First:
				case MixBlend.Replace:
				{
					float bx = bone.scaleX;
					float by = bone.scaleY;
					bone.scaleX = bx + (Math.Abs(x) * (float)Math.Sign(bx) - bx) * alpha;
					bone.scaleY = by + (Math.Abs(y) * (float)Math.Sign(by) - by) * alpha;
					break;
				}
				case MixBlend.Add:
					bone.scaleX += (x - bone.data.scaleX) * alpha;
					bone.scaleY += (y - bone.data.scaleY) * alpha;
					break;
				}
			}
			else
			{
				switch (blend)
				{
				case MixBlend.Setup:
				{
					float bx = Math.Abs(bone.data.scaleX) * (float)Math.Sign(x);
					float by = Math.Abs(bone.data.scaleY) * (float)Math.Sign(y);
					bone.scaleX = bx + (x - bx) * alpha;
					bone.scaleY = by + (y - by) * alpha;
					break;
				}
				case MixBlend.First:
				case MixBlend.Replace:
				{
					float bx = Math.Abs(bone.scaleX) * (float)Math.Sign(x);
					float by = Math.Abs(bone.scaleY) * (float)Math.Sign(y);
					bone.scaleX = bx + (x - bx) * alpha;
					bone.scaleY = by + (y - by) * alpha;
					break;
				}
				case MixBlend.Add:
					bone.scaleX += (x - bone.data.scaleX) * alpha;
					bone.scaleY += (y - bone.data.scaleY) * alpha;
					break;
				}
			}
		}
	}
}
