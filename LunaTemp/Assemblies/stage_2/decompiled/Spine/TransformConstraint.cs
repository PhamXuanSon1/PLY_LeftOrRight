using System;

namespace Spine
{
	public class TransformConstraint : IUpdatable
	{
		internal readonly TransformConstraintData data;

		internal readonly ExposedList<Bone> bones;

		internal Bone target;

		internal float mixRotate;

		internal float mixX;

		internal float mixY;

		internal float mixScaleX;

		internal float mixScaleY;

		internal float mixShearY;

		internal bool active;

		public ExposedList<Bone> Bones => bones;

		public Bone Target
		{
			get
			{
				return target;
			}
			set
			{
				target = value;
			}
		}

		public float MixRotate
		{
			get
			{
				return mixRotate;
			}
			set
			{
				mixRotate = value;
			}
		}

		public float MixX
		{
			get
			{
				return mixX;
			}
			set
			{
				mixX = value;
			}
		}

		public float MixY
		{
			get
			{
				return mixY;
			}
			set
			{
				mixY = value;
			}
		}

		public float MixScaleX
		{
			get
			{
				return mixScaleX;
			}
			set
			{
				mixScaleX = value;
			}
		}

		public float MixScaleY
		{
			get
			{
				return mixScaleY;
			}
			set
			{
				mixScaleY = value;
			}
		}

		public float MixShearY
		{
			get
			{
				return mixShearY;
			}
			set
			{
				mixShearY = value;
			}
		}

		public bool Active => active;

		public TransformConstraintData Data => data;

		public TransformConstraint(TransformConstraintData data, Skeleton skeleton)
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
			bones = new ExposedList<Bone>();
			foreach (BoneData boneData in data.bones)
			{
				bones.Add(skeleton.bones.Items[boneData.index]);
			}
			target = skeleton.bones.Items[data.target.index];
			mixRotate = data.mixRotate;
			mixX = data.mixX;
			mixY = data.mixY;
			mixScaleX = data.mixScaleX;
			mixScaleY = data.mixScaleY;
			mixShearY = data.mixShearY;
		}

		public TransformConstraint(TransformConstraint constraint, Skeleton skeleton)
			: this(constraint.data, skeleton)
		{
			mixRotate = constraint.mixRotate;
			mixX = constraint.mixX;
			mixY = constraint.mixY;
			mixScaleX = constraint.mixScaleX;
			mixScaleY = constraint.mixScaleY;
			mixShearY = constraint.mixShearY;
		}

		public void SetToSetupPose()
		{
			TransformConstraintData data = this.data;
			mixRotate = data.mixRotate;
			mixX = data.mixX;
			mixY = data.mixY;
			mixScaleX = data.mixScaleX;
			mixScaleY = data.mixScaleY;
			mixShearY = data.mixShearY;
		}

		public void Update(Skeleton.Physics physics)
		{
			if (mixRotate == 0f && mixX == 0f && mixY == 0f && mixScaleX == 0f && mixScaleY == 0f && mixShearY == 0f)
			{
				return;
			}
			if (data.local)
			{
				if (data.relative)
				{
					ApplyRelativeLocal();
				}
				else
				{
					ApplyAbsoluteLocal();
				}
			}
			else if (data.relative)
			{
				ApplyRelativeWorld();
			}
			else
			{
				ApplyAbsoluteWorld();
			}
		}

