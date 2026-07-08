from fastapi import HTTPException, status
from infra.database import get_connection

class ProfessorRepository:
    def __init__(self):
        self.get_conn = get_connection

    def get_or_create_department_id(self, conn, cursor, department_name):
        if not department_name:
            return None

        cursor.execute("SELECT idDepartamento FROM departamento WHERE nome = %s", (department_name,))
        res = cursor.fetchone()
        if res:
            return res[0]
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Departamento '{department_name}' não cadastrados.")

    def create_professor_details(self, id_usuario, area_pesquisa, departamento_nome, departamento_coordenado_nome):
        conn = self.get_conn()
        cursor = conn.cursor()
        try:
            id_dep = self.get_or_create_department_id(conn, cursor, departamento_nome)
            id_dep_coord = self.get_or_create_department_id(conn, cursor, departamento_coordenado_nome)

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

    def get_all_professores(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)

        try:
            cursor.execute("""
                SELECT
                    u.idUsuario, u.matricula, u.nome, u.email, u.data_nasc, u.perfil,
                    p.area_pesquisa,
                    d.nome AS departamento,
                    dc.nome AS departamentoCoordenado
                FROM usuario u
                JOIN professor p ON u.idUsuario = p.idProfessor
                LEFT JOIN departamento d ON p.idDepartamento = d.idDepartamento
                LEFT JOIN departamento dc ON p.idDeptCoordenado = dc.idDepartamento
                WHERE u.perfil = 'professor'
                ORDER BY u.nome
            """)
            return cursor.fetchall()

        except Exception as e:
            print(f"Erro ao buscar todos os professores: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()

    def get_professor_by_id(self, id_professor: int):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary=True) # Retorna resultados como dicionários
        
        try:
            cursor.execute("""
                SELECT
                    u.idUsuario, u.matricula, u.nome, u.email, u.data_nasc, u.perfil,
                    p.area_pesquisa, p.idDepartamento, p.idDeptCoordenado
                FROM usuario u
                JOIN professor p ON u.idUsuario = p.idProfessor
                WHERE u.idUsuario = %s AND u.perfil = 'professor'
            """, (id_professor,))
            return cursor.fetchone()
        
        except Exception as e:
            print(f"Erro ao buscar professor por ID: {e}")
            raise e
        
        finally:
            cursor.close()
            conn.close()

    def get_professor_repository(self, id_usuario):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)
        try:
            cursor.execute("""
                SELECT
                    p.area_pesquisa,
                    d.nome AS nomeDepartamento,
                    uni.nome AS nomeUniversidade,
                    dc.nome AS departamentoCoordenado
                FROM professor p
                LEFT JOIN departamento d ON p.idDepartamento = d.idDepartamento
                LEFT JOIN universidade uni ON d.idUniversidade = uni.idUniversidade
                LEFT JOIN departamento dc ON p.idDeptCoordenado = dc.idDepartamento
                WHERE p.idProfessor = %s
            """, (id_usuario,))
            return cursor.fetchone()
        except Exception as e:
            print(f"Erro ao buscar professor: {e}")
            raise e
        finally:
            cursor.close()
            conn.close()
    def update_professor_details(self, id_professor: int, area_pesquisa: str = None, departamento_nome: str = None, departamento_coordenado_nome: str = None):
        conn = self.get_conn()
        cursor = conn.cursor()
        
        try:
            updates = []
            params = []

            if area_pesquisa is not None:
                updates.append("area_pesquisa = %s")
                params.append(area_pesquisa)

            if departamento_nome is not None:
                id_dep = self.get_or_create_department_id(conn, cursor, departamento_nome)
                updates.append("idDepartamento = %s")
                params.append(id_dep)

            if departamento_coordenado_nome is not None:
                id_dep_coord = self.get_or_create_department_id(conn, cursor, departamento_coordenado_nome)
                updates.append("idDeptCoordenado = %s")
                params.append(id_dep_coord)

            if not updates:
                return False

            query = f"UPDATE professor SET {', '.join(updates)} WHERE idProfessor = %s"
            params.append(id_professor)

            cursor.execute(query, tuple(params))
            conn.commit()
            return cursor.rowcount > 0
        
        except Exception as e:
            print(f"Erro ao atualizar detalhes do professor: {e}")
            conn.rollback()
            raise e
        
        finally:
            cursor.close()
            conn.close()

    def delete_professor_details(self, id_professor: int):
        conn = self.get_conn()
        cursor = conn.cursor()
        
        try:
            cursor.execute("DELETE FROM professor WHERE idProfessor = %s", (id_professor,))
            conn.commit()
            return cursor.rowcount > 0
        
        except Exception as e:
            print(f"Erro ao deletar detalhes do professor: {e}")
            conn.rollback()
            raise e
        
        finally:
            cursor.close()
            conn.close()

    def get_referencias(self):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary=True)

        try:

            cursor.execute("SELECT idUniversidade, nome FROM universidade ORDER BY nome")
            universidades = cursor.fetchall()
            cursor.execute("SELECT idDepartamento, nome, idUniversidade FROM departamento ORDER BY nome")
            departamentos = cursor.fetchall()
            return {"universidades": universidades, "departamentos": departamentos}

        except Exception as e:
            print(f"Erro ao buscar referências de vaga: {e}")
            raise e

        finally:
            cursor.close()
            conn.close()



