using UnityEngine;

public class DrawItemMovement : MonoBehaviour
{
    public Vector3 SpawnPos;
    public Vector3 SpawnLocalPos;

    void Awake()
    {
        // Lưu vị trí ban đầu của item để sử dụng khi cần reset
        // Dùng Awake thay vì Start để tránh bị ảnh hưởng bởi các hiệu ứng bay DOTween
        SpawnPos = transform.position;
        SpawnLocalPos = transform.localPosition;
    }

    public void UpdateSpawnPos()
    {
        SpawnPos = transform.position;
        SpawnLocalPos = transform.localPosition;
    }

    public void GoToSpawn()
    {
        // Di chuyển item về vị trí ban đầu
        transform.localPosition = SpawnLocalPos;
    }
}
