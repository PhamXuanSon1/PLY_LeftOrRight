namespace Spine.Unity
{
	public class SpineAnimation : SpineAttributeBase
	{
		public SpineAnimation(string startsWith = "", string dataField = "", bool includeNone = true, bool fallbackToTextField = false, bool avoidGenericMenu = false)
		{
			base.startsWith = startsWith;
			base.dataField = dataField;
			base.includeNone = includeNone;
			base.fallbackToTextField = fallbackToTextField;
			base.avoidGenericMenu = avoidGenericMenu;
		}
	}
}
