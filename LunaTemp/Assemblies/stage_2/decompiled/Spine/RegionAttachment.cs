using System;

namespace Spine
{
	public class RegionAttachment : Attachment, IHasTextureRegion
	{
		public const int BLX = 0;

		public const int BLY = 1;

		public const int ULX = 2;

		public const int ULY = 3;

		public const int URX = 4;

		public const int URY = 5;

		public const int BRX = 6;

		public const int BRY = 7;

		internal TextureRegion region;

		internal float x;

		internal float y;

		internal float rotation;

		internal float scaleX = 1f;

		internal float scaleY = 1f;

		internal float width;

		internal float height;

		internal float[] offset = new float[8];

		internal float[] uvs = new float[8];

		internal float r = 1f;

		internal float g = 1f;

		internal float b = 1f;

		internal float a = 1f;

		internal Sequence sequence;

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

		public float Width
		{
			get
			{
				return width;
			}
			set
			{
				width = value;
			}
		}

		public float Height
		{
			get
			{
				return height;
			}
			set
			{
				height = value;
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

		public string Path { get; set; }

		public TextureRegion Region
		{
			get
			{
				return region;
			}
			set
			{
				region = value;
			}
		}

		public float[] Offset => offset;

		public float[] UVs => uvs;

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

		public RegionAttachment(string name)
			: base(name)
		{
		}

		public RegionAttachment(RegionAttachment other)
			: base(other)
		{
			region = other.region;
			Path = other.Path;
			x = other.x;
			y = other.y;
			scaleX = other.scaleX;
			scaleY = other.scaleY;
			rotation = other.rotation;
			width = other.width;
			height = other.height;
			Array.Copy(other.uvs, 0, uvs, 0, 8);
			Array.Copy(other.offset, 0, offset, 0, 8);
			r = other.r;
			g = other.g;
			b = other.b;
			a = other.a;
			sequence = ((other.sequence == null) ? null : new Sequence(other.sequence));
		}

		public void UpdateRegion()
		{
			float[] uvs = this.uvs;
			if (this.region == null)
			{
				uvs[0] = 0f;
				uvs[1] = 0f;
				uvs[2] = 0f;
				uvs[3] = 1f;
				uvs[4] = 1f;
				uvs[5] = 1f;
				uvs[6] = 1f;
				uvs[7] = 0f;
				return;
			}
			float width = Width;
			float height = Height;
			float localX2 = width / 2f;
			float localY2 = height / 2f;
			float localX = 0f - localX2;
			float localY = 0f - localY2;
			bool rotated = false;
			if (this.region is AtlasRegion)
			{
				AtlasRegion region = (AtlasRegion)this.region;
				localX += region.offsetX / (float)region.originalWidth * width;
				localY += region.offsetY / (float)region.originalHeight * height;
				if (region.degrees == 90)
				{
					rotated = true;
					localX2 -= ((float)region.originalWidth - region.offsetX - (float)region.packedHeight) / (float)region.originalWidth * width;
					localY2 -= ((float)region.originalHeight - region.offsetY - (float)region.packedWidth) / (float)region.originalHeight * height;
				}
				else
				{
					localX2 -= ((float)region.originalWidth - region.offsetX - (float)region.packedWidth) / (float)region.originalWidth * width;
					localY2 -= ((float)region.originalHeight - region.offsetY - (float)region.packedHeight) / (float)region.originalHeight * height;
				}
			}
			float scaleX = ScaleX;
			float scaleY = ScaleY;
			localX *= scaleX;
			localY *= scaleY;
			localX2 *= scaleX;
			localY2 *= scaleY;
			float r = Rotation * (3.14159265f / 180f);
			float cos = (float)Math.Cos(r);
			float sin = (float)Math.Sin(r);
			float x = X;
			float y = Y;
			float localXCos = localX * cos + x;
			float localXSin = localX * sin;
			float localYCos = localY * cos + y;
			float localYSin = localY * sin;
			float localX2Cos = localX2 * cos + x;
			float localX2Sin = localX2 * sin;
			float localY2Cos = localY2 * cos + y;
			float localY2Sin = localY2 * sin;
			float[] offset = this.offset;
			offset[0] = localXCos - localYSin;
			offset[1] = localYCos + localXSin;
			offset[2] = localXCos - localY2Sin;
			offset[3] = localY2Cos + localXSin;
			offset[4] = localX2Cos - localY2Sin;
			offset[5] = localY2Cos + localX2Sin;
			offset[6] = localX2Cos - localYSin;
			offset[7] = localYCos + localX2Sin;
			if (rotated)
			{
				uvs[0] = this.region.u2;
				uvs[1] = this.region.v;
				uvs[2] = this.region.u2;
				uvs[3] = this.region.v2;
				uvs[4] = this.region.u;
				uvs[5] = this.region.v2;
				uvs[6] = this.region.u;
				uvs[7] = this.region.v;
			}
			else
			{
				uvs[0] = this.region.u2;
				uvs[1] = this.region.v2;
				uvs[2] = this.region.u;
				uvs[3] = this.region.v2;
				uvs[4] = this.region.u;
				uvs[5] = this.region.v;
				uvs[6] = this.region.u2;
				uvs[7] = this.region.v;
			}
		}

		public void ComputeWorldVertices(Slot slot, float[] worldVertices, int offset, int stride = 2)
		{
			if (sequence != null)
			{
				sequence.Apply(slot, this);
			}
			float[] vertexOffset = this.offset;
			Bone bone = slot.Bone;
			float bwx = bone.worldX;
			float bwy = bone.worldY;
			float a = bone.a;
			float b = bone.b;
			float c = bone.c;
			float d = bone.d;
			float offsetX = vertexOffset[6];
			float offsetY = vertexOffset[7];
			worldVertices[offset] = offsetX * a + offsetY * b + bwx;
			worldVertices[offset + 1] = offsetX * c + offsetY * d + bwy;
			offset += stride;
			offsetX = vertexOffset[0];
			offsetY = vertexOffset[1];
			worldVertices[offset] = offsetX * a + offsetY * b + bwx;
			worldVertices[offset + 1] = offsetX * c + offsetY * d + bwy;
			offset += stride;
			offsetX = vertexOffset[2];
			offsetY = vertexOffset[3];
			worldVertices[offset] = offsetX * a + offsetY * b + bwx;
			worldVertices[offset + 1] = offsetX * c + offsetY * d + bwy;
			offset += stride;
			offsetX = vertexOffset[4];
			offsetY = vertexOffset[5];
			worldVertices[offset] = offsetX * a + offsetY * b + bwx;
			worldVertices[offset + 1] = offsetX * c + offsetY * d + bwy;
		}

		public override Attachment Copy()
		{
			return new RegionAttachment(this);
		}
	}
}
