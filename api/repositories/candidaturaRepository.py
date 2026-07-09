from infra.database import get_connection

class CandidaturaRepository:
    def __init__(self):
        self.get_conn = get_connection

    def existe(self, id_aluno, id_vaga):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "SELECT 1 FROM candidatura WHERE idAluno = %s AND idVagas = %s",
                (id_aluno, id_vaga)
            )
            return cursor.fetchone() is not None

        except Exception as e:
            print(f"Erro ao verificar candidatura: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def create_candidatura(self, id_aluno, id_vaga, mensagem_apresentacao):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            # O trigger atualiza o status automaticamente
            cursor.execute(
                "INSERT INTO candidatura (idAluno, idVagas, mensagem_apresentacao) VALUES (%s, %s, %s)",
                (id_aluno, id_vaga, mensagem_apresentacao)
            )
            conn.commit()
            return True

        except Exception as e:
            print(f"Erro ao criar candidatura: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_by_aluno(self, id_aluno):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    c.idVagas, c.status, c.data_candidatura, c.mensagem_apresentacao,
                    v.titulo, v.status AS status_vaga
                FROM candidatura c
                JOIN vagas_oportunidades v ON v.idVagas = c.idVagas
                WHERE c.idAluno = %s
                ORDER BY c.data_candidatura DESC
            """, (id_aluno,))
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar candidaturas do aluno: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_by_vaga(self, id_vaga):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    c.idAluno, c.idVagas, c.status, c.data_candidatura, c.mensagem_apresentacao,
                    u.nome AS nome_aluno, u.matricula, u.email,
                    a.nivel, a.area_interesse
                FROM candidatura c
                JOIN usuario u ON u.idUsuario = c.idAluno
                JOIN aluno a ON a.idAluno = c.idAluno
                WHERE c.idVagas = %s
                ORDER BY c.data_candidatura DESC
            """, (id_vaga,))
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar candidaturas da vaga: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def update_status(self, id_aluno, id_vaga, novo_status):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "UPDATE candidatura SET status = %s WHERE idAluno = %s AND idVagas = %s",
                (novo_status, id_aluno, id_vaga)
            )
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao atualizar status da candidatura: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()
