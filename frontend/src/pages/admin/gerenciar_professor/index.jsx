import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
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

  const [universidade, setUniversidade] = useState("");
  const [universidades, setUniversidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  const [professores, setProfessores] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const carregarReferencias = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/admin/referencias_professor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar referências");
        return res.json();
      })
      .then((data) => {
        setUniversidades(data.universidades || []);
        setDepartamentos(data.departamentos || []);
      })
      .catch((err) => console.log("Erro ao buscar referências:", err));
  };

  const carregarProfessores = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/admin/professores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar professores");
        return res.json();
      })
      .then((data) => setProfessores(data))
      .catch((err) => console.log("Erro ao buscar professores:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    carregarReferencias();
    carregarProfessores();
  }, [navigate]);

  const limparFormulario = () => {
    setMatricula("");
    setNome("");
    setEmail("");
    setData_nasc("");
    setArea_de_pesquisa("");
    setUniversidade("");
    setDepartamento("");
    setDepartamento_coordenado("");
    setSenha("");
    setConf_senha("");
    setEditandoId(null);
  };

  async function post_cadastro_professor() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/admin/cadastro_professor", {
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
        area_de_pesquisa,
        departamento: departamento || null,
        departamento_coordenado: departamento_coordenado || null,
        senha,
      }),
    });

    if (response.ok) {
      alert("Professor criado com sucesso!");
      limparFormulario();
      carregarProfessores();
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar professor: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao criar professor", response, errorData);
    }
  }

  async function put_editar_professor() {
    const token = localStorage.getItem("token");
    const dados = {
      matricula,
      nome,
      email,
      data_nasc,
      area_de_pesquisa,
      departamento: departamento || null,
      universidade: universidade || null,
      departamento_coordenado: departamento_coordenado || null,
    };
    if (senha.trim() !== "") {
      dados.senha = senha;
    }

    const response = await fetch(
      `http://localhost:8000/admin/professores/${editandoId}`,
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
      alert("Professor atualizado com sucesso!");
      limparFormulario();
      carregarProfessores();
    } else {
      const errorData = await response.json();
      alert(`Erro ao atualizar professor: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao atualizar professor", response, errorData);
    }
  }

  function verifica_cadastro() {
    if (
      matricula.trim() === "" ||
      nome.trim() === "" ||
      email.trim() === "" ||
      data_nasc.trim() === "" ||
      area_de_pesquisa.trim() === ""
    ) {
      alert("Preencha todos campos obrigatórios");
      return;
    }

    if (editandoId === null && (senha.trim() === "" || conf_senha.trim() === "")) {
      alert("Preencha a senha e a confirmação");
      return;
    }

    if (senha !== conf_senha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (editandoId === null) {
      post_cadastro_professor();
    } else {
      put_editar_professor();
    }
  }

  function editarProf(professor) {
    setEditandoId(professor.idUsuario);
    setMatricula(professor.matricula || "");
    setNome(professor.nome || "");
    setEmail(professor.email || "");
    setData_nasc(professor.data_nasc || "");
    setArea_de_pesquisa(professor.area_pesquisa || "");
    setDepartamento(professor.departamento || "");
    setDepartamento_coordenado(professor.departamentoCoordenado || "");
    const dep = departamentos.find((d) => d.nome === professor.departamento);
    setUniversidade(dep ? String(dep.idUniversidade) : "");
    setSenha("");
    setConf_senha("");
  }

  async function excluirProf(idUsuario) {
    if (!window.confirm("Tem certeza que deseja excluir este professor?")) {
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/admin/professores/${idUsuario}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      },
    );

    if (response.ok) {
      alert("Professor excluído com sucesso!");
      if (editandoId === idUsuario) {
        limparFormulario();
      }
      carregarProfessores();
    } else {
      const errorData = await response.json();
      alert(`Erro ao excluir professor: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao excluir professor", response, errorData);
    }
  }

  return (
    <>
      <div className={styles.separa}>
        <div className={styles.container}>
          <h1>
            <strong>
              {editandoId === null ? "cadastro de professor" : "editar professor"}
            </strong>
          </h1>
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
              max="2016-01-01"
              value={data_nasc}
              onChange={(e) => setData_nasc(e.target.value)}
              required
            />

            <label htmlFor="area_de_pesquisa">Área de pesquisa</label>
            <input
              id="area_de_pesquisa"
              type="text"
              value={area_de_pesquisa}
              onChange={(e) => setArea_de_pesquisa(e.target.value)}
              placeholder="Ex: Inteligência Artificial (obrigatório)"
              required
            />

            <label htmlFor="universidade">Universidade</label>
            <select
              id="universidade"
              value={universidade}
              onChange={(e) => {
                setUniversidade(e.target.value);
                setDepartamento("");
                setDepartamento_coordenado("");
              }}
            >
              <option value="">Selecione...</option>
              {universidades.map((u) => (
                <option key={u.idUniversidade} value={u.idUniversidade}>
                  {u.nome}
                </option>
              ))}
            </select>

            <label htmlFor="departamento">Departamento</label>
            <select
              id="departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            >
              <option value="">Selecione...</option>
              {departamentos
                .filter(
                  (d) =>
                    universidade === "" ||
                    String(d.idUniversidade) === universidade,
                )
                .map((d) => (
                  <option key={d.idDepartamento} value={d.nome}>
                    {d.nome}
                  </option>
                ))}
            </select>

            <label htmlFor="departamento_coordenado">
              Departamento que coordena
            </label>
            <select
              id="departamento_coordenado"
              value={departamento_coordenado}
              onChange={(e) => setDepartamento_coordenado(e.target.value)}
            >
              <option value="">Nenhum</option>
              {departamentos
                .filter(
                  (d) =>
                    universidade === "" ||
                    String(d.idUniversidade) === universidade,
                )
                .map((d) => (
                  <option key={d.idDepartamento} value={d.nome}>
                    {d.nome}
                  </option>
                ))}
            </select>

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
              <strong>Lista de professores cadastrados</strong>
            </h2>
          </div>
          <div className={styles.containerLista}>
            {professores.map((item) => (
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
                    <strong>área de pesquisa: </strong>
                    {item.area_pesquisa}
                  </p>
                  <p>
                    <strong>departamento: </strong>
                    {item.departamento}
                  </p>
                  <p>
                    <strong>departamento coordenado: </strong>
                    {item.departamentoCoordenado}
                  </p>

                  <div className={styles.botao}>
                    <button
                      type="button"
                      onClick={() => editarProf(item)}
                      className={styles.editar}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      onClick={() => excluirProf(item.idUsuario)}
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

export default Cadastro_professor;
