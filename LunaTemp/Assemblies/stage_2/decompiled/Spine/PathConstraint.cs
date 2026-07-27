using System;

namespace Spine
{
	public class PathConstraint : IUpdatable
	{
		private const int NONE = -1;

		private const int BEFORE = -2;

		private const int AFTER = -3;

		private const float Epsilon = 1E-05f;

		internal readonly PathConstraintData data;

		internal readonly ExposedList<Bone> bones;

		internal Slot target;

		internal float position;

		internal float spacing;

		internal float mixRotate;

		internal float mixX;

		internal float mixY;

		internal bool active;

		internal readonly ExposedList<float> spaces = new ExposedList<float>();

		internal readonly ExposedList<float> positions = new ExposedList<float>();

		internal readonly ExposedList<float> world = new ExposedList<float>();

		internal readonly ExposedList<float> curves = new ExposedList<float>();

		internal readonly ExposedList<float> lengths = new ExposedList<float>();

		internal readonly float[] segments = new float[10];

		public float Position
		{
			get
			{
				return position;
			}
			set
			{
				position = value;
			}
		}

		public float Spacing
		{
			get
			{
				return spacing;
			}
			set
			{
				spacing = value;
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

		public ExposedList<Bone> Bones => bones;

		public Slot Target
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

		public bool Active => active;

		public PathConstraintData Data => data;

		public PathConstraint(PathConstraintData data, Skeleton skeleton)
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
			bones = new ExposedList<Bone>(data.Bones.Count);
			foreach (BoneData boneData in data.bones)
			{
				bones.Add(skeleton.bones.Items[boneData.index]);
			}
			target = skeleton.slots.Items[data.target.index];
			position = data.position;
			spacing = data.spacing;
			mixRotate = data.mixRotate;
			mixX = data.mixX;
			mixY = data.mixY;
		}

		public PathConstraint(PathConstraint constraint, Skeleton skeleton)
			: this(constraint.data, skeleton)
		{
			position = constraint.position;
			spacing = constraint.spacing;
			mixRotate = constraint.mixRotate;
			mixX = constraint.mixX;
			mixY = constraint.mixY;
		}

		public static void ArraysFill(float[] a, int fromIndex, int toIndex, float val)
		{
			for (int i = fromIndex; i < toIndex; i++)
			{
				a[i] = val;
			}
		}

		public void SetToSetupPose()
		{
			PathConstraintData data = this.data;
			position = data.position;
			spacing = data.spacing;
			mixRotate = data.mixRotate;
			mixX = data.mixX;
			mixY = data.mixY;
		}

		public void Update(Skeleton.Physics physics)
		{
			if (!(target.Attachment is PathAttachment attachment))
			{
				return;
			}
			float mixRotate = this.mixRotate;
			float mixX = this.mixX;
			float mixY = this.mixY;
			if (mixRotate == 0f && mixX == 0f && mixY == 0f)
			{
				return;
			}
			PathConstraintData data = this.data;
			bool tangents = data.rotateMode == RotateMode.Tangent;
			bool scale = data.rotateMode == RotateMode.ChainScale;
			int boneCount = bones.Count;
			int spacesCount = (tangents ? boneCount : (boneCount + 1));
			Bone[] bonesItems = bones.Items;
			float[] spaces = this.spaces.Resize(spacesCount).Items;
			float[] lengths = (scale ? this.lengths.Resize(boneCount).Items : null);
			float spacing = this.spacing;
			switch (data.spacingMode)
			{
			case SpacingMode.Percent:
				if (scale)
				{
					int j = 0;
					for (int n = spacesCount - 1; j < n; j++)
					{
						Bone bone2 = bonesItems[j];
						float setupLength = bone2.data.length;
						float x2 = setupLength * bone2.a;
						float y2 = setupLength * bone2.c;
						lengths[j] = (float)Math.Sqrt(x2 * x2 + y2 * y2);
					}
				}
				ArraysFill(spaces, 1, spacesCount, spacing);
				break;
			case SpacingMode.Proportional:
			{
				float sum = 0f;
				int l = 0;
				int n2 = spacesCount - 1;
				while (l < n2)
				{
					Bone bone3 = bonesItems[l];
					float setupLength2 = bone3.data.length;
					if (setupLength2 < 1E-05f)
					{
						if (scale)
						{
							lengths[l] = 0f;
						}
						spaces[++l] = spacing;
						continue;
					}
					float x3 = setupLength2 * bone3.a;
					float y3 = setupLength2 * bone3.c;
					float length3 = (float)Math.Sqrt(x3 * x3 + y3 * y3);
					if (scale)
					{
						lengths[l] = length3;
					}
					spaces[++l] = length3;
					sum += length3;
				}
				if (sum > 0f)
				{
					sum = (float)spacesCount / sum * spacing;
					for (int k = 1; k < spacesCount; k++)
					{
						spaces[k] *= sum;
					}
				}
				break;
			}
			default:
			{
				bool lengthSpacing = data.spacingMode == SpacingMode.Length;
				int m = 0;
				int n3 = spacesCount - 1;
				while (m < n3)
				{
					Bone bone4 = bonesItems[m];
					float setupLength3 = bone4.data.length;
					if (setupLength3 < 1E-05f)
					{
						if (scale)
						{
							lengths[m] = 0f;
						}
						spaces[++m] = spacing;
						continue;
					}
					float x4 = setupLength3 * bone4.a;
					float y4 = setupLength3 * bone4.c;
					float length4 = (float)Math.Sqrt(x4 * x4 + y4 * y4);
					if (scale)
					{
						lengths[m] = length4;
					}
					spaces[++m] = (lengthSpacing ? (setupLength3 + spacing) : spacing) * length4 / setupLength3;
				}
				break;
			}
			}
			float[] positions = ComputeWorldPositions(attachment, spacesCount, tangents);
			float boneX = positions[0];
			float boneY = positions[1];
			float offsetRotation = data.offsetRotation;
			bool tip;
			if (offsetRotation == 0f)
			{
				tip = data.rotateMode == RotateMode.Chain;
			}
			else
			{
				tip = false;
				Bone p2 = target.bone;
				offsetRotation *= ((p2.a * p2.d - p2.b * p2.c > 0f) ? (3.14159265f / 180f) : (-3.14159265f / 180f));
			}
			int i = 0;
			int p = 3;
			while (i < boneCount)
			{
				Bone bone = bonesItems[i];
				bone.worldX += (boneX - bone.worldX) * mixX;
				bone.worldY += (boneY - bone.worldY) * mixY;
				float x = positions[p];
				float y = positions[p + 1];
				float dx = x - boneX;
				float dy = y - boneY;
				if (scale)
				{
					float length2 = lengths[i];
					if (length2 >= 1E-05f)
					{
						float s = ((float)Math.Sqrt(dx * dx + dy * dy) / length2 - 1f) * mixRotate + 1f;
						bone.a *= s;
						bone.c *= s;
					}
				}
				boneX = x;
				boneY = y;
				if (mixRotate > 0f)
				{
					float a = bone.a;
					float b = bone.b;
					float c = bone.c;
					float d = bone.d;
					float r = (tangents ? positions[p - 1] : ((!(spaces[i + 1] < 1E-05f)) ? MathUtils.Atan2(dy, dx) : positions[p + 2]));
					r -= MathUtils.Atan2(c, a);
					float cos;
					float sin;
					if (tip)
					{
						cos = MathUtils.Cos(r);
						sin = MathUtils.Sin(r);
						float length = bone.data.length;
						boneX += (length * (cos * a - sin * c) - dx) * mixRotate;
						boneY += (length * (sin * a + cos * c) - dy) * mixRotate;
					}
					else
					{
						r += offsetRotation;
					}
					if (r > 3.14159265f)
					{
						r -= 3.14159265f * 2f;
					}
					else if (r < -3.14159265f)
					{
						r += 3.14159265f * 2f;
					}
					r *= mixRotate;
					cos = MathUtils.Cos(r);
					sin = MathUtils.Sin(r);
					bone.a = cos * a - sin * c;
					bone.b = cos * b - sin * d;
					bone.c = sin * a + cos * c;
					bone.d = sin * b + cos * d;
				}
				bone.UpdateAppliedTransform();
				i++;
				p += 3;
			}
		}

		private float[] ComputeWorldPositions(PathAttachment path, int spacesCount, bool tangents)
		{
			Slot target = this.target;
			float position = this.position;
			float[] spaces = this.spaces.Items;
			float[] output = positions.Resize(spacesCount * 3 + 2).Items;
			bool closed = path.Closed;
			int verticesLength = path.WorldVerticesLength;
			int curveCount = verticesLength / 6;
			int prevCurve = -1;
			float[] world;
			float pathLength;
			float multiplier;
			if (!path.ConstantSpeed)
			{
				float[] lengths = path.Lengths;
				curveCount -= (closed ? 1 : 2);
				pathLength = lengths[curveCount];
				if (data.positionMode == PositionMode.Percent)
				{
					position *= pathLength;
				}
				switch (data.spacingMode)
				{
				case SpacingMode.Percent:
					multiplier = pathLength;
					break;
				case SpacingMode.Proportional:
					multiplier = pathLength / (float)spacesCount;
					break;
				default:
					multiplier = 1f;
					break;
				}
				world = this.world.Resize(8).Items;
				int k = 0;
				int o2 = 0;
				int curve2 = 0;
				for (; k < spacesCount; k++, o2 += 3)
				{
					float space2 = spaces[k] * multiplier;
					position += space2;
					float p2 = position;
					if (closed)
					{
						p2 %= pathLength;
						if (p2 < 0f)
						{
							p2 += pathLength;
						}
						curve2 = 0;
					}
					else
					{
						if (p2 < 0f)
						{
							if (prevCurve != -2)
							{
								prevCurve = -2;
								path.ComputeWorldVertices(target, 2, 4, world, 0);
							}
							AddBeforePosition(p2, world, 0, output, o2);
							continue;
						}
						if (p2 > pathLength)
						{
							if (prevCurve != -3)
							{
								prevCurve = -3;
								path.ComputeWorldVertices(target, verticesLength - 6, 4, world, 0);
							}
							AddAfterPosition(p2 - pathLength, world, 0, output, o2);
							continue;
						}
					}
					float length3;
					while (true)
					{
						length3 = lengths[curve2];
						if (!(p2 > length3))
						{
							break;
						}
						curve2++;
					}
					if (curve2 == 0)
					{
						p2 /= length3;
					}
					else
					{
						float prev3 = lengths[curve2 - 1];
						p2 = (p2 - prev3) / (length3 - prev3);
					}
					if (curve2 != prevCurve)
					{
						prevCurve = curve2;
						if (closed && curve2 == curveCount)
						{
							path.ComputeWorldVertices(target, verticesLength - 4, 4, world, 0);
							path.ComputeWorldVertices(target, 0, 4, world, 4);
						}
						else
						{
							path.ComputeWorldVertices(target, curve2 * 6 + 2, 8, world, 0);
						}
					}
					AddCurvePosition(p2, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], output, o2, tangents || (k > 0 && space2 < 1E-05f));
				}
				return output;
			}
			if (closed)
			{
				verticesLength += 2;
				world = this.world.Resize(verticesLength).Items;
				path.ComputeWorldVertices(target, 2, verticesLength - 4, world, 0);
				path.ComputeWorldVertices(target, 0, 2, world, verticesLength - 4);
				world[verticesLength - 2] = world[0];
				world[verticesLength - 1] = world[1];
			}
			else
			{
				curveCount--;
				verticesLength -= 4;
				world = this.world.Resize(verticesLength).Items;
				path.ComputeWorldVertices(target, 2, verticesLength, world, 0);
			}
			float[] curves = this.curves.Resize(curveCount).Items;
			pathLength = 0f;
			float x1 = world[0];
			float y1 = world[1];
			float cx1 = 0f;
			float cy1 = 0f;
			float cx2 = 0f;
			float cy2 = 0f;
			float x2 = 0f;
			float y2 = 0f;
			int j = 0;
			int w = 2;
			while (j < curveCount)
			{
				cx1 = world[w];
				cy1 = world[w + 1];
				cx2 = world[w + 2];
				cy2 = world[w + 3];
				x2 = world[w + 4];
				y2 = world[w + 5];
				float tmpx = (x1 - cx1 * 2f + cx2) * 0.1875f;
				float tmpy = (y1 - cy1 * 2f + cy2) * 0.1875f;
				float dddfx = ((cx1 - cx2) * 3f - x1 + x2) * (3f / 32f);
				float dddfy = ((cy1 - cy2) * 3f - y1 + y2) * (3f / 32f);
				float ddfx = tmpx * 2f + dddfx;
				float ddfy = tmpy * 2f + dddfy;
				float dfx = (cx1 - x1) * 0.75f + tmpx + dddfx * (1f / 6f);
				float dfy = (cy1 - y1) * 0.75f + tmpy + dddfy * (1f / 6f);
				pathLength += (float)Math.Sqrt(dfx * dfx + dfy * dfy);
				dfx += ddfx;
				dfy += ddfy;
				ddfx += dddfx;
				ddfy += dddfy;
				pathLength += (float)Math.Sqrt(dfx * dfx + dfy * dfy);
				dfx += ddfx;
				dfy += ddfy;
				pathLength += (float)Math.Sqrt(dfx * dfx + dfy * dfy);
				dfx += ddfx + dddfx;
				dfy += ddfy + dddfy;
				pathLength = (curves[j] = pathLength + (float)Math.Sqrt(dfx * dfx + dfy * dfy));
				x1 = x2;
				y1 = y2;
				j++;
				w += 6;
			}
			if (data.positionMode == PositionMode.Percent)
			{
				position *= pathLength;
			}
			switch (data.spacingMode)
			{
			case SpacingMode.Percent:
				multiplier = pathLength;
				break;
			case SpacingMode.Proportional:
				multiplier = pathLength / (float)spacesCount;
				break;
			default:
				multiplier = 1f;
				break;
			}
			float[] segments = this.segments;
			float curveLength = 0f;
			int i = 0;
			int o = 0;
			int curve = 0;
			int segment = 0;
			for (; i < spacesCount; i++, o += 3)
			{
				float space = spaces[i] * multiplier;
				position += space;
				float p = position;
				if (closed)
				{
					p %= pathLength;
					if (p < 0f)
					{
						p += pathLength;
					}
					curve = 0;
				}
				else
				{
					if (p < 0f)
					{
						AddBeforePosition(p, world, 0, output, o);
						continue;
					}
					if (p > pathLength)
					{
						AddAfterPosition(p - pathLength, world, verticesLength - 4, output, o);
						continue;
					}
				}
				float length2;
				while (true)
				{
					length2 = curves[curve];
					if (!(p > length2))
					{
						break;
					}
					curve++;
				}
				if (curve == 0)
				{
					p /= length2;
				}
				else
				{
					float prev2 = curves[curve - 1];
					p = (p - prev2) / (length2 - prev2);
				}
				if (curve != prevCurve)
				{
					prevCurve = curve;
					int ii = curve * 6;
					x1 = world[ii];
					y1 = world[ii + 1];
					cx1 = world[ii + 2];
					cy1 = world[ii + 3];
					cx2 = world[ii + 4];
					cy2 = world[ii + 5];
					x2 = world[ii + 6];
					y2 = world[ii + 7];
					float tmpx = (x1 - cx1 * 2f + cx2) * 0.03f;
					float tmpy = (y1 - cy1 * 2f + cy2) * 0.03f;
					float dddfx = ((cx1 - cx2) * 3f - x1 + x2) * 0.006f;
					float dddfy = ((cy1 - cy2) * 3f - y1 + y2) * 0.006f;
					float ddfx = tmpx * 2f + dddfx;
					float ddfy = tmpy * 2f + dddfy;
					float dfx = (cx1 - x1) * 0.3f + tmpx + dddfx * (1f / 6f);
					float dfy = (cy1 - y1) * 0.3f + tmpy + dddfy * (1f / 6f);
					curveLength = (segments[0] = (float)Math.Sqrt(dfx * dfx + dfy * dfy));
					for (ii = 1; ii < 8; ii++)
					{
						dfx += ddfx;
						dfy += ddfy;
						ddfx += dddfx;
						ddfy += dddfy;
						curveLength = (segments[ii] = curveLength + (float)Math.Sqrt(dfx * dfx + dfy * dfy));
					}
					dfx += ddfx;
					dfy += ddfy;
					curveLength = (segments[8] = curveLength + (float)Math.Sqrt(dfx * dfx + dfy * dfy));
					dfx += ddfx + dddfx;
					dfy += ddfy + dddfy;
					curveLength = (segments[9] = curveLength + (float)Math.Sqrt(dfx * dfx + dfy * dfy));
					segment = 0;
				}
				p *= curveLength;
				float length;
				while (true)
				{
					length = segments[segment];
					if (!(p > length))
					{
						break;
					}
					segment++;
				}
				if (segment == 0)
				{
					p /= length;
				}
				else
				{
					float prev = segments[segment - 1];
					p = (float)segment + (p - prev) / (length - prev);
				}
				AddCurvePosition(p * 0.1f, x1, y1, cx1, cy1, cx2, cy2, x2, y2, output, o, tangents || (i > 0 && space < 1E-05f));
			}
			return output;
		}

