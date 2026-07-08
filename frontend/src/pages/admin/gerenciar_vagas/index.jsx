import { useState } from "react";
import "../../../index.css";
import styles from "./style.module.css";

function VagasOportunidades() {
  const vagasCriadas = [
    {
      titulo: "Monitoria em Banco de Dados",
      departamento: "Departamento de Ciência da Computação",
      curso: "Engenharia de Software",
      responsavel: "Professor Exemplo",
      modalidade: "Presenciaaaaaaaaaaaaaal",
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
      responsavel: "Professor Exemplo",

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
    {
      titulo: "Projeto de Extensão em Desenvolvimento Web",
      departamento: "Faculdade do Gama",
      curso: "engenharia de software",
      responsavel: "Professor Exemplo",

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
    {
      titulo: "Projeto de Extensão em Desenvolvimento Web",
      departamento: "Faculdade do Gama",
      curso: "engenharia de software",
      responsavel: "Professor Exemplo",

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

  const [univer, setUniver] = useState("");

  const seleciona_uni = (evento) => {
    setUniver(evento.target.value);
  };
  return (
    <>
      <div className={styles.separa}>
        <div className={styles.container}>
          <h1>Criação de vagas e oportunidades</h1>
          <h2>Preencha os campos abaixo</h2>
          <div>
            <form className={styles.formulario}>
              <label>
                <strong>universidade</strong>
              </label>
              <select id="uni" value={univer} onChange={seleciona_uni} required>
                <option value="unb">Universidade de Brasília</option>
              </select>

              <label>
                <strong>departamento</strong>
              </label>
              <input></input>

              <label>
                <strong>cursos</strong>
              </label>
              <input></input>

              <label>
                <strong>título da vaga</strong>
              </label>
              <input type="text"></input>

              <label>
                <strong>Responsável pela vaga</strong>
              </label>
              <input type="text"></input>

              <label>
                <strong>requisitos</strong>
              </label>
              <input type="text"></input>

              <label>
                <strong>nível</strong>
              </label>
              <input type="text"></input>

              <label>
                <strong>modalidade</strong>
              </label>
              <input type="text"></input>

              <label>
                <strong>status</strong>
              </label>
              <input type="text"></input>

              <label>
                <strong>local</strong>
              </label>
              <input type="text"></input>

              <label>
                <strong>carga horária</strong>
              </label>
              <input type="number"></input>

              <label>
                <strong>número máximo de inscrições</strong>
              </label>
              <input type="number"></input>

              <label>
                <strong>data de início de candidatura</strong>
              </label>
              <input type="date"></input>

              <label>
                <strong>data de fim de candidatura</strong>
              </label>
              <input type="date"></input>

              <label>
                <strong>descrição</strong>
              </label>
              <textarea className={styles.descricao}></textarea>
            </form>
            <button type="button">criar</button>
          </div>
        </div>{" "}
        <div className={styles.containerVagas}>
          <div className={styles.cabecalhoLista}>
            <h1>Vagas criadas</h1>
            <h2>Lista de vagas cadastradas</h2>
          </div>
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
                    <strong>Responsável:</strong> {vaga.responsavel}
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
                    <strong>data início:</strong> {vaga.data_inicio}
                  </p>
                  <p>
                    <strong>nivel:</strong> {vaga.nivel}
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
      </div>
    </>
  );
}

export default VagasOportunidades;
