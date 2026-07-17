using UnityEngine;

public class DrawItemGraphic : MonoBehaviour
{
    public Vector3 SpawnRotation;
    public Vector3 DragRotation;
    
    [Header("Scale Setup")]
    [Tooltip("Bật nếu muốn vật phẩm to ra/nhỏ lại khi cầm lên")]
    public bool enableScaleOnDrag = false;
    [Tooltip("Tỷ lệ Scale khi kéo (Ví dụ: 1.2 là to lên 20%)")]
    public float dragScaleMultiplier = 1.2f;
    
    [HideInInspector]
    public Vector3 SpawnScale;

    void Start()
    {
        // lưu góc quay ban đầu của item để sử dụng khi cần reset
        SpawnRotation = transform.rotation.eulerAngles;
        // lưu scale ban đầu
        SpawnScale = transform.localScale;
    }
}
