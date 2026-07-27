using System;
using System.Collections.Generic;
using UnityEngine;

namespace Spine.Unity
{
	[RequireComponent(typeof(Animator))]
	[HelpURL("http://esotericsoftware.com/spine-unity#SkeletonMecanim-Component")]
	public class SkeletonMecanim : SkeletonRenderer, ISkeletonAnimation, ISpineComponent
	{
		[Serializable]
		public class MecanimTranslator
		{
			public delegate void OnClipAppliedDelegate(Animation clip, int layerIndex, float weight, float time, float lastTime, bool playsBackward);

			public enum MixMode
			{
				AlwaysMix,
				MixNext,
				Hard,
				Match
			}

			protected class ClipInfos
			{
				public bool isInterruptionActive = false;

				public bool isLastFrameOfInterruption = false;

				public int clipInfoCount = 0;

				public int nextClipInfoCount = 0;

				public int interruptingClipInfoCount = 0;

				public readonly List<AnimatorClipInfo> clipInfos = new List<AnimatorClipInfo>();

				public readonly List<AnimatorClipInfo> nextClipInfos = new List<AnimatorClipInfo>();

				public readonly List<AnimatorClipInfo> interruptingClipInfos = new List<AnimatorClipInfo>();

				public float[] clipResolvedWeights = new float[0];

				public float[] nextClipResolvedWeights = new float[0];

				public float[] interruptingClipResolvedWeights = new float[0];

				public AnimatorStateInfo stateInfo;

				public AnimatorStateInfo nextStateInfo;

				public AnimatorStateInfo interruptingStateInfo;

				public float interruptingClipTimeAddition = 0f;
			}

			private class AnimationClipEqualityComparer : IEqualityComparer<AnimationClip>
			{
				internal static readonly IEqualityComparer<AnimationClip> Instance = new AnimationClipEqualityComparer();

				public bool Equals(AnimationClip x, AnimationClip y)
				{
					return x.GetInstanceID() == y.GetInstanceID();
				}

				public int GetHashCode(AnimationClip o)
				{
					return o.GetInstanceID();
				}
			}

			private class IntEqualityComparer : IEqualityComparer<int>
			{
				internal static readonly IEqualityComparer<int> Instance = new IntEqualityComparer();

				public bool Equals(int x, int y)
				{
					return x == y;
				}

				public int GetHashCode(int o)
				{
					return o;
				}
			}

			private const float WeightEpsilon = 0.0001f;

			public bool autoReset = true;

			public bool useCustomMixMode = true;

			public MixMode[] layerMixModes = new MixMode[0];

			public MixBlend[] layerBlendModes = new MixBlend[0];

			private readonly Dictionary<int, Animation> animationTable = new Dictionary<int, Animation>(IntEqualityComparer.Instance);

			private readonly Dictionary<AnimationClip, int> clipNameHashCodeTable = new Dictionary<AnimationClip, int>(AnimationClipEqualityComparer.Instance);

			private readonly List<Animation> previousAnimations = new List<Animation>();

			protected ClipInfos[] layerClipInfos = new ClipInfos[0];

			private Animator animator;

			public Animator Animator => animator;

			public int MecanimLayerCount
			{
				get
				{
					if (!animator)
					{
						return 0;
					}
					return animator.layerCount;
				}
			}

			public string[] MecanimLayerNames
			{
				get
				{
					if (!animator)
					{
						return new string[0];
					}
					string[] layerNames = new string[animator.layerCount];
					for (int i = 0; i < animator.layerCount; i++)
					{
						layerNames[i] = animator.GetLayerName(i);
					}
					return layerNames;
				}
			}

			protected event OnClipAppliedDelegate _OnClipApplied;

			public event OnClipAppliedDelegate OnClipApplied
			{
				add
				{
					_OnClipApplied += value;
				}
				remove
				{
					_OnClipApplied -= value;
				}
			}

