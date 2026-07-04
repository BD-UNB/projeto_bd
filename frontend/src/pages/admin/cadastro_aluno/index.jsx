import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useState } from "react";

function Cadastro_aluno() {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data_nasc, setData_nasc] = useState("");
  const [nivel, setNivel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [curriculo, setCurriculo] = useState("");
  const [area_interesse, setArea_interesse] = useState("");
  const [senha, setSenha] = useState("");
  const [conf_senha, setConf_senha] = useState("");

  const seleciona_nivel = (evento) => {
    setNivel(evento.target.value);
  };

  async function post_cadastro_aluno(
    matricula,
    nome,
    email,
    data_nasc,
    senha,
    telefone,
    cpf,
    nivel,
    curriculo,
    area_interesse,
  ) {
    const response = await fetch("http://127.0.0.1:8000/cadastro_aluno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricula,
        nome,
        email,
        data_nasc,
        senha,
        telefone,
        cpf,
        nivel,
        curriculo,
        area_interesse,
      }),
    });

    if (response.ok) {
      alert("Aluno criado com sucesso!");
      navigate("/");
    } else {
      alert("Erro ao criar aluno.");
      console.log("Erro ao criar aluno", response);
    }
  }

  function verifica_cadastro() {
    if (
      matricula.trim() === "" ||
      nome.trim() === "" ||
      email.trim() === "" ||
      data_nasc.trim() === "" ||
      nivel.trim() === "" ||
      senha.trim() === "" ||
      conf_senha.trim() === ""
    ) {
      alert("Campos com * são obrigatórios");
      return;
    }

    if (senha !== conf_senha) {
      alert("As senhas não coincidem!");
      return;
    }

    post_cadastro_aluno(
      matricula,
      nome,
      email,
      data_nasc,
      senha,
      telefone,
      cpf,
      nivel,
      curriculo,
      area_interesse,
    );
  }

  const usuario = [
    {
      matricula: "123",
      nome: " Carlos",
      email: "aluno1@gmail.com",
      data_nasc: "01/01/2001",
      perfil: "aluno",
      universidade: "Universidade de Brasília",
      curso: "Ciência da Computação",
      nivel: "graduacao",
      curriculo: "curriculo aluno 1",
      area_interesse: "minha área de interesse é...",
    },
    {
      matricula: "321",
      nome: "Ana",
      email: "aluno2@gmail.com",
      data_nasc: "01/01/2001",
      perfil: "aluno",
      universidade: "Universidade de São Paulo",
      curso: "Ciência da Computação",
      nivel: "pós-graduação",
      curriculo: "curriculo aluno 2",
      area_interesse: "minha área de interesse é...",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <h1>cadastro de aluno</h1>
        <p>Siga as informações abaixo</p>
        <form className={styles.formulario}>
          <label>
            <strong>matrícula</strong>
          </label>
          <input type="text" onChange={(e) => setMatricula(e.target.value)} />

          <label>
            <strong>nome completo</strong>
          </label>
          <input type="text" onChange={(e) => setNome(e.target.value)}></input>
          <label>
            <strong>digite seu email</strong>
          </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />

          <label>
            <strong>data de nascimento*</strong>
          </label>
          <input
            type="date"
            min="1926-01-01"
            max={"2016-01-01"}
            onChange={(e) => setData_nasc(e.target.value)}
          />

          <label>
            <strong>telefone</strong>
          </label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label>
            <strong>cpf</strong>
          </label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label>
            <strong>nível</strong>
          </label>
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
          <label>
            <strong>adicione seu curriculo</strong>
          </label>
          <input type="text"></input>
          <label>
            <strong>área de interesse</strong>
          </label>
          <input></input>
          <label>
            <strong>crie uma senha</strong>
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <label>
            <strong>digite novamente</strong>
          </label>
          <input
            type="password"
            value={conf_senha}
            onChange={(e) => setConf_senha(e.target.value)}
          />
        </form>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={verifica_cadastro}
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
                  <strong>nivel: </strong>
                  {item.nivel}
                </p>
                <p>
                  <strong>Universidade: </strong>
                  {item.universidade}
                </p>
                <p>
                  <strong>curso: </strong>
                  {item.curso}
                </p>
                <p>
                  <strong>curriculo: </strong>
                  {item.curriculo}
                </p>
                <p>
                  <strong>area de interesse: </strong>
                  {item.area_interesse}
                </p>

                <div className={styles.botao}>
                  <button
                    type="button"
                    onClick={() => editarAluno(item)}
                    className={styles.editar}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    onClick={() => excluirAluno(item.matricula)}
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

export default Cadastro_aluno;
