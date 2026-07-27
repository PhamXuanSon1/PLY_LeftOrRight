using System;

namespace Spine
{
	public class IkConstraint : IUpdatable
	{
		internal readonly IkConstraintData data;

		internal readonly ExposedList<Bone> bones = new ExposedList<Bone>();

		internal Bone target;

		internal int bendDirection;

		internal bool compress;

		internal bool stretch;

		internal float mix = 1f;

		internal float softness;

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

		public float Mix
		{
			get
			{
				return mix;
			}
			set
			{
				mix = value;
			}
		}

		public float Softness
		{
			get
			{
				return softness;
			}
			set
			{
				softness = value;
			}
		}

		public int BendDirection
		{
			get
			{
				return bendDirection;
			}
			set
			{
				bendDirection = value;
			}
		}

		public bool Compress
		{
			get
			{
				return compress;
			}
			set
			{
				compress = value;
			}
		}

		public bool Stretch
		{
			get
			{
				return stretch;
			}
			set
			{
				stretch = value;
			}
		}

		public bool Active => active;

		public IkConstraintData Data => data;

		public IkConstraint(IkConstraintData data, Skeleton skeleton)
		{
			if (data == null)
			{
				throw new ArgumentNullException("data", "data cannot be null.");
			}
			this.data = data;
			bones = new ExposedList<Bone>(data.bones.Count);
			foreach (BoneData boneData in data.bones)
			{
				bones.Add(skeleton.bones.Items[boneData.index]);
			}
			target = skeleton.bones.Items[data.target.index];
			mix = data.mix;
			softness = data.softness;
			bendDirection = data.bendDirection;
			compress = data.compress;
			stretch = data.stretch;
		}

		public IkConstraint(IkConstraint constraint, Skeleton skeleton)
			: this(constraint.data, skeleton)
		{
			mix = constraint.mix;
			softness = constraint.softness;
			bendDirection = constraint.bendDirection;
			compress = constraint.compress;
			stretch = constraint.stretch;
		}

		public void SetToSetupPose()
		{
			IkConstraintData data = this.data;
			mix = data.mix;
			softness = data.softness;
			bendDirection = data.bendDirection;
			compress = data.compress;
			stretch = data.stretch;
		}

		public void Update(Skeleton.Physics physics)
		{
			if (mix != 0f)
			{
				Bone target = this.target;
				Bone[] bones = this.bones.Items;
				switch (this.bones.Count)
				{
				case 1:
					Apply(bones[0], target.worldX, target.worldY, compress, stretch, data.uniform, mix);
					break;
				case 2:
					Apply(bones[0], bones[1], target.worldX, target.worldY, bendDirection, stretch, data.uniform, softness, mix);
					break;
				}
			}
		}

		public override string ToString()
		{
			return data.name;
		}

		public static void Apply(Bone bone, float targetX, float targetY, bool compress, bool stretch, bool uniform, float alpha)
		{
			if (bone == null)
			{
				throw new ArgumentNullException("bone", "bone cannot be null.");
			}
			Bone p = bone.parent;
			float pa = p.a;
			float pb = p.b;
			float pc = p.c;
			float pd = p.d;
			float rotationIK = 0f - bone.ashearX - bone.arotation;
			float tx = 0f;
			float ty = 0f;
			Inherit inherit = bone.inherit;
			Inherit inherit2 = inherit;
			if (inherit2 != Inherit.OnlyTranslation)
			{
				if (inherit2 == Inherit.NoRotationOrReflection)
				{
					float s2 = Math.Abs(pa * pd - pb * pc) / Math.Max(0.0001f, pa * pa + pc * pc);
					float sa = pa / bone.skeleton.scaleX;
					float sc = pc / bone.skeleton.ScaleY;
					pb = (0f - sc) * s2 * bone.skeleton.scaleX;
					pd = sa * s2 * bone.skeleton.ScaleY;
					rotationIK += MathUtils.Atan2Deg(sc, sa);
				}
				float x = targetX - p.worldX;
				float y = targetY - p.worldY;
				float d = pa * pd - pb * pc;
				if (Math.Abs(d) <= 0.0001f)
				{
					tx = 0f;
					ty = 0f;
				}
				else
				{
					tx = (x * pd - y * pb) / d - bone.ax;
					ty = (y * pa - x * pc) / d - bone.ay;
				}
			}
			else
			{
				tx = (targetX - bone.worldX) * (float)Math.Sign(bone.skeleton.ScaleX);
				ty = (targetY - bone.worldY) * (float)Math.Sign(bone.skeleton.ScaleY);
			}
			rotationIK += MathUtils.Atan2Deg(ty, tx);
			if (bone.ascaleX < 0f)
			{
				rotationIK += 180f;
			}
			if (rotationIK > 180f)
			{
				rotationIK -= 360f;
			}
			else if (rotationIK < -180f)
			{
				rotationIK += 360f;
			}
			float sx = bone.ascaleX;
			float sy = bone.ascaleY;
			if (compress || stretch)
			{
				Inherit inherit3 = bone.inherit;
				Inherit inherit4 = inherit3;
				if ((uint)(inherit4 - 3) <= 1u)
				{
					tx = targetX - bone.worldX;
					ty = targetY - bone.worldY;
				}
				float b = bone.data.length * sx;
				if (b > 0.0001f)
				{
					float dd = tx * tx + ty * ty;
					if ((compress && dd < b * b) || (stretch && dd > b * b))
					{
						float s = ((float)Math.Sqrt(dd) / b - 1f) * alpha + 1f;
						sx *= s;
						if (uniform)
						{
							sy *= s;
						}
					}
				}
			}
			bone.UpdateWorldTransform(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, sx, sy, bone.ashearX, bone.ashearY);
		}

