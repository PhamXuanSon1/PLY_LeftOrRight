namespace Spine
{
	public class TranslateTimeline : CurveTimeline2, IBoneTimeline
	{
		private readonly int boneIndex;

		public int BoneIndex => boneIndex;

		public TranslateTimeline(int frameCount, int bezierCount, int boneIndex)
			: base(frameCount, bezierCount, 1 + "|" + boneIndex, 2 + "|" + boneIndex)
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
					bone.x = bone.data.x;
					bone.y = bone.data.y;
					break;
				case MixBlend.First:
					bone.x += (bone.data.x - bone.x) * alpha;
					bone.y += (bone.data.y - bone.y) * alpha;
					break;
				}
				return;
			}
			GetCurveValue(out var x, out var y, time);
			switch (blend)
			{
			case MixBlend.Setup:
				bone.x = bone.data.x + x * alpha;
				bone.y = bone.data.y + y * alpha;
				break;
			case MixBlend.First:
			case MixBlend.Replace:
				bone.x += (bone.data.x + x - bone.x) * alpha;
				bone.y += (bone.data.y + y - bone.y) * alpha;
				break;
			case MixBlend.Add:
				bone.x += x * alpha;
				bone.y += y * alpha;
				break;
			}
		}

		public void GetCurveValue(out float x, out float y, float time)
		{
			int i = Timeline.Search(frames, time, 3);
			int curveType = (int)curves[i / 3];
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
		}
	}
}
