from fastapi import HTTPException, status

from repositories.vagaRepository import VagaRepository

class VagaService:
    def __init__(self, vaga_repo: VagaRepository):
        self.vaga_repo = vaga_repo

    def listar_vagas_publicadas(self, id_tipo = None, id_departamento = None):
        try:
            vagas = self.vaga_repo.get_vagas_publicadas(id_tipo, id_departamento)
            return vagas

        except Exception as e:
            print(f"Erro ao listar vagas publicadas: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar vagas publicadas.")

    def _validar_obrigatorios(self, dados):
        for campo in ["titulo", "descricao", "carga_horaria", "num_max"]:
            if dados.get(campo) in (None, ""):
                raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = f"Campo '{campo}' é obrigatório.")

    def listar_todas(self):
        try:
            return self.vaga_repo.get_all_vagas()
        except Exception as e:
            print(f"Erro ao listar vagas: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar vagas.")

    def get_vaga(self, id_vaga: int):
        vaga = self.vaga_repo.get_vaga_by_id(id_vaga)
        if not vaga:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Vaga não encontrada.")
        return vaga

    def get_referencias(self):
        try:
            return self.vaga_repo.get_referencias()
        except Exception as e:
            print(f"Erro ao buscar referências: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao buscar referências.")

    def criar(self, dados: dict, id_professor: int = None):
        self._validar_obrigatorios(dados)
        try:
            id_vaga = self.vaga_repo.create_vaga(dados)
            if id_professor:
                self.vaga_repo.add_responsavel(id_professor, id_vaga)
            return {"status": "ok", "message": "Vaga criada com sucesso!", "idVagas": id_vaga}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao criar vaga: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao criar vaga.")

    def atualizar(self, id_vaga: int, dados: dict):
        self.get_vaga(id_vaga)
        try:
            self.vaga_repo.update_vaga(id_vaga, dados)
            return {"status": "ok", "message": "Vaga atualizada com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao atualizar vaga: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao atualizar vaga.")

    def deletar(self, id_vaga: int):
        self.get_vaga(id_vaga)
        try:
            self.vaga_repo.delete_vaga(id_vaga)
            return {"status": "ok", "message": "Vaga deletada com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao deletar vaga: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao deletar vaga.")

    def listar_do_professor(self, id_professor: int):
        try:
            return self.vaga_repo.get_vagas_by_professor(id_professor)
        except Exception as e:
            print(f"Erro ao listar vagas do professor: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar vagas do professor.")

    def _garantir_responsavel(self, id_professor: int, id_vaga: int):
        self.get_vaga(id_vaga)
        if not self.vaga_repo.is_responsavel(id_professor, id_vaga):
            raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Você só pode gerenciar as vagas das quais é responsável.")

    def atualizar_do_professor(self, id_professor: int, id_vaga: int, dados: dict):
        self._garantir_responsavel(id_professor, id_vaga)
        return self.atualizar(id_vaga, dados)

    def deletar_do_professor(self, id_professor: int, id_vaga: int):
        self._garantir_responsavel(id_professor, id_vaga)
        return self.deletar(id_vaga)
