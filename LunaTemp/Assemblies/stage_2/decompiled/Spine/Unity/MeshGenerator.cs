using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;

namespace Spine.Unity
{
	[Serializable]
	public class MeshGenerator
	{
		[Serializable]
		public struct Settings
		{
			public bool useClipping;

			[Range(-0.1f, 0f)]
			public float zSpacing;

			public bool tintBlack;

			[FormerlySerializedAs("canvasGroupTintBlack")]
			[Tooltip("Enable when using SkeletonGraphic under a CanvasGroup. When enabled, PMA Vertex Color alpha value is stored at uv2.g instead of color.a to capture CanvasGroup modifying color.a. Also helps to detect correct parameter setting combinations.")]
			public bool canvasGroupCompatible;

			public bool pmaVertexColors;

			public bool addNormals;

			public bool calculateTangents;

			public bool immutableTriangles;

			public static Settings Default
			{
				get
				{
					Settings result = default(Settings);
					result.pmaVertexColors = true;
					result.zSpacing = 0f;
					result.useClipping = true;
					result.tintBlack = false;
					result.calculateTangents = false;
					result.addNormals = false;
					result.immutableTriangles = false;
					return result;
				}
			}
		}

		public Settings settings = Settings.Default;

		private const float BoundsMinDefault = float.PositiveInfinity;

		private const float BoundsMaxDefault = float.NegativeInfinity;

		[NonSerialized]
		protected readonly ExposedList<Vector3> vertexBuffer = new ExposedList<Vector3>(4);

		[NonSerialized]
		protected readonly ExposedList<Vector2> uvBuffer = new ExposedList<Vector2>(4);

		[NonSerialized]
		protected readonly ExposedList<Color32> colorBuffer = new ExposedList<Color32>(4);

		[NonSerialized]
		protected readonly ExposedList<ExposedList<int>> submeshes = new ExposedList<ExposedList<int>>
		{
			new ExposedList<int>(6)
		};

		[NonSerialized]
		private Vector2 meshBoundsMin;

		[NonSerialized]
		private Vector2 meshBoundsMax;

		[NonSerialized]
		private float meshBoundsThickness;

		[NonSerialized]
		private int submeshIndex = 0;

		[NonSerialized]
		private SkeletonClipping clipper = new SkeletonClipping();

		[NonSerialized]
		private float[] tempVerts = new float[8];

		[NonSerialized]
		private int[] regionTriangles = new int[6] { 0, 1, 2, 2, 3, 0 };

		[NonSerialized]
		private Vector3[] normals;

		[NonSerialized]
		private Vector4[] tangents;

		[NonSerialized]
		private Vector2[] tempTanBuffer;

		[NonSerialized]
		private ExposedList<Vector2> uv2;

		[NonSerialized]
		private ExposedList<Vector2> uv3;

		private static List<Vector3> AttachmentVerts = new List<Vector3>();

		private static List<Vector2> AttachmentUVs = new List<Vector2>();

		private static List<Color32> AttachmentColors32 = new List<Color32>();

		private static List<int> AttachmentIndices = new List<int>();

		public Vector2[] UV2
		{
			get
			{
				PrepareOptionalUVBuffer(ref uv2, vertexBuffer.Count);
				return uv2.Items;
			}
		}

		public Vector2[] UV3
		{
			get
			{
				PrepareOptionalUVBuffer(ref uv3, vertexBuffer.Count);
				return uv3.Items;
			}
		}

		public int VertexCount => vertexBuffer.Count;

		public MeshGeneratorBuffers Buffers
		{
			get
			{
				MeshGeneratorBuffers result = default(MeshGeneratorBuffers);
				result.vertexCount = VertexCount;
				result.vertexBuffer = vertexBuffer.Items;
				result.uvBuffer = uvBuffer.Items;
				result.colorBuffer = colorBuffer.Items;
				result.meshGenerator = this;
				return result;
			}
		}

		public SkeletonClipping SkeletonClipping => clipper;

		public int SubmeshIndexCount(int submeshIndex)
		{
			return submeshes.Items[submeshIndex].Count;
		}

		public MeshGenerator()
		{
			submeshes.TrimExcess();
		}

		public static void GenerateSingleSubmeshInstruction(SkeletonRendererInstruction instructionOutput, Skeleton skeleton, Material material)
		{
			ExposedList<Slot> drawOrder = skeleton.DrawOrder;
			int drawOrderCount = drawOrder.Count;
			instructionOutput.Clear();
			ExposedList<SubmeshInstruction> workingSubmeshInstructions = instructionOutput.submeshInstructions;
			instructionOutput.attachments.Resize(drawOrderCount);
			Attachment[] workingAttachmentsItems = instructionOutput.attachments.Items;
			int totalRawVertexCount = 0;
			SubmeshInstruction submeshInstruction = default(SubmeshInstruction);
			submeshInstruction.skeleton = skeleton;
			submeshInstruction.preActiveClippingSlotSource = -1;
			submeshInstruction.startSlot = 0;
			submeshInstruction.rawFirstVertexIndex = 0;
			submeshInstruction.material = material;
			submeshInstruction.forceSeparate = false;
			submeshInstruction.endSlot = drawOrderCount;
			SubmeshInstruction current = submeshInstruction;
			object rendererObject = null;
			bool skeletonHasClipping = false;
			Slot[] drawOrderItems = drawOrder.Items;
			for (int i = 0; i < drawOrderCount; i++)
			{
				Slot slot = drawOrderItems[i];
				if (!slot.Bone.Active || slot.A == 0f)
				{
					workingAttachmentsItems[i] = null;
					continue;
				}
				if (slot.Data.BlendMode == BlendMode.Additive)
				{
					current.hasPMAAdditiveSlot = true;
				}
				Attachment attachment = (workingAttachmentsItems[i] = slot.Attachment);
				int attachmentVertexCount;
				int attachmentTriangleCount;
				if (attachment is RegionAttachment regionAttachment)
				{
					if (regionAttachment.Sequence != null)
					{
						regionAttachment.Sequence.Apply(slot, regionAttachment);
					}
					rendererObject = regionAttachment.Region;
					attachmentVertexCount = 4;
					attachmentTriangleCount = 6;
				}
				else if (attachment is MeshAttachment meshAttachment)
				{
					if (meshAttachment.Sequence != null)
					{
						meshAttachment.Sequence.Apply(slot, meshAttachment);
					}
					rendererObject = meshAttachment.Region;
					attachmentVertexCount = meshAttachment.WorldVerticesLength >> 1;
					attachmentTriangleCount = meshAttachment.Triangles.Length;
				}
				else
				{
					if (attachment is ClippingAttachment)
					{
						current.hasClipping = true;
						skeletonHasClipping = true;
					}
					attachmentVertexCount = 0;
					attachmentTriangleCount = 0;
				}
				current.rawTriangleCount += attachmentTriangleCount;
				current.rawVertexCount += attachmentVertexCount;
				totalRawVertexCount += attachmentVertexCount;
			}
			if (material == null && rendererObject != null)
			{
				current.material = (Material)((AtlasRegion)rendererObject).page.rendererObject;
			}
			instructionOutput.hasActiveClipping = skeletonHasClipping;
			instructionOutput.rawVertexCount = totalRawVertexCount;
			if (totalRawVertexCount > 0)
			{
				workingSubmeshInstructions.Resize(1);
				workingSubmeshInstructions.Items[0] = current;
			}
			else
			{
				workingSubmeshInstructions.Resize(0);
			}
		}

