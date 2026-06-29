import mysql.connector
import os

def get_connection():
    return mysql.connector.connect(
        host = os.getenv("DB_HOST", "localhost"),
        port = int(os.getenv("DB_PORT", 3306)),
        database = os.getenv("DB_NAME", "projeto_bd"),
        user = os.getenv("DB_USER", "user_bd"),
        password = os.getenv("DB_PASSWORD", "senha_bd")
    )

def init_database():
    if not os.path.exists("../../database/script.sql"):
        print(f"Script SQL não encontrado.")
        return False
    with open("../../database/script.sql", "r") as script:
        try:
            connection = get_connection()
            cursor = connection.cursor()
            for statement in script.read().split(';'):
                if statement.strip():
                    cursor.execute(statement)
            connection.commit()
            cursor.close()
            connection.close()
            return True
        except Exception as e:
            print(f"Erro ao inicializar database: {e}")
            return False
