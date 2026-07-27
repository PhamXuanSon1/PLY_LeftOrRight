using System;
using System.Collections.Generic;
using System.IO;

namespace Spine
{
	public class SkeletonJson : SkeletonLoader
	{
		private class LinkedMesh
		{
			internal string parent;

			internal string skin;

			internal int slotIndex;

			internal MeshAttachment mesh;

			internal bool inheritTimelines;

			public LinkedMesh(MeshAttachment mesh, string skin, int slotIndex, string parent, bool inheritTimelines)
			{
				this.mesh = mesh;
				this.skin = skin;
				this.slotIndex = slotIndex;
				this.parent = parent;
				this.inheritTimelines = inheritTimelines;
			}
		}

		private readonly List<LinkedMesh> linkedMeshes = new List<LinkedMesh>();

		public SkeletonJson(AttachmentLoader attachmentLoader)
			: base(attachmentLoader)
		{
		}

		public SkeletonJson(params Atlas[] atlasArray)
			: base(atlasArray)
		{
		}

		public override SkeletonData ReadSkeletonData(string path)
		{
			using (StreamReader reader = new StreamReader(new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read)))
			{
				SkeletonData skeletonData = ReadSkeletonData(reader);
				skeletonData.name = Path.GetFileNameWithoutExtension(path);
				return skeletonData;
			}
		}

