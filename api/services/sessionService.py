from fastapi import HTTPException, status
from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository
from repositories.professorRepository import ProfessorRepository

class SessionService:
    def __init__(self, user_repo: UserRepository, aluno_repo: AlunoRepository, professor_repo: ProfessorRepository):
        self.user_repo = user_repo
        self.aluno_repo = aluno_repo
        self.professor_repo = professor_repo
    
    def profile_by_id(self, id_usuario: int, perfil: str):
        try:
            user = self.user_repo.get_user_by_id(id_usuario)
            if not user:
                from fastapi import HTTPException, status
                raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Usuário não encontrado.")
            
            if perfil == "aluno":
                aluno = self.aluno_repo.get_aluno_repository(id_usuario)
                if not aluno:
                    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Aluno não encontrado.")
                return {
                    "nome": user["nome"],
                    "nivel": aluno[0],
                    "curriculo": aluno[1],
                    "area_interesse": aluno[2],
                }
            elif perfil == "professor":
                professor = self.professor_repo.get_professor_repository(id_usuario)
                if not professor:
                    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Professor não encontrado.")
                return {
                    "nome": user["nome"],
                    "nomeUniversidade": professor[0],
                    "nomeDepartamento": professor[1],
                }
        except Exception as e:
            
            print(f"Erro ao buscar perfil do usuário: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao buscar perfil do usuário.")