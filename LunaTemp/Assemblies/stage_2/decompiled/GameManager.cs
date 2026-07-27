using System.Collections.Generic;
using Luna.Unity;
using UnityEngine;

public class GameManager : MonoBehaviour
{
	[LunaPlaygroundField("Google Build", 0, "Build Settings", false, null)]
	public bool isGoogleBuild = false;

	[Header("Google Build Disables")]
	public List<GameObject> googleDisabledObjects = new List<GameObject>();

	public List<Behaviour> googleDisabledBehaviours = new List<Behaviour>();

	public static GameManager instance;

	private void Awake()
	{
		instance = this;
		if (!isGoogleBuild)
		{
			return;
		}
		foreach (GameObject obj in googleDisabledObjects)
		{
			if (obj != null)
			{
				obj.SetActive(false);
			}
		}
		foreach (Behaviour comp in googleDisabledBehaviours)
		{
			if (comp != null)
			{
				comp.enabled = false;
			}
		}
	}

	public void GotoStore()
	{
		LifeCycle.GameEnded();
		Playable.InstallFullGame();
	}
}