			public void Initialize(Animator animator, SkeletonDataAsset skeletonDataAsset)
			{
				this.animator = animator;
				previousAnimations.Clear();
				animationTable.Clear();
				SkeletonData data = skeletonDataAsset.GetSkeletonData(true);
				foreach (Animation a in data.Animations)
				{
					animationTable.Add(a.Name.GetHashCode(), a);
				}
				clipNameHashCodeTable.Clear();
				ClearClipInfosForLayers();
			}

			private bool ApplyAnimation(Skeleton skeleton, AnimatorClipInfo info, AnimatorStateInfo stateInfo, int layerIndex, float layerWeight, MixBlend layerBlendMode, bool useCustomClipWeight = false, float customClipWeight = 1f)
			{
				float weight = info.weight * layerWeight;
				if (weight < 0.0001f)
				{
					return false;
				}
				Animation clip = GetAnimation(info.clip);
				if (clip == null)
				{
					return false;
				}
				float time = AnimationTime(stateInfo.normalizedTime, info.clip.length, info.clip.isLooping, stateInfo.speed < 0f);
				weight = (useCustomClipWeight ? (layerWeight * customClipWeight) : weight);
				clip.Apply(skeleton, 0f, time, info.clip.isLooping, null, weight, layerBlendMode, MixDirection.In);
				if (this._OnClipApplied != null)
				{
					OnClipAppliedCallback(clip, stateInfo, layerIndex, time, info.clip.isLooping, weight);
				}
				return true;
			}

			private bool ApplyInterruptionAnimation(Skeleton skeleton, bool interpolateWeightTo1, AnimatorClipInfo info, AnimatorStateInfo stateInfo, int layerIndex, float layerWeight, MixBlend layerBlendMode, float interruptingClipTimeAddition, bool useCustomClipWeight = false, float customClipWeight = 1f)
			{
				float clipWeight = (interpolateWeightTo1 ? ((info.weight + 1f) * 0.5f) : info.weight);
				float weight = clipWeight * layerWeight;
				if (weight < 0.0001f)
				{
					return false;
				}
				Animation clip = GetAnimation(info.clip);
				if (clip == null)
				{
					return false;
				}
				float time = AnimationTime(stateInfo.normalizedTime + interruptingClipTimeAddition, info.clip.length, info.clip.isLooping, stateInfo.speed < 0f);
				weight = (useCustomClipWeight ? (layerWeight * customClipWeight) : weight);
				clip.Apply(skeleton, 0f, time, info.clip.isLooping, null, weight, layerBlendMode, MixDirection.In);
				if (this._OnClipApplied != null)
				{
					OnClipAppliedCallback(clip, stateInfo, layerIndex, time, info.clip.isLooping, weight);
				}
				return true;
			}

			private void OnClipAppliedCallback(Animation clip, AnimatorStateInfo stateInfo, int layerIndex, float time, bool isLooping, float weight)
			{
				float speedFactor = stateInfo.speedMultiplier * stateInfo.speed;
				float lastTime = time - Time.deltaTime * speedFactor;
				float clipDuration = clip.Duration;
				if (isLooping && clipDuration != 0f)
				{
					time %= clipDuration;
					lastTime %= clipDuration;
				}
				this._OnClipApplied(clip, layerIndex, weight, time, lastTime, speedFactor < 0f);
			}

