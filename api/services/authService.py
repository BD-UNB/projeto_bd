import bcrypt
from fastapi import HTTPException, status

from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository
from repositories.professorRepository import ProfessorRepository

class AuthService:
    def __init__(self, user_repo: UserRepository, aluno_repo: AlunoRepository, professor_repo: ProfessorRepository):
        self.user_repo = user_repo
        self.aluno_repo = aluno_repo
        self.professor_repo = professor_repo

    def login(self, matricula: str, senha: str):
        user = self.user_repo.get_user_by_matricula(matricula)

        if not user:
            raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Usuário não encontrado.")

        perfil = user["perfil"]
        senha_hash = user["senha"]

        try:
            if not bcrypt.checkpw(senha.encode('utf-8'), senha_hash.encode('utf-8')):
                raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Senha incorreta." )
            
            return {"status": "ok", "perfil": perfil}

        except Exception as e:
            print(f"Erro ao verificar senha: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro interno de autenticação")

    def register_professor(self, matricula, nome, email, data_de_nasc, senha, area_de_pesquisa, departamento, departamento_coordenado):
        senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        try:
            id_usuario = self.user_repo.create_user(matricula = matricula, nome = nome, email = email, data_nasc = data_de_nasc, perfil = "professor", senha_hash = senha_hash,)
            
            if self.professor_repo.create_professor_details(id_usuario = id_usuario, area_pesquisa = area_de_pesquisa, departamento_nome = departamento, departamento_coordenado_nome = departamento_coordenado):
                return {"status": "ok", "message": "Professor criado com sucesso!"}
            
            else:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao criar detalhes do professor")
        
        except Exception as e:
            print(f"Erro ao criar professor: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = f"Erro ao criar professor: {e}")

    def register_aluno(self, matricula, nome, email, senha, data_nasc, nivel, curriculo, area_interesse):
        senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        try:
            id_usuario = self.user_repo.create_user(matricula = matricula, nome = nome, email = email, data_nasc = data_nasc, perfil = "aluno", senha_hash = senha_hash)
            
            if self.aluno_repo.create_aluno_details(id_usuario = id_usuario, nivel = nivel, curriculo = curriculo, area_interesse = area_interesse):
                return {"status": "ok", "message": "Aluno criado com sucesso!"}
            
            else:
                raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao criar detalhes do aluno")
        
        except Exception as e:
            print(f"Erro ao criar aluno: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = f"Erro ao criar aluno: {e}")
