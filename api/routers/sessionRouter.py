from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import Response
from typing import Annotated

from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository
from repositories.professorRepository import ProfessorRepository
from services.sessionService import SessionService

from infra.security import get_current_user

router = APIRouter(
    prefix = "/profile", 
    tags = ["Profile"],
)

user_repo = UserRepository()
aluno_repo = AlunoRepository()
professor_repo = ProfessorRepository()
session_service = SessionService(user_repo, aluno_repo, professor_repo)

@router.get("/me")
async def get_profile(current_user: Annotated[dict, Depends(get_current_user)]):
    return session_service.profile_by_id(current_user["idUsuario"], current_user["perfil"])

@router.put("/me")
async def update_profile(request: Request, current_user: Annotated[dict, Depends(get_current_user)]):
    dados = await request.json()
    return session_service.update_profile(current_user["idUsuario"], current_user["perfil"], dados)

@router.get("/me/curriculo")
async def get_curriculo(current_user: Annotated[dict, Depends(get_current_user)]):
    curriculo = session_service.get_curriculo(current_user["idUsuario"], current_user["perfil"])
    return Response(content = curriculo, media_type = "application/pdf")