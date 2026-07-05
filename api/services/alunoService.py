import bcrypt
from fastapi import HTTPException, status

from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository

class AlunoService:
    def __init__(self, user_repo: UserRepository, aluno_repo: AlunoRepository):
        self.user_repo = user_repo
        self.aluno_repo = aluno_repo

    def register_aluno(self, matricula: str, nome: str, email: str, senha: str, data_nasc: str, nivel: str, curriculo: str, area_interesse: str):
        senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        try:
            id_usuario = self.user_repo.create_user(
                matricula = matricula,
                nome = nome,
                email = email,
                data_nasc = data_nasc,
                perfil = "aluno",
                senha_hash = senha_hash
            )

            if self.aluno_repo.create_aluno_details(
                id_usuario = id_usuario,
                nivel = nivel,
                curriculo = curriculo,
                area_interesse = area_interesse
            ):
                return {"status": "ok", "message": "Aluno criado com sucesso!"}

            else:
                raise HTTPException(
                    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail = "Falha ao criar detalhes do aluno."
                )

        except Exception as e:
            print(f"Erro ao criar aluno: {e}")
            raise HTTPException(
                status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail = f"Erro interno ao registrar aluno: {e}"
            )

    def get_perfil_aluno(self, idUsuario):
        try:
            aluno = self.aluno_repo.get_aluno_by_id(idUsuario)
            
            if not aluno:
                raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Aluno não encontrado.")
            return {
                "nivel": aluno["nivel"],
                "curriculo": aluno["curriculo"],
                "area_interesse": aluno["area_interesse"],
            }
        except Exception as e:
            print(f"Erro ao buscar perfil do aluno: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao buscar perfil do aluno.")
