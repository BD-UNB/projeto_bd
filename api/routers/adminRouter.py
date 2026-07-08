from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import Annotated, Optional # Optional ainda é útil para parâmetros de função

from repositories.userRepository import UserRepository
from repositories.alunoRepository import AlunoRepository
from repositories.professorRepository import ProfessorRepository

from repositories.vagaRepository import VagaRepository
from repositories.cursoRepository import CursoRepository
from repositories.disciplinaRepository import DisciplinaRepository

from repositories.departamentoRepository import DepartamentoRepository

from services.alunoService import AlunoService
from services.professorService import ProfessorService
from services.vagaService import VagaService
from services.cursoService import CursoService
from services.disciplinaService import DisciplinaService
from services.departamentoService import DepartamentoService

from infra.security import require_perfil

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(require_perfil("admin"))],
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

def get_vaga_repository() -> VagaRepository:
    return VagaRepository()

def get_vaga_service(vaga_repo: Annotated[VagaRepository, Depends(get_vaga_repository)]) -> VagaService:
    return VagaService(vaga_repo)

def get_curso_repository() -> CursoRepository:
    return CursoRepository()

def get_curso_service(curso_repo: Annotated[CursoRepository, Depends(get_curso_repository)]) -> CursoService:
    return CursoService(curso_repo)

def get_disciplina_repository() -> DisciplinaRepository:
    return DisciplinaRepository()

def get_disciplina_service(disciplina_repo: Annotated[DisciplinaRepository, Depends(get_disciplina_repository)]) -> DisciplinaService:
    return DisciplinaService(disciplina_repo)

def get_departamento_repository() -> DepartamentoRepository:
    return DepartamentoRepository()

def get_departamento_service(departamento_repo: Annotated[DepartamentoRepository, Depends(get_departamento_repository)]) -> DepartamentoService:
    return DepartamentoService(departamento_repo)

@router.get("/alunos")
async def get_alunos_admin_route(aluno_service: Annotated[AlunoService, Depends(get_aluno_service)]):
    return aluno_service.get_all_alunos_admin()

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

@router.get("/professores")
async def get_professores_admin_route(professor_service: Annotated[ProfessorService, Depends(get_professor_service)]):
    return professor_service.get_all_professores_admin()

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

@router.get("/referencias_professor")
async def get_referencias_professor_admin_route(professor_service: Annotated[ProfessorService, Depends(get_professor_service)]):
    return professor_service.get_referencias_admin()

@router.get("/referencias")
async def get_referencias_admin_route(vaga_service: Annotated[VagaService, Depends(get_vaga_service)]):
    return vaga_service.get_referencias()

@router.get("/vagas")
async def get_vagas_admin_route(vaga_service: Annotated[VagaService, Depends(get_vaga_service)]):
    return vaga_service.listar_todas()

@router.get("/vagas/{id_vaga}")
async def get_vaga_admin_route(id_vaga: int, vaga_service: Annotated[VagaService, Depends(get_vaga_service)]):
    return vaga_service.get_vaga(id_vaga)

@router.post("/vagas")
async def create_vaga_admin_route(request: Request, vaga_service: Annotated[VagaService, Depends(get_vaga_service)]):
    dados = await request.json()
    return vaga_service.criar(dados)

@router.put("/vagas/{id_vaga}")
async def update_vaga_admin_route(id_vaga: int, request: Request, vaga_service: Annotated[VagaService, Depends(get_vaga_service)]):
    dados = await request.json()
    return vaga_service.atualizar(id_vaga, dados)

@router.delete("/vagas/{id_vaga}")
async def delete_vaga_admin_route(id_vaga: int, vaga_service: Annotated[VagaService, Depends(get_vaga_service)]):
    return vaga_service.deletar(id_vaga)

@router.get("/cursos")
async def get_cursos_admin_route(curso_service: Annotated[CursoService, Depends(get_curso_service)]):
    return curso_service.listar()

@router.post("/cursos")
async def create_curso_admin_route(request: Request, curso_service: Annotated[CursoService, Depends(get_curso_service)]):
    dados = await request.json()
    return curso_service.criar(dados)

@router.put("/cursos/{id_curso}")
async def update_curso_admin_route(id_curso: int, request: Request, curso_service: Annotated[CursoService, Depends(get_curso_service)]):
    dados = await request.json()
    return curso_service.atualizar(id_curso, dados)

@router.delete("/cursos/{id_curso}")
async def delete_curso_admin_route(id_curso: int, curso_service: Annotated[CursoService, Depends(get_curso_service)]):
    return curso_service.deletar(id_curso)

@router.get("/disciplinas")
async def get_disciplinas_admin_route(disciplina_service: Annotated[DisciplinaService, Depends(get_disciplina_service)]):
    return disciplina_service.listar()

@router.post("/disciplinas")
async def create_disciplina_admin_route(request: Request, disciplina_service: Annotated[DisciplinaService, Depends(get_disciplina_service)]):
    dados = await request.json()
    return disciplina_service.criar(dados)

@router.put("/disciplinas/{id_disciplina}")
async def update_disciplina_admin_route(id_disciplina: int, request: Request, disciplina_service: Annotated[DisciplinaService, Depends(get_disciplina_service)]):
    dados = await request.json()
    return disciplina_service.atualizar(id_disciplina, dados)

@router.delete("/disciplinas/{id_disciplina}")
async def delete_disciplina_admin_route(id_disciplina: int, disciplina_service: Annotated[DisciplinaService, Depends(get_disciplina_service)]):
    return disciplina_service.deletar(id_disciplina)

@router.get("/departamentos")
async def get_departamentos_admin_route(departamento_service: Annotated[DepartamentoService, Depends(get_departamento_service)]):
    return departamento_service.listar()

@router.post("/departamentos")
async def create_departamento_admin_route(request: Request, departamento_service: Annotated[DepartamentoService, Depends(get_departamento_service)]):
    dados = await request.json()
    return departamento_service.criar(dados)

@router.put("/departamentos/{id_departamento}")
async def update_departamento_admin_route(id_departamento: int, request: Request, departamento_service: Annotated[DepartamentoService, Depends(get_departamento_service)]):
    dados = await request.json()
    return departamento_service.atualizar(id_departamento, dados)

@router.delete("/departamentos/{id_departamento}")
async def delete_departamento_admin_route(id_departamento: int, departamento_service: Annotated[DepartamentoService, Depends(get_departamento_service)]):
    return departamento_service.deletar(id_departamento)
