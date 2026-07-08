CREATE PROCEDURE ListarVagasPublicadas(IN p_idTipoVaga INT, IN p_idDepartamento INT)
BEGIN
    SELECT
        v.idVagas,
        v.titulo,
        v.descricao,
        v.requisitos,
        v.nivel,
        v.modalidade,
        v.status,
        v.local,
        v.carga_horaria,
        v.num_max,
        v.data_inicio_candidatura,
        v.data_fim_candidatura,
        v.idTipoVaga,
        v.idCampus,
        v.idDepartamento,
        tv.nome AS tipo,
        c.nome AS campus,
        d.nome AS departamento,
        GROUP_CONCAT(DISTINCT u.nome SEPARATOR ', ') AS responsavel
    FROM
        vagas_oportunidades v
    LEFT JOIN tipo_vaga tv ON v.idTipoVaga = tv.idTipoVaga
    LEFT JOIN campus c ON v.idCampus = c.idCampus
    LEFT JOIN departamento d ON v.idDepartamento = d.idDepartamento
    LEFT JOIN responsavel_vaga rv ON rv.idVagas = v.idVagas
    LEFT JOIN professor p ON p.idProfessor = rv.idProfessor
    LEFT JOIN usuario u ON u.idUsuario = p.idProfessor
    WHERE
        v.status = 'publicada'
        AND (p_idTipoVaga IS NULL OR v.idTipoVaga = p_idTipoVaga)
        AND (p_idDepartamento IS NULL OR v.idDepartamento = p_idDepartamento)
    GROUP BY v.idVagas
    ORDER BY v.data_inicio_candidatura DESC;
END
