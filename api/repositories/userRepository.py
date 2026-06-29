# userRepository.py
from infra.database import get_connection

class UserRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_user_by_matricula(self, matricula):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)
        try:
            cursor.execute("SELECT * FROM usuario WHERE matricula = %s", (matricula,))
            user = cursor.fetchone()
            return user
        finally:
            cursor.close()
            conn.close()

    def create_user(self, matricula, nome, email, data_nasc, perfil, senha_hash):
        conn = self.get_conn()
        cursor = conn.cursor()
        try:
            query = """
                INSERT INTO usuario (matricula, nome, email, data_nasc, perfil, senha)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (matricula, nome, email, data_nasc, perfil, senha_hash))
            conn.commit()
            return cursor.lastrowid

        except Exception as e:
            conn.rollback()
            print(f"Erro ao criar usuário base: {e}") 
            raise e

        finally:
            cursor.close()
            conn.close()
