"""
Seed para popular o banco de dados com instâncias de exemplo.
Uso: python seed.py

Idempotente: pode ser executado várias vezes sem duplicar dados nem colidir
com registros já existentes. Os usuários são identificados pela MATRÍCULA
(chave natural UNIQUE), nunca por idUsuario hardcodado — assim o AUTO_INCREMENT
atribui IDs livres e não sobrescrevemos linhas de outros usuários.

NOTA: os endereços de e-mail são montados em runtime (local + arroba + domínio)
propositalmente. Escrever o literal "nome@dominio" no código faz ferramentas de
edição ofuscarem o valor (Cloudflare -> "[email protected]"), o que colapsaria
todos os e-mails na mesma string e violaria o índice UNIQUE de e-mail.

As senhas usam bcrypt (mesma lógica da API).
As credenciais ficam documentadas no arquivo .teste na raiz do projeto.
"""
import bcrypt
import mysql.connector
import os

AT = chr(64)  # '@' montado em runtime para evitar ofuscação do literal de e-mail


def mail(local: str, dominio: str) -> str:
    return local + AT + dominio


# ---------------------------------------------------------------------------
# Conexão
# ---------------------------------------------------------------------------
def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 3306)),
        database=os.getenv("DB_NAME", "projeto_bd"),
        user=os.getenv("DB_USER", "user_bd"),
        password=os.getenv("DB_PASSWORD", "senha_bd"),
        charset="utf8mb4",
        collation="utf8mb4_unicode_ci",
    )


