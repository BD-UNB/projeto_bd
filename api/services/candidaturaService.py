from fastapi import HTTPException, status

from repositories.candidaturaRepository import CandidaturaRepository
from repositories.vagaRepository import VagaRepository

class CandidaturaService:
    def __init__(self, candidatura_repo: CandidaturaRepository, vaga_repo: VagaRepository):
        self.candidatura_repo = candidatura_repo
        self.vaga_repo = vaga_repo

    def candidatar(self, id_aluno: int, id_vaga: int, mensagem_apresentacao: str = None):
        if not id_vaga:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "A vaga (idVagas) é obrigatória.")

        vaga = self.vaga_repo.get_vaga_by_id(id_vaga)
        if not vaga:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Vaga não encontrada.")

        if self.candidatura_repo.existe(id_aluno, id_vaga):
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Você já se candidatou a esta vaga.")

        try:
            self.candidatura_repo.create_candidatura(id_aluno, id_vaga, mensagem_apresentacao)
            return {"status": "ok", "message": "Inscrição realizada com sucesso!"}

        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao realizar inscrição: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao realizar inscrição.")

    def listar_do_aluno(self, id_aluno: int):
        try:
            return self.candidatura_repo.get_by_aluno(id_aluno)
        except Exception as e:
            print(f"Erro ao listar candidaturas do aluno: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar candidaturas.")
