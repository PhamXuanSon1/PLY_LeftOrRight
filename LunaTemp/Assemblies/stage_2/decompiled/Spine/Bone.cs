using System;

namespace Spine
{
	public class Bone : IUpdatable
	{
		public static bool yDown;

		internal BoneData data;

		internal Skeleton skeleton;

		internal Bone parent;

		internal ExposedList<Bone> children = new ExposedList<Bone>();

		internal float x;

		internal float y;

		internal float rotation;

		internal float scaleX;

		internal float scaleY;

		internal float shearX;

		internal float shearY;

		internal float ax;

		internal float ay;

		internal float arotation;

		internal float ascaleX;

		internal float ascaleY;

		internal float ashearX;

		internal float ashearY;

		internal float a;

		internal float b;

		internal float worldX;

		internal float c;

		internal float d;

		internal float worldY;

		internal Inherit inherit;

		internal bool sorted;

		internal bool active;

		public BoneData Data => data;

		public Skeleton Skeleton => skeleton;

		public Bone Parent => parent;

		public ExposedList<Bone> Children => children;

		public bool Active => active;

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
				return scaleY;
			}
			set
			{
				scaleY = value;
			}
		}

		public float ShearX
		{
			get
			{
				return shearX;
			}
			set
			{
				shearX = value;
			}
		}

		public float ShearY
		{
			get
			{
				return shearY;
			}
			set
			{
				shearY = value;
			}
		}

		public Inherit Inherit
		{
			get
			{
				return inherit;
			}
			set
			{
				inherit = value;
			}
		}

		public float AppliedRotation
		{
			get
			{
				return arotation;
			}
			set
			{
				arotation = value;
			}
		}

		public float AX
		{
			get
			{
				return ax;
			}
			set
			{
				ax = value;
			}
		}

		public float AY
		{
			get
			{
				return ay;
			}
			set
			{
				ay = value;
			}
		}

		public float AScaleX
		{
			get
			{
				return ascaleX;
			}
			set
			{
				ascaleX = value;
			}
		}

		public float AScaleY
		{
			get
			{
				return ascaleY;
			}
			set
			{
				ascaleY = value;
			}
		}

		public float AShearX
		{
			get
			{
				return ashearX;
			}
			set
			{
				ashearX = value;
			}
		}

		public float AShearY
		{
			get
			{
				return ashearY;
			}
			set
			{
				ashearY = value;
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

		public float C
		{
			get
			{
				return c;
			}
			set
			{
				c = value;
			}
		}

		public float D
		{
			get
			{
				return d;
			}
			set
			{
				d = value;
			}
		}

		public float WorldX
		{
			get
			{
				return worldX;
			}
			set
			{
				worldX = value;
			}
		}

		public float WorldY
		{
			get
			{
				return worldY;
			}
			set
			{
				worldY = value;
			}
		}

		public float WorldRotationX => MathUtils.Atan2Deg(c, a);

		public float WorldRotationY => MathUtils.Atan2Deg(d, b);

		public float WorldScaleX => (float)Math.Sqrt(a * a + c * c);

		public float WorldScaleY => (float)Math.Sqrt(b * b + d * d);

		public Bone(BoneData data, Skeleton skeleton, Bone parent)
		{
			if (data == null)
			{
				throw new ArgumentNullException("data", "data cannot be null.");
			}
			if (skeleton == null)
			{
				throw new ArgumentNullException("skeleton", "skeleton cannot be null.");
			}
			this.data = data;
			this.skeleton = skeleton;
			this.parent = parent;
			SetToSetupPose();
		}

		public Bone(Bone bone, Skeleton skeleton, Bone parent)
		{
			if (bone == null)
			{
				throw new ArgumentNullException("bone", "bone cannot be null.");
			}
			if (skeleton == null)
			{
				throw new ArgumentNullException("skeleton", "skeleton cannot be null.");
			}
			this.skeleton = skeleton;
			this.parent = parent;
			data = bone.data;
			x = bone.x;
			y = bone.y;
			rotation = bone.rotation;
			scaleX = bone.scaleX;
			scaleY = bone.scaleY;
			shearX = bone.shearX;
			shearY = bone.shearY;
			inherit = bone.inherit;
		}

		public void Update(Skeleton.Physics physics)
		{
			UpdateWorldTransform(ax, ay, arotation, ascaleX, ascaleY, ashearX, ashearY);
		}

		public void UpdateWorldTransform()
		{
			UpdateWorldTransform(x, y, rotation, scaleX, scaleY, shearX, shearY);
		}

		public void UpdateWorldTransform(float x, float y, float rotation, float scaleX, float scaleY, float shearX, float shearY)
		{
			ax = x;
			ay = y;
			arotation = rotation;
			ascaleX = scaleX;
			ascaleY = scaleY;
			ashearX = shearX;
			ashearY = shearY;
			Bone parent = this.parent;
			if (parent == null)
			{
				Skeleton skeleton = this.skeleton;
				float sx2 = skeleton.scaleX;
				float sy2 = skeleton.ScaleY;
				float rx4 = (rotation + shearX) * (3.14159265f / 180f);
				float ry4 = (rotation + 90f + shearY) * (3.14159265f / 180f);
				a = (float)Math.Cos(rx4) * scaleX * sx2;
				b = (float)Math.Cos(ry4) * scaleY * sx2;
				c = (float)Math.Sin(rx4) * scaleX * sy2;
				d = (float)Math.Sin(ry4) * scaleY * sy2;
				worldX = x * sx2 + skeleton.x;
				worldY = y * sy2 + skeleton.y;
				return;
			}
			float pa = parent.a;
			float pb = parent.b;
			float pc = parent.c;
			float pd = parent.d;
			worldX = pa * x + pb * y + parent.worldX;
			worldY = pc * x + pd * y + parent.worldY;
			switch (inherit)
			{
			case Inherit.Normal:
			{
				float rx = (rotation + shearX) * (3.14159265f / 180f);
				float ry = (rotation + 90f + shearY) * (3.14159265f / 180f);
				float la = (float)Math.Cos(rx) * scaleX;
				float lb = (float)Math.Cos(ry) * scaleY;
				float lc = (float)Math.Sin(rx) * scaleX;
				float ld = (float)Math.Sin(ry) * scaleY;
				a = pa * la + pb * lc;
				b = pa * lb + pb * ld;
				c = pc * la + pd * lc;
				d = pc * lb + pd * ld;
				return;
			}
			case Inherit.OnlyTranslation:
			{
				float rx2 = (rotation + shearX) * (3.14159265f / 180f);
				float ry2 = (rotation + 90f + shearY) * (3.14159265f / 180f);
				a = (float)Math.Cos(rx2) * scaleX;
				b = (float)Math.Cos(ry2) * scaleY;
				c = (float)Math.Sin(rx2) * scaleX;
				d = (float)Math.Sin(ry2) * scaleY;
				break;
			}
			case Inherit.NoRotationOrReflection:
			{
				float sx = 1f / this.skeleton.scaleX;
				float sy = 1f / this.skeleton.ScaleY;
				pa *= sx;
				pc *= sy;
				float s = pa * pa + pc * pc;
				float prx;
				if (s > 0.0001f)
				{
					s = Math.Abs(pa * pd * sy - pb * sx * pc) / s;
					pb = pc * s;
					pd = pa * s;
					prx = MathUtils.Atan2Deg(pc, pa);
				}
				else
				{
					pa = 0f;
					pc = 0f;
					prx = 90f - MathUtils.Atan2Deg(pd, pb);
				}
				float rx3 = (rotation + shearX - prx) * (3.14159265f / 180f);
				float ry3 = (rotation + shearY - prx + 90f) * (3.14159265f / 180f);
				float la2 = (float)Math.Cos(rx3) * scaleX;
				float lb2 = (float)Math.Cos(ry3) * scaleY;
				float lc2 = (float)Math.Sin(rx3) * scaleX;
				float ld2 = (float)Math.Sin(ry3) * scaleY;
				a = pa * la2 - pb * lc2;
				b = pa * lb2 - pb * ld2;
				c = pc * la2 + pd * lc2;
				d = pc * lb2 + pd * ld2;
				break;
			}
			case Inherit.NoScale:
			case Inherit.NoScaleOrReflection:
			{
				rotation *= 3.14159265f / 180f;
				float cos = (float)Math.Cos(rotation);
				float sin = (float)Math.Sin(rotation);
				float za = (pa * cos + pb * sin) / this.skeleton.scaleX;
				float zc = (pc * cos + pd * sin) / this.skeleton.ScaleY;
				float s2 = (float)Math.Sqrt(za * za + zc * zc);
				if (s2 > 1E-05f)
				{
					s2 = 1f / s2;
				}
				za *= s2;
				zc *= s2;
				s2 = (float)Math.Sqrt(za * za + zc * zc);
				if (inherit == Inherit.NoScale && pa * pd - pb * pc < 0f != (this.skeleton.scaleX < 0f != this.skeleton.ScaleY < 0f))
				{
					s2 = 0f - s2;
				}
				rotation = 3.14159265f / 2f + MathUtils.Atan2(zc, za);
				float zb = (float)Math.Cos(rotation) * s2;
				float zd = (float)Math.Sin(rotation) * s2;
				shearX *= 3.14159265f / 180f;
				shearY = (90f + shearY) * (3.14159265f / 180f);
				float la3 = (float)Math.Cos(shearX) * scaleX;
				float lb3 = (float)Math.Cos(shearY) * scaleY;
				float lc3 = (float)Math.Sin(shearX) * scaleX;
				float ld3 = (float)Math.Sin(shearY) * scaleY;
				a = za * la3 + zb * lc3;
				b = za * lb3 + zb * ld3;
				c = zc * la3 + zd * lc3;
				d = zc * lb3 + zd * ld3;
				break;
			}
			}
			a *= this.skeleton.scaleX;
			b *= this.skeleton.scaleX;
			c *= this.skeleton.ScaleY;
			d *= this.skeleton.ScaleY;
		}

		public void SetToSetupPose()
		{
			BoneData data = this.data;
			x = data.x;
			y = data.y;
			rotation = data.rotation;
			scaleX = data.scaleX;
			scaleY = data.ScaleY;
			shearX = data.shearX;
			shearY = data.shearY;
			inherit = data.inherit;
		}

		public void UpdateAppliedTransform()
		{
			Bone parent = this.parent;
			if (parent == null)
			{
				ax = worldX - skeleton.x;
				ay = worldY - skeleton.y;
				float a = this.a;
				float b = this.b;
				float c = this.c;
				float d = this.d;
				arotation = MathUtils.Atan2Deg(c, a);
				ascaleX = (float)Math.Sqrt(a * a + c * c);
				ascaleY = (float)Math.Sqrt(b * b + d * d);
				ashearX = 0f;
				ashearY = MathUtils.Atan2Deg(a * b + c * d, a * d - b * c);
				return;
			}
			float pa = parent.a;
			float pb = parent.b;
			float pc = parent.c;
			float pd = parent.d;
			float pid = 1f / (pa * pd - pb * pc);
			float ia = pd * pid;
			float ib = pb * pid;
			float ic = pc * pid;
			float id = pa * pid;
			float dx = worldX - parent.worldX;
			float dy = worldY - parent.worldY;
			ax = dx * ia - dy * ib;
			ay = dy * id - dx * ic;
			float ra;
			float rb;
			float rc;
			float rd;
			if (inherit == Inherit.OnlyTranslation)
			{
				ra = this.a;
				rb = this.b;
				rc = this.c;
				rd = this.d;
			}
			else
			{
				switch (inherit)
				{
				case Inherit.NoRotationOrReflection:
				{
					float s = Math.Abs(pa * pd - pb * pc) / (pa * pa + pc * pc);
					float skeletonScaleY = skeleton.ScaleY;
					pb = (0f - pc) * skeleton.scaleX * s / skeletonScaleY;
					pd = pa * skeletonScaleY * s / skeleton.scaleX;
					pid = 1f / (pa * pd - pb * pc);
					ia = pd * pid;
					ib = pb * pid;
					break;
				}
				case Inherit.NoScale:
				case Inherit.NoScaleOrReflection:
				{
					float r = rotation * (3.14159265f / 180f);
					float cos = (float)Math.Cos(r);
					float sin = (float)Math.Sin(r);
					pa = (pa * cos + pb * sin) / skeleton.scaleX;
					pc = (pc * cos + pd * sin) / skeleton.ScaleY;
					float s2 = (float)Math.Sqrt(pa * pa + pc * pc);
					if (s2 > 1E-05f)
					{
						s2 = 1f / s2;
					}
					pa *= s2;
					pc *= s2;
					s2 = (float)Math.Sqrt(pa * pa + pc * pc);
					if (inherit == Inherit.NoScale && pid < 0f != (skeleton.scaleX < 0f != skeleton.ScaleY < 0f))
					{
						s2 = 0f - s2;
					}
					r = 3.14159265f / 2f + MathUtils.Atan2(pc, pa);
					pb = (float)Math.Cos(r) * s2;
					pd = (float)Math.Sin(r) * s2;
					pid = 1f / (pa * pd - pb * pc);
					ia = pd * pid;
					ib = pb * pid;
					ic = pc * pid;
					id = pa * pid;
					break;
				}
				}
				ra = ia * this.a - ib * this.c;
				rb = ia * this.b - ib * this.d;
				rc = id * this.c - ic * this.a;
				rd = id * this.d - ic * this.b;
			}
			ashearX = 0f;
			ascaleX = (float)Math.Sqrt(ra * ra + rc * rc);
			if (ascaleX > 0.0001f)
			{
				float det = ra * rd - rb * rc;
				ascaleY = det / ascaleX;
				ashearY = 0f - MathUtils.Atan2Deg(ra * rb + rc * rd, det);
				arotation = MathUtils.Atan2Deg(rc, ra);
			}
			else
			{
				ascaleX = 0f;
				ascaleY = (float)Math.Sqrt(rb * rb + rd * rd);
				ashearY = 0f;
				arotation = 90f - MathUtils.Atan2Deg(rd, rb);
			}
		}

		public void WorldToLocal(float worldX, float worldY, out float localX, out float localY)
		{
			float a = this.a;
			float b = this.b;
			float c = this.c;
			float d = this.d;
			float det = a * d - b * c;
			float x = worldX - this.worldX;
			float y = worldY - this.worldY;
			localX = (x * d - y * b) / det;
			localY = (y * a - x * c) / det;
		}

		public void LocalToWorld(float localX, float localY, out float worldX, out float worldY)
		{
			worldX = localX * a + localY * b + this.worldX;
			worldY = localX * c + localY * d + this.worldY;
		}

		public void WorldToParent(float worldX, float worldY, out float parentX, out float parentY)
		{
			if (parent == null)
			{
				parentX = worldX;
				parentY = worldY;
			}
			else
			{
				parent.WorldToLocal(worldX, worldY, out parentX, out parentY);
			}
		}

		public void ParentToWorld(float parentX, float parentY, out float worldX, out float worldY)
		{
			if (parent == null)
			{
				worldX = parentX;
				worldY = parentY;
			}
			else
			{
				parent.LocalToWorld(parentX, parentY, out worldX, out worldY);
			}
		}

		public float WorldToLocalRotation(float worldRotation)
		{
			worldRotation *= 3.14159265f / 180f;
			float sin = (float)Math.Sin(worldRotation);
			float cos = (float)Math.Cos(worldRotation);
			return MathUtils.Atan2Deg(a * sin - c * cos, d * cos - b * sin) + rotation - shearX;
		}

		public float LocalToWorldRotation(float localRotation)
		{
			localRotation = (localRotation - rotation - shearX) * (3.14159265f / 180f);
			float sin = (float)Math.Sin(localRotation);
			float cos = (float)Math.Cos(localRotation);
			return MathUtils.Atan2Deg(cos * c + sin * d, cos * a + sin * b);
		}

		public void RotateWorld(float degrees)
		{
			degrees *= 3.14159265f / 180f;
			float sin = (float)Math.Sin(degrees);
			float cos = (float)Math.Cos(degrees);
			float ra = a;
			float rb = b;
			a = cos * ra - sin * c;
			b = cos * rb - sin * d;
			c = sin * ra + cos * c;
			d = sin * rb + cos * d;
		}

		public override string ToString()
		{
			return data.name;
		}
	}
}
