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
    area_interesse
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
      area_interesse
    );
  }

  return (
    <>
      <div className={styles.container}>
        <p>Siga as informações abaixo</p>
        <form className={styles.formulario}>
          <label>matrícula*</label>
          <input
            type="text"
            onChange={(e) => setMatricula(e.target.value)}
          />

          <label>nome completo*</label>
          <input type="text" onChange={(e) => setNome(e.target.value)}></input>
          <label>digite seu email*</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>data de nascimento*</label>
          <input
            type="date"
            min="1926-01-01"
            max={"2016-01-01"}
            onChange={(e) => setData_nasc(e.target.value)}
          />

          <label>telefone</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label>cpf</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <label>nível*</label>
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
          <input type="text"></input>
          <label>área de interesse</label>
          <input></input>
          <label>crie uma senha*</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <label>digite novamente*</label>
          <input
            type="password"
            value={conf_senha}
            onChange={(e) => setConf_senha(e.target.value)}
          />

          <h6>*respostas obrigatórias</h6>
        </form>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={verifica_cadastro}
      >
        salvar informações
      </button>
    </>
  );
}

export default Cadastro_aluno;
