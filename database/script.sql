CREATE TABLE universidade (
    idUniversidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE campus (
    idCampus INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    local VARCHAR(100),
    idUniversidade INT,
    FOREIGN KEY (idUniversidade) REFERENCES universidade(idUniversidade)
);

CREATE TABLE departamento (
    idDepartamento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    local VARCHAR(100),
    idUniversidade INT,
    FOREIGN KEY (idUniversidade) REFERENCES universidade(idUniversidade)
);

CREATE TABLE curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE NOT NULL,
    duracao_semestres INT NOT NULL,
    descricao TEXT,
    idUniversidade INT,
    FOREIGN KEY (idUniversidade) REFERENCES universidade(idUniversidade)
);

CREATE TABLE curso_departamento (
    idCurso INT,
    idDepartamento INT,
    PRIMARY KEY (idCurso, idDepartamento),
    FOREIGN KEY (idCurso) REFERENCES curso(idCurso),
    FOREIGN KEY (idDepartamento) REFERENCES departamento(idDepartamento)
);

CREATE TABLE disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    carga_horaria INT NOT NULL,
    ementa TEXT,
    idDepartamento INT,
    FOREIGN KEY (idDepartamento) REFERENCES departamento(idDepartamento)
);

CREATE TABLE pre_requisito (
    idDisciplina INT,
    idPreRequisito INT,
    PRIMARY KEY (idDisciplina, idPreRequisito),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina),
    FOREIGN KEY (idPreRequisito) REFERENCES disciplina(idDisciplina)
);

CREATE TABLE disc_curso (
    idDisciplina INT,
    idCurso INT,
    PRIMARY KEY (idDisciplina, idCurso),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina),
    FOREIGN KEY (idCurso) REFERENCES curso(idCurso)
);

CREATE TABLE tipo_vaga (
    idTipoVaga INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_nasc DATE,
    perfil ENUM('aluno', 'professor', 'admin') NOT NULL DEFAULT 'aluno',
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE aluno (
    idAluno INT PRIMARY KEY,
    nivel ENUM('graduacao', 'pos-graduacao') NOT NULL,
    curriculo LONGBLOB,
    area_interesse TEXT,
    FOREIGN KEY (idAluno) REFERENCES usuario(idUsuario)
);

CREATE TABLE professor (
    idProfessor INT PRIMARY KEY,
    area_pesquisa TEXT,
    idDepartamento INT,
    idDeptCoordenado INT,
    FOREIGN KEY (idProfessor) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idDepartamento) REFERENCES departamento(idDepartamento),
    FOREIGN KEY (idDeptCoordenado) REFERENCES departamento(idDepartamento)
);

CREATE TABLE vagas_oportunidades (
    idVagas INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    requisitos TEXT,
    nivel ENUM('graduacao', 'pos-graduacao', 'ambos') DEFAULT 'graduacao',
    modalidade ENUM('presencial', 'remoto', 'hibrido'),
    status ENUM('rascunho', 'publicada', 'encerrada', 'cancelada') DEFAULT 'rascunho',
    local VARCHAR(100),
    carga_horaria INT NOT NULL,
    num_max INT NOT NULL,
    data_inicio_candidatura DATE,
    data_fim_candidatura DATE,
    idTipoVaga INT,
    idCampus INT,
    idDepartamento INT,
    FOREIGN KEY (idTipoVaga) REFERENCES tipo_vaga(idTipoVaga),
    FOREIGN KEY (idCampus) REFERENCES campus(idCampus),
    FOREIGN KEY (idDepartamento) REFERENCES departamento(idDepartamento)
);

CREATE TABLE responsavel_vaga (
    idProfessor INT,
    idVagas INT,
    PRIMARY KEY (idProfessor, idVagas),
    FOREIGN KEY (idProfessor) REFERENCES professor(idProfessor),
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas)
);

CREATE TABLE candidatura (
    idAluno INT,
    idVagas INT,
    data_candidatura DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fim DATE,
    mensagem_apresentacao TEXT,
    status ENUM('enviado', 'em_analise', 'aprovado', 'recusado', 'cancelado') DEFAULT 'enviado',
    PRIMARY KEY (idAluno, idVagas),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas)
);

CREATE TABLE inscricao (
    idAluno INT,
    idCurso INT,
    PRIMARY KEY (idAluno, idCurso),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idCurso) REFERENCES curso(idCurso)
);

CREATE TABLE faz (
    idAluno INT,
    idDisciplina INT,
    semestre VARCHAR(20) NOT NULL,
    PRIMARY KEY (idAluno, idDisciplina),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina)
);

CREATE TABLE conversa (
    idConversa INT PRIMARY KEY AUTO_INCREMENT,
    dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativa', 'arquivada', 'encerrada') DEFAULT 'ativa',
    idVagas INT,
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas)
);

CREATE TABLE mensagem (
    idMensagem INT PRIMARY KEY AUTO_INCREMENT,
    texto TEXT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE,
    anexo LONGBLOB,
    idConversa INT,
    idUsuario INT,
    FOREIGN KEY (idConversa) REFERENCES conversa(idConversa),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE conversa_usuario (
    idConversa INT,
    idUsuario INT,
    PRIMARY KEY (idConversa, idUsuario),
    FOREIGN KEY (idConversa) REFERENCES conversa(idConversa),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario_vaga (
    idComentario INT PRIMARY KEY AUTO_INCREMENT,
    idVagas INT NOT NULL,
    idUsuario INT NOT NULL,
    texto TEXT NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);
