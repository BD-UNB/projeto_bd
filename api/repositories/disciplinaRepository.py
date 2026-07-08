from infra.database import get_connection

class DisciplinaRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_all_disciplinas(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    di.idDisciplina, di.nome, di.carga_horaria, di.ementa,
                    di.idDepartamento, d.nome AS departamento
                FROM disciplina di
                LEFT JOIN departamento d ON d.idDepartamento = di.idDepartamento
                ORDER BY di.nome
            """)
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar disciplinas: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_disciplina_by_id(self, id_disciplina):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT * FROM disciplina WHERE idDisciplina = %s", (id_disciplina,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar disciplina por ID: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def create_disciplina(self, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "INSERT INTO disciplina (nome, carga_horaria, ementa, idDepartamento) VALUES (%s, %s, %s, %s)",
                (
                    dados.get("nome"), dados.get("carga_horaria"),
                    dados.get("ementa") or None, dados.get("idDepartamento") or None,
                )
            )
            conn.commit()
            return cursor.lastrowid

        except Exception as e:
            print(f"Erro ao criar disciplina: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def update_disciplina(self, id_disciplina, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        campos = ["nome", "carga_horaria", "ementa", "idDepartamento"]

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

            params.append(id_disciplina)
            cursor.execute(
                f"UPDATE disciplina SET {', '.join(updates)} WHERE idDisciplina = %s",
                tuple(params)
            )
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao atualizar disciplina: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def delete_disciplina(self, id_disciplina):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            # Remove os vínculos antes de apagar a disciplina
            cursor.execute("DELETE FROM disc_curso WHERE idDisciplina = %s", (id_disciplina,))
            cursor.execute(
                "DELETE FROM pre_requisito WHERE idDisciplina = %s OR idPreRequisito = %s",
                (id_disciplina, id_disciplina)
            )
            cursor.execute("DELETE FROM disciplina WHERE idDisciplina = %s", (id_disciplina,))
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao deletar disciplina: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()
