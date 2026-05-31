import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import "../../index.css";
import { useState } from "react";

function Login() {
  const navigate = useNavigate("");
  const [numero, setNumero] = useState("");
  const [senha, setSenha] = useState("");

  function verifica_acesso() {
    if (senha.trim() === "" || numero.trim() === "") {
      alert("Número de usuário ou senha inválido(s)");
      return;
    }

    if (numero == 1) {
      navigate("/home_aluno");
    } else {
      navigate("/home_professor");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Acesse sua conta</h1>
        <div className={styles.acesso}>
          <form>
            <p>número de usuario</p>
            <input
              placeholder="numero de usuario"
              type="number"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            ></input>
            <p>senha</p>
            <input
              placeholder="digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            ></input>
            <button type="button" onClick={verifica_acesso}>
              entrar
            </button>
          </form>
        </div>
        <div className={styles.cadastro}>
          <Link to="/cadastro_aluno">cadastro de aluno</Link>
          <Link to="/cadastro_professor">cadastro de professor</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
