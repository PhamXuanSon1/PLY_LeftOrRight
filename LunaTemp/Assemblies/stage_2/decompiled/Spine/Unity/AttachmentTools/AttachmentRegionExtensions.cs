using System;
using UnityEngine;

namespace Spine.Unity.AttachmentTools
{
	public static class AttachmentRegionExtensions
	{
		public static RegionAttachment ToRegionAttachment(this Sprite sprite, Material material, float rotation = 0f)
		{
			return sprite.ToRegionAttachment(material.ToSpineAtlasPage(), rotation);
		}

		public static RegionAttachment ToRegionAttachment(this Sprite sprite, AtlasPage page, float rotation = 0f)
		{
			if (sprite == null)
			{
				throw new ArgumentNullException("sprite");
			}
			if (page == null)
			{
				throw new ArgumentNullException("page");
			}
			AtlasRegion region = sprite.ToAtlasRegion(page);
			float unitsPerPixel = 1f / sprite.pixelsPerUnit;
			return region.ToRegionAttachment(sprite.name, unitsPerPixel, rotation);
		}

		public static RegionAttachment ToRegionAttachmentPMAClone(this Sprite sprite, Shader shader, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, Material materialPropertySource = null, float rotation = 0f)
		{
			if (sprite == null)
			{
				throw new ArgumentNullException("sprite");
			}
			if (shader == null)
			{
				throw new ArgumentNullException("shader");
			}
			AtlasRegion region = sprite.ToAtlasRegionPMAClone(shader, textureFormat, mipmaps, materialPropertySource);
			float unitsPerPixel = 1f / sprite.pixelsPerUnit;
			return region.ToRegionAttachment(sprite.name, unitsPerPixel, rotation);
		}

		public static RegionAttachment ToRegionAttachmentPMAClone(this Sprite sprite, Material materialPropertySource, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, float rotation = 0f)
		{
			return sprite.ToRegionAttachmentPMAClone(materialPropertySource.shader, textureFormat, mipmaps, materialPropertySource, rotation);
		}

		public static RegionAttachment ToRegionAttachment(this AtlasRegion region, string attachmentName, float scale = 0.01f, float rotation = 0f)
		{
			if (string.IsNullOrEmpty(attachmentName))
			{
				throw new ArgumentException("attachmentName can't be null or empty.", "attachmentName");
			}
			if (region == null)
			{
				throw new ArgumentNullException("region");
			}
			RegionAttachment attachment = new RegionAttachment(attachmentName);
			attachment.Region = region;
			attachment.Path = region.name;
			attachment.ScaleX = 1f;
			attachment.ScaleY = 1f;
			attachment.Rotation = rotation;
			attachment.R = 1f;
			attachment.G = 1f;
			attachment.B = 1f;
			attachment.A = 1f;
			TextureRegion textreRegion = attachment.Region;
			AtlasRegion atlasRegion = textreRegion as AtlasRegion;
			float originalWidth = atlasRegion?.originalWidth ?? textreRegion.width;
			float originalHeight = atlasRegion?.originalHeight ?? textreRegion.height;
			attachment.Width = originalWidth * scale;
			attachment.Height = originalHeight * scale;
			attachment.SetColor(Color.white);
			attachment.UpdateRegion();
			return attachment;
		}

		public static void SetScale(this RegionAttachment regionAttachment, Vector2 scale)
		{
			regionAttachment.ScaleX = scale.x;
			regionAttachment.ScaleY = scale.y;
		}

		public static void SetScale(this RegionAttachment regionAttachment, float x, float y)
		{
			regionAttachment.ScaleX = x;
			regionAttachment.ScaleY = y;
		}

		public static void SetPositionOffset(this RegionAttachment regionAttachment, Vector2 offset)
		{
			regionAttachment.X = offset.x;
			regionAttachment.Y = offset.y;
		}

		public static void SetPositionOffset(this RegionAttachment regionAttachment, float x, float y)
		{
			regionAttachment.X = x;
			regionAttachment.Y = y;
		}

		public static void SetRotation(this RegionAttachment regionAttachment, float rotation)
		{
			regionAttachment.Rotation = rotation;
		}
	}
}