		public static void Apply(Bone parent, Bone child, float targetX, float targetY, int bendDir, bool stretch, bool uniform, float softness, float alpha)
		{
			if (parent == null)
			{
				throw new ArgumentNullException("parent", "parent cannot be null.");
			}
			if (child == null)
			{
				throw new ArgumentNullException("child", "child cannot be null.");
			}
			if (parent.inherit != 0 || child.inherit != 0)
			{
				return;
			}
			float px = parent.ax;
			float py = parent.ay;
			float psx = parent.ascaleX;
			float psy = parent.ascaleY;
			float sx = psx;
			float sy = psy;
			float csx = child.ascaleX;
			int os2;
			int s2;
			if (psx < 0f)
			{
				psx = 0f - psx;
				os2 = 180;
				s2 = -1;
			}
			else
			{
				os2 = 0;
				s2 = 1;
			}
			if (psy < 0f)
			{
				psy = 0f - psy;
				s2 = -s2;
			}
			int os3;
			if (csx < 0f)
			{
				csx = 0f - csx;
				os3 = 180;
			}
			else
			{
				os3 = 0;
			}
			float cx = child.ax;
			float a = parent.a;
			float b = parent.b;
			float c = parent.c;
			float d = parent.d;
			bool u = Math.Abs(psx - psy) <= 0.0001f;
			float cy;
			float cwx;
			float cwy;
			if (!u || stretch)
			{
				cy = 0f;
				cwx = a * cx + parent.worldX;
				cwy = c * cx + parent.worldY;
			}
			else
			{
				cy = child.ay;
				cwx = a * cx + b * cy + parent.worldX;
				cwy = c * cx + d * cy + parent.worldY;
			}
			Bone pp = parent.parent;
			a = pp.a;
			b = pp.b;
			c = pp.c;
			d = pp.d;
			float id = a * d - b * c;
			float x = cwx - pp.worldX;
			float y = cwy - pp.worldY;
			id = ((Math.Abs(id) <= 0.0001f) ? 0f : (1f / id));
			float dx = (x * d - y * b) * id - px;
			float dy = (y * a - x * c) * id - py;
			float l1 = (float)Math.Sqrt(dx * dx + dy * dy);
			float l2 = child.data.length * csx;
			if (l1 < 0.0001f)
			{
				Apply(parent, targetX, targetY, false, stretch, false, alpha);
				child.UpdateWorldTransform(cx, cy, 0f, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
				return;
			}
			x = targetX - pp.worldX;
			y = targetY - pp.worldY;
			float tx = (x * d - y * b) * id - px;
			float ty = (y * a - x * c) * id - py;
			float dd = tx * tx + ty * ty;
			if (softness != 0f)
			{
				softness *= psx * (csx + 1f) * 0.5f;
				float td = (float)Math.Sqrt(dd);
				float sd = td - l1 - l2 * psx + softness;
				if (sd > 0f)
				{
					float p = Math.Min(1f, sd / (softness * 2f)) - 1f;
					p = (sd - softness * (1f - p * p)) / td;
					tx -= p * tx;
					ty -= p * ty;
					dd = tx * tx + ty * ty;
				}
			}
			float a2;
			float a3;
			if (u)
			{
				l2 *= psx;
				float cos = (dd - l1 * l1 - l2 * l2) / (2f * l1 * l2);
				if (cos < -1f)
				{
					cos = -1f;
					a3 = 3.14159265f * (float)bendDir;
				}
				else if (cos > 1f)
				{
					cos = 1f;
					a3 = 0f;
					if (stretch)
					{
						a = ((float)Math.Sqrt(dd) / (l1 + l2) - 1f) * alpha + 1f;
						sx *= a;
						if (uniform)
						{
							sy *= a;
						}
					}
				}
				else
				{
					a3 = (float)Math.Acos(cos) * (float)bendDir;
				}
				a = l1 + l2 * cos;
				b = l2 * (float)Math.Sin(a3);
				a2 = (float)Math.Atan2(ty * a - tx * b, tx * a + ty * b);
			}
			else
			{
				a = psx * l2;
				b = psy * l2;
				float aa = a * a;
				float bb = b * b;
				float ta = (float)Math.Atan2(ty, tx);
				c = bb * l1 * l1 + aa * dd - aa * bb;
				float c2 = -2f * bb * l1;
				float c3 = bb - aa;
				d = c2 * c2 - 4f * c3 * c;
				if (d >= 0f)
				{
					float q = (float)Math.Sqrt(d);
					if (c2 < 0f)
					{
						q = 0f - q;
					}
					q = (0f - (c2 + q)) * 0.5f;
					float r2 = q / c3;
					float r3 = c / q;
					float r = ((Math.Abs(r2) < Math.Abs(r3)) ? r2 : r3);
					r2 = dd - r * r;
					if (r2 >= 0f)
					{
						y = (float)Math.Sqrt(r2) * (float)bendDir;
						a2 = ta - (float)Math.Atan2(y, r);
						a3 = (float)Math.Atan2(y / psy, (r - l1) / psx);
						goto IL_06d2;
					}
				}
				float minAngle = 3.14159265f;
				float minX = l1 - a;
				float minDist = minX * minX;
				float minY = 0f;
				float maxAngle = 0f;
				float maxX = l1 + a;
				float maxDist = maxX * maxX;
				float maxY = 0f;
				c = (0f - a) * l1 / (aa - bb);
				if (c >= -1f && c <= 1f)
				{
					c = (float)Math.Acos(c);
					x = a * (float)Math.Cos(c) + l1;
					y = b * (float)Math.Sin(c);
					d = x * x + y * y;
					if (d < minDist)
					{
						minAngle = c;
						minDist = d;
						minX = x;
						minY = y;
					}
					if (d > maxDist)
					{
						maxAngle = c;
						maxDist = d;
						maxX = x;
						maxY = y;
					}
				}
				if (dd <= (minDist + maxDist) * 0.5f)
				{
					a2 = ta - (float)Math.Atan2(minY * (float)bendDir, minX);
					a3 = minAngle * (float)bendDir;
				}
				else
				{
					a2 = ta - (float)Math.Atan2(maxY * (float)bendDir, maxX);
					a3 = maxAngle * (float)bendDir;
				}
			}
			goto IL_06d2;
			IL_06d2:
			float os = (float)Math.Atan2(cy, cx) * (float)s2;
			float rotation = parent.arotation;
			a2 = (a2 - os) * (180f / 3.14159265f) + (float)os2 - rotation;
			if (a2 > 180f)
			{
				a2 -= 360f;
			}
			else if (a2 < -180f)
			{
				a2 += 360f;
			}
			parent.UpdateWorldTransform(px, py, rotation + a2 * alpha, sx, sy, 0f, 0f);
			rotation = child.arotation;
			a3 = ((a3 + os) * (180f / 3.14159265f) - child.ashearX) * (float)s2 + (float)os3 - rotation;
			if (a3 > 180f)
			{
				a3 -= 360f;
			}
			else if (a3 < -180f)
			{
				a3 += 360f;
			}
			child.UpdateWorldTransform(cx, cy, rotation + a3 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
		}
	}
}
