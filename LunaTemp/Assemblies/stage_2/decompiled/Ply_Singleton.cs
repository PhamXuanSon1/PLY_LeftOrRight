using UnityEngine;

public class Ply_Singleton<T> : MonoBehaviour
{
	public static T Ins;

	public virtual void Awake()
	{
		Ins = GetComponent<T>();
	}
}
