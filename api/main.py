from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/eventos")
def get_eventos():
    pass

@app.post("/cadastro_professor")
def post_cadastro_prof(request: Request):
    nome = request.json["nome"]
    email = request.json["email"]
    senha = request.json["senha"]
    cpf = request.json["cpf"]
    data_de_nascimento = request.json["data_de_nascimento"]
    sexo = request.json["sexo"]
    telefone = request.json["telefone"]
    area_de_pesquisa = request.json["area_de_pesquisa"]
    departamento = request.json["departamento"]
    departamento_coordenado = request.json["departamento_coordenado"]
    criar_professor()
    pass

@app.post("/cadastro_aluno")
def post_cadastro_aluno(request: Request):
    nome = request.json["nome"]
    email = request.json["email"]
    senha = request.json["senha"]
    cpf = request.json["cpf"]
    data_de_nascimento = request.json["data_de_nascimento"]
    sexo = request.json["sexo"]
    telefone = request.json["telefone"]
    curriculo = request.json["curriculo"]
    nivel_de_ensino = request.json["nivel_de_ensino"]
    area_de_interesse = request.json["area_de_interesse"]
    criar_aluno()
    pass

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

def criar_professor():
    print("Professor criado com sucesso!")

def criar_aluno():
    print("Aluno criado com sucesso!")