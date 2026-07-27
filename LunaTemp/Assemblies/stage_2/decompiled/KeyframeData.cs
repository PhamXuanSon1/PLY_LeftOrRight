using System;

[Serializable]
public class KeyframeData
{
	public float time;

	public float value;

	public KeyframeData(float time, float value)
	{
		this.time = time;
		this.value = value;
	}
}
