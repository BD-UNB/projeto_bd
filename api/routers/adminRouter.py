from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import Annotated, Optional # Optional ainda é útil para parâmetros de função

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

    required_fields = ["matricula", "nome", "email", "data_nasc", "senha", "area_de_pesquisa"]
    for field in required_fields:
        if field not in dados:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = f"Campo '{field}' é obrigatório.")

    departamento = dados.get("departamento")
    departamento_coordenado = dados.get("departamento_coordenado")

    return professor_service.register_professor(
        matricula = dados["matricula"],
        nome = dados["nome"],
        email = dados["email"],
        data_nasc = dados["data_nasc"],
        senha = dados["senha"],
        area_de_pesquisa = dados["area_de_pesquisa"],
        departamento = departamento,
        departamento_coordenado = departamento_coordenado
    )

@router.post("/cadastro_aluno")
async def register_aluno_admin_route(request: Request, aluno_service: Annotated[AlunoService, Depends(get_aluno_service)]):
    dados = await request.json()

    required_fields = ["matricula", "nome", "email", "senha", "data_nasc", "nivel"]
    for field in required_fields:
        if field not in dados:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = f"Campo '{field}' é obrigatório.")

    curriculo = dados.get("curriculo")
    area_interesse = dados.get("area_interesse")

    return aluno_service.register_aluno(
        matricula = dados["matricula"],
        nome = dados["nome"],
        email = dados["email"],
        senha = dados["senha"],
        data_nasc = dados["data_nasc"],
        nivel = dados["nivel"],
        curriculo = curriculo,
        area_interesse = area_interesse
    )

@router.get("/alunos/{id_aluno}")
async def get_aluno_admin_route(id_aluno: int, aluno_service: Annotated[AlunoService, Depends(get_aluno_service)]):
    return aluno_service.get_aluno_by_id_admin(id_aluno)

@router.put("/alunos/{id_aluno}")
async def update_aluno_admin_route(id_aluno: int, request: Request, aluno_service: Annotated[AlunoService, Depends(get_aluno_service)]):
    dados = await request.json()

    return aluno_service.update_aluno_admin(
        id_aluno = id_aluno,
        matricula = dados.get("matricula"),
        nome = dados.get("nome"),
        email = dados.get("email"),
        senha = dados.get("senha"),
        data_nasc = dados.get("data_nasc"),
        perfil = dados.get("perfil"),
        nivel = dados.get("nivel"),
        curriculo = dados.get("curriculo"),
        area_interesse = dados.get("area_interesse")
    )

@router.delete("/alunos/{id_aluno}")
async def delete_aluno_admin_route(id_aluno: int, aluno_service: Annotated[AlunoService, Depends(get_aluno_service)]):
    return aluno_service.delete_aluno_admin(id_aluno)

@router.get("/professores/{id_professor}")
async def get_professor_admin_route(id_professor: int, professor_service: Annotated[ProfessorService, Depends(get_professor_service)]):
    return professor_service.get_professor_by_id_admin(id_professor)

@router.put("/professores/{id_professor}")
async def update_professor_admin_route(id_professor: int, request: Request, professor_service: Annotated[ProfessorService, Depends(get_professor_service)]):
    dados = await request.json()

    return professor_service.update_professor_admin(
        id_professor = id_professor,
        matricula = dados.get("matricula"),
        nome = dados.get("nome"),
        email = dados.get("email"),
        senha = dados.get("senha"),
        data_nasc = dados.get("data_nasc"),
        perfil = dados.get("perfil"),
        area_de_pesquisa = dados.get("area_de_pesquisa"),
        departamento = dados.get("departamento"),
        departamento_coordenado = dados.get("departamento_coordenado")
    )

@router.delete("/professores/{id_professor}")
async def delete_professor_admin_route(id_professor: int, professor_service: Annotated[ProfessorService, Depends(get_professor_service)]):
    return professor_service.delete_professor_admin(id_professor)
