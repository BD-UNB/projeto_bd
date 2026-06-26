import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./style.module.css";

function Home_aluno() {
  const [mostraMensagem, setMostraMensagem] = useState(false);

  const vagas = [
    {
      idVagas: 1,
      titulo: "Título 1",
      descricao: "Descrição 1",
      reponsavel: "Professor 1",
      nível: "graduação 1",
      modalidade: "presencial 1",
      status: "status",
      local: "local 1",
      carga_hor: 100,
      num_max: 60,
      data_inicio: "01/01/2026",
      data_final: "01/05/2026",
      tipo: "tipo 1",
      campus: "campus 1",
      departamento: "departamento 1",
      comentarios: (
        <button type="button" className={styles.bu}>
          comentários
        </button>
      ),
    },
    {
      idVagas: 2,
      titulo: "Título 1",
      descricao: "Descrição 1",
      reponsavel: "Professor 1",
      nível: "graduação 1",
      modalidade: "presencial 1",
      status: "status",
      local: "local 1",
      carga_hor: 100,
      num_max: 60,
      data_inicio: "01/01/2026",
      data_final: "01/05/2026",
      tipo: "tipo 1",
      campus: "campus 1",
      departamento: "departamento 1",
      comentarios: (
        <button type="button" className={styles.bu}>
          comentários
        </button>
      ),
    },
  ];

  return (
    <>
      <div className={styles.h}>
        <header className={styles.header}>
          <h2>COLOCAR NOME DO ALUNO</h2>
          <h2>COLOCAR NOME DA UNIVERSIDADE</h2>
          <h2>COLOCAR NOME DO DEPARTAMENTO</h2>
        </header>
      </div>
      <nav className={styles.nav}>
        <input placeholder="pesquise por vagas"></input>
        <button>
          <Link to="/perfil_aluno">Perfil</Link>
        </button>
        <div>
          <button
            className={styles.botaoMensagem}
            onClick={() => setMostraMensagem(true)}
          >
            Mensagens
          </button>
          {mostraMensagem && (
            <div className={styles.mensagem}>
              <button
                className={styles.fechar}
                onClick={() => setMostraMensagem(false)}
              >
                ✕ Fechar
              </button>
              <h2
                style={{
                  fontSize: "30px",
                }}
              >
                Mensagens
              </h2>
              <div className={styles.conteudoMensagem}>
                <p>Conteúdo das mensagens aqui...</p>
              </div>
            </div>
          )}
        </div>
      </nav>
      <h1 className={styles.subtitulo}>vagas publicadas</h1>
      <div className={styles.container}>
        <section className={styles.listaVagas}>
          {vagas.map((vaga) => (
            <article key={vaga.idVagas} className={styles.card}>
              <h2 className={styles.card_titulo}>{vaga.titulo}</h2>
              <div className={styles.card_info}>
                <p>
                  <label>descrição: </label>
                  {vaga.descricao}
                </p>
                <p>
                  <label>reponsavel: </label>
                  {vaga.reponsavel}
                </p>
                <p>
                  <label>nível: </label>
                  {vaga.nível}
                </p>
                <p>
                  <label>modalidade: </label>
                  {vaga.modalidade}
                </p>
                <p>
                  <label>status: </label>
                  {vaga.status}
                </p>
                <p>
                  <label>local: </label>
                  {vaga.local}
                </p>
                <p>
                  <label>carga horária: </label>
                  {vaga.carga_hor}
                </p>
                <p>
                  <label>máximo de pessoas: </label>
                  {vaga.num_max}
                </p>
                <p>
                  <label>data início: </label>
                  {vaga.data_inicio}
                </p>
                <p>
                  <label>data final: </label>
                  {vaga.data_final}
                </p>
                <p>
                  <label>tipo: </label>
                  {vaga.tipo}
                </p>
                <p>
                  <label>campus: </label>
                  {vaga.campus}
                </p>
                <p>
                  <label>departamento: </label>
                  {vaga.departamento}
                </p>
                <p>{vaga.comentarios}</p>
              </div>
              <button className={styles.bu}>Inscrever-se</button>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
export default Home_aluno;
