from fastapi import HTTPException, status

from repositories.departamentoRepository import DepartamentoRepository

class DepartamentoService:
    def __init__(self, departamento_repo: DepartamentoRepository):
        self.departamento_repo = departamento_repo

    def listar(self):
        try:
            return self.departamento_repo.get_all_departamentos()
        except Exception as e:
            print(f"Erro ao listar departamentos: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar departamentos.")

    def criar(self, dados: dict):
        if not dados.get("nome"):
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "O nome do departamento é obrigatório.")

        if self.departamento_repo.get_departamento_by_nome(dados["nome"]):
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Já existe um departamento com esse nome.")

        try:
            id_dep = self.departamento_repo.create_departamento(dados)
            return {"status": "ok", "message": "Departamento criado com sucesso!", "idDepartamento": id_dep}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao criar departamento: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao criar departamento.")

    def atualizar(self, id_departamento: int, dados: dict):
        if not self.departamento_repo.get_departamento_by_id(id_departamento):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Departamento não encontrado.")

        # Impede nome duplicado em outro departamento
        nome = dados.get("nome")
        if nome:
            existente = self.departamento_repo.get_departamento_by_nome(nome)
            if existente and existente["idDepartamento"] != id_departamento:
                raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Já existe um departamento com esse nome.")

        try:
            self.departamento_repo.update_departamento(id_departamento, dados)
            return {"status": "ok", "message": "Departamento atualizado com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao atualizar departamento: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao atualizar departamento.")

    def deletar(self, id_departamento: int):
        if not self.departamento_repo.get_departamento_by_id(id_departamento):
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Departamento não encontrado.")
        try:
            self.departamento_repo.delete_departamento(id_departamento)
            return {"status": "ok", "message": "Departamento deletado com sucesso!"}
        except HTTPException:
            raise
        except Exception as e:
            print(f"Erro ao deletar departamento: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao deletar departamento (pode estar em uso por professores, disciplinas ou vagas).")
