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

  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

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

  async function post_cadastro_aluno(
    matricula,
    nome,
    email,
    data_nasc,
    senha,
    nivel,
    curriculo,
    area_interesse,
  ) {
    const response = await fetch("http://127.0.0.1:8000/admin/cadastro_aluno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

    post_cadastro_aluno(
      matricula,
      nome,
      email,
      data_nasc,
      senha,
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
      <div className={styles.separa}>
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
            <input
              type="text"
              onChange={(e) => setNome(e.target.value)}
            ></input>
            <label>
              <strong>digite seu email</strong>
            </label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />

            <label>
              <strong>data de nascimento*</strong>
            </label>
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
              id="curriculo"
              type="text"
              value={curriculo}
              onChange={(e) => setCurriculo(e.target.value)}
              placeholder="URL do currículo ou Base64 (Opcional)"
            />

            <label>
              <strong>digite novamente</strong>
            </label>
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
              {/*onClick={toggleSenhaVisibility}*/}
              <span className={styles.passwordToggle}>
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
              {/*onClick={toggleConfSenhaVisibility}*/}
              <span className={styles.passwordToggle}>
                {showConfSenha ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </form>
          <button
            type="button"
            className={styles.button}
            onClick={verifica_cadastro}
          >
            salvar informações
          </button>
        </div>

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
      </div>
    </>
  );
}

export default Cadastro_aluno;
