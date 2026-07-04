import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Cadastro_aluno() {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data_nasc, setData_nasc] = useState("");
  const [nivel, setNivel] = useState("");
  const [curriculo, setCurriculo] = useState("");
  const [area_interesse, setArea_interesse] = useState("");
  const [senha, setSenha] = useState("");
  const [conf_senha, setConf_senha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfSenha, setShowConfSenha] = useState(false);

  const seleciona_nivel = (evento) => {
    setNivel(evento.target.value);
  };

  async function post_cadastro_aluno(matricula, nome, email, data_nasc, senha, nivel, curriculo, area_interesse) {
    const response = await fetch("http://127.0.0.1:8000/admin/cadastro_aluno", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        matricula,
        nome,
        email,
        data_nasc,
        senha,
        nivel,
        curriculo: curriculo || null,
        area_interesse: area_interesse || null,
      }),
    });

    if (response.ok) {
      alert("Aluno criado com sucesso!");
      navigate("/home_admin");

    } else {
      const errorData = await response.json();
      alert(`Erro ao criar aluno: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao criar aluno", response, errorData);
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
      alert("Preencha todos campos obrigatórios");
      return;
    }

    if (senha !== conf_senha) {
      alert("As senhas não coincidem!");
      return;
    }

    post_cadastro_aluno(matricula, nome, email, data_nasc, senha, nivel, curriculo, area_interesse);

  }

  const toggleSenhaVisibility = () => {
    setShowSenha(!showSenha);
  };

  const toggleConfSenhaVisibility = () => {
    setShowConfSenha(!showConfSenha);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Cadastro dos Alunos</h1>
        <p className={styles.infoText}>Preencha as Informações abaixo para Cadastrar um Novo Aluno.</p>
        <form className={styles.formulario} onSubmit={(e) => { e.preventDefault(); verifica_cadastro(); }}>
          <label htmlFor="matricula">Matrícula</label>
          <input
            id="matricula"
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="Insira a Matrícula (obrigatório)"
            required
          />

          <label htmlFor="nome">Nome Completo</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Insira o Nome Completo (obrigatório)"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex: seuemail@dominio.com (obrigatório)"
            required
          />

          <label htmlFor="data_nasc">Data de Nascimento</label>
          <input
            id="data_nasc"
            type="date"
            min="1926-01-01"
            max={"2016-01-01"}
            value={data_nasc}
            onChange={(e) => setData_nasc(e.target.value)}
            placeholder="Selecione a sua Data de Nascimento (obrigatório)"
            required
          />

          <label htmlFor="nivel">Nível</label>
          <select
            id="nivel"
            value={nivel}
            onChange={seleciona_nivel}
            className={styles.selectField}
            required
          >
            <option value="">Selecione o Nível (obrigatório)</option>
            <option value="Graduação">Graduação</option>
            <option value="Pós-graduação">Pós-graduação</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Doutorado">Doutorado</option>
            <option value="Pós-doutorado">Pós-doutorado</option>
          </select>

          <label htmlFor="curriculo">Currículo</label>
          <input
            id="curriculo"
            type="text"
            value={curriculo}
            onChange={(e) => setCurriculo(e.target.value)}
            placeholder="URL do currículo ou Base64 (Opcional)"
          />

          <label htmlFor="area_interesse">Área de Interesse</label>
          <input
            id="area_interesse"
            type="text"
            value={area_interesse}
            onChange={(e) => setArea_interesse(e.target.value)}
            placeholder="Ex: Inteligência Artificial, Robótica (Opcional)"
          />

         <label htmlFor="senha">Senha</label>
          <div className={styles.passwordInputContainer}>
            <input
              id="senha"
              type={showSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres (obrigatório)"
              required
            />
            <span
              className={styles.passwordToggle}
              onClick={toggleSenhaVisibility}
            >
              {showSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label htmlFor="conf_senha">Confirmar Senha</label>
          <div className={styles.passwordInputContainer}>
            <input
              id="conf_senha"
              type={showConfSenha ? "text" : "password"}
              value={conf_senha}
              onChange={(e) => setConf_senha(e.target.value)}
              placeholder="Confirme sua senha (obrigatório)"
              required
            />
            <span
              className={styles.passwordToggle}
              onClick={toggleConfSenhaVisibility}
            >
              {showConfSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="submit"
          className={styles.button}
          onClick={verifica_cadastro}
        >
          Salvar as Informações
        </button>
      </div>
    </>
  );
}

export default Cadastro_aluno;
