import bcrypt
from fastapi import HTTPException, status
from typing import Optional

from repositories.userRepository import UserRepository
from repositories.professorRepository import ProfessorRepository

class ProfessorService:
    def __init__(self, user_repo: UserRepository, professor_repo: ProfessorRepository):
        self.user_repo = user_repo
        self.professor_repo = professor_repo

    def register_professor(self, matricula: str, nome: str, email: str, data_nasc: str, senha: str, area_de_pesquisa: str, departamento: Optional[str], departamento_coordenado: Optional[str]):
        
        if self.user_repo.get_user_by_matricula(matricula):
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Matrícula já cadastrada.")
        
        if self.user_repo.get_user_by_email(email):
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Email já cadastrado.")

        senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        try:
            id_usuario = self.user_repo.create_user(
                matricula = matricula, 
                nome = nome, 
                email = email,
                data_nasc = data_nasc,
                perfil = "professor",
                senha_hash = senha_hash,
            )

            if id_usuario:
                if self.professor_repo.create_professor_details(
                    id_usuario = id_usuario,
                    area_pesquisa = area_de_pesquisa,
                    departamento_nome = departamento,
                    departamento_coordenado_nome = departamento_coordenado
                ):
                    return {"status": "ok", "message": "Professor criado com sucesso!", "id": id_usuario}
                else:
                    self.user_repo.delete_user(id_usuario)
                    raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao criar detalhes do professor. Usuário revertido.")
            else:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao criar usuário.")

        except HTTPException:
            raise

        except Exception as e:
            print(f"Erro ao criar professor: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = f"Erro interno ao registrar professor: {e}")


    def get_perfil_professor(self, matricula):
        try:
            professor = self.professor_repo.get_professor_by_id(user["idUsuario"])
            if not professor:
                raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Professor não encontrado.")
            return {
                "nome": user["nome"],
                "nomeUniversidade": user["nomeUniversidade"],
                "nomeDepartamento": user["nomeDepartamento"],
            }
        except Exception as e:
            print(f"Erro ao buscar perfil do professor: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao buscar perfil do professor.")

    # Outros métodos relacionados a Professor (ex: get_professor, update_professor, delete_professor) viriam aqui
    def get_all_professores_admin(self):
        return self.professor_repo.get_all_professores()

    def get_professor_by_id_admin(self, id_professor: int):
        professor = self.professor_repo.get_professor_by_id(id_professor)
        
        if not professor:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Professor não encontrado.")
        
        if 'senha' in professor:
            del professor['senha']
        return professor

    def update_professor_admin(self, id_professor: int, matricula: Optional[str] = None, nome: Optional[str] = None, email: Optional[str] = None, data_nasc: Optional[str] = None, perfil: Optional[str] = None, senha: Optional[str] = None, area_de_pesquisa: Optional[str] = None, departamento: Optional[str] = None, departamento_coordenado: Optional[str] = None):

        existing_professor = self.professor_repo.get_professor_by_id(id_professor)
        if not existing_professor:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Professor não encontrado.")

        user_updated = False
        if matricula or nome or email or data_nasc or perfil or senha:
            senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8') if senha else None
            user_updated = self.user_repo.update_user(id_professor, matricula, nome, email, data_nasc, perfil, senha_hash)

        professor_details_updated = False
        if area_de_pesquisa or departamento or departamento_coordenado:
            professor_details_updated = self.professor_repo.update_professor_details(id_professor, area_de_pesquisa, departamento, departamento_coordenado)

        if user_updated or professor_details_updated:
            return {"status": "ok", "message": "Professor atualizado com sucesso!"}
        
        else:
            if not (matricula or nome or email or data_nasc or perfil or senha or area_de_pesquisa or departamento or departamento_coordenado):
                return {"status": "info", "message": "Nenhum dado fornecido para atualização."}
            return {"status": "ok", "message": "Nenhum dado alterado (possivelmente os dados fornecidos já são os mesmos)."}

    def delete_professor_admin(self, id_professor: int):

        existing_professor = self.professor_repo.get_professor_by_id(id_professor)
        if not existing_professor:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Professor não encontrado.")

        try:
            professor_deleted = self.professor_repo.delete_professor_details(id_professor)
            if not professor_deleted:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao deletar detalhes do professor.")

            user_deleted = self.user_repo.delete_user(id_professor)
            if not user_deleted:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao deletar usuário.")

            return {"status": "ok", "message": "Professor deletado com sucesso!"}
        
        except HTTPException:
            raise
        
        except Exception as e:
            print(f"Erro ao deletar professor: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = f"Erro interno ao deletar professor: {e}")
