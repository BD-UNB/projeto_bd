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
                raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Usuário não encontrado.")
            
            if perfil == "aluno":
                aluno = self.aluno_repo.get_aluno_repository(id_usuario)
                if not aluno:
                    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Aluno não encontrado.")
                return {
                    "nome": user["nome"],
                    "matricula": user["matricula"],
                    "email": user["email"],
                    "nivel": aluno["nivel"],
                    "curriculo": aluno["curriculo"] is not None,
                    "area_interesse": aluno["area_interesse"],
                    "nomeCurso": aluno["nomeCurso"],
                    "nomeUniversidade": aluno["nomeUniversidade"],
                    "nomeDepartamento": aluno["nomeDepartamento"],
                }
            elif perfil == "professor":
                professor = self.professor_repo.get_professor_repository(id_usuario)
                if not professor:
                    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Professor não encontrado.")
                return {
                    "nome": user["nome"],
                    "matricula": user["matricula"],
                    "email": user["email"],
                    "nomeUniversidade": professor["nomeUniversidade"],
                    "nomeDepartamento": professor["nomeDepartamento"],
                    "areaPesquisa": professor["area_pesquisa"],
                    "departamentoCoordenado": professor["departamentoCoordenado"],
                }
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao buscar perfil do usuário: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao buscar perfil do usuário.")