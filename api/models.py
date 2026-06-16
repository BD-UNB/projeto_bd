from sqlalchemy import create_engine, Column, Integer, String, Text, Enum, Date, TIMESTAMP, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Universidade(Base):
    __tablename__ = 'universidade'
    idUniversidade = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)

class Campus(Base):
    __tablename__ = 'campus'
    idCampus = Column(Integer, primary_key=True)
    nome = Column(String(50), nullable=False)
    local = Column(String(100))
    idUniversidade = Column(Integer, ForeignKey('universidade.idUniversidade'))

class Departamento(Base):
    __tablename__ = 'departamento'
    idDepartamento = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    local = Column(String(100))
    idUniversidade = Column(Integer, ForeignKey('universidade.idUniversidade'))
class Curso(Base):
    __tablename__ = 'curso'
    idCurso = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    duracao_semestres = Column(Integer, nullable=False)
    descricao = Column(Text)

class Disciplina(Base):
    __tablename__ = 'disciplina'
    idDisciplina = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    carga_horaria = Column(Integer, nullable=False)
    ementa = Column(Text)
    idDepartamento = Column(Integer, ForeignKey('departamento.idDepartamento'))

class PreRequisito(Base):
    __tablename__ = 'pre_requisito'
    idDisciplina = Column(Integer, ForeignKey('disciplina.idDisciplina'))
    idPreRequisito = Column(Integer, ForeignKey('disciplina.idDisciplina'))
    PRIMARY KEY (idDisciplina, idPreRequisito),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina),
    FOREIGN KEY (idPreRequisito) REFERENCES disciplina(idDisciplina)

class DiscCurso(Base):
    __tablename__ = 'disc_curso'
    idDisciplina = Column(Integer, ForeignKey('disciplina.idDisciplina'))
    idCurso = Column(Integer, ForeignKey('curso.idCurso'))
    PRIMARY KEY (idDisciplina, idCurso),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina),
    FOREIGN KEY (idCurso) REFERENCES curso(idCurso)

class TipoVaga(Base):
    __tablename__ = 'tipo_vaga'
    idTipoVaga = Column(Integer, primary_key=True)
    nome = Column(String(50), nullable=False)
    descricao = Column(Text)

class Usuario(Base):
    __tablename__ = 'usuario'
    idUsuario = Column(Integer, primary_key=True)
    matricula = Column(String(20), unique=True, nullable=False)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    data_nasc = Column(Date)
    perfil = Column(Enum('aluno', 'professor', 'admin'), nullable=False, default='aluno')
    senha = Column(String(255), nullable=False)

class Aluno(Base):
    __tablename__ = 'aluno'
    idAluno = Column(Integer, primary_key=True)
    nivel = Column(Enum('graduacao', 'pos-graduacao'), nullable=False)
    curriculo = Column(BLOB)
    area_interesse = Column(Text)
    FOREIGN KEY (idAluno) REFERENCES usuario(idUsuario)

class Professor(Base):
    __tablename__ = 'professor'
    idProfessor = Column(Integer, primary_key=True)
    area_pesquisa = Column(Text)
    idDepartamento = Column(Integer, ForeignKey('departamento.idDepartamento'))
    idDeptCoordenado = Column(Integer, ForeignKey('departamento.idDepartamento'))
    FOREIGN KEY (idProfessor) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idDepartamento) REFERENCES departamento(idDepartamento),
    FOREIGN KEY (idDeptCoordenado) REFERENCES departamento(idDepartamento)

class VagasOportunidades(Base):
    __tablename__ = 'vagas_oportunidades'
    idVagas = Column(Integer, primary_key=True)
    titulo = Column(String(100), nullable=False)
    descricao = Column(Text, nullable=False)
    requisitos = Column(Text)
    nivel = Column(Enum('graduacao', 'pos-graduacao', 'ambos'), nullable=False, default='graduacao')
    modalidade = Column(Enum('presencial', 'remoto', 'hibrido'))
    status = Column(Enum('rascunho', 'publicada', 'encerrada', 'cancelada'), nullable=False, default='rascunho')
    local = Column(String(100))
    carga_horaria = Column(Integer, nullable=False)
    num_max = Column(Integer, nullable=False)
    data_inicio_candidatura = Column(Date)
    data_fim_candidatura = Column(Date)
    idTipoVaga = Column(Integer, ForeignKey('tipo_vaga.idTipoVaga'))
    idCampus = Column(Integer, ForeignKey('campus.idCampus'))
    idDepartamento = Column(Integer, ForeignKey('departamento.idDepartamento'))
    FOREIGN KEY (idTipoVaga) REFERENCES tipo_vaga(idTipoVaga),
    FOREIGN KEY (idCampus) REFERENCES campus(idCampus),
    FOREIGN KEY (idDepartamento) REFERENCES departamento(idDepartamento)

