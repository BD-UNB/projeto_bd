from fastapi import APIRouter, Depends, Request
from typing import Annotated

from repositories.candidaturaRepository import CandidaturaRepository
from repositories.vagaRepository import VagaRepository
from services.candidaturaService import CandidaturaService

from infra.security import require_perfil

router = APIRouter(
    prefix = "/candidaturas",
    tags = ["Candidaturas"],
)

candidatura_repo = CandidaturaRepository()
vaga_repo = VagaRepository()
candidatura_service = CandidaturaService(candidatura_repo, vaga_repo)

@router.post("/")
async def candidatar(request: Request, current_user: Annotated[dict, Depends(require_perfil("aluno"))]):
    dados = await request.json()
    return candidatura_service.candidatar(
        current_user["idUsuario"],
        dados.get("idVagas"),
        dados.get("mensagem_apresentacao"),
    )

@router.get("/minhas")
async def listar_minhas_candidaturas(current_user: Annotated[dict, Depends(require_perfil("aluno"))]):
    return candidatura_service.listar_do_aluno(current_user["idUsuario"])
