from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import Annotated

from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository
from repositories.professorRepository import ProfessorRepository
from services.authService import AuthService


router = APIRouter(
    prefix = "/auth", 
    tags = ["Auth"],
)

def get_user_repository() -> UserRepository:
    return UserRepository()

def get_aluno_repository() -> AlunoRepository:
    return AlunoRepository()

def get_professor_repository() -> ProfessorRepository:
    return ProfessorRepository()

def get_auth_service(user_repo: Annotated[UserRepository, Depends(get_user_repository)], aluno_repo: Annotated[AlunoRepository, Depends(get_aluno_repository)], professor_repo: Annotated[ProfessorRepository, Depends(get_professor_repository)]) -> AuthService:
    return AuthService(user_repo, aluno_repo, professor_repo)
    
@router.post("/login")
async def login_route(request: Request, auth_service: Annotated[AuthService, Depends(get_auth_service)]):
    json_data = await request.json()
    matricula = json_data.get("matricula")
    senha = json_data.get("senha")

    if not matricula:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "A Matrícula é obrigatória.")

    if not senha:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "A Senha é obrigatória.")

    return auth_service.login(matricula, senha)