		public static bool RequiresMultipleSubmeshesByDrawOrder(Skeleton skeleton)
		{
			ExposedList<Slot> drawOrder = skeleton.DrawOrder;
			int drawOrderCount = drawOrder.Count;
			Slot[] drawOrderItems = drawOrder.Items;
			Material lastRendererMaterial = null;
			for (int i = 0; i < drawOrderCount; i++)
			{
				Slot slot = drawOrderItems[i];
				if (!slot.Bone.Active || slot.A == 0f)
				{
					continue;
				}
				Attachment attachment = slot.Attachment;
				if (!(attachment is IHasTextureRegion rendererAttachment))
				{
					continue;
				}
				if (rendererAttachment.Sequence != null)
				{
					rendererAttachment.Sequence.Apply(slot, rendererAttachment);
				}
				AtlasRegion atlasRegion = (AtlasRegion)rendererAttachment.Region;
				Material material = (Material)atlasRegion.page.rendererObject;
				if (lastRendererMaterial != material)
				{
					if (lastRendererMaterial != null)
					{
						return true;
					}
					lastRendererMaterial = material;
				}
			}
			return false;
		}

		public static void GenerateSkeletonRendererInstruction(SkeletonRendererInstruction instructionOutput, Skeleton skeleton, Dictionary<Slot, Material> customSlotMaterials, List<Slot> separatorSlots, bool generateMeshOverride, bool immutableTriangles = false)
		{
			ExposedList<Slot> drawOrder = skeleton.DrawOrder;
			int drawOrderCount = drawOrder.Count;
			instructionOutput.Clear();
			ExposedList<SubmeshInstruction> workingSubmeshInstructions = instructionOutput.submeshInstructions;
			instructionOutput.attachments.Resize(drawOrderCount);
			Attachment[] workingAttachmentsItems = instructionOutput.attachments.Items;
			int totalRawVertexCount = 0;
			bool skeletonHasClipping = false;
			SubmeshInstruction submeshInstruction = default(SubmeshInstruction);
			submeshInstruction.skeleton = skeleton;
			submeshInstruction.preActiveClippingSlotSource = -1;
			SubmeshInstruction current = submeshInstruction;
			bool isCustomSlotMaterialsPopulated = customSlotMaterials != null && customSlotMaterials.Count > 0;
			int separatorCount = separatorSlots?.Count ?? 0;
			bool hasSeparators = separatorCount > 0;
			int clippingAttachmentSource = -1;
			int lastPreActiveClipping = -1;
			SlotData clippingEndSlot = null;
			int submeshIndex = 0;
			Slot[] drawOrderItems = drawOrder.Items;
			for (int i = 0; i < drawOrderCount; i++)
			{
				Slot slot = drawOrderItems[i];
				if (!slot.Bone.Active || (slot.A == 0f && slot.Data != clippingEndSlot))
				{
					workingAttachmentsItems[i] = null;
					continue;
				}
				if (slot.Data.BlendMode == BlendMode.Additive)
				{
					current.hasPMAAdditiveSlot = true;
				}
				Attachment attachment = (workingAttachmentsItems[i] = slot.Attachment);
				int attachmentVertexCount = 0;
				int attachmentTriangleCount = 0;
				object region = null;
				bool noRender = false;
				if (attachment is RegionAttachment regionAttachment)
				{
					if (regionAttachment.Sequence != null)
					{
						regionAttachment.Sequence.Apply(slot, regionAttachment);
					}
					region = regionAttachment.Region;
					attachmentVertexCount = 4;
					attachmentTriangleCount = 6;
				}
				else if (attachment is MeshAttachment meshAttachment)
				{
					if (meshAttachment.Sequence != null)
					{
						meshAttachment.Sequence.Apply(slot, meshAttachment);
					}
					region = meshAttachment.Region;
					attachmentVertexCount = meshAttachment.WorldVerticesLength >> 1;
					attachmentTriangleCount = meshAttachment.Triangles.Length;
				}
				else
				{
					if (attachment is ClippingAttachment clippingAttachment)
					{
						clippingEndSlot = clippingAttachment.EndSlot;
						clippingAttachmentSource = i;
						current.hasClipping = true;
						skeletonHasClipping = true;
					}
					noRender = true;
				}
				if (hasSeparators)
				{
					current.forceSeparate = false;
					for (int s = 0; s < separatorCount; s++)
					{
						if (slot == separatorSlots[s])
						{
							current.forceSeparate = true;
							break;
						}
					}
				}
				if (noRender)
				{
					if (current.forceSeparate && generateMeshOverride)
					{
						current.endSlot = i;
						current.preActiveClippingSlotSource = lastPreActiveClipping;
						workingSubmeshInstructions.Resize(submeshIndex + 1);
						workingSubmeshInstructions.Items[submeshIndex] = current;
						submeshIndex++;
						current.startSlot = i;
						lastPreActiveClipping = clippingAttachmentSource;
						current.rawTriangleCount = 0;
						current.rawVertexCount = 0;
						current.rawFirstVertexIndex = totalRawVertexCount;
						current.hasClipping = clippingAttachmentSource >= 0;
					}
				}
				else
				{
					Material material;
					if (isCustomSlotMaterialsPopulated)
					{
						if (!customSlotMaterials.TryGetValue(slot, out material))
						{
							material = (Material)((AtlasRegion)region).page.rendererObject;
						}
					}
					else
					{
						material = (Material)((AtlasRegion)region).page.rendererObject;
					}
					if (current.forceSeparate || (current.rawVertexCount > 0 && (object)current.material != material))
					{
						current.endSlot = i;
						current.preActiveClippingSlotSource = lastPreActiveClipping;
						workingSubmeshInstructions.Resize(submeshIndex + 1);
						workingSubmeshInstructions.Items[submeshIndex] = current;
						submeshIndex++;
						current.startSlot = i;
						lastPreActiveClipping = clippingAttachmentSource;
						current.rawTriangleCount = 0;
						current.rawVertexCount = 0;
						current.rawFirstVertexIndex = totalRawVertexCount;
						current.hasClipping = clippingAttachmentSource >= 0;
					}
					current.material = material;
					current.rawTriangleCount += attachmentTriangleCount;
					current.rawVertexCount += attachmentVertexCount;
					current.rawFirstVertexIndex = totalRawVertexCount;
					totalRawVertexCount += attachmentVertexCount;
				}
				if (clippingEndSlot != null && slot.Data == clippingEndSlot && i != clippingAttachmentSource)
				{
					clippingEndSlot = null;
					clippingAttachmentSource = -1;
				}
			}
			if (current.rawVertexCount > 0)
			{
				current.endSlot = drawOrderCount;
				current.preActiveClippingSlotSource = lastPreActiveClipping;
				current.forceSeparate = false;
				workingSubmeshInstructions.Resize(submeshIndex + 1);
				workingSubmeshInstructions.Items[submeshIndex] = current;
			}
			instructionOutput.hasActiveClipping = skeletonHasClipping;
			instructionOutput.rawVertexCount = totalRawVertexCount;
			instructionOutput.immutableTriangles = immutableTriangles;
		}