def hash_senha(senha_plana: str) -> str:
    return bcrypt.hashpw(senha_plana.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


# ---------------------------------------------------------------------------
# Upserts chaveados por chave natural
# ---------------------------------------------------------------------------
def upsert_usuario(cursor, matricula, nome, email, data_nasc, perfil, senha_plana):
    """Insere ou atualiza um usuário pela matrícula. Retorna o idUsuario real.

    Se o e-mail desejado já pertencer a OUTRA matrícula, mantém o e-mail atual da
    linha (em UPDATE) ou aborta com mensagem clara (em INSERT), evitando corromper
    outro usuário por conta da constraint UNIQUE de e-mail.
    """
    cursor.execute("SELECT idUsuario FROM usuario WHERE matricula = %s", (matricula,))
    row = cursor.fetchone()

    cursor.execute("SELECT idUsuario, matricula FROM usuario WHERE email = %s", (email,))
    dono_email = cursor.fetchone()

    if row:
        uid = row[0]
        email_conflita = dono_email and dono_email[0] != uid
        if email_conflita:
            cursor.execute(
                """UPDATE usuario
                   SET nome = %s, data_nasc = %s, perfil = %s, senha = %s
                   WHERE idUsuario = %s""",
                (nome, data_nasc, perfil, hash_senha(senha_plana), uid),
            )
            print(f"  [aviso] e-mail {email} pertence a outra matricula "
                  f"({dono_email[1]}); mantido o e-mail atual de {matricula}.")
        else:
            cursor.execute(
                """UPDATE usuario
                   SET nome = %s, email = %s, data_nasc = %s, perfil = %s, senha = %s
                   WHERE idUsuario = %s""",
                (nome, email, data_nasc, perfil, hash_senha(senha_plana), uid),
            )
    else:
        if dono_email:
            raise RuntimeError(
                f"Nao e possivel inserir a matricula {matricula}: o e-mail {email} "
                f"ja pertence a matricula {dono_email[1]} (idUsuario={dono_email[0]})."
            )
        cursor.execute(
            """INSERT INTO usuario (matricula, nome, email, data_nasc, perfil, senha)
               VALUES (%s, %s, %s, %s, %s, %s)""",
            (matricula, nome, email, data_nasc, perfil, hash_senha(senha_plana)),
        )
        uid = cursor.lastrowid
    return uid


def upsert_aluno(cursor, id_aluno, nivel, curriculo, area_interesse):
    cursor.execute(
        """INSERT INTO aluno (idAluno, nivel, curriculo, area_interesse)
           VALUES (%s, %s, %s, %s)
           ON DUPLICATE KEY UPDATE nivel = VALUES(nivel),
                                   area_interesse = VALUES(area_interesse)""",
        (id_aluno, nivel, curriculo, area_interesse),
    )


def upsert_professor(cursor, id_prof, area_pesquisa, id_departamento, id_dept_coord):
    cursor.execute(
        """INSERT INTO professor (idProfessor, area_pesquisa, idDepartamento, idDeptCoordenado)
           VALUES (%s, %s, %s, %s)
           ON DUPLICATE KEY UPDATE area_pesquisa = VALUES(area_pesquisa),
                                   idDepartamento = VALUES(idDepartamento),
                                   idDeptCoordenado = VALUES(idDeptCoordenado)""",
        (id_prof, area_pesquisa, id_departamento, id_dept_coord),
    )


# ---------------------------------------------------------------------------
# Seed
# ---------------------------------------------------------------------------
def seed():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        # ==================================================================
        # 1. Universidade
        # ==================================================================
        cursor.execute(
            "INSERT IGNORE INTO universidade (idUniversidade, nome) VALUES (%s, %s)",
            (1, "Universidade de Brasília"),
        )

        # ==================================================================
        # 2. Campus
        # ==================================================================
        campi = [
            (1, "Darcy Ribeiro", "Asa Norte, Brasília-DF", 1),
            (2, "Planaltina", "Planaltina-DF", 1),
            (3, "Ceilândia", "Ceilândia-DF", 1),
            (4, "Gama", "Gama-DF", 1),
        ]
        cursor.executemany(
            "INSERT IGNORE INTO campus (idCampus, nome, local, idUniversidade) VALUES (%s, %s, %s, %s)",
            campi,
        )

        # ==================================================================
        # 3. Departamentos
        # ==================================================================
        departamentos = [
            (1, "Departamento de Ciência da Computação", mail("cic", "unb.br"), "ICC Norte, Sala 352", 1),
            (2, "Departamento de Engenharia Elétrica", mail("ene", "unb.br"), "SG-11", 1),
            (3, "Departamento de Matemática", mail("mat", "unb.br"), "ICC Centro", 1),
            (4, "Departamento de Estatística", mail("est", "unb.br"), "ICC Norte", 1),
        ]
        cursor.executemany(
            "INSERT IGNORE INTO departamento (idDepartamento, nome, email, local, idUniversidade) VALUES (%s, %s, %s, %s, %s)",
            departamentos,
        )

        # Garante que todo departamento esteja vinculado a uma universidade.
        # (departamentos criados pelo fluxo get_or_create ficam sem idUniversidade)
        cursor.execute("UPDATE departamento SET idUniversidade = 1 WHERE idUniversidade IS NULL")

        # ==================================================================
        # 4. Cursos
        # ==================================================================
        cursos = [
            (1, "Ciência da Computação", 9, "Bacharelado em Ciência da Computação", 1),
            (2, "Engenharia da Computação", 10, "Bacharelado em Engenharia da Computação", 1),
            (3, "Matemática", 8, "Bacharelado em Matemática", 1),
        ]
        cursor.executemany(
            "INSERT IGNORE INTO curso (idCurso, nome, duracao_semestres, descricao, idUniversidade) VALUES (%s, %s, %s, %s, %s)",
            cursos,
        )

        curso_dept = [
            (1, 1),  # CC -> CIC
            (2, 1),  # Eng. Comp -> CIC
            (2, 2),  # Eng. Comp -> ENE
            (3, 3),  # Matemática -> MAT
        ]
        cursor.executemany(
            "INSERT IGNORE INTO curso_departamento (idCurso, idDepartamento) VALUES (%s, %s)",
            curso_dept,
        )

        # ==================================================================
        # 5. Disciplinas
        # ==================================================================
        disciplinas = [
            (1, "Algoritmos e Programação de Computadores", 60, "Introdução à programação usando Python e C.", 1),
            (2, "Estruturas de Dados", 60, "Listas, filas, pilhas, árvores e grafos.", 1),
            (3, "Banco de Dados", 60, "Modelagem relacional, SQL e normalização.", 1),
            (4, "Cálculo 1", 90, "Limites, derivadas e integrais.", 3),
            (5, "Engenharia de Software", 60, "Processos, requisitos e testes de software.", 1),
            (6, "Circuitos Digitais", 60, "Lógica digital e circuitos combinacionais.", 2),
        ]
        cursor.executemany(
            "INSERT IGNORE INTO disciplina (idDisciplina, nome, carga_horaria, ementa, idDepartamento) VALUES (%s, %s, %s, %s, %s)",
            disciplinas,
        )

        pre_requisitos = [
            (2, 1),  # ED requer APC
            (3, 2),  # BD requer ED
            (5, 2),  # Eng. Software requer ED
        ]
        cursor.executemany(
            "INSERT IGNORE INTO pre_requisito (idDisciplina, idPreRequisito) VALUES (%s, %s)",
            pre_requisitos,
        )

        disc_curso = [
            (1, 1), (2, 1), (3, 1), (4, 1), (5, 1),   # CC
            (1, 2), (2, 2), (4, 2), (6, 2),             # Eng. Comp
            (4, 3),                                       # Matemática
        ]
        cursor.executemany(
            "INSERT IGNORE INTO disc_curso (idDisciplina, idCurso) VALUES (%s, %s)",
            disc_curso,
        )

        # ==================================================================
        # 6. Tipos de vaga
        # ==================================================================
        tipos_vaga = [
            (1, "Monitoria", "Vaga de monitoria em disciplinas da graduação"),
            (2, "Iniciação Científica", "Bolsa PIBIC/PIBITI para pesquisa"),
            (3, "Estágio", "Estágio em laboratório ou projeto"),
            (4, "Extensão", "Projeto de extensão universitária"),
        ]
        cursor.executemany(
            "INSERT IGNORE INTO tipo_vaga (idTipoVaga, nome, descricao) VALUES (%s, %s, %s)",
            tipos_vaga,
        )

        # ==================================================================
        # 7. Usuários (chaveados por matrícula; idUsuario resolvido no banco)
        # ==================================================================
        # (matricula, nome, email, data_nasc, perfil, senha_plana)
        alunos = [
            ("231012345", "Ana Costa", mail("ana.costa", "aluno.unb.br"), "2004-03-15", "senha123"),
            ("231054321", "Bruno Lima", mail("bruno.lima", "aluno.unb.br"), "2003-08-22", "senha123"),
            ("221098765", "Carla Nunes", mail("carla.nunes", "aluno.unb.br"), "2002-11-10", "senha123"),
        ]
        professores = [
            ("P12345", "Prof. Maria Souza", mail("maria.souza", "prof.unb.br"), "1978-06-01", "minhasenhadoprofessor"),
            ("P54321", "Prof. Carlos Mendes", mail("carlos.mendes", "prof.unb.br"), "1975-02-14", "senha123"),
        ]

        uid = {}  # matricula -> idUsuario real

        for mat, nome, email, nasc, senha in alunos:
            uid[mat] = upsert_usuario(cursor, mat, nome, email, nasc, "aluno", senha)
        for mat, nome, email, nasc, senha in professores:
            uid[mat] = upsert_usuario(cursor, mat, nome, email, nasc, "professor", senha)

        # Detalhes de aluno (nivel, curriculo, area_interesse)
        upsert_aluno(cursor, uid["231012345"], "graduacao", None, "Inteligência Artificial")
        upsert_aluno(cursor, uid["231054321"], "graduacao", None, "Desenvolvimento Web")
        upsert_aluno(cursor, uid["221098765"], "pos-graduacao", None, "Banco de Dados e Mineração de Dados")

        # Detalhes de professor (area_pesquisa, idDepartamento, idDeptCoordenado)
        upsert_professor(cursor, uid["P12345"], "Inteligência Artificial e Aprendizado de Máquina", 1, None)
        upsert_professor(cursor, uid["P54321"], "Sistemas Distribuídos e Redes", 1, None)

        # ==================================================================
        # 8. Inscrições de alunos em cursos
        # ==================================================================
        inscricoes = [
            (uid["231012345"], 1),  # Ana -> CC
            (uid["231054321"], 1),  # Bruno -> CC
            (uid["221098765"], 1),  # Carla -> CC (pós)
        ]
        cursor.executemany(
            "INSERT IGNORE INTO inscricao (idAluno, idCurso) VALUES (%s, %s)",
            inscricoes,
        )

        # Disciplinas cursadas
        faz = [
            (uid["231012345"], 1, "2024/1"), (uid["231012345"], 4, "2024/1"),
            (uid["231012345"], 2, "2024/2"),
            (uid["231054321"], 1, "2024/1"), (uid["231054321"], 4, "2024/1"),
            (uid["221098765"], 1, "2023/1"), (uid["221098765"], 2, "2023/2"), (uid["221098765"], 3, "2024/1"),
        ]
        cursor.executemany(
            "INSERT IGNORE INTO faz (idAluno, idDisciplina, semestre) VALUES (%s, %s, %s)",
            faz,
        )

        # ==================================================================
        # 9. Vagas e Oportunidades
        # ==================================================================
        vagas = [
            (1, "Monitoria de APC", "Monitor para auxiliar nas aulas práticas de APC",
             "Ter cursado APC com menção SS ou MS", "graduacao", "presencial", "publicada",
             "ICC Norte, Lab 7", 20, 3, "2025-07-01", "2025-07-31", 1, 1, 1),
            (2, "IC em Aprendizado de Máquina", "Pesquisa em técnicas de deep learning para NLP",
             "Conhecimento em Python e estatística básica", "ambos", "hibrido", "publicada",
             "LINF", 20, 1, "2025-07-01", "2025-08-15", 2, 1, 1),
            (3, "Monitoria de Banco de Dados", "Monitor para apoio em SQL e modelagem relacional",
             "Ter cursado BD", "graduacao", "presencial", "publicada",
             "ICC Norte, Lab 12", 20, 2, "2025-07-10", "2025-08-10", 1, 1, 1),
            (4, "Estágio em Redes", "Estágio no laboratório de redes do CIC",
             "Cursando a partir do 6º semestre", "graduacao", "presencial", "em_analise",
             "SG-11", 30, 1, "2025-08-01", "2025-08-31", 3, 1, 1),
        ]
        for v in vagas:
            cursor.execute(
                """INSERT INTO vagas_oportunidades
                   (idVagas, titulo, descricao, requisitos, nivel, modalidade, status,
                    local, carga_horaria, num_max, data_inicio_candidatura, data_fim_candidatura,
                    idTipoVaga, idCampus, idDepartamento)
                   VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                   ON DUPLICATE KEY UPDATE titulo = VALUES(titulo)""",
                v,
            )

        # Responsáveis pelas vagas
        responsaveis = [
            (uid["P12345"], 1),  # Maria -> Monitoria APC
            (uid["P12345"], 2),  # Maria -> IC em ML
            (uid["P54321"], 3),  # Carlos -> Monitoria BD
            (uid["P54321"], 4),  # Carlos -> Estágio em Redes
        ]
        cursor.executemany(
            "INSERT IGNORE INTO responsavel_vaga (idProfessor, idVagas) VALUES (%s, %s)",
            responsaveis,
        )

        # ==================================================================
        # 10. Candidaturas
        # ==================================================================
        candidaturas = [
            (uid["231012345"], 1, "Tenho interesse em ser monitora de APC. Tirei SS na disciplina.", "enviado"),
            (uid["231012345"], 2, "Gostaria de participar da IC em ML, tenho projetos pessoais na área.", "em_analise"),
            (uid["231054321"], 1, "Quero contribuir como monitor de APC.", "enviado"),
            (uid["221098765"], 3, "Tenho experiência com SQL e modelagem ER.", "aprovado"),
        ]
        for c in candidaturas:
            cursor.execute(
                """INSERT INTO candidatura (idAluno, idVagas, mensagem_apresentacao, status)
                   VALUES (%s, %s, %s, %s)
                   ON DUPLICATE KEY UPDATE status = VALUES(status)""",
                c,
            )

        # ==================================================================
        # 11. Conversas e Mensagens (IDs na faixa 100+ para não colidir com dados reais)
        # ==================================================================
        cursor.execute(
            """INSERT INTO conversa (idConversa, status, idVagas)
               VALUES (100, 'ativa', 2)
               ON DUPLICATE KEY UPDATE status = VALUES(status)"""
        )

        conversa_usuarios = [(100, uid["231012345"]), (100, uid["P12345"])]
        cursor.executemany(
            "INSERT IGNORE INTO conversa_usuario (idConversa, idUsuario) VALUES (%s, %s)",
            conversa_usuarios,
        )

        mensagens = [
            (100, "Olá Ana, vi seu interesse na IC. Pode me contar sobre seus projetos?", uid["P12345"]),
            (101, "Olá professora! Desenvolvi um chatbot com transformers para um projeto pessoal.", uid["231012345"]),
            (102, "Muito bom! Vamos marcar uma reunião para discutir os próximos passos.", uid["P12345"]),
        ]
        for m in mensagens:
            cursor.execute(
                """INSERT INTO mensagem (idMensagem, texto, idConversa, idUsuario)
                   VALUES (%s, %s, 100, %s)
                   ON DUPLICATE KEY UPDATE texto = VALUES(texto)""",
                m,
            )

        # ==================================================================
        # 12. Comentários em vagas (IDs 100+)
        # ==================================================================
        comentarios = [
            (100, 1, uid["231054321"], "Essa vaga aceita alunos do 2º semestre?"),
            (101, 2, uid["221098765"], "O horário é flexível para quem trabalha?"),
        ]
        for c in comentarios:
            cursor.execute(
                """INSERT INTO comentario_vaga (idComentario, idVagas, idUsuario, texto)
                   VALUES (%s, %s, %s, %s)
                   ON DUPLICATE KEY UPDATE texto = VALUES(texto)""",
                c,
            )

        # ==================================================================
        conn.commit()
        print("[OK] Seed executado com sucesso!")
        print()
        print("IDs atribuidos:")
        for mat, i in uid.items():
            print(f"  matricula={mat:<12} -> idUsuario={i}")
        print()
        print("Credenciais de teste:")
        print("  Aluno:     matricula=231012345   senha=senha123")
        print("  Aluno 2:   matricula=231054321   senha=senha123")
        print("  Aluno 3:   matricula=221098765   senha=senha123")
        print("  Professor: matricula=P12345      senha=minhasenhadoprofessor")
        print("  Professor: matricula=P54321      senha=senha123")

    except Exception as e:
        conn.rollback()
        print(f"[ERRO] Erro ao executar seed: {e}")
        raise

    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    seed()
