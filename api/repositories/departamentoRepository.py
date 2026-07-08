from infra.database import get_connection

class DepartamentoRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_all_departamentos(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    d.idDepartamento, d.nome, d.email, d.local,
                    d.idUniversidade, u.nome AS universidade
                FROM departamento d
                LEFT JOIN universidade u ON u.idUniversidade = d.idUniversidade
                ORDER BY d.nome
            """)
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar departamentos: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_departamento_by_id(self, id_departamento):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT * FROM departamento WHERE idDepartamento = %s", (id_departamento,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar departamento por ID: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_departamento_by_nome(self, nome):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT * FROM departamento WHERE nome = %s", (nome,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar departamento por nome: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def create_departamento(self, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "INSERT INTO departamento (nome, email, local, idUniversidade) VALUES (%s, %s, %s, %s)",
                (
                    dados.get("nome"), dados.get("email") or None,
                    dados.get("local") or None, dados.get("idUniversidade") or None,
                )
            )
            conn.commit()
            return cursor.lastrowid

        except Exception as e:
            print(f"Erro ao criar departamento: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def update_departamento(self, id_departamento, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        campos = ["nome", "email", "local", "idUniversidade"]

        try:
            updates = []
            params = []
            for campo in campos:
                if campo in dados:
                    valor = dados[campo]
                    if valor == "":
                        valor = None
                    updates.append(f"{campo} = %s")
                    params.append(valor)

            if not updates:
                return False

            params.append(id_departamento)
            cursor.execute(
                f"UPDATE departamento SET {', '.join(updates)} WHERE idDepartamento = %s",
                tuple(params)
            )
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao atualizar departamento: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def delete_departamento(self, id_departamento):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            # Remove os vínculos curso<->departamento antes de apagar
            cursor.execute("DELETE FROM curso_departamento WHERE idDepartamento = %s", (id_departamento,))
            cursor.execute("DELETE FROM departamento WHERE idDepartamento = %s", (id_departamento,))
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao deletar departamento: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()
