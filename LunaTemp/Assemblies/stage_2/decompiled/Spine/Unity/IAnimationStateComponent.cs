namespace Spine.Unity
{
	public interface IAnimationStateComponent : ISpineComponent
	{
		AnimationState AnimationState { get; }

		bool UnscaledTime { get; set; }
	}
}
