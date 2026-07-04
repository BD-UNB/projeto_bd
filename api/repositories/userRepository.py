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

    def get_user_by_email(self, email: str):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT * FROM usuario WHERE email = %s", (email,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar usuário por email: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_user_by_id(self, id_usuario: int):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT * FROM usuario WHERE idUsuario = %s", (id_usuario,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar usuário por ID: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def update_user(self, id_usuario: int, matricula: str = None, nome: str = None, email: str = None, data_nasc: str = None, perfil: str = None, senha_hash: str = None):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            updates = []
            params = []

            if matricula is not None:
                updates.append("matricula = %s")
                params.append(matricula)
            if nome is not None:
                updates.append("nome = %s")
                params.append(nome)
            if email is not None:
                updates.append("email = %s")
                params.append(email)
            if data_nasc is not None:
                updates.append("data_nasc = %s")
                params.append(data_nasc)
            if perfil is not None:
                updates.append("perfil = %s")
                params.append(perfil)
            if senha_hash is not None:
                updates.append("senha = %s")
                params.append(senha_hash)

            if not updates:
                return False

            query = f"UPDATE usuario SET {', '.join(updates)} WHERE idUsuario = %s"
            params.append(id_usuario)

            cursor.execute(query, tuple(params))
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao atualizar usuário: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def delete_user(self, id_usuario: int):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute("DELETE FROM usuario WHERE idUsuario = %s", (id_usuario,))
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao deletar usuário: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()
