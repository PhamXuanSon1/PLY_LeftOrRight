using System;
using UnityEngine;

namespace Spine.Unity
{
	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, Inherited = true, AllowMultiple = false)]
	public abstract class SpineAttributeBase : PropertyAttribute
	{
		public string dataField = "";

		public string startsWith = "";

		public bool includeNone = true;

		public bool fallbackToTextField = false;

		public bool avoidGenericMenu = false;
	}
}
