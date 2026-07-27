namespace Spine
{
	public static class SpineSkeletonExtensions
	{
		public static bool IsWeighted(this VertexAttachment va)
		{
			return va.Bones != null && va.Bones.Length != 0;
		}

		public static bool InheritsRotation(this Inherit mode)
		{
			return mode == Inherit.Normal || mode == Inherit.NoScale || mode == Inherit.NoScaleOrReflection;
		}

		public static bool InheritsScale(this Inherit mode)
		{
			return mode == Inherit.Normal || mode == Inherit.NoRotationOrReflection;
		}
	}
}
