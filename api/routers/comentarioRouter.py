from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import Annotated

from repositories.comentarioRepository import ComentarioRepository
from services.comentarioService import ComentarioService

from infra.security import get_current_user

router = APIRouter(
    prefix = "/comentarios",
    tags = ["Comentarios"],
)

comentario_repo = ComentarioRepository()
comentario_service = ComentarioService(comentario_repo)

@router.get("/vaga/{id_vaga}")
async def listar_comentarios(id_vaga: int, current_user: Annotated[dict, Depends(get_current_user)]):
    return comentario_service.listar_por_vaga(id_vaga)

@router.post("/")
async def adicionar_comentario(request: Request, current_user: Annotated[dict, Depends(get_current_user)]):
    dados = await request.json()

    id_vaga = dados.get("idVagas")
    texto = dados.get("texto")

    if not id_vaga:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "A vaga (idVagas) é obrigatória.")

    return comentario_service.adicionar(id_vaga, current_user["idUsuario"], texto)

@router.put("/{id_comentario}")
async def editar_comentario(id_comentario: int, request: Request, current_user: Annotated[dict, Depends(get_current_user)]):
    dados = await request.json()

    return comentario_service.editar(id_comentario, current_user["idUsuario"], dados.get("texto"))

@router.delete("/{id_comentario}")
async def deletar_comentario(id_comentario: int, current_user: Annotated[dict, Depends(get_current_user)]):
    return comentario_service.deletar(id_comentario, current_user["idUsuario"])
