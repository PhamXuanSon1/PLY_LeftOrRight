namespace Spine
{
	public class AtlasPage
	{
		public string name;

		public int width;

		public int height;

		public Format format = Format.RGBA8888;

		public TextureFilter minFilter = TextureFilter.Nearest;

		public TextureFilter magFilter = TextureFilter.Nearest;

		public TextureWrap uWrap = TextureWrap.ClampToEdge;

		public TextureWrap vWrap = TextureWrap.ClampToEdge;

		public bool pma;

		public object rendererObject;

		public AtlasPage Clone()
		{
			return MemberwiseClone() as AtlasPage;
		}
	}
}
