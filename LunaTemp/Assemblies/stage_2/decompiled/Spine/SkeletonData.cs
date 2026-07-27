using System;

namespace Spine
{
	public class SkeletonData
	{
		internal string name;

		internal ExposedList<BoneData> bones = new ExposedList<BoneData>();

		internal ExposedList<SlotData> slots = new ExposedList<SlotData>();

		internal ExposedList<Skin> skins = new ExposedList<Skin>();

		internal Skin defaultSkin;

		internal ExposedList<EventData> events = new ExposedList<EventData>();

		internal ExposedList<Animation> animations = new ExposedList<Animation>();

		internal ExposedList<IkConstraintData> ikConstraints = new ExposedList<IkConstraintData>();

		internal ExposedList<TransformConstraintData> transformConstraints = new ExposedList<TransformConstraintData>();

		internal ExposedList<PathConstraintData> pathConstraints = new ExposedList<PathConstraintData>();

		internal ExposedList<PhysicsConstraintData> physicsConstraints = new ExposedList<PhysicsConstraintData>();

		internal float x;

		internal float y;

		internal float width;

		internal float height;

		internal float referenceScale = 100f;

		internal string version;

		internal string hash;

		internal float fps;

		internal string imagesPath;

		internal string audioPath;

		public string Name
		{
			get
			{
				return name;
			}
			set
			{
				name = value;
			}
		}

		public ExposedList<BoneData> Bones => bones;

		public ExposedList<SlotData> Slots => slots;

		public ExposedList<Skin> Skins
		{
			get
			{
				return skins;
			}
			set
			{
				skins = value;
			}
		}

		public Skin DefaultSkin
		{
			get
			{
				return defaultSkin;
			}
			set
			{
				defaultSkin = value;
			}
		}

		public ExposedList<EventData> Events
		{
			get
			{
				return events;
			}
			set
			{
				events = value;
			}
		}

		public ExposedList<Animation> Animations
		{
			get
			{
				return animations;
			}
			set
			{
				animations = value;
			}
		}

		public ExposedList<IkConstraintData> IkConstraints
		{
			get
			{
				return ikConstraints;
			}
			set
			{
				ikConstraints = value;
			}
		}

		public ExposedList<TransformConstraintData> TransformConstraints
		{
			get
			{
				return transformConstraints;
			}
			set
			{
				transformConstraints = value;
			}
		}

		public ExposedList<PathConstraintData> PathConstraints
		{
			get
			{
				return pathConstraints;
			}
			set
			{
				pathConstraints = value;
			}
		}

		public ExposedList<PhysicsConstraintData> PhysicsConstraints
		{
			get
			{
				return physicsConstraints;
			}
			set
			{
				physicsConstraints = value;
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

		public float Width
		{
			get
			{
				return width;
			}
			set
			{
				width = value;
			}
		}

		public float Height
		{
			get
			{
				return height;
			}
			set
			{
				height = value;
			}
		}

		public float ReferenceScale
		{
			get
			{
				return referenceScale;
			}
			set
			{
				referenceScale = value;
			}
		}

		public string Version
		{
			get
			{
				return version;
			}
			set
			{
				version = value;
			}
		}

		public string Hash
		{
			get
			{
				return hash;
			}
			set
			{
				hash = value;
			}
		}

		public string ImagesPath
		{
			get
			{
				return imagesPath;
			}
			set
			{
				imagesPath = value;
			}
		}

		public string AudioPath
		{
			get
			{
				return audioPath;
			}
			set
			{
				audioPath = value;
			}
		}

		public float Fps
		{
			get
			{
				return fps;
			}
			set
			{
				fps = value;
			}
		}

		public BoneData FindBone(string boneName)
		{
			if (boneName == null)
			{
				throw new ArgumentNullException("boneName", "boneName cannot be null.");
			}
			BoneData[] bones = this.bones.Items;
			int i = 0;
			for (int j = this.bones.Count; i < j; i++)
			{
				BoneData bone = bones[i];
				if (bone.name == boneName)
				{
					return bone;
				}
			}
			return null;
		}

		public SlotData FindSlot(string slotName)
		{
			if (slotName == null)
			{
				throw new ArgumentNullException("slotName", "slotName cannot be null.");
			}
			SlotData[] slots = this.slots.Items;
			int i = 0;
			for (int j = this.slots.Count; i < j; i++)
			{
				SlotData slot = slots[i];
				if (slot.name == slotName)
				{
					return slot;
				}
			}
			return null;
		}

		public Skin FindSkin(string skinName)
		{
			if (skinName == null)
			{
				throw new ArgumentNullException("skinName", "skinName cannot be null.");
			}
			foreach (Skin skin in skins)
			{
				if (skin.name == skinName)
				{
					return skin;
				}
			}
			return null;
		}

		public EventData FindEvent(string eventDataName)
		{
			if (eventDataName == null)
			{
				throw new ArgumentNullException("eventDataName", "eventDataName cannot be null.");
			}
			foreach (EventData eventData in events)
			{
				if (eventData.name == eventDataName)
				{
					return eventData;
				}
			}
			return null;
		}

		public Animation FindAnimation(string animationName)
		{
			if (animationName == null)
			{
				throw new ArgumentNullException("animationName", "animationName cannot be null.");
			}
			Animation[] animations = this.animations.Items;
			int i = 0;
			for (int j = this.animations.Count; i < j; i++)
			{
				Animation animation = animations[i];
				if (animation.name == animationName)
				{
					return animation;
				}
			}
			return null;
		}

		public IkConstraintData FindIkConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			IkConstraintData[] ikConstraints = this.ikConstraints.Items;
			int i = 0;
			for (int j = this.ikConstraints.Count; i < j; i++)
			{
				IkConstraintData ikConstraint = ikConstraints[i];
				if (ikConstraint.name == constraintName)
				{
					return ikConstraint;
				}
			}
			return null;
		}

		public TransformConstraintData FindTransformConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			TransformConstraintData[] transformConstraints = this.transformConstraints.Items;
			int i = 0;
			for (int j = this.transformConstraints.Count; i < j; i++)
			{
				TransformConstraintData transformConstraint = transformConstraints[i];
				if (transformConstraint.name == constraintName)
				{
					return transformConstraint;
				}
			}
			return null;
		}

		public PathConstraintData FindPathConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			PathConstraintData[] pathConstraints = this.pathConstraints.Items;
			int i = 0;
			for (int j = this.pathConstraints.Count; i < j; i++)
			{
				PathConstraintData constraint = pathConstraints[i];
				if (constraint.name.Equals(constraintName))
				{
					return constraint;
				}
			}
			return null;
		}

		public PhysicsConstraintData FindPhysicsConstraint(string constraintName)
		{
			if (constraintName == null)
			{
				throw new ArgumentNullException("constraintName", "constraintName cannot be null.");
			}
			PhysicsConstraintData[] physicsConstraints = this.physicsConstraints.Items;
			int i = 0;
			for (int j = this.physicsConstraints.Count; i < j; i++)
			{
				PhysicsConstraintData constraint = physicsConstraints[i];
				if (constraint.name.Equals(constraintName))
				{
					return constraint;
				}
			}
			return null;
		}

		public override string ToString()
		{
			return name ?? base.ToString();
		}
	}
}
