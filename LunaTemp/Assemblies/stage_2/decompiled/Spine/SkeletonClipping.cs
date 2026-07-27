namespace Spine
{
	public class SkeletonClipping
	{
		internal readonly Triangulator triangulator = new Triangulator();

		internal readonly ExposedList<float> clippingPolygon = new ExposedList<float>();

		internal readonly ExposedList<float> clipOutput = new ExposedList<float>(128);

		internal readonly ExposedList<float> clippedVertices = new ExposedList<float>(128);

		internal readonly ExposedList<int> clippedTriangles = new ExposedList<int>(128);

		internal readonly ExposedList<float> clippedUVs = new ExposedList<float>(128);

		internal readonly ExposedList<float> scratch = new ExposedList<float>();

		internal ClippingAttachment clipAttachment;

		internal ExposedList<ExposedList<float>> clippingPolygons;

		public ExposedList<float> ClippedVertices => clippedVertices;

		public ExposedList<int> ClippedTriangles => clippedTriangles;

		public ExposedList<float> ClippedUVs => clippedUVs;

		public bool IsClipping => clipAttachment != null;

		public int ClipStart(Slot slot, ClippingAttachment clip)
		{
			if (clipAttachment != null)
			{
				return 0;
			}
			clipAttachment = clip;
			int i = clip.worldVerticesLength;
			float[] vertices = clippingPolygon.Resize(i).Items;
			clip.ComputeWorldVertices(slot, 0, i, vertices, 0);
			MakeClockwise(clippingPolygon);
			clippingPolygons = triangulator.Decompose(clippingPolygon, triangulator.Triangulate(clippingPolygon));
			foreach (ExposedList<float> polygon in clippingPolygons)
			{
				MakeClockwise(polygon);
				polygon.Add(polygon.Items[0]);
				polygon.Add(polygon.Items[1]);
			}
			return clippingPolygons.Count;
		}

		public void ClipEnd(Slot slot)
		{
			if (clipAttachment != null && clipAttachment.endSlot == slot.data)
			{
				ClipEnd();
			}
		}

		public void ClipEnd()
		{
			if (clipAttachment != null)
			{
				clipAttachment = null;
				clippingPolygons = null;
				clippedVertices.Clear();
				clippedTriangles.Clear();
				clippingPolygon.Clear();
			}
		}

		public void ClipTriangles(float[] vertices, int[] triangles, int trianglesLength)
		{
			ExposedList<float> clipOutput = this.clipOutput;
			ExposedList<float> clippedVertices = this.clippedVertices;
			ExposedList<int> clippedTriangles = this.clippedTriangles;
			ExposedList<float>[] polygons = clippingPolygons.Items;
			int polygonsCount = clippingPolygons.Count;
			int index = 0;
			clippedVertices.Clear();
			clippedTriangles.Clear();
			for (int i = 0; i < trianglesLength; i += 3)
			{
				int vertexOffset = triangles[i] << 1;
				float x2 = vertices[vertexOffset];
				float y2 = vertices[vertexOffset + 1];
				vertexOffset = triangles[i + 1] << 1;
				float x3 = vertices[vertexOffset];
				float y3 = vertices[vertexOffset + 1];
				vertexOffset = triangles[i + 2] << 1;
				float x4 = vertices[vertexOffset];
				float y4 = vertices[vertexOffset + 1];
				for (int p = 0; p < polygonsCount; p++)
				{
					int s = clippedVertices.Count;
					if (Clip(x2, y2, x3, y3, x4, y4, polygons[p], clipOutput))
					{
						int clipOutputLength = clipOutput.Count;
						if (clipOutputLength != 0)
						{
							int clipOutputCount = clipOutputLength >> 1;
							float[] clipOutputItems = clipOutput.Items;
							float[] clippedVerticesItems2 = clippedVertices.Resize(s + clipOutputCount * 2).Items;
							int ii2 = 0;
							while (ii2 < clipOutputLength)
							{
								float x = clipOutputItems[ii2];
								float y = clipOutputItems[ii2 + 1];
								clippedVerticesItems2[s] = x;
								clippedVerticesItems2[s + 1] = y;
								ii2 += 2;
								s += 2;
							}
							s = clippedTriangles.Count;
							int[] clippedTrianglesItems2 = clippedTriangles.Resize(s + 3 * (clipOutputCount - 2)).Items;
							clipOutputCount--;
							int ii = 1;
							while (ii < clipOutputCount)
							{
								clippedTrianglesItems2[s] = index;
								clippedTrianglesItems2[s + 1] = index + ii;
								clippedTrianglesItems2[s + 2] = index + ii + 1;
								ii++;
								s += 3;
							}
							index += clipOutputCount + 1;
						}
						continue;
					}
					float[] clippedVerticesItems = clippedVertices.Resize(s + 6).Items;
					clippedVerticesItems[s] = x2;
					clippedVerticesItems[s + 1] = y2;
					clippedVerticesItems[s + 2] = x3;
					clippedVerticesItems[s + 3] = y3;
					clippedVerticesItems[s + 4] = x4;
					clippedVerticesItems[s + 5] = y4;
					s = clippedTriangles.Count;
					int[] clippedTrianglesItems = clippedTriangles.Resize(s + 3).Items;
					clippedTrianglesItems[s] = index;
					clippedTrianglesItems[s + 1] = index + 1;
					clippedTrianglesItems[s + 2] = index + 2;
					index += 3;
					break;
				}
			}
		}

		public void ClipTriangles(float[] vertices, int[] triangles, int trianglesLength, float[] uvs)
		{
			ExposedList<float> clipOutput = this.clipOutput;
			ExposedList<float> clippedVertices = this.clippedVertices;
			ExposedList<int> clippedTriangles = this.clippedTriangles;
			ExposedList<float>[] polygons = clippingPolygons.Items;
			int polygonsCount = clippingPolygons.Count;
			int index = 0;
			clippedVertices.Clear();
			clippedUVs.Clear();
			clippedTriangles.Clear();
			for (int i = 0; i < trianglesLength; i += 3)
			{
				int vertexOffset = triangles[i] << 1;
				float x2 = vertices[vertexOffset];
				float y2 = vertices[vertexOffset + 1];
				float u1 = uvs[vertexOffset];
				float v1 = uvs[vertexOffset + 1];
				vertexOffset = triangles[i + 1] << 1;
				float x3 = vertices[vertexOffset];
				float y3 = vertices[vertexOffset + 1];
				float u2 = uvs[vertexOffset];
				float v2 = uvs[vertexOffset + 1];
				vertexOffset = triangles[i + 2] << 1;
				float x4 = vertices[vertexOffset];
				float y4 = vertices[vertexOffset + 1];
				float u3 = uvs[vertexOffset];
				float v3 = uvs[vertexOffset + 1];
				for (int p = 0; p < polygonsCount; p++)
				{
					int s = clippedVertices.Count;
					if (Clip(x2, y2, x3, y3, x4, y4, polygons[p], clipOutput))
					{
						int clipOutputLength = clipOutput.Count;
						if (clipOutputLength != 0)
						{
							float d2 = y3 - y4;
							float d3 = x4 - x3;
							float d4 = x2 - x4;
							float d5 = y4 - y2;
							float d = 1f / (d2 * d4 + d3 * (y2 - y4));
							int clipOutputCount = clipOutputLength >> 1;
							float[] clipOutputItems = clipOutput.Items;
							float[] clippedVerticesItems2 = clippedVertices.Resize(s + clipOutputCount * 2).Items;
							float[] clippedUVsItems2 = clippedUVs.Resize(s + clipOutputCount * 2).Items;
							int ii2 = 0;
							while (ii2 < clipOutputLength)
							{
								float x = clipOutputItems[ii2];
								float y = clipOutputItems[ii2 + 1];
								clippedVerticesItems2[s] = x;
								clippedVerticesItems2[s + 1] = y;
								float c2 = x - x4;
								float c3 = y - y4;
								float a = (d2 * c2 + d3 * c3) * d;
								float b = (d5 * c2 + d4 * c3) * d;
								float c = 1f - a - b;
								clippedUVsItems2[s] = u1 * a + u2 * b + u3 * c;
								clippedUVsItems2[s + 1] = v1 * a + v2 * b + v3 * c;
								ii2 += 2;
								s += 2;
							}
							s = clippedTriangles.Count;
							int[] clippedTrianglesItems2 = clippedTriangles.Resize(s + 3 * (clipOutputCount - 2)).Items;
							clipOutputCount--;
							int ii = 1;
							while (ii < clipOutputCount)
							{
								clippedTrianglesItems2[s] = index;
								clippedTrianglesItems2[s + 1] = index + ii;
								clippedTrianglesItems2[s + 2] = index + ii + 1;
								ii++;
								s += 3;
							}
							index += clipOutputCount + 1;
						}
						continue;
					}
					float[] clippedVerticesItems = clippedVertices.Resize(s + 6).Items;
					float[] clippedUVsItems = clippedUVs.Resize(s + 6).Items;
					clippedVerticesItems[s] = x2;
					clippedVerticesItems[s + 1] = y2;
					clippedVerticesItems[s + 2] = x3;
					clippedVerticesItems[s + 3] = y3;
					clippedVerticesItems[s + 4] = x4;
					clippedVerticesItems[s + 5] = y4;
					clippedUVsItems[s] = u1;
					clippedUVsItems[s + 1] = v1;
					clippedUVsItems[s + 2] = u2;
					clippedUVsItems[s + 3] = v2;
					clippedUVsItems[s + 4] = u3;
					clippedUVsItems[s + 5] = v3;
					s = clippedTriangles.Count;
					int[] clippedTrianglesItems = clippedTriangles.Resize(s + 3).Items;
					clippedTrianglesItems[s] = index;
					clippedTrianglesItems[s + 1] = index + 1;
					clippedTrianglesItems[s + 2] = index + 2;
					index += 3;
					break;
				}
			}
		}

		internal bool Clip(float x1, float y1, float x2, float y2, float x3, float y3, ExposedList<float> clippingArea, ExposedList<float> output)
		{
			ExposedList<float> originalOutput = output;
			bool clipped = false;
			ExposedList<float> input = null;
			if (clippingArea.Count % 4 >= 2)
			{
				input = output;
				output = scratch;
			}
			else
			{
				input = scratch;
			}
			input.Clear();
			input.Add(x1);
			input.Add(y1);
			input.Add(x2);
			input.Add(y2);
			input.Add(x3);
			input.Add(y3);
			input.Add(x1);
			input.Add(y1);
			output.Clear();
			int clippingVerticesLast = clippingArea.Count - 4;
			float[] clippingVertices = clippingArea.Items;
			int j = 0;
			while (true)
			{
				float edgeX = clippingVertices[j];
				float edgeY = clippingVertices[j + 1];
				float ex = edgeX - clippingVertices[j + 2];
				float ey = edgeY - clippingVertices[j + 3];
				int outputStart = output.Count;
				float[] inputVertices = input.Items;
				int ii = 0;
				int nn = input.Count - 2;
				while (ii < nn)
				{
					float inputX = inputVertices[ii];
					float inputY = inputVertices[ii + 1];
					ii += 2;
					float inputX2 = inputVertices[ii];
					float inputY2 = inputVertices[ii + 1];
					bool s2 = ey * (edgeX - inputX2) > ex * (edgeY - inputY2);
					float s1 = ey * (edgeX - inputX) - ex * (edgeY - inputY);
					if (s1 > 0f)
					{
						if (s2)
						{
							output.Add(inputX2);
							output.Add(inputY2);
							continue;
						}
						float ix2 = inputX2 - inputX;
						float iy2 = inputY2 - inputY;
						float t2 = s1 / (ix2 * ey - iy2 * ex);
						if (!(t2 >= 0f) || !(t2 <= 1f))
						{
							output.Add(inputX2);
							output.Add(inputY2);
							continue;
						}
						output.Add(inputX + ix2 * t2);
						output.Add(inputY + iy2 * t2);
					}
					else if (s2)
					{
						float ix = inputX2 - inputX;
						float iy = inputY2 - inputY;
						float t = s1 / (ix * ey - iy * ex);
						if (!(t >= 0f) || !(t <= 1f))
						{
							output.Add(inputX2);
							output.Add(inputY2);
							continue;
						}
						output.Add(inputX + ix * t);
						output.Add(inputY + iy * t);
						output.Add(inputX2);
						output.Add(inputY2);
					}
					clipped = true;
				}
				if (outputStart == output.Count)
				{
					originalOutput.Clear();
					return true;
				}
				output.Add(output.Items[0]);
				output.Add(output.Items[1]);
				if (j == clippingVerticesLast)
				{
					break;
				}
				ExposedList<float> temp = output;
				output = input;
				output.Clear();
				input = temp;
				j += 2;
			}
			if (originalOutput != output)
			{
				originalOutput.Clear();
				int i = 0;
				for (int k = output.Count - 2; i < k; i++)
				{
					originalOutput.Add(output.Items[i]);
				}
			}
			else
			{
				originalOutput.Resize(originalOutput.Count - 2);
			}
			return clipped;
		}

		public static void MakeClockwise(ExposedList<float> polygon)
		{
			float[] vertices = polygon.Items;
			int verticeslength = polygon.Count;
			float area = vertices[verticeslength - 2] * vertices[1] - vertices[0] * vertices[verticeslength - 1];
			int j = 0;
			for (int l = verticeslength - 3; j < l; j += 2)
			{
				float p1x = vertices[j];
				float p1y = vertices[j + 1];
				float p2x = vertices[j + 2];
				float p2y = vertices[j + 3];
				area += p1x * p2y - p2x * p1y;
			}
			if (!(area < 0f))
			{
				int i = 0;
				int lastX = verticeslength - 2;
				for (int k = verticeslength >> 1; i < k; i += 2)
				{
					float x = vertices[i];
					float y = vertices[i + 1];
					int other = lastX - i;
					vertices[i] = vertices[other];
					vertices[i + 1] = vertices[other + 1];
					vertices[other] = x;
					vertices[other + 1] = y;
				}
			}
		}
	}
}
