import "../../../index.css";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

function Home_admin() {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.adminInfoBox}>
          <p>
            <strong>matricula:</strong> <label>0000000</label>
          </p>
          <p>
            <strong>nome:</strong> <label>nome nome</label>
          </p>
        </div>
      </nav>
      <h1 className={styles.titulo}>
        <strong>O QUE DESEJA ACESSAR?</strong>
      </h1>

      <div className={styles.container}>
        <div className={styles.acesso}>
          <button type="button">
            <Link to="/gerenciar_vagas">gerenciar vagas</Link>
          </button>
          <button type="button">
            <Link to="/cursos">gerenciar cursos e disciplinas</Link>
          </button>
          <button type="button">
            <Link to="/cadastro_aluno">gerenciar aluno</Link>
          </button>
          <button type="button">
            <Link to="/cadastro_professor">gerenciar professor</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home_admin;