		public static void TryReplaceMaterials(ExposedList<SubmeshInstruction> workingSubmeshInstructions, Dictionary<Material, Material> customMaterialOverride)
		{
			SubmeshInstruction[] wsii = workingSubmeshInstructions.Items;
			for (int i = 0; i < workingSubmeshInstructions.Count; i++)
			{
				Material material = wsii[i].material;
				if (!(material == null) && customMaterialOverride.TryGetValue(material, out var overrideMaterial))
				{
					wsii[i].material = overrideMaterial;
				}
			}
		}

		public void Begin()
		{
			vertexBuffer.Clear(false);
			colorBuffer.Clear(false);
			uvBuffer.Clear(false);
			clipper.ClipEnd();
			meshBoundsMin.x = float.PositiveInfinity;
			meshBoundsMin.y = float.PositiveInfinity;
			meshBoundsMax.x = float.NegativeInfinity;
			meshBoundsMax.y = float.NegativeInfinity;
			meshBoundsThickness = 0f;
			submeshIndex = 0;
			submeshes.Count = 1;
		}

		public void AddSubmesh(SubmeshInstruction instruction, bool updateTriangles = true)
		{
			Settings settings = this.settings;
			int newSubmeshCount = submeshIndex + 1;
			if (submeshes.Items.Length < newSubmeshCount)
			{
				submeshes.Resize(newSubmeshCount);
			}
			submeshes.Count = newSubmeshCount;
			ExposedList<int> submesh = submeshes.Items[submeshIndex];
			if (submesh == null)
			{
				submesh = (submeshes.Items[submeshIndex] = new ExposedList<int>());
			}
			submesh.Clear(false);
			Skeleton skeleton = instruction.skeleton;
			Slot[] drawOrderItems = skeleton.DrawOrder.Items;
			Color32 color = default(Color32);
			float skeletonA = skeleton.A;
			float skeletonR = skeleton.R;
			float skeletonG = skeleton.G;
			float skeletonB = skeleton.B;
			Vector2 meshBoundsMin = this.meshBoundsMin;
			Vector2 meshBoundsMax = this.meshBoundsMax;
			float zSpacing = settings.zSpacing;
			bool pmaVertexColors = settings.pmaVertexColors;
			bool tintBlack = settings.tintBlack;
			bool linearColorSpace = QualitySettings.activeColorSpace == ColorSpace.Linear;
			bool useClipping = settings.useClipping && instruction.hasClipping;
			bool canvasGroupTintBlack = settings.tintBlack && settings.canvasGroupCompatible;
			if (useClipping && instruction.preActiveClippingSlotSource >= 0)
			{
				Slot slot2 = drawOrderItems[instruction.preActiveClippingSlotSource];
				clipper.ClipStart(slot2, slot2.Attachment as ClippingAttachment);
			}
			for (int slotIndex = instruction.startSlot; slotIndex < instruction.endSlot; slotIndex++)
			{
				Slot slot = drawOrderItems[slotIndex];
				if (!slot.Bone.Active || slot.A == 0f)
				{
					clipper.ClipEnd(slot);
					continue;
				}
				Attachment attachment = slot.Attachment;
				float z = zSpacing * (float)slotIndex;
				float[] workingVerts = tempVerts;
				Color c = default(Color);
				float[] uvs;
				int[] attachmentTriangleIndices;
				int attachmentVertexCount;
				int attachmentIndexCount;
				if (attachment is RegionAttachment region)
				{
					region.ComputeWorldVertices(slot, workingVerts, 0);
					uvs = region.UVs;
					attachmentTriangleIndices = regionTriangles;
					c.r = region.R;
					c.g = region.G;
					c.b = region.B;
					c.a = region.A;
					attachmentVertexCount = 4;
					attachmentIndexCount = 6;
				}
				else
				{
					if (!(attachment is MeshAttachment mesh))
					{
						if (useClipping && attachment is ClippingAttachment clippingAttachment)
						{
							clipper.ClipStart(slot, clippingAttachment);
						}
						else
						{
							clipper.ClipEnd(slot);
						}
						continue;
					}
					int meshVerticesLength = mesh.WorldVerticesLength;
					if (workingVerts.Length < meshVerticesLength)
					{
						workingVerts = (tempVerts = new float[meshVerticesLength]);
					}
					mesh.ComputeWorldVertices(slot, 0, meshVerticesLength, workingVerts, 0);
					uvs = mesh.UVs;
					attachmentTriangleIndices = mesh.Triangles;
					c.r = mesh.R;
					c.g = mesh.G;
					c.b = mesh.B;
					c.a = mesh.A;
					attachmentVertexCount = meshVerticesLength >> 1;
					attachmentIndexCount = mesh.Triangles.Length;
				}
				float tintBlackAlpha = 1f;
				if (pmaVertexColors)
				{
					float alpha2 = skeletonA * slot.A * c.a;
					bool isAdditiveSlot2 = slot.Data.BlendMode == BlendMode.Additive;
					if (linearColorSpace && isAdditiveSlot2)
					{
						alpha2 = Mathf.LinearToGammaSpace(alpha2);
					}
					color.a = (byte)(alpha2 * 255f);
					color.r = (byte)(skeletonR * slot.R * c.r * (float)(int)color.a);
					color.g = (byte)(skeletonG * slot.G * c.g * (float)(int)color.a);
					color.b = (byte)(skeletonB * slot.B * c.b * (float)(int)color.a);
					if (canvasGroupTintBlack)
					{
						tintBlackAlpha = (isAdditiveSlot2 ? 0f : alpha2);
						color.a = byte.MaxValue;
					}
					else if (isAdditiveSlot2)
					{
						color.a = 0;
					}
				}
				else
				{
					color.a = (byte)(skeletonA * slot.A * c.a * 255f);
					color.r = (byte)(skeletonR * slot.R * c.r * 255f);
					color.g = (byte)(skeletonG * slot.G * c.g * 255f);
					color.b = (byte)(skeletonB * slot.B * c.b * 255f);
				}
				if (useClipping && clipper.IsClipping)
				{
					clipper.ClipTriangles(workingVerts, attachmentTriangleIndices, attachmentIndexCount, uvs);
					workingVerts = clipper.ClippedVertices.Items;
					attachmentVertexCount = clipper.ClippedVertices.Count >> 1;
					attachmentTriangleIndices = clipper.ClippedTriangles.Items;
					attachmentIndexCount = clipper.ClippedTriangles.Count;
					uvs = clipper.ClippedUVs.Items;
				}
				if (attachmentVertexCount != 0 && attachmentIndexCount != 0)
				{
					if (tintBlack)
					{
						float r2 = slot.R2;
						float g2 = slot.G2;
						float b2 = slot.B2;
						if (pmaVertexColors)
						{
							float alpha = skeletonA * slot.A * c.a;
							bool isAdditiveSlot = slot.Data.BlendMode == BlendMode.Additive;
							if (linearColorSpace && isAdditiveSlot)
							{
								alpha = Mathf.LinearToGammaSpace(alpha);
							}
							r2 *= alpha;
							g2 *= alpha;
							b2 *= alpha;
						}
						AddAttachmentTintBlack(r2, g2, b2, tintBlackAlpha, attachmentVertexCount);
					}
					int ovc = vertexBuffer.Count;
					int newVertexCount = ovc + attachmentVertexCount;
					int oldArraySize = vertexBuffer.Items.Length;
					if (newVertexCount > oldArraySize)
					{
						int newArraySize = (int)((float)oldArraySize * 1.3f);
						if (newArraySize < newVertexCount)
						{
							newArraySize = newVertexCount;
						}
						Array.Resize(ref vertexBuffer.Items, newArraySize);
						Array.Resize(ref uvBuffer.Items, newArraySize);
						Array.Resize(ref colorBuffer.Items, newArraySize);
					}
					vertexBuffer.Count = (uvBuffer.Count = (colorBuffer.Count = newVertexCount));
					Vector3[] vbi = vertexBuffer.Items;
					Vector2[] ubi = uvBuffer.Items;
					Color32[] cbi = colorBuffer.Items;
					if (ovc == 0)
					{
						for (int k = 0; k < attachmentVertexCount; k++)
						{
							int vi2 = ovc + k;
							int i3 = k << 1;
							float x2 = workingVerts[i3];
							float y2 = workingVerts[i3 + 1];
							vbi[vi2].x = x2;
							vbi[vi2].y = y2;
							vbi[vi2].z = z;
							ubi[vi2].x = uvs[i3];
							ubi[vi2].y = uvs[i3 + 1];
							cbi[vi2] = color;
							if (x2 < meshBoundsMin.x)
							{
								meshBoundsMin.x = x2;
							}
							if (x2 > meshBoundsMax.x)
							{
								meshBoundsMax.x = x2;
							}
							if (y2 < meshBoundsMin.y)
							{
								meshBoundsMin.y = y2;
							}
							if (y2 > meshBoundsMax.y)
							{
								meshBoundsMax.y = y2;
							}
						}
					}
					else
					{
						for (int j = 0; j < attachmentVertexCount; j++)
						{
							int vi = ovc + j;
							int i2 = j << 1;
							float x = workingVerts[i2];
							float y = workingVerts[i2 + 1];
							vbi[vi].x = x;
							vbi[vi].y = y;
							vbi[vi].z = z;
							ubi[vi].x = uvs[i2];
							ubi[vi].y = uvs[i2 + 1];
							cbi[vi] = color;
							if (x < meshBoundsMin.x)
							{
								meshBoundsMin.x = x;
							}
							else if (x > meshBoundsMax.x)
							{
								meshBoundsMax.x = x;
							}
							if (y < meshBoundsMin.y)
							{
								meshBoundsMin.y = y;
							}
							else if (y > meshBoundsMax.y)
							{
								meshBoundsMax.y = y;
							}
						}
					}
					if (updateTriangles)
					{
						int oldTriangleCount = submesh.Count;
						int newTriangleCount = oldTriangleCount + attachmentIndexCount;
						if (newTriangleCount > submesh.Items.Length)
						{
							Array.Resize(ref submesh.Items, newTriangleCount);
						}
						submesh.Count = newTriangleCount;
						int[] submeshItems = submesh.Items;
						for (int i = 0; i < attachmentIndexCount; i++)
						{
							submeshItems[oldTriangleCount + i] = attachmentTriangleIndices[i] + ovc;
						}
					}
				}
				clipper.ClipEnd(slot);
			}
			clipper.ClipEnd();
			this.meshBoundsMin = meshBoundsMin;
			this.meshBoundsMax = meshBoundsMax;
			meshBoundsThickness = (float)instruction.endSlot * zSpacing;
			int[] currentSubmeshItems = submesh.Items;
			int l = submesh.Count;
			for (int m = currentSubmeshItems.Length; l < m; l++)
			{
				currentSubmeshItems[l] = 0;
			}
			submeshIndex++;
		}

