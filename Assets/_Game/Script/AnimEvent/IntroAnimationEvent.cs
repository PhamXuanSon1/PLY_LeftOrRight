   using UnityEngine;

public class IntroAnimationEvent : MonoBehaviour
{
    public void TurnOnMap1()
    {
        // Khi animation kết thúc, cho phép người chơi tương tác trở lại
        DrawInputManager.Instance.TurnOnMap1();
    }

    public void TurnOnMap2()
    {
        DrawInputManager.Instance.TurnOnMap2();
    }

    public void TurnOnMap3()
    {
        DrawInputManager.Instance.TurnOnMap3();
    }

    public void TurnOffIntro()
    {
        DrawInputManager.Instance.TurnOffIntro();
    }
}
