using UnityEngine;

namespace Spine.Unity
{
	[ExecuteAlways]
	[AddComponentMenu("Spine/SkeletonAnimation")]
	[HelpURL("http://esotericsoftware.com/spine-unity#SkeletonAnimation-Component")]
	public class SkeletonAnimation : SkeletonRenderer, ISkeletonAnimation, ISpineComponent, IAnimationStateComponent
	{
		public AnimationState state;

		private bool wasUpdatedAfterInit = true;

		[SerializeField]
		protected UpdateTiming updateTiming = UpdateTiming.InUpdate;

		[SerializeField]
		protected bool unscaledTime;

		[SerializeField]
		[SpineAnimation("", "", true, false, false)]
		private string _animationName;

		public bool loop;

		public float timeScale = 1f;

		public AnimationState AnimationState
		{
			get
			{
				Initialize(false);
				return state;
			}
		}

		public UpdateTiming UpdateTiming
		{
			get
			{
				return updateTiming;
			}
			set
			{
				updateTiming = value;
			}
		}

		public bool UnscaledTime
		{
			get
			{
				return unscaledTime;
			}
			set
			{
				unscaledTime = value;
			}
		}

		public string AnimationName
		{
			get
			{
				if (!valid)
				{
					return _animationName;
				}
				return state.GetCurrent(0)?.Animation.Name;
			}
			set
			{
				Initialize(false);
				if (_animationName == value)
				{
					TrackEntry entry = state.GetCurrent(0);
					if (entry != null && entry.Loop == loop)
					{
						return;
					}
				}
				_animationName = value;
				if (string.IsNullOrEmpty(value))
				{
					state.ClearTrack(0);
					return;
				}
				Animation animationObject = skeletonDataAsset.GetSkeletonData(false).FindAnimation(value);
				if (animationObject != null)
				{
					state.SetAnimation(0, animationObject, loop);
				}
			}
		}

		protected event ISkeletonAnimationDelegate _OnAnimationRebuild;

		protected event UpdateBonesDelegate _BeforeApply;

		protected event UpdateBonesDelegate _UpdateLocal;

		protected event UpdateBonesDelegate _UpdateWorld;

		protected event UpdateBonesDelegate _UpdateComplete;

		public event ISkeletonAnimationDelegate OnAnimationRebuild
		{
			add
			{
				_OnAnimationRebuild += value;
			}
			remove
			{
				_OnAnimationRebuild -= value;
			}
		}

		public event UpdateBonesDelegate BeforeApply
		{
			add
			{
				_BeforeApply += value;
			}
			remove
			{
				_BeforeApply -= value;
			}
		}

		public event UpdateBonesDelegate UpdateLocal
		{
			add
			{
				_UpdateLocal += value;
			}
			remove
			{
				_UpdateLocal -= value;
			}
		}

		public event UpdateBonesDelegate UpdateWorld
		{
			add
			{
				_UpdateWorld += value;
			}
			remove
			{
				_UpdateWorld -= value;
			}
		}

		public event UpdateBonesDelegate UpdateComplete
		{
			add
			{
				_UpdateComplete += value;
			}
			remove
			{
				_UpdateComplete -= value;
			}
		}

		public static SkeletonAnimation AddToGameObject(GameObject gameObject, SkeletonDataAsset skeletonDataAsset, bool quiet = false)
		{
			return SkeletonRenderer.AddSpineComponent<SkeletonAnimation>(gameObject, skeletonDataAsset, quiet);
		}

		public static SkeletonAnimation NewSkeletonAnimationGameObject(SkeletonDataAsset skeletonDataAsset, bool quiet = false)
		{
			return SkeletonRenderer.NewSpineGameObject<SkeletonAnimation>(skeletonDataAsset, quiet);
		}

		public override void ClearState()
		{
			base.ClearState();
			if (state != null)
			{
				state.ClearTracks();
			}
		}