		public void BuildMesh(SkeletonRendererInstruction instruction, bool updateTriangles)
		{
			SubmeshInstruction[] wsii = instruction.submeshInstructions.Items;
			int i = 0;
			for (int j = instruction.submeshInstructions.Count; i < j; i++)
			{
				AddSubmesh(wsii[i], updateTriangles);
			}
		}

		public void BuildMeshWithArrays(SkeletonRendererInstruction instruction, bool updateTriangles)
		{
			Settings settings = this.settings;
			bool canvasGroupTintBlack = settings.tintBlack && settings.canvasGroupCompatible;
			int totalVertexCount = instruction.rawVertexCount;
			bool linearColorSpace = QualitySettings.activeColorSpace == ColorSpace.Linear;
			if (totalVertexCount > vertexBuffer.Items.Length)
			{
				Array.Resize(ref vertexBuffer.Items, totalVertexCount);
				Array.Resize(ref uvBuffer.Items, totalVertexCount);
				Array.Resize(ref colorBuffer.Items, totalVertexCount);
			}
			vertexBuffer.Count = (uvBuffer.Count = (colorBuffer.Count = totalVertexCount));
			Color32 color = default(Color32);
			int vertexIndex = 0;
			float[] tempVerts = this.tempVerts;
			Vector2 bmin = meshBoundsMin;
			Vector2 bmax = meshBoundsMax;
			Vector3[] vbi = vertexBuffer.Items;
			Vector2[] ubi = uvBuffer.Items;
			Color32[] cbi = colorBuffer.Items;
			int lastSlotIndex = 0;
			int si = 0;
			Vector2 b2 = default(Vector2);
			Vector2 rg = default(Vector2);
			for (int j = instruction.submeshInstructions.Count; si < j; si++)
			{
				SubmeshInstruction submesh = instruction.submeshInstructions.Items[si];
				Skeleton skeleton = submesh.skeleton;
				Slot[] drawOrderItems = skeleton.DrawOrder.Items;
				float a = skeleton.A;
				float r = skeleton.R;
				float g = skeleton.G;
				float b = skeleton.B;
				int endSlot = submesh.endSlot;
				int startSlot = submesh.startSlot;
				lastSlotIndex = endSlot;
				if (settings.tintBlack)
				{
					int vi = vertexIndex;
					b2.y = 1f;
					PrepareOptionalUVBuffer(ref uv2, totalVertexCount);
					PrepareOptionalUVBuffer(ref uv3, totalVertexCount);
					Vector2[] uv2i = uv2.Items;
					Vector2[] uv3i = uv3.Items;
					for (int slotIndex2 = startSlot; slotIndex2 < endSlot; slotIndex2++)
					{
						Slot slot2 = drawOrderItems[slotIndex2];
						if (!slot2.Bone.Active || slot2.A == 0f)
						{
							continue;
						}
						Attachment attachment2 = slot2.Attachment;
						rg.x = slot2.R2;
						rg.y = slot2.G2;
						b2.x = slot2.B2;
						b2.y = 1f;
						if (attachment2 is RegionAttachment regionAttachment2)
						{
							if (settings.pmaVertexColors)
							{
								float alpha4 = a * slot2.A * regionAttachment2.A;
								bool isAdditiveSlot4 = slot2.Data.BlendMode == BlendMode.Additive;
								if (linearColorSpace && isAdditiveSlot4)
								{
									alpha4 = Mathf.LinearToGammaSpace(alpha4);
								}
								rg.x *= alpha4;
								rg.y *= alpha4;
								b2.x *= alpha4;
								b2.y = (isAdditiveSlot4 ? 0f : alpha4);
							}
							uv2i[vi] = rg;
							uv2i[vi + 1] = rg;
							uv2i[vi + 2] = rg;
							uv2i[vi + 3] = rg;
							uv3i[vi] = b2;
							uv3i[vi + 1] = b2;
							uv3i[vi + 2] = b2;
							uv3i[vi + 3] = b2;
							vi += 4;
						}
						else
						{
							if (!(attachment2 is MeshAttachment meshAttachment2))
							{
								continue;
							}
							if (settings.pmaVertexColors)
							{
								float alpha3 = a * slot2.A * meshAttachment2.A;
								bool isAdditiveSlot3 = slot2.Data.BlendMode == BlendMode.Additive;
								if (linearColorSpace && isAdditiveSlot3)
								{
									alpha3 = Mathf.LinearToGammaSpace(alpha3);
								}
								rg.x *= alpha3;
								rg.y *= alpha3;
								b2.x *= alpha3;
								b2.y = (isAdditiveSlot3 ? 0f : alpha3);
							}
							int verticesArrayLength2 = meshAttachment2.WorldVerticesLength;
							for (int iii2 = 0; iii2 < verticesArrayLength2; iii2 += 2)
							{
								uv2i[vi] = rg;
								uv3i[vi] = b2;
								vi++;
							}
						}
					}
				}
				for (int slotIndex = startSlot; slotIndex < endSlot; slotIndex++)
				{
					Slot slot = drawOrderItems[slotIndex];
					if (!slot.Bone.Active || slot.A == 0f)
					{
						continue;
					}
					Attachment attachment = slot.Attachment;
					float z = (float)slotIndex * settings.zSpacing;
					if (attachment is RegionAttachment regionAttachment)
					{
						regionAttachment.ComputeWorldVertices(slot, tempVerts, 0);
						float x2 = tempVerts[0];
						float y2 = tempVerts[1];
						float x3 = tempVerts[2];
						float y3 = tempVerts[3];
						float x4 = tempVerts[4];
						float y4 = tempVerts[5];
						float x5 = tempVerts[6];
						float y5 = tempVerts[7];
						vbi[vertexIndex].x = x2;
						vbi[vertexIndex].y = y2;
						vbi[vertexIndex].z = z;
						vbi[vertexIndex + 1].x = x5;
						vbi[vertexIndex + 1].y = y5;
						vbi[vertexIndex + 1].z = z;
						vbi[vertexIndex + 2].x = x3;
						vbi[vertexIndex + 2].y = y3;
						vbi[vertexIndex + 2].z = z;
						vbi[vertexIndex + 3].x = x4;
						vbi[vertexIndex + 3].y = y4;
						vbi[vertexIndex + 3].z = z;
						if (settings.pmaVertexColors)
						{
							float alpha2 = a * slot.A * regionAttachment.A;
							bool isAdditiveSlot2 = slot.Data.BlendMode == BlendMode.Additive;
							if (linearColorSpace && isAdditiveSlot2)
							{
								alpha2 = Mathf.LinearToGammaSpace(alpha2);
							}
							color.a = (byte)(alpha2 * 255f);
							color.r = (byte)(r * slot.R * regionAttachment.R * (float)(int)color.a);
							color.g = (byte)(g * slot.G * regionAttachment.G * (float)(int)color.a);
							color.b = (byte)(b * slot.B * regionAttachment.B * (float)(int)color.a);
							if (canvasGroupTintBlack)
							{
								color.a = byte.MaxValue;
							}
							else if (isAdditiveSlot2)
							{
								color.a = 0;
							}
						}
						else
						{
							color.a = (byte)(a * slot.A * regionAttachment.A * 255f);
							color.r = (byte)(r * slot.R * regionAttachment.R * 255f);
							color.g = (byte)(g * slot.G * regionAttachment.G * 255f);
							color.b = (byte)(b * slot.B * regionAttachment.B * 255f);
						}
						cbi[vertexIndex] = color;
						cbi[vertexIndex + 1] = color;
						cbi[vertexIndex + 2] = color;
						cbi[vertexIndex + 3] = color;
						float[] regionUVs = regionAttachment.UVs;
						ubi[vertexIndex].x = regionUVs[0];
						ubi[vertexIndex].y = regionUVs[1];
						ubi[vertexIndex + 1].x = regionUVs[6];
						ubi[vertexIndex + 1].y = regionUVs[7];
						ubi[vertexIndex + 2].x = regionUVs[2];
						ubi[vertexIndex + 2].y = regionUVs[3];
						ubi[vertexIndex + 3].x = regionUVs[4];
						ubi[vertexIndex + 3].y = regionUVs[5];
						if (x2 < bmin.x)
						{
							bmin.x = x2;
						}
						if (x2 > bmax.x)
						{
							bmax.x = x2;
						}
						if (x3 < bmin.x)
						{
							bmin.x = x3;
						}
						else if (x3 > bmax.x)
						{
							bmax.x = x3;
						}
						if (x4 < bmin.x)
						{
							bmin.x = x4;
						}
						else if (x4 > bmax.x)
						{
							bmax.x = x4;
						}
						if (x5 < bmin.x)
						{
							bmin.x = x5;
						}
						else if (x5 > bmax.x)
						{
							bmax.x = x5;
						}
						if (y2 < bmin.y)
						{
							bmin.y = y2;
						}
						if (y2 > bmax.y)
						{
							bmax.y = y2;
						}
						if (y3 < bmin.y)
						{
							bmin.y = y3;
						}
						else if (y3 > bmax.y)
						{
							bmax.y = y3;
						}
						if (y4 < bmin.y)
						{
							bmin.y = y4;
						}
						else if (y4 > bmax.y)
						{
							bmax.y = y4;
						}
						if (y5 < bmin.y)
						{
							bmin.y = y5;
						}
						else if (y5 > bmax.y)
						{
							bmax.y = y5;
						}
						vertexIndex += 4;
					}
					else
					{
						if (!(attachment is MeshAttachment meshAttachment))
						{
							continue;
						}
						int verticesArrayLength = meshAttachment.WorldVerticesLength;
						if (tempVerts.Length < verticesArrayLength)
						{
							tempVerts = (this.tempVerts = new float[verticesArrayLength]);
						}
						meshAttachment.ComputeWorldVertices(slot, tempVerts);
						if (settings.pmaVertexColors)
						{
							float alpha = a * slot.A * meshAttachment.A;
							bool isAdditiveSlot = slot.Data.BlendMode == BlendMode.Additive;
							if (linearColorSpace && isAdditiveSlot)
							{
								alpha = Mathf.LinearToGammaSpace(alpha);
							}
							color.a = (byte)(alpha * 255f);
							color.r = (byte)(r * slot.R * meshAttachment.R * (float)(int)color.a);
							color.g = (byte)(g * slot.G * meshAttachment.G * (float)(int)color.a);
							color.b = (byte)(b * slot.B * meshAttachment.B * (float)(int)color.a);
							if (canvasGroupTintBlack)
							{
								color.a = byte.MaxValue;
							}
							else if (isAdditiveSlot)
							{
								color.a = 0;
							}
						}
						else
						{
							color.a = (byte)(a * slot.A * meshAttachment.A * 255f);
							color.r = (byte)(r * slot.R * meshAttachment.R * 255f);
							color.g = (byte)(g * slot.G * meshAttachment.G * 255f);
							color.b = (byte)(b * slot.B * meshAttachment.B * 255f);
						}
						float[] attachmentUVs = meshAttachment.UVs;
						if (vertexIndex == 0)
						{
							float fx = tempVerts[0];
							float fy = tempVerts[1];
							if (fx < bmin.x)
							{
								bmin.x = fx;
							}
							if (fx > bmax.x)
							{
								bmax.x = fx;
							}
							if (fy < bmin.y)
							{
								bmin.y = fy;
							}
							if (fy > bmax.y)
							{
								bmax.y = fy;
							}
						}
						for (int iii = 0; iii < verticesArrayLength; iii += 2)
						{
							float x = tempVerts[iii];
							float y = tempVerts[iii + 1];
							vbi[vertexIndex].x = x;
							vbi[vertexIndex].y = y;
							vbi[vertexIndex].z = z;
							cbi[vertexIndex] = color;
							ubi[vertexIndex].x = attachmentUVs[iii];
							ubi[vertexIndex].y = attachmentUVs[iii + 1];
							if (x < bmin.x)
							{
								bmin.x = x;
							}
							else if (x > bmax.x)
							{
								bmax.x = x;
							}
							if (y < bmin.y)
							{
								bmin.y = y;
							}
							else if (y > bmax.y)
							{
								bmax.y = y;
							}
							vertexIndex++;
						}
					}
				}
			}
			meshBoundsMin = bmin;
			meshBoundsMax = bmax;
			meshBoundsThickness = (float)lastSlotIndex * settings.zSpacing;
			int submeshInstructionCount = instruction.submeshInstructions.Count;
			submeshes.Count = submeshInstructionCount;
			if (!updateTriangles)
			{
				return;
			}
			if (submeshes.Items.Length < submeshInstructionCount)
			{
				submeshes.Resize(submeshInstructionCount);
				int i = 0;
				for (int k = submeshInstructionCount; i < k; i++)
				{
					ExposedList<int> submeshBuffer = submeshes.Items[i];
					if (submeshBuffer == null)
					{
						submeshes.Items[i] = new ExposedList<int>();
					}
					else
					{
						submeshBuffer.Clear(false);
					}
				}
			}
			SubmeshInstruction[] submeshInstructionsItems = instruction.submeshInstructions.Items;
			int attachmentFirstVertex = 0;
			for (int smbi = 0; smbi < submeshInstructionCount; smbi++)
			{
				SubmeshInstruction submeshInstruction = submeshInstructionsItems[smbi];
				ExposedList<int> currentSubmeshBuffer = submeshes.Items[smbi];
				int newTriangleCount = submeshInstruction.rawTriangleCount;
				if (newTriangleCount > currentSubmeshBuffer.Items.Length)
				{
					Array.Resize(ref currentSubmeshBuffer.Items, newTriangleCount);
				}
				else if (newTriangleCount < currentSubmeshBuffer.Items.Length)
				{
					int[] sbi = currentSubmeshBuffer.Items;
					int ei = newTriangleCount;
					for (int nn2 = sbi.Length; ei < nn2; ei++)
					{
						sbi[ei] = 0;
					}
				}
				currentSubmeshBuffer.Count = newTriangleCount;
				int[] tris = currentSubmeshBuffer.Items;
				int triangleIndex = 0;
				Skeleton skeleton2 = submeshInstruction.skeleton;
				Slot[] drawOrderItems2 = skeleton2.DrawOrder.Items;
				int slotIndex3 = submeshInstruction.startSlot;
				for (int endSlot2 = submeshInstruction.endSlot; slotIndex3 < endSlot2; slotIndex3++)
				{
					Slot slot3 = drawOrderItems2[slotIndex3];
					if (!slot3.Bone.Active || slot3.A == 0f)
					{
						continue;
					}
					Attachment attachment3 = drawOrderItems2[slotIndex3].Attachment;
					if (attachment3 is RegionAttachment)
					{
						tris[triangleIndex] = attachmentFirstVertex;
						tris[triangleIndex + 1] = attachmentFirstVertex + 2;
						tris[triangleIndex + 2] = attachmentFirstVertex + 1;
						tris[triangleIndex + 3] = attachmentFirstVertex + 2;
						tris[triangleIndex + 4] = attachmentFirstVertex + 3;
						tris[triangleIndex + 5] = attachmentFirstVertex + 1;
						triangleIndex += 6;
						attachmentFirstVertex += 4;
					}
					else if (attachment3 is MeshAttachment meshAttachment3)
					{
						int[] attachmentTriangles = meshAttachment3.Triangles;
						int ii = 0;
						int nn = attachmentTriangles.Length;
						while (ii < nn)
						{
							tris[triangleIndex] = attachmentFirstVertex + attachmentTriangles[ii];
							ii++;
							triangleIndex++;
						}
						attachmentFirstVertex += meshAttachment3.WorldVerticesLength >> 1;
					}
				}
			}
		}