		public SkeletonData ReadSkeletonData(TextReader reader)
		{
			if (reader == null)
			{
				throw new ArgumentNullException("reader", "reader cannot be null.");
			}
			float scale = base.scale;
			SkeletonData skeletonData = new SkeletonData();
			if (!(Json.Deserialize(reader) is Dictionary<string, object> root))
			{
				throw new Exception("Invalid JSON.");
			}
			if (root.ContainsKey("skeleton"))
			{
				Dictionary<string, object> skeletonMap = (Dictionary<string, object>)root["skeleton"];
				skeletonData.hash = (string)skeletonMap["hash"];
				skeletonData.version = (string)skeletonMap["spine"];
				skeletonData.x = GetFloat(skeletonMap, "x", 0f);
				skeletonData.y = GetFloat(skeletonMap, "y", 0f);
				skeletonData.width = GetFloat(skeletonMap, "width", 0f);
				skeletonData.height = GetFloat(skeletonMap, "height", 0f);
				skeletonData.referenceScale = GetFloat(skeletonMap, "referenceScale", 100f) * scale;
				skeletonData.fps = GetFloat(skeletonMap, "fps", 30f);
				skeletonData.imagesPath = GetString(skeletonMap, "images", null);
				skeletonData.audioPath = GetString(skeletonMap, "audio", null);
			}
			if (root.ContainsKey("bones"))
			{
				foreach (Dictionary<string, object> boneMap in (List<object>)root["bones"])
				{
					BoneData parent2 = null;
					if (boneMap.ContainsKey("parent"))
					{
						parent2 = skeletonData.FindBone((string)boneMap["parent"]);
						if (parent2 == null)
						{
							throw new Exception("Parent bone not found: " + boneMap["parent"]);
						}
					}
					BoneData data2 = new BoneData(skeletonData.Bones.Count, (string)boneMap["name"], parent2);
					data2.length = GetFloat(boneMap, "length", 0f) * scale;
					data2.x = GetFloat(boneMap, "x", 0f) * scale;
					data2.y = GetFloat(boneMap, "y", 0f) * scale;
					data2.rotation = GetFloat(boneMap, "rotation", 0f);
					data2.scaleX = GetFloat(boneMap, "scaleX", 1f);
					data2.scaleY = GetFloat(boneMap, "scaleY", 1f);
					data2.shearX = GetFloat(boneMap, "shearX", 0f);
					data2.shearY = GetFloat(boneMap, "shearY", 0f);
					string inheritString = GetString(boneMap, "inherit", Inherit.Normal.ToString());
					data2.inherit = (Inherit)Enum.Parse(typeof(Inherit), inheritString, true);
					data2.skinRequired = GetBoolean(boneMap, "skin", false);
					skeletonData.bones.Add(data2);
				}
			}
			if (root.ContainsKey("slots"))
			{
				foreach (Dictionary<string, object> slotMap in (List<object>)root["slots"])
				{
					string slotName = (string)slotMap["name"];
					string boneName = (string)slotMap["bone"];
					BoneData boneData = skeletonData.FindBone(boneName);
					if (boneData == null)
					{
						throw new Exception("Slot bone not found: " + boneName);
					}
					SlotData data3 = new SlotData(skeletonData.Slots.Count, slotName, boneData);
					if (slotMap.ContainsKey("color"))
					{
						string color = (string)slotMap["color"];
						data3.r = ToColor(color, 0);
						data3.g = ToColor(color, 1);
						data3.b = ToColor(color, 2);
						data3.a = ToColor(color, 3);
					}
					if (slotMap.ContainsKey("dark"))
					{
						string color2 = (string)slotMap["dark"];
						data3.r2 = ToColor(color2, 0, 6);
						data3.g2 = ToColor(color2, 1, 6);
						data3.b2 = ToColor(color2, 2, 6);
						data3.hasSecondColor = true;
					}
					data3.attachmentName = GetString(slotMap, "attachment", null);
					if (slotMap.ContainsKey("blend"))
					{
						data3.blendMode = (BlendMode)Enum.Parse(typeof(BlendMode), (string)slotMap["blend"], true);
					}
					else
					{
						data3.blendMode = BlendMode.Normal;
					}
					skeletonData.slots.Add(data3);
				}
			}
			if (root.ContainsKey("ik"))
			{
				foreach (Dictionary<string, object> constraintMap in (List<object>)root["ik"])
				{
					IkConstraintData data5 = new IkConstraintData((string)constraintMap["name"]);
					data5.order = GetInt(constraintMap, "order", 0);
					data5.skinRequired = GetBoolean(constraintMap, "skin", false);
					if (constraintMap.ContainsKey("bones"))
					{
						foreach (string boneName5 in (List<object>)constraintMap["bones"])
						{
							BoneData bone4 = skeletonData.FindBone(boneName5);
							if (bone4 == null)
							{
								throw new Exception("IK bone not found: " + boneName5);
							}
							data5.bones.Add(bone4);
						}
					}
					string targetName3 = (string)constraintMap["target"];
					data5.target = skeletonData.FindBone(targetName3);
					if (data5.target == null)
					{
						throw new Exception("IK target bone not found: " + targetName3);
					}
					data5.mix = GetFloat(constraintMap, "mix", 1f);
					data5.softness = GetFloat(constraintMap, "softness", 0f) * scale;
					data5.bendDirection = (GetBoolean(constraintMap, "bendPositive", true) ? 1 : (-1));
					data5.compress = GetBoolean(constraintMap, "compress", false);
					data5.stretch = GetBoolean(constraintMap, "stretch", false);
					data5.uniform = GetBoolean(constraintMap, "uniform", false);
					skeletonData.ikConstraints.Add(data5);
				}
			}
			if (root.ContainsKey("transform"))
			{
				foreach (Dictionary<string, object> constraintMap4 in (List<object>)root["transform"])
				{
					TransformConstraintData data7 = new TransformConstraintData((string)constraintMap4["name"]);
					data7.order = GetInt(constraintMap4, "order", 0);
					data7.skinRequired = GetBoolean(constraintMap4, "skin", false);
					if (constraintMap4.ContainsKey("bones"))
					{
						foreach (string boneName4 in (List<object>)constraintMap4["bones"])
						{
							BoneData bone3 = skeletonData.FindBone(boneName4);
							if (bone3 == null)
							{
								throw new Exception("Transform constraint bone not found: " + boneName4);
							}
							data7.bones.Add(bone3);
						}
					}
					string targetName2 = (string)constraintMap4["target"];
					data7.target = skeletonData.FindBone(targetName2);
					if (data7.target == null)
					{
						throw new Exception("Transform constraint target bone not found: " + targetName2);
					}
					data7.local = GetBoolean(constraintMap4, "local", false);
					data7.relative = GetBoolean(constraintMap4, "relative", false);
					data7.offsetRotation = GetFloat(constraintMap4, "rotation", 0f);
					data7.offsetX = GetFloat(constraintMap4, "x", 0f) * scale;
					data7.offsetY = GetFloat(constraintMap4, "y", 0f) * scale;
					data7.offsetScaleX = GetFloat(constraintMap4, "scaleX", 0f);
					data7.offsetScaleY = GetFloat(constraintMap4, "scaleY", 0f);
					data7.offsetShearY = GetFloat(constraintMap4, "shearY", 0f);
					data7.mixRotate = GetFloat(constraintMap4, "mixRotate", 1f);
					data7.mixX = GetFloat(constraintMap4, "mixX", 1f);
					data7.mixY = GetFloat(constraintMap4, "mixY", data7.mixX);
					data7.mixScaleX = GetFloat(constraintMap4, "mixScaleX", 1f);
					data7.mixScaleY = GetFloat(constraintMap4, "mixScaleY", data7.mixScaleX);
					data7.mixShearY = GetFloat(constraintMap4, "mixShearY", 1f);
					skeletonData.transformConstraints.Add(data7);
				}
			}
			if (root.ContainsKey("path"))
			{
				foreach (Dictionary<string, object> constraintMap3 in (List<object>)root["path"])
				{
					PathConstraintData data6 = new PathConstraintData((string)constraintMap3["name"]);
					data6.order = GetInt(constraintMap3, "order", 0);
					data6.skinRequired = GetBoolean(constraintMap3, "skin", false);
					if (constraintMap3.ContainsKey("bones"))
					{
						foreach (string boneName3 in (List<object>)constraintMap3["bones"])
						{
							BoneData bone2 = skeletonData.FindBone(boneName3);
							if (bone2 == null)
							{
								throw new Exception("Path bone not found: " + boneName3);
							}
							data6.bones.Add(bone2);
						}
					}
					string targetName = (string)constraintMap3["target"];
					data6.target = skeletonData.FindSlot(targetName);
					if (data6.target == null)
					{
						throw new Exception("Path target slot not found: " + targetName);
					}
					data6.positionMode = (PositionMode)Enum.Parse(typeof(PositionMode), GetString(constraintMap3, "positionMode", "percent"), true);
					data6.spacingMode = (SpacingMode)Enum.Parse(typeof(SpacingMode), GetString(constraintMap3, "spacingMode", "length"), true);
					data6.rotateMode = (RotateMode)Enum.Parse(typeof(RotateMode), GetString(constraintMap3, "rotateMode", "tangent"), true);
					data6.offsetRotation = GetFloat(constraintMap3, "rotation", 0f);
					data6.position = GetFloat(constraintMap3, "position", 0f);
					if (data6.positionMode == PositionMode.Fixed)
					{
						data6.position *= scale;
					}
					data6.spacing = GetFloat(constraintMap3, "spacing", 0f);
					if (data6.spacingMode == SpacingMode.Length || data6.spacingMode == SpacingMode.Fixed)
					{
						data6.spacing *= scale;
					}
					data6.mixRotate = GetFloat(constraintMap3, "mixRotate", 1f);
					data6.mixX = GetFloat(constraintMap3, "mixX", 1f);
					data6.mixY = GetFloat(constraintMap3, "mixY", data6.mixX);
					skeletonData.pathConstraints.Add(data6);
				}
			}
			if (root.ContainsKey("physics"))
			{
				foreach (Dictionary<string, object> constraintMap2 in (List<object>)root["physics"])
				{
					PhysicsConstraintData data4 = new PhysicsConstraintData((string)constraintMap2["name"]);
					data4.order = GetInt(constraintMap2, "order", 0);
					data4.skinRequired = GetBoolean(constraintMap2, "skin", false);
					string boneName2 = (string)constraintMap2["bone"];
					data4.bone = skeletonData.FindBone(boneName2);
					if (data4.bone == null)
					{
						throw new Exception("Physics bone not found: " + boneName2);
					}
					data4.x = GetFloat(constraintMap2, "x", 0f);
					data4.y = GetFloat(constraintMap2, "y", 0f);
					data4.rotate = GetFloat(constraintMap2, "rotate", 0f);
					data4.scaleX = GetFloat(constraintMap2, "scaleX", 0f);
					data4.shearX = GetFloat(constraintMap2, "shearX", 0f);
					data4.limit = GetFloat(constraintMap2, "limit", 5000f) * scale;
					data4.step = 1f / (float)GetInt(constraintMap2, "fps", 60);
					data4.inertia = GetFloat(constraintMap2, "inertia", 1f);
					data4.strength = GetFloat(constraintMap2, "strength", 100f);
					data4.damping = GetFloat(constraintMap2, "damping", 1f);
					data4.massInverse = 1f / GetFloat(constraintMap2, "mass", 1f);
					data4.wind = GetFloat(constraintMap2, "wind", 0f);
					data4.gravity = GetFloat(constraintMap2, "gravity", 0f);
					data4.mix = GetFloat(constraintMap2, "mix", 1f);
					data4.inertiaGlobal = GetBoolean(constraintMap2, "inertiaGlobal", false);
					data4.strengthGlobal = GetBoolean(constraintMap2, "strengthGlobal", false);
					data4.dampingGlobal = GetBoolean(constraintMap2, "dampingGlobal", false);
					data4.massGlobal = GetBoolean(constraintMap2, "massGlobal", false);
					data4.windGlobal = GetBoolean(constraintMap2, "windGlobal", false);
					data4.gravityGlobal = GetBoolean(constraintMap2, "gravityGlobal", false);
					data4.mixGlobal = GetBoolean(constraintMap2, "mixGlobal", false);
					skeletonData.physicsConstraints.Add(data4);
				}
			}
			if (root.ContainsKey("skins"))
			{
				foreach (Dictionary<string, object> skinMap in (List<object>)root["skins"])
				{
					Skin skin2 = new Skin((string)skinMap["name"]);
					if (skinMap.ContainsKey("bones"))
					{
						foreach (string entryName5 in (List<object>)skinMap["bones"])
						{
							BoneData bone = skeletonData.FindBone(entryName5);
							if (bone == null)
							{
								throw new Exception("Skin bone not found: " + entryName5);
							}
							skin2.bones.Add(bone);
						}
					}
					skin2.bones.TrimExcess();
					if (skinMap.ContainsKey("ik"))
					{
						foreach (string entryName4 in (List<object>)skinMap["ik"])
						{
							IkConstraintData constraint4 = skeletonData.FindIkConstraint(entryName4);
							if (constraint4 == null)
							{
								throw new Exception("Skin IK constraint not found: " + entryName4);
							}
							skin2.constraints.Add(constraint4);
						}
					}
					if (skinMap.ContainsKey("transform"))
					{
						foreach (string entryName3 in (List<object>)skinMap["transform"])
						{
							TransformConstraintData constraint3 = skeletonData.FindTransformConstraint(entryName3);
							if (constraint3 == null)
							{
								throw new Exception("Skin transform constraint not found: " + entryName3);
							}
							skin2.constraints.Add(constraint3);
						}
					}
					if (skinMap.ContainsKey("path"))
					{
						foreach (string entryName2 in (List<object>)skinMap["path"])
						{
							PathConstraintData constraint2 = skeletonData.FindPathConstraint(entryName2);
							if (constraint2 == null)
							{
								throw new Exception("Skin path constraint not found: " + entryName2);
							}
							skin2.constraints.Add(constraint2);
						}
					}
					if (skinMap.ContainsKey("physics"))
					{
						foreach (string entryName in (List<object>)skinMap["physics"])
						{
							PhysicsConstraintData constraint = skeletonData.FindPhysicsConstraint(entryName);
							if (constraint == null)
							{
								throw new Exception("Skin physics constraint not found: " + entryName);
							}
							skin2.constraints.Add(constraint);
						}
					}
					skin2.constraints.TrimExcess();
					if (skinMap.ContainsKey("attachments"))
					{
						foreach (KeyValuePair<string, object> slotEntry in (Dictionary<string, object>)skinMap["attachments"])
						{
							int slotIndex = FindSlotIndex(skeletonData, slotEntry.Key);
							foreach (KeyValuePair<string, object> entry3 in (Dictionary<string, object>)slotEntry.Value)
							{
								try
								{
									Attachment attachment = ReadAttachment((Dictionary<string, object>)entry3.Value, skin2, slotIndex, entry3.Key, skeletonData);
									if (attachment != null)
									{
										skin2.SetAttachment(slotIndex, entry3.Key, attachment);
									}
								}
								catch (Exception e2)
								{
									throw new Exception("Error reading attachment: " + entry3.Key + ", skin: " + skin2, e2);
								}
							}
						}
					}
					skeletonData.skins.Add(skin2);
					if (skin2.name == "default")
					{
						skeletonData.defaultSkin = skin2;
					}
				}
			}
			int i = 0;
			for (int j = linkedMeshes.Count; i < j; i++)
			{
				LinkedMesh linkedMesh = linkedMeshes[i];
				Skin skin = ((linkedMesh.skin == null) ? skeletonData.defaultSkin : skeletonData.FindSkin(linkedMesh.skin));
				if (skin == null)
				{
					throw new Exception("Slot not found: " + linkedMesh.skin);
				}
				Attachment parent = skin.GetAttachment(linkedMesh.slotIndex, linkedMesh.parent);
				if (parent == null)
				{
					throw new Exception("Parent mesh not found: " + linkedMesh.parent);
				}
				linkedMesh.mesh.TimelineAttachment = (linkedMesh.inheritTimelines ? ((VertexAttachment)parent) : linkedMesh.mesh);
				linkedMesh.mesh.ParentMesh = (MeshAttachment)parent;
				if (linkedMesh.mesh.Region != null)
				{
					linkedMesh.mesh.UpdateRegion();
				}
			}
			linkedMeshes.Clear();
			if (root.ContainsKey("events"))
			{
				foreach (KeyValuePair<string, object> entry2 in (Dictionary<string, object>)root["events"])
				{
					Dictionary<string, object> entryMap = (Dictionary<string, object>)entry2.Value;
					EventData data = new EventData(entry2.Key);
					data.Int = GetInt(entryMap, "int", 0);
					data.Float = GetFloat(entryMap, "float", 0f);
					data.String = GetString(entryMap, "string", string.Empty);
					data.AudioPath = GetString(entryMap, "audio", null);
					if (data.AudioPath != null)
					{
						data.Volume = GetFloat(entryMap, "volume", 1f);
						data.Balance = GetFloat(entryMap, "balance", 0f);
					}
					skeletonData.events.Add(data);
				}
			}
			if (root.ContainsKey("animations"))
			{
				foreach (KeyValuePair<string, object> entry in (Dictionary<string, object>)root["animations"])
				{
					try
					{
						ReadAnimation((Dictionary<string, object>)entry.Value, entry.Key, skeletonData);
					}
					catch (Exception e)
					{
						throw new Exception("Error reading animation: " + entry.Key + "\n" + e.Message, e);
					}
				}
			}
			skeletonData.bones.TrimExcess();
			skeletonData.slots.TrimExcess();
			skeletonData.skins.TrimExcess();
			skeletonData.events.TrimExcess();
			skeletonData.animations.TrimExcess();
			skeletonData.ikConstraints.TrimExcess();
			return skeletonData;
		}

