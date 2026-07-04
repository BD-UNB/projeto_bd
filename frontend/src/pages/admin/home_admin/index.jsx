import "../../../index.css";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

function Home_admin() {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.adminInfoBox}>
          <p>
            <span className={styles.labelBold}>Matricula:</span> <label className={styles.valueBold}>ADM00001</label>
          </p>
          <p>
            <span className={styles.labelBold}>Nome:</span> <label className={styles.valueBold}>Carlo Anchelotti</label>
          </p>
        </div>
      </nav>
      <h1 className={styles.titulo}>O Deseja Acessar ?</h1>

      <div className={styles.container}>
        <div className={styles.acesso}>
          <Link to="/vagas_oportunidades" className={styles.acessoButton}>Vagas e Oportunidades</Link>
          <Link to="/cursos" className={styles.acessoButton}>Cursos e Disciplinas</Link>
          <Link to="/cadastro_aluno" className={styles.acessoButton}>Cadastro de Alunos</Link>
          <Link to="/cadastro_professor" className={styles.acessoButton}>Cadastro de Professores</Link>
          <Link to="/vagas_criadas" className={styles.acessoButton}>Verificar Vagas Criadas</Link>
        </div>
      </div>
    </>
  );
}

export default Home_admin;
