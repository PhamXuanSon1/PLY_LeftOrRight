using System;

namespace Spine
{
	public class Skeleton
	{
		public enum Physics
		{
			None,
			Reset,
			Update,
			Pose
		}

		private static readonly int[] quadTriangles = new int[6] { 0, 1, 2, 2, 3, 0 };

		internal SkeletonData data;

		internal ExposedList<Bone> bones;

		internal ExposedList<Slot> slots;

		internal ExposedList<Slot> drawOrder;

		internal ExposedList<IkConstraint> ikConstraints;

		internal ExposedList<TransformConstraint> transformConstraints;

		internal ExposedList<PathConstraint> pathConstraints;

		internal ExposedList<PhysicsConstraint> physicsConstraints;

		internal ExposedList<IUpdatable> updateCache = new ExposedList<IUpdatable>();

		internal Skin skin;

		internal float r = 1f;

		internal float g = 1f;

		internal float b = 1f;

		internal float a = 1f;

		internal float x;

		internal float y;

		internal float scaleX = 1f;

		internal float time;

		private float scaleY = 1f;

		public SkeletonData Data => data;

		public ExposedList<Bone> Bones => bones;

		public ExposedList<IUpdatable> UpdateCacheList => updateCache;

		public ExposedList<Slot> Slots => slots;

		public ExposedList<Slot> DrawOrder => drawOrder;

		public ExposedList<IkConstraint> IkConstraints => ikConstraints;

		public ExposedList<PathConstraint> PathConstraints => pathConstraints;

		public ExposedList<PhysicsConstraint> PhysicsConstraints => physicsConstraints;

		public ExposedList<TransformConstraint> TransformConstraints => transformConstraints;

		public Skin Skin
		{
			get
			{
				return skin;
			}
			set
			{
				SetSkin(value);
			}
		}

		public float R
		{
			get
			{
				return r;
			}
			set
			{
				r = value;
			}
		}

		public float G
		{
			get
			{
				return g;
			}
			set
			{
				g = value;
			}
		}

		public float B
		{
			get
			{
				return b;
			}
			set
			{
				b = value;
			}
		}

		public float A
		{
			get
			{
				return a;
			}
			set
			{
				a = value;
			}
		}

		public float X
		{
			get
			{
				return x;
			}
			set
			{
				x = value;
			}
		}

		public float Y
		{
			get
			{
				return y;
			}
			set
			{
				y = value;
			}
		}

		public float ScaleX
		{
			get
			{
				return scaleX;
			}
			set
			{
				scaleX = value;
			}
		}

		public float ScaleY
		{
			get
			{
				return scaleY * (float)((!Bone.yDown) ? 1 : (-1));
			}
			set
			{
				scaleY = value;
			}
		}

		[Obsolete("Use ScaleX instead. FlipX is when ScaleX is negative.")]
		public bool FlipX
		{
			get
			{
				return scaleX < 0f;
			}
			set
			{
				scaleX = (value ? (-1f) : 1f);
			}
		}

		[Obsolete("Use ScaleY instead. FlipY is when ScaleY is negative.")]
		public bool FlipY
		{
			get
			{
				return scaleY < 0f;
			}
			set
			{
				scaleY = (value ? (-1f) : 1f);
			}
		}

		public float Time
		{
			get
			{
				return time;
			}
			set
			{
				time = value;
			}
		}

		public Bone RootBone => (bones.Count == 0) ? null : bones.Items[0];

