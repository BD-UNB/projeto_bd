import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import "../../index.css";
import { useState } from "react";
function Login() {
  const navigate = useNavigate("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  function verifica_entradas() {
    if (senha.trim() === "" || matricula.trim() === "") {
      alert("Preencha todos os campos!");
      return;
    }

    async function post_login(matricula, senha) {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricula,
          senha,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        if (data.perfil === "aluno") {
          navigate("/home_aluno");
        } else if (data.perfil === "professor") {
          navigate("/home_professor");
        } else if (data.perfil === "admin") {
          navigate("/home_admin");
        }
      } else {
        alert("Usuário ou senha inválido(s)");
      }
    }

    post_login(matricula, senha);
  }

  return (
    <>
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
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            ></input>
            <p>Senha</p>
            <input
              placeholder="Digite sua senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            ></input>
            <button type="button" onClick={verifica_entradas}>
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