		private Attachment ReadAttachment(Dictionary<string, object> map, Skin skin, int slotIndex, string name, SkeletonData skeletonData)
		{
			float scale = base.scale;
			name = GetString(map, "name", name);
			string typeName = GetString(map, "type", "region");
			switch ((AttachmentType)Enum.Parse(typeof(AttachmentType), typeName, true))
			{
			case AttachmentType.Region:
			{
				string path = GetString(map, "path", name);
				map.TryGetValue("sequence", out var sequenceJson);
				Sequence sequence = ReadSequence(sequenceJson);
				RegionAttachment region = attachmentLoader.NewRegionAttachment(skin, name, path, sequence);
				if (region == null)
				{
					return null;
				}
				region.Path = path;
				region.x = GetFloat(map, "x", 0f) * scale;
				region.y = GetFloat(map, "y", 0f) * scale;
				region.scaleX = GetFloat(map, "scaleX", 1f);
				region.scaleY = GetFloat(map, "scaleY", 1f);
				region.rotation = GetFloat(map, "rotation", 0f);
				region.width = GetFloat(map, "width", 32f) * scale;
				region.height = GetFloat(map, "height", 32f) * scale;
				region.sequence = sequence;
				if (map.ContainsKey("color"))
				{
					string color = (string)map["color"];
					region.r = ToColor(color, 0);
					region.g = ToColor(color, 1);
					region.b = ToColor(color, 2);
					region.a = ToColor(color, 3);
				}
				if (region.Region != null)
				{
					region.UpdateRegion();
				}
				return region;
			}
			case AttachmentType.Boundingbox:
			{
				BoundingBoxAttachment box = attachmentLoader.NewBoundingBoxAttachment(skin, name);
				if (box == null)
				{
					return null;
				}
				ReadVertices(map, box, GetInt(map, "vertexCount", 0) << 1);
				return box;
			}
			case AttachmentType.Mesh:
			case AttachmentType.Linkedmesh:
			{
				string path2 = GetString(map, "path", name);
				map.TryGetValue("sequence", out var sequenceJson2);
				Sequence sequence2 = ReadSequence(sequenceJson2);
				MeshAttachment mesh = attachmentLoader.NewMeshAttachment(skin, name, path2, sequence2);
				if (mesh == null)
				{
					return null;
				}
				mesh.Path = path2;
				if (map.ContainsKey("color"))
				{
					string color2 = (string)map["color"];
					mesh.r = ToColor(color2, 0);
					mesh.g = ToColor(color2, 1);
					mesh.b = ToColor(color2, 2);
					mesh.a = ToColor(color2, 3);
				}
				mesh.Width = GetFloat(map, "width", 0f) * scale;
				mesh.Height = GetFloat(map, "height", 0f) * scale;
				mesh.Sequence = sequence2;
				string parent = GetString(map, "parent", null);
				if (parent != null)
				{
					linkedMeshes.Add(new LinkedMesh(mesh, GetString(map, "skin", null), slotIndex, parent, GetBoolean(map, "timelines", true)));
					return mesh;
				}
				float[] uvs = GetFloatArray(map, "uvs", 1f);
				ReadVertices(map, mesh, uvs.Length);
				mesh.triangles = GetIntArray(map, "triangles");
				mesh.regionUVs = uvs;
				if (mesh.Region != null)
				{
					mesh.UpdateRegion();
				}
				if (map.ContainsKey("hull"))
				{
					mesh.HullLength = GetInt(map, "hull", 0) << 1;
				}
				if (map.ContainsKey("edges"))
				{
					mesh.Edges = GetIntArray(map, "edges");
				}
				return mesh;
			}
			case AttachmentType.Path:
			{
				PathAttachment pathAttachment = attachmentLoader.NewPathAttachment(skin, name);
				if (pathAttachment == null)
				{
					return null;
				}
				pathAttachment.closed = GetBoolean(map, "closed", false);
				pathAttachment.constantSpeed = GetBoolean(map, "constantSpeed", true);
				int vertexCount = GetInt(map, "vertexCount", 0);
				ReadVertices(map, pathAttachment, vertexCount << 1);
				pathAttachment.lengths = GetFloatArray(map, "lengths", scale);
				return pathAttachment;
			}
			case AttachmentType.Point:
			{
				PointAttachment point = attachmentLoader.NewPointAttachment(skin, name);
				if (point == null)
				{
					return null;
				}
				point.x = GetFloat(map, "x", 0f) * scale;
				point.y = GetFloat(map, "y", 0f) * scale;
				point.rotation = GetFloat(map, "rotation", 0f);
				return point;
			}
			case AttachmentType.Clipping:
			{
				ClippingAttachment clip = attachmentLoader.NewClippingAttachment(skin, name);
				if (clip == null)
				{
					return null;
				}
				string end = GetString(map, "end", null);
				if (end != null)
				{
					SlotData slot = skeletonData.FindSlot(end);
					if (slot == null)
					{
						throw new Exception("Clipping end slot not found: " + end);
					}
					clip.EndSlot = slot;
				}
				ReadVertices(map, clip, GetInt(map, "vertexCount", 0) << 1);
				return clip;
			}
			default:
				return null;
			}
		}

		public static Sequence ReadSequence(object sequenceJson)
		{
			if (!(sequenceJson is Dictionary<string, object> map))
			{
				return null;
			}
			Sequence sequence = new Sequence(GetInt(map, "count"));
			sequence.start = GetInt(map, "start", 1);
			sequence.digits = GetInt(map, "digits", 0);
			sequence.setupIndex = GetInt(map, "setup", 0);
			return sequence;
		}

