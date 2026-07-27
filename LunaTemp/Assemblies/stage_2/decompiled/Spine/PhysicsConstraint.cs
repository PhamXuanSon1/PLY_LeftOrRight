using System;

namespace Spine
{
	public class PhysicsConstraint : IUpdatable
	{
		internal readonly PhysicsConstraintData data;

		public Bone bone;

		internal float inertia;

		internal float strength;

		internal float damping;

		internal float massInverse;

		internal float wind;

		internal float gravity;

		internal float mix;

		private bool reset = true;

		private float ux;

		private float uy;

		private float cx;

		private float cy;

		private float tx;

		private float ty;

		private float xOffset;

		private float xVelocity;

		private float yOffset;

		private float yVelocity;

		private float rotateOffset;

		private float rotateVelocity;

		private float scaleOffset;

		private float scaleVelocity;

		internal bool active;

		private readonly Skeleton skeleton;

		private float remaining;

		private float lastTime;

		public Bone Bone
		{
			get
			{
				return bone;
			}
			set
			{
				bone = value;
			}
		}

		public float Inertia
		{
			get
			{
				return inertia;
			}
			set
			{
				inertia = value;
			}
		}

		public float Strength
		{
			get
			{
				return strength;
			}
			set
			{
				strength = value;
			}
		}

		public float Damping
		{
			get
			{
				return damping;
			}
			set
			{
				damping = value;
			}
		}

		public float MassInverse
		{
			get
			{
				return massInverse;
			}
			set
			{
				massInverse = value;
			}
		}

		public float Wind
		{
			get
			{
				return wind;
			}
			set
			{
				wind = value;
			}
		}