class ResponsavelVaga(Base):
    __tablename__ = 'responsavel_vaga'
    idProfessor = Column(Integer, ForeignKey('professor.idProfessor'))
    idVagas = Column(Integer, ForeignKey('vagas_oportunidades.idVagas'))
    PRIMARY KEY (idProfessor, idVagas),
    FOREIGN KEY (idProfessor) REFERENCES professor(idProfessor),
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas)

class Candidatura(Base):
    __tablename__ = 'candidatura'
    idAluno = Column(Integer, ForeignKey('aluno.idAluno'))
    idVagas = Column(Integer, ForeignKey('vagas_oportunidades.idVagas'))
    data_candidatura = Column(DateTime, default=func.now())
    data_fim = Column(Date)
    mensagem_apresentacao = Column(Text)
    status = Column(Enum('enviado', 'em_analise', 'aprovado', 'recusado', 'cancelado'), nullable=False, default='enviado')
    PRIMARY KEY (idAluno, idVagas),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas)

class Inscricao(Base):
    __tablename__ = 'inscricao'
    idAluno = Column(Integer, ForeignKey('aluno.idAluno'))
    idCurso = Column(Integer, ForeignKey('curso.idCurso'))
    PRIMARY KEY (idAluno, idCurso),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idCurso) REFERENCES curso(idCurso)

class Faz(Base):
    __tablename__ = 'faz'
    idAluno = Column(Integer, ForeignKey('aluno.idAluno'))
    idDisciplina = Column(Integer, ForeignKey('disciplina.idDisciplina'))
    semestre = Column(String(20), nullable=False)
    PRIMARY KEY (idAluno, idDisciplina),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina)

class Inscricao(Base):
    __tablename__ = 'inscricao'
    idAluno = Column(Integer, ForeignKey('aluno.idAluno'))
    idCurso = Column(Integer, ForeignKey('curso.idCurso'))
    PRIMARY KEY (idAluno, idCurso),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idCurso) REFERENCES curso(idCurso)

class Faz(Base):
    __tablename__ = 'faz'
    idAluno = Column(Integer, ForeignKey('aluno.idAluno'))
    idDisciplina = Column(Integer, ForeignKey('disciplina.idDisciplina'))
    semestre = Column(String(20), nullable=False)
    PRIMARY KEY (idAluno, idDisciplina),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina)

class Conversa(Base):
    __tablename__ = 'conversa'
    idConversa = Column(Integer, primary_key=True)
    dataCriacao = Column(DateTime, default=func.now())
    status = Column(Enum('ativa', 'arquivada', 'encerrada'), nullable=False, default='ativa')
    idVagas = Column(Integer, ForeignKey('vagas_oportunidades.idVagas'))
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas)

class Mensagem(Base):
    __tablename__ = 'mensagem'
    idMensagem = Column(Integer, primary_key=True)
    texto = Column(Text)
    dataHora = Column(DateTime, default=func.now())
    lida = Column(Boolean, default=False)
    anexo = Column(BLOB)
    idConversa = Column(Integer, ForeignKey('conversa.idConversa'))
    idUsuario = Column(Integer, ForeignKey('usuario.idUsuario'))
    FOREIGN KEY (idConversa) REFERENCES conversa(idConversa),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)

class ConversaUsuario(Base):
    __tablename__ = 'conversa_usuario'
    idConversa = Column(Integer, ForeignKey('conversa.idConversa'))
    idUsuario = Column(Integer, ForeignKey('usuario.idUsuario'))
    PRIMARY KEY (idConversa, idUsuario),
    FOREIGN KEY (idConversa) REFERENCES conversa(idConversa),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)

class ComentarioVaga(Base):
    __tablename__ = 'comentario_vaga'
    idComentario = Column(Integer, primary_key=True)
    idVagas = Column(Integer, ForeignKey('vagas_oportunidades.idVagas'))
    idUsuario = Column(Integer, ForeignKey('usuario.idUsuario'))
    texto = Column(Text, nullable=False)
    dataHora = Column(DateTime, default=func.now())
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
