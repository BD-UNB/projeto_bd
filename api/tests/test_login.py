from fastapi.testclient import TestClient
from api.main import app

def test_login_correto():
    response = TestClient(app).post("/auth/login", json={"matricula": "231012345", "senha": "senha123"})
    assert response.status_code == 200
    corpo = response.json()
    assert corpo["status"] == "ok"
    assert corpo["perfil"] == "aluno"
    assert "token" in corpo

def test_login_senha_incorreta():
    response = TestClient(app).post("/auth/login", json={"matricula": "231012345", "senha": "errada"})
    assert response.status_code == 401
    assert response.json()["detail"] == "Senha incorreta."
