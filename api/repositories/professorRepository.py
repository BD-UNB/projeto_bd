from infra.database import get_connection

class ProfessorRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_or_create_department_id(self, cursor, department_name):
        if not department_name:
            return None
        cursor.execute("SELECT idDepartamento FROM departamento WHERE nome = %s", (department_name,))
        res = cursor.fetchone()
        if res:
            return res[0]
        else:
            cursor.execute("INSERT INTO departamento (nome) VALUES (%s)", (department_name,))
            return cursor.lastrowid

    def create_professor_details(self, id_usuario, area_pesquisa, departamento_nome, departamento_coordenado_nome):
        conn = self.get_conn()
        cursor = conn.cursor()
        try:
            id_dep = self.get_or_create_department_id(cursor, departamento_nome)
            id_dep_coord = self.get_or_create_department_id(cursor, departamento_coordenado_nome)

            cursor.execute(
                "INSERT INTO professor (idProfessor, area_pesquisa, idDepartamento, idDeptCoordenado) VALUES (%s, %s, %s, %s)",
                (id_usuario, area_pesquisa, id_dep, id_dep_coord)
            )
            conn.commit()
            return True
        
        except Exception as e:
            print(f"Erro ao criar detalhes do professor: {e}")
            conn.rollback()
            raise e 
        
        finally:
            cursor.close()
            conn.close()

    def get_professor_repository(self, id_usuario):
        conn = self.get_conn()
        cursor = conn.cursor()
        try:
            cursor.execute("""
                SELECT u.nome AS nomeUniversidade, d.nome AS nomeDepartamento
                FROM professor p
                LEFT JOIN departamento d ON p.idDepartamento = d.idDepartamento
                LEFT JOIN departamento u ON p.idDeptCoordenado = u.idDepartamento
                WHERE p.idProfessor = %s
            """, (id_usuario,))
            return cursor.fetchone()
        except Exception as e:
            print(f"Erro ao buscar professor: {e}")
            raise e
        finally:
            cursor.close()
            conn.close()
