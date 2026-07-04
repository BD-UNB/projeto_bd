CREATE TRIGGER trg_atualiza_status_vaga_apos_candidatura
AFTER INSERT ON candidatura
FOR EACH ROW
BEGIN
    IF (SELECT status FROM vagas_oportunidades WHERE idVagas = NEW.idVagas) = 'publicada' THEN
        UPDATE vagas_oportunidades
        SET status = 'em_analise'
        WHERE idVagas = NEW.idVagas;
    END IF;
END;
