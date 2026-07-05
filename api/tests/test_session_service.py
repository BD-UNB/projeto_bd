import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException

from services.sessionService import SessionService


@pytest.fixture
def mock_repos():
    user_repo = MagicMock()
    aluno_repo = MagicMock()
    professor_repo = MagicMock()
    return user_repo, aluno_repo, professor_repo


@pytest.fixture
def session_service(mock_repos):
    user_repo, aluno_repo, professor_repo = mock_repos
    return SessionService(user_repo, aluno_repo, professor_repo)


# =====================================================================
# Testes de perfil de ALUNO
# =====================================================================

class TestProfileAluno:
    def test_retorna_perfil_aluno_com_sucesso(self, mock_repos, session_service):
        user_repo, aluno_repo, _ = mock_repos

        user_repo.get_user_by_id.return_value = {
            "idUsuario": 1,
            "matricula": "231012345",
            "email": "joao@aluno",
            "nome": "João Silva",
            "perfil": "aluno",
        }
        aluno_repo.get_aluno_repository.return_value = {
            "nivel": "graduacao",
            "curriculo": None,
            "area_interesse": "IA",
            "nomeCurso": "Ciência da Computação",
            "nomeUniversidade": "UnB",
            "nomeDepartamento": "CIC",
        }

        resultado = session_service.profile_by_id(1, "aluno")

        assert resultado["nome"] == "João Silva"
        assert resultado["nivel"] == "graduacao"
        assert resultado["area_interesse"] == "IA"
        assert resultado["curriculo"] is False
        assert resultado["nomeCurso"] == "Ciência da Computação"
        assert resultado["nomeUniversidade"] == "UnB"
        assert resultado["nomeDepartamento"] == "CIC"
        user_repo.get_user_by_id.assert_called_once_with(1)
        aluno_repo.get_aluno_repository.assert_called_once_with(1)

    def test_erro_404_quando_usuario_nao_existe(self, mock_repos, session_service):
        user_repo, _, _ = mock_repos
        user_repo.get_user_by_id.return_value = None

        with pytest.raises(HTTPException) as exc_info:
            session_service.profile_by_id(999, "aluno")

        assert exc_info.value.status_code == 404

    def test_erro_404_quando_detalhes_aluno_nao_existem(self, mock_repos, session_service):
        user_repo, aluno_repo, _ = mock_repos

        user_repo.get_user_by_id.return_value = {
            "idUsuario": 1,
            "nome": "João Silva",
            "perfil": "aluno",
        }
        aluno_repo.get_aluno_repository.return_value = None

        with pytest.raises(HTTPException) as exc_info:
            session_service.profile_by_id(1, "aluno")

        assert exc_info.value.status_code == 404


# =====================================================================
# Testes de perfil de PROFESSOR
# =====================================================================

class TestProfileProfessor:
    def test_retorna_perfil_professor_com_sucesso(self, mock_repos, session_service):
        user_repo, _, professor_repo = mock_repos

        user_repo.get_user_by_id.return_value = {
            "idUsuario": 2,
            "matricula": "P12345",
            "email": "maria@prof",
            "nome": "Maria Souza",
            "perfil": "professor",
        }
        professor_repo.get_professor_repository.return_value = {
            "area_pesquisa": "IA",
            "nomeDepartamento": "CIC",
            "nomeUniversidade": "UnB",
            "departamentoCoordenado": None,
        }

        resultado = session_service.profile_by_id(2, "professor")

        assert resultado["nome"] == "Maria Souza"
        assert resultado["nomeUniversidade"] == "UnB"
        assert resultado["nomeDepartamento"] == "CIC"
        assert resultado["areaPesquisa"] == "IA"
        assert resultado["departamentoCoordenado"] is None
        user_repo.get_user_by_id.assert_called_once_with(2)
        professor_repo.get_professor_repository.assert_called_once_with(2)

    def test_erro_404_quando_detalhes_professor_nao_existem(self, mock_repos, session_service):
        user_repo, _, professor_repo = mock_repos

        user_repo.get_user_by_id.return_value = {
            "idUsuario": 2,
            "nome": "Maria Souza",
            "perfil": "professor",
        }
        professor_repo.get_professor_repository.return_value = None

        with pytest.raises(HTTPException) as exc_info:
            session_service.profile_by_id(2, "professor")

        assert exc_info.value.status_code == 404