		public Skeleton(SkeletonData data)
		{
			if (data == null)
			{
				throw new ArgumentNullException("data", "data cannot be null.");
			}
			this.data = data;
			bones = new ExposedList<Bone>(data.bones.Count);
			Bone[] bonesItems = bones.Items;
			foreach (BoneData boneData in data.bones)
			{
				Bone bone2;
				if (boneData.parent == null)
				{
					bone2 = new Bone(boneData, this, null);
				}
				else
				{
					Bone parent = bonesItems[boneData.parent.index];
					bone2 = new Bone(boneData, this, parent);
					parent.children.Add(bone2);
				}
				bones.Add(bone2);
			}
			slots = new ExposedList<Slot>(data.slots.Count);
			drawOrder = new ExposedList<Slot>(data.slots.Count);
			foreach (SlotData slotData in data.slots)
			{
				Bone bone = bonesItems[slotData.boneData.index];
				Slot slot = new Slot(slotData, bone);
				slots.Add(slot);
				drawOrder.Add(slot);
			}
			ikConstraints = new ExposedList<IkConstraint>(data.ikConstraints.Count);
			foreach (IkConstraintData ikConstraintData in data.ikConstraints)
			{
				ikConstraints.Add(new IkConstraint(ikConstraintData, this));
			}
			transformConstraints = new ExposedList<TransformConstraint>(data.transformConstraints.Count);
			foreach (TransformConstraintData transformConstraintData in data.transformConstraints)
			{
				transformConstraints.Add(new TransformConstraint(transformConstraintData, this));
			}
			pathConstraints = new ExposedList<PathConstraint>(data.pathConstraints.Count);
			foreach (PathConstraintData pathConstraintData in data.pathConstraints)
			{
				pathConstraints.Add(new PathConstraint(pathConstraintData, this));
			}
			physicsConstraints = new ExposedList<PhysicsConstraint>(data.physicsConstraints.Count);
			foreach (PhysicsConstraintData physicsConstraintData in data.physicsConstraints)
			{
				physicsConstraints.Add(new PhysicsConstraint(physicsConstraintData, this));
			}
			UpdateCache();
		}

		public Skeleton(Skeleton skeleton)
		{
			if (skeleton == null)
			{
				throw new ArgumentNullException("skeleton", "skeleton cannot be null.");
			}
			data = skeleton.data;
			bones = new ExposedList<Bone>(skeleton.bones.Count);
			foreach (Bone bone2 in skeleton.bones)
			{
				Bone newBone;
				if (bone2.parent == null)
				{
					newBone = new Bone(bone2, this, null);
				}
				else
				{
					Bone parent = bones.Items[bone2.parent.data.index];
					newBone = new Bone(bone2, this, parent);
					parent.children.Add(newBone);
				}
				bones.Add(newBone);
			}
			slots = new ExposedList<Slot>(skeleton.slots.Count);
			Bone[] bonesItems = bones.Items;
			foreach (Slot slot2 in skeleton.slots)
			{
				Bone bone = bonesItems[slot2.bone.data.index];
				slots.Add(new Slot(slot2, bone));
			}
			drawOrder = new ExposedList<Slot>(slots.Count);
			Slot[] slotsItems = slots.Items;
			foreach (Slot slot in skeleton.drawOrder)
			{
				drawOrder.Add(slotsItems[slot.data.index]);
			}
			ikConstraints = new ExposedList<IkConstraint>(skeleton.ikConstraints.Count);
			foreach (IkConstraint ikConstraint in skeleton.ikConstraints)
			{
				ikConstraints.Add(new IkConstraint(ikConstraint, skeleton));
			}
			transformConstraints = new ExposedList<TransformConstraint>(skeleton.transformConstraints.Count);
			foreach (TransformConstraint transformConstraint in skeleton.transformConstraints)
			{
				transformConstraints.Add(new TransformConstraint(transformConstraint, skeleton));
			}
			pathConstraints = new ExposedList<PathConstraint>(skeleton.pathConstraints.Count);
			foreach (PathConstraint pathConstraint in skeleton.pathConstraints)
			{
				pathConstraints.Add(new PathConstraint(pathConstraint, skeleton));
			}
			physicsConstraints = new ExposedList<PhysicsConstraint>(skeleton.physicsConstraints.Count);
			foreach (PhysicsConstraint physicsConstraint in skeleton.physicsConstraints)
			{
				physicsConstraints.Add(new PhysicsConstraint(physicsConstraint, skeleton));
			}
			skin = skeleton.skin;
			r = skeleton.r;
			g = skeleton.g;
			b = skeleton.b;
			a = skeleton.a;
			x = skeleton.x;
			y = skeleton.y;
			scaleX = skeleton.scaleX;
			scaleY = skeleton.scaleY;
			time = skeleton.time;
			UpdateCache();
		}

