import "../../../index.css";
import styles from "./style.module.css";

function Vagas_criadas() {
  const vagasCriadas = [
    {
      titulo: "Monitoria em Banco de Dados",
      departamento: "Departamento de Ciência da Computação",
      curso: "Engenharia de Software",
      modalidade: "Presencial",
      status: "publicada",
      cargaHoraria: "12h semanais",
      max_inscricoes: "30 inscrições",
      descricao: "blá blá blá",
      requisitos: "não ter preguiça",
      nivel: "graduação",
      local: "não sei onde",
      data_inicio: "01/01/2001",
      data_fim: "02/02/2002",
    },
    {
      titulo: "Projeto de Extensão em Desenvolvimento Web",
      departamento: "Faculdade do Gama",
      curso: "engenharia de software",
      modalidade: "Híbrida",
      status: "Em análise",
      cargaHoraria: "20",
      max_inscricoes: "30 inscrições",
      descricao: "blá blá blá",
      requisitos: "não ter preguiça",
      nivel: "graduação",
      local: "não sei onde",
      data_inicio: "01/01/2001",
      data_fim: "02/02/2002",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <h1>Vagas criadas</h1>
        <h2>Lista de vagas cadastradas</h2>

        <div className={styles.lista_vagas}>
          {vagasCriadas.map((vaga) => (
            <article className={styles.vaga} key={vaga.titulo}>
              <div className={styles.cabecalho_vaga}>
                <h3>{vaga.titulo}</h3>
                <span>{vaga.status}</span>
              </div>

              <div className={styles.informacoes_vaga}>
                <p>
                  <strong>departamento:</strong> {vaga.departamento}
                </p>
                <p>
                  <strong>curso:</strong> {vaga.curso}
                </p>
                <p>
                  <strong>modalidade:</strong> {vaga.modalidade}
                </p>
                <p>
                  <strong>carga horária:</strong> {vaga.cargaHoraria}
                </p>
                <p>
                  <strong>inscrições:</strong> {vaga.max_inscricoes}
                </p>
                <p>
                  <strong>descrição:</strong> {vaga.descricao}
                </p>
                <p>
                  <strong>requisitos:</strong> {vaga.requisitos}
                </p>
                <p>
                  <strong>nivel:</strong> {vaga.nivel}
                </p>
                <p>
                  <strong>data início:</strong> {vaga.data_inicio}
                </p>
                <p>
                  <strong>data fim:</strong> {vaga.data_fim}
                </p>
                <p>
                  <strong>local:</strong> {vaga.local}
                </p>
                <div className={styles.botao}>
                  <button className={styles.editar}>
                    <strong>editar</strong>
                  </button>
                  <button className={styles.excluir}>
                    <strong>excluir</strong>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Vagas_criadas;
