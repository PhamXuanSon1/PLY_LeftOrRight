namespace Spine
{
	public class PhysicsConstraintResetTimeline : Timeline
	{
		private static readonly string[] propertyIds = new string[1] { 27.ToString() };

		private readonly int constraintIndex;

		public int PhysicsConstraintIndex => constraintIndex;

		public override int FrameCount => frames.Length;

		public PhysicsConstraintResetTimeline(int frameCount, int physicsConstraintIndex)
			: base(frameCount, propertyIds)
		{
			constraintIndex = physicsConstraintIndex;
		}

		public void SetFrame(int frame, float time)
		{
			frames[frame] = time;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			PhysicsConstraint constraint = null;
			if (constraintIndex != -1)
			{
				constraint = skeleton.physicsConstraints.Items[constraintIndex];
				if (!constraint.active)
				{
					return;
				}
			}
			float[] frames = base.frames;
			if (lastTime > time)
			{
				Apply(skeleton, lastTime, 2.1474836E+09f, null, alpha, blend, direction);
				lastTime = -1f;
			}
			else if (lastTime >= frames[frames.Length - 1])
			{
				return;
			}
			if (time < frames[0] || (!(lastTime < frames[0]) && !(time >= frames[Timeline.Search(frames, lastTime) + 1])))
			{
				return;
			}
			if (constraint != null)
			{
				constraint.Reset();
				return;
			}
			PhysicsConstraint[] constraints = skeleton.physicsConstraints.Items;
			int i = 0;
			for (int j = skeleton.physicsConstraints.Count; i < j; i++)
			{
				constraint = constraints[i];
				if (constraint.active)
				{
					constraint.Reset();
				}
			}
		}
	}
}
