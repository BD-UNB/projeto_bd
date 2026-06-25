import { Link } from "react-router-dom";
import styles from "./style.module.css";

function Home_aluno() {
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
      <header className={styles.header}>
        <h2>COLOCAR NOME DO ALUNO</h2>
        <h2>COLOCAR NOME DA UNIVERSIDADE</h2>
        <h2>COLOCAR NOME DO DEPARTAMENTO</h2>
      </header>
      <nav className={styles.nav}>
        <input placeholder="pesquise por vagas"></input>
        <button>
          <Link to="/perfil_aluno">Perfil</Link>
        </button>
        <button>Mensagens</button>
      </nav>
      <h1 className={styles.subtitulo}>Vagas publicadas</h1>
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
                  <label>reponsavel:</label> {vaga.reponsavel}
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
                  <label>carga_hor: </label>
                  {vaga.carga_hor}
                </p>
                <p>
                  <label>num_max: </label>
                  {vaga.num_max}
                </p>
                <p>
                  <label>data_inicio: </label>
                  {vaga.data_inicio}
                </p>
                <p>
                  <label>data_final: </label>
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
