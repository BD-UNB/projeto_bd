from fastapi import HTTPException, status

from repositories.vagaRepository import VagaRepository

class VagaService:
    def __init__(self, vaga_repo: VagaRepository):
        self.vaga_repo = vaga_repo

    def listar_vagas_publicadas(self):
        try:
            vagas = self.vaga_repo.get_vagas_publicadas()
            return vagas

        except Exception as e:
            print(f"Erro ao listar vagas publicadas: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar vagas publicadas.")
