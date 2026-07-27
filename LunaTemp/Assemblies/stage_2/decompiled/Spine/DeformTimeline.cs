using System;

namespace Spine
{
	public class DeformTimeline : CurveTimeline, ISlotTimeline
	{
		private readonly int slotIndex;

		private readonly VertexAttachment attachment;

		internal float[][] vertices;

		public int SlotIndex => slotIndex;

		public VertexAttachment Attachment => attachment;

		public float[][] Vertices => vertices;

		public DeformTimeline(int frameCount, int bezierCount, int slotIndex, VertexAttachment attachment)
			: base(frameCount, bezierCount, 12 + "|" + slotIndex + "|" + attachment.Id)
		{
			this.slotIndex = slotIndex;
			this.attachment = attachment;
			vertices = new float[frameCount][];
		}

		public void SetFrame(int frame, float time, float[] vertices)
		{
			frames[frame] = time;
			this.vertices[frame] = vertices;
		}

		public void setBezier(int bezier, int frame, int value, float time1, float value1, float cx1, float cy1, float cx2, float cy2, float time2, float value2)
		{
			float[] curves = base.curves;
			int i = FrameCount + bezier * 18;
			if (value == 0)
			{
				curves[frame] = 2 + i;
			}
			float tmpx = (time1 - cx1 * 2f + cx2) * 0.03f;
			float tmpy = cy2 * 0.03f - cy1 * 0.06f;
			float dddx = ((cx1 - cx2) * 3f - time1 + time2) * 0.006f;
			float dddy = (cy1 - cy2 + 1f / 3f) * 0.018f;
			float ddx = tmpx * 2f + dddx;
			float ddy = tmpy * 2f + dddy;
			float dx = (cx1 - time1) * 0.3f + tmpx + dddx * (1f / 6f);
			float dy = cy1 * 0.3f + tmpy + dddy * (1f / 6f);
			float x = time1 + dx;
			float y = dy;
			for (int j = i + 18; i < j; i += 2)
			{
				curves[i] = x;
				curves[i + 1] = y;
				dx += ddx;
				dy += ddy;
				ddx += dddx;
				ddy += dddy;
				x += dx;
				y += dy;
			}
		}

		private float GetCurvePercent(float time, int frame)
		{
			float[] curves = base.curves;
			int i = (int)curves[frame];
			switch (i)
			{
			case 0:
			{
				float x = frames[frame];
				return (time - x) / (frames[frame + FrameEntries] - x);
			}
			case 1:
				return 0f;
			default:
			{
				i -= 2;
				if (curves[i] > time)
				{
					float x3 = frames[frame];
					return curves[i + 1] * (time - x3) / (curves[i] - x3);
				}
				int j = i + 18;
				for (i += 2; i < j; i += 2)
				{
					if (curves[i] >= time)
					{
						float x2 = curves[i - 2];
						float y = curves[i - 1];
						return y + (time - x2) / (curves[i] - x2) * (curves[i + 1] - y);
					}
				}
				float x4 = curves[j - 2];
				float y2 = curves[j - 1];
				return y2 + (1f - y2) * (time - x4) / (frames[frame + FrameEntries] - x4);
			}
			}
		}

