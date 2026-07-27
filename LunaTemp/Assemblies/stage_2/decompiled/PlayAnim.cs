using UnityEngine;

public class PlayAnim : MonoBehaviour
{
	public Animator anim;

	public void PlayAnimIntro()
	{
		anim.Play("PlayIntro");
	}
}
