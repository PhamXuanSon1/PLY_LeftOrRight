using UnityEngine;
using Luna.Unity;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;


#if UNITY_EDITOR
using Sirenix.OdinInspector;
#endif

public class GameManager : MonoBehaviour
{
    [LunaPlaygroundField("Google Build", 0, "Build Settings")]
    public bool isGoogleBuild = false;

    [Header("Google Build Disables")]
    public List<GameObject> googleDisabledObjects = new List<GameObject>();
    public List<Behaviour> googleDisabledBehaviours = new List<Behaviour>();

    public static GameManager instance;

    void Awake()
    {
        instance = this;
        
        if (isGoogleBuild)
        {
            foreach (var obj in googleDisabledObjects)
            {
                if (obj != null) obj.SetActive(false);
            }
            foreach (var comp in googleDisabledBehaviours)
            {
                if (comp != null) comp.enabled = false;
            }
        }
    }

    public void GotoStore()
    {
        LifeCycle.GameEnded();

        Playable.InstallFullGame();
    }




}
