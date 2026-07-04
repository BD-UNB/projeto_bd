class Universidade:
    def __init__(self, nome):
        self.nome = nome

class Campus:
    def __init__(self, nome, local):
        self.nome = nome
        self.local = local

class Departamento:
    def __init__(self, nome, email, local):
        self.nome = nome
        self.email = email
        self.local = local

class Curso:
    def __init__(self, nome, duracao_semestres, descricao):
        self.nome = nome
        self.duracao_semestres = duracao_semestres
        self.descricao = descricao

class Disciplina:
    def __init__(self, nome, carga_horaria, ementa):
        self.nome = nome
        self.carga_horaria = carga_horaria
        self.ementa = ementa

class PreRequisito:
    def __init__(self, idDisciplina, idPreRequisito):
        self.idDisciplina = idDisciplina
        self.idPreRequisito = idPreRequisito

class DiscCurso:
    def __init__(self, idDisciplina, idCurso):
        self.idDisciplina = idDisciplina
        self.idCurso = idCurso

class TipoVaga:
    def __init__(self, nome, descricao):
        self.nome = nome
        self.descricao = descricao

class Usuario:
    def __init__(self, nome, email, data_nasc, telefone, perfil, cpf, senha):
        self.nome = nome
        self.email = email
        self.data_nasc = data_nasc
        self.telefone = telefone
        self.perfil = perfil
        self.cpf = cpf
        self.senha = senha

class Aluno(Usuario):
    def __init__(self, nome, email, data_nasc, perfil, senha, telefone, cpf, nivel, curriculo, area_interesse):
        super().__init__(nome, email, data_nasc, telefone, perfil, cpf, senha)
        self.nivel = nivel
        self.curriculo = curriculo
        self.area_interesse = area_interesse

class Professor(Usuario):
    def __init__(self, nome, email, data_nasc, perfil, senha, telefone, cpf, area_pesquisa, idDepartamento, idDeptCoordenado):
        super().__init__(nome, email, data_nasc, telefone, perfil, cpf, senha)
        self.area_pesquisa = area_pesquisa
        self.idDepartamento = idDepartamento
        self.idDeptCoordenado = idDeptCoordenado

class VagasOportunidades:
    def __init__(self, titulo, descricao, requisitos, nivel, modalidade, status, local, carga_horaria, num_max, data_inicio_candidatura, data_fim_candidatura, idTipoVaga, idCampus, idDepartamento):
        self.titulo = titulo
        self.descricao = descricao
        self.requisitos = requisitos
        self.nivel = nivel
        self.modalidade = modalidade
        self.status = status
        self.local = local
        self.carga_horaria = carga_horaria
        self.num_max = num_max
        self.data_inicio_candidatura = data_inicio_candidatura
        self.data_fim_candidatura = data_fim_candidatura
        self.idTipoVaga = idTipoVaga
        self.idCampus = idCampus
        self.idDepartamento = idDepartamento

class Professor:
    def __init__(self, area_pesquisa, idDepartamento, idDeptCoordenado):
        self.area_pesquisa = area_pesquisa
        self.idDepartamento = idDepartamento
        self.idDeptCoordenado = idDeptCoordenado

class VagasOportunidades:
    def __init__(self, titulo, descricao, requisitos, nivel, modalidade, status, local, carga_horaria, num_max, data_inicio_candidatura, data_fim_candidatura, idTipoVaga, idCampus, idDepartamento):
        self.titulo = titulo
        self.descricao = descricao
        self.requisitos = requisitos
        self.nivel = nivel
        self.modalidade = modalidade
        self.status = status
        self.local = local
        self.carga_horaria = carga_horaria
        self.num_max = num_max
        self.data_inicio_candidatura = data_inicio_candidatura
        self.data_fim_candidatura = data_fim_candidatura
        self.idTipoVaga = idTipoVaga
        self.idCampus = idCampus
        self.idDepartamento = idDepartamento

class ResponsavelVaga:
    def __init__(self, idProfessor, idVagas):
        self.idProfessor = idProfessor
        self.idVagas = idVagas

class Candidatura:
    def __init__(self, idAluno, idVagas, data_candidatura, data_fim, mensagem_apresentacao, status):
        self.idAluno = idAluno
        self.idVagas = idVagas
        self.data_candidatura = data_candidatura
        self.data_fim = data_fim
        self.mensagem_apresentacao = mensagem_apresentacao
        self.status = status

class Inscricao:
    def __init__(self, idAluno, idCurso):
        self.idAluno = idAluno
        self.idCurso = idCurso

class Faz:
    def __init__(self, idAluno, idDisciplina, semestre):
        self.idAluno = idAluno
        self.idDisciplina = idDisciplina
        self.semestre = semestre

class Conversa:
    def __init__(self, dataCriacao, status, idVagas):
        self.dataCriacao = dataCriacao
        self.status = status
        self.idVagas = idVagas

class Mensagem:
    def __init__(self, texto, dataHora, lida, anexo, idConversa, idUsuario):
        self.texto = texto
        self.dataHora = dataHora
        self.lida = lida
        self.anexo = anexo
        self.idConversa = idConversa
        self.idUsuario = idUsuario

class ConversaUsuario:
    def __init__(self, idConversa, idUsuario):
        self.idConversa = idConversa
        self.idUsuario = idUsuario

class ComentarioVaga:
    def __init__(self, idVagas, idUsuario, texto, dataHora):
        self.idVagas = idVagas
        self.idUsuario = idUsuario
        self.texto = texto
        self.dataHora = dataHora
