import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useState } from "react";

function Cadastro_aluno() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data_nasc, setData_nasc] = useState("");
  const [nivel, setNivel] = useState("");
  const [senha, setSenha] = useState("");
  const [conf_senha, setConf_senha] = useState("");

  const seleciona_nivel = (evento) => {
    setNivel(evento.target.value);
  };

  function verifica_cadastro() {
    if (
      nome.trim() === "" ||
      email.trim() === "" ||
      data_nasc.trim() === "" ||
      nivel.trim() === "" ||
      senha.trim() === "" ||
      conf_senha.trim() === ""
    ) {
      alert("Campos com * são obrigatórios");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <p>Siga as informações abaixo</p>
        <form className={styles.formulario}>
          <label>nome completo*</label>
          <input type="text" onChange={(e) => setNome(e.target.value)}></input>
          <label>digite seu email*</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>data de nascimento*</label>
          <input
            type="date"
            min="1926-01-01"
            max={"2016-01-01"}
            onChange={(e) => setData_nasc(e.target.value)}
          ></input>
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
          <input onChange={(e) => setSenha(e.target.value)}></input>
          <label>digite novamente*</label>
          <input onChange={(e) => setConf_senha(e.target.value)}></input>
          <h6>*respostas obrigatórias</h6>
        </form>
        <button
          type="button"
          className={styles.button}
          onClick={verifica_cadastro}
        >
          salvar informações
        </button>
      </div>
    </>
  );
}

export default Cadastro_aluno;
