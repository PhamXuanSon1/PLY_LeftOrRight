using System;
using System.Collections.Generic;
using UnityEngine;

namespace Spine.Unity
{
	public abstract class OnDemandTextureLoader : ScriptableObject
	{
		public delegate void TextureLoadDelegate(OnDemandTextureLoader loader, Material material, int textureIndex);

		public AtlasAssetBase atlasAsset;

		public SkeletonDataAsset skeletonDataAsset;

		protected event TextureLoadDelegate onTextureRequested;

		protected event TextureLoadDelegate onTextureLoaded;

		protected event TextureLoadDelegate onTextureLoadFailed;

		protected event TextureLoadDelegate onTextureUnloaded;

		public event TextureLoadDelegate TextureRequested
		{
			add
			{
				onTextureRequested += value;
			}
			remove
			{
				onTextureRequested -= value;
			}
		}

		public event TextureLoadDelegate TextureLoaded
		{
			add
			{
				onTextureLoaded += value;
			}
			remove
			{
				onTextureLoaded -= value;
			}
		}

		public event TextureLoadDelegate TextureLoadFailed
		{
			add
			{
				onTextureLoadFailed += value;
			}
			remove
			{
				onTextureLoadFailed -= value;
			}
		}

		public event TextureLoadDelegate TextureUnloaded
		{
			add
			{
				onTextureUnloaded += value;
			}
			remove
			{
				onTextureUnloaded -= value;
			}
		}

		public abstract string GetPlaceholderTextureName(string originalTextureName);

		public abstract bool AssignPlaceholderTextures(out IEnumerable<Material> modifiedMaterials);

		public abstract bool HasPlaceholderTexturesAssigned(out List<Material> placeholderMaterials);

		public virtual bool HasNullMainTexturesAssigned(out List<Material> nullTextureMaterials)
		{
			nullTextureMaterials = null;
			if (!atlasAsset)
			{
				return false;
			}
			bool anyNullTexture = false;
			foreach (Material material in atlasAsset.Materials)
			{
				if (material.mainTexture == null)
				{
					anyNullTexture = true;
					if (nullTextureMaterials == null)
					{
						nullTextureMaterials = new List<Material>();
					}
					nullTextureMaterials.Add(material);
				}
			}
			return anyNullTexture;
		}

		public abstract bool AssignTargetTextures(out IEnumerable<Material> modifiedMaterials);

		public abstract void BeginCustomTextureLoading();

		public abstract void EndCustomTextureLoading();

		public abstract bool HasPlaceholderAssigned(Material material);

		public abstract void RequestLoadMaterialTextures(Material material, ref Material overrideMaterial);

		public abstract void RequestLoadTexture(Texture placeholderTexture, ref Texture replacementTexture, Action<Texture> onTextureLoaded = null);

		public abstract void Clear(bool clearAtlasAsset = false);

		protected void OnTextureRequested(Material material, int textureIndex)
		{
			if (this.onTextureRequested != null)
			{
				this.onTextureRequested(this, material, textureIndex);
			}
		}

		protected void OnTextureLoaded(Material material, int textureIndex)
		{
			if (this.onTextureLoaded != null)
			{
				this.onTextureLoaded(this, material, textureIndex);
			}
		}

		protected void OnTextureLoadFailed(Material material, int textureIndex)
		{
			if (this.onTextureLoadFailed != null)
			{
				this.onTextureLoadFailed(this, material, textureIndex);
			}
		}

		protected void OnTextureUnloaded(Material material, int textureIndex)
		{
			if (this.onTextureUnloaded != null)
			{
				this.onTextureUnloaded(this, material, textureIndex);
			}
		}
	}
}
