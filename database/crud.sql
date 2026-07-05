USE projeto_bd;

-- CRUD: universidade
INSERT INTO universidade (nome) VALUES ('Universidade de Brasília');

SELECT * FROM universidade;
SELECT * FROM universidade 
	WHERE idUniversidade = 1;

UPDATE universidade
SET nome = 'Universidade de Brasília (UnB)'
	WHERE idUniversidade = 1;

DELETE FROM universidade 
	WHERE idUniversidade = 1;

-- CRUD: campus
INSERT INTO campus (nome, local, idUniversidade) VALUES
('Campus Darcy Ribeiro', 'Brasília - DF', 1);

SELECT * FROM campus;
SELECT * FROM campus 
	WHERE idCampus = 2;

UPDATE campus
SET nome = 'Campus Universitário Darcy Ribeiro', local = 'Brasília, Distrito Federal'
	WHERE idCampus = 2;

DELETE FROM campus 
	WHERE idCampus = 2;

-- CRUD: departamento
INSERT INTO departamento (nome, email, local, idUniversidade) VALUES
('Departamento de Ciência da Computação', 'dcc@unb.br', 'ICC Sul', 1),
('Departamento de Engenharia Elétrica', 'ene@unb.br', 'FT', 1),
('Departamento de Matemática', 'mat@unb.br', 'ICC Centro', 1),
('Departamento de Letras', 'let@unb.br', 'ICC Norte', 1),
('Departamento de Administração', 'adm@unb.br', 'FACE', 1);

SELECT * FROM departamento;
SELECT * FROM departamento 
	WHERE idDepartamento = 1;

UPDATE departamento
SET email = 'dcc_novo@unb.br', local = 'ICC Sul Bloco A'
	WHERE idDepartamento = 1;

DELETE FROM departamento 
	WHERE idDepartamento = 1;

-- CRUD: curso
INSERT INTO curso (nome, duracao_semestres, descricao, idUniversidade) VALUES
('Ciência da Computação', 8, 'Curso de graduação em Ciência da Computação.', 1),
('Engenharia Elétrica', 10, 'Curso de graduação em Engenharia Elétrica.', 1),
('Matemática', 8, 'Curso de graduação em Matemática.', 1),
('Letras - Português', 8, 'Curso de graduação em Letras com foco em Português.', 1),
('Administração', 8, 'Curso de graduação em Administração.', 1);

SELECT * FROM curso;
SELECT * FROM curso 
	WHERE idCurso = 1;

UPDATE curso
SET duracao_semestres = 9, descricao = 'Curso de graduação em Ciência da Computação com ênfase em IA.'
	WHERE idCurso = 1;

DELETE FROM curso 
	WHERE idCurso = 1;

-- CRUD: curso_departamento
INSERT INTO curso_departamento (idCurso, idDepartamento) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

SELECT * FROM curso_departamento; 
SELECT * FROM curso_departamento 
	WHERE idCurso = 1 AND idDepartamento = 1;

-- Faz sentido ?
UPDATE curso_departamento SET idDepartamento = 6 
	WHERE idCurso = 1 AND idDepartamento = 1;

DELETE FROM curso_departamento 
	WHERE idCurso = 1 AND idDepartamento = 1;

-- CRUD: disciplina
INSERT INTO disciplina (nome, carga_horaria, ementa, idDepartamento) VALUES
('Estruturas de Dados', 60, 'Estudo de estruturas de dados fundamentais.', 1),
('Circuitos Elétricos I', 60, 'Análise de circuitos elétricos em corrente contínua.', 2),
('Cálculo I', 90, 'Fundamentos do cálculo diferencial e integral.', 3),
('Introdução à Linguística', 60, 'Conceitos básicos da linguística.', 4),
('Contabilidade Geral', 60, 'Princípios e práticas da contabilidade.', 5);

SELECT * FROM disciplina;
SELECT * FROM disciplina 
	WHERE idDisciplina = 1;

UPDATE disciplina
SET carga_horaria = 75, ementa = 'Estudo aprofundado de estruturas de dados e algoritmos.'
	WHERE idDisciplina = 1;

DELETE FROM disciplina 
	WHERE idDisciplina = 1;

-- CRUD: pre_requisito
INSERT INTO pre_requisito (idDisciplina, idPreRequisito) VALUES
(1, 3),
(2, 3); 

SELECT * FROM pre_requisito; 
SELECT * FROM pre_requisito 
	WHERE idDisciplina = 1 AND idPreRequisito = 3;

DELETE FROM pre_requisito 
	WHERE idDisciplina = 1 AND idPreRequisito = 3;

