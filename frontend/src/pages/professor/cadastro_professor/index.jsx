import { useState } from "react";
import styles from "./style.module.css";

function Cadastro_professor() {
  const [departamento, setDepartamente] = useState("");
  const [dep_coordenado, setDep_coordenado] = useState("");

  const seleciona_dep = (evento) => {
    setDepartamente(evento.target.value);
  };
  const seleciona_depCoordenado = (evento) => {
    setDep_coordenado(evento.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <p>Siga as informações abaixo</p>
        <form className={styles.formulario}>
          <label>nome completo</label>
          <input></input>
          <label>digite seu email</label>
          <input type="email"></input>
          <label>data de nascimento</label>
          <input
            type="date"
            min="1926-01-01"
            max={"2016-01-01"}
            value={"2000-01-01"}
          ></input>
          <label>área de pesquisa</label>
          <input type="text"></input>
          <label>Selecione seu departamento</label>
          <select
            value={departamento}
            onChange={seleciona_dep}
            className={styles.select}
          >
            <option value=""></option>
            <option value="matemática">Matemática</option>
            <option value="português">Português</option>
          </select>
          <label>Departamento que te coordena</label>
          <select
            value={dep_coordenado}
            onChange={seleciona_depCoordenado}
            className={styles.select}
          >
            <option value=""></option>
            <option value="matemática">Matemática</option>
            <option value="português">Português</option>
          </select>
        </form>
      </div>
      <button type="button" className={styles.button}>
        salvar informações
      </button>
    </>
  );
}

export default Cadastro_professor;
