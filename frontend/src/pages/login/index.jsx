import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import "../../index.css";
import { useState } from "react";
import unbLogo from "../../assets/unb_logo.webp";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");

    if (matricula.trim() === "" || senha.trim() === "") {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
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

      if (response.ok) {
        if (data.perfil === "aluno") {
          navigate("/home_aluno");
        } else if (data.perfil === "professor") {
          navigate("/home_professor");
        } else if (data.perfil === "admin") {
          navigate("/home_admin");
        }
      } else {
        setErrorMessage(data.detail || "Erro desconhecido ao fazer login.");
      }
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      setErrorMessage(
        "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={styles.div_boas_vindas}>
        <h1>Bem-vindo ao Portal de Vagas UnB</h1>
        <p>Conectando professores e alunos de forma facilitada</p>
      </div>
      <div className={styles.container}>
        <h1 className={styles.h1}>Acesse sua Conta</h1>
        <div className={styles.acesso}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <p>Matrícula</p>
            <input
              placeholder="Matrícula"
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            ></input>
            <p>Senha</p>
            <div className={styles.password_input_container}>
              <input
                placeholder="Digite sua Senha"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              ></input>
              <span
                className={styles.password_toggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errorMessage && (
              <p className={styles.error_message}>{errorMessage}</p>
            )}
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
