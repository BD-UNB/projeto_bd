from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import Annotated

from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository
from repositories.professorRepository import ProfessorRepository

from services.alunoService import AlunoService
from services.professorService import ProfessorService

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],  
)

def get_user_repository() -> UserRepository:
    return UserRepository()

def get_aluno_repository() -> AlunoRepository:
    return AlunoRepository()

def get_professor_repository() -> ProfessorRepository:
    return ProfessorRepository()

def get_aluno_service(user_repo: Annotated[UserRepository, Depends(get_user_repository)], aluno_repo: Annotated[AlunoRepository, Depends(get_aluno_repository)]) -> AlunoService:
    return AlunoService(user_repo, aluno_repo)

def get_professor_service(user_repo: Annotated[UserRepository, Depends(get_user_repository)], professor_repo: Annotated[ProfessorRepository, Depends(get_professor_repository)]) -> ProfessorService:
    return ProfessorService(user_repo, professor_repo)

@router.post("/cadastro_professor")
async def register_professor_admin_route(request: Request, professor_service: Annotated[ProfessorService, Depends(get_professor_service)]):
    dados = await request.json()

    required_fields = ["matricula", "nome", "email", "data_nasc", "senha", "area_de_pesquisa", "departamento", "departamento_coordenado"]
    for field in required_fields:
        if field not in dados:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = f"Campo '{field}' é obrigatório.")

    return professor_service.register_professor(
        matricula = dados["matricula"],
        nome = dados["nome"],
        email = dados["email"],
        data_nasc = dados["data_nasc"],
        senha = dados["senha"],
        area_de_pesquisa = dados["area_de_pesquisa"],
        departamento = dados["departamento"],
        departamento_coordenado = dados["departamento_coordenado"]
    )

@router.post("/cadastro_aluno")
async def register_aluno_admin_route(request: Request, aluno_service: Annotated[AlunoService, Depends(get_aluno_service)]):
    dados = await request.json()

    required_fields = ["matricula", "nome", "email", "senha", "data_nasc", "nivel", "area_interesse"]
    for field in required_fields:
        if field not in dados:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = f"Campo '{field}' é obrigatório.")

    curriculo = dados.get("curriculo")

    return aluno_service.register_aluno(
        matricula = dados["matricula"],
        nome = dados["nome"],
        email = dados["email"],
        senha = dados["senha"],
        data_nasc = dados["data_nasc"],
        nivel = dados["nivel"],
        curriculo = curriculo,
        area_interesse = dados["area_interesse"]
    )
