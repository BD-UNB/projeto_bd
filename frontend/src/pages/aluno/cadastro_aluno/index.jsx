import styles from "./style.module.css";
import { useState } from "react";

function Cadastro_aluno() {
  const [nivel, setNivel] = useState("");

  const seleciona_nivel = (evento) => {
    setNivel(evento.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <p>Siga as informações abaixo</p>
        <form className={styles.formulario}>
          <label>nome completo*</label>
          <input></input>
          <label>digite seu email*</label>
          <input type="email"></input>
          <label>data de nascimento*</label>
          <input
            type="date"
            min="1926-01-01"
            max={"2016-01-01"}
            value={"2000-01-01"}
          ></input>
          <label>nível</label>
          <select
            value={nivel}
            onChange={seleciona_nivel}
            className={styles.select}
          >
            <option className={styles.option}></option>
            <option value={"Graduação"} className={styles.option}>
              Graduação
            </option>
            <option value={"Pós-graduação"} className={styles.option}>
              Pós-graduação
            </option>
            <option value={"Mestrado"} className={styles.option}>
              Mestrado
            </option>
            <option value={"Doutorado"} className={styles.option}>
              Doutorado
            </option>
            <option value={"Pós-doutorado"} className={styles.option}>
              Pós-doutorado
            </option>
          </select>
          <label>adicione seu curriculo</label>
          <input></input>
          <label>área de interesse</label>
          <input></input>
          <label>crie uma senha*</label>
          <input></input>
          <label>digite novamente*</label>
          <input></input>
          <h6>*respostas obrigatórias</h6>
        </form>
        <button type="button" className={styles.button}>
          salvar informações
        </button>
      </div>
      <footer className={styles.footer}>Projeto Banco de Dados</footer>
    </>
  );
}

export default Cadastro_aluno;