			public void Apply(Skeleton skeleton)
			{
				if (layerMixModes.Length < animator.layerCount)
				{
					int oldSize = layerMixModes.Length;
					Array.Resize(ref layerMixModes, animator.layerCount);
					for (int layer = oldSize; layer < animator.layerCount; layer++)
					{
						bool isAdditiveLayer = false;
						if (layer < layerBlendModes.Length)
						{
							isAdditiveLayer = layerBlendModes[layer] == MixBlend.Add;
						}
						layerMixModes[layer] = ((!isAdditiveLayer) ? MixMode.MixNext : MixMode.AlwaysMix);
					}
				}
				InitClipInfosForLayers();
				int layer2 = 0;
				for (int j = animator.layerCount; layer2 < j; layer2++)
				{
					GetStateUpdatesFromAnimator(layer2);
				}
				if (autoReset)
				{
					List<Animation> previousAnimations = this.previousAnimations;
					int i = 0;
					for (int l = previousAnimations.Count; i < l; i++)
					{
						previousAnimations[i].Apply(skeleton, 0f, 0f, false, null, 0f, MixBlend.Setup, MixDirection.Out);
					}
					previousAnimations.Clear();
					int layer4 = 0;
					for (int m = animator.layerCount; layer4 < m; layer4++)
					{
						float layerWeight2 = ((layer4 == 0) ? 1f : animator.GetLayerWeight(layer4));
						if (layerWeight2 <= 0f)
						{
							continue;
						}
						bool hasNext2 = animator.GetNextAnimatorStateInfo(layer4).fullPathHash != 0;
						GetAnimatorClipInfos(layer4, out var isInterruptionActive2, out var clipInfoCount2, out var nextClipInfoCount2, out var interruptingClipInfoCount2, out var clipInfo2, out var nextClipInfo2, out var interruptingClipInfo2, out var shallInterpolateWeightTo1);
						for (int c10 = 0; c10 < clipInfoCount2; c10++)
						{
							AnimatorClipInfo info = clipInfo2[c10];
							float weight = info.weight * layerWeight2;
							if (!(weight < 0.0001f))
							{
								Animation clip = GetAnimation(info.clip);
								if (clip != null)
								{
									previousAnimations.Add(clip);
								}
							}
						}
						if (hasNext2)
						{
							for (int c9 = 0; c9 < nextClipInfoCount2; c9++)
							{
								AnimatorClipInfo info3 = nextClipInfo2[c9];
								float weight3 = info3.weight * layerWeight2;
								if (!(weight3 < 0.0001f))
								{
									Animation clip3 = GetAnimation(info3.clip);
									if (clip3 != null)
									{
										previousAnimations.Add(clip3);
									}
								}
							}
						}
						if (!isInterruptionActive2)
						{
							continue;
						}
						for (int c8 = 0; c8 < interruptingClipInfoCount2; c8++)
						{
							AnimatorClipInfo info2 = interruptingClipInfo2[c8];
							float clipWeight = (shallInterpolateWeightTo1 ? ((info2.weight + 1f) * 0.5f) : info2.weight);
							float weight2 = clipWeight * layerWeight2;
							if (!(weight2 < 0.0001f))
							{
								Animation clip2 = GetAnimation(info2.clip);
								if (clip2 != null)
								{
									previousAnimations.Add(clip2);
								}
							}
						}
					}
				}
				int layer3 = 0;
				for (int k = animator.layerCount; layer3 < k; layer3++)
				{
					float layerWeight = ((layer3 == 0) ? 1f : animator.GetLayerWeight(layer3));
					GetAnimatorStateInfos(layer3, out var isInterruptionActive, out var stateInfo, out var nextStateInfo, out var interruptingStateInfo, out var interruptingClipTimeAddition);
					bool hasNext = nextStateInfo.fullPathHash != 0;
					GetAnimatorClipInfos(layer3, out isInterruptionActive, out var clipInfoCount, out var nextClipInfoCount, out var interruptingClipInfoCount, out var clipInfo, out var nextClipInfo, out var interruptingClipInfo, out var interpolateWeightTo1);
					MixBlend layerBlendMode = ((layer3 < layerBlendModes.Length) ? layerBlendModes[layer3] : MixBlend.Replace);
					MixMode mode = GetMixMode(layer3, layerBlendMode);
					switch (mode)
					{
					case MixMode.AlwaysMix:
					{
						for (int c7 = 0; c7 < clipInfoCount; c7++)
						{
							ApplyAnimation(skeleton, clipInfo[c7], stateInfo, layer3, layerWeight, layerBlendMode);
						}
						if (hasNext)
						{
							for (int c6 = 0; c6 < nextClipInfoCount; c6++)
							{
								ApplyAnimation(skeleton, nextClipInfo[c6], nextStateInfo, layer3, layerWeight, layerBlendMode);
							}
						}
						if (isInterruptionActive)
						{
							for (int c5 = 0; c5 < interruptingClipInfoCount; c5++)
							{
								ApplyInterruptionAnimation(skeleton, interpolateWeightTo1, interruptingClipInfo[c5], interruptingStateInfo, layer3, layerWeight, layerBlendMode, interruptingClipTimeAddition);
							}
						}
						continue;
					}
					case MixMode.Match:
					{
						MatchWeights(layerClipInfos[layer3], hasNext, isInterruptionActive, clipInfoCount, nextClipInfoCount, interruptingClipInfoCount, clipInfo, nextClipInfo, interruptingClipInfo);
						float[] customWeights = layerClipInfos[layer3].clipResolvedWeights;
						for (int c4 = 0; c4 < clipInfoCount; c4++)
						{
							ApplyAnimation(skeleton, clipInfo[c4], stateInfo, layer3, layerWeight, layerBlendMode, true, customWeights[c4]);
						}
						if (hasNext)
						{
							customWeights = layerClipInfos[layer3].nextClipResolvedWeights;
							for (int c3 = 0; c3 < nextClipInfoCount; c3++)
							{
								ApplyAnimation(skeleton, nextClipInfo[c3], nextStateInfo, layer3, layerWeight, layerBlendMode, true, customWeights[c3]);
							}
						}
						if (isInterruptionActive)
						{
							customWeights = layerClipInfos[layer3].interruptingClipResolvedWeights;
							for (int c2 = 0; c2 < interruptingClipInfoCount; c2++)
							{
								ApplyInterruptionAnimation(skeleton, interpolateWeightTo1, interruptingClipInfo[c2], interruptingStateInfo, layer3, layerWeight, layerBlendMode, interruptingClipTimeAddition, true, customWeights[c2]);
							}
						}
						continue;
					}
					}
					int c;
					for (c = 0; c < clipInfoCount; c++)
					{
						if (ApplyAnimation(skeleton, clipInfo[c], stateInfo, layer3, layerWeight, layerBlendMode, true))
						{
							c++;
							break;
						}
					}
					for (; c < clipInfoCount; c++)
					{
						ApplyAnimation(skeleton, clipInfo[c], stateInfo, layer3, layerWeight, layerBlendMode);
					}
					c = 0;
					if (hasNext)
					{
						if (mode == MixMode.Hard)
						{
							for (; c < nextClipInfoCount; c++)
							{
								if (ApplyAnimation(skeleton, nextClipInfo[c], nextStateInfo, layer3, layerWeight, layerBlendMode, true))
								{
									c++;
									break;
								}
							}
						}
						for (; c < nextClipInfoCount; c++)
						{
							if (!ApplyAnimation(skeleton, nextClipInfo[c], nextStateInfo, layer3, layerWeight, layerBlendMode))
							{
							}
						}
					}
					c = 0;
					if (!isInterruptionActive)
					{
						continue;
					}
					if (mode == MixMode.Hard)
					{
						for (; c < interruptingClipInfoCount; c++)
						{
							if (ApplyInterruptionAnimation(skeleton, interpolateWeightTo1, interruptingClipInfo[c], interruptingStateInfo, layer3, layerWeight, layerBlendMode, interruptingClipTimeAddition, true))
							{
								c++;
								break;
							}
						}
					}
					for (; c < interruptingClipInfoCount; c++)
					{
						ApplyInterruptionAnimation(skeleton, interpolateWeightTo1, interruptingClipInfo[c], interruptingStateInfo, layer3, layerWeight, layerBlendMode, interruptingClipTimeAddition);
					}
				}
			}

			protected void MatchWeights(ClipInfos clipInfos, bool hasNext, bool isInterruptionActive, int clipInfoCount, int nextClipInfoCount, int interruptingClipInfoCount, IList<AnimatorClipInfo> clipInfo, IList<AnimatorClipInfo> nextClipInfo, IList<AnimatorClipInfo> interruptingClipInfo)
			{
				if (clipInfos.clipResolvedWeights.Length < clipInfoCount)
				{
					Array.Resize(ref clipInfos.clipResolvedWeights, clipInfoCount);
				}
				if (hasNext && clipInfos.nextClipResolvedWeights.Length < nextClipInfoCount)
				{
					Array.Resize(ref clipInfos.nextClipResolvedWeights, nextClipInfoCount);
				}
				if (isInterruptionActive && clipInfos.interruptingClipResolvedWeights.Length < interruptingClipInfoCount)
				{
					Array.Resize(ref clipInfos.interruptingClipResolvedWeights, interruptingClipInfoCount);
				}
				float inverseWeight = 1f;
				if (isInterruptionActive)
				{
					for (int c = interruptingClipInfoCount - 1; c >= 0; c--)
					{
						float unityWeight2 = interruptingClipInfo[c].weight;
						clipInfos.interruptingClipResolvedWeights[c] = interruptingClipInfo[c].weight * inverseWeight;
						inverseWeight /= 1f - unityWeight2;
					}
				}
				if (hasNext)
				{
					for (int c3 = nextClipInfoCount - 1; c3 >= 0; c3--)
					{
						float unityWeight3 = nextClipInfo[c3].weight;
						clipInfos.nextClipResolvedWeights[c3] = nextClipInfo[c3].weight * inverseWeight;
						inverseWeight /= 1f - unityWeight3;
					}
				}
				for (int c2 = clipInfoCount - 1; c2 >= 0; c2--)
				{
					float unityWeight = clipInfo[c2].weight;
					clipInfos.clipResolvedWeights[c2] = ((c2 == 0) ? 1f : (clipInfo[c2].weight * inverseWeight));
					inverseWeight /= 1f - unityWeight;
				}
			}

