import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
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

  const [alunos, setAlunos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const carregarAlunos = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/admin/alunos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar alunos");
        return res.json();
      })
      .then((data) => setAlunos(data))
      .catch((err) => console.log("Erro ao buscar alunos:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    carregarAlunos();
  }, [navigate]);

  const seleciona_nivel = (evento) => {
    setNivel(evento.target.value);
  };

  const limparFormulario = () => {
    setMatricula("");
    setNome("");
    setEmail("");
    setData_nasc("");
    setNivel("");
    setCurriculo("");
    setArea_interesse("");
    setSenha("");
    setConf_senha("");
    setEditandoId(null);
  };

  async function post_cadastro_aluno() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/admin/cadastro_aluno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
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
      limparFormulario();
      carregarAlunos();
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar aluno: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao criar aluno", response, errorData);
    }
  }

  async function put_editar_aluno() {
    const token = localStorage.getItem("token");
    const dados = {
      matricula,
      nome,
      email,
      data_nasc,
      nivel,
      curriculo: curriculo || null,
      area_interesse: area_interesse || null,
    };
    if (senha.trim() !== "") {
      dados.senha = senha;
    }

    const response = await fetch(
      `http://localhost:8000/admin/alunos/${editandoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      },
    );

    if (response.ok) {
      alert("Aluno atualizado com sucesso!");
      limparFormulario();
      carregarAlunos();
    } else {
      const errorData = await response.json();
      alert(`Erro ao atualizar aluno: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao atualizar aluno", response, errorData);
    }
  }

  function verifica_cadastro() {
    if (
      matricula.trim() === "" ||
      nome.trim() === "" ||
      email.trim() === "" ||
      data_nasc.trim() === "" ||
      nivel.trim() === ""
    ) {
      alert("Preencha todos campos obrigatórios");
      return;
    }

    // Na criação a senha é obrigatória; na edição só valida se foi preenchida
    if (editandoId === null && (senha.trim() === "" || conf_senha.trim() === "")) {
      alert("Preencha a senha e a confirmação");
      return;
    }

    if (senha !== conf_senha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (editandoId === null) {
      post_cadastro_aluno();
    } else {
      put_editar_aluno();
    }
  }

  function editarAluno(aluno) {
    setEditandoId(aluno.idUsuario);
    setMatricula(aluno.matricula || "");
    setNome(aluno.nome || "");
    setEmail(aluno.email || "");
    setData_nasc(aluno.data_nasc || "");
    setNivel(aluno.nivel || "");
    setArea_interesse(aluno.area_interesse || "");
    setCurriculo("");
    setSenha("");
    setConf_senha("");
  }

  async function excluirAluno(idUsuario) {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) {
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/admin/alunos/${idUsuario}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      },
    );

    if (response.ok) {
      alert("Aluno excluído com sucesso!");
      if (editandoId === idUsuario) {
        limparFormulario();
      }
      carregarAlunos();
    } else {
      const errorData = await response.json();
      alert(`Erro ao excluir aluno: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao excluir aluno", response, errorData);
    }
  }

  return (
    <>
      <div className={styles.separa}>
        <div className={styles.container}>
          <h1>{editandoId === null ? "cadastro de aluno" : "editar aluno"}</h1>
          <p>Siga as informações abaixo</p>
          <form className={styles.formulario}>
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
              max="2016-01-01"
              value={data_nasc}
              onChange={(e) => setData_nasc(e.target.value)}
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
              <option value="graduacao">Graduação</option>
              <option value="pos-graduacao">Pós-graduação</option>
            </select>

            <label htmlFor="curriculo">Currículo</label>
            <input
              id="curriculo"
              type="text"
              value={curriculo}
              onChange={(e) => setCurriculo(e.target.value)}
              placeholder="URL do currículo ou Base64 (Opcional)"
            />

            <label htmlFor="area_interesse">Área de interesse</label>
            <input
              id="area_interesse"
              type="text"
              value={area_interesse}
              onChange={(e) => setArea_interesse(e.target.value)}
              placeholder="Ex: Inteligência Artificial, Robótica (Opcional)"
            />

            <label htmlFor="senha">
              Senha{editandoId !== null && " (deixe em branco para não alterar)"}
            </label>
            <div className={styles.passwordInputContainer}>
              <input
                id="senha"
                type={showSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowSenha(!showSenha)}
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
                placeholder="Confirme sua senha"
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowConfSenha(!showConfSenha)}
              >
                {showConfSenha ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </form>
          <button
            type="button"
            className={styles.button}
            onClick={verifica_cadastro}
          >
            {editandoId === null ? "salvar informações" : "salvar edição"}
          </button>
          {editandoId !== null && (
            <button
              type="button"
              className={styles.button}
              onClick={limparFormulario}
            >
              cancelar edição
            </button>
          )}
        </div>

        <div className={styles.containerCadastro}>
          <div className={styles.cabecalhoLista}>
            <h2>
              <strong>Lista de alunos cadastrados</strong>
            </h2>
          </div>
          <div className={styles.containerLista}>
            {alunos.map((item) => (
              <article className={styles.usuario} key={item.idUsuario}>
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
                      onClick={() => excluirAluno(item.idUsuario)}
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
