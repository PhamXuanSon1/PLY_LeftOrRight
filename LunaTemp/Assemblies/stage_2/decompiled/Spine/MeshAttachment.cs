using System;

namespace Spine
{
	public class MeshAttachment : VertexAttachment, IHasTextureRegion
	{
		internal TextureRegion region;

		internal string path;

		internal float[] regionUVs;

		internal float[] uvs;

		internal int[] triangles;

		internal float r = 1f;

		internal float g = 1f;

		internal float b = 1f;

		internal float a = 1f;

		internal int hullLength;

		private MeshAttachment parentMesh;

		private Sequence sequence;

		public TextureRegion Region
		{
			get
			{
				return region;
			}
			set
			{
				if (value == null)
				{
					throw new ArgumentNullException("region", "region cannot be null.");
				}
				region = value;
			}
		}

		public int HullLength
		{
			get
			{
				return hullLength;
			}
			set
			{
				hullLength = value;
			}
		}

		public float[] RegionUVs
		{
			get
			{
				return regionUVs;
			}
			set
			{
				regionUVs = value;
			}
		}

		public float[] UVs
		{
			get
			{
				return uvs;
			}
			set
			{
				uvs = value;
			}
		}

		public int[] Triangles
		{
			get
			{
				return triangles;
			}
			set
			{
				triangles = value;
			}
		}

		public float R
		{
			get
			{
				return r;
			}
			set
			{
				r = value;
			}
		}

		public float G
		{
			get
			{
				return g;
			}
			set
			{
				g = value;
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

		public string Path
		{
			get
			{
				return path;
			}
			set
			{
				path = value;
			}
		}

		public Sequence Sequence
		{
			get
			{
				return sequence;
			}
			set
			{
				sequence = value;
			}
		}

		public MeshAttachment ParentMesh
		{
			get
			{
				return parentMesh;
			}
			set
			{
				parentMesh = value;
				if (value != null)
				{
					bones = value.bones;
					vertices = value.vertices;
					worldVerticesLength = value.worldVerticesLength;
					regionUVs = value.regionUVs;
					triangles = value.triangles;
					HullLength = value.HullLength;
					Edges = value.Edges;
					Width = value.Width;
					Height = value.Height;
				}
			}
		}

		public int[] Edges { get; set; }

		public float Width { get; set; }

		public float Height { get; set; }

		public MeshAttachment(string name)
			: base(name)
		{
		}

		protected MeshAttachment(MeshAttachment other)
			: base(other)
		{
			if (parentMesh != null)
			{
				throw new ArgumentException("Use newLinkedMesh to copy a linked mesh.");
			}
			region = other.region;
			path = other.path;
			r = other.r;
			g = other.g;
			b = other.b;
			a = other.a;
			regionUVs = new float[other.regionUVs.Length];
			Array.Copy(other.regionUVs, 0, regionUVs, 0, regionUVs.Length);
			uvs = new float[other.uvs.Length];
			Array.Copy(other.uvs, 0, uvs, 0, uvs.Length);
			triangles = new int[other.triangles.Length];
			Array.Copy(other.triangles, 0, triangles, 0, triangles.Length);
			hullLength = other.hullLength;
			sequence = ((other.sequence == null) ? null : new Sequence(other.sequence));
			if (other.Edges != null)
			{
				Edges = new int[other.Edges.Length];
				Array.Copy(other.Edges, 0, Edges, 0, Edges.Length);
			}
			Width = other.Width;
			Height = other.Height;
		}

		public void UpdateRegion()
		{
			float[] regionUVs = this.regionUVs;
			if (this.uvs == null || this.uvs.Length != regionUVs.Length)
			{
				this.uvs = new float[regionUVs.Length];
			}
			float[] uvs = this.uvs;
			int m = uvs.Length;
			float u;
			float v;
			float width;
			float height;
			if (this.region is AtlasRegion)
			{
				u = this.region.u;
				v = this.region.v;
				AtlasRegion region = (AtlasRegion)this.region;
				float textureWidth = (float)this.region.width / (region.u2 - region.u);
				float textureHeight = (float)this.region.height / (region.v2 - region.v);
				switch (region.degrees)
				{
				case 90:
				{
					u -= ((float)region.originalHeight - region.offsetY - (float)region.packedWidth) / textureWidth;
					v -= ((float)region.originalWidth - region.offsetX - (float)region.packedHeight) / textureHeight;
					width = (float)region.originalHeight / textureWidth;
					height = (float)region.originalWidth / textureHeight;
					for (int j = 0; j < m; j += 2)
					{
						uvs[j] = u + regionUVs[j + 1] * width;
						uvs[j + 1] = v + (1f - regionUVs[j]) * height;
					}
					return;
				}
				case 180:
				{
					u -= ((float)region.originalWidth - region.offsetX - (float)region.packedWidth) / textureWidth;
					v -= region.offsetY / textureHeight;
					width = (float)region.originalWidth / textureWidth;
					height = (float)region.originalHeight / textureHeight;
					for (int k = 0; k < m; k += 2)
					{
						uvs[k] = u + (1f - regionUVs[k]) * width;
						uvs[k + 1] = v + (1f - regionUVs[k + 1]) * height;
					}
					return;
				}
				case 270:
				{
					u -= region.offsetY / textureWidth;
					v -= region.offsetX / textureHeight;
					width = (float)region.originalHeight / textureWidth;
					height = (float)region.originalWidth / textureHeight;
					for (int l = 0; l < m; l += 2)
					{
						uvs[l] = u + (1f - regionUVs[l + 1]) * width;
						uvs[l + 1] = v + regionUVs[l] * height;
					}
					return;
				}
				}
				u -= region.offsetX / textureWidth;
				v -= ((float)region.originalHeight - region.offsetY - (float)region.packedHeight) / textureHeight;
				width = (float)region.originalWidth / textureWidth;
				height = (float)region.originalHeight / textureHeight;
			}
			else if (this.region == null)
			{
				u = (v = 0f);
				width = (height = 1f);
			}
			else
			{
				u = this.region.u;
				v = this.region.v;
				width = this.region.u2 - u;
				height = this.region.v2 - v;
			}
			for (int i = 0; i < m; i += 2)
			{
				uvs[i] = u + regionUVs[i] * width;
				uvs[i + 1] = v + regionUVs[i + 1] * height;
			}
		}

		public override void ComputeWorldVertices(Slot slot, int start, int count, float[] worldVertices, int offset, int stride = 2)
		{
			if (sequence != null)
			{
				sequence.Apply(slot, this);
			}
			base.ComputeWorldVertices(slot, start, count, worldVertices, offset, stride);
		}

		public MeshAttachment NewLinkedMesh()
		{
			MeshAttachment mesh = new MeshAttachment(base.Name);
			mesh.timelineAttachment = timelineAttachment;
			mesh.region = region;
			mesh.path = path;
			mesh.r = r;
			mesh.g = g;
			mesh.b = b;
			mesh.a = a;
			mesh.ParentMesh = ((parentMesh != null) ? parentMesh : this);
			if (mesh.Region != null)
			{
				mesh.UpdateRegion();
			}
			return mesh;
		}

		public override Attachment Copy()
		{
			return (parentMesh != null) ? NewLinkedMesh() : new MeshAttachment(this);
		}
	}
}
