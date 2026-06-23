from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from db import get_eventos, criar_professor, criar_aluno, init_database 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.on_event("startup")
# async def on_startup():
#    if init_database():
#        print("Database inicializado com sucesso!")
#    else:
#        print("Erro ao inicializar database!")

@app.get("/eventos")
def get_eventos():
    pass


@app.post("/cadastro_professor")
async def post_cadastro_prof(request: Request):
    dados = await request.json()
    print(dados)
    matricula = dados["matricula"]
    nome = dados["nome"]
    email = dados["email"]
    data_de_nasci = dados["data_de_nasci"]
    perfil = "professor"
    senha = dados["senha"]
    area_de_pesquisa = dados["area_de_pesquisa"]
    departamento = dados["departamento"]
    departamento_coordenado = dados["departamento_coordenado"]
    if criar_professor(matricula, nome, email, data_de_nasci, perfil, senha, area_de_pesquisa, departamento, departamento_coordenado):
        return {"status": "ok", "message": "Professor criado com sucesso!"}
    else:
        return {"status": "error", "message": "Erro ao criar professor"}

@app.post("/cadastro_aluno")
async def post_cadastro_aluno(request: Request):
    dados = await request.json()
    nome = dados["nome"]
    email = dados["email"]
    senha = dados["senha"]
    cpf = dados["cpf"]
    data_de_nascimento = dados["data_de_nascimento"]
    sexo = dados["sexo"]
    telefone = dados["telefone"]
    curriculo = dados["curriculo"]
    nivel_de_ensino = dados["nivel_de_ensino"]
    area_de_interesse = dados["area_de_interesse"]
    if criar_aluno(nome, email, senha, cpf, data_de_nascimento, sexo, telefone, curriculo, nivel_de_ensino, area_de_interesse):
        return {"status": "ok", "message": "Aluno criado com sucesso!"}
    else:
        return {"status": "error", "message": "Erro ao criar aluno"}

@app.get("/")
def get_root():
    return {"message": "API está rodando"}  

@app.post("/login")
async def post_login(request: Request):
    json = await request.json()
    numero = json["numero"]
    senha = json["senha"]
    return logar(numero, senha)

def logar(numero, senha):
    print("Login realizado com sucesso!")
    return {"message": "Login realizado com sucesso!"}