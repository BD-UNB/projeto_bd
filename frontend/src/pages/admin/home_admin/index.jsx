import "../../../index.css";
import styles from "./style.module.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Home_admin() {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.admin}>
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
            <Link to="/vagas_oportunidades">gerenciar vagas</Link>
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
          <button className={styles.vagas} type="button">
            <Link to="/vagas_criadas">verificar vagas criadas</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home_admin;
