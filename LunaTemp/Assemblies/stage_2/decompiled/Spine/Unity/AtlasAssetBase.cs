using System;
using System.Collections.Generic;
using UnityEngine;

namespace Spine.Unity
{
	public abstract class AtlasAssetBase : ScriptableObject
	{
		public enum LoadingMode
		{
			Normal,
			OnDemand
		}

		[SerializeField]
		protected LoadingMode textureLoadingMode = LoadingMode.Normal;

		[SerializeField]
		protected OnDemandTextureLoader onDemandTextureLoader = null;

		public abstract Material PrimaryMaterial { get; }

		public abstract IEnumerable<Material> Materials { get; }

		public abstract int MaterialCount { get; }

		public abstract bool IsLoaded { get; }

		public virtual LoadingMode TextureLoadingMode
		{
			get
			{
				return textureLoadingMode;
			}
			set
			{
				textureLoadingMode = value;
			}
		}

		public OnDemandTextureLoader OnDemandTextureLoader
		{
			get
			{
				return onDemandTextureLoader;
			}
			set
			{
				onDemandTextureLoader = value;
			}
		}

		public abstract void Clear();

		public abstract Atlas GetAtlas(bool onlyMetaData = false);

		public virtual void BeginCustomTextureLoading()
		{
			if ((bool)onDemandTextureLoader)
			{
				onDemandTextureLoader.BeginCustomTextureLoading();
			}
		}

		public virtual void EndCustomTextureLoading()
		{
			if ((bool)onDemandTextureLoader)
			{
				onDemandTextureLoader.EndCustomTextureLoading();
			}
		}

		public virtual void RequireTexturesLoaded(Material material, ref Material overrideMaterial)
		{
			if ((bool)onDemandTextureLoader)
			{
				onDemandTextureLoader.RequestLoadMaterialTextures(material, ref overrideMaterial);
			}
		}

		public virtual void RequireTextureLoaded(Texture placeholderTexture, ref Texture replacementTexture, Action<Texture> onTextureLoaded)
		{
			if ((bool)onDemandTextureLoader)
			{
				onDemandTextureLoader.RequestLoadTexture(placeholderTexture, ref replacementTexture, onTextureLoaded);
			}
		}
	}
}
