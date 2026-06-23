from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from db import get_eventos, criar_professor, criar_aluno, get_user_by_matricula, init_database
import bcrypt

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
    matricula = dados["matricula"]
    nome = dados["nome"]
    email = dados["email"]
    
    senha = dados["senha"]
    senha = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())

    telefone = dados["telefone"]
    cpf = dados["cpf"]
    data_nasc = dados["data_nasc"]
    nivel = dados["nivel"]
    curriculo = dados["curriculo"]
    area_interesse = dados["area_interesse"]
    if criar_aluno(matricula, nome, email, senha, telefone, cpf, data_nasc, nivel, curriculo, area_interesse):
        return {"status": "ok", "message": "Aluno criado com sucesso!"}
    else:
        return {"status": "error", "message": "Erro ao criar aluno"}

@app.get("/")
def get_root():
    return {"message": "API está rodando"}  

@app.post("/login")
async def post_login(request: Request):
    json = await request.json()
    matricula = json["matricula"]
    senha = json["senha"]

    return logar(matricula, senha)

def logar(matricula, senha):
    user = get_user_by_matricula(matricula)
    if not user:
        return {"status": "error", "message": "Usuário ou senha não correspondem!"}

    perfil = user[0][5]
    senha_hash = user[0][6]

    try:
        if bcrypt.checkpw(senha.encode('utf-8'), senha_hash.encode('utf-8')):
            return {"status": "ok", "perfil": perfil}
        else:
            return {"status": "error", "message": "Usuário ou senha não correspondem!"}
    except Exception as e:
        print(f"Erro ao verificar senha: {e}")
        return {"status": "error", "message": "Erro interno de autenticação"}