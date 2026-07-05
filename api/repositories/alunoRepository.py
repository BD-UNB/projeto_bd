from infra.database import get_connection

class AlunoRepository:
    def __init__(self):
        self.get_conn = get_connection

    def create_aluno_details(self, id_usuario, nivel, curriculo, area_interesse):
        conn = self.get_conn()
        cursor = conn.cursor()
        
        try:
            nivel_db = "graduacao"
            if nivel:
                nivel_lower = nivel.lower()
                if "pós" in nivel_lower or "pos" in nivel_lower or "mestrado" in nivel_lower or "doutorado" in nivel_lower:
                    nivel_db = "pos-graduacao"

            cursor.execute(
                "INSERT INTO aluno (idAluno, nivel, curriculo, area_interesse) VALUES (%s, %s, %s, %s)",
                (id_usuario, nivel_db, curriculo, area_interesse)
            )

            conn.commit()
            return True
        
        except Exception as e:
            print(f"Erro ao criar detalhes do aluno: {e}")
            conn.rollback()
            raise e
        
        finally:
            cursor.close()
            conn.close()

    def get_aluno_by_id(self, id_aluno: int):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)
        
        try:
            cursor.execute("""
                SELECT
                    u.idUsuario, u.matricula, u.nome, u.email, u.data_nasc, u.perfil,
                    a.nivel, a.curriculo, a.area_interesse
                FROM usuario u
                JOIN aluno a ON u.idUsuario = a.idAluno
                WHERE u.idUsuario = %s AND u.perfil = 'aluno'
            """, (id_aluno,))
            return cursor.fetchone()
        
        except Exception as e:
            print(f"Erro ao buscar aluno por ID: {e}")
            raise e
        
        finally:
            cursor.close()
            conn.close()

    def update_aluno_details(self, id_aluno: int, nivel: str = None, curriculo: bytes = None, area_interesse: str = None):
        conn = self.get_conn()
        cursor = conn.cursor()
        
        try:
            updates = []
            params = []

            if nivel is not None:
                nivel_db = "graduacao"
                
                if nivel:
                    nivel_lower = nivel.lower()
                    
                    if "pós" in nivel_lower or "pos" in nivel_lower or "mestrado" in nivel_lower or "doutorado" in nivel_lower:
                        nivel_db = "pos-graduacao"
                updates.append("nivel = %s")
                params.append(nivel_db)
            
            if curriculo is not None:
                updates.append("curriculo = %s")
                params.append(curriculo)
            
            if area_interesse is not None:
                updates.append("area_interesse = %s")
                params.append(area_interesse)

            if not updates:
                return False

            query = f"UPDATE aluno SET {', '.join(updates)} WHERE idAluno = %s"
            params.append(id_aluno)

            cursor.execute(query, tuple(params))
            conn.commit()
            return cursor.rowcount > 0
        
        except Exception as e:
            print(f"Erro ao atualizar detalhes do aluno: {e}")
            conn.rollback()
            raise e
        
        finally:
            cursor.close()
            conn.close()

    def delete_aluno_details(self, id_aluno: int):
        conn = self.get_conn()
        cursor = conn.cursor()
        
        try:
            cursor.execute("DELETE FROM aluno WHERE idAluno = %s", (id_aluno,))
            conn.commit()
            return cursor.rowcount > 0
        
        except Exception as e:
            print(f"Erro ao deletar detalhes do aluno: {e}")
            conn.rollback()
            raise e
        
        finally:
            cursor.close()
            conn.close()

    def get_aluno_repository(self, id_usuario):
        conn = self.get_conn()
        cursor = conn.cursor(dictionary = True)
        try:
            cursor.execute("""
                SELECT
                    a.nivel, a.curriculo, a.area_interesse,
                    c.nome AS nomeCurso,
                    uni.nome AS nomeUniversidade,
                    d.nome AS nomeDepartamento
                FROM aluno a
                LEFT JOIN inscricao i ON i.idAluno = a.idAluno
                LEFT JOIN curso c ON c.idCurso = i.idCurso
                LEFT JOIN universidade uni ON uni.idUniversidade = c.idUniversidade
                LEFT JOIN curso_departamento cd ON cd.idCurso = c.idCurso
                LEFT JOIN departamento d ON d.idDepartamento = cd.idDepartamento
                WHERE a.idAluno = %s
                LIMIT 1
            """, (id_usuario,))
            return cursor.fetchone()
        except Exception as e:
            print(f"Erro ao buscar aluno: {e}")
            raise e
        finally:
            cursor.close()
            conn.close()