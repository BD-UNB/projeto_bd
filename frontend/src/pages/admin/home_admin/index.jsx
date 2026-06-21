import "../../../index.css";
import styles from "./style.module.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Home_admin() {
  return (
    <>
      <div className={styles.topo}>
        <nav className={styles.menu}>
          <h1>O QUE DESEJA ACESSAR?</h1>
          <div className={styles.usuario}>
            <p>matricula admin: aaaaaaaaaa</p>
            <p>nome admin: </p>
          </div>
        </nav>
      </div>
      <div className={styles.container}>
        <div className={styles.acesso}>
          <button type="button">
            <Link to="/vagas_oportunidades">vagas/oportunidades</Link>
          </button>
          <button type="button">
            <Link to="/cursos">cursos e disciplinas</Link>
          </button>
          <button type="button">
            <Link to="/cadastro_aluno">cadastrar aluno</Link>
          </button>
          <button type="button">
            <Link to="/cadastro_professor">cadastrar professor</Link>
          </button>
          <button className={styles.vagas} type="button">
            <Link to="/vagas_criadas">verificar vagas criadas</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home_admin;