		public void UpdateCache()
		{
			ExposedList<IUpdatable> updateCache = this.updateCache;
			updateCache.Clear();
			int boneCount = this.bones.Count;
			Bone[] bones = this.bones.Items;
			for (int l = 0; l < boneCount; l++)
			{
				Bone bone = bones[l];
				bone.sorted = bone.data.skinRequired;
				bone.active = !bone.sorted;
			}
			if (skin != null)
			{
				BoneData[] skinBones = skin.bones.Items;
				int k = 0;
				for (int m = skin.bones.Count; k < m; k++)
				{
					Bone bone2 = bones[skinBones[k].index];
					do
					{
						bone2.sorted = false;
						bone2.active = true;
						bone2 = bone2.parent;
					}
					while (bone2 != null);
				}
			}
			int ikCount = this.ikConstraints.Count;
			int transformCount = this.transformConstraints.Count;
			int pathCount = this.pathConstraints.Count;
			int physicsCount = this.physicsConstraints.Count;
			IkConstraint[] ikConstraints = this.ikConstraints.Items;
			TransformConstraint[] transformConstraints = this.transformConstraints.Items;
			PathConstraint[] pathConstraints = this.pathConstraints.Items;
			PhysicsConstraint[] physicsConstraints = this.physicsConstraints.Items;
			int constraintCount = ikCount + transformCount + pathCount + physicsCount;
			for (int j = 0; j < constraintCount; j++)
			{
				int ii4 = 0;
				while (true)
				{
					if (ii4 < ikCount)
					{
						IkConstraint constraint = ikConstraints[ii4];
						if (constraint.data.order == j)
						{
							SortIkConstraint(constraint);
							break;
						}
						ii4++;
						continue;
					}
					int ii3 = 0;
					while (true)
					{
						if (ii3 < transformCount)
						{
							TransformConstraint constraint2 = transformConstraints[ii3];
							if (constraint2.data.order == j)
							{
								SortTransformConstraint(constraint2);
								break;
							}
							ii3++;
							continue;
						}
						int ii2 = 0;
						while (true)
						{
							if (ii2 < pathCount)
							{
								PathConstraint constraint3 = pathConstraints[ii2];
								if (constraint3.data.order == j)
								{
									SortPathConstraint(constraint3);
									break;
								}
								ii2++;
								continue;
							}
							for (int ii = 0; ii < physicsCount; ii++)
							{
								PhysicsConstraint constraint4 = physicsConstraints[ii];
								if (constraint4.data.order == j)
								{
									SortPhysicsConstraint(constraint4);
									break;
								}
							}
							break;
						}
						break;
					}
					break;
				}
			}
			for (int i = 0; i < boneCount; i++)
			{
				SortBone(bones[i]);
			}
		}

		private void SortIkConstraint(IkConstraint constraint)
		{
			constraint.active = constraint.target.active && (!constraint.data.skinRequired || (skin != null && skin.constraints.Contains(constraint.data)));
			if (constraint.active)
			{
				Bone target = constraint.target;
				SortBone(target);
				ExposedList<Bone> constrained = constraint.bones;
				Bone parent = constrained.Items[0];
				SortBone(parent);
				if (constrained.Count == 1)
				{
					updateCache.Add(constraint);
					SortReset(parent.children);
					return;
				}
				Bone child = constrained.Items[constrained.Count - 1];
				SortBone(child);
				updateCache.Add(constraint);
				SortReset(parent.children);
				child.sorted = true;
			}
		}

