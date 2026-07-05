from fastapi import APIRouter, Depends
from typing import Annotated

from repositories.vagaRepository import VagaRepository
from services.vagaService import VagaService

from infra.security import get_current_user

router = APIRouter(
    prefix = "/vagas",
    tags = ["Vagas"],
)

vaga_repo = VagaRepository()
vaga_service = VagaService(vaga_repo)

@router.get("/")
async def listar_vagas(current_user: Annotated[dict, Depends(get_current_user)]):
    return vaga_service.listar_vagas_publicadas()
