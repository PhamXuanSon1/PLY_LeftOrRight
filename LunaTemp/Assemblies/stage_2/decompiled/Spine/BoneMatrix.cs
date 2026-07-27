using System;

namespace Spine
{
	public struct BoneMatrix
	{
		public float a;

		public float b;

		public float c;

		public float d;

		public float x;

		public float y;

		public static BoneMatrix CalculateSetupWorld(BoneData boneData)
		{
			if (boneData == null)
			{
				return default(BoneMatrix);
			}
			if (boneData.Parent == null)
			{
				return GetInheritedInternal(boneData, default(BoneMatrix));
			}
			BoneMatrix result = CalculateSetupWorld(boneData.Parent);
			return GetInheritedInternal(boneData, result);
		}

		private static BoneMatrix GetInheritedInternal(BoneData boneData, BoneMatrix parentMatrix)
		{
			BoneData parent = boneData.Parent;
			if (parent == null)
			{
				return new BoneMatrix(boneData);
			}
			float pa = parentMatrix.a;
			float pb = parentMatrix.b;
			float pc = parentMatrix.c;
			float pd = parentMatrix.d;
			BoneMatrix result = default(BoneMatrix);
			result.x = pa * boneData.X + pb * boneData.Y + parentMatrix.x;
			result.y = pc * boneData.X + pd * boneData.Y + parentMatrix.y;
			switch (boneData.Inherit)
			{
			case Inherit.Normal:
			{
				float rotationY = boneData.Rotation + 90f + boneData.ShearY;
				float la = MathUtils.CosDeg(boneData.Rotation + boneData.ShearX) * boneData.ScaleX;
				float lb = MathUtils.CosDeg(rotationY) * boneData.ScaleY;
				float lc = MathUtils.SinDeg(boneData.Rotation + boneData.ShearX) * boneData.ScaleX;
				float ld = MathUtils.SinDeg(rotationY) * boneData.ScaleY;
				result.a = pa * la + pb * lc;
				result.b = pa * lb + pb * ld;
				result.c = pc * la + pd * lc;
				result.d = pc * lb + pd * ld;
				break;
			}
			case Inherit.OnlyTranslation:
			{
				float rotationY2 = boneData.Rotation + 90f + boneData.ShearY;
				result.a = MathUtils.CosDeg(boneData.Rotation + boneData.ShearX) * boneData.ScaleX;
				result.b = MathUtils.CosDeg(rotationY2) * boneData.ScaleY;
				result.c = MathUtils.SinDeg(boneData.Rotation + boneData.ShearX) * boneData.ScaleX;
				result.d = MathUtils.SinDeg(rotationY2) * boneData.ScaleY;
				break;
			}
			case Inherit.NoRotationOrReflection:
			{
				float s = pa * pa + pc * pc;
				float prx;
				if (s > 0.0001f)
				{
					s = Math.Abs(pa * pd - pb * pc) / s;
					pb = pc * s;
					pd = pa * s;
					prx = MathUtils.Atan2(pc, pa) * (180f / 3.14159265f);
				}
				else
				{
					pa = 0f;
					pc = 0f;
					prx = 90f - MathUtils.Atan2(pd, pb) * (180f / 3.14159265f);
				}
				float rx = boneData.Rotation + boneData.ShearX - prx;
				float ry = boneData.Rotation + boneData.ShearY - prx + 90f;
				float la2 = MathUtils.CosDeg(rx) * boneData.ScaleX;
				float lb2 = MathUtils.CosDeg(ry) * boneData.ScaleY;
				float lc2 = MathUtils.SinDeg(rx) * boneData.ScaleX;
				float ld2 = MathUtils.SinDeg(ry) * boneData.ScaleY;
				result.a = pa * la2 - pb * lc2;
				result.b = pa * lb2 - pb * ld2;
				result.c = pc * la2 + pd * lc2;
				result.d = pc * lb2 + pd * ld2;
				break;
			}
			case Inherit.NoScale:
			case Inherit.NoScaleOrReflection:
			{
				float cos = MathUtils.CosDeg(boneData.Rotation);
				float sin = MathUtils.SinDeg(boneData.Rotation);
				float za = pa * cos + pb * sin;
				float zc = pc * cos + pd * sin;
				float s2 = (float)Math.Sqrt(za * za + zc * zc);
				if (s2 > 1E-05f)
				{
					s2 = 1f / s2;
				}
				za *= s2;
				zc *= s2;
				s2 = (float)Math.Sqrt(za * za + zc * zc);
				float r = 3.14159265f / 2f + MathUtils.Atan2(zc, za);
				float zb = MathUtils.Cos(r) * s2;
				float zd = MathUtils.Sin(r) * s2;
				float la3 = MathUtils.CosDeg(boneData.ShearX) * boneData.ScaleX;
				float lb3 = MathUtils.CosDeg(90f + boneData.ShearY) * boneData.ScaleY;
				float lc3 = MathUtils.SinDeg(boneData.ShearX) * boneData.ScaleX;
				float ld3 = MathUtils.SinDeg(90f + boneData.ShearY) * boneData.ScaleY;
				if (boneData.Inherit != Inherit.NoScaleOrReflection && pa * pd - pb * pc < 0f)
				{
					zb = 0f - zb;
					zd = 0f - zd;
				}
				result.a = za * la3 + zb * lc3;
				result.b = za * lb3 + zb * ld3;
				result.c = zc * la3 + zd * lc3;
				result.d = zc * lb3 + zd * ld3;
				break;
			}
			}
			return result;
		}

		public BoneMatrix(BoneData boneData)
		{
			float rotationY = boneData.Rotation + 90f + boneData.ShearY;
			float rotationX = boneData.Rotation + boneData.ShearX;
			a = MathUtils.CosDeg(rotationX) * boneData.ScaleX;
			c = MathUtils.SinDeg(rotationX) * boneData.ScaleX;
			b = MathUtils.CosDeg(rotationY) * boneData.ScaleY;
			d = MathUtils.SinDeg(rotationY) * boneData.ScaleY;
			x = boneData.X;
			y = boneData.Y;
		}

		public BoneMatrix(Bone bone)
		{
			float rotationY = bone.Rotation + 90f + bone.ShearY;
			float rotationX = bone.Rotation + bone.ShearX;
			a = MathUtils.CosDeg(rotationX) * bone.ScaleX;
			c = MathUtils.SinDeg(rotationX) * bone.ScaleX;
			b = MathUtils.CosDeg(rotationY) * bone.ScaleY;
			d = MathUtils.SinDeg(rotationY) * bone.ScaleY;
			x = bone.X;
			y = bone.Y;
		}

		public BoneMatrix TransformMatrix(BoneMatrix local)
		{
			BoneMatrix result = default(BoneMatrix);
			result.a = a * local.a + b * local.c;
			result.b = a * local.b + b * local.d;
			result.c = c * local.a + d * local.c;
			result.d = c * local.b + d * local.d;
			result.x = a * local.x + b * local.y + x;
			result.y = c * local.x + d * local.y + y;
			return result;
		}
	}
}