		public void ScaleVertexData(float scale)
		{
			Vector3[] vbi = vertexBuffer.Items;
			int i = 0;
			for (int j = vertexBuffer.Count; i < j; i++)
			{
				vbi[i] *= scale;
			}
			meshBoundsMin *= scale;
			meshBoundsMax *= scale;
			meshBoundsThickness *= scale;
		}

		public void ScaleAndOffsetVertexData(float scale, Vector2 offset2D)
		{
			Vector3 offset = new Vector3(offset2D.x, offset2D.y);
			Vector3[] vbi = vertexBuffer.Items;
			int i = 0;
			for (int j = vertexBuffer.Count; i < j; i++)
			{
				vbi[i] = vbi[i] * scale + offset;
			}
			meshBoundsMin *= scale;
			meshBoundsMax *= scale;
			meshBoundsMin += offset2D;
			meshBoundsMax += offset2D;
			meshBoundsThickness *= scale;
		}

		public Bounds GetMeshBounds()
		{
			if (float.IsInfinity(meshBoundsMin.x))
			{
				return default(Bounds);
			}
			float halfWidth = (meshBoundsMax.x - meshBoundsMin.x) * 0.5f;
			float halfHeight = (meshBoundsMax.y - meshBoundsMin.y) * 0.5f;
			Bounds result = default(Bounds);
			result.center = new Vector3(meshBoundsMin.x + halfWidth, meshBoundsMin.y + halfHeight);
			result.extents = new Vector3(halfWidth, halfHeight, meshBoundsThickness * 0.5f);
			return result;
		}