		private void SortTransformConstraint(TransformConstraint constraint)
		{
			constraint.active = constraint.target.active && (!constraint.data.skinRequired || (skin != null && skin.constraints.Contains(constraint.data)));
			if (!constraint.active)
			{
				return;
			}
			SortBone(constraint.target);
			Bone[] constrained = constraint.bones.Items;
			int boneCount = constraint.bones.Count;
			if (constraint.data.local)
			{
				for (int l = 0; l < boneCount; l++)
				{
					Bone child = constrained[l];
					SortBone(child.parent);
					SortBone(child);
				}
			}
			else
			{
				for (int k = 0; k < boneCount; k++)
				{
					SortBone(constrained[k]);
				}
			}
			updateCache.Add(constraint);
			for (int j = 0; j < boneCount; j++)
			{
				SortReset(constrained[j].children);
			}
			for (int i = 0; i < boneCount; i++)
			{
				constrained[i].sorted = true;
			}
		}

		private void SortPathConstraint(PathConstraint constraint)
		{
			constraint.active = constraint.target.bone.active && (!constraint.data.skinRequired || (skin != null && skin.constraints.Contains(constraint.data)));
			if (constraint.active)
			{
				Slot slot = constraint.target;
				int slotIndex = slot.data.index;
				Bone slotBone = slot.bone;
				if (skin != null)
				{
					SortPathConstraintAttachment(skin, slotIndex, slotBone);
				}
				if (data.defaultSkin != null && data.defaultSkin != skin)
				{
					SortPathConstraintAttachment(data.defaultSkin, slotIndex, slotBone);
				}
				Attachment attachment = slot.attachment;
				if (attachment is PathAttachment)
				{
					SortPathConstraintAttachment(attachment, slotBone);
				}
				Bone[] constrained = constraint.bones.Items;
				int boneCount = constraint.bones.Count;
				for (int k = 0; k < boneCount; k++)
				{
					SortBone(constrained[k]);
				}
				updateCache.Add(constraint);
				for (int j = 0; j < boneCount; j++)
				{
					SortReset(constrained[j].children);
				}
				for (int i = 0; i < boneCount; i++)
				{
					constrained[i].sorted = true;
				}
			}
		}

		private void SortPathConstraintAttachment(Skin skin, int slotIndex, Bone slotBone)
		{
			foreach (Skin.SkinEntry entry in skin.Attachments)
			{
				if (entry.SlotIndex == slotIndex)
				{
					SortPathConstraintAttachment(entry.Attachment, slotBone);
				}
			}
		}

		private void SortPathConstraintAttachment(Attachment attachment, Bone slotBone)
		{
			if (!(attachment is PathAttachment))
			{
				return;
			}
			int[] pathBones = ((PathAttachment)attachment).bones;
			if (pathBones == null)
			{
				SortBone(slotBone);
				return;
			}
			Bone[] bones = this.bones.Items;
			int i = 0;
			int j = pathBones.Length;
			while (i < j)
			{
				int nn = pathBones[i++];
				nn += i;
				while (i < nn)
				{
					SortBone(bones[pathBones[i++]]);
				}
			}
		}

		private void SortPhysicsConstraint(PhysicsConstraint constraint)
		{
			Bone bone = constraint.bone;
			constraint.active = bone.active && (!constraint.data.skinRequired || (skin != null && skin.constraints.Contains(constraint.data)));
			if (constraint.active)
			{
				SortBone(bone);
				updateCache.Add(constraint);
				SortReset(bone.children);
				bone.sorted = true;
			}
		}

		private void SortBone(Bone bone)
		{
			if (!bone.sorted)
			{
				Bone parent = bone.parent;
				if (parent != null)
				{
					SortBone(parent);
				}
				bone.sorted = true;
				updateCache.Add(bone);
			}
		}

		private static void SortReset(ExposedList<Bone> bones)
		{
			Bone[] bonesItems = bones.Items;
			int i = 0;
			for (int j = bones.Count; i < j; i++)
			{
				Bone bone = bonesItems[i];
				if (bone.active)
				{
					if (bone.sorted)
					{
						SortReset(bone.children);
					}
					bone.sorted = false;
				}
			}
		}

