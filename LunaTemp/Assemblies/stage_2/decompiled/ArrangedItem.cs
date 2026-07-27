using System;
using UnityEngine;

[Serializable]
public class ArrangedItem
{
	public Transform itemTransform;

	[Tooltip("Khoảng cách từ item này tới item tiếp theo")]
	public float spacingToNext = 2f;
}
