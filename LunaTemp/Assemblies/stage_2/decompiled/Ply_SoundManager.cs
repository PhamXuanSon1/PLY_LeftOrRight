using UnityEngine;

public class Ply_SoundManager : Ply_Singleton<Ply_SoundManager>
{
	public FxAudio fxAudio;

	public AudioSource bgm;

	private AudioSource[] fx = new AudioSource[10];

	private bool isMute = false;

	public void PlayFx(FxType fxType)
	{
		if (isMute)
		{
			return;
		}
		SoundData data = GetSoundData(fxType);
		if (data != null && !(data.clip == null))
		{
			int index = (int)fxType;
			if (fx[index] == null)
			{
				fx[index] = new GameObject("SoundFX_" + fxType).AddComponent<AudioSource>();
			}
			fx[index].clip = data.clip;
			fx[index].Play();
			for (int i = 1; i < data.repeatCount; i++)
			{
				fx[index].PlayOneShot(data.clip);
			}
		}
	}

	public void PlayLoopFx(FxType fxType)
	{
		if (isMute)
		{
			return;
		}
		SoundData data = GetSoundData(fxType);
		if (data != null && !(data.clip == null))
		{
			int index = (int)fxType;
			if (fx[index] == null)
			{
				fx[index] = new GameObject("SoundFX_Loop_" + fxType).AddComponent<AudioSource>();
			}
			fx[index].clip = data.clip;
			fx[index].loop = true;
			fx[index].Play();
		}
	}

	public void StopFx(FxType fxType)
	{
		if (fxType >= FxType.Left && (int)fxType < fx.Length && fx[(int)fxType] != null)
		{
			fx[(int)fxType].Stop();
		}
	}

	public void PlayBGM()
	{
		if (!isMute && bgm != null && !bgm.isPlaying)
		{
			bgm.Play();
		}
	}

	private SoundData GetSoundData(FxType type)
	{
		switch (type)
		{
		case FxType.Left:
			return fxAudio.Left;
		case FxType.Right:
			return fxAudio.Right;
		case FxType.Yeah:
			return fxAudio.Yeah;
		default:
			return null;
		}
	}

	public void MuteFx()
	{
		isMute = true;
		for (int i = 0; i < fx.Length; i++)
		{
			if (fx[i] != null)
			{
				fx[i].Stop();
			}
		}
	}

	public void Mute()
	{
		if (bgm != null)
		{
			bgm.Stop();
		}
		for (int i = 0; i < fx.Length; i++)
		{
			if (fx[i] != null)
			{
				fx[i].Stop();
			}
		}
	}
}
