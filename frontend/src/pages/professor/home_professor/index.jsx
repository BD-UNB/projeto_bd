import { Link } from "react-router-dom";
import styles from "./style.module.css";

function Home_professor() {
  const vagas = [
    {
      idVagas: 1,
      titulo: "Bolsa de SEILÁ",
      descricao: "Pesquisa em SEI LÁ",
      modalidade: "presencial SEI LÁ",
    },
    {
      idVagas: 2,
      titulo: "AUAUAUAUAUAUAUA",
      descricao: "SXRDCFTVGYBHUNJ",
      modalidade: "6525jan",
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <h2>COLOCAR NOME DO PROFESSOR</h2>
        <h2>COLOCAR NOME DA UNIVERSIDADE</h2>
        <h2>COLOCAR NOME DO DEPARTAMENTO</h2>
      </header>
      <nav className={styles.nav}>
        <input placeholder="pesquise por vagas"></input>
        <button>
          <Link to="/perfil_professor">Perfil</Link>
        </button>
        <button>Mensagens</button>
      </nav>
      <h1 className={styles.resp}>Responsável por</h1>
      <div className={styles.container}>
        <section className={styles.listaVagas}>
          {vagas.map((vaga) => (
            <article key={vaga.idVagas} className={styles.card}>
              <h2>{vaga.titulo}</h2>
              <p>{vaga.descricao}</p>
              <span>{vaga.modalidade}</span>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
export default Home_professor;