		public void UpdateWorldTransform(Physics physics)
		{
			Bone[] bones = this.bones.Items;
			int j = 0;
			for (int l = this.bones.Count; j < l; j++)
			{
				Bone bone = bones[j];
				bone.ax = bone.x;
				bone.ay = bone.y;
				bone.arotation = bone.rotation;
				bone.ascaleX = bone.scaleX;
				bone.ascaleY = bone.scaleY;
				bone.ashearX = bone.shearX;
				bone.ashearY = bone.shearY;
			}
			IUpdatable[] updateCache = this.updateCache.Items;
			int i = 0;
			for (int k = this.updateCache.Count; i < k; i++)
			{
				updateCache[i].Update(physics);
			}
		}

		public void UpdateWorldTransform(Physics physics, Bone parent)
		{
			if (parent == null)
			{
				throw new ArgumentNullException("parent", "parent cannot be null.");
			}
			Bone rootBone = RootBone;
			float pa = parent.a;
			float pb = parent.b;
			float pc = parent.c;
			float pd = parent.d;
			rootBone.worldX = pa * x + pb * y + parent.worldX;
			rootBone.worldY = pc * x + pd * y + parent.worldY;
			float rx = (rootBone.rotation + rootBone.shearX) * (3.14159265f / 180f);
			float ry = (rootBone.rotation + 90f + rootBone.shearY) * (3.14159265f / 180f);
			float la = (float)Math.Cos(rx) * rootBone.scaleX;
			float lb = (float)Math.Cos(ry) * rootBone.scaleY;
			float lc = (float)Math.Sin(rx) * rootBone.scaleX;
			float ld = (float)Math.Sin(ry) * rootBone.scaleY;
			rootBone.a = (pa * la + pb * lc) * scaleX;
			rootBone.b = (pa * lb + pb * ld) * scaleX;
			rootBone.c = (pc * la + pd * lc) * scaleY;
			rootBone.d = (pc * lb + pd * ld) * scaleY;
			IUpdatable[] updateCache = this.updateCache.Items;
			int i = 0;
			for (int j = this.updateCache.Count; i < j; i++)
			{
				IUpdatable updatable = updateCache[i];
				if (updatable != rootBone)
				{
					updatable.Update(physics);
				}
			}
		}

		public void PhysicsTranslate(float x, float y)
		{
			PhysicsConstraint[] physicsConstraints = this.physicsConstraints.Items;
			int i = 0;
			for (int j = this.physicsConstraints.Count; i < j; i++)
			{
				physicsConstraints[i].Translate(x, y);
			}
		}

		public void PhysicsRotate(float x, float y, float degrees)
		{
			PhysicsConstraint[] physicsConstraints = this.physicsConstraints.Items;
			int i = 0;
			for (int j = this.physicsConstraints.Count; i < j; i++)
			{
				physicsConstraints[i].Rotate(x, y, degrees);
			}
		}

		public void Update(float delta)
		{
			time += delta;
		}

		public void SetToSetupPose()
		{
			SetBonesToSetupPose();
			SetSlotsToSetupPose();
		}

		public void SetBonesToSetupPose()
		{
			Bone[] bones = this.bones.Items;
			int m = 0;
			for (int n5 = this.bones.Count; m < n5; m++)
			{
				bones[m].SetToSetupPose();
			}
			IkConstraint[] ikConstraints = this.ikConstraints.Items;
			int l = 0;
			for (int n4 = this.ikConstraints.Count; l < n4; l++)
			{
				ikConstraints[l].SetToSetupPose();
			}
			TransformConstraint[] transformConstraints = this.transformConstraints.Items;
			int k = 0;
			for (int n3 = this.transformConstraints.Count; k < n3; k++)
			{
				transformConstraints[k].SetToSetupPose();
			}
			PathConstraint[] pathConstraints = this.pathConstraints.Items;
			int j = 0;
			for (int n2 = this.pathConstraints.Count; j < n2; j++)
			{
				pathConstraints[j].SetToSetupPose();
			}
			PhysicsConstraint[] physicsConstraints = this.physicsConstraints.Items;
			int i = 0;
			for (int n = this.physicsConstraints.Count; i < n; i++)
			{
				physicsConstraints[i].SetToSetupPose();
			}
		}

