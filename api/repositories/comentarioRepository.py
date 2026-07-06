from infra.database import get_connection

class ComentarioRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_comentarios_por_vaga(self, id_vaga):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    cv.idComentario, cv.idVagas, cv.idUsuario, cv.texto, cv.dataHora,
                    u.nome AS nome_usuario, u.perfil
                FROM comentario_vaga cv
                JOIN usuario u ON u.idUsuario = cv.idUsuario
                WHERE cv.idVagas = %s
                ORDER BY cv.dataHora ASC
            """, (id_vaga,))
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar comentários da vaga: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_comentario_by_id(self, id_comentario):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT * FROM comentario_vaga WHERE idComentario = %s", (id_comentario,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar comentário por ID: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def create_comentario(self, id_vaga, id_usuario, texto):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "INSERT INTO comentario_vaga (idVagas, idUsuario, texto) VALUES (%s, %s, %s)",
                (id_vaga, id_usuario, texto)
            )
            conn.commit()
            return cursor.lastrowid

        except Exception as e:
            print(f"Erro ao criar comentário: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def update_comentario(self, id_comentario, texto):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "UPDATE comentario_vaga SET texto = %s WHERE idComentario = %s",
                (texto, id_comentario)
            )
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao atualizar comentário: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def delete_comentario(self, id_comentario):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute("DELETE FROM comentario_vaga WHERE idComentario = %s", (id_comentario,))
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao deletar comentário: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()
