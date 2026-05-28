CREATE TABLE tipo_vaga (
    idTipoVaga INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    descricao TEXT
);

CREATE TABLE universidade (
    idUniversidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

CREATE TABLE campus (
    idCampus INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    local VARCHAR(100),
    idUniversidade INT,
    FOREIGN KEY (idUniversidade) REFERENCES universidade(idUniversidade)
);

CREATE TABLE departamento (
    idDepartamento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    local VARCHAR(100),
    idUniversidade INT,
    FOREIGN KEY (idUniversidade) REFERENCES universidade(idUniversidade)
);

CREATE TABLE curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    duracao_semestres INT,
    descricao TEXT
);

CREATE TABLE disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    carga_horaria INT,
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

CREATE TABLE conversa (
    idConversa INT PRIMARY KEY AUTO_INCREMENT,
    dataCriacao DATE,
    status ENUM('ativa', 'arquivada', 'encerrada')
);

CREATE TABLE mensagem (
    idMensagem INT PRIMARY KEY AUTO_INCREMENT,
    texto TEXT,
    dataHora DATETIME,
    lida BOOLEAN DEFAULT FALSE,
    anexo LONGBLOB,
    idConversa INT,
    idUsuario INT,
    FOREIGN KEY (idConversa) REFERENCES conversa(idConversa),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(20) UNIQUE,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    data_nasc DATE,
    senha VARCHAR(255)
);

CREATE TABLE aluno (
    idAluno INT PRIMARY KEY,
    nivel ENUM('graduacao', 'pos-graduacao'),
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
    titulo VARCHAR(100),
    descricao TEXT,
    requisitos TEXT,
    nivel VARCHAR(50),
    modalidade ENUM('presencial', 'remoto', 'hibrido'),
    status ENUM('rascunho', 'publicada', 'encerrada', 'cancelada') DEFAULT 'rascunho',
    local VARCHAR(100),
    carga_horaria INT,
    num_max INT,
    data_inicio_candidatura DATE,
    data_fim_candidatura DATE,
    idTipoVaga INT,
    FOREIGN KEY (idTipoVaga) REFERENCES tipo_vaga(idTipoVaga)
);

CREATE TABLE responsavel_vaga (
    idProfessor INT,
    idVagas INT,
    PRIMARY KEY (idProfessor, idVagas),
    FOREIGN KEY (idProfessor) REFERENCES professor(idProfessor),
    FOREIGN KEY (idVagas) REFERENCES vagas_oportunidades(idVagas)
);

CREATE TABLE candidatura (
    idUsuario INT,
    idVagas INT,
    data_candidatura DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fim DATE,
    mensagem_apresentacao TEXT,
    status ENUM('enviado', 'em_analise', 'aprovado', 'recusado', 'cancelado') DEFAULT 'enviado',
    PRIMARY KEY (idUsuario, idVagas),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
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
    semestre VARCHAR(20),
    PRIMARY KEY (idAluno, idDisciplina),
    FOREIGN KEY (idAluno) REFERENCES aluno(idAluno),
    FOREIGN KEY (idDisciplina) REFERENCES disciplina(idDisciplina)
);

CREATE TABLE conversa_usuario (
    idConversa INT,
    idUsuario INT,
    PRIMARY KEY (idConversa, idUsuario),
    FOREIGN KEY (idConversa) REFERENCES conversa(idConversa),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);