		public void SetSlotsToSetupPose()
		{
			Slot[] slots = this.slots.Items;
			int j = this.slots.Count;
			Array.Copy(slots, 0, drawOrder.Items, 0, j);
			for (int i = 0; i < j; i++)
			{
				slots[i].SetToSetupPose();
			}
		}

		public Bone FindBone(string boneName)
		{
			if (boneName == null)
			{
				throw new ArgumentNullException("boneName", "boneName cannot be null.");
			}
			Bone[] bones = this.bones.Items;
			int i = 0;
			for (int j = this.bones.Count; i < j; i++)
			{
				Bone bone = bones[i];
				if (bone.data.name == boneName)
				{
					return bone;
				}
			}
			return null;
		}

		public Slot FindSlot(string slotName)
		{
			if (slotName == null)
			{
				throw new ArgumentNullException("slotName", "slotName cannot be null.");
			}
			Slot[] slots = this.slots.Items;
			int i = 0;
			for (int j = this.slots.Count; i < j; i++)
			{
				Slot slot = slots[i];
				if (slot.data.name == slotName)
				{
					return slot;
				}
			}
			return null;
		}

		public void SetSkin(string skinName)
		{
			Skin foundSkin = data.FindSkin(skinName);
			if (foundSkin == null)
			{
				throw new ArgumentException("Skin not found: " + skinName, "skinName");
			}
			SetSkin(foundSkin);
		}

		public void SetSkin(Skin newSkin)
		{
			if (newSkin == skin)
			{
				return;
			}
			if (newSkin != null)
			{
				if (skin != null)
				{
					newSkin.AttachAll(this, skin);
				}
				else
				{
					Slot[] slots = this.slots.Items;
					int i = 0;
					for (int j = this.slots.Count; i < j; i++)
					{
						Slot slot = slots[i];
						string name = slot.data.attachmentName;
						if (name != null)
						{
							Attachment attachment = newSkin.GetAttachment(i, name);
							if (attachment != null)
							{
								slot.Attachment = attachment;
							}
						}
					}
				}
			}
			skin = newSkin;
			UpdateCache();
		}

		public Attachment GetAttachment(string slotName, string attachmentName)
		{
			return GetAttachment(data.FindSlot(slotName).index, attachmentName);
		}

		public Attachment GetAttachment(int slotIndex, string attachmentName)
		{
			if (attachmentName == null)
			{
				throw new ArgumentNullException("attachmentName", "attachmentName cannot be null.");
			}
			if (skin != null)
			{
				Attachment attachment = skin.GetAttachment(slotIndex, attachmentName);
				if (attachment != null)
				{
					return attachment;
				}
			}
			return (data.defaultSkin != null) ? data.defaultSkin.GetAttachment(slotIndex, attachmentName) : null;
		}

		public void SetAttachment(string slotName, string attachmentName)
		{
			if (slotName == null)
			{
				throw new ArgumentNullException("slotName", "slotName cannot be null.");
			}
			Slot[] slots = this.slots.Items;
			int i = 0;
			for (int j = this.slots.Count; i < j; i++)
			{
				Slot slot = slots[i];
				if (!(slot.data.name == slotName))
				{
					continue;
				}
				Attachment attachment = null;
				if (attachmentName != null)
				{
					attachment = GetAttachment(i, attachmentName);
					if (attachment == null)
					{
						throw new Exception("Attachment not found: " + attachmentName + ", for slot: " + slotName);
					}
				}
				slot.Attachment = attachment;
				return;
			}
			throw new Exception("Slot not found: " + slotName);
		}