		public override void Apply(Skeleton skeleton, float lastTime, float time, ExposedList<Event> firedEvents, float alpha, MixBlend blend, MixDirection direction)
		{
			Slot slot = skeleton.slots.Items[slotIndex];
			if (!slot.bone.active || !(slot.attachment is VertexAttachment vertexAttachment) || vertexAttachment.TimelineAttachment != attachment)
			{
				return;
			}
			ExposedList<float> deformArray = slot.deform;
			if (deformArray.Count == 0)
			{
				blend = MixBlend.Setup;
			}
			float[][] vertices = this.vertices;
			int vertexCount = vertices[0].Length;
			float[] frames = base.frames;
			float[] deform;
			if (time < frames[0])
			{
				switch (blend)
				{
				case MixBlend.Setup:
					deformArray.Clear();
					break;
				case MixBlend.First:
					if (alpha == 1f)
					{
						deformArray.Clear();
						break;
					}
					if (deformArray.Capacity < vertexCount)
					{
						deformArray.Capacity = vertexCount;
					}
					deformArray.Count = vertexCount;
					deform = deformArray.Items;
					if (vertexAttachment.bones == null)
					{
						float[] setupVertices3 = vertexAttachment.vertices;
						for (int i2 = 0; i2 < vertexCount; i2++)
						{
							deform[i2] += (setupVertices3[i2] - deform[i2]) * alpha;
						}
					}
					else
					{
						alpha = 1f - alpha;
						for (int i4 = 0; i4 < vertexCount; i4++)
						{
							deform[i4] *= alpha;
						}
					}
					break;
				}
				return;
			}
			if (deformArray.Capacity < vertexCount)
			{
				deformArray.Capacity = vertexCount;
			}
			deformArray.Count = vertexCount;
			deform = deformArray.Items;
			if (time >= frames[frames.Length - 1])
			{
				float[] lastVertices = vertices[frames.Length - 1];
				if (alpha == 1f)
				{
					if (blend == MixBlend.Add)
					{
						if (vertexAttachment.bones == null)
						{
							float[] setupVertices7 = vertexAttachment.vertices;
							for (int i12 = 0; i12 < vertexCount; i12++)
							{
								deform[i12] += lastVertices[i12] - setupVertices7[i12];
							}
						}
						else
						{
							for (int i11 = 0; i11 < vertexCount; i11++)
							{
								deform[i11] += lastVertices[i11];
							}
						}
					}
					else
					{
						Array.Copy(lastVertices, 0, deform, 0, vertexCount);
					}
					return;
				}
				switch (blend)
				{
				case MixBlend.Setup:
					if (vertexAttachment.bones == null)
					{
						float[] setupVertices5 = vertexAttachment.vertices;
						for (int i7 = 0; i7 < vertexCount; i7++)
						{
							float setup2 = setupVertices5[i7];
							deform[i7] = setup2 + (lastVertices[i7] - setup2) * alpha;
						}
					}
					else
					{
						for (int i6 = 0; i6 < vertexCount; i6++)
						{
							deform[i6] = lastVertices[i6] * alpha;
						}
					}
					break;
				case MixBlend.First:
				case MixBlend.Replace:
				{
					for (int i8 = 0; i8 < vertexCount; i8++)
					{
						deform[i8] += (lastVertices[i8] - deform[i8]) * alpha;
					}
					break;
				}
				case MixBlend.Add:
					if (vertexAttachment.bones == null)
					{
						float[] setupVertices6 = vertexAttachment.vertices;
						for (int i10 = 0; i10 < vertexCount; i10++)
						{
							deform[i10] += (lastVertices[i10] - setupVertices6[i10]) * alpha;
						}
					}
					else
					{
						for (int i9 = 0; i9 < vertexCount; i9++)
						{
							deform[i9] += lastVertices[i9] * alpha;
						}
					}
					break;
				}
				return;
			}
			int frame = Timeline.Search(frames, time);
			float percent = GetCurvePercent(time, frame);
			float[] prevVertices = vertices[frame];
			float[] nextVertices = vertices[frame + 1];
			if (alpha == 1f)
			{
				if (blend == MixBlend.Add)
				{
					if (vertexAttachment.bones == null)
					{
						float[] setupVertices4 = vertexAttachment.vertices;
						for (int i5 = 0; i5 < vertexCount; i5++)
						{
							float prev8 = prevVertices[i5];
							deform[i5] += prev8 + (nextVertices[i5] - prev8) * percent - setupVertices4[i5];
						}
					}
					else
					{
						for (int i3 = 0; i3 < vertexCount; i3++)
						{
							float prev7 = prevVertices[i3];
							deform[i3] += prev7 + (nextVertices[i3] - prev7) * percent;
						}
					}
				}
				else
				{
					for (int n = 0; n < vertexCount; n++)
					{
						float prev6 = prevVertices[n];
						deform[n] = prev6 + (nextVertices[n] - prev6) * percent;
					}
				}
				return;
			}
			switch (blend)
			{
			case MixBlend.Setup:
				if (vertexAttachment.bones == null)
				{
					float[] setupVertices = vertexAttachment.vertices;
					for (int j = 0; j < vertexCount; j++)
					{
						float prev2 = prevVertices[j];
						float setup = setupVertices[j];
						deform[j] = setup + (prev2 + (nextVertices[j] - prev2) * percent - setup) * alpha;
					}
				}
				else
				{
					for (int i = 0; i < vertexCount; i++)
					{
						float prev = prevVertices[i];
						deform[i] = (prev + (nextVertices[i] - prev) * percent) * alpha;
					}
				}
				break;
			case MixBlend.First:
			case MixBlend.Replace:
			{
				for (int k = 0; k < vertexCount; k++)
				{
					float prev3 = prevVertices[k];
					deform[k] += (prev3 + (nextVertices[k] - prev3) * percent - deform[k]) * alpha;
				}
				break;
			}
			case MixBlend.Add:
				if (vertexAttachment.bones == null)
				{
					float[] setupVertices2 = vertexAttachment.vertices;
					for (int m = 0; m < vertexCount; m++)
					{
						float prev5 = prevVertices[m];
						deform[m] += (prev5 + (nextVertices[m] - prev5) * percent - setupVertices2[m]) * alpha;
					}
				}
				else
				{
					for (int l = 0; l < vertexCount; l++)
					{
						float prev4 = prevVertices[l];
						deform[l] += (prev4 + (nextVertices[l] - prev4) * percent) * alpha;
					}
				}
				break;
			}
		}
	}
}
