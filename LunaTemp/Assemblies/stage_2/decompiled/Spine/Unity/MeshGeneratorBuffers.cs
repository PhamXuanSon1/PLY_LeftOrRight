using UnityEngine;

namespace Spine.Unity
{
	public struct MeshGeneratorBuffers
	{
		public int vertexCount;

		public Vector3[] vertexBuffer;

		public Vector2[] uvBuffer;

		public Color32[] colorBuffer;

		public MeshGenerator meshGenerator;

		public Vector2[] uv2Buffer => meshGenerator.UV2;

		public Vector2[] uv3Buffer => meshGenerator.UV3;
	}
}
