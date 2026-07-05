CREATE PROCEDURE ListarVagasPublicadas(IN p_idTipoVaga INT, IN p_idDepartamento INT)

BEGIN
    SELECT
        vo.idVagas,
        vo.titulo,
        vo.descricao,
        vo.requisitos,
        vo.nivel,
        vo.modalidade,
        vo.status,
        vo.local,
        vo.carga_horaria,
        vo.num_max,
        vo.data_inicio_candidatura,
        vo.data_fim_candidatura,
        tv.nome AS tipo_vaga_nome,
        d.nome AS departamento_nome
    FROM
        vagas_oportunidades vo
    JOIN
        tipo_vaga tv ON vo.idTipoVaga = tv.idTipoVaga
    JOIN
        departamento d ON vo.idDepartamento = d.idDepartamento
    WHERE
        vo.status = 'publicada'
        AND (p_idTipoVaga IS NULL OR vo.idTipoVaga = p_idTipoVaga)
        AND (p_idDepartamento IS NULL OR vo.idDepartamento = p_idDepartamento);
END
