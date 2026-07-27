using UnityEngine;
using UnityEngine.UI;

namespace Spine.Unity
{
	[RequireComponent(typeof(CanvasRenderer))]
	public class SkeletonSubmeshGraphic : MaskableGraphic
	{
		public override void SetMaterialDirty()
		{
		}

		public override void SetVerticesDirty()
		{
		}

		protected override void OnPopulateMesh(VertexHelper vh)
		{
			vh.Clear();
		}

		protected override void OnDisable()
		{
			base.OnDisable();
			base.canvasRenderer.cull = true;
		}

		protected override void OnEnable()
		{
			base.OnEnable();
			base.canvasRenderer.cull = false;
		}
	}
}