		public IkConstraint FindIkConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			IkConstraint[] ikConstraints = this.ikConstraints.Items;
			int i = 0;
			for (int j = this.ikConstraints.Count; i < j; i++)
			{
				IkConstraint ikConstraint = ikConstraints[i];
				if (ikConstraint.data.name == constraintName)
				{
					return ikConstraint;
				}
			}
			return null;
		}

		public TransformConstraint FindTransformConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			TransformConstraint[] transformConstraints = this.transformConstraints.Items;
			int i = 0;
			for (int j = this.transformConstraints.Count; i < j; i++)
			{
				TransformConstraint transformConstraint = transformConstraints[i];
				if (transformConstraint.data.Name == constraintName)
				{
					return transformConstraint;
				}
			}
			return null;
		}

		public PathConstraint FindPathConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			PathConstraint[] pathConstraints = this.pathConstraints.Items;
			int i = 0;
			for (int j = this.pathConstraints.Count; i < j; i++)
			{
				PathConstraint constraint = pathConstraints[i];
				if (constraint.data.Name.Equals(constraintName))
				{
					return constraint;
				}
			}
			return null;
		}

		public PhysicsConstraint FindPhysicsConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			PhysicsConstraint[] physicsConstraints = this.physicsConstraints.Items;
			int i = 0;
			for (int j = this.physicsConstraints.Count; i < j; i++)
			{
				PhysicsConstraint constraint = physicsConstraints[i];
				if (constraint.data.name.Equals(constraintName))
				{
					return constraint;
				}
			}
			return null;
		}

		public void GetBounds(out float x, out float y, out float width, out float height, ref float[] vertexBuffer, SkeletonClipping clipper = null)
		{
			float[] temp = vertexBuffer;
			temp = temp ?? new float[8];
			Slot[] drawOrder = this.drawOrder.Items;
			float minX = 2.1474836E+09f;
			float minY = 2.1474836E+09f;
			float maxX = -2.1474836E+09f;
			float maxY = -2.1474836E+09f;
			int i = 0;
			for (int j = this.drawOrder.Count; i < j; i++)
			{
				Slot slot = drawOrder[i];
				if (!slot.bone.active)
				{
					continue;
				}
				int verticesLength = 0;
				float[] vertices = null;
				int[] triangles = null;
				Attachment attachment = slot.attachment;
				if (attachment is RegionAttachment region)
				{
					verticesLength = 8;
					vertices = temp;
					if (vertices.Length < 8)
					{
						vertices = (temp = new float[8]);
					}
					region.ComputeWorldVertices(slot, temp, 0);
					triangles = quadTriangles;
				}
				else if (attachment is MeshAttachment mesh)
				{
					verticesLength = mesh.WorldVerticesLength;
					vertices = temp;
					if (vertices.Length < verticesLength)
					{
						vertices = (temp = new float[verticesLength]);
					}
					mesh.ComputeWorldVertices(slot, 0, verticesLength, temp, 0);
					triangles = mesh.Triangles;
				}
				else if (clipper != null && attachment is ClippingAttachment clip)
				{
					clipper.ClipStart(slot, clip);
					continue;
				}
				if (vertices != null)
				{
					if (clipper != null && clipper.IsClipping)
					{
						clipper.ClipTriangles(vertices, triangles, triangles.Length);
						vertices = clipper.ClippedVertices.Items;
						verticesLength = clipper.ClippedVertices.Count;
					}
					for (int ii = 0; ii < verticesLength; ii += 2)
					{
						float vx = vertices[ii];
						float vy = vertices[ii + 1];
						minX = Math.Min(minX, vx);
						minY = Math.Min(minY, vy);
						maxX = Math.Max(maxX, vx);
						maxY = Math.Max(maxY, vy);
					}
				}
				clipper?.ClipEnd(slot);
			}
			clipper?.ClipEnd();
			x = minX;
			y = minY;
			width = maxX - minX;
			height = maxY - minY;
			vertexBuffer = temp;
		}

		public override string ToString()
		{
			return data.name;
		}
	}
}
