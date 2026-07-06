from fastapi import HTTPException, status

from repositories.comentarioRepository import ComentarioRepository

class ComentarioService:
    def __init__(self, comentario_repo: ComentarioRepository):
        self.comentario_repo = comentario_repo

    def listar_por_vaga(self, id_vaga: int):
        try:
            return self.comentario_repo.get_comentarios_por_vaga(id_vaga)

        except Exception as e:
            print(f"Erro ao listar comentários: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao listar comentários.")

    def adicionar(self, id_vaga: int, id_usuario: int, texto: str):
        if not texto or not texto.strip():
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "O texto do comentário é obrigatório.")

        try:
            id_comentario = self.comentario_repo.create_comentario(id_vaga, id_usuario, texto)
            return {"status": "ok", "message": "Comentário adicionado com sucesso!", "idComentario": id_comentario}

        except Exception as e:
            print(f"Erro ao adicionar comentário: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao adicionar comentário.")

    def editar(self, id_comentario: int, id_usuario: int, texto: str):
        if not texto or not texto.strip():
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "O texto do comentário é obrigatório.")

        comentario = self.comentario_repo.get_comentario_by_id(id_comentario)
        if not comentario:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Comentário não encontrado.")

        if comentario["idUsuario"] != id_usuario:
            raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Você só pode editar os seus próprios comentários.")

        try:
            self.comentario_repo.update_comentario(id_comentario, texto)
            return {"status": "ok", "message": "Comentário atualizado com sucesso!"}

        except Exception as e:
            print(f"Erro ao editar comentário: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao editar comentário.")

    def deletar(self, id_comentario: int, id_usuario: int):
        comentario = self.comentario_repo.get_comentario_by_id(id_comentario)
        if not comentario:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Comentário não encontrado.")

        if comentario["idUsuario"] != id_usuario:
            raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Você só pode deletar os seus próprios comentários.")

        try:
            self.comentario_repo.delete_comentario(id_comentario)
            return {"status": "ok", "message": "Comentário deletado com sucesso!"}

        except Exception as e:
            print(f"Erro ao deletar comentário: {e}")
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail = "Erro ao deletar comentário.")