		public float Gravity
		{
			get
			{
				return gravity;
			}
			set
			{
				gravity = value;
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

		public bool Active => active;

		public PhysicsConstraintData Data => data;

		public PhysicsConstraint(PhysicsConstraintData data, Skeleton skeleton)
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
			bone = skeleton.bones.Items[data.bone.index];
			inertia = data.inertia;
			strength = data.strength;
			damping = data.damping;
			massInverse = data.massInverse;
			wind = data.wind;
			gravity = data.gravity;
			mix = data.mix;
		}

		public PhysicsConstraint(PhysicsConstraint constraint, Skeleton skeleton)
			: this(constraint.data, skeleton)
		{
			inertia = constraint.inertia;
			strength = constraint.strength;
			damping = constraint.damping;
			massInverse = constraint.massInverse;
			wind = constraint.wind;
			gravity = constraint.gravity;
			mix = constraint.mix;
		}

		public void Reset()
		{
			remaining = 0f;
			lastTime = skeleton.time;
			reset = true;
			xOffset = 0f;
			xVelocity = 0f;
			yOffset = 0f;
			yVelocity = 0f;
			rotateOffset = 0f;
			rotateVelocity = 0f;
			scaleOffset = 0f;
			scaleVelocity = 0f;
		}

		public void SetToSetupPose()
		{
			PhysicsConstraintData data = this.data;
			inertia = data.inertia;
			strength = data.strength;
			damping = data.damping;
			massInverse = data.massInverse;
			wind = data.wind;
			gravity = data.gravity;
			mix = data.mix;
		}

		public void Translate(float x, float y)
		{
			ux -= x;
			uy -= y;
			cx -= x;
			cy -= y;
		}

		public void Rotate(float x, float y, float degrees)
		{
			float r = degrees * (3.14159265f / 180f);
			float cos = (float)Math.Cos(r);
			float sin = (float)Math.Sin(r);
			float dx = cx - x;
			float dy = cy - y;
			Translate(dx * cos - dy * sin - dx, dx * sin + dy * cos - dy);
		}

		public void Update(Skeleton.Physics physics)
		{
			float mix = this.mix;
			if (mix == 0f)
			{
				return;
			}
			bool x = data.x > 0f;
			bool y = data.y > 0f;
			bool rotateOrShearX = data.rotate > 0f || data.shearX > 0f;
			bool scaleX = data.scaleX > 0f;
			Bone bone = this.bone;
			float j = bone.data.length;
			switch (physics)
			{
			case Skeleton.Physics.None:
				return;
			case Skeleton.Physics.Reset:
				Reset();
				goto case Skeleton.Physics.Update;
			case Skeleton.Physics.Update:
			{
				Skeleton skeleton = this.skeleton;
				float delta = Math.Max(skeleton.time - lastTime, 0f);
				remaining += delta;
				lastTime = skeleton.time;
				float bx = bone.worldX;
				float by = bone.worldY;
				if (reset)
				{
					reset = false;
					ux = bx;
					uy = by;
				}
				else
				{
					float a2 = remaining;
					float i = inertia;
					float t = data.step;
					float f = skeleton.data.referenceScale;
					float d = -1f;
					float qx = data.limit * delta;
					float qy = qx * Math.Abs(skeleton.ScaleY);
					qx *= Math.Abs(skeleton.ScaleX);
					if (x || y)
					{
						if (x)
						{
							float u2 = (ux - bx) * i;
							xOffset += ((u2 > qx) ? qx : ((u2 < 0f - qx) ? (0f - qx) : u2));
							ux = bx;
						}
						if (y)
						{
							float u = (uy - by) * i;
							yOffset += ((u > qy) ? qy : ((u < 0f - qy) ? (0f - qy) : u));
							uy = by;
						}
						if (a2 >= t)
						{
							d = (float)Math.Pow(damping, 60f * t);
							float l = massInverse * t;
							float e2 = strength;
							float w2 = wind * f * skeleton.ScaleX;
							float g2 = gravity * f * skeleton.ScaleY;
							do
							{
								if (x)
								{
									xVelocity += (w2 - xOffset * e2) * l;
									xOffset += xVelocity * t;
									xVelocity *= d;
								}
								if (y)
								{
									yVelocity -= (g2 + yOffset * e2) * l;
									yOffset += yVelocity * t;
									yVelocity *= d;
								}
								a2 -= t;
							}
							while (a2 >= t);
						}
						if (x)
						{
							bone.worldX += xOffset * mix * data.x;
						}
						if (y)
						{
							bone.worldY += yOffset * mix * data.y;
						}
					}
					if (rotateOrShearX || scaleX)
					{
						float ca = (float)Math.Atan2(bone.c, bone.a);
						float mr = 0f;
						float dx = cx - bone.worldX;
						float dy = cy - bone.worldY;
						if (dx > qx)
						{
							dx = qx;
						}
						else if (dx < 0f - qx)
						{
							dx = 0f - qx;
						}
						if (dy > qy)
						{
							dy = qy;
						}
						else if (dy < 0f - qy)
						{
							dy = 0f - qy;
						}
						float c2;
						float s3;
						if (rotateOrShearX)
						{
							mr = (data.rotate + data.shearX) * mix;
							float r4 = (float)Math.Atan2(dy + ty, dx + tx) - ca - rotateOffset * mr;
							rotateOffset += (r4 - (float)Math.Ceiling(r4 * (1f / (2f * 3.14159265f)) - 0.5f) * (3.14159265f * 2f)) * i;
							r4 = rotateOffset * mr + ca;
							c2 = (float)Math.Cos(r4);
							s3 = (float)Math.Sin(r4);
							if (scaleX)
							{
								r4 = j * bone.WorldScaleX;
								if (r4 > 0f)
								{
									scaleOffset += (dx * c2 + dy * s3) * i / r4;
								}
							}
						}
						else
						{
							c2 = (float)Math.Cos(ca);
							s3 = (float)Math.Sin(ca);
							float r3 = j * bone.WorldScaleX;
							if (r3 > 0f)
							{
								scaleOffset += (dx * c2 + dy * s3) * i / r3;
							}
						}
						a2 = remaining;
						if (a2 >= t)
						{
							if (d == -1f)
							{
								d = (float)Math.Pow(damping, 60f * t);
							}
							float k = massInverse * t;
							float e = strength;
							float w = wind;
							float g = (Bone.yDown ? (0f - gravity) : gravity);
							float h = j / f;
							while (true)
							{
								a2 -= t;
								if (scaleX)
								{
									scaleVelocity += (w * c2 - g * s3 - scaleOffset * e) * k;
									scaleOffset += scaleVelocity * t;
									scaleVelocity *= d;
								}
								if (rotateOrShearX)
								{
									rotateVelocity -= ((w * s3 + g * c2) * h + rotateOffset * e) * k;
									rotateOffset += rotateVelocity * t;
									rotateVelocity *= d;
									if (a2 < t)
									{
										break;
									}
									float r2 = rotateOffset * mr + ca;
									c2 = (float)Math.Cos(r2);
									s3 = (float)Math.Sin(r2);
								}
								else if (a2 < t)
								{
									break;
								}
							}
						}
					}
					remaining = a2;
				}
				cx = bone.worldX;
				cy = bone.worldY;
				break;
			}
			case Skeleton.Physics.Pose:
				if (x)
				{
					bone.worldX += xOffset * mix * data.x;
				}
				if (y)
				{
					bone.worldY += yOffset * mix * data.y;
				}
				break;
			}
			if (rotateOrShearX)
			{
				float o = rotateOffset * mix;
				if (data.shearX > 0f)
				{
					float r = 0f;
					float s2;
					float c;
					float a;
					if (data.rotate > 0f)
					{
						r = o * data.rotate;
						s2 = (float)Math.Sin(r);
						c = (float)Math.Cos(r);
						a = bone.b;
						bone.b = c * a - s2 * bone.d;
						bone.d = s2 * a + c * bone.d;
					}
					r += o * data.shearX;
					s2 = (float)Math.Sin(r);
					c = (float)Math.Cos(r);
					a = bone.a;
					bone.a = c * a - s2 * bone.c;
					bone.c = s2 * a + c * bone.c;
				}
				else
				{
					o *= data.rotate;
					float s2 = (float)Math.Sin(o);
					float c = (float)Math.Cos(o);
					float a = bone.a;
					bone.a = c * a - s2 * bone.c;
					bone.c = s2 * a + c * bone.c;
					a = bone.b;
					bone.b = c * a - s2 * bone.d;
					bone.d = s2 * a + c * bone.d;
				}
			}
			if (scaleX)
			{
				float s = 1f + scaleOffset * mix * data.scaleX;
				bone.a *= s;
				bone.c *= s;
			}
			if (physics != Skeleton.Physics.Pose)
			{
				tx = j * bone.a;
				ty = j * bone.c;
			}
			bone.UpdateAppliedTransform();
		}

		public PhysicsConstraintData getData()
		{
			return data;
		}

		public override string ToString()
		{
			return data.name;
		}
	}
}