		private void ApplyAbsoluteWorld()
		{
			float mixRotate = this.mixRotate;
			float mixX = this.mixX;
			float mixY = this.mixY;
			float mixScaleX = this.mixScaleX;
			float mixScaleY = this.mixScaleY;
			float mixShearY = this.mixShearY;
			bool translate = mixX != 0f || mixY != 0f;
			Bone target = this.target;
			float ta = target.a;
			float tb = target.b;
			float tc = target.c;
			float td = target.d;
			float degRadReflect = ((ta * td - tb * tc > 0f) ? (3.14159265f / 180f) : (-3.14159265f / 180f));
			float offsetRotation = data.offsetRotation * degRadReflect;
			float offsetShearY = data.offsetShearY * degRadReflect;
			Bone[] bones = this.bones.Items;
			int i = 0;
			for (int j = this.bones.Count; i < j; i++)
			{
				Bone bone = bones[i];
				if (mixRotate != 0f)
				{
					float a = bone.a;
					float b2 = bone.b;
					float c = bone.c;
					float d2 = bone.d;
					float r2 = MathUtils.Atan2(tc, ta) - MathUtils.Atan2(c, a) + offsetRotation;
					if (r2 > 3.14159265f)
					{
						r2 -= 3.14159265f * 2f;
					}
					else if (r2 < -3.14159265f)
					{
						r2 += 3.14159265f * 2f;
					}
					r2 *= mixRotate;
					float cos = MathUtils.Cos(r2);
					float sin = MathUtils.Sin(r2);
					bone.a = cos * a - sin * c;
					bone.b = cos * b2 - sin * d2;
					bone.c = sin * a + cos * c;
					bone.d = sin * b2 + cos * d2;
				}
				if (translate)
				{
					target.LocalToWorld(data.offsetX, data.offsetY, out var tx, out var ty);
					bone.worldX += (tx - bone.worldX) * mixX;
					bone.worldY += (ty - bone.worldY) * mixY;
				}
				if (mixScaleX != 0f)
				{
					float s3 = (float)Math.Sqrt(bone.a * bone.a + bone.c * bone.c);
					if (s3 != 0f)
					{
						s3 = (s3 + ((float)Math.Sqrt(ta * ta + tc * tc) - s3 + data.offsetScaleX) * mixScaleX) / s3;
					}
					bone.a *= s3;
					bone.c *= s3;
				}
				if (mixScaleY != 0f)
				{
					float s2 = (float)Math.Sqrt(bone.b * bone.b + bone.d * bone.d);
					if (s2 != 0f)
					{
						s2 = (s2 + ((float)Math.Sqrt(tb * tb + td * td) - s2 + data.offsetScaleY) * mixScaleY) / s2;
					}
					bone.b *= s2;
					bone.d *= s2;
				}
				if (mixShearY > 0f)
				{
					float b = bone.b;
					float d = bone.d;
					float by = MathUtils.Atan2(d, b);
					float r = MathUtils.Atan2(td, tb) - MathUtils.Atan2(tc, ta) - (by - MathUtils.Atan2(bone.c, bone.a));
					if (r > 3.14159265f)
					{
						r -= 3.14159265f * 2f;
					}
					else if (r < -3.14159265f)
					{
						r += 3.14159265f * 2f;
					}
					r = by + (r + offsetShearY) * mixShearY;
					float s = (float)Math.Sqrt(b * b + d * d);
					bone.b = MathUtils.Cos(r) * s;
					bone.d = MathUtils.Sin(r) * s;
				}
				bone.UpdateAppliedTransform();
			}
		}

		private void ApplyRelativeWorld()
		{
			float mixRotate = this.mixRotate;
			float mixX = this.mixX;
			float mixY = this.mixY;
			float mixScaleX = this.mixScaleX;
			float mixScaleY = this.mixScaleY;
			float mixShearY = this.mixShearY;
			bool translate = mixX != 0f || mixY != 0f;
			Bone target = this.target;
			float ta = target.a;
			float tb = target.b;
			float tc = target.c;
			float td = target.d;
			float degRadReflect = ((ta * td - tb * tc > 0f) ? (3.14159265f / 180f) : (-3.14159265f / 180f));
			float offsetRotation = data.offsetRotation * degRadReflect;
			float offsetShearY = data.offsetShearY * degRadReflect;
			Bone[] bones = this.bones.Items;
			int i = 0;
			for (int j = this.bones.Count; i < j; i++)
			{
				Bone bone = bones[i];
				if (mixRotate != 0f)
				{
					float a = bone.a;
					float b2 = bone.b;
					float c = bone.c;
					float d2 = bone.d;
					float r2 = MathUtils.Atan2(tc, ta) + offsetRotation;
					if (r2 > 3.14159265f)
					{
						r2 -= 3.14159265f * 2f;
					}
					else if (r2 < -3.14159265f)
					{
						r2 += 3.14159265f * 2f;
					}
					r2 *= mixRotate;
					float cos = MathUtils.Cos(r2);
					float sin = MathUtils.Sin(r2);
					bone.a = cos * a - sin * c;
					bone.b = cos * b2 - sin * d2;
					bone.c = sin * a + cos * c;
					bone.d = sin * b2 + cos * d2;
				}
				if (translate)
				{
					target.LocalToWorld(data.offsetX, data.offsetY, out var tx, out var ty);
					bone.worldX += tx * mixX;
					bone.worldY += ty * mixY;
				}
				if (mixScaleX != 0f)
				{
					float s3 = ((float)Math.Sqrt(ta * ta + tc * tc) - 1f + data.offsetScaleX) * mixScaleX + 1f;
					bone.a *= s3;
					bone.c *= s3;
				}
				if (mixScaleY != 0f)
				{
					float s2 = ((float)Math.Sqrt(tb * tb + td * td) - 1f + data.offsetScaleY) * mixScaleY + 1f;
					bone.b *= s2;
					bone.d *= s2;
				}
				if (mixShearY > 0f)
				{
					float r = MathUtils.Atan2(td, tb) - MathUtils.Atan2(tc, ta);
					if (r > 3.14159265f)
					{
						r -= 3.14159265f * 2f;
					}
					else if (r < -3.14159265f)
					{
						r += 3.14159265f * 2f;
					}
					float b = bone.b;
					float d = bone.d;
					r = MathUtils.Atan2(d, b) + (r - 3.14159265f / 2f + offsetShearY) * mixShearY;
					float s = (float)Math.Sqrt(b * b + d * d);
					bone.b = MathUtils.Cos(r) * s;
					bone.d = MathUtils.Sin(r) * s;
				}
				bone.UpdateAppliedTransform();
			}
		}

