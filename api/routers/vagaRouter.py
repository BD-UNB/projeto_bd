from fastapi import APIRouter, Depends, Request
from typing import Annotated, Optional

from repositories.vagaRepository import VagaRepository
from services.vagaService import VagaService

from infra.security import get_current_user, require_perfil

router = APIRouter(
    prefix = "/vagas",
    tags = ["Vagas"],
)

vaga_repo = VagaRepository()
vaga_service = VagaService(vaga_repo)

@router.get("/")
async def listar_vagas(current_user: Annotated[dict, Depends(get_current_user)], tipo: Optional[int] = None, departamento: Optional[int] = None):
    return vaga_service.listar_vagas_publicadas(tipo, departamento)

@router.get("/referencias")
async def listar_referencias(current_user: Annotated[dict, Depends(require_perfil("professor"))]):
    return vaga_service.get_referencias()

@router.get("/minhas")
async def listar_minhas_vagas(current_user: Annotated[dict, Depends(require_perfil("professor"))]):
    return vaga_service.listar_do_professor(current_user["idUsuario"])

@router.post("/")
async def criar_vaga(request: Request, current_user: Annotated[dict, Depends(require_perfil("professor"))]):
    dados = await request.json()
    return vaga_service.criar(dados, current_user["idUsuario"])

@router.put("/{id_vaga}")
async def atualizar_vaga(id_vaga: int, request: Request, current_user: Annotated[dict, Depends(require_perfil("professor"))]):
    dados = await request.json()
    return vaga_service.atualizar_do_professor(current_user["idUsuario"], id_vaga, dados)

@router.delete("/{id_vaga}")
async def deletar_vaga(id_vaga: int, current_user: Annotated[dict, Depends(require_perfil("professor"))]):
    return vaga_service.deletar_do_professor(current_user["idUsuario"], id_vaga)
