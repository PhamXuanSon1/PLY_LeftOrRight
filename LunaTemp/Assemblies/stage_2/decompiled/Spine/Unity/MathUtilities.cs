using UnityEngine;

namespace Spine.Unity
{
	public static class MathUtilities
	{
		public static float InverseLerp(float a, float b, float value)
		{
			return (value - a) / (b - a);
		}

		public static Vector2 InverseLerp(Vector2 a, Vector2 b, Vector2 value)
		{
			return new Vector2((value.x - a.x) / (b.x - a.x), (value.y - a.y) / (b.y - a.y));
		}

		public static Vector3 InverseLerp(Vector3 a, Vector3 b, Vector3 value)
		{
			return new Vector3((value.x - a.x) / (b.x - a.x), (value.y - a.y) / (b.y - a.y), (value.z - a.z) / (b.z - a.z));
		}

		public static Vector4 InverseLerp(Vector4 a, Vector4 b, Vector4 value)
		{
			return new Vector4((value.x - a.x) / (b.x - a.x), (value.y - a.y) / (b.y - a.y), (value.z - a.z) / (b.z - a.z), (value.w - a.w) / (b.w - a.w));
		}
	}
}
