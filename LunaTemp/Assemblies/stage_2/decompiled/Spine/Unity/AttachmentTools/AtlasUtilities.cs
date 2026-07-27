using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace Spine.Unity.AttachmentTools
{
	public static class AtlasUtilities
	{
		private struct IntAndAtlasRegionKey
		{
			private int i;

			private AtlasRegion region;

			public IntAndAtlasRegionKey(int i, AtlasRegion region)
			{
				this.i = i;
				this.region = region;
			}

			public override int GetHashCode()
			{
				return (i.GetHashCode() * 23) ^ region.GetHashCode();
			}
		}

		internal const TextureFormat SpineTextureFormat = TextureFormat.RGBA32;

		internal const float DefaultMipmapBias = -0.5f;

		internal const bool UseMipMaps = false;

		internal const float DefaultScale = 0.01f;

		private const int NonrenderingRegion = -1;

		private static readonly Dictionary<AtlasRegion, int> existingRegions = new Dictionary<AtlasRegion, int>();

		private static readonly List<int> regionIndices = new List<int>();

		private static readonly List<AtlasRegion> originalRegions = new List<AtlasRegion>();

		private static readonly List<AtlasRegion> repackedRegions = new List<AtlasRegion>();

		private static List<Texture2D>[] texturesToPackAtParam = new List<Texture2D>[1];

		private static List<Attachment> inoutAttachments = new List<Attachment>();

		private static Dictionary<IntAndAtlasRegionKey, Texture2D> CachedRegionTextures = new Dictionary<IntAndAtlasRegionKey, Texture2D>();

		private static List<Texture2D> CachedRegionTexturesList = new List<Texture2D>();

		[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
		private static void Init()
		{
			ClearCache();
		}

		public static AtlasRegion ToAtlasRegion(this Texture2D t, Material materialPropertySource, float scale = 0.01f)
		{
			return t.ToAtlasRegion(materialPropertySource.shader, scale, materialPropertySource);
		}

		public static AtlasRegion ToAtlasRegion(this Texture2D t, Shader shader, float scale = 0.01f, Material materialPropertySource = null)
		{
			Material material = new Material(shader);
			if (materialPropertySource != null)
			{
				material.CopyPropertiesFromMaterial(materialPropertySource);
				material.shaderKeywords = materialPropertySource.shaderKeywords;
			}
			material.mainTexture = t;
			AtlasPage page = material.ToSpineAtlasPage();
			float width = t.width;
			float height = t.height;
			AtlasRegion region = new AtlasRegion();
			region.name = t.name;
			Vector2 boundsMin = Vector2.zero;
			Vector2 boundsMax = new Vector2(width, height) * scale;
			region.width = (int)width;
			region.originalWidth = (int)width;
			region.height = (int)height;
			region.originalHeight = (int)height;
			region.offsetX = width * (0.5f - InverseLerp(boundsMin.x, boundsMax.x, 0f));
			region.offsetY = height * (0.5f - InverseLerp(boundsMin.y, boundsMax.y, 0f));
			region.u = 0f;
			region.v = 1f;
			region.u2 = 1f;
			region.v2 = 0f;
			region.x = 0;
			region.y = 0;
			region.page = page;
			return region;
		}

		public static AtlasRegion ToAtlasRegionPMAClone(this Texture2D t, Material materialPropertySource, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false)
		{
			return t.ToAtlasRegionPMAClone(materialPropertySource.shader, textureFormat, mipmaps, materialPropertySource);
		}

		public static AtlasRegion ToAtlasRegionPMAClone(this Texture2D t, Shader shader, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, Material materialPropertySource = null)
		{
			Material material = new Material(shader);
			if (materialPropertySource != null)
			{
				material.CopyPropertiesFromMaterial(materialPropertySource);
				material.shaderKeywords = materialPropertySource.shaderKeywords;
			}
			Texture2D newTexture = t.GetClone(textureFormat, mipmaps, false, true);
			newTexture.name = t.name + "-pma-";
			material.name = t.name + shader.name;
			material.mainTexture = newTexture;
			AtlasPage page = material.ToSpineAtlasPage();
			AtlasRegion region = newTexture.ToAtlasRegion(shader);
			region.page = page;
			return region;
		}

		public static AtlasPage ToSpineAtlasPage(this Material m)
		{
			AtlasPage newPage = new AtlasPage
			{
				rendererObject = m,
				name = m.name
			};
			Texture t = m.mainTexture;
			if (t != null)
			{
				newPage.width = t.width;
				newPage.height = t.height;
			}
			return newPage;
		}

		public static AtlasRegion ToAtlasRegion(this Sprite s, AtlasPage page)
		{
			if (page == null)
			{
				throw new ArgumentNullException("page", "page cannot be null. AtlasPage determines which texture region belongs and how it should be rendered. You can use material.ToSpineAtlasPage() to get a shareable AtlasPage from a Material, or use the sprite.ToAtlasRegion(material) overload.");
			}
			AtlasRegion region = s.ToAtlasRegion();
			region.page = page;
			return region;
		}

		public static AtlasRegion ToAtlasRegion(this Sprite s, Material material)
		{
			AtlasRegion region = s.ToAtlasRegion();
			region.page = material.ToSpineAtlasPage();
			return region;
		}

		public static AtlasRegion ToAtlasRegionPMAClone(this Sprite s, Material materialPropertySource, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false)
		{
			return s.ToAtlasRegionPMAClone(materialPropertySource.shader, textureFormat, mipmaps, materialPropertySource);
		}

		public static AtlasRegion ToAtlasRegionPMAClone(this Sprite s, Shader shader, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, Material materialPropertySource = null)
		{
			Material material = new Material(shader);
			if (materialPropertySource != null)
			{
				material.CopyPropertiesFromMaterial(materialPropertySource);
				material.shaderKeywords = materialPropertySource.shaderKeywords;
			}
			Texture2D tex = s.ToTexture(textureFormat, mipmaps, false, true);
			tex.name = s.name + "-pma-";
			material.name = tex.name + shader.name;
			material.mainTexture = tex;
			AtlasPage page = material.ToSpineAtlasPage();
			AtlasRegion region = s.ToAtlasRegion(true);
			region.page = page;
			return region;
		}

		internal static AtlasRegion ToAtlasRegion(this Sprite s, bool isolatedTexture = false)
		{
			AtlasRegion region = new AtlasRegion();
			region.name = s.name;
			region.index = -1;
			region.degrees = ((s.packed && s.packingRotation != 0) ? 90 : 0);
			Bounds bounds = s.bounds;
			Vector2 boundsMin = bounds.min;
			Vector2 boundsMax = bounds.max;
			Rect spineRect = s.textureRect.SpineUnityFlipRect(s.texture.height);
			Rect originalRect = s.rect;
			region.width = (int)spineRect.width;
			region.originalWidth = (int)originalRect.width;
			region.height = (int)spineRect.height;
			region.originalHeight = (int)originalRect.height;
			region.offsetX = s.textureRectOffset.x + spineRect.width * (0.5f - InverseLerp(boundsMin.x, boundsMax.x, 0f));
			region.offsetY = s.textureRectOffset.y + spineRect.height * (0.5f - InverseLerp(boundsMin.y, boundsMax.y, 0f));
			if (isolatedTexture)
			{
				region.u = 0f;
				region.v = 1f;
				region.u2 = 1f;
				region.v2 = 0f;
				region.x = 0;
				region.y = 0;
			}
			else
			{
				Texture2D tex = s.texture;
				Rect uvRect = TextureRectToUVRect(s.textureRect, tex.width, tex.height);
				region.u = uvRect.xMin;
				region.v = uvRect.yMax;
				region.u2 = uvRect.xMax;
				region.v2 = uvRect.yMin;
				region.x = (int)spineRect.x;
				region.y = (int)spineRect.y;
			}
			return region;
		}

		public static void GetRepackedAttachments(List<Attachment> sourceAttachments, List<Attachment> outputAttachments, Material materialPropertySource, out Material outputMaterial, out Texture2D outputTexture, int maxAtlasSize = 1024, int padding = 2, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, string newAssetName = "Repacked Attachments", bool clearCache = false, bool useOriginalNonrenderables = true, int[] additionalTexturePropertyIDsToCopy = null, Texture2D[] additionalOutputTextures = null, TextureFormat[] additionalTextureFormats = null, bool[] additionalTextureIsLinear = null)
		{
			Shader shader = ((materialPropertySource == null) ? Shader.Find("Spine/Skeleton") : materialPropertySource.shader);
			GetRepackedAttachments(sourceAttachments, outputAttachments, shader, out outputMaterial, out outputTexture, maxAtlasSize, padding, textureFormat, mipmaps, newAssetName, materialPropertySource, clearCache, useOriginalNonrenderables, additionalTexturePropertyIDsToCopy, additionalOutputTextures, additionalTextureFormats, additionalTextureIsLinear);
		}

		public static void GetRepackedAttachments(List<Attachment> sourceAttachments, List<Attachment> outputAttachments, Shader shader, out Material outputMaterial, out Texture2D outputTexture, int maxAtlasSize = 1024, int padding = 2, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, string newAssetName = "Repacked Attachments", Material materialPropertySource = null, bool clearCache = false, bool useOriginalNonrenderables = true, int[] additionalTexturePropertyIDsToCopy = null, Texture2D[] additionalOutputTextures = null, TextureFormat[] additionalTextureFormats = null, bool[] additionalTextureIsLinear = null)
		{
			if (sourceAttachments == null)
			{
				throw new ArgumentNullException("sourceAttachments");
			}
			if (outputAttachments == null)
			{
				throw new ArgumentNullException("outputAttachments");
			}
			outputTexture = null;
			if (additionalTexturePropertyIDsToCopy != null && additionalTextureIsLinear == null)
			{
				additionalTextureIsLinear = new bool[additionalTexturePropertyIDsToCopy.Length];
				for (int i = 0; i < additionalTextureIsLinear.Length; i++)
				{
					additionalTextureIsLinear[i] = true;
				}
			}
			existingRegions.Clear();
			regionIndices.Clear();
			int numTextureParamsToRepack = 1 + ((additionalTexturePropertyIDsToCopy != null) ? additionalTexturePropertyIDsToCopy.Length : 0);
			additionalOutputTextures = ((additionalTexturePropertyIDsToCopy == null) ? null : new Texture2D[additionalTexturePropertyIDsToCopy.Length]);
			if (texturesToPackAtParam.Length < numTextureParamsToRepack)
			{
				Array.Resize(ref texturesToPackAtParam, numTextureParamsToRepack);
			}
			for (int k = 0; k < numTextureParamsToRepack; k++)
			{
				if (texturesToPackAtParam[k] != null)
				{
					texturesToPackAtParam[k].Clear();
				}
				else
				{
					texturesToPackAtParam[k] = new List<Texture2D>();
				}
			}
			originalRegions.Clear();
			if (sourceAttachments != outputAttachments)
			{
				outputAttachments.Clear();
				outputAttachments.AddRange(sourceAttachments);
			}
			int newRegionIndex = 0;
			int attachmentIndex = 0;
			for (int n = sourceAttachments.Count; attachmentIndex < n; attachmentIndex++)
			{
				Attachment originalAttachment = sourceAttachments[attachmentIndex];
				if (originalAttachment is IHasTextureRegion)
				{
					MeshAttachment originalMeshAttachment = originalAttachment as MeshAttachment;
					IHasTextureRegion originalTextureAttachment = (IHasTextureRegion)originalAttachment;
					Attachment newAttachment = ((originalTextureAttachment.Sequence != null) ? originalAttachment : ((originalMeshAttachment != null) ? originalMeshAttachment.NewLinkedMesh() : originalAttachment.Copy()));
					IHasTextureRegion newTextureAttachment = (IHasTextureRegion)newAttachment;
					AtlasRegion region = newTextureAttachment.Region as AtlasRegion;
					if (region == null && originalTextureAttachment.Sequence != null)
					{
						region = (AtlasRegion)originalTextureAttachment.Sequence.Regions[0];
					}
					if (existingRegions.TryGetValue(region, out var existingIndex))
					{
						regionIndices.Add(existingIndex);
					}
					else
					{
						existingRegions.Add(region, newRegionIndex);
						Sequence originalSequence = originalTextureAttachment.Sequence;
						if (originalSequence != null)
						{
							newTextureAttachment.Sequence = new Sequence(originalSequence);
							int j = 0;
							for (int regionCount = originalSequence.Regions.Length; j < regionCount; j++)
							{
								AtlasRegion sequenceRegion = (AtlasRegion)originalSequence.Regions[j];
								AddRegionTexturesToPack(numTextureParamsToRepack, sequenceRegion, textureFormat, mipmaps, additionalTextureFormats, additionalTexturePropertyIDsToCopy, additionalTextureIsLinear);
								originalRegions.Add(sequenceRegion);
								regionIndices.Add(newRegionIndex);
								newRegionIndex++;
							}
						}
						else
						{
							AddRegionTexturesToPack(numTextureParamsToRepack, region, textureFormat, mipmaps, additionalTextureFormats, additionalTexturePropertyIDsToCopy, additionalTextureIsLinear);
							originalRegions.Add(region);
							regionIndices.Add(newRegionIndex);
							newRegionIndex++;
						}
					}
					outputAttachments[attachmentIndex] = newAttachment;
				}
				else
				{
					outputAttachments[attachmentIndex] = (useOriginalNonrenderables ? originalAttachment : originalAttachment.Copy());
					regionIndices.Add(-1);
				}
			}
			Material newMaterial = new Material(shader);
			if (materialPropertySource != null)
			{
				newMaterial.CopyPropertiesFromMaterial(materialPropertySource);
				newMaterial.shaderKeywords = materialPropertySource.shaderKeywords;
			}
			newMaterial.name = newAssetName;
			Rect[] rects = null;
			for (int l = 0; l < numTextureParamsToRepack; l++)
			{
				Texture2D newTexture = new Texture2D(maxAtlasSize, maxAtlasSize, (l > 0 && additionalTextureFormats != null && l - 1 < additionalTextureFormats.Length) ? additionalTextureFormats[l - 1] : textureFormat, mipmaps, l > 0 && additionalTextureIsLinear[l - 1]);
				newTexture.mipMapBias = -0.5f;
				List<Texture2D> texturesToPack = texturesToPackAtParam[l];
				if (texturesToPack.Count > 0)
				{
					Texture2D sourceTexture = texturesToPack[0];
					newTexture.CopyTextureAttributesFrom(sourceTexture);
				}
				newTexture.name = newAssetName;
				Rect[] rectsForTexParam = newTexture.PackTextures(texturesToPack.ToArray(), padding, maxAtlasSize);
				if (l == 0)
				{
					rects = rectsForTexParam;
					newMaterial.mainTexture = newTexture;
					outputTexture = newTexture;
				}
				else
				{
					newMaterial.SetTexture(additionalTexturePropertyIDsToCopy[l - 1], newTexture);
					additionalOutputTextures[l - 1] = newTexture;
				}
			}
			AtlasPage page = newMaterial.ToSpineAtlasPage();
			page.name = newAssetName;
			repackedRegions.Clear();
			int m = 0;
			for (int n2 = originalRegions.Count; m < n2; m++)
			{
				AtlasRegion oldRegion = originalRegions[m];
				AtlasRegion newRegion = UVRectToAtlasRegion(rects[m], oldRegion, page);
				repackedRegions.Add(newRegion);
			}
			int attachmentIndex2 = 0;
			int repackedIndex = 0;
			int n3 = outputAttachments.Count;
			while (attachmentIndex2 < n3)
			{
				Attachment attachment = outputAttachments[attachmentIndex2];
				if (attachment is IHasTextureRegion textureAttachment)
				{
					if (textureAttachment.Sequence != null)
					{
						TextureRegion[] regions = textureAttachment.Sequence.Regions;
						textureAttachment.Region = repackedRegions[regionIndices[repackedIndex]];
						int r = 0;
						for (int regionCount2 = regions.Length; r < regionCount2; r++)
						{
							regions[r] = repackedRegions[regionIndices[repackedIndex++]];
						}
						repackedIndex--;
					}
					else
					{
						textureAttachment.Region = repackedRegions[regionIndices[repackedIndex]];
					}
					textureAttachment.UpdateRegion();
				}
				attachmentIndex2++;
				repackedIndex++;
			}
			if (clearCache)
			{
				ClearCache();
			}
			outputMaterial = newMaterial;
		}

		private static void AddRegionTexturesToPack(int numTextureParamsToRepack, AtlasRegion region, TextureFormat textureFormat, bool mipmaps, TextureFormat[] additionalTextureFormats, int[] additionalTexturePropertyIDsToCopy, bool[] additionalTextureIsLinear)
		{
			for (int i = 0; i < numTextureParamsToRepack; i++)
			{
				Texture2D regionTexture = ((i == 0) ? region.ToTexture(textureFormat, mipmaps) : region.ToTexture((additionalTextureFormats != null && i - 1 < additionalTextureFormats.Length) ? additionalTextureFormats[i - 1] : textureFormat, mipmaps, additionalTexturePropertyIDsToCopy[i - 1], additionalTextureIsLinear[i - 1]));
				texturesToPackAtParam[i].Add(regionTexture);
			}
		}

		public static Skin GetRepackedSkin(this Skin o, string newName, Material materialPropertySource, out Material outputMaterial, out Texture2D outputTexture, int maxAtlasSize = 1024, int padding = 2, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, bool useOriginalNonrenderables = true, bool clearCache = false, int[] additionalTexturePropertyIDsToCopy = null, Texture2D[] additionalOutputTextures = null, TextureFormat[] additionalTextureFormats = null, bool[] additionalTextureIsLinear = null)
		{
			return o.GetRepackedSkin(newName, materialPropertySource.shader, out outputMaterial, out outputTexture, maxAtlasSize, padding, textureFormat, mipmaps, materialPropertySource, clearCache, useOriginalNonrenderables, additionalTexturePropertyIDsToCopy, additionalOutputTextures, additionalTextureFormats, additionalTextureIsLinear);
		}

		public static Skin GetRepackedSkin(this Skin o, string newName, Shader shader, out Material outputMaterial, out Texture2D outputTexture, int maxAtlasSize = 1024, int padding = 2, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, Material materialPropertySource = null, bool clearCache = false, bool useOriginalNonrenderables = true, int[] additionalTexturePropertyIDsToCopy = null, Texture2D[] additionalOutputTextures = null, TextureFormat[] additionalTextureFormats = null, bool[] additionalTextureIsLinear = null)
		{
			outputTexture = null;
			if (o == null)
			{
				throw new NullReferenceException("Skin was null");
			}
			ICollection<Skin.SkinEntry> skinAttachments = o.Attachments;
			Skin newSkin = new Skin(newName);
			newSkin.Bones.AddRange(o.Bones);
			newSkin.Constraints.AddRange(o.Constraints);
			inoutAttachments.Clear();
			foreach (Skin.SkinEntry entry in skinAttachments)
			{
				inoutAttachments.Add(entry.Attachment);
			}
			GetRepackedAttachments(inoutAttachments, inoutAttachments, materialPropertySource, out outputMaterial, out outputTexture, maxAtlasSize, padding, textureFormat, mipmaps, newName, clearCache, useOriginalNonrenderables, additionalTexturePropertyIDsToCopy, additionalOutputTextures, additionalTextureFormats, additionalTextureIsLinear);
			int i = 0;
			foreach (Skin.SkinEntry originalSkinEntry in skinAttachments)
			{
				Attachment newAttachment = inoutAttachments[i++];
				newSkin.SetAttachment(originalSkinEntry.SlotIndex, originalSkinEntry.Name, newAttachment);
			}
			return newSkin;
		}

		public static Sprite ToSprite(this AtlasRegion ar, float pixelsPerUnit = 100f)
		{
			return Sprite.Create(ar.GetMainTexture(), ar.GetUnityRect(), new Vector2(0.5f, 0.5f), pixelsPerUnit);
		}

		public static void ClearCache()
		{
			foreach (Texture2D t in CachedRegionTexturesList)
			{
				UnityEngine.Object.Destroy(t);
			}
			CachedRegionTextures.Clear();
			CachedRegionTexturesList.Clear();
		}

		public static Texture2D ToTexture(this AtlasRegion ar, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, int texturePropertyId = 0, bool linear = false, bool applyPMA = false)
		{
			IntAndAtlasRegionKey cacheKey = new IntAndAtlasRegionKey(texturePropertyId, ar);
			CachedRegionTextures.TryGetValue(cacheKey, out var output);
			if (output == null)
			{
				Texture2D sourceTexture = ((texturePropertyId == 0) ? ar.GetMainTexture() : ar.GetTexture(texturePropertyId));
				Rect r = ar.GetUnityRect();
				int width = (int)r.width;
				int height = (int)r.height;
				output = new Texture2D(width, height, textureFormat, mipmaps, linear)
				{
					name = ar.name
				};
				output.CopyTextureAttributesFrom(sourceTexture);
				if (applyPMA)
				{
					CopyTextureApplyPMA(sourceTexture, r, output);
				}
				else
				{
					CopyTexture(sourceTexture, r, output);
				}
				CachedRegionTextures.Add(cacheKey, output);
				CachedRegionTexturesList.Add(output);
			}
			return output;
		}

		private static Texture2D ToTexture(this Sprite s, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, bool linear = false, bool applyPMA = false)
		{
			Texture2D spriteTexture = s.texture;
			Rect r;
			if (!s.packed || s.packingMode == SpritePackingMode.Rectangle)
			{
				r = s.textureRect;
			}
			else
			{
				r = default(Rect);
				r.xMin = Math.Min(s.uv[0].x, s.uv[1].x) * (float)spriteTexture.width;
				r.xMax = Math.Max(s.uv[0].x, s.uv[1].x) * (float)spriteTexture.width;
				r.yMin = Math.Min(s.uv[0].y, s.uv[2].y) * (float)spriteTexture.height;
				r.yMax = Math.Max(s.uv[0].y, s.uv[2].y) * (float)spriteTexture.height;
			}
			Texture2D newTexture = new Texture2D((int)r.width, (int)r.height, textureFormat, mipmaps, linear);
			newTexture.CopyTextureAttributesFrom(spriteTexture);
			if (applyPMA)
			{
				CopyTextureApplyPMA(spriteTexture, r, newTexture);
			}
			else
			{
				CopyTexture(spriteTexture, r, newTexture);
			}
			return newTexture;
		}

		private static Texture2D GetClone(this Texture2D t, TextureFormat textureFormat = TextureFormat.RGBA32, bool mipmaps = false, bool linear = false, bool applyPMA = false)
		{
			Texture2D newTexture = new Texture2D(t.width, t.height, textureFormat, mipmaps, linear);
			newTexture.CopyTextureAttributesFrom(t);
			if (applyPMA)
			{
				CopyTextureApplyPMA(t, new Rect(0f, 0f, t.width, t.height), newTexture);
			}
			else
			{
				CopyTexture(t, new Rect(0f, 0f, t.width, t.height), newTexture);
			}
			return newTexture;
		}

		private static void CopyTexture(Texture2D source, Rect sourceRect, Texture2D destination)
		{
			if (SystemInfo.copyTextureSupport == CopyTextureSupport.None)
			{
				Color[] pixelBuffer = source.GetPixels((int)sourceRect.x, (int)sourceRect.y, (int)sourceRect.width, (int)sourceRect.height);
				destination.SetPixels(pixelBuffer);
				destination.Apply();
			}
			else
			{
				Graphics.CopyTexture(source, 0, 0, (int)sourceRect.x, (int)sourceRect.y, (int)sourceRect.width, (int)sourceRect.height, destination, 0, 0, 0, 0);
			}
		}

		private static void CopyTextureApplyPMA(Texture2D source, Rect sourceRect, Texture2D destination)
		{
			Color[] pixelBuffer = source.GetPixels((int)sourceRect.x, (int)sourceRect.y, (int)sourceRect.width, (int)sourceRect.height);
			int i = 0;
			for (int j = pixelBuffer.Length; i < j; i++)
			{
				Color p = pixelBuffer[i];
				float a = p.a;
				p.r *= a;
				p.g *= a;
				p.b *= a;
				pixelBuffer[i] = p;
			}
			destination.SetPixels(pixelBuffer);
			destination.Apply();
		}

		private static bool IsRenderable(Attachment a)
		{
			return a is IHasTextureRegion;
		}

		private static Rect SpineUnityFlipRect(this Rect rect, int textureHeight)
		{
			rect.y = (float)textureHeight - rect.y - rect.height;
			return rect;
		}

		private static Rect GetUnityRect(this AtlasRegion region)
		{
			return region.GetSpineAtlasRect().SpineUnityFlipRect(region.page.height);
		}

		private static Rect GetUnityRect(this AtlasRegion region, int textureHeight)
		{
			return region.GetSpineAtlasRect().SpineUnityFlipRect(textureHeight);
		}

		private static Rect GetSpineAtlasRect(this AtlasRegion region, bool includeRotate = true)
		{
			float width = region.packedWidth;
			float height = region.packedHeight;
			if (includeRotate && region.degrees == 270)
			{
				width = region.packedHeight;
				height = region.packedWidth;
			}
			return new Rect(region.x, region.y, width, height);
		}

		private static Rect UVRectToTextureRect(Rect uvRect, int texWidth, int texHeight)
		{
			uvRect.x *= texWidth;
			uvRect.width *= texWidth;
			uvRect.y *= texHeight;
			uvRect.height *= texHeight;
			return uvRect;
		}

		private static Rect TextureRectToUVRect(Rect textureRect, int texWidth, int texHeight)
		{
			textureRect.x = Mathf.InverseLerp(0f, texWidth, textureRect.x);
			textureRect.y = Mathf.InverseLerp(0f, texHeight, textureRect.y);
			textureRect.width = Mathf.InverseLerp(0f, texWidth, textureRect.width);
			textureRect.height = Mathf.InverseLerp(0f, texHeight, textureRect.height);
			return textureRect;
		}

		private static AtlasRegion UVRectToAtlasRegion(Rect uvRect, AtlasRegion referenceRegion, AtlasPage page)
		{
			Rect tr = UVRectToTextureRect(uvRect, page.width, page.height);
			Rect rr = tr.SpineUnityFlipRect(page.height);
			int x = (int)rr.x;
			int y = (int)rr.y;
			int w = (int)rr.width;
			int h = (int)rr.height;
			if (referenceRegion.degrees == 270)
			{
				int tempW = w;
				w = h;
				h = tempW;
			}
			int originalW = Mathf.RoundToInt((float)w * ((float)referenceRegion.originalWidth / (float)referenceRegion.width));
			int originalH = Mathf.RoundToInt((float)h * ((float)referenceRegion.originalHeight / (float)referenceRegion.height));
			int offsetX = Mathf.RoundToInt(referenceRegion.offsetX * ((float)w / (float)referenceRegion.width));
			int offsetY = Mathf.RoundToInt(referenceRegion.offsetY * ((float)h / (float)referenceRegion.height));
			float u = uvRect.xMin;
			float u2 = uvRect.xMax;
			float v = uvRect.yMax;
			float v2 = uvRect.yMin;
			if (referenceRegion.degrees == 270)
			{
				float du = uvRect.width;
				float dv = uvRect.height;
				float atlasAspectRatio = (float)page.width / (float)page.height;
				u2 = u + dv / atlasAspectRatio;
				v2 = v - du * atlasAspectRatio;
			}
			return new AtlasRegion
			{
				page = page,
				name = referenceRegion.name,
				u = u,
				u2 = u2,
				v = v,
				v2 = v2,
				index = -1,
				width = w,
				originalWidth = originalW,
				height = h,
				originalHeight = originalH,
				offsetX = offsetX,
				offsetY = offsetY,
				x = x,
				y = y,
				rotate = referenceRegion.rotate,
				degrees = referenceRegion.degrees
			};
		}

		private static Texture2D GetMainTexture(this AtlasRegion region)
		{
			Material material = region.page.rendererObject as Material;
			return material.mainTexture as Texture2D;
		}

		private static Texture2D GetTexture(this AtlasRegion region, string texturePropertyName)
		{
			Material material = region.page.rendererObject as Material;
			return material.GetTexture(texturePropertyName) as Texture2D;
		}

		private static Texture2D GetTexture(this AtlasRegion region, int texturePropertyId)
		{
			Material material = region.page.rendererObject as Material;
			return material.GetTexture(texturePropertyId) as Texture2D;
		}

		private static void CopyTextureAttributesFrom(this Texture2D destination, Texture2D source)
		{
			destination.filterMode = source.filterMode;
			destination.anisoLevel = source.anisoLevel;
			destination.wrapModeU = source.wrapModeU;
			destination.wrapModeV = source.wrapModeV;
			destination.wrapModeW = source.wrapModeW;
		}

		private static float InverseLerp(float a, float b, float value)
		{
			return (value - a) / (b - a);
		}
	}
}
