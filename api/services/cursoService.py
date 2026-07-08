from fastapi import HTTPException, status

from repositories.cursoRepository import CursoRepository

class CursoService:
    def __init__(self, curso_repo: CursoRepository):
        self.curso_repo = curso_repo

    def _validar(self, dados):
        if not dados.get("nome"):
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "O nome do curso é obrigatório.")
        if dados.get("duracao_semestres") in (None, ""):
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "A duração em semestres é obrigatória.")

    def listar(self):
        try:
            return self.curso_repo.get_all_cursos()
        except Exception as e:
            print(f"Erro ao listar cursos: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar cursos.")

    def criar(self, dados: dict):
        self._validar(dados)
        try:
            id_curso = self.curso_repo.create_curso(dados)
            return {"status": "ok", "message": "Curso criado com sucesso!", "idCurso": id_curso}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao criar curso: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao criar curso.")

    def atualizar(self, id_curso: int, dados: dict):
        if not self.curso_repo.get_curso_by_id(id_curso):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Curso não encontrado.")
        try:
            self.curso_repo.update_curso(id_curso, dados)
            return {"status": "ok", "message": "Curso atualizado com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao atualizar curso: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao atualizar curso.")

    def deletar(self, id_curso: int):
        if not self.curso_repo.get_curso_by_id(id_curso):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Curso não encontrado.")
        try:
            self.curso_repo.delete_curso(id_curso)
            return {"status": "ok", "message": "Curso deletado com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao deletar curso: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao deletar curso (pode haver alunos inscritos).")
