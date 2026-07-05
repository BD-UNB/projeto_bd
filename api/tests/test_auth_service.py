import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException

from services.authService import AuthService


@pytest.fixture
def mock_repos():
    user_repo = MagicMock()
    aluno_repo = MagicMock()
    professor_repo = MagicMock()
    return user_repo, aluno_repo, professor_repo


@pytest.fixture
def auth_service(mock_repos):
    user_repo, aluno_repo, professor_repo = mock_repos
    return AuthService(user_repo, aluno_repo, professor_repo)


class TestLogin:
    def test_login_com_sucesso_retorna_token_e_perfil(self, mock_repos, auth_service):
        user_repo, _, _ = mock_repos

        import bcrypt
        senha_plana = "senha123"
        senha_hash = bcrypt.hashpw(senha_plana.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        user_repo.get_user_by_matricula.return_value = {
            "idUsuario": 1,
            "matricula": "200012345",
            "nome": "João Silva",
            "perfil": "aluno",
            "senha": senha_hash,
        }

        resultado = auth_service.login("200012345", senha_plana)

        assert resultado["status"] == "ok"
        assert resultado["perfil"] == "aluno"
        assert "token" in resultado
        assert isinstance(resultado["token"], str)
        assert len(resultado["token"]) > 0
        user_repo.get_user_by_matricula.assert_called_once_with("200012345")

    def test_login_matricula_inexistente_retorna_401(self, mock_repos, auth_service):
        user_repo, _, _ = mock_repos
        user_repo.get_user_by_matricula.return_value = None

        with pytest.raises(HTTPException) as exc_info:
            auth_service.login("000000000", "qualquersenha")

        assert exc_info.value.status_code == 401

    def test_login_senha_incorreta_retorna_401(self, mock_repos, auth_service):
        user_repo, _, _ = mock_repos

        import bcrypt
        senha_correta = "senha123"
        senha_hash = bcrypt.hashpw(senha_correta.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        user_repo.get_user_by_matricula.return_value = {
            "idUsuario": 1,
            "matricula": "200012345",
            "nome": "João Silva",
            "perfil": "aluno",
            "senha": senha_hash,
        }

        with pytest.raises(HTTPException) as exc_info:
            auth_service.login("200012345", "senha_errada")

        assert exc_info.value.status_code == 401