		private void ReadVertices(Dictionary<string, object> map, VertexAttachment attachment, int verticesLength)
		{
			attachment.WorldVerticesLength = verticesLength;
			float[] vertices = GetFloatArray(map, "vertices", 1f);
			float scale = base.Scale;
			if (verticesLength == vertices.Length)
			{
				if (scale != 1f)
				{
					for (int j = 0; j < vertices.Length; j++)
					{
						vertices[j] *= scale;
					}
				}
				attachment.vertices = vertices;
				return;
			}
			ExposedList<float> weights = new ExposedList<float>(verticesLength * 3 * 3);
			ExposedList<int> bones = new ExposedList<int>(verticesLength * 3);
			int i = 0;
			int k = vertices.Length;
			while (i < k)
			{
				int boneCount = (int)vertices[i++];
				bones.Add(boneCount);
				for (int nn = i + (boneCount << 2); i < nn; i += 4)
				{
					bones.Add((int)vertices[i]);
					weights.Add(vertices[i + 1] * base.Scale);
					weights.Add(vertices[i + 2] * base.Scale);
					weights.Add(vertices[i + 3]);
				}
			}
			attachment.bones = bones.ToArray();
			attachment.vertices = weights.ToArray();
		}

		private int FindSlotIndex(SkeletonData skeletonData, string slotName)
		{
			SlotData[] slots = skeletonData.slots.Items;
			int i = 0;
			for (int j = skeletonData.slots.Count; i < j; i++)
			{
				if (slots[i].name == slotName)
				{
					return i;
				}
			}
			throw new Exception("Slot not found: " + slotName);
		}

