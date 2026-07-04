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

  const usuario = [
    {
      matricula: "123",
      nome: " Carlos",
      email: "prof1@gmail.com",
      data_nasc: "01/01/2001",
      perfil: "professor 1",
      universidade: "Universidade de Brasília",
      area_pesquisa: "Computação",
      dep: "Computação",
      dep_coordenado: "Ciência da Computação",
    },
    {
      matricula: "321",
      nome: "Ana",
      email: "prof2@gmail.com",
      data_nasc: "01/01/2001",
      perfil: "professora 1",
      universidade: "Universidade de São Paulo",
      area_pesquisa: "Computação",
      dep: "Computação",
      dep_coordenado: "Ciência da Computação",
    },
  ];

  async function post_cadastro_professor(
    matricula,
    nome,
    email,
    data_de_nasci,
    area_de_pesquisa,
    departamento,
    departamento_coordenado,
    senha,
  ) {
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
        senha,
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
        <h1>
          <strong>cadastro de professor</strong>
        </h1>
        <p>Siga as informações abaixo</p>
        <form className={styles.formulario}>
          <label>
            <strong>matricula</strong>
          </label>
          <input type="text"></input>
          <label>
            <strong>nome completo</strong>
          </label>
          <input type="text"></input>
          <label>
            <strong>digite seu email</strong>
          </label>
          <input type="email"></input>
          <label>
            <strong>data de nascimento</strong>
          </label>
          <input
            type="date"
            min="1926-01-01"
            max={"2016-01-01"}
            value={"2000-01-01"}
          ></input>
          <label>
            <strong>área de pesquisa</strong>
          </label>
          <input type="text"></input>
          <label>
            <strong>Selecione seu departamento</strong>
          </label>
          <select
            value={departamento}
            onChange={seleciona_dep}
            className={styles.select}
          >
            <option value=""></option>
            <option value="matemática">Matemática</option>
            <option value="português">Português</option>
          </select>
          <label>
            <strong>Departamento que te coordena</strong>
          </label>
          <select
            value={dep_coordenado}
            onChange={seleciona_depCoordenado}
            className={styles.select}
          >
            <option value=""></option>
            <option value="matemática">Matemática</option>
            <option value="português">Português</option>
          </select>
          <label>
            <strong>senha</strong>
          </label>
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
          const data_de_nasci =
            document.querySelector("input[type='date']").value;
          const area_de_pesquisa =
            document.querySelector("input[type='text']").value;
          const departamento = document.querySelector("select").value;
          const departamento_coordenado =
            document.querySelector("select").value;
          const senha = document.querySelector("input[type='password']").value;
          post_cadastro_professor(
            matricula,
            nome,
            email,
            data_de_nasci,
            area_de_pesquisa,
            departamento,
            departamento_coordenado,
            senha,
          );
        }}
      >
        salvar informações
      </button>
      <div className={styles.containerCadastro}>
        <div className={styles.cabecalhoLista}>
          <h2>
            <strong>Lista de alunos cadastrados</strong>
          </h2>
        </div>
        <div className={styles.containerLista}>
          {usuario.map((item) => (
            <article className={styles.usuario} key={item.matricula}>
              <div className={styles.informacaoAluno}>
                <p>
                  <strong>matrícula: </strong>
                  {item.matricula}
                </p>
                <p>
                  <strong>nome: </strong>
                  {item.nome}
                </p>
                <p>
                  <strong>email: </strong>
                  {item.email}
                </p>
                <p>
                  <strong>data de nascimento: </strong>
                  {item.data_nasc}
                </p>
                <p>
                  <strong>perfil: </strong>
                  {item.perfil}
                </p>
                <p>
                  <strong>Universidade: </strong>
                  {item.universidade}
                </p>
                <p>
                  <strong>área de pesquisa: </strong>
                  {item.area_pesquisa}
                </p>
                <p>
                  <strong>departamento: </strong>
                  {item.dep}
                </p>
                <p>
                  <strong>departamento coordenado: </strong>
                  {item.dep_coordenado}
                </p>

                <div className={styles.botao}>
                  <button
                    type="button"
                    onClick={() => editarProf(item)}
                    className={styles.editar}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    onClick={() => excluirProf(item.matricula)}
                    className={styles.excluir}
                  >
                    excluir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cadastro_professor;
