namespace Spine.Unity
{
	public class SpineSkin : SpineAttributeBase
	{
		public bool defaultAsEmptyString = false;

		public SpineSkin(string startsWith = "", string dataField = "", bool includeNone = false, bool fallbackToTextField = false, bool defaultAsEmptyString = false, bool avoidGenericMenu = false)
		{
			base.startsWith = startsWith;
			base.dataField = dataField;
			base.includeNone = includeNone;
			base.fallbackToTextField = fallbackToTextField;
			this.defaultAsEmptyString = defaultAsEmptyString;
			base.avoidGenericMenu = avoidGenericMenu;
		}
	}
}
