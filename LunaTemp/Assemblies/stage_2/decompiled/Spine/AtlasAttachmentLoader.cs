using System;

namespace Spine
{
	public class AtlasAttachmentLoader : AttachmentLoader
	{
		private Atlas[] atlasArray;

		public AtlasAttachmentLoader(params Atlas[] atlasArray)
		{
			if (atlasArray == null)
			{
				throw new ArgumentNullException("atlas", "atlas array cannot be null.");
			}
			this.atlasArray = atlasArray;
		}

		private void LoadSequence(string name, string basePath, Sequence sequence)
		{
			TextureRegion[] regions = sequence.Regions;
			int i = 0;
			for (int j = regions.Length; i < j; i++)
			{
				string path = sequence.GetPath(basePath, i);
				regions[i] = FindRegion(path);
				if (regions[i] == null)
				{
					throw new ArgumentException($"Region not found in atlas: {path} (region attachment: {name})");
				}
			}
		}

		public RegionAttachment NewRegionAttachment(Skin skin, string name, string path, Sequence sequence)
		{
			RegionAttachment attachment = new RegionAttachment(name);
			if (sequence != null)
			{
				LoadSequence(name, path, sequence);
			}
			else
			{
				AtlasRegion region = FindRegion(path);
				if (region == null)
				{
					throw new ArgumentException($"Region not found in atlas: {path} (region attachment: {name})");
				}
				attachment.Region = region;
			}
			return attachment;
		}

		public MeshAttachment NewMeshAttachment(Skin skin, string name, string path, Sequence sequence)
		{
			MeshAttachment attachment = new MeshAttachment(name);
			if (sequence != null)
			{
				LoadSequence(name, path, sequence);
			}
			else
			{
				AtlasRegion region = FindRegion(path);
				if (region == null)
				{
					throw new ArgumentException($"Region not found in atlas: {path} (region attachment: {name})");
				}
				attachment.Region = region;
			}
			return attachment;
		}

		public BoundingBoxAttachment NewBoundingBoxAttachment(Skin skin, string name)
		{
			return new BoundingBoxAttachment(name);
		}

		public PathAttachment NewPathAttachment(Skin skin, string name)
		{
			return new PathAttachment(name);
		}

		public PointAttachment NewPointAttachment(Skin skin, string name)
		{
			return new PointAttachment(name);
		}

		public ClippingAttachment NewClippingAttachment(Skin skin, string name)
		{
			return new ClippingAttachment(name);
		}

		public AtlasRegion FindRegion(string name)
		{
			for (int i = 0; i < atlasArray.Length; i++)
			{
				AtlasRegion region = atlasArray[i].FindRegion(name);
				if (region != null)
				{
					return region;
				}
			}
			return null;
		}
	}
}
