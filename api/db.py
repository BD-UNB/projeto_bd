import mysql.connector
import os


def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 3306)),
        database=os.getenv("DB_NAME", "projeto_bd"),
        user=os.getenv("DB_USER", "user_bd"),
        password=os.getenv("DB_PASSWORD", "senha_bd")
    )

def init_database():
    if not os.path.exists("../database/script.sql"):
        return False
    with open("../database/script.sql", "r") as script:
        try:
            connection = get_connection()
            cursor = connection.cursor()
            cursor.execute(script.read())
            connection.commit()
            cursor.close()
            connection.close()
            return True
        except Exception as e:
            print(f"Erro ao inicializar database: {e}")
            return False
    # Não sei porque mas deu certo a inicilização 
    # Depois arrumar direito

def get_eventos():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM eventos")
    eventos = cursor.fetchall()
    cursor.close()
    connection.close()
    return eventos

def get_user_by_matricula(matricula):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM usuario WHERE matricula = %s", (matricula,))
    user = cursor.fetchall()
    cursor.close()
    connection.close()
    return user


def criar_professor(matricula, nome, email, data_de_nasci, perfil, senha, area_de_pesquisa, departamento, departamento_coordenado):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        # Inserir no usuário
        cursor.execute(
            "INSERT INTO usuario (matricula, nome, email, data_nasc, perfil, senha) VALUES (%s, %s, %s, %s, %s, %s)", 
            (matricula, nome, email, data_de_nasci, perfil, senha)
        )
        id_usuario = cursor.lastrowid
        
        # Buscar ou criar o ID do departamento principal pelo nome
        id_dep = None
        if departamento:
            cursor.execute("SELECT idDepartamento FROM departamento WHERE nome = %s", (departamento,))
            res = cursor.fetchone()
            if res:
                id_dep = res[0]
            else:
                cursor.execute("INSERT INTO departamento (nome) VALUES (%s)", (departamento,))
                id_dep = cursor.lastrowid

        # Buscar ou criar o ID do departamento coordenado pelo nome
        id_dep_coord = None
        if departamento_coordenado:
            cursor.execute("SELECT idDepartamento FROM departamento WHERE nome = %s", (departamento_coordenado,))
            res = cursor.fetchone()
            if res:
                id_dep_coord = res[0]
            else:
                cursor.execute("INSERT INTO departamento (nome) VALUES (%s)", (departamento_coordenado,))
                id_dep_coord = cursor.lastrowid

        # Inserir na tabela professor
        cursor.execute(
            "INSERT INTO professor (idProfessor, area_pesquisa, idDepartamento, idDeptCoordenado) VALUES (%s, %s, %s, %s)", 
            (id_usuario, area_de_pesquisa, id_dep, id_dep_coord)
        )
        
        connection.commit()
        return True
    except Exception as e:
        print(f"Erro ao criar professor: {e}")
        connection.rollback()
        return False
    finally:
        cursor.close()
        connection.close()
    

def criar_aluno(matricula, nome, email, senha, telefone, cpf, data_nasc, nivel, curriculo, area_interesse):
    connection = get_connection()
    cursor = connection.cursor()
    try:
        # Inserir primeiro na tabela usuario
        cursor.execute(
            "INSERT INTO usuario (matricula, nome, email, data_nasc, perfil, senha) VALUES (%s, %s, %s, %s, %s, %s)",
            (matricula, nome, email, data_nasc, "aluno", senha)
        )
        id_usuario = cursor.lastrowid
        
        # Mapear o nível de ensino recebido para o enum aceito pelo banco ('graduacao' ou 'pos-graduacao')
        nivel_db = "graduacao"
        if nivel:
            nivel_lower = nivel.lower()
            if "pós" in nivel_lower or "pos" in nivel_lower or "mestrado" in nivel_lower or "doutorado" in nivel_lower:
                nivel_db = "pos-graduacao"

        # Inserir na tabela aluno
        cursor.execute(
            "INSERT INTO aluno (idAluno, nivel, curriculo, area_interesse) VALUES (%s, %s, %s, %s)",
            (id_usuario, nivel_db, curriculo, area_interesse)
        )
        connection.commit()
        return True
    except Exception as e:
        print(f"Erro ao criar aluno: {e}")
        connection.rollback()
        return False
    finally:
        cursor.close()
        connection.close()