			public KeyValuePair<Animation, float> GetActiveAnimationAndTime(int layer)
			{
				if (layer >= layerClipInfos.Length)
				{
					return new KeyValuePair<Animation, float>(null, 0f);
				}
				ClipInfos layerInfos = layerClipInfos[layer];
				bool isInterruptionActive = layerInfos.isInterruptionActive;
				AnimationClip clip = null;
				Animation animation = null;
				AnimatorStateInfo stateInfo;
				if (isInterruptionActive && layerInfos.interruptingClipInfoCount > 0)
				{
					clip = layerInfos.interruptingClipInfos[0].clip;
					stateInfo = layerInfos.interruptingStateInfo;
				}
				else
				{
					clip = layerInfos.clipInfos[0].clip;
					stateInfo = layerInfos.stateInfo;
				}
				animation = GetAnimation(clip);
				float time = AnimationTime(stateInfo.normalizedTime, clip.length, clip.isLooping, stateInfo.speed < 0f);
				return new KeyValuePair<Animation, float>(animation, time);
			}

			private static float AnimationTime(float normalizedTime, float clipLength, bool loop, bool reversed)
			{
				float time = ToSpineAnimationTime(normalizedTime, clipLength, loop, reversed);
				if (loop)
				{
					return time;
				}
				return (clipLength - time < 1f / 30f) ? clipLength : time;
			}

			private static float ToSpineAnimationTime(float normalizedTime, float clipLength, bool loop, bool reversed)
			{
				if (reversed)
				{
					normalizedTime = 1f - normalizedTime;
				}
				if (normalizedTime < 0f)
				{
					normalizedTime = (loop ? (normalizedTime % 1f + 1f) : 0f);
				}
				return normalizedTime * clipLength;
			}

			private void InitClipInfosForLayers()
			{
				if (layerClipInfos.Length >= animator.layerCount)
				{
					return;
				}
				Array.Resize(ref layerClipInfos, animator.layerCount);
				int layer = 0;
				for (int i = animator.layerCount; layer < i; layer++)
				{
					if (layerClipInfos[layer] == null)
					{
						layerClipInfos[layer] = new ClipInfos();
					}
				}
			}

