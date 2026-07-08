from infra.database import get_connection

class VagaRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_vagas_publicadas(self, id_tipo = None, id_departamento = None):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            # Usa a procedure ListarVagasPublicadas (filtros opcionais de tipo/departamento)
            cursor.callproc("ListarVagasPublicadas", [id_tipo, id_departamento])
            vagas = []
            for resultado in cursor.stored_results():
                vagas = resultado.fetchall()
            return vagas

        except Exception as e:
            print(f"Erro ao buscar vagas publicadas: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    # SELECT reaproveitado (com nomes e ids de FK) para listagem/detalhe.
    _SELECT_VAGA = """
        SELECT
            v.idVagas, v.titulo, v.descricao, v.requisitos, v.nivel,
            v.modalidade, v.status, v.local, v.carga_horaria, v.num_max,
            v.data_inicio_candidatura, v.data_fim_candidatura,
            v.idTipoVaga, v.idCampus, v.idDepartamento,
            tv.nome AS tipo,
            c.nome AS campus,
            d.nome AS departamento,
            GROUP_CONCAT(DISTINCT u.nome SEPARATOR ', ') AS responsavel,
            COALESCE(vc.total_candidatos, 0) AS total_candidatos
        FROM vagas_oportunidades v
        LEFT JOIN tipo_vaga tv ON v.idTipoVaga = tv.idTipoVaga
        LEFT JOIN campus c ON v.idCampus = c.idCampus
        LEFT JOIN departamento d ON v.idDepartamento = d.idDepartamento
        LEFT JOIN responsavel_vaga rv ON rv.idVagas = v.idVagas
        LEFT JOIN professor p ON p.idProfessor = rv.idProfessor
        LEFT JOIN usuario u ON u.idUsuario = p.idProfessor
        LEFT JOIN vw_vagas_com_contagem_candidatos vc ON vc.idVagas = v.idVagas
    """

    def get_all_vagas(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute(self._SELECT_VAGA + " GROUP BY v.idVagas ORDER BY v.idVagas DESC")
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar todas as vagas: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_vaga_by_id(self, id_vaga):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute(self._SELECT_VAGA + " WHERE v.idVagas = %s GROUP BY v.idVagas", (id_vaga,))
            return cursor.fetchone()

        except Exception as e:
            print(f"Erro ao buscar vaga por ID: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_vagas_by_professor(self, id_professor):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute(
                self._SELECT_VAGA +
                " WHERE v.idVagas IN (SELECT idVagas FROM responsavel_vaga WHERE idProfessor = %s)"
                " GROUP BY v.idVagas ORDER BY v.idVagas DESC",
                (id_professor,)
            )
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar vagas do professor: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def is_responsavel(self, id_professor, id_vaga):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "SELECT 1 FROM responsavel_vaga WHERE idProfessor = %s AND idVagas = %s",
                (id_professor, id_vaga)
            )
            return cursor.fetchone() is not None

        except Exception as e:
            print(f"Erro ao verificar responsável pela vaga: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def add_responsavel(self, id_professor, id_vaga):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute(
                "INSERT IGNORE INTO responsavel_vaga (idProfessor, idVagas) VALUES (%s, %s)",
                (id_professor, id_vaga)
            )
            conn.commit()
            return True

        except Exception as e:
            print(f"Erro ao adicionar responsável pela vaga: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def create_vaga(self, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT INTO vagas_oportunidades
                    (titulo, descricao, requisitos, nivel, modalidade, status, local,
                     carga_horaria, num_max, data_inicio_candidatura, data_fim_candidatura,
                     idTipoVaga, idCampus, idDepartamento)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                dados.get("titulo"), dados.get("descricao"), dados.get("requisitos"),
                dados.get("nivel"), dados.get("modalidade"), dados.get("status"),
                dados.get("local"), dados.get("carga_horaria"), dados.get("num_max"),
                dados.get("data_inicio_candidatura") or None,
                dados.get("data_fim_candidatura") or None,
                dados.get("idTipoVaga") or None, dados.get("idCampus") or None,
                dados.get("idDepartamento") or None,
            ))
            conn.commit()
            return cursor.lastrowid

        except Exception as e:
            print(f"Erro ao criar vaga: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def update_vaga(self, id_vaga, dados):
        conn = self.get_conn()
        cursor = conn.cursor()

        campos = [
            "titulo", "descricao", "requisitos", "nivel", "modalidade", "status",
            "local", "carga_horaria", "num_max", "data_inicio_candidatura",
            "data_fim_candidatura", "idTipoVaga", "idCampus", "idDepartamento",
        ]

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

            params.append(id_vaga)
            cursor.execute(
                f"UPDATE vagas_oportunidades SET {', '.join(updates)} WHERE idVagas = %s",
                tuple(params)
            )
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao atualizar vaga: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def delete_vaga(self, id_vaga):
        conn = self.get_conn()
        cursor = conn.cursor()

        try:
            # Remove os dependentes (FKs) antes de apagar a vaga
            cursor.execute("DELETE FROM responsavel_vaga WHERE idVagas = %s", (id_vaga,))
            cursor.execute("DELETE FROM comentario_vaga WHERE idVagas = %s", (id_vaga,))
            cursor.execute("DELETE FROM candidatura WHERE idVagas = %s", (id_vaga,))

            # Conversas da vaga -> mensagens e participantes primeiro
            cursor.execute("SELECT idConversa FROM conversa WHERE idVagas = %s", (id_vaga,))
            conversas = [linha[0] for linha in cursor.fetchall()]
            for id_conversa in conversas:
                cursor.execute("DELETE FROM mensagem WHERE idConversa = %s", (id_conversa,))
                cursor.execute("DELETE FROM conversa_usuario WHERE idConversa = %s", (id_conversa,))
            cursor.execute("DELETE FROM conversa WHERE idVagas = %s", (id_vaga,))

            cursor.execute("DELETE FROM vagas_oportunidades WHERE idVagas = %s", (id_vaga,))
            conn.commit()
            return cursor.rowcount > 0

        except Exception as e:
            print(f"Erro ao deletar vaga: {e}")
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_referencias(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("SELECT idTipoVaga, nome FROM tipo_vaga ORDER BY nome")
            tipos = cursor.fetchall()
            cursor.execute("SELECT idCampus, nome FROM campus ORDER BY nome")
            campi = cursor.fetchall()
            cursor.execute("SELECT idDepartamento, nome FROM departamento ORDER BY nome")
            departamentos = cursor.fetchall()
            return {"tipos": tipos, "campi": campi, "departamentos": departamentos}

        except Exception as e:
            print(f"Erro ao buscar referências de vaga: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()
