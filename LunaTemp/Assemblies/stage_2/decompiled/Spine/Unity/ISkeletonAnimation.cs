namespace Spine.Unity
{
	public interface ISkeletonAnimation : ISpineComponent
	{
		Skeleton Skeleton { get; }

		UpdateTiming UpdateTiming { get; set; }

		event ISkeletonAnimationDelegate OnAnimationRebuild;

		event UpdateBonesDelegate UpdateLocal;

		event UpdateBonesDelegate UpdateWorld;

		event UpdateBonesDelegate UpdateComplete;
	}
}
