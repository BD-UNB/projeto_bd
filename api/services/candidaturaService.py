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

    STATUS_VALIDOS = ("enviado", "em_analise", "aprovado", "recusado", "cancelado")

    def _pode_gerenciar(self, current_user: dict, id_vaga: int):
        if not self.vaga_repo.get_vaga_by_id(id_vaga):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Vaga não encontrada.")
        if current_user["perfil"] == "admin":
            return
        if current_user["perfil"] == "professor" and self.vaga_repo.is_responsavel(current_user["idUsuario"], id_vaga):
            return
        raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Você só pode gerenciar as candidaturas das vagas das quais é responsável.")

    def listar_por_vaga(self, current_user: dict, id_vaga: int):
        self._pode_gerenciar(current_user, id_vaga)
        try:
            return self.candidatura_repo.get_by_vaga(id_vaga)
        except Exception as e:
            print(f"Erro ao listar candidaturas da vaga: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar candidaturas da vaga.")

    def atualizar_status(self, current_user: dict, id_vaga: int, id_aluno: int, novo_status: str):
        self._pode_gerenciar(current_user, id_vaga)

        if novo_status not in self.STATUS_VALIDOS:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "Status inválido.")

        if not self.candidatura_repo.existe(id_aluno, id_vaga):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Candidatura não encontrada.")

        try:
            self.candidatura_repo.update_status(id_aluno, id_vaga, novo_status)
            return {"status": "ok", "message": "Status da candidatura atualizado!"}

        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao atualizar status da candidatura: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao atualizar status da candidatura.")
