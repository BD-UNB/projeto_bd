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
    } else if (numero == 2) {
      navigate("/home_professor");
    } else {
      navigate("/home_admin");
    }
  }

  return (
    <>
      <div className={styles.header_logo}>
        <img src="src/assets/unb_logo.webp" alt="Logo da UnB" />
      </div>
      <div className={styles.div_boas_vindas}>
        <h1>Bem-vindo ao Portal de Vagas UnB</h1>
        <p>Conectando professores e alunos de forma facilitada</p>
      </div>
      <div className={styles.container}>
        <h1 className={styles.h1}>Acesse sua conta</h1>
        <div className={styles.acesso}>
          <form>
            <p>Número de Usuário</p>
            <input
              placeholder="Digite o número de usuário"
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            ></input>
            <p>Senha</p>
            <input
              placeholder="Digite sua senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            ></input>
            <button type="button" onClick={verifica_acesso}>
              Entrar
            </button>
          </form>
        </div>
        <div className={styles.cadastro}>
          <Link to="/home_admin">.</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