		private void AddAttachmentTintBlack(float r2, float g2, float b2, float a, int vertexCount)
		{
			Vector2 rg = new Vector2(r2, g2);
			Vector2 bo = new Vector2(b2, a);
			int ovc = vertexBuffer.Count;
			int newVertexCount = ovc + vertexCount;
			PrepareOptionalUVBuffer(ref uv2, newVertexCount);
			PrepareOptionalUVBuffer(ref uv3, newVertexCount);
			Vector2[] uv2i = uv2.Items;
			Vector2[] uv3i = uv3.Items;
			for (int i = 0; i < vertexCount; i++)
			{
				uv2i[ovc + i] = rg;
				uv3i[ovc + i] = bo;
			}
		}

		private void PrepareOptionalUVBuffer(ref ExposedList<Vector2> uvBuffer, int vertexCount)
		{
			if (uvBuffer == null)
			{
				uvBuffer = new ExposedList<Vector2>();
			}
			if (vertexCount > uvBuffer.Items.Length)
			{
				Array.Resize(ref uvBuffer.Items, vertexCount);
			}
			uvBuffer.Count = vertexCount;
		}

		private void ResizeOptionalUVBuffer(ref ExposedList<Vector2> uvBuffer, int vertexCount)
		{
			if (uvBuffer != null && vertexCount != uvBuffer.Items.Length)
			{
				Array.Resize(ref uvBuffer.Items, vertexCount);
				uvBuffer.Count = vertexCount;
			}
		}

