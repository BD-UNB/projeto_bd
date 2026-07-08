from fastapi import HTTPException, status

from repositories.disciplinaRepository import DisciplinaRepository

class DisciplinaService:
    def __init__(self, disciplina_repo: DisciplinaRepository):
        self.disciplina_repo = disciplina_repo

    def _validar(self, dados):
        if not dados.get("nome"):
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "O nome da disciplina é obrigatório.")
        if dados.get("carga_horaria") in (None, ""):
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "A carga horária é obrigatória.")

    def listar(self):
        try:
            return self.disciplina_repo.get_all_disciplinas()
        except Exception as e:
            print(f"Erro ao listar disciplinas: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar disciplinas.")

    def criar(self, dados: dict):
        self._validar(dados)
        try:
            id_disciplina = self.disciplina_repo.create_disciplina(dados)
            return {"status": "ok", "message": "Disciplina criada com sucesso!", "idDisciplina": id_disciplina}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao criar disciplina: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao criar disciplina.")

    def atualizar(self, id_disciplina: int, dados: dict):
        if not self.disciplina_repo.get_disciplina_by_id(id_disciplina):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Disciplina não encontrada.")
        try:
            self.disciplina_repo.update_disciplina(id_disciplina, dados)
            return {"status": "ok", "message": "Disciplina atualizada com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao atualizar disciplina: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao atualizar disciplina.")

    def deletar(self, id_disciplina: int):
        if not self.disciplina_repo.get_disciplina_by_id(id_disciplina):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Disciplina não encontrada.")
        try:
            self.disciplina_repo.delete_disciplina(id_disciplina)
            return {"status": "ok", "message": "Disciplina deletada com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao deletar disciplina: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao deletar disciplina (pode haver alunos que a cursaram).")
