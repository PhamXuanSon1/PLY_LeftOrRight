using UnityEngine;

namespace Spine.Unity.AttachmentTools
{
	public static class AttachmentCloneExtensions
	{
		public static Attachment GetRemappedClone(this Attachment o, Sprite sprite, Material sourceMaterial, bool premultiplyAlpha = true, bool cloneMeshAsLinked = true, bool useOriginalRegionSize = false, bool pivotShiftsMeshUVCoords = true, bool useOriginalRegionScale = false, TextureFormat pmaCloneTextureFormat = TextureFormat.RGBA32, bool pmaCloneMipmaps = false)
		{
			AtlasRegion atlasRegion = (premultiplyAlpha ? sprite.ToAtlasRegionPMAClone(sourceMaterial, pmaCloneTextureFormat, pmaCloneMipmaps) : sprite.ToAtlasRegion(new Material(sourceMaterial)
			{
				mainTexture = sprite.texture
			}));
			if (!pivotShiftsMeshUVCoords && o is MeshAttachment)
			{
				atlasRegion.offsetX = 0f;
				atlasRegion.offsetY = 0f;
			}
			float scale = 1f / sprite.pixelsPerUnit;
			if (useOriginalRegionScale && o is RegionAttachment regionAttachment)
			{
				scale = regionAttachment.Width / (float)regionAttachment.Region.OriginalWidth;
			}
			return o.GetRemappedClone(atlasRegion, cloneMeshAsLinked, useOriginalRegionSize, scale);
		}

		public static Attachment GetRemappedClone(this Attachment o, AtlasRegion atlasRegion, bool cloneMeshAsLinked = true, bool useOriginalRegionSize = false, float scale = 0.01f)
		{
			if (o is RegionAttachment regionAttachment)
			{
				RegionAttachment newAttachment = (RegionAttachment)regionAttachment.Copy();
				newAttachment.Region = atlasRegion;
				if (!useOriginalRegionSize)
				{
					newAttachment.Width = (float)atlasRegion.width * scale;
					newAttachment.Height = (float)atlasRegion.height * scale;
				}
				newAttachment.UpdateRegion();
				return newAttachment;
			}
			if (o is MeshAttachment meshAttachment)
			{
				MeshAttachment newAttachment2 = (cloneMeshAsLinked ? meshAttachment.NewLinkedMesh() : ((MeshAttachment)meshAttachment.Copy()));
				newAttachment2.Region = atlasRegion;
				newAttachment2.UpdateRegion();
				return newAttachment2;
			}
			return o.Copy();
		}
	}
}