		public override void Initialize(bool overwrite, bool quiet = false)
		{
			if (valid && !overwrite)
			{
				return;
			}
			state = null;
			base.Initialize(overwrite, quiet);
			if (!valid)
			{
				return;
			}
			state = new AnimationState(skeletonDataAsset.GetAnimationStateData());
			state.Dispose += OnAnimationDisposed;
			wasUpdatedAfterInit = false;
			if (!string.IsNullOrEmpty(_animationName))
			{
				Animation animationObject = skeletonDataAsset.GetSkeletonData(false).FindAnimation(_animationName);
				if (animationObject != null)
				{
					state.SetAnimation(0, animationObject, loop);
				}
			}
			if (this._OnAnimationRebuild != null)
			{
				this._OnAnimationRebuild(this);
			}
		}

		protected virtual void Update()
		{
			if (updateTiming == UpdateTiming.InUpdate)
			{
				Update(unscaledTime ? Time.unscaledDeltaTime : Time.deltaTime);
			}
		}

		protected virtual void FixedUpdate()
		{
			if (updateTiming == UpdateTiming.InFixedUpdate)
			{
				Update(unscaledTime ? Time.unscaledDeltaTime : Time.deltaTime);
			}
		}

		public void Update(float deltaTime)
		{
			if (!valid || state == null)
			{
				return;
			}
			wasUpdatedAfterInit = true;
			if (updateMode >= UpdateMode.OnlyAnimationStatus)
			{
				UpdateAnimationStatus(deltaTime);
				if (updateMode != UpdateMode.OnlyAnimationStatus)
				{
					ApplyAnimation();
				}
			}
		}

		protected void UpdateAnimationStatus(float deltaTime)
		{
			deltaTime *= timeScale;
			state.Update(deltaTime);
			skeleton.Update(deltaTime);
			ApplyTransformMovementToPhysics();
			if (updateMode == UpdateMode.OnlyAnimationStatus)
			{
				state.ApplyEventTimelinesOnly(skeleton, false);
			}
		}

		public virtual void ApplyAnimation()
		{
			if (this._BeforeApply != null)
			{
				this._BeforeApply(this);
			}
			if (updateMode != UpdateMode.OnlyEventTimelines)
			{
				state.Apply(skeleton);
			}
			else
			{
				state.ApplyEventTimelinesOnly(skeleton);
			}
			AfterAnimationApplied();
		}

		public void AfterAnimationApplied()
		{
			if (this._UpdateLocal != null)
			{
				this._UpdateLocal(this);
			}
			if (this._UpdateWorld == null)
			{
				UpdateWorldTransform(Skeleton.Physics.Update);
			}
			else
			{
				UpdateWorldTransform(Skeleton.Physics.Pose);
				this._UpdateWorld(this);
				UpdateWorldTransform(Skeleton.Physics.Update);
			}
			if (this._UpdateComplete != null)
			{
				this._UpdateComplete(this);
			}
		}

		public override void LateUpdate()
		{
			if (updateTiming == UpdateTiming.InLateUpdate && valid)
			{
				Update(unscaledTime ? Time.unscaledDeltaTime : Time.deltaTime);
			}
			if (!wasUpdatedAfterInit)
			{
				Update(0f);
			}
			base.LateUpdate();
		}

		public override void OnBecameVisible()
		{
			UpdateMode previousUpdateMode = updateMode;
			updateMode = UpdateMode.FullUpdate;
			if (previousUpdateMode != UpdateMode.FullUpdate && previousUpdateMode != UpdateMode.EverythingExceptMesh)
			{
				Update(0f);
			}
			if (previousUpdateMode != UpdateMode.FullUpdate)
			{
				LateUpdate();
			}
		}

		protected virtual void OnAnimationDisposed(TrackEntry entry)
		{
			if (updateMode != UpdateMode.FullUpdate && updateMode != UpdateMode.EverythingExceptMesh)
			{
				entry.Animation.Apply(skeleton, 0f, 0f, false, null, 0f, MixBlend.Setup, MixDirection.Out);
			}
		}
	}
}
