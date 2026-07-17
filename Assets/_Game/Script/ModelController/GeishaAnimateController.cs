using UnityEngine;
using Spine;


public class GeishaAnimateController : MonoBehaviour
{
    private float accumulate;
    [SerializeField]public Skeleton skeleton;
    [SerializeField]public Spine.AnimationState state;
    private float timeScale = 1;

    void Update()
    {
        Update(Time.deltaTime);
    }
    // Update is called once per frame
    void Update(float deltaTime)
    {
        accumulate += deltaTime;
        float fps = 1 / 60f;
        float step = accumulate - (accumulate % fps);
        accumulate -= step;
        step *= timeScale;
       skeleton.Update(step);
        state.Update(step);
        state.Apply(skeleton);
    }
}
