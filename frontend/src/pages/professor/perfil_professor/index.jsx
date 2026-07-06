import { useState } from "react";
import styles from "./style.module.css";

function Perfil_professor() {
  return (
    <>
      <div className={styles.nav}>
        <nav>
          <h1>Universidade tal</h1>
          <h1>Departamento tal</h1>
        </nav>
      </div>
      <div className={styles.container}>
        <div className={styles.dados}>
          <label>Matrícula</label>
          <input type="number"></input>
          <label>Nome</label>
          <input type="text"></input>
          <label>Email</label>
          <input type="email"></input>
          <label>Dada de nascimento</label>
          <input type="date"></input>
          <label>Área de Pesquisa</label>
          <input type="text"></input>
          <label>Coordena departamento</label>
          <input type="text"></input>
          <div className={styles.botao}>
            <button>editar email</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil_professor;
