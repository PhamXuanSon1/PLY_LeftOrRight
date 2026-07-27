using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;
using UnityEngine.UI;

namespace Spine.Unity
{
	[ExecuteAlways]
	[RequireComponent(typeof(CanvasRenderer), typeof(RectTransform))]
	[DisallowMultipleComponent]
	[AddComponentMenu("Spine/SkeletonGraphic (Unity UI Canvas)")]
	[HelpURL("http://esotericsoftware.com/spine-unity#SkeletonGraphic-Component")]
	public class SkeletonGraphic : MaskableGraphic, ISkeletonComponent, ISpineComponent, IAnimationStateComponent, ISkeletonAnimation, IHasSkeletonDataAsset
	{
		public enum LayoutMode
		{
			None,
			WidthControlsHeight,
			HeightControlsWidth,
			FitInParent,
			EnvelopeParent
		}

		public delegate void MeshAssignmentDelegateSingle(Mesh mesh, Material graphicMaterial, Texture texture);

		public delegate void MeshAssignmentDelegateMultiple(int meshCount, Mesh[] meshes, Material[] graphicMaterials, Texture[] textures);

		public delegate void SkeletonRendererDelegate(SkeletonGraphic skeletonGraphic);

		public delegate void InstructionDelegate(SkeletonRendererInstruction instruction);

		public SkeletonDataAsset skeletonDataAsset;

		public Material additiveMaterial;

		public Material multiplyMaterial;

		public Material screenMaterial;

		[FormerlySerializedAs("m_Color")]
		[SerializeField]
		protected Color m_SkeletonColor = Color.white;

		[SpineSkin("", "skeletonDataAsset", false, false, true, false)]
		public string initialSkinName;

		public bool initialFlipX;

		public bool initialFlipY;

		[SpineAnimation("", "skeletonDataAsset", true, false, false)]
		public string startingAnimation;

		public bool startingLoop;

		public float timeScale = 1f;

		public bool freeze;

		protected float meshScale = 1f;

		protected Vector2 meshOffset = Vector2.zero;

		public LayoutMode layoutScaleMode = LayoutMode.None;

		[SerializeField]
		protected Vector2 referenceSize = Vector2.one;

		[SerializeField]
		protected Vector2 pivotOffset = Vector2.zero;

		[SerializeField]
		protected float referenceScale = 1f;

		[SerializeField]
		protected float layoutScale = 1f;

		protected const bool EditReferenceRect = false;

		protected UpdateMode updateMode = UpdateMode.FullUpdate;

		public UpdateMode updateWhenInvisible = UpdateMode.FullUpdate;

		public bool allowMultipleCanvasRenderers = false;

		public List<CanvasRenderer> canvasRenderers = new List<CanvasRenderer>();

		protected List<SkeletonSubmeshGraphic> submeshGraphics = new List<SkeletonSubmeshGraphic>();

		protected int usedRenderersCount = 0;

		public const string SeparatorPartGameObjectName = "Part";

		[SerializeField]
		[SpineSlot("", "", false, true, false)]
		protected string[] separatorSlotNames = new string[0];

		[NonSerialized]
		public readonly List<Slot> separatorSlots = new List<Slot>();

		public bool enableSeparatorSlots = false;

		[SerializeField]
		protected List<Transform> separatorParts = new List<Transform>();

		public bool updateSeparatorPartLocation = true;

		public bool updateSeparatorPartScale = false;

		private bool wasUpdatedAfterInit = true;

		private Texture baseTexture = null;

		public bool disableMeshAssignmentOnOverride = true;

		[NonSerialized]
		private readonly Dictionary<Texture, Texture> customTextureOverride = new Dictionary<Texture, Texture>();

		[NonSerialized]
		private readonly Dictionary<Texture, Material> customMaterialOverride = new Dictionary<Texture, Material>();

		private Texture overrideTexture;

		protected Skeleton skeleton;

		protected AnimationState state;

		[SerializeField]
		protected Vector2 physicsPositionInheritanceFactor = Vector2.one;

		[SerializeField]
		protected float physicsRotationInheritanceFactor = 1f;

		[SerializeField]
		protected Transform physicsMovementRelativeTo = null;

		protected Vector2 lastPosition;

		protected float lastRotation;

		[SerializeField]
		protected MeshGenerator meshGenerator = new MeshGenerator();

		private DoubleBuffered<MeshRendererBuffers.SmartMesh> meshBuffers;

		private SkeletonRendererInstruction currentInstructions = new SkeletonRendererInstruction();

		private readonly ExposedList<Mesh> meshes = new ExposedList<Mesh>();

		private readonly ExposedList<Material> usedMaterials = new ExposedList<Material>();

		private readonly ExposedList<Texture> usedTextures = new ExposedList<Texture>();

		[SerializeField]
		protected UpdateTiming updateTiming = UpdateTiming.InUpdate;

		[SerializeField]
		protected bool unscaledTime;

		public SkeletonDataAsset SkeletonDataAsset => skeletonDataAsset;

		public override Color color
		{
			get
			{
				return m_SkeletonColor;
			}
			set
			{
				m_SkeletonColor = value;
			}
		}

		public float MeshScale => meshScale;

		public Vector2 MeshOffset => meshOffset;

		public UpdateMode UpdateMode
		{
			get
			{
				return updateMode;
			}
			set
			{
				updateMode = value;
			}
		}

		public List<Transform> SeparatorParts => separatorParts;

		public Dictionary<Texture, Texture> CustomTextureOverride => customTextureOverride;

		public Dictionary<Texture, Material> CustomMaterialOverride => customMaterialOverride;

