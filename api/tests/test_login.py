from fastapi.testclient import TestClient
from api.main import app

def test_login_correto():
    response = TestClient(app).post("/login", json={"email": "[EMAIL_ADDRESS]", "senha": "[PASSWORD]"})
    assert response.status_code == 200
    assert response.json() == {"message": "Login realizado com sucesso!"}

def test_login_senha_incorreta():
    response = TestClient(app).post("/login", json={"email": "senha", "senha": "eee"})
    assert response.status_code == 401
    assert response.json() == {"message": "Senha incorreta!"}

def test_login_email_incorreto():
    response = TestClient(app).post("/login", json={"email": "[EMAIL_ADDRESS]", "senha": "[PASSWORD]"})
    assert response.status_code == 404
    assert response.json() == {"message": "Email não encontrado!"}