import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException
from datetime import datetime, timedelta

from infra.security import create_access_token, get_current_user, TOKEN_SECRET_KEY, ALGORITMO
import jwt


class TestCreateAccessToken:
    def test_token_contem_id_usuario_e_perfil(self):
        data = {"idUsuario": 42, "perfil": "aluno"}
        token = create_access_token(data)

        payload = jwt.decode(token, TOKEN_SECRET_KEY, algorithms=[ALGORITMO])

        assert payload["idUsuario"] == 42
        assert payload["perfil"] == "aluno"

    def test_token_contem_expiracao(self):
        data = {"idUsuario": 1, "perfil": "professor"}
        token = create_access_token(data)

        payload = jwt.decode(token, TOKEN_SECRET_KEY, algorithms=[ALGORITMO])

        assert "exp" in payload

    def test_token_nao_altera_dados_originais(self):
        data = {"idUsuario": 10, "perfil": "aluno"}
        data_original = data.copy()
        create_access_token(data)
        
        assert data == data_original


class TestGetCurrentUser:
    def test_decodifica_token_valido(self):
        token = create_access_token({"idUsuario": 7, "perfil": "professor"})

        # Simula o objeto HTTPAuthorizationCredentials
        credentials = MagicMock()
        credentials.credentials = token

        resultado = get_current_user(credentials)

        assert resultado["idUsuario"] == 7
        assert resultado["perfil"] == "professor"

    def test_rejeita_token_invalido(self):
        credentials = MagicMock()
        credentials.credentials = "token.invalido.aqui"

        with pytest.raises(HTTPException) as exc_info:
            get_current_user(credentials)

        assert exc_info.value.status_code == 401

    def test_rejeita_token_expirado(self):
        # Cria um token que já expirou
        payload = {
            "idUsuario": 1,
            "perfil": "aluno",
            "exp": datetime.utcnow() - timedelta(hours=1),
        }
        token_expirado = jwt.encode(payload, TOKEN_SECRET_KEY, algorithm=ALGORITMO)

        credentials = MagicMock()
        credentials.credentials = token_expirado

        with pytest.raises(HTTPException) as exc_info:
            get_current_user(credentials)

        assert exc_info.value.status_code == 401

    def test_rejeita_token_sem_id_usuario(self):
        payload = {
            "perfil": "aluno",
            "exp": datetime.utcnow() + timedelta(hours=1),
        }
        token = jwt.encode(payload, TOKEN_SECRET_KEY, algorithm=ALGORITMO)

        credentials = MagicMock()
        credentials.credentials = token

        with pytest.raises(HTTPException) as exc_info:
            get_current_user(credentials)

        assert exc_info.value.status_code == 401

    def test_rejeita_token_sem_perfil(self):
        payload = {
            "idUsuario": 1,
            "exp": datetime.utcnow() + timedelta(hours=1),
        }
        token = jwt.encode(payload, TOKEN_SECRET_KEY, algorithm=ALGORITMO)

        credentials = MagicMock()
        credentials.credentials = token

        with pytest.raises(HTTPException) as exc_info:
            get_current_user(credentials)

        assert exc_info.value.status_code == 401
