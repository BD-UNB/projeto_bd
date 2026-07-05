import bcrypt
from fastapi import HTTPException, status

from repositories.userRepository import UserRepository
from repositories.professorRepository import ProfessorRepository

class ProfessorService:
    def __init__(self, user_repo: UserRepository, professor_repo: ProfessorRepository):
        self.user_repo = user_repo
        self.professor_repo = professor_repo

    def register_professor(self, matricula, nome, email, data_nasc, senha, area_de_pesquisa, departamento, departamento_coordenado):
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

            if self.professor_repo.create_professor_details(
                id_usuario = id_usuario,
                area_pesquisa = area_de_pesquisa,
                departamento_nome = departamento,
                departamento_coordenado_nome = departamento_coordenado
            ):
                return {"status": "ok", "message": "Professor criado com sucesso!"}

            else:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Falha ao criar detalhes do professor.")

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
