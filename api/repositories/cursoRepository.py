from infra.database import get_connection

class CursoRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_all_cursos(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    c.idCurso, c.nome, c.duracao_semestres, c.descricao,
                    c.idUniversidade, u.nome AS universidade
                FROM curso c
                LEFT JOIN universidade u ON u.idUniversidade = c.idUniversidade
                ORDER BY c.nome
            """)
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar cursos: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_curso_by_id(self, id_curso):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT * FROM curso WHERE idCurso = %s", (id_curso,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar curso por ID: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def create_curso(self, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "INSERT INTO curso (nome, duracao_semestres, descricao, idUniversidade) VALUES (%s, %s, %s, %s)",
                (
                    dados.get("nome"), dados.get("duracao_semestres"),
                    dados.get("descricao") or None, dados.get("idUniversidade") or None,
                )
            )
            conn.commit()
            return cursor.lastrowid

        except Exception as e:
            print(f"Erro ao criar curso: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def update_curso(self, id_curso, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        campos = ["nome", "duracao_semestres", "descricao", "idUniversidade"]

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

            params.append(id_curso)
            cursor.execute(
                f"UPDATE curso SET {', '.join(updates)} WHERE idCurso = %s",
                tuple(params)
            )
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao atualizar curso: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def delete_curso(self, id_curso):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            # Remove os vínculos antes de apagar o curso
            cursor.execute("DELETE FROM disc_curso WHERE idCurso = %s", (id_curso,))
            cursor.execute("DELETE FROM curso_departamento WHERE idCurso = %s", (id_curso,))
            cursor.execute("DELETE FROM curso WHERE idCurso = %s", (id_curso,))
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao deletar curso: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()
