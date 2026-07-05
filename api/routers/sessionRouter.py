from fastapi import APIRouter, Depends, HTTPException, status, Request
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