namespace Spine
{
	public class ShearTimeline : CurveTimeline2, IBoneTimeline
	{
		private readonly int boneIndex;

		public int BoneIndex => boneIndex;

		public ShearTimeline(int frameCount, int bezierCount, int boneIndex)
			: base(frameCount, bezierCount, 5 + "|" + boneIndex, 6 + "|" + boneIndex)
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
					bone.shearX = bone.data.shearX;
					bone.shearY = bone.data.shearY;
					break;
				case MixBlend.First:
					bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
					bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
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
			switch (blend)
			{
			case MixBlend.Setup:
				bone.shearX = bone.data.shearX + x * alpha;
				bone.shearY = bone.data.shearY + y * alpha;
				break;
			case MixBlend.First:
			case MixBlend.Replace:
				bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
				bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
				break;
			case MixBlend.Add:
				bone.shearX += x * alpha;
				bone.shearY += y * alpha;
				break;
			}
		}
	}
}
