import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Cadastro_professor() {
  const navigate = useNavigate();
  
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data_nasc, setData_nasc] = useState("");
  const [area_de_pesquisa, setArea_de_pesquisa] = useState("");
  const [departamento, setDepartamento] = useState(""); 
  const [departamento_coordenado, setDepartamento_coordenado] = useState(""); 
  const [senha, setSenha] = useState("");
  const [conf_senha, setConf_senha] = useState(""); 
  const [showSenha, setShowSenha] = useState(false); 
  const [showConfSenha, setShowConfSenha] = useState(false);

  // Funções de alternância de visibilidade de senha
  const toggleSenhaVisibility = () => {
    setShowSenha(!showSenha);
  };

  const toggleConfSenhaVisibility = () => {
    setShowConfSenha(!showConfSenha);
  };

  const seleciona_dep = (evento) => {
    setDepartamento(evento.target.value);
  };
  const seleciona_depCoordenado = (evento) => {
    setDepartamento_coordenado(evento.target.value);
  };

  async function post_cadastro_professor(
    matricula,
    nome,
    email,
    data_nasc,
    area_de_pesquisa,
    departamento,
    departamento_coordenado,
    senha,
  ) {
    const response = await fetch("http://127.0.0.1:8000/admin/cadastro_professor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricula,
        nome,
        email,
        data_nasc,
        area_de_pesquisa: area_de_pesquisa || null,
        departamento,
        departamento_coordenado: departamento_coordenado || null, 
        senha,
      }),
    });

    if (response.ok) {
      alert("Professor criado com sucesso!");
      navigate("/home_admin");
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar professor: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao criar professor", response, errorData);
    }
  }

  function verifica_cadastro() {
    if (
      matricula.trim() === "" ||
      nome.trim() === "" ||
      email.trim() === "" ||
      data_nasc.trim() === "" ||
      departamento.trim() === "" ||
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

    post_cadastro_professor(matricula, nome, email, data_nasc, area_de_pesquisa, departamento, departamento_coordenado, senha,);
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Cadastro de Professor</h1>
        <p className={styles.infoText}>Preencha as informações abaixo para cadastrar um novo professor.</p>
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

          <label htmlFor="nome">Nome</label>
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

          <label htmlFor="area_de_pesquisa">Área de Pesquisa</label>
          <input
            id="area_de_pesquisa"
            type="text"
            value={area_de_pesquisa}
            onChange={(e) => setArea_de_pesquisa(e.target.value)}
            placeholder="Ex: Inteligência Artificial, Robótica (Opcional)"
          />

          <label htmlFor="departamento">Selecione seu Departamento</label>
          <select
            id="departamento"
            value={departamento}
            onChange={seleciona_dep}
            className={styles.selectField}
            required
          >
            <option value="">Selecione o Departamento (obrigatório)</option>
            <option value="Matemática">Matemática</option>
            <option value="Português">Português</option>
            <option value="Computação">Computação</option>
            <option value="Engenharia">Engenharia</option>
          </select>

          <label htmlFor="departamento_coordenado">Departamento que te Coordena</label>
          <select
            id="departamento_coordenado"
            value={departamento_coordenado}
            onChange={seleciona_depCoordenado}
            className={styles.selectField}
          >
            <option value="">Selecione o Departamento (Opcional)</option>
            <option value="Matemática">Matemática</option>
            <option value="Português">Português</option>
            <option value="Computação">Computação</option>
            <option value="Engenharia">Engenharia</option>
          </select>

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

export default Cadastro_professor;