		private static void AddBeforePosition(float p, float[] temp, int i, float[] output, int o)
		{
			float x1 = temp[i];
			float y1 = temp[i + 1];
			float dx = temp[i + 2] - x1;
			float dy = temp[i + 3] - y1;
			float r = MathUtils.Atan2(dy, dx);
			output[o] = x1 + p * MathUtils.Cos(r);
			output[o + 1] = y1 + p * MathUtils.Sin(r);
			output[o + 2] = r;
		}

		private static void AddAfterPosition(float p, float[] temp, int i, float[] output, int o)
		{
			float x1 = temp[i + 2];
			float y1 = temp[i + 3];
			float dx = x1 - temp[i];
			float dy = y1 - temp[i + 1];
			float r = MathUtils.Atan2(dy, dx);
			output[o] = x1 + p * MathUtils.Cos(r);
			output[o + 1] = y1 + p * MathUtils.Sin(r);
			output[o + 2] = r;
		}

		private static void AddCurvePosition(float p, float x1, float y1, float cx1, float cy1, float cx2, float cy2, float x2, float y2, float[] output, int o, bool tangents)
		{
			if (p < 1E-05f || float.IsNaN(p))
			{
				output[o] = x1;
				output[o + 1] = y1;
				output[o + 2] = (float)Math.Atan2(cy1 - y1, cx1 - x1);
				return;
			}
			float tt = p * p;
			float ttt = tt * p;
			float u = 1f - p;
			float uu = u * u;
			float uuu = uu * u;
			float ut = u * p;
			float ut2 = ut * 3f;
			float uut3 = u * ut2;
			float utt3 = ut2 * p;
			float x3 = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt;
			float y3 = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
			output[o] = x3;
			output[o + 1] = y3;
			if (tangents)
			{
				if (p < 0.001f)
				{
					output[o + 2] = (float)Math.Atan2(cy1 - y1, cx1 - x1);
				}
				else
				{
					output[o + 2] = (float)Math.Atan2(y3 - (y1 * uu + cy1 * ut * 2f + cy2 * tt), x3 - (x1 * uu + cx1 * ut * 2f + cx2 * tt));
				}
			}
		}

		public override string ToString()
		{
			return data.name;
		}
	}
}