		private void ApplyAbsoluteLocal()
		{
			float mixRotate = this.mixRotate;
			float mixX = this.mixX;
			float mixY = this.mixY;
			float mixScaleX = this.mixScaleX;
			float mixScaleY = this.mixScaleY;
			float mixShearY = this.mixShearY;
			Bone target = this.target;
			Bone[] bones = this.bones.Items;
			int i = 0;
			for (int j = this.bones.Count; i < j; i++)
			{
				Bone bone = bones[i];
				float rotation = bone.arotation;
				if (mixRotate != 0f)
				{
					rotation += (target.arotation - rotation + data.offsetRotation) * mixRotate;
				}
				float x = bone.ax;
				float y = bone.ay;
				x += (target.ax - x + data.offsetX) * mixX;
				y += (target.ay - y + data.offsetY) * mixY;
				float scaleX = bone.ascaleX;
				float scaleY = bone.ascaleY;
				if (mixScaleX != 0f && scaleX != 0f)
				{
					scaleX = (scaleX + (target.ascaleX - scaleX + data.offsetScaleX) * mixScaleX) / scaleX;
				}
				if (mixScaleY != 0f && scaleY != 0f)
				{
					scaleY = (scaleY + (target.ascaleY - scaleY + data.offsetScaleY) * mixScaleY) / scaleY;
				}
				float shearY = bone.ashearY;
				if (mixShearY != 0f)
				{
					shearY += (target.ashearY - shearY + data.offsetShearY) * mixShearY;
				}
				bone.UpdateWorldTransform(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
			}
		}

		private void ApplyRelativeLocal()
		{
			float mixRotate = this.mixRotate;
			float mixX = this.mixX;
			float mixY = this.mixY;
			float mixScaleX = this.mixScaleX;
			float mixScaleY = this.mixScaleY;
			float mixShearY = this.mixShearY;
			Bone target = this.target;
			Bone[] bones = this.bones.Items;
			int i = 0;
			for (int j = this.bones.Count; i < j; i++)
			{
				Bone bone = bones[i];
				float rotation = bone.arotation + (target.arotation + data.offsetRotation) * mixRotate;
				float x = bone.ax + (target.ax + data.offsetX) * mixX;
				float y = bone.ay + (target.ay + data.offsetY) * mixY;
				float scaleX = bone.ascaleX * ((target.ascaleX - 1f + data.offsetScaleX) * mixScaleX + 1f);
				float scaleY = bone.ascaleY * ((target.ascaleY - 1f + data.offsetScaleY) * mixScaleY + 1f);
				float shearY = bone.ashearY + (target.ashearY + data.offsetShearY) * mixShearY;
				bone.UpdateWorldTransform(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
			}
		}

		public override string ToString()
		{
			return data.name;
		}
	}
}