			private void ClearClipInfosForLayers()
			{
				int layer = 0;
				for (int i = layerClipInfos.Length; layer < i; layer++)
				{
					if (layerClipInfos[layer] == null)
					{
						layerClipInfos[layer] = new ClipInfos();
						continue;
					}
					layerClipInfos[layer].isInterruptionActive = false;
					layerClipInfos[layer].isLastFrameOfInterruption = false;
					layerClipInfos[layer].clipInfos.Clear();
					layerClipInfos[layer].nextClipInfos.Clear();
					layerClipInfos[layer].interruptingClipInfos.Clear();
				}
			}

			private MixMode GetMixMode(int layer, MixBlend layerBlendMode)
			{
				if (useCustomMixMode)
				{
					MixMode mode = layerMixModes[layer];
					if (layerBlendMode == MixBlend.Add && mode == MixMode.MixNext)
					{
						mode = MixMode.AlwaysMix;
						layerMixModes[layer] = mode;
					}
					return mode;
				}
				return (layerBlendMode != MixBlend.Add) ? MixMode.MixNext : MixMode.AlwaysMix;
			}

			private void GetStateUpdatesFromAnimator(int layer)
			{
				ClipInfos layerInfos = layerClipInfos[layer];
				int clipInfoCount = animator.GetCurrentAnimatorClipInfoCount(layer);
				int nextClipInfoCount = animator.GetNextAnimatorClipInfoCount(layer);
				List<AnimatorClipInfo> clipInfos = layerInfos.clipInfos;
				List<AnimatorClipInfo> nextClipInfos = layerInfos.nextClipInfos;
				List<AnimatorClipInfo> interruptingClipInfos = layerInfos.interruptingClipInfos;
				layerInfos.isInterruptionActive = clipInfoCount == 0 && clipInfos.Count != 0 && nextClipInfoCount == 0 && nextClipInfos.Count != 0;
				if (layerInfos.isInterruptionActive)
				{
					AnimatorStateInfo interruptingStateInfo = animator.GetNextAnimatorStateInfo(layer);
					layerInfos.isLastFrameOfInterruption = interruptingStateInfo.fullPathHash == 0;
					if (!layerInfos.isLastFrameOfInterruption)
					{
						animator.GetNextAnimatorClipInfo(layer, interruptingClipInfos);
						layerInfos.interruptingClipInfoCount = interruptingClipInfos.Count;
						float oldTime = layerInfos.interruptingStateInfo.normalizedTime;
						float newTime = interruptingStateInfo.normalizedTime;
						layerInfos.interruptingClipTimeAddition = newTime - oldTime;
						layerInfos.interruptingStateInfo = interruptingStateInfo;
					}
					return;
				}
				layerInfos.clipInfoCount = clipInfoCount;
				layerInfos.nextClipInfoCount = nextClipInfoCount;
				layerInfos.interruptingClipInfoCount = 0;
				layerInfos.isLastFrameOfInterruption = false;
				if (clipInfos.Capacity < clipInfoCount)
				{
					clipInfos.Capacity = clipInfoCount;
				}
				if (nextClipInfos.Capacity < nextClipInfoCount)
				{
					nextClipInfos.Capacity = nextClipInfoCount;
				}
				animator.GetCurrentAnimatorClipInfo(layer, clipInfos);
				animator.GetNextAnimatorClipInfo(layer, nextClipInfos);
				layerInfos.stateInfo = animator.GetCurrentAnimatorStateInfo(layer);
				layerInfos.nextStateInfo = animator.GetNextAnimatorStateInfo(layer);
			}

			private void GetAnimatorClipInfos(int layer, out bool isInterruptionActive, out int clipInfoCount, out int nextClipInfoCount, out int interruptingClipInfoCount, out IList<AnimatorClipInfo> clipInfo, out IList<AnimatorClipInfo> nextClipInfo, out IList<AnimatorClipInfo> interruptingClipInfo, out bool shallInterpolateWeightTo1)
			{
				ClipInfos layerInfos = layerClipInfos[layer];
				isInterruptionActive = layerInfos.isInterruptionActive;
				clipInfoCount = layerInfos.clipInfoCount;
				nextClipInfoCount = layerInfos.nextClipInfoCount;
				interruptingClipInfoCount = layerInfos.interruptingClipInfoCount;
				clipInfo = layerInfos.clipInfos;
				nextClipInfo = layerInfos.nextClipInfos;
				interruptingClipInfo = (isInterruptionActive ? layerInfos.interruptingClipInfos : null);
				shallInterpolateWeightTo1 = layerInfos.isLastFrameOfInterruption;
			}