		public Texture OverrideTexture
		{
			get
			{
				return overrideTexture;
			}
			set
			{
				overrideTexture = value;
				base.canvasRenderer.SetTexture(mainTexture);
			}
		}

		public override Texture mainTexture
		{
			get
			{
				if (overrideTexture != null)
				{
					return overrideTexture;
				}
				return baseTexture;
			}
		}

		public Skeleton Skeleton
		{
			get
			{
				Initialize(false);
				return skeleton;
			}
			set
			{
				skeleton = value;
			}
		}

		public SkeletonData SkeletonData
		{
			get
			{
				Initialize(false);
				return (skeleton == null) ? null : skeleton.Data;
			}
		}

		public bool IsValid => skeleton != null;

		public AnimationState AnimationState
		{
			get
			{
				Initialize(false);
				return state;
			}
		}

		public Vector2 PhysicsPositionInheritanceFactor
		{
			get
			{
				return physicsPositionInheritanceFactor;
			}
			set
			{
				if (physicsPositionInheritanceFactor == Vector2.zero && value != Vector2.zero)
				{
					ResetLastPosition();
				}
				physicsPositionInheritanceFactor = value;
			}
		}

		public float PhysicsRotationInheritanceFactor
		{
			get
			{
				return physicsRotationInheritanceFactor;
			}
			set
			{
				if (physicsRotationInheritanceFactor == 0f && value != 0f)
				{
					ResetLastRotation();
				}
				physicsRotationInheritanceFactor = value;
			}
		}

		public Transform PhysicsMovementRelativeTo
		{
			get
			{
				return physicsMovementRelativeTo;
			}
			set
			{
				physicsMovementRelativeTo = value;
				if (physicsPositionInheritanceFactor != Vector2.zero)
				{
					ResetLastPosition();
				}
				if (physicsRotationInheritanceFactor != 0f)
				{
					ResetLastRotation();
				}
			}
		}

		public MeshGenerator MeshGenerator => meshGenerator;

		public SkeletonClipping SkeletonClipping => meshGenerator.SkeletonClipping;

		public ExposedList<Mesh> MeshesMultipleCanvasRenderers => meshes;

		public ExposedList<Material> MaterialsMultipleCanvasRenderers => usedMaterials;

		public ExposedList<Texture> TexturesMultipleCanvasRenderers => usedTextures;

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

		private event MeshAssignmentDelegateSingle assignMeshOverrideSingle;

		private event MeshAssignmentDelegateMultiple assignMeshOverrideMultiple;

		public event MeshAssignmentDelegateSingle AssignMeshOverrideSingleRenderer
		{
			add
			{
				assignMeshOverrideSingle += value;
				if (disableMeshAssignmentOnOverride && this.assignMeshOverrideSingle != null)
				{
					Initialize(false);
				}
			}
			remove
			{
				assignMeshOverrideSingle -= value;
				if (disableMeshAssignmentOnOverride && this.assignMeshOverrideSingle == null)
				{
					Initialize(false);
				}
			}
		}

		public event MeshAssignmentDelegateMultiple AssignMeshOverrideMultipleRenderers
		{
			add
			{
				assignMeshOverrideMultiple += value;
				if (disableMeshAssignmentOnOverride && this.assignMeshOverrideMultiple != null)
				{
					Initialize(false);
				}
			}
			remove
			{
				assignMeshOverrideMultiple -= value;
				if (disableMeshAssignmentOnOverride && this.assignMeshOverrideMultiple == null)
				{
					Initialize(false);
				}
			}
		}

		public event SkeletonRendererDelegate OnRebuild;

		public event InstructionDelegate OnInstructionsPrepared;

		public event SkeletonRendererDelegate OnMeshAndMaterialsUpdated;

		public event ISkeletonAnimationDelegate OnAnimationRebuild;

		public event UpdateBonesDelegate BeforeApply;

		public event UpdateBonesDelegate UpdateLocal;

		public event UpdateBonesDelegate UpdateWorld;

		public event UpdateBonesDelegate UpdateComplete;

		public event MeshGeneratorDelegate OnPostProcessVertices;

		public static SkeletonGraphic NewSkeletonGraphicGameObject(SkeletonDataAsset skeletonDataAsset, Transform parent, Material material)
		{
			SkeletonGraphic sg = AddSkeletonGraphicComponent(new GameObject("New Spine GameObject"), skeletonDataAsset, material);
			if (parent != null)
			{
				sg.transform.SetParent(parent, false);
			}
			return sg;
		}

		public static SkeletonGraphic AddSkeletonGraphicComponent(GameObject gameObject, SkeletonDataAsset skeletonDataAsset, Material material)
		{
			SkeletonGraphic skeletonGraphic = gameObject.AddComponent<SkeletonGraphic>();
			if (skeletonDataAsset != null)
			{
				skeletonGraphic.material = material;
				skeletonGraphic.skeletonDataAsset = skeletonDataAsset;
				skeletonGraphic.Initialize(false);
			}
			CanvasRenderer canvasRenderer = gameObject.GetComponent<CanvasRenderer>();
			if ((bool)canvasRenderer)
			{
				canvasRenderer.cullTransparentMesh = false;
			}
			return skeletonGraphic;
		}

		protected override void Awake()
		{
			base.Awake();
			base.onCullStateChanged.AddListener(OnCullStateChanged);
			SyncSubmeshGraphicsWithCanvasRenderers();
			if (!IsValid)
			{
				Initialize(false);
				if (IsValid)
				{
					Rebuild(CanvasUpdate.PreRender);
				}
			}
		}

		protected override void OnDestroy()
		{
			Clear();
			base.OnDestroy();
		}

