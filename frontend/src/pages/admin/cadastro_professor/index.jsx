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

  async function post_cadastro_professor(matricula, nome, email, data_de_nasci, area_de_pesquisa, departamento, departamento_coordenado, senha) {
    const response = await fetch("http://127.0.0.1:8000/cadastro_professor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricula,
        nome,
        email,
        data_de_nasci,
        area_de_pesquisa,
        departamento,
        departamento_coordenado,
        senha
      }),
    });

    if (response.ok) {
      console.log("Professor criado com sucesso");
    } else {
      console.log("Erro ao criar professor", response);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <p>Siga as informações abaixo</p>
        <form className={styles.formulario}>
          <label>matricula</label>
          <input type="text"></input>
          <label>nome completo</label>
          <input type="text"></input>
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
          <label>senha</label>
          <input type="password"></input>
        </form>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          const matricula = document.querySelector("input[type='text']").value;
          const nome = document.querySelector("input[type='text']").value;
          const email = document.querySelector("input[type='email']").value;
          const data_de_nasci = document.querySelector("input[type='date']").value;
          const area_de_pesquisa = document.querySelector("input[type='text']").value;
          const departamento = document.querySelector("select").value;
          const departamento_coordenado = document.querySelector("select").value;
          const senha = document.querySelector("input[type='password']").value;
          post_cadastro_professor(matricula, nome, email, data_de_nasci, area_de_pesquisa, departamento, departamento_coordenado, senha);
        }}
      >
        salvar informações
      </button>
    </>
  );
}

export default Cadastro_professor;