			private void GetAnimatorStateInfos(int layer, out bool isInterruptionActive, out AnimatorStateInfo stateInfo, out AnimatorStateInfo nextStateInfo, out AnimatorStateInfo interruptingStateInfo, out float interruptingClipTimeAddition)
			{
				ClipInfos layerInfos = layerClipInfos[layer];
				isInterruptionActive = layerInfos.isInterruptionActive;
				stateInfo = layerInfos.stateInfo;
				nextStateInfo = layerInfos.nextStateInfo;
				interruptingStateInfo = layerInfos.interruptingStateInfo;
				interruptingClipTimeAddition = (layerInfos.isLastFrameOfInterruption ? layerInfos.interruptingClipTimeAddition : 0f);
			}

			private Animation GetAnimation(AnimationClip clip)
			{
				if (!clipNameHashCodeTable.TryGetValue(clip, out var clipNameHashCode))
				{
					clipNameHashCode = clip.name.GetHashCode();
					clipNameHashCodeTable.Add(clip, clipNameHashCode);
				}
				animationTable.TryGetValue(clipNameHashCode, out var animation);
				return animation;
			}
		}

		[SerializeField]
		protected MecanimTranslator translator;

		private bool wasUpdatedAfterInit = true;

		[SerializeField]
		protected UpdateTiming updateTiming = UpdateTiming.InUpdate;

		public MecanimTranslator Translator => translator;

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

		public override void Initialize(bool overwrite, bool quiet = false)
		{
			if (valid && !overwrite)
			{
				return;
			}
			base.Initialize(overwrite, quiet);
			if (valid)
			{
				if (translator == null)
				{
					translator = new MecanimTranslator();
				}
				translator.Initialize(GetComponent<Animator>(), skeletonDataAsset);
				wasUpdatedAfterInit = false;
				if (this._OnAnimationRebuild != null)
				{
					this._OnAnimationRebuild(this);
				}
			}
		}

		public virtual void Update()
		{
			if (valid && updateTiming == UpdateTiming.InUpdate)
			{
				UpdateAnimation(Time.deltaTime);
			}
		}

		public virtual void FixedUpdate()
		{
			if (valid && updateTiming == UpdateTiming.InFixedUpdate)
			{
				UpdateAnimation(Time.deltaTime);
			}
		}

		public virtual void Update(float deltaTime)
		{
			if (valid)
			{
				UpdateAnimation(deltaTime);
			}
		}

		protected void UpdateAnimation(float deltaTime)
		{
			wasUpdatedAfterInit = true;
			if (updateMode > UpdateMode.OnlyAnimationStatus)
			{
				skeleton.Update(deltaTime);
				ApplyTransformMovementToPhysics();
				ApplyAnimation();
			}
		}

		public virtual void ApplyAnimation()
		{
			if (this._BeforeApply != null)
			{
				this._BeforeApply(this);
			}
			translator.Apply(skeleton);
			AfterAnimationApplied();
		}

		public virtual void AfterAnimationApplied()
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
			if (updateTiming == UpdateTiming.InLateUpdate && valid && translator != null && translator.Animator != null)
			{
				UpdateAnimation(Time.deltaTime);
			}
			if (!wasUpdatedAfterInit)
			{
				Update();
			}
			base.LateUpdate();
		}

		public override void OnBecameVisible()
		{
			UpdateMode previousUpdateMode = updateMode;
			updateMode = UpdateMode.FullUpdate;
			if (previousUpdateMode != UpdateMode.FullUpdate && previousUpdateMode != UpdateMode.EverythingExceptMesh)
			{
				Update();
			}
			if (previousUpdateMode != UpdateMode.FullUpdate)
			{
				LateUpdate();
			}
		}
	}
}