-- CRUD: disc_curso
INSERT INTO disc_curso (idDisciplina, idCurso) VALUES
(1, 1), 
(2, 2), 
(3, 3), 
(4, 4), 
(5, 5); 

SELECT * FROM disc_curso;
SELECT * FROM disc_curso 
	WHERE idDisciplina = 1 AND idCurso = 1;

DELETE FROM disc_curso 
	WHERE idDisciplina = 1 AND idCurso = 1;

-- CRUD: tipo_vaga
INSERT INTO tipo_vaga (nome, descricao) VALUES
('Iniciação Científica', 'Vaga para projetos de pesquisa acadêmica.'),
('Monitoria', 'Vaga para auxiliar professores em disciplinas.'),
('Estágio', 'Vaga de estágio em empresas ou laboratórios.'),
('Extensão', 'Vaga para projetos de extensão universitária.'),
('TCC', 'Vaga para orientação de Trabalho de Conclusão de Curso.');

SELECT * FROM tipo_vaga;
SELECT * FROM tipo_vaga 
	WHERE idTipoVaga = 1;

UPDATE tipo_vaga
SET descricao = 'Vaga para projetos de pesquisa acadêmica e desenvolvimento.'
	WHERE idTipoVaga = 1;

DELETE FROM tipo_vaga 
	WHERE idTipoVaga = 1;