		private void ReadAnimation(Dictionary<string, object> map, string name, SkeletonData skeletonData)
		{
			float scale = base.scale;
			ExposedList<Timeline> timelines = new ExposedList<Timeline>();
			if (map.ContainsKey("slots"))
			{
				foreach (KeyValuePair<string, object> entry in (Dictionary<string, object>)map["slots"])
				{
					string slotName = entry.Key;
					int slotIndex2 = FindSlotIndex(skeletonData, slotName);
					Dictionary<string, object> timelineMap3 = (Dictionary<string, object>)entry.Value;
					foreach (KeyValuePair<string, object> timelineEntry2 in timelineMap3)
					{
						List<object> values5 = (List<object>)timelineEntry2.Value;
						int frames4 = values5.Count;
						if (frames4 == 0)
						{
							continue;
						}
						string timelineName2 = timelineEntry2.Key;
						switch (timelineName2)
						{
						case "attachment":
						{
							AttachmentTimeline timeline16 = new AttachmentTimeline(frames4, slotIndex2);
							int frame11 = 0;
							foreach (Dictionary<string, object> keyMap10 in values5)
							{
								timeline16.SetFrame(frame11++, GetFloat(keyMap10, "time", 0f), GetString(keyMap10, "name", null));
							}
							timelines.Add(timeline16);
							break;
						}
						case "rgba":
						{
							RGBATimeline timeline18 = new RGBATimeline(frames4, frames4 << 2, slotIndex2);
							List<object>.Enumerator keyMapEnumerator8 = values5.GetEnumerator();
							keyMapEnumerator8.MoveNext();
							Dictionary<string, object> keyMap11 = (Dictionary<string, object>)keyMapEnumerator8.Current;
							float time7 = GetFloat(keyMap11, "time", 0f);
							string color2 = (string)keyMap11["color"];
							float r2 = ToColor(color2, 0);
							float g2 = ToColor(color2, 1);
							float b2 = ToColor(color2, 2);
							float a = ToColor(color2, 3);
							int frame12 = 0;
							int bezier6 = 0;
							while (true)
							{
								timeline18.SetFrame(frame12, time7, r2, g2, b2, a);
								if (!keyMapEnumerator8.MoveNext())
								{
									break;
								}
								Dictionary<string, object> nextMap6 = (Dictionary<string, object>)keyMapEnumerator8.Current;
								float time15 = GetFloat(nextMap6, "time", 0f);
								color2 = (string)nextMap6["color"];
								float nr2 = ToColor(color2, 0);
								float ng2 = ToColor(color2, 1);
								float nb2 = ToColor(color2, 2);
								float na = ToColor(color2, 3);
								if (keyMap11.ContainsKey("curve"))
								{
									object curve5 = keyMap11["curve"];
									bezier6 = ReadCurve(curve5, timeline18, bezier6, frame12, 0, time7, time15, r2, nr2, 1f);
									bezier6 = ReadCurve(curve5, timeline18, bezier6, frame12, 1, time7, time15, g2, ng2, 1f);
									bezier6 = ReadCurve(curve5, timeline18, bezier6, frame12, 2, time7, time15, b2, nb2, 1f);
									bezier6 = ReadCurve(curve5, timeline18, bezier6, frame12, 3, time7, time15, a, na, 1f);
								}
								time7 = time15;
								r2 = nr2;
								g2 = ng2;
								b2 = nb2;
								a = na;
								keyMap11 = nextMap6;
								frame12++;
							}
							timeline18.Shrink(bezier6);
							timelines.Add(timeline18);
							break;
						}
						case "rgb":
						{
							RGBTimeline timeline19 = new RGBTimeline(frames4, frames4 * 3, slotIndex2);
							List<object>.Enumerator keyMapEnumerator9 = values5.GetEnumerator();
							keyMapEnumerator9.MoveNext();
							Dictionary<string, object> keyMap12 = (Dictionary<string, object>)keyMapEnumerator9.Current;
							float time8 = GetFloat(keyMap12, "time", 0f);
							string color3 = (string)keyMap12["color"];
							float r3 = ToColor(color3, 0, 6);
							float g3 = ToColor(color3, 1, 6);
							float b3 = ToColor(color3, 2, 6);
							int frame13 = 0;
							int bezier7 = 0;
							while (true)
							{
								timeline19.SetFrame(frame13, time8, r3, g3, b3);
								if (!keyMapEnumerator9.MoveNext())
								{
									break;
								}
								Dictionary<string, object> nextMap7 = (Dictionary<string, object>)keyMapEnumerator9.Current;
								float time16 = GetFloat(nextMap7, "time", 0f);
								color3 = (string)nextMap7["color"];
								float nr3 = ToColor(color3, 0, 6);
								float ng3 = ToColor(color3, 1, 6);
								float nb3 = ToColor(color3, 2, 6);
								if (keyMap12.ContainsKey("curve"))
								{
									object curve7 = keyMap12["curve"];
									bezier7 = ReadCurve(curve7, timeline19, bezier7, frame13, 0, time8, time16, r3, nr3, 1f);
									bezier7 = ReadCurve(curve7, timeline19, bezier7, frame13, 1, time8, time16, g3, ng3, 1f);
									bezier7 = ReadCurve(curve7, timeline19, bezier7, frame13, 2, time8, time16, b3, nb3, 1f);
								}
								time8 = time16;
								r3 = nr3;
								g3 = ng3;
								b3 = nb3;
								keyMap12 = nextMap7;
								frame13++;
							}
							timeline19.Shrink(bezier7);
							timelines.Add(timeline19);
							break;
						}
						case "alpha":
						{
							List<object>.Enumerator keyMapEnumerator10 = values5.GetEnumerator();
							keyMapEnumerator10.MoveNext();
							timelines.Add(ReadTimeline(ref keyMapEnumerator10, new AlphaTimeline(frames4, frames4, slotIndex2), 0f, 1f));
							break;
						}
						case "rgba2":
						{
							RGBA2Timeline timeline17 = new RGBA2Timeline(frames4, frames4 * 7, slotIndex2);
							List<object>.Enumerator keyMapEnumerator11 = values5.GetEnumerator();
							keyMapEnumerator11.MoveNext();
							Dictionary<string, object> keyMap13 = (Dictionary<string, object>)keyMapEnumerator11.Current;
							float time9 = GetFloat(keyMap13, "time", 0f);
							string color4 = (string)keyMap13["light"];
							float r4 = ToColor(color4, 0);
							float g4 = ToColor(color4, 1);
							float b4 = ToColor(color4, 2);
							float a2 = ToColor(color4, 3);
							color4 = (string)keyMap13["dark"];
							float r6 = ToColor(color4, 0, 6);
							float g6 = ToColor(color4, 1, 6);
							float b6 = ToColor(color4, 2, 6);
							int frame14 = 0;
							int bezier8 = 0;
							while (true)
							{
								timeline17.SetFrame(frame14, time9, r4, g4, b4, a2, r6, g6, b6);
								if (!keyMapEnumerator11.MoveNext())
								{
									break;
								}
								Dictionary<string, object> nextMap8 = (Dictionary<string, object>)keyMapEnumerator11.Current;
								float time17 = GetFloat(nextMap8, "time", 0f);
								color4 = (string)nextMap8["light"];
								float nr4 = ToColor(color4, 0);
								float ng4 = ToColor(color4, 1);
								float nb4 = ToColor(color4, 2);
								float na2 = ToColor(color4, 3);
								color4 = (string)nextMap8["dark"];
								float nr6 = ToColor(color4, 0, 6);
								float ng6 = ToColor(color4, 1, 6);
								float nb6 = ToColor(color4, 2, 6);
								if (keyMap13.ContainsKey("curve"))
								{
									object curve8 = keyMap13["curve"];
									bezier8 = ReadCurve(curve8, timeline17, bezier8, frame14, 0, time9, time17, r4, nr4, 1f);
									bezier8 = ReadCurve(curve8, timeline17, bezier8, frame14, 1, time9, time17, g4, ng4, 1f);
									bezier8 = ReadCurve(curve8, timeline17, bezier8, frame14, 2, time9, time17, b4, nb4, 1f);
									bezier8 = ReadCurve(curve8, timeline17, bezier8, frame14, 3, time9, time17, a2, na2, 1f);
									bezier8 = ReadCurve(curve8, timeline17, bezier8, frame14, 4, time9, time17, r6, nr6, 1f);
									bezier8 = ReadCurve(curve8, timeline17, bezier8, frame14, 5, time9, time17, g6, ng6, 1f);
									bezier8 = ReadCurve(curve8, timeline17, bezier8, frame14, 6, time9, time17, b6, nb6, 1f);
								}
								time9 = time17;
								r4 = nr4;
								g4 = ng4;
								b4 = nb4;
								a2 = na2;
								r6 = nr6;
								g6 = ng6;
								b6 = nb6;
								keyMap13 = nextMap8;
								frame14++;
							}
							timeline17.Shrink(bezier8);
							timelines.Add(timeline17);
							break;
						}
						case "rgb2":
						{
							RGB2Timeline timeline9 = new RGB2Timeline(frames4, frames4 * 6, slotIndex2);
							List<object>.Enumerator keyMapEnumerator4 = values5.GetEnumerator();
							keyMapEnumerator4.MoveNext();
							Dictionary<string, object> keyMap6 = (Dictionary<string, object>)keyMapEnumerator4.Current;
							float time3 = GetFloat(keyMap6, "time", 0f);
							string color = (string)keyMap6["light"];
							float r = ToColor(color, 0, 6);
							float g = ToColor(color, 1, 6);
							float b = ToColor(color, 2, 6);
							color = (string)keyMap6["dark"];
							float r5 = ToColor(color, 0, 6);
							float g5 = ToColor(color, 1, 6);
							float b5 = ToColor(color, 2, 6);
							int frame10 = 0;
							int bezier5 = 0;
							while (true)
							{
								timeline9.SetFrame(frame10, time3, r, g, b, r5, g5, b5);
								if (!keyMapEnumerator4.MoveNext())
								{
									break;
								}
								Dictionary<string, object> nextMap5 = (Dictionary<string, object>)keyMapEnumerator4.Current;
								float time14 = GetFloat(nextMap5, "time", 0f);
								color = (string)nextMap5["light"];
								float nr = ToColor(color, 0, 6);
								float ng = ToColor(color, 1, 6);
								float nb = ToColor(color, 2, 6);
								color = (string)nextMap5["dark"];
								float nr5 = ToColor(color, 0, 6);
								float ng5 = ToColor(color, 1, 6);
								float nb5 = ToColor(color, 2, 6);
								if (keyMap6.ContainsKey("curve"))
								{
									object curve6 = keyMap6["curve"];
									bezier5 = ReadCurve(curve6, timeline9, bezier5, frame10, 0, time3, time14, r, nr, 1f);
									bezier5 = ReadCurve(curve6, timeline9, bezier5, frame10, 1, time3, time14, g, ng, 1f);
									bezier5 = ReadCurve(curve6, timeline9, bezier5, frame10, 2, time3, time14, b, nb, 1f);
									bezier5 = ReadCurve(curve6, timeline9, bezier5, frame10, 3, time3, time14, r5, nr5, 1f);
									bezier5 = ReadCurve(curve6, timeline9, bezier5, frame10, 4, time3, time14, g5, ng5, 1f);
									bezier5 = ReadCurve(curve6, timeline9, bezier5, frame10, 5, time3, time14, b5, nb5, 1f);
								}
								time3 = time14;
								r = nr;
								g = ng;
								b = nb;
								r5 = nr5;
								g5 = ng5;
								b5 = nb5;
								keyMap6 = nextMap5;
								frame10++;
							}
							timeline9.Shrink(bezier5);
							timelines.Add(timeline9);
							break;
						}
						default:
							throw new Exception("Invalid timeline type for a slot: " + timelineName2 + " (" + slotName + ")");
						}
					}
				}
			}
			if (map.ContainsKey("bones"))
			{
				foreach (KeyValuePair<string, object> entry2 in (Dictionary<string, object>)map["bones"])
				{
					string boneName = entry2.Key;
					int boneIndex = -1;
					BoneData[] bones = skeletonData.bones.Items;
					int n = 0;
					for (int n4 = skeletonData.bones.Count; n < n4; n++)
					{
						if (bones[n].name == boneName)
						{
							boneIndex = n;
							break;
						}
					}
					if (boneIndex == -1)
					{
						throw new Exception("Bone not found: " + boneName);
					}
					Dictionary<string, object> timelineMap7 = (Dictionary<string, object>)entry2.Value;
					foreach (KeyValuePair<string, object> timelineEntry4 in timelineMap7)
					{
						List<object> values8 = (List<object>)timelineEntry4.Value;
						List<object>.Enumerator keyMapEnumerator7 = values8.GetEnumerator();
						if (!keyMapEnumerator7.MoveNext())
						{
							continue;
						}
						int frames5 = values8.Count;
						string timelineName3 = timelineEntry4.Key;
						switch (timelineName3)
						{
						case "rotate":
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, new RotateTimeline(frames5, frames5, boneIndex), 0f, 1f));
							break;
						case "translate":
						{
							TranslateTimeline timeline12 = new TranslateTimeline(frames5, frames5 << 1, boneIndex);
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, timeline12, "x", "y", 0f, scale));
							break;
						}
						case "translatex":
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, new TranslateXTimeline(frames5, frames5, boneIndex), 0f, scale));
							break;
						case "translatey":
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, new TranslateYTimeline(frames5, frames5, boneIndex), 0f, scale));
							break;
						case "scale":
						{
							ScaleTimeline timeline13 = new ScaleTimeline(frames5, frames5 << 1, boneIndex);
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, timeline13, "x", "y", 1f, 1f));
							break;
						}
						case "scalex":
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, new ScaleXTimeline(frames5, frames5, boneIndex), 1f, 1f));
							break;
						case "scaley":
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, new ScaleYTimeline(frames5, frames5, boneIndex), 1f, 1f));
							break;
						case "shear":
						{
							ShearTimeline timeline14 = new ShearTimeline(frames5, frames5 << 1, boneIndex);
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, timeline14, "x", "y", 0f, 1f));
							break;
						}
						case "shearx":
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, new ShearXTimeline(frames5, frames5, boneIndex), 0f, 1f));
							break;
						case "sheary":
							timelines.Add(ReadTimeline(ref keyMapEnumerator7, new ShearYTimeline(frames5, frames5, boneIndex), 0f, 1f));
							break;
						case "inherit":
						{
							InheritTimeline timeline15 = new InheritTimeline(frames5, boneIndex);
							int frame9 = 0;
							while (true)
							{
								Dictionary<string, object> keyMap9 = (Dictionary<string, object>)keyMapEnumerator7.Current;
								float time6 = GetFloat(keyMap9, "time", 0f);
								Inherit inherit = (Inherit)Enum.Parse(typeof(Inherit), GetString(keyMap9, "inherit", Inherit.Normal.ToString()), true);
								timeline15.SetFrame(frame9, time6, inherit);
								if (!keyMapEnumerator7.MoveNext())
								{
									break;
								}
								frame9++;
							}
							timelines.Add(timeline15);
							break;
						}
						default:
							throw new Exception("Invalid timeline type for a bone: " + timelineName3 + " (" + boneName + ")");
						}
					}
				}
			}
			if (map.ContainsKey("ik"))
			{
				foreach (KeyValuePair<string, object> timelineMap6 in (Dictionary<string, object>)map["ik"])
				{
					List<object> values7 = (List<object>)timelineMap6.Value;
					List<object>.Enumerator keyMapEnumerator6 = values7.GetEnumerator();
					if (!keyMapEnumerator6.MoveNext())
					{
						continue;
					}
					Dictionary<string, object> keyMap8 = (Dictionary<string, object>)keyMapEnumerator6.Current;
					IkConstraintData constraint4 = skeletonData.FindIkConstraint(timelineMap6.Key);
					IkConstraintTimeline timeline11 = new IkConstraintTimeline(values7.Count, values7.Count << 1, skeletonData.IkConstraints.IndexOf(constraint4));
					float time5 = GetFloat(keyMap8, "time", 0f);
					float mix = GetFloat(keyMap8, "mix", 1f);
					float softness = GetFloat(keyMap8, "softness", 0f) * scale;
					int frame8 = 0;
					int bezier4 = 0;
					while (true)
					{
						timeline11.SetFrame(frame8, time5, mix, softness, GetBoolean(keyMap8, "bendPositive", true) ? 1 : (-1), GetBoolean(keyMap8, "compress", false), GetBoolean(keyMap8, "stretch", false));
						if (!keyMapEnumerator6.MoveNext())
						{
							break;
						}
						Dictionary<string, object> nextMap4 = (Dictionary<string, object>)keyMapEnumerator6.Current;
						float time13 = GetFloat(nextMap4, "time", 0f);
						float mix2 = GetFloat(nextMap4, "mix", 1f);
						float softness2 = GetFloat(nextMap4, "softness", 0f) * scale;
						if (keyMap8.ContainsKey("curve"))
						{
							object curve4 = keyMap8["curve"];
							bezier4 = ReadCurve(curve4, timeline11, bezier4, frame8, 0, time5, time13, mix, mix2, 1f);
							bezier4 = ReadCurve(curve4, timeline11, bezier4, frame8, 1, time5, time13, softness, softness2, scale);
						}
						time5 = time13;
						mix = mix2;
						softness = softness2;
						keyMap8 = nextMap4;
						frame8++;
					}
					timeline11.Shrink(bezier4);
					timelines.Add(timeline11);
				}
			}
			if (map.ContainsKey("transform"))
			{
				foreach (KeyValuePair<string, object> timelineMap5 in (Dictionary<string, object>)map["transform"])
				{
					List<object> values6 = (List<object>)timelineMap5.Value;
					List<object>.Enumerator keyMapEnumerator5 = values6.GetEnumerator();
					if (!keyMapEnumerator5.MoveNext())
					{
						continue;
					}
					Dictionary<string, object> keyMap7 = (Dictionary<string, object>)keyMapEnumerator5.Current;
					TransformConstraintData constraint3 = skeletonData.FindTransformConstraint(timelineMap5.Key);
					TransformConstraintTimeline timeline10 = new TransformConstraintTimeline(values6.Count, values6.Count * 6, skeletonData.TransformConstraints.IndexOf(constraint3));
					float time4 = GetFloat(keyMap7, "time", 0f);
					float mixRotate2 = GetFloat(keyMap7, "mixRotate", 1f);
					float mixShearY = GetFloat(keyMap7, "mixShearY", 1f);
					float mixX2 = GetFloat(keyMap7, "mixX", 1f);
					float mixY2 = GetFloat(keyMap7, "mixY", mixX2);
					float mixScaleX = GetFloat(keyMap7, "mixScaleX", 1f);
					float mixScaleY = GetFloat(keyMap7, "mixScaleY", mixScaleX);
					int frame7 = 0;
					int bezier3 = 0;
					while (true)
					{
						timeline10.SetFrame(frame7, time4, mixRotate2, mixX2, mixY2, mixScaleX, mixScaleY, mixShearY);
						if (!keyMapEnumerator5.MoveNext())
						{
							break;
						}
						Dictionary<string, object> nextMap3 = (Dictionary<string, object>)keyMapEnumerator5.Current;
						float time12 = GetFloat(nextMap3, "time", 0f);
						float mixRotate4 = GetFloat(nextMap3, "mixRotate", 1f);
						float mixShearY2 = GetFloat(nextMap3, "mixShearY", 1f);
						float mixX4 = GetFloat(nextMap3, "mixX", 1f);
						float mixY4 = GetFloat(nextMap3, "mixY", mixX4);
						float mixScaleX2 = GetFloat(nextMap3, "mixScaleX", 1f);
						float mixScaleY2 = GetFloat(nextMap3, "mixScaleY", mixScaleX2);
						if (keyMap7.ContainsKey("curve"))
						{
							object curve3 = keyMap7["curve"];
							bezier3 = ReadCurve(curve3, timeline10, bezier3, frame7, 0, time4, time12, mixRotate2, mixRotate4, 1f);
							bezier3 = ReadCurve(curve3, timeline10, bezier3, frame7, 1, time4, time12, mixX2, mixX4, 1f);
							bezier3 = ReadCurve(curve3, timeline10, bezier3, frame7, 2, time4, time12, mixY2, mixY4, 1f);
							bezier3 = ReadCurve(curve3, timeline10, bezier3, frame7, 3, time4, time12, mixScaleX, mixScaleX2, 1f);
							bezier3 = ReadCurve(curve3, timeline10, bezier3, frame7, 4, time4, time12, mixScaleY, mixScaleY2, 1f);
							bezier3 = ReadCurve(curve3, timeline10, bezier3, frame7, 5, time4, time12, mixShearY, mixShearY2, 1f);
						}
						time4 = time12;
						mixRotate2 = mixRotate4;
						mixX2 = mixX4;
						mixY2 = mixY4;
						mixScaleX = mixScaleX2;
						mixScaleY = mixScaleY2;
						mixShearY = mixShearY2;
						keyMap7 = nextMap3;
						frame7++;
					}
					timeline10.Shrink(bezier3);
					timelines.Add(timeline10);
				}
			}
			if (map.ContainsKey("path"))
			{
				foreach (KeyValuePair<string, object> constraintMap2 in (Dictionary<string, object>)map["path"])
				{
					PathConstraintData constraint2 = skeletonData.FindPathConstraint(constraintMap2.Key);
					if (constraint2 == null)
					{
						throw new Exception("Path constraint not found: " + constraintMap2.Key);
					}
					int constraintIndex = skeletonData.pathConstraints.IndexOf(constraint2);
					Dictionary<string, object> timelineMap4 = (Dictionary<string, object>)constraintMap2.Value;
					foreach (KeyValuePair<string, object> timelineEntry3 in timelineMap4)
					{
						List<object> values4 = (List<object>)timelineEntry3.Value;
						List<object>.Enumerator keyMapEnumerator3 = values4.GetEnumerator();
						if (!keyMapEnumerator3.MoveNext())
						{
							continue;
						}
						int frames3 = values4.Count;
						switch (timelineEntry3.Key)
						{
						case "position":
						{
							CurveTimeline1 timeline6 = new PathConstraintPositionTimeline(frames3, frames3, constraintIndex);
							timelines.Add(ReadTimeline(ref keyMapEnumerator3, timeline6, 0f, (constraint2.positionMode == PositionMode.Fixed) ? scale : 1f));
							break;
						}
						case "spacing":
						{
							CurveTimeline1 timeline7 = new PathConstraintSpacingTimeline(frames3, frames3, constraintIndex);
							timelines.Add(ReadTimeline(ref keyMapEnumerator3, timeline7, 0f, (constraint2.spacingMode == SpacingMode.Length || constraint2.spacingMode == SpacingMode.Fixed) ? scale : 1f));
							break;
						}
						case "mix":
						{
							PathConstraintMixTimeline timeline8 = new PathConstraintMixTimeline(frames3, frames3 * 3, constraintIndex);
							Dictionary<string, object> keyMap5 = (Dictionary<string, object>)keyMapEnumerator3.Current;
							float time2 = GetFloat(keyMap5, "time", 0f);
							float mixRotate = GetFloat(keyMap5, "mixRotate", 1f);
							float mixX = GetFloat(keyMap5, "mixX", 1f);
							float mixY = GetFloat(keyMap5, "mixY", mixX);
							int frame6 = 0;
							int bezier2 = 0;
							while (true)
							{
								timeline8.SetFrame(frame6, time2, mixRotate, mixX, mixY);
								if (!keyMapEnumerator3.MoveNext())
								{
									break;
								}
								Dictionary<string, object> nextMap2 = (Dictionary<string, object>)keyMapEnumerator3.Current;
								float time11 = GetFloat(nextMap2, "time", 0f);
								float mixRotate3 = GetFloat(nextMap2, "mixRotate", 1f);
								float mixX3 = GetFloat(nextMap2, "mixX", 1f);
								float mixY3 = GetFloat(nextMap2, "mixY", mixX3);
								if (keyMap5.ContainsKey("curve"))
								{
									object curve2 = keyMap5["curve"];
									bezier2 = ReadCurve(curve2, timeline8, bezier2, frame6, 0, time2, time11, mixRotate, mixRotate3, 1f);
									bezier2 = ReadCurve(curve2, timeline8, bezier2, frame6, 1, time2, time11, mixX, mixX3, 1f);
									bezier2 = ReadCurve(curve2, timeline8, bezier2, frame6, 2, time2, time11, mixY, mixY3, 1f);
								}
								time2 = time11;
								mixRotate = mixRotate3;
								mixX = mixX3;
								mixY = mixY3;
								keyMap5 = nextMap2;
								frame6++;
							}
							timeline8.Shrink(bezier2);
							timelines.Add(timeline8);
							break;
						}
						}
					}
				}
			}
			if (map.ContainsKey("physics"))
			{
				foreach (KeyValuePair<string, object> constraintMap in (Dictionary<string, object>)map["physics"])
				{
					int index2 = -1;
					if (!string.IsNullOrEmpty(constraintMap.Key))
					{
						PhysicsConstraintData constraint = skeletonData.FindPhysicsConstraint(constraintMap.Key);
						if (constraint == null)
						{
							throw new Exception("Physics constraint not found: " + constraintMap.Key);
						}
						index2 = skeletonData.physicsConstraints.IndexOf(constraint);
					}
					Dictionary<string, object> timelineMap2 = (Dictionary<string, object>)constraintMap.Value;
					foreach (KeyValuePair<string, object> timelineEntry in timelineMap2)
					{
						List<object> values3 = (List<object>)timelineEntry.Value;
						List<object>.Enumerator keyMapEnumerator2 = values3.GetEnumerator();
						if (!keyMapEnumerator2.MoveNext())
						{
							continue;
						}
						int frames2 = values3.Count;
						CurveTimeline1 timeline5;
						switch (timelineEntry.Key)
						{
						case "reset":
						{
							PhysicsConstraintResetTimeline timeline20 = new PhysicsConstraintResetTimeline(frames2, index2);
							int frame5 = 0;
							foreach (Dictionary<string, object> keyMap4 in values3)
							{
								timeline20.SetFrame(frame5++, GetFloat(keyMap4, "time", 0f));
							}
							timelines.Add(timeline20);
							continue;
						}
						case "inertia":
							timeline5 = new PhysicsConstraintInertiaTimeline(frames2, frames2, index2);
							break;
						case "strength":
							timeline5 = new PhysicsConstraintStrengthTimeline(frames2, frames2, index2);
							break;
						case "damping":
							timeline5 = new PhysicsConstraintDampingTimeline(frames2, frames2, index2);
							break;
						case "mass":
							timeline5 = new PhysicsConstraintMassTimeline(frames2, frames2, index2);
							break;
						case "wind":
							timeline5 = new PhysicsConstraintWindTimeline(frames2, frames2, index2);
							break;
						case "gravity":
							timeline5 = new PhysicsConstraintGravityTimeline(frames2, frames2, index2);
							break;
						case "mix":
							timeline5 = new PhysicsConstraintMixTimeline(frames2, frames2, index2);
							break;
						default:
							continue;
						}
						timelines.Add(ReadTimeline(ref keyMapEnumerator2, timeline5, 0f, 1f));
					}
				}
			}
			if (map.ContainsKey("attachments"))
			{
				foreach (KeyValuePair<string, object> attachmentsMap in (Dictionary<string, object>)map["attachments"])
				{
					Skin skin = skeletonData.FindSkin(attachmentsMap.Key);
					foreach (KeyValuePair<string, object> slotMap in (Dictionary<string, object>)attachmentsMap.Value)
					{
						SlotData slot = skeletonData.FindSlot(slotMap.Key);
						if (slot == null)
						{
							throw new Exception("Slot not found: " + slotMap.Key);
						}
						foreach (KeyValuePair<string, object> attachmentMap in (Dictionary<string, object>)slotMap.Value)
						{
							Attachment attachment = skin.GetAttachment(slot.index, attachmentMap.Key);
							if (attachment == null)
							{
								throw new Exception("Timeline attachment not found: " + attachmentMap.Key);
							}
							foreach (KeyValuePair<string, object> timelineMap in (Dictionary<string, object>)attachmentMap.Value)
							{
								List<object> values2 = (List<object>)timelineMap.Value;
								List<object>.Enumerator keyMapEnumerator = values2.GetEnumerator();
								if (!keyMapEnumerator.MoveNext())
								{
									continue;
								}
								Dictionary<string, object> keyMap3 = (Dictionary<string, object>)keyMapEnumerator.Current;
								int frames = values2.Count;
								string timelineName = timelineMap.Key;
								if (timelineName == "deform")
								{
									VertexAttachment vertexAttachment = (VertexAttachment)attachment;
									bool weighted = vertexAttachment.bones != null;
									float[] vertices = vertexAttachment.vertices;
									int deformLength = (weighted ? (vertices.Length / 3 << 1) : vertices.Length);
									DeformTimeline timeline4 = new DeformTimeline(frames, frames, slot.Index, vertexAttachment);
									float time = GetFloat(keyMap3, "time", 0f);
									int frame4 = 0;
									int bezier = 0;
									while (true)
									{
										float[] deform;
										if (!keyMap3.ContainsKey("vertices"))
										{
											deform = (weighted ? new float[deformLength] : vertices);
										}
										else
										{
											deform = new float[deformLength];
											int start = GetInt(keyMap3, "offset", 0);
											float[] verticesValue = GetFloatArray(keyMap3, "vertices", 1f);
											Array.Copy(verticesValue, 0, deform, start, verticesValue.Length);
											if (scale != 1f)
											{
												int m = start;
												for (int n3 = m + verticesValue.Length; m < n3; m++)
												{
													deform[m] *= scale;
												}
											}
											if (!weighted)
											{
												for (int l = 0; l < deformLength; l++)
												{
													deform[l] += vertices[l];
												}
											}
										}
										timeline4.SetFrame(frame4, time, deform);
										if (!keyMapEnumerator.MoveNext())
										{
											break;
										}
										Dictionary<string, object> nextMap = (Dictionary<string, object>)keyMapEnumerator.Current;
										float time10 = GetFloat(nextMap, "time", 0f);
										if (keyMap3.ContainsKey("curve"))
										{
											object curve = keyMap3["curve"];
											bezier = ReadCurve(curve, timeline4, bezier, frame4, 0, time, time10, 0f, 1f, 1f);
										}
										time = time10;
										keyMap3 = nextMap;
										frame4++;
									}
									timeline4.Shrink(bezier);
									timelines.Add(timeline4);
								}
								else if (timelineName == "sequence")
								{
									SequenceTimeline timeline3 = new SequenceTimeline(frames, slot.index, attachment);
									float lastDelay = 0f;
									int frame3 = 0;
									while (keyMap3 != null)
									{
										float delay = GetFloat(keyMap3, "delay", lastDelay);
										SequenceMode sequenceMode = (SequenceMode)Enum.Parse(typeof(SequenceMode), GetString(keyMap3, "mode", "hold"), true);
										timeline3.SetFrame(frame3, GetFloat(keyMap3, "time", 0f), sequenceMode, GetInt(keyMap3, "index", 0), delay);
										lastDelay = delay;
										keyMap3 = (keyMapEnumerator.MoveNext() ? ((Dictionary<string, object>)keyMapEnumerator.Current) : null);
										frame3++;
									}
									timelines.Add(timeline3);
								}
							}
						}
					}
				}
			}
			if (map.ContainsKey("drawOrder"))
			{
				List<object> values = (List<object>)map["drawOrder"];
				DrawOrderTimeline timeline2 = new DrawOrderTimeline(values.Count);
				int slotCount = skeletonData.slots.Count;
				int frame2 = 0;
				foreach (Dictionary<string, object> keyMap2 in values)
				{
					int[] drawOrder = null;
					if (keyMap2.ContainsKey("offsets"))
					{
						drawOrder = new int[slotCount];
						for (int k = slotCount - 1; k >= 0; k--)
						{
							drawOrder[k] = -1;
						}
						List<object> offsets = (List<object>)keyMap2["offsets"];
						int[] unchanged = new int[slotCount - offsets.Count];
						int originalIndex = 0;
						int unchangedIndex = 0;
						foreach (Dictionary<string, object> offsetMap in offsets)
						{
							int slotIndex = FindSlotIndex(skeletonData, (string)offsetMap["slot"]);
							while (originalIndex != slotIndex)
							{
								unchanged[unchangedIndex++] = originalIndex++;
							}
							int index = originalIndex + (int)(float)offsetMap["offset"];
							drawOrder[index] = originalIndex++;
						}
						while (originalIndex < slotCount)
						{
							unchanged[unchangedIndex++] = originalIndex++;
						}
						for (int j = slotCount - 1; j >= 0; j--)
						{
							if (drawOrder[j] == -1)
							{
								drawOrder[j] = unchanged[--unchangedIndex];
							}
						}
					}
					timeline2.SetFrame(frame2, GetFloat(keyMap2, "time", 0f), drawOrder);
					frame2++;
				}
				timelines.Add(timeline2);
			}
			if (map.ContainsKey("events"))
			{
				List<object> eventsMap = (List<object>)map["events"];
				EventTimeline timeline = new EventTimeline(eventsMap.Count);
				int frame = 0;
				foreach (Dictionary<string, object> keyMap in eventsMap)
				{
					EventData eventData = skeletonData.FindEvent((string)keyMap["name"]);
					if (eventData == null)
					{
						throw new Exception("Event not found: " + keyMap["name"]);
					}
					Event e = new Event(GetFloat(keyMap, "time", 0f), eventData)
					{
						intValue = GetInt(keyMap, "int", eventData.Int),
						floatValue = GetFloat(keyMap, "float", eventData.Float),
						stringValue = GetString(keyMap, "string", eventData.String)
					};
					if (e.data.AudioPath != null)
					{
						e.volume = GetFloat(keyMap, "volume", eventData.Volume);
						e.balance = GetFloat(keyMap, "balance", eventData.Balance);
					}
					timeline.SetFrame(frame, e);
					frame++;
				}
				timelines.Add(timeline);
			}
			timelines.TrimExcess();
			float duration = 0f;
			Timeline[] items = timelines.Items;
			int i = 0;
			for (int n2 = timelines.Count; i < n2; i++)
			{
				duration = Math.Max(duration, items[i].Duration);
			}
			skeletonData.animations.Add(new Animation(name, timelines, duration));
		}

		private static Timeline ReadTimeline(ref List<object>.Enumerator keyMapEnumerator, CurveTimeline1 timeline, float defaultValue, float scale)
		{
			Dictionary<string, object> keyMap = (Dictionary<string, object>)keyMapEnumerator.Current;
			float time = GetFloat(keyMap, "time", 0f);
			float value = GetFloat(keyMap, "value", defaultValue) * scale;
			int frame = 0;
			int bezier = 0;
			while (true)
			{
				timeline.SetFrame(frame, time, value);
				if (!keyMapEnumerator.MoveNext())
				{
					break;
				}
				Dictionary<string, object> nextMap = (Dictionary<string, object>)keyMapEnumerator.Current;
				float time2 = GetFloat(nextMap, "time", 0f);
				float value2 = GetFloat(nextMap, "value", defaultValue) * scale;
				if (keyMap.ContainsKey("curve"))
				{
					object curve = keyMap["curve"];
					bezier = ReadCurve(curve, timeline, bezier, frame, 0, time, time2, value, value2, scale);
				}
				time = time2;
				value = value2;
				keyMap = nextMap;
				frame++;
			}
			timeline.Shrink(bezier);
			return timeline;
		}

		private static Timeline ReadTimeline(ref List<object>.Enumerator keyMapEnumerator, CurveTimeline2 timeline, string name1, string name2, float defaultValue, float scale)
		{
			Dictionary<string, object> keyMap = (Dictionary<string, object>)keyMapEnumerator.Current;
			float time = GetFloat(keyMap, "time", 0f);
			float value1 = GetFloat(keyMap, name1, defaultValue) * scale;
			float value2 = GetFloat(keyMap, name2, defaultValue) * scale;
			int frame = 0;
			int bezier = 0;
			while (true)
			{
				timeline.SetFrame(frame, time, value1, value2);
				if (!keyMapEnumerator.MoveNext())
				{
					break;
				}
				Dictionary<string, object> nextMap = (Dictionary<string, object>)keyMapEnumerator.Current;
				float time2 = GetFloat(nextMap, "time", 0f);
				float nvalue1 = GetFloat(nextMap, name1, defaultValue) * scale;
				float nvalue2 = GetFloat(nextMap, name2, defaultValue) * scale;
				if (keyMap.ContainsKey("curve"))
				{
					object curve = keyMap["curve"];
					bezier = ReadCurve(curve, timeline, bezier, frame, 0, time, time2, value1, nvalue1, scale);
					bezier = ReadCurve(curve, timeline, bezier, frame, 1, time, time2, value2, nvalue2, scale);
				}
				time = time2;
				value1 = nvalue1;
				value2 = nvalue2;
				keyMap = nextMap;
				frame++;
			}
			timeline.Shrink(bezier);
			return timeline;
		}

		private static int ReadCurve(object curve, CurveTimeline timeline, int bezier, int frame, int value, float time1, float time2, float value1, float value2, float scale)
		{
			if (curve is string curveString)
			{
				if (curveString == "stepped")
				{
					timeline.SetStepped(frame);
				}
				return bezier;
			}
			List<object> curveValues = (List<object>)curve;
			int i = value << 2;
			float cx1 = (float)curveValues[i];
			float cy1 = (float)curveValues[i + 1] * scale;
			float cx2 = (float)curveValues[i + 2];
			float cy2 = (float)curveValues[i + 3] * scale;
			SetBezier(timeline, frame, value, bezier, time1, value1, cx1, cy1, cx2, cy2, time2, value2);
			return bezier + 1;
		}

		private static void SetBezier(CurveTimeline timeline, int frame, int value, int bezier, float time1, float value1, float cx1, float cy1, float cx2, float cy2, float time2, float value2)
		{
			timeline.SetBezier(bezier, frame, value, time1, value1, cx1, cy1, cx2, cy2, time2, value2);
		}

		private static float[] GetFloatArray(Dictionary<string, object> map, string name, float scale)
		{
			List<object> list = (List<object>)map[name];
			float[] values = new float[list.Count];
			if (scale == 1f)
			{
				int j = 0;
				for (int l = list.Count; j < l; j++)
				{
					values[j] = (float)list[j];
				}
			}
			else
			{
				int i = 0;
				for (int k = list.Count; i < k; i++)
				{
					values[i] = (float)list[i] * scale;
				}
			}
			return values;
		}

		private static int[] GetIntArray(Dictionary<string, object> map, string name)
		{
			List<object> list = (List<object>)map[name];
			int[] values = new int[list.Count];
			int i = 0;
			for (int j = list.Count; i < j; i++)
			{
				values[i] = (int)(float)list[i];
			}
			return values;
		}

		private static float GetFloat(Dictionary<string, object> map, string name, float defaultValue)
		{
			if (!map.ContainsKey(name))
			{
				return defaultValue;
			}
			return (float)map[name];
		}

		private static int GetInt(Dictionary<string, object> map, string name, int defaultValue)
		{
			if (!map.ContainsKey(name))
			{
				return defaultValue;
			}
			return (int)(float)map[name];
		}

		private static int GetInt(Dictionary<string, object> map, string name)
		{
			if (!map.ContainsKey(name))
			{
				throw new ArgumentException("Named value not found: " + name);
			}
			return (int)(float)map[name];
		}

		private static bool GetBoolean(Dictionary<string, object> map, string name, bool defaultValue)
		{
			if (!map.ContainsKey(name))
			{
				return defaultValue;
			}
			return (bool)map[name];
		}

		private static string GetString(Dictionary<string, object> map, string name, string defaultValue)
		{
			if (!map.ContainsKey(name))
			{
				return defaultValue;
			}
			return (string)map[name];
		}

		private static float ToColor(string hexString, int colorIndex, int expectedLength = 8)
		{
			if (hexString.Length < expectedLength)
			{
				throw new ArgumentException("Color hexadecimal length must be " + expectedLength + ", received: " + hexString, "hexString");
			}
			return (float)Convert.ToInt32(hexString.Substring(colorIndex * 2, 2), 16) / 255f;
		}
	}
}
