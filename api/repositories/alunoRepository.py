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