-- CRUD: usuario
INSERT INTO usuario (matricula, nome, email, data_nasc, perfil, senha) VALUES
('20200001', 'Alice Silva', 'alice.silva@aluno.unb.br', '2002-03-10', 'aluno', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('20200002', 'Bruno Costa', 'bruno.costa@aluno.unb.br', '2001-07-25', 'aluno', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('20210003', 'Carla Dias', 'carla.dias@aluno.unb.br', '2003-01-15', 'aluno', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('20210004', 'Daniela Lima', 'daniela.lima@aluno.unb.br', '2002-11-05', 'aluno', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('20220005', 'Eduardo Rocha', 'eduardo.rocha@aluno.unb.br', '2004-06-20', 'aluno', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('19950001', 'Prof. Fernando Gomes', 'fernando.gomes@unb.br', '1970-04-12', 'professor', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('19980002', 'Prof. Gabriela Neves', 'gabriela.neves@unb.br', '1975-09-01', 'professor', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('20000003', 'Prof. Henrique Pires', 'henrique.pires@unb.br', '1980-02-28', 'professor', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1'),
('20050004', 'Prof. Isabela Quintela', 'isabela.quintela@unb.br', '1985-11-11', 'professor', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1');

SELECT * FROM usuario;
SELECT * FROM usuario 
	WHERE idUsuario = 1;

UPDATE usuario
SET email = 'alice.silva.nova@aluno.unb.br', perfil = 'aluno_avancado'
	WHERE idUsuario = 1;

DELETE FROM usuario 
	WHERE idUsuario = 1;

-- CRUD: aluno
-- Obs: Os idAluno aqui devem corresponder aos idUsuario da tabela usuario.
INSERT INTO aluno (idAluno, nivel, curriculo, area_interesse) VALUES
(1, 'graduacao', NULL, 'Inteligência Artificial'),
(2, 'graduacao', NULL, 'Desenvolvimento Web'),
(3, 'pos-graduacao', NULL, 'Cibersegurança'),
(4, 'graduacao', NULL, 'Análise de Dados'),
(5, 'pos-graduacao', NULL, 'Engenharia de Software');

SELECT * FROM aluno; 
SELECT * FROM aluno 
	WHERE idAluno = 1;

UPDATE aluno
SET nivel = 'pos-graduacao', area_interesse = 'Machine Learning'
	WHERE idAluno = 1;

DELETE FROM aluno 
	WHERE idAluno = 1;

-- CRUD: professor
-- Obs: Os idProfessor aqui devem corresponder aos idUsuario da tabela usuario.
INSERT INTO professor (idProfessor, area_pesquisa, idDepartamento, idDeptCoordenado) VALUES
(6, 'Redes Neurais', 1, 1),
(7, 'Sistemas de Potência', 2, 2),
(8, 'Álgebra Linear', 3, 3),
(9, 'Linguística Computacional', 4, 4);

SELECT * FROM professor; 
SELECT * FROM professor 
	WHERE idProfessor = 6;

UPDATE professor
SET area_pesquisa = 'Visão Computacional', idDeptCoordenado = NULL
	WHERE idProfessor = 6;

DELETE FROM professor 
	WHERE idProfessor = 6;

-- CRUD: vagas_oportunidades
-- Obs: Os idCampus, idDepartamento, idTipoVaga devem existir.
INSERT INTO vagas_oportunidades (titulo, descricao, requisitos, nivel, modalidade, status, local, carga_horaria, num_max, data_inicio_candidatura, data_fim_candidatura, idTipoVaga, idCampus, idDepartamento) VALUES
('IC em Visão Computacional', 'Projeto de Iniciação Científica em Visão Computacional.', 'Conhecimento em Python, OpenCV.', 'graduacao', 'presencial', 'publicada', 'Laboratório de Visão', 20, 2, '2026-07-01', '2026-07-31', 1, 2, 1),
('Monitoria de Cálculo I', 'Monitoria para a disciplina de Cálculo I.', 'Ter cursado Cálculo I com nota A.', 'graduacao', 'presencial', 'publicada', 'Sala de Aula', 12, 3, '2026-07-05', '2026-08-15', 2, 2, 3),
('Estágio em Desenvolvimento Backend', 'Estágio para desenvolvimento de APIs RESTful.', 'Conhecimento em Python/FastAPI, SQL.', 'graduacao', 'hibrido', 'publicada', 'Empresa X', 30, 1, '2026-07-10', '2026-08-20', 3, 2, 1),
('Projeto de Extensão em Alfabetização', 'Participação em projeto de extensão para alfabetização de adultos.', 'Interesse em educação e trabalho comunitário.', 'graduacao', 'presencial', 'publicada', 'Comunidade Y', 15, 5, '2026-07-15', '2026-08-25', 4, 2, 4),
('Orientação de TCC em Redes', 'Orientação para TCC na área de Redes de Computadores.', 'Proposta de TCC aprovada.', 'pos-graduacao', 'remoto', 'publicada', 'Online', 10, 1, '2026-07-20', '2026-09-01', 5, 2, 1);

SELECT * FROM vagas_oportunidades;
SELECT * FROM vagas_oportunidades 
	WHERE idVagas = 6;

UPDATE vagas_oportunidades
SET status = 'em_analise', num_max = 3
	WHERE idVagas = 6;

DELETE FROM vagas_oportunidades 
	WHERE idVagas = 6;

-- CRUD: responsavel_vaga
-- Obs: idProfessor e idVagas devem existir.
INSERT INTO responsavel_vaga (idProfessor, idVagas) VALUES
(6, 6),
(8, 7),
(6, 8),
(9, 9),
(6, 10);

SELECT * FROM responsavel_vaga;
SELECT * FROM responsavel_vaga 
	WHERE idProfessor = 6 AND idVagas = 6;

-- UPDATE responsavel_vaga SET idProfessor = 7 WHERE idProfessor = 6 AND idVagas = 6;

DELETE FROM responsavel_vaga 
	WHERE idProfessor = 6 AND idVagas = 6;

-- CRUD: candidatura
-- Obs: idAluno e idVagas devem existir.
INSERT INTO candidatura (idAluno, idVagas, data_candidatura, mensagem_apresentacao, status) VALUES
(12, 6, '2026-07-02 10:00:00', 'Tenho grande interesse em visão computacional.', 'enviado'),
(13, 7, '2026-07-12 14:30:00', 'Experiência com Python e FastAPI.', 'em_analise'),
(14, 8, '2026-07-25 09:00:00', 'Minha pesquisa de pós-graduação é em redes.', 'enviado'),
(15, 9, '2026-07-06 11:00:00', 'Obtive nota A em Cálculo I.', 'aprovado'),
(16, 10, '2026-07-18 16:00:00', 'Desejo contribuir com projetos sociais.', 'recusado');

SELECT * FROM candidatura;
SELECT * FROM candidatura 
	WHERE idAluno = 12 AND idVagas = 6;

UPDATE candidatura
SET status = 'aprovado', mensagem_apresentacao = 'Candidatura aprovada para IC.'
	WHERE idAluno = 12 AND idVagas = 6;

DELETE FROM candidatura WHERE idAluno = 12 AND idVagas = 6;

-- CRUD: inscricao
-- Obs: idAluno e idCurso devem existir.
INSERT INTO inscricao (idAluno, idCurso) VALUES
(12, 1),
(13, 1),
(14, 5),
(15, 3),
(16, 2);

SELECT * FROM inscricao;
SELECT * FROM inscricao 
	WHERE idAluno = 12 AND idCurso = 1;

-- UPDATE inscricao SET idCurso = 2 WHERE idAluno = 12 AND idCurso = 1;

DELETE FROM inscricao 
	WHERE idAluno = 12 AND idCurso = 1;

-- CRUD: faz
-- Obs: idAluno e idDisciplina devem existir.
INSERT INTO faz (idAluno, idDisciplina, semestre) VALUES
(12, 1, '2026/1'), 
(13, 3, '2026/1'), 
(14, 5, '2026/1'), '2026/1'), 
(15, 3, '2026/1'), 
(16, 2, '2026/1');

SELECT * FROM faz;
SELECT * FROM faz 
	WHERE idAluno = 12 AND idDisciplina = 1;

UPDATE faz
SET semestre = '2026/2'
	WHERE idAluno = 12 AND idDisciplina = 1;

DELETE FROM faz 
	WHERE idAluno = 12 AND idDisciplina = 1;

-- CRUD: conversa
-- Obs: idVagas deve existir.
INSERT INTO conversa (dataCriacao, status, idVagas) VALUES
('2026-07-03 10:00:00', 'ativa', 6), 
('2026-07-13 15:00:00', 'ativa', 8), 
('2026-07-26 11:00:00', 'ativa', 10);

SELECT * FROM conversa;
SELECT * FROM conversa 
	WHERE idConversa = 4;

UPDATE conversa
SET status = 'arquivada'
	WHERE idConversa = 4;

DELETE FROM conversa 
	WHERE idConversa = 4;

-- CRUD: conversa_usuario
-- Obs: idConversa e idUsuario devem existir.
INSERT INTO conversa_usuario (idConversa, idUsuario) VALUES
(4, 12), 
(4, 6), 
(5, 13), 
(5, 6), 
(6, 14), 
(6, 6); 

SELECT * FROM conversa_usuario; 
SELECT * FROM conversa_usuario 
	WHERE idConversa = 4 AND idUsuario = 12; 

-- UPDATE conversa_usuario SET idUsuario = 13 WHERE idConversa = 4 AND idUsuario = 12;

DELETE FROM conversa_usuario 
	WHERE idConversa = 4 AND idUsuario = 12;

-- CRUD: mensagem
-- Obs: idConversa e idUsuario devem existir.
INSERT INTO mensagem (texto, dataHora, lida, idConversa, idUsuario) VALUES
('Olá, professor! Tenho interesse na IC.', '2026-07-03 10:05:00', FALSE, 4, 12),
('Ok, Alice. Podemos agendar uma reunião?', '2026-07-03 10:10:00', FALSE, 4, 6),
('Gostaria de saber mais sobre o estágio.', '2026-07-13 15:05:00', FALSE, 5, 13),
('Bruno, por favor, envie seu currículo.', '2026-07-13 15:10:00', FALSE, 5, 6),
('Professor, tenho uma proposta para o TCC.', '2026-07-26 11:05:00', FALSE, 6, 14);

SELECT * FROM mensagem; 
SELECT * FROM mensagem 
	WHERE idConversa = 4 AND idUsuario = 12;

UPDATE mensagem
SET lida = TRUE, texto = 'Olá, professor! Tenho muito interesse na IC.'
	WHERE idConversa = 4 AND idUsuario = 12 
		AND texto = 'Olá, professor! Tenho interesse na IC.';

DELETE FROM mensagem 
	WHERE idConversa = 4 AND idUsuario = 12 
		AND texto = 'Olá, professor! Tenho interesse na IC.';

-- CRUD: comentario_vaga
-- Obs: idVagas e idUsuario devem existir.
INSERT INTO comentario_vaga (idVagas, idUsuario, texto, dataHora) VALUES
(6, 12, 'Excelente oportunidade para aprender!', '2026-07-04 09:00:00'),
(6, 6, 'Aguardamos sua candidatura, Alice.', '2026-07-04 09:15:00'),
(8, 13, 'Quais tecnologias são usadas no estágio?', '2026-07-14 13:00:00'),
(8, 6, 'Principalmente Python e FastAPI.', '2026-07-14 13:10:00'),
(7, 15, 'A monitoria de Cálculo I é muito boa!', '2026-07-07 10:00:00');

SELECT * FROM comentario_vaga;
SELECT * FROM comentario_vaga 
	WHERE idVagas = 6 AND idUsuario = 12;

UPDATE comentario_vaga
SET texto = 'Ótima oportunidade para aprender e crescer!'
	WHERE idVagas = 6 AND idUsuario = 12 
		AND texto = 'Excelente oportunidade para aprender!';

DELETE FROM comentario_vaga 
	WHERE idVagas = 6 AND idUsuario = 12 
		AND texto = 'Excelente oportunidade para aprender!';
