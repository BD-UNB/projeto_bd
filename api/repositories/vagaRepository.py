from infra.database import get_connection

class VagaRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_vagas_publicadas(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    v.idVagas, v.titulo, v.descricao, v.requisitos, v.nivel,
                    v.modalidade, v.status, v.local, v.carga_horaria, v.num_max,
                    v.data_inicio_candidatura, v.data_fim_candidatura,
                    tv.nome AS tipo,
                    c.nome AS campus,
                    d.nome AS departamento,
                    GROUP_CONCAT(DISTINCT u.nome SEPARATOR ', ') AS responsavel
                FROM vagas_oportunidades v
                LEFT JOIN tipo_vaga tv ON v.idTipoVaga = tv.idTipoVaga
                LEFT JOIN campus c ON v.idCampus = c.idCampus
                LEFT JOIN departamento d ON v.idDepartamento = d.idDepartamento
                LEFT JOIN responsavel_vaga rv ON rv.idVagas = v.idVagas
                LEFT JOIN professor p ON p.idProfessor = rv.idProfessor
                LEFT JOIN usuario u ON u.idUsuario = p.idProfessor
                WHERE v.status = 'publicada'
                GROUP BY v.idVagas
                ORDER BY v.data_inicio_candidatura DESC
            """)
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar vagas publicadas: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()
