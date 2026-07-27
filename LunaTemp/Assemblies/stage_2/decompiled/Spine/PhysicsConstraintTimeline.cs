namespace Spine
{
	public abstract class PhysicsConstraintTimeline : CurveTimeline1
	{
		private readonly int constraintIndex;

		public int PhysicsConstraintIndex => constraintIndex;

		private static string GetPropertyId(int physicsConstraintIndex, Property property)
		{
			int num = (int)property;
			return num + "|" + physicsConstraintIndex;
		}

		public PhysicsConstraintTimeline(int frameCount, int bezierCount, int physicsConstraintIndex, Property property)
			: base(frameCount, bezierCount, GetPropertyId(physicsConstraintIndex, property))
		{
			constraintIndex = physicsConstraintIndex;
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			if (constraintIndex == -1)
			{
				float value = ((time >= frames[0]) ? GetCurveValue(time) : 0f);
				PhysicsConstraint[] constraints = skeleton.physicsConstraints.Items;
				int i = 0;
				for (int j = skeleton.physicsConstraints.Count; i < j; i++)
				{
					PhysicsConstraint constraint = constraints[i];
					if (constraint.active && Global(constraint.data))
					{
						Set(constraint, GetAbsoluteValue(time, alpha, blend, Get(constraint), Setup(constraint), value));
					}
				}
			}
			else
			{
				PhysicsConstraint constraint = skeleton.physicsConstraints.Items[constraintIndex];
				if (constraint.active)
				{
					Set(constraint, GetAbsoluteValue(time, alpha, blend, Get(constraint), Setup(constraint)));
				}
			}
		}

		protected abstract float Setup(PhysicsConstraint constraint);

		protected abstract float Get(PhysicsConstraint constraint);

		protected abstract void Set(PhysicsConstraint constraint, float value);

		protected abstract bool Global(PhysicsConstraintData constraint);
	}
}