		public void FillVertexData(Mesh mesh)
		{
			Vector3[] vbi = vertexBuffer.Items;
			Vector2[] ubi = uvBuffer.Items;
			Color32[] cbi = colorBuffer.Items;
			int vbiLength = vbi.Length;
			int listCount = vertexBuffer.Count;
			Vector3 extraVertex = ((listCount == 0) ? Vector3.zero : vbi[listCount - 1]);
			for (int j = listCount; j < vbiLength; j++)
			{
				vbi[j] = extraVertex;
			}
			mesh.vertices = vbi;
			mesh.uv = ubi;
			mesh.colors32 = cbi;
			mesh.bounds = GetMeshBounds();
			if (settings.addNormals)
			{
				int oldLength = 0;
				if (normals == null)
				{
					normals = new Vector3[vbiLength];
				}
				else
				{
					oldLength = normals.Length;
				}
				if (oldLength != vbiLength)
				{
					Array.Resize(ref normals, vbiLength);
					Vector3[] localNormals = normals;
					for (int i = oldLength; i < vbiLength; i++)
					{
						localNormals[i] = Vector3.back;
					}
				}
				mesh.normals = normals;
			}
			ResizeOptionalUVBuffer(ref uv2, vbiLength);
			ResizeOptionalUVBuffer(ref uv3, vbiLength);
			mesh.uv2 = ((uv2 == null) ? null : uv2.Items);
			mesh.uv3 = ((uv3 == null) ? null : uv3.Items);
		}

		public void FillLateVertexData(Mesh mesh)
		{
			if (settings.calculateTangents)
			{
				int vertexCount = vertexBuffer.Count;
				ExposedList<int>[] sbi = submeshes.Items;
				int submeshCount = submeshes.Count;
				Vector3[] vbi = vertexBuffer.Items;
				Vector2[] ubi = uvBuffer.Items;
				SolveTangents2DEnsureSize(ref tangents, ref tempTanBuffer, vertexCount, vbi.Length);
				for (int i = 0; i < submeshCount; i++)
				{
					int[] submesh = sbi[i].Items;
					int triangleCount = sbi[i].Count;
					SolveTangents2DTriangles(tempTanBuffer, submesh, triangleCount, vbi, ubi, vertexCount);
				}
				SolveTangents2DBuffer(tangents, tempTanBuffer, vertexCount);
				mesh.tangents = tangents;
			}
		}

		public void FillTriangles(Mesh mesh)
		{
			int submeshCount = submeshes.Count;
			ExposedList<int>[] submeshesItems = submeshes.Items;
			mesh.subMeshCount = submeshCount;
			for (int i = 0; i < submeshCount; i++)
			{
				mesh.SetTriangles(submeshesItems[i].Items, 0, submeshesItems[i].Count, i, false);
			}
		}

		public void EnsureVertexCapacity(int minimumVertexCount, bool inlcudeTintBlack = false, bool includeTangents = false, bool includeNormals = false)
		{
			if (minimumVertexCount <= vertexBuffer.Items.Length)
			{
				return;
			}
			Array.Resize(ref vertexBuffer.Items, minimumVertexCount);
			Array.Resize(ref uvBuffer.Items, minimumVertexCount);
			Array.Resize(ref colorBuffer.Items, minimumVertexCount);
			if (inlcudeTintBlack)
			{
				if (uv2 == null)
				{
					uv2 = new ExposedList<Vector2>(minimumVertexCount);
					uv3 = new ExposedList<Vector2>(minimumVertexCount);
				}
				uv2.Resize(minimumVertexCount);
				uv3.Resize(minimumVertexCount);
			}
			if (includeNormals)
			{
				if (normals == null)
				{
					normals = new Vector3[minimumVertexCount];
				}
				else
				{
					Array.Resize(ref normals, minimumVertexCount);
				}
			}
			if (includeTangents)
			{
				if (tangents == null)
				{
					tangents = new Vector4[minimumVertexCount];
				}
				else
				{
					Array.Resize(ref tangents, minimumVertexCount);
				}
			}
		}

		public void TrimExcess()
		{
			vertexBuffer.TrimExcess();
			uvBuffer.TrimExcess();
			colorBuffer.TrimExcess();
			if (uv2 != null)
			{
				uv2.TrimExcess();
			}
			if (uv3 != null)
			{
				uv3.TrimExcess();
			}
			int vbiLength = vertexBuffer.Items.Length;
			if (normals != null)
			{
				Array.Resize(ref normals, vbiLength);
			}
			if (tangents != null)
			{
				Array.Resize(ref tangents, vbiLength);
			}
		}

		internal static void SolveTangents2DEnsureSize(ref Vector4[] tangentBuffer, ref Vector2[] tempTanBuffer, int vertexCount, int vertexBufferLength)
		{
			if (tangentBuffer == null || tangentBuffer.Length != vertexBufferLength)
			{
				tangentBuffer = new Vector4[vertexBufferLength];
			}
			if (tempTanBuffer == null || tempTanBuffer.Length < vertexCount * 2)
			{
				tempTanBuffer = new Vector2[vertexCount * 2];
			}
		}

