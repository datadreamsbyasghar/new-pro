from fastapi.testclient import TestClient

from main import app   # local import under Option B

client = TestClient(app)

def test_root():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["message"] == "Backend is working!"