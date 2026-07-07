import bcrypt
from fastapi import HTTPException, status
from typing import Optional

from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository

class AlunoService:
    def __init__(self, user_repo: UserRepository, aluno_repo: AlunoRepository):
        self.user_repo = user_repo
        self.aluno_repo = aluno_repo

    def register_aluno(self, matricula: str, nome: str, email: str, senha: str, data_nasc: str, nivel: str, curriculo: Optional[bytes], area_interesse: Optional[str]):

        if self.user_repo.get_user_by_matricula(matricula):
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Matrícula já cadastrada.")

        if self.user_repo.get_user_by_email(email):
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Email já cadastrado.")

        senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        try:
            id_usuario = self.user_repo.create_user(matricula = matricula, nome = nome, email = email, data_nasc = data_nasc, perfil = "aluno", senha_hash = senha_hash)

            if id_usuario: 

                if self.aluno_repo.create_aluno_details(id_usuario = id_usuario, nivel = nivel, curriculo = curriculo, area_interesse = area_interesse):
                    return {"status": "ok", "message": "Aluno criado com sucesso!", "id": id_usuario}

                else:
                    self.user_repo.delete_user(id_usuario) 
                    raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao criar detalhes do aluno. Usuário revertido.")

            else:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao criar usuário.")

        except HTTPException:
            raise

        except Exception as e:
            print(f"Erro ao criar aluno: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = f"Erro interno ao registrar aluno: {e}")

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
    def get_all_alunos_admin(self):
        return self.aluno_repo.get_all_alunos()

    def get_aluno_by_id_admin(self, id_aluno: int):
        aluno = self.aluno_repo.get_aluno_by_id(id_aluno)
        if not aluno:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Aluno não encontrado.")

        if 'senha' in aluno:
            del aluno['senha']
        return aluno

    def update_aluno_admin(self, id_aluno: int, matricula: Optional[str] = None, nome: Optional[str] = None, email: Optional[str] = None, data_nasc: Optional[str] = None, perfil: Optional[str] = None, senha: Optional[str] = None, nivel: Optional[str] = None, curriculo: Optional[bytes] = None, area_interesse: Optional[str] = None):

        existing_aluno = self.aluno_repo.get_aluno_by_id(id_aluno)
        if not existing_aluno:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Aluno não encontrado.")

        user_updated = False
        if matricula or nome or email or data_nasc or perfil or senha:
            senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8') if senha else None
            user_updated = self.user_repo.update_user(id_aluno, matricula, nome, email, data_nasc, perfil, senha_hash)

        aluno_details_updated = False
        if nivel or curriculo or area_interesse:
            aluno_details_updated = self.aluno_repo.update_aluno_details(id_aluno, nivel, curriculo, area_interesse)

        if user_updated or aluno_details_updated:
            return {"status": "ok", "message": "Aluno atualizado com sucesso!"}
        else:
            if not (matricula or nome or email or data_nasc or perfil or senha or nivel or curriculo or area_interesse):
                return {"status": "info", "message": "Nenhum dado fornecido para atualização."}
            return {"status": "ok", "message": "Nenhum dado alterado (possivelmente os dados fornecidos já são os mesmos)."}


    def delete_aluno_admin(self, id_aluno: int):
        existing_aluno = self.aluno_repo.get_aluno_by_id(id_aluno)
        if not existing_aluno:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Aluno não encontrado.")

        try:
            aluno_deleted = self.aluno_repo.delete_aluno_details(id_aluno)
            if not aluno_deleted:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao deletar detalhes do aluno.")

            user_deleted = self.user_repo.delete_user(id_aluno)
            if not user_deleted:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao deletar usuário.")

            return {"status": "ok", "message": "Aluno deletado com sucesso!"}

        except HTTPException:
            raise

        except Exception as e:
            print(f"Erro ao deletar aluno: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = f"Erro interno ao deletar aluno: {e}")
