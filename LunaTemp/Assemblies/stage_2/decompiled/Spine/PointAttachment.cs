using System;

namespace Spine
{
	public class PointAttachment : Attachment
	{
		internal float x;

		internal float y;

		internal float rotation;

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

		public float Rotation
		{
			get
			{
				return rotation;
			}
			set
			{
				rotation = value;
			}
		}

		public PointAttachment(string name)
			: base(name)
		{
		}

		protected PointAttachment(PointAttachment other)
			: base(other)
		{
			x = other.x;
			y = other.y;
			rotation = other.rotation;
		}

		public void ComputeWorldPosition(Bone bone, out float ox, out float oy)
		{
			bone.LocalToWorld(x, y, out ox, out oy);
		}

		public float ComputeWorldRotation(Bone bone)
		{
			float r = rotation * (3.14159265f / 180f);
			float cos = (float)Math.Cos(r);
			float sin = (float)Math.Sin(r);
			float x = cos * bone.a + sin * bone.b;
			float y = cos * bone.c + sin * bone.d;
			return MathUtils.Atan2Deg(y, x);
		}

		public override Attachment Copy()
		{
			return new PointAttachment(this);
		}
	}
}
