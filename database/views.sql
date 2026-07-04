CREATE VIEW vw_vagas_com_contagem_candidatos AS
SELECT
    vo.idVagas,
    vo.titulo,
    vo.descricao,
    vo.nivel AS nivel_vaga,
    vo.modalidade,
    vo.status AS status_vaga,
    vo.data_inicio_candidatura,
    vo.data_fim_candidatura,
    tv.nome AS tipo_vaga,
    d.nome AS nome_departamento,
    COUNT(c.idAluno) AS total_candidatos
FROM
    vagas_oportunidades vo
JOIN
    tipo_vaga tv ON vo.idTipoVaga = tv.idTipoVaga
JOIN
    departamento d ON vo.idDepartamento = d.idDepartamento
LEFT JOIN
    candidatura c ON vo.idVagas = c.idVagas
GROUP BY
    vo.idVagas, vo.titulo, vo.descricao, vo.nivel, vo.modalidade, vo.status,
    vo.data_inicio_candidatura, vo.data_fim_candidatura, tv.nome, d.nome;