		public override void Rebuild(CanvasUpdate update)
		{
			base.Rebuild(update);
			if (IsValid && !base.canvasRenderer.cull)
			{
				if (update == CanvasUpdate.PreRender)
				{
					PrepareInstructionsAndRenderers(true);
					UpdateMeshToInstructions();
				}
				if (allowMultipleCanvasRenderers)
				{
					base.canvasRenderer.Clear();
				}
			}
		}

		protected override void OnDisable()
		{
			base.OnDisable();
			foreach (CanvasRenderer canvasRenderer in canvasRenderers)
			{
				canvasRenderer.Clear();
			}
		}

		public virtual void Update()
		{
			if (!freeze && updateTiming == UpdateTiming.InUpdate)
			{
				Update(unscaledTime ? Time.unscaledDeltaTime : Time.deltaTime);
			}
		}

		protected virtual void FixedUpdate()
		{
			if (!freeze && updateTiming == UpdateTiming.InFixedUpdate)
			{
				Update(unscaledTime ? Time.unscaledDeltaTime : Time.deltaTime);
			}
		}

		public virtual void Update(float deltaTime)
		{
			if (!IsValid)
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

		protected void SyncSubmeshGraphicsWithCanvasRenderers()
		{
			submeshGraphics.Clear();
			foreach (CanvasRenderer canvasRenderer in canvasRenderers)
			{
				SkeletonSubmeshGraphic submeshGraphic = canvasRenderer.GetComponent<SkeletonSubmeshGraphic>();
				if (submeshGraphic == null)
				{
					submeshGraphic = canvasRenderer.gameObject.AddComponent<SkeletonSubmeshGraphic>();
					submeshGraphic.maskable = base.maskable;
					submeshGraphic.raycastTarget = false;
				}
				submeshGraphics.Add(submeshGraphic);
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

		public virtual void ApplyTransformMovementToPhysics()
		{
			if (!Application.isPlaying)
			{
				return;
			}
			if (physicsPositionInheritanceFactor != Vector2.zero)
			{
				Vector2 position = GetPhysicsTransformPosition();
				Vector2 positionDelta = (position - lastPosition) / meshScale;
				positionDelta = base.transform.InverseTransformVector(positionDelta);
				if (physicsMovementRelativeTo != null)
				{
					positionDelta = physicsMovementRelativeTo.TransformVector(positionDelta);
				}
				positionDelta.x *= physicsPositionInheritanceFactor.x;
				positionDelta.y *= physicsPositionInheritanceFactor.y;
				skeleton.PhysicsTranslate(positionDelta.x, positionDelta.y);
				lastPosition = position;
			}
			if (physicsRotationInheritanceFactor != 0f)
			{
				float rotation = GetPhysicsTransformRotation();
				skeleton.PhysicsRotate(0f, 0f, physicsRotationInheritanceFactor * (rotation - lastRotation));
				lastRotation = rotation;
			}
		}

		protected Vector2 GetPhysicsTransformPosition()
		{
			if (physicsMovementRelativeTo == null)
			{
				return base.transform.position;
			}
			if (physicsMovementRelativeTo == base.transform.parent)
			{
				return base.transform.localPosition;
			}
			return physicsMovementRelativeTo.InverseTransformPoint(base.transform.position);
		}

		protected float GetPhysicsTransformRotation()
		{
			if (physicsMovementRelativeTo == null)
			{
				return base.transform.rotation.eulerAngles.z;
			}
			if (physicsMovementRelativeTo == base.transform.parent)
			{
				return base.transform.localRotation.eulerAngles.z;
			}
			return (Quaternion.Inverse(physicsMovementRelativeTo.rotation) * base.transform.rotation).eulerAngles.z;
		}

		public virtual void ApplyAnimation()
		{
			if (this.BeforeApply != null)
			{
				this.BeforeApply(this);
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

		public virtual void AfterAnimationApplied()
		{
			if (this.UpdateLocal != null)
			{
				this.UpdateLocal(this);
			}
			if (this.UpdateWorld == null)
			{
				UpdateWorldTransform(Skeleton.Physics.Update);
			}
			else
			{
				UpdateWorldTransform(Skeleton.Physics.Pose);
				this.UpdateWorld(this);
				UpdateWorldTransform(Skeleton.Physics.Update);
			}
			if (this.UpdateComplete != null)
			{
				this.UpdateComplete(this);
			}
		}

		protected void UpdateWorldTransform(Skeleton.Physics physics)
		{
			skeleton.UpdateWorldTransform(physics);
		}

		public void LateUpdate()
		{
			if (!IsValid)
			{
				return;
			}
			if (!wasUpdatedAfterInit)
			{
				Update(0f);
			}
			if (!freeze && updateMode == UpdateMode.FullUpdate)
			{
				if (updateTiming == UpdateTiming.InLateUpdate)
				{
					Update(unscaledTime ? Time.unscaledDeltaTime : Time.deltaTime);
				}
				UpdateMesh();
			}
		}

		protected void OnCullStateChanged(bool culled)
		{
			if (culled)
			{
				OnBecameInvisible();
			}
			else
			{
				OnBecameVisible();
			}
		}

		public void OnBecameVisible()
		{
			updateMode = UpdateMode.FullUpdate;
		}

		public void OnBecameInvisible()
		{
			updateMode = updateWhenInvisible;
		}

		public void ReapplySeparatorSlotNames()
		{
			if (!IsValid)
			{
				return;
			}
			separatorSlots.Clear();
			int i = 0;
			for (int j = separatorSlotNames.Length; i < j; i++)
			{
				string slotName = separatorSlotNames[i];
				if (!(slotName == ""))
				{
					Slot slot = skeleton.FindSlot(slotName);
					if (slot != null)
					{
						separatorSlots.Add(slot);
					}
				}
			}
			UpdateSeparatorPartParents();
		}

		public void ResetLastPosition()
		{
			lastPosition = GetPhysicsTransformPosition();
		}

		public void ResetLastRotation()
		{
			lastRotation = GetPhysicsTransformRotation();
		}

		public void ResetLastPositionAndRotation()
		{
			lastPosition = GetPhysicsTransformPosition();
			lastRotation = GetPhysicsTransformRotation();
		}

		public Mesh GetLastMesh()
		{
			return meshBuffers.GetCurrent().mesh;
		}

		public bool MatchRectTransformWithBounds()
		{
			if (!wasUpdatedAfterInit)
			{
				Update(0f);
			}
			UpdateMesh();
			if (!allowMultipleCanvasRenderers)
			{
				return MatchRectTransformSingleRenderer();
			}
			return MatchRectTransformMultipleRenderers();
		}

		protected bool MatchRectTransformSingleRenderer()
		{
			Mesh mesh = GetLastMesh();
			if (mesh == null)
			{
				return false;
			}
			if (mesh.vertexCount == 0 || mesh.bounds.size == Vector3.zero)
			{
				base.rectTransform.sizeDelta = new Vector2(50f, 50f);
				base.rectTransform.pivot = new Vector2(0.5f, 0.5f);
				return false;
			}
			mesh.RecalculateBounds();
			SetRectTransformBounds(mesh.bounds);
			return true;
		}

		protected bool MatchRectTransformMultipleRenderers()
		{
			bool anyBoundsAdded = false;
			Bounds combinedBounds = default(Bounds);
			for (int i = 0; i < canvasRenderers.Count; i++)
			{
				CanvasRenderer canvasRenderer = canvasRenderers[i];
				if (!canvasRenderer.gameObject.activeSelf)
				{
					continue;
				}
				Mesh mesh = meshes.Items[i];
				if (!(mesh == null) && mesh.vertexCount != 0)
				{
					mesh.RecalculateBounds();
					Bounds bounds = mesh.bounds;
					if (anyBoundsAdded)
					{
						combinedBounds.Encapsulate(bounds);
						continue;
					}
					anyBoundsAdded = true;
					combinedBounds = bounds;
				}
			}
			if (!anyBoundsAdded || combinedBounds.size == Vector3.zero)
			{
				base.rectTransform.sizeDelta = new Vector2(50f, 50f);
				base.rectTransform.pivot = new Vector2(0.5f, 0.5f);
				return false;
			}
			SetRectTransformBounds(combinedBounds);
			return true;
		}

		private void SetRectTransformBounds(Bounds combinedBounds)
		{
			Vector3 size = combinedBounds.size;
			Vector3 center = combinedBounds.center;
			Vector2 p = new Vector2(0.5f - center.x / size.x, 0.5f - center.y / size.y);
			SetRectTransformSize(this, size);
			base.rectTransform.pivot = p;
			foreach (Transform separatorPart in separatorParts)
			{
				RectTransform separatorTransform = separatorPart.GetComponent<RectTransform>();
				if ((bool)separatorTransform)
				{
					SetRectTransformSize(separatorTransform, size);
					separatorTransform.pivot = p;
				}
			}
			foreach (SkeletonSubmeshGraphic submeshGraphic in submeshGraphics)
			{
				SetRectTransformSize(submeshGraphic, size);
				submeshGraphic.rectTransform.pivot = p;
			}
			referenceSize = size;
			referenceScale *= layoutScale;
			layoutScale = 1f;
		}

		public static void SetRectTransformSize(Graphic target, Vector2 size)
		{
			SetRectTransformSize(target.rectTransform, size);
		}

		public static void SetRectTransformSize(RectTransform targetRectTransform, Vector2 size)
		{
			Vector2 parentSize = Vector2.zero;
			if (targetRectTransform.parent != null)
			{
				RectTransform parentTransform = targetRectTransform.parent.GetComponent<RectTransform>();
				if ((bool)parentTransform)
				{
					parentSize = parentTransform.rect.size;
				}
			}
			Vector2 anchorAreaSize = Vector2.Scale(targetRectTransform.anchorMax - targetRectTransform.anchorMin, parentSize);
			targetRectTransform.sizeDelta = size - anchorAreaSize;
		}

		public void Clear()
		{
			skeleton = null;
			base.canvasRenderer.Clear();
			for (int i = 0; i < canvasRenderers.Count; i++)
			{
				canvasRenderers[i].Clear();
			}
			DestroyMeshes();
			usedMaterials.Clear();
			usedTextures.Clear();
			DisposeMeshBuffers();
		}

		public void TrimRenderers()
		{
			List<CanvasRenderer> newList = new List<CanvasRenderer>();
			foreach (CanvasRenderer canvasRenderer in canvasRenderers)
			{
				if (canvasRenderer.gameObject.activeSelf)
				{
					newList.Add(canvasRenderer);
				}
				else if (Application.isEditor && !Application.isPlaying)
				{
					UnityEngine.Object.DestroyImmediate(canvasRenderer.gameObject);
				}
				else
				{
					UnityEngine.Object.Destroy(canvasRenderer.gameObject);
				}
			}
			canvasRenderers = newList;
			SyncSubmeshGraphicsWithCanvasRenderers();
		}

		public void Initialize(bool overwrite)
		{
			if ((IsValid && !overwrite) || skeletonDataAsset == null)
			{
				return;
			}
			SkeletonData skeletonData = skeletonDataAsset.GetSkeletonData(false);
			if (skeletonData == null || skeletonDataAsset.atlasAssets.Length == 0 || skeletonDataAsset.atlasAssets[0].MaterialCount <= 0)
			{
				return;
			}
			skeleton = new Skeleton(skeletonData)
			{
				ScaleX = ((!initialFlipX) ? 1 : (-1)),
				ScaleY = ((!initialFlipY) ? 1 : (-1))
			};
			InitMeshBuffers();
			baseTexture = skeletonDataAsset.atlasAssets[0].PrimaryMaterial.mainTexture;
			base.canvasRenderer.SetTexture(mainTexture);
			ResetLastPositionAndRotation();
			if (!string.IsNullOrEmpty(initialSkinName))
			{
				skeleton.SetSkin(initialSkinName);
			}
			separatorSlots.Clear();
			for (int i = 0; i < separatorSlotNames.Length; i++)
			{
				separatorSlots.Add(skeleton.FindSlot(separatorSlotNames[i]));
			}
			if (this.OnRebuild != null)
			{
				this.OnRebuild(this);
			}
			wasUpdatedAfterInit = false;
			state = new AnimationState(skeletonDataAsset.GetAnimationStateData());
			if (state == null)
			{
				Clear();
				return;
			}
			if (!string.IsNullOrEmpty(startingAnimation))
			{
				Animation animationObject = skeletonDataAsset.GetSkeletonData(false).FindAnimation(startingAnimation);
				if (animationObject != null)
				{
					state.SetAnimation(0, animationObject, startingLoop);
				}
			}
			if (this.OnAnimationRebuild != null)
			{
				this.OnAnimationRebuild(this);
			}
		}

		public void PrepareInstructionsAndRenderers(bool isInRebuild = false)
		{
			if (!allowMultipleCanvasRenderers)
			{
				MeshGenerator.GenerateSingleSubmeshInstruction(currentInstructions, skeleton, null);
				if (canvasRenderers.Count > 0)
				{
					DisableUnusedCanvasRenderers(0, isInRebuild);
				}
				usedRenderersCount = 0;
			}
			else
			{
				MeshGenerator.GenerateSkeletonRendererInstruction(currentInstructions, skeleton, null, enableSeparatorSlots ? separatorSlots : null, enableSeparatorSlots && separatorSlots.Count > 0);
				int submeshCount = currentInstructions.submeshInstructions.Count;
				EnsureCanvasRendererCount(submeshCount);
				EnsureMeshesCount(submeshCount);
				EnsureUsedTexturesAndMaterialsCount(submeshCount);
				EnsureSeparatorPartCount();
				PrepareRendererGameObjects(currentInstructions, isInRebuild);
			}
			if (this.OnInstructionsPrepared != null)
			{
				this.OnInstructionsPrepared(currentInstructions);
			}
		}

		public void UpdateMesh()
		{
			PrepareInstructionsAndRenderers();
			UpdateMeshToInstructions();
		}

		public void UpdateMeshToInstructions()
		{
			if (IsValid && currentInstructions.rawVertexCount >= 0)
			{
				skeleton.SetColor(color);
				if (!allowMultipleCanvasRenderers)
				{
					UpdateMeshSingleCanvasRenderer(currentInstructions);
				}
				else
				{
					UpdateMaterialsMultipleCanvasRenderers(currentInstructions);
					UpdateMeshMultipleCanvasRenderers(currentInstructions);
				}
				if (this.OnMeshAndMaterialsUpdated != null)
				{
					this.OnMeshAndMaterialsUpdated(this);
				}
			}
		}

		public bool HasMultipleSubmeshInstructions()
		{
			if (!IsValid)
			{
				return false;
			}
			return MeshGenerator.RequiresMultipleSubmeshesByDrawOrder(skeleton);
		}

		protected void InitMeshBuffers()
		{
			if (meshBuffers != null)
			{
				meshBuffers.GetNext().Clear();
				meshBuffers.GetNext().Clear();
			}
			else
			{
				meshBuffers = new DoubleBuffered<MeshRendererBuffers.SmartMesh>();
			}
		}

		protected void DisposeMeshBuffers()
		{
			if (meshBuffers != null)
			{
				meshBuffers.GetNext().Dispose();
				meshBuffers.GetNext().Dispose();
				meshBuffers = null;
			}
		}

		protected void UpdateMeshSingleCanvasRenderer(SkeletonRendererInstruction currentInstructions)
		{
			MeshRendererBuffers.SmartMesh smartMesh = meshBuffers.GetNext();
			bool updateTriangles = SkeletonRendererInstruction.GeometryNotEqual(currentInstructions, smartMesh.instructionUsed);
			meshGenerator.Begin();
			if (currentInstructions.hasActiveClipping && currentInstructions.submeshInstructions.Count > 0)
			{
				meshGenerator.AddSubmesh(currentInstructions.submeshInstructions.Items[0], updateTriangles);
			}
			else
			{
				meshGenerator.BuildMeshWithArrays(currentInstructions, updateTriangles);
			}
			meshScale = ((base.canvas == null) ? 100f : base.canvas.referencePixelsPerUnit);
			if (layoutScaleMode != 0)
			{
				meshScale *= referenceScale;
				layoutScale = GetLayoutScale(layoutScaleMode);
				bool flag = true;
				meshScale *= layoutScale;
				meshOffset = pivotOffset * layoutScale;
			}
			else
			{
				meshOffset = pivotOffset;
			}
			if (meshOffset == Vector2.zero)
			{
				meshGenerator.ScaleVertexData(meshScale);
			}
			else
			{
				meshGenerator.ScaleAndOffsetVertexData(meshScale, meshOffset);
			}
			if (this.OnPostProcessVertices != null)
			{
				this.OnPostProcessVertices(meshGenerator.Buffers);
			}
			Mesh mesh = smartMesh.mesh;
			meshGenerator.FillVertexData(mesh);
			if (updateTriangles)
			{
				meshGenerator.FillTriangles(mesh);
			}
			meshGenerator.FillLateVertexData(mesh);
			smartMesh.instructionUsed.Set(currentInstructions);
			if (this.assignMeshOverrideSingle != null)
			{
				this.assignMeshOverrideSingle(mesh, base.canvasRenderer.GetMaterial(), mainTexture);
			}
			bool assignAtCanvasRenderer = this.assignMeshOverrideSingle == null || !disableMeshAssignmentOnOverride;
			if (assignAtCanvasRenderer)
			{
				base.canvasRenderer.SetMesh(mesh);
			}
			else
			{
				base.canvasRenderer.SetMesh(null);
			}
			bool assignTexture = false;
			if (currentInstructions.submeshInstructions.Count > 0)
			{
				Material material = currentInstructions.submeshInstructions.Items[0].material;
				if (material != null && baseTexture != material.mainTexture)
				{
					baseTexture = material.mainTexture;
					if (overrideTexture == null && assignAtCanvasRenderer)
					{
						assignTexture = true;
					}
				}
			}
			if (Application.isPlaying)
			{
				HandleOnDemandLoading();
			}
			if (assignTexture)
			{
				base.canvasRenderer.SetTexture(mainTexture);
			}
		}

		protected void UpdateMaterialsMultipleCanvasRenderers(SkeletonRendererInstruction currentInstructions)
		{
			int submeshCount = currentInstructions.submeshInstructions.Count;
			bool useOriginalTextureAndMaterial = customMaterialOverride.Count == 0 && customTextureOverride.Count == 0;
			BlendModeMaterials blendModeMaterials = skeletonDataAsset.blendModeMaterials;
			bool hasBlendModeMaterials = blendModeMaterials.RequiresBlendModeMaterials;
			bool pmaVertexColors = meshGenerator.settings.pmaVertexColors;
			Material[] usedMaterialItems = usedMaterials.Items;
			Texture[] usedTextureItems = usedTextures.Items;
			for (int i = 0; i < submeshCount; i++)
			{
				SubmeshInstruction submeshInstructionItem = currentInstructions.submeshInstructions.Items[i];
				Material submeshMaterial = submeshInstructionItem.material;
				if (useOriginalTextureAndMaterial)
				{
					if (submeshMaterial == null)
					{
						usedMaterialItems[i] = null;
						usedTextureItems[i] = null;
						continue;
					}
					usedTextureItems[i] = submeshMaterial.mainTexture;
					if (!hasBlendModeMaterials)
					{
						usedMaterialItems[i] = materialForRendering;
						continue;
					}
					BlendMode blendMode = blendModeMaterials.BlendModeForMaterial(submeshMaterial);
					Material usedMaterial2 = materialForRendering;
					if (blendMode == BlendMode.Additive && !pmaVertexColors && (bool)additiveMaterial)
					{
						usedMaterial2 = additiveMaterial;
					}
					else if (blendMode == BlendMode.Multiply && (bool)multiplyMaterial)
					{
						usedMaterial2 = multiplyMaterial;
					}
					else if (blendMode == BlendMode.Screen && (bool)screenMaterial)
					{
						usedMaterial2 = screenMaterial;
					}
					usedMaterialItems[i] = submeshGraphics[i].GetModifiedMaterial(usedMaterial2);
				}
				else
				{
					Texture originalTexture = submeshMaterial.mainTexture;
					if (!customMaterialOverride.TryGetValue(originalTexture, out var usedMaterial))
					{
						usedMaterial = material;
					}
					if (!customTextureOverride.TryGetValue(originalTexture, out var usedTexture))
					{
						usedTexture = originalTexture;
					}
					usedMaterialItems[i] = submeshGraphics[i].GetModifiedMaterial(usedMaterial);
					usedTextureItems[i] = usedTexture;
				}
			}
		}

		protected void UpdateMeshMultipleCanvasRenderers(SkeletonRendererInstruction currentInstructions)
		{
			meshScale = ((base.canvas == null) ? 100f : base.canvas.referencePixelsPerUnit);
			if (layoutScaleMode != 0)
			{
				meshScale *= referenceScale;
				layoutScale = GetLayoutScale(layoutScaleMode);
				bool flag = true;
				meshScale *= layoutScale;
				meshOffset = pivotOffset * layoutScale;
			}
			else
			{
				meshOffset = pivotOffset;
			}
			int submeshCount = currentInstructions.submeshInstructions.Count;
			Mesh[] meshesItems = meshes.Items;
			bool useOriginalTextureAndMaterial = customMaterialOverride.Count == 0 && customTextureOverride.Count == 0;
			BlendModeMaterials blendModeMaterials = skeletonDataAsset.blendModeMaterials;
			bool hasBlendModeMaterials = blendModeMaterials.RequiresBlendModeMaterials;
			bool mainCullTransparentMesh = base.canvasRenderer.cullTransparentMesh;
			bool pmaVertexColors = meshGenerator.settings.pmaVertexColors;
			Material[] usedMaterialItems = usedMaterials.Items;
			Texture[] usedTextureItems = usedTextures.Items;
			for (int j = 0; j < submeshCount; j++)
			{
				SubmeshInstruction submeshInstructionItem = currentInstructions.submeshInstructions.Items[j];
				meshGenerator.Begin();
				meshGenerator.AddSubmesh(submeshInstructionItem);
				Mesh targetMesh = meshesItems[j];
				if (meshOffset == Vector2.zero)
				{
					meshGenerator.ScaleVertexData(meshScale);
				}
				else
				{
					meshGenerator.ScaleAndOffsetVertexData(meshScale, meshOffset);
				}
				if (this.OnPostProcessVertices != null)
				{
					this.OnPostProcessVertices(meshGenerator.Buffers);
				}
				meshGenerator.FillVertexData(targetMesh);
				meshGenerator.FillTriangles(targetMesh);
				meshGenerator.FillLateVertexData(targetMesh);
				CanvasRenderer canvasRenderer = canvasRenderers[j];
				if (this.assignMeshOverrideSingle == null || !disableMeshAssignmentOnOverride)
				{
					canvasRenderer.SetMesh(targetMesh);
				}
				else
				{
					canvasRenderer.SetMesh(null);
				}
				SkeletonSubmeshGraphic submeshGraphic = submeshGraphics[j];
				if (useOriginalTextureAndMaterial && hasBlendModeMaterials)
				{
					bool allowCullTransparentMesh = true;
					BlendMode materialBlendMode = blendModeMaterials.BlendModeForMaterial(usedMaterialItems[j]);
					if ((materialBlendMode == BlendMode.Normal && submeshInstructionItem.hasPMAAdditiveSlot) || (materialBlendMode == BlendMode.Additive && pmaVertexColors))
					{
						allowCullTransparentMesh = false;
					}
					canvasRenderer.cullTransparentMesh = allowCullTransparentMesh && mainCullTransparentMesh;
				}
				canvasRenderer.materialCount = 1;
			}
			if (Application.isPlaying)
			{
				HandleOnDemandLoading();
			}
			if (this.assignMeshOverrideSingle == null || !disableMeshAssignmentOnOverride)
			{
				for (int i = 0; i < submeshCount; i++)
				{
					CanvasRenderer canvasRenderer2 = canvasRenderers[i];
					canvasRenderer2.SetMaterial(usedMaterialItems[i], usedTextureItems[i]);
				}
			}
			if (this.assignMeshOverrideMultiple != null)
			{
				this.assignMeshOverrideMultiple(submeshCount, meshesItems, usedMaterialItems, usedTextureItems);
			}
		}

		private void HandleOnDemandLoading()
		{
			AtlasAssetBase[] atlasAssets = skeletonDataAsset.atlasAssets;
			foreach (AtlasAssetBase atlasAsset in atlasAssets)
			{
				if (atlasAsset.TextureLoadingMode == AtlasAssetBase.LoadingMode.Normal)
				{
					continue;
				}
				atlasAsset.BeginCustomTextureLoading();
				if (!allowMultipleCanvasRenderers)
				{
					Texture loadedTexture2 = null;
					atlasAsset.RequireTextureLoaded(mainTexture, ref loadedTexture2, null);
					if ((bool)loadedTexture2)
					{
						baseTexture = loadedTexture2;
					}
				}
				else
				{
					Texture[] textureItems = usedTextures.Items;
					int i = 0;
					for (int count = usedTextures.Count; i < count; i++)
					{
						Texture loadedTexture = null;
						atlasAsset.RequireTextureLoaded(textureItems[i], ref loadedTexture, null);
						if ((bool)loadedTexture)
						{
							usedTextures.Items[i] = loadedTexture;
						}
					}
				}
				atlasAsset.EndCustomTextureLoading();
			}
		}

		protected void EnsureCanvasRendererCount(int targetCount)
		{
			int currentCount = canvasRenderers.Count;
			for (int i = currentCount; i < targetCount; i++)
			{
				GameObject go = new GameObject($"Renderer{i}", typeof(RectTransform));
				go.transform.SetParent(base.transform, false);
				go.transform.localPosition = Vector3.zero;
				CanvasRenderer canvasRenderer = go.AddComponent<CanvasRenderer>();
				canvasRenderers.Add(canvasRenderer);
				SkeletonSubmeshGraphic submeshGraphic = go.AddComponent<SkeletonSubmeshGraphic>();
				submeshGraphic.maskable = base.maskable;
				submeshGraphic.raycastTarget = false;
				submeshGraphic.rectTransform.pivot = base.rectTransform.pivot;
				submeshGraphic.rectTransform.anchorMin = Vector2.zero;
				submeshGraphic.rectTransform.anchorMax = Vector2.one;
				submeshGraphic.rectTransform.sizeDelta = Vector2.zero;
				submeshGraphics.Add(submeshGraphic);
			}
		}

		protected void PrepareRendererGameObjects(SkeletonRendererInstruction currentInstructions, bool isInRebuild = false)
		{
			int submeshCount = currentInstructions.submeshInstructions.Count;
			DisableUnusedCanvasRenderers(submeshCount, isInRebuild);
			Transform parent = ((separatorParts.Count == 0) ? base.transform : separatorParts[0]);
			if (updateSeparatorPartLocation)
			{
				for (int p = 0; p < separatorParts.Count; p++)
				{
					Transform separatorPart = separatorParts[p];
					if (!(separatorPart == null))
					{
						separatorPart.position = base.transform.position;
						separatorPart.rotation = base.transform.rotation;
					}
				}
			}
			if (updateSeparatorPartScale)
			{
				Vector3 targetScale = base.transform.lossyScale;
				for (int p2 = 0; p2 < separatorParts.Count; p2++)
				{
					Transform separatorPart2 = separatorParts[p2];
					if (!(separatorPart2 == null))
					{
						Transform partParent = separatorPart2.parent;
						Vector3 parentScale = ((partParent == null) ? Vector3.one : partParent.lossyScale);
						separatorPart2.localScale = new Vector3((parentScale.x == 0f) ? 1f : (targetScale.x / parentScale.x), (parentScale.y == 0f) ? 1f : (targetScale.y / parentScale.y), (parentScale.z == 0f) ? 1f : (targetScale.z / parentScale.z));
					}
				}
			}
			int separatorSlotGroupIndex = 0;
			int targetSiblingIndex = 0;
			for (int i = 0; i < submeshCount; i++)
			{
				CanvasRenderer canvasRenderer = canvasRenderers[i];
				if (canvasRenderer != null)
				{
					if (i >= usedRenderersCount)
					{
						canvasRenderer.gameObject.SetActive(true);
					}
					if (canvasRenderer.transform.parent != parent.transform && !isInRebuild)
					{
						canvasRenderer.transform.SetParent(parent.transform, false);
					}
					canvasRenderer.transform.SetSiblingIndex(targetSiblingIndex++);
				}
				SkeletonSubmeshGraphic submeshGraphic = submeshGraphics[i];
				if (submeshGraphic != null)
				{
					RectTransform dstTransform = submeshGraphic.rectTransform;
					dstTransform.localPosition = Vector3.zero;
					dstTransform.pivot = base.rectTransform.pivot;
					dstTransform.anchorMin = Vector2.zero;
					dstTransform.anchorMax = Vector2.one;
					dstTransform.sizeDelta = Vector2.zero;
				}
				SubmeshInstruction submeshInstructionItem = currentInstructions.submeshInstructions.Items[i];
				if (submeshInstructionItem.forceSeparate)
				{
					targetSiblingIndex = 0;
					parent = separatorParts[++separatorSlotGroupIndex];
				}
			}
			usedRenderersCount = submeshCount;
		}

		protected void DisableUnusedCanvasRenderers(int usedCount, bool isInRebuild = false)
		{
			for (int i = usedCount; i < canvasRenderers.Count; i++)
			{
				canvasRenderers[i].Clear();
				if (!isInRebuild)
				{
					canvasRenderers[i].gameObject.SetActive(false);
				}
			}
		}

		protected void EnsureMeshesCount(int targetCount)
		{
			int oldCount = meshes.Count;
			meshes.EnsureCapacity(targetCount);
			for (int i = oldCount; i < targetCount; i++)
			{
				meshes.Add(SpineMesh.NewSkeletonMesh());
			}
		}

		protected void EnsureUsedTexturesAndMaterialsCount(int targetCount)
		{
			int oldCount = usedMaterials.Count;
			usedMaterials.EnsureCapacity(targetCount);
			usedTextures.EnsureCapacity(targetCount);
			for (int i = oldCount; i < targetCount; i++)
			{
				usedMaterials.Add(null);
				usedTextures.Add(null);
			}
		}

		protected void DestroyMeshes()
		{
			foreach (Mesh mesh in meshes)
			{
				UnityEngine.Object.Destroy(mesh);
			}
			meshes.Clear();
		}

		protected void EnsureSeparatorPartCount()
		{
			int targetCount = separatorSlots.Count + 1;
			if (targetCount != 1)
			{
				int currentCount = separatorParts.Count;
				for (int i = currentCount; i < targetCount; i++)
				{
					GameObject go = new GameObject(string.Format("{0}[{1}]", "Part", i), typeof(RectTransform));
					go.transform.SetParent(base.transform, false);
					RectTransform dstTransform = go.transform.GetComponent<RectTransform>();
					dstTransform.localPosition = Vector3.zero;
					dstTransform.pivot = base.rectTransform.pivot;
					dstTransform.anchorMin = Vector2.zero;
					dstTransform.anchorMax = Vector2.one;
					dstTransform.sizeDelta = Vector2.zero;
					separatorParts.Add(go.transform);
				}
			}
		}

		protected void UpdateSeparatorPartParents()
		{
			int usedCount = separatorSlots.Count + 1;
			if (usedCount == 1)
			{
				usedCount = 0;
				for (int j = 0; j < canvasRenderers.Count; j++)
				{
					CanvasRenderer canvasRenderer = canvasRenderers[j];
					if (canvasRenderer.transform.parent.name.Contains("Part"))
					{
						canvasRenderer.transform.SetParent(base.transform, false);
						canvasRenderer.transform.localPosition = Vector3.zero;
					}
				}
			}
			for (int i = 0; i < separatorParts.Count; i++)
			{
				bool isUsed = i < usedCount;
				separatorParts[i].gameObject.SetActive(isUsed);
			}
		}

		public void SetScaledPivotOffset(Vector2 pivotOffsetScaled)
		{
			pivotOffset = pivotOffsetScaled / GetLayoutScale(layoutScaleMode);
		}

		protected float GetLayoutScale(LayoutMode mode)
		{
			Vector2 currentSize = GetCurrentRectSize();
			mode = GetEffectiveLayoutMode(mode);
			switch (mode)
			{
			case LayoutMode.WidthControlsHeight:
				return currentSize.x / referenceSize.x;
			case LayoutMode.HeightControlsWidth:
				return currentSize.y / referenceSize.y;
			default:
				return 1f;
			}
		}

		protected LayoutMode GetEffectiveLayoutMode(LayoutMode mode)
		{
			Vector2 currentSize = GetCurrentRectSize();
			float referenceAspect = referenceSize.x / referenceSize.y;
			float frameAspect = currentSize.x / currentSize.y;
			switch (mode)
			{
			case LayoutMode.FitInParent:
				mode = ((!(frameAspect > referenceAspect)) ? LayoutMode.WidthControlsHeight : LayoutMode.HeightControlsWidth);
				break;
			case LayoutMode.EnvelopeParent:
				mode = ((frameAspect > referenceAspect) ? LayoutMode.WidthControlsHeight : LayoutMode.HeightControlsWidth);
				break;
			}
			return mode;
		}

		private Vector2 GetCurrentRectSize()
		{
			return base.rectTransform.rect.size;
		}
	}
}