		internal static void SolveTangents2DTriangles(Vector2[] tempTanBuffer, int[] triangles, int triangleCount, Vector3[] vertices, Vector2[] uvs, int vertexCount)
		{
			Vector2 sdir = default(Vector2);
			Vector2 tdir = default(Vector2);
			for (int t = 0; t < triangleCount; t += 3)
			{
				int i1 = triangles[t];
				int i2 = triangles[t + 1];
				int i3 = triangles[t + 2];
				Vector3 v1 = vertices[i1];
				Vector3 v2 = vertices[i2];
				Vector3 v3 = vertices[i3];
				Vector2 w1 = uvs[i1];
				Vector2 w2 = uvs[i2];
				Vector2 w3 = uvs[i3];
				float x1 = v2.x - v1.x;
				float x2 = v3.x - v1.x;
				float y1 = v2.y - v1.y;
				float y2 = v3.y - v1.y;
				float s1 = w2.x - w1.x;
				float s2 = w3.x - w1.x;
				float t2 = w2.y - w1.y;
				float t3 = w3.y - w1.y;
				float div = s1 * t3 - s2 * t2;
				float r = ((div == 0f) ? 0f : (1f / div));
				sdir.x = (t3 * x1 - t2 * x2) * r;
				sdir.y = (t3 * y1 - t2 * y2) * r;
				tempTanBuffer[i1] = (tempTanBuffer[i2] = (tempTanBuffer[i3] = sdir));
				tdir.x = (s1 * x2 - s2 * x1) * r;
				tdir.y = (s1 * y2 - s2 * y1) * r;
				tempTanBuffer[vertexCount + i1] = (tempTanBuffer[vertexCount + i2] = (tempTanBuffer[vertexCount + i3] = tdir));
			}
		}

		internal static void SolveTangents2DBuffer(Vector4[] tangents, Vector2[] tempTanBuffer, int vertexCount)
		{
			Vector4 tangent = default(Vector4);
			tangent.z = 0f;
			for (int i = 0; i < vertexCount; i++)
			{
				Vector2 t = tempTanBuffer[i];
				float magnitude = Mathf.Sqrt(t.x * t.x + t.y * t.y);
				if ((double)magnitude > 1E-05)
				{
					float reciprocalMagnitude = 1f / magnitude;
					t.x *= reciprocalMagnitude;
					t.y *= reciprocalMagnitude;
				}
				Vector2 t2 = tempTanBuffer[vertexCount + i];
				tangent.x = t.x;
				tangent.y = t.y;
				tangent.w = ((t.y * t2.x > t.x * t2.y) ? 1 : (-1));
				tangents[i] = tangent;
			}
		}

		public static void FillMeshLocal(Mesh mesh, RegionAttachment regionAttachment)
		{
			if (!(mesh == null) && regionAttachment != null)
			{
				AttachmentVerts.Clear();
				float[] offsets = regionAttachment.Offset;
				AttachmentVerts.Add(new Vector3(offsets[0], offsets[1]));
				AttachmentVerts.Add(new Vector3(offsets[2], offsets[3]));
				AttachmentVerts.Add(new Vector3(offsets[4], offsets[5]));
				AttachmentVerts.Add(new Vector3(offsets[6], offsets[7]));
				AttachmentUVs.Clear();
				float[] uvs = regionAttachment.UVs;
				AttachmentUVs.Add(new Vector2(uvs[2], uvs[3]));
				AttachmentUVs.Add(new Vector2(uvs[4], uvs[5]));
				AttachmentUVs.Add(new Vector2(uvs[6], uvs[7]));
				AttachmentUVs.Add(new Vector2(uvs[0], uvs[1]));
				AttachmentColors32.Clear();
				Color32 c = new Color(regionAttachment.R, regionAttachment.G, regionAttachment.B, regionAttachment.A);
				for (int i = 0; i < 4; i++)
				{
					AttachmentColors32.Add(c);
				}
				AttachmentIndices.Clear();
				AttachmentIndices.AddRange(new int[6] { 0, 2, 1, 0, 3, 2 });
				mesh.Clear();
				mesh.name = regionAttachment.Name;
				mesh.SetVertices(AttachmentVerts);
				mesh.SetUVs(0, AttachmentUVs);
				mesh.SetColors(AttachmentColors32);
				mesh.SetTriangles(AttachmentIndices, 0);
				mesh.RecalculateBounds();
				AttachmentVerts.Clear();
				AttachmentUVs.Clear();
				AttachmentColors32.Clear();
				AttachmentIndices.Clear();
			}
		}

		public static void FillMeshLocal(Mesh mesh, MeshAttachment meshAttachment, SkeletonData skeletonData)
		{
			if (mesh == null || meshAttachment == null)
			{
				return;
			}
			int vertexCount = meshAttachment.WorldVerticesLength / 2;
			AttachmentVerts.Clear();
			if (meshAttachment.IsWeighted())
			{
				int count = meshAttachment.WorldVerticesLength;
				int[] meshAttachmentBones = meshAttachment.Bones;
				int v = 0;
				float[] vertices = meshAttachment.Vertices;
				int w = 0;
				int b = 0;
				for (; w < count; w += 2)
				{
					float wx = 0f;
					float wy = 0f;
					int k = meshAttachmentBones[v++];
					k += v;
					while (v < k)
					{
						BoneMatrix bm = BoneMatrix.CalculateSetupWorld(skeletonData.Bones.Items[meshAttachmentBones[v]]);
						float vx = vertices[b];
						float vy = vertices[b + 1];
						float weight = vertices[b + 2];
						wx += (vx * bm.a + vy * bm.b + bm.x) * weight;
						wy += (vx * bm.c + vy * bm.d + bm.y) * weight;
						v++;
						b += 3;
					}
					AttachmentVerts.Add(new Vector3(wx, wy));
				}
			}
			else
			{
				float[] localVerts = meshAttachment.Vertices;
				Vector3 pos = default(Vector3);
				for (int j = 0; j < vertexCount; j++)
				{
					int ii = j * 2;
					pos.x = localVerts[ii];
					pos.y = localVerts[ii + 1];
					AttachmentVerts.Add(pos);
				}
			}
			float[] uvs = meshAttachment.UVs;
			Vector2 uv = default(Vector2);
			Color32 c = new Color(meshAttachment.R, meshAttachment.G, meshAttachment.B, meshAttachment.A);
			AttachmentUVs.Clear();
			AttachmentColors32.Clear();
			for (int i = 0; i < vertexCount; i++)
			{
				int ii2 = i * 2;
				uv.x = uvs[ii2];
				uv.y = uvs[ii2 + 1];
				AttachmentUVs.Add(uv);
				AttachmentColors32.Add(c);
			}
			AttachmentIndices.Clear();
			AttachmentIndices.AddRange(meshAttachment.Triangles);
			mesh.Clear();
			mesh.name = meshAttachment.Name;
			mesh.SetVertices(AttachmentVerts);
			mesh.SetUVs(0, AttachmentUVs);
			mesh.SetColors(AttachmentColors32);
			mesh.SetTriangles(AttachmentIndices, 0);
			mesh.RecalculateBounds();
			AttachmentVerts.Clear();
			AttachmentUVs.Clear();
			AttachmentColors32.Clear();
			AttachmentIndices.Clear();
		}
	}
}
