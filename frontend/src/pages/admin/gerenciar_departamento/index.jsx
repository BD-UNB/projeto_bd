import "../../../index.css";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Gerenciar_departamento() {
  const navigate = useNavigate();

  const [departamentos, setDepartamentos] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [local, setLocal] = useState("");
  const [idUniversidade, setIdUniversidade] = useState("");

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const carregarDepartamentos = () => {
    fetch("http://localhost:8000/admin/departamentos", { headers: authHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar departamentos");
        return res.json();
      })
      .then((data) => setDepartamentos(data))
      .catch((err) => console.log("Erro ao buscar departamentos:", err));
  };

  const carregarReferencias = () => {
    fetch("http://localhost:8000/admin/referencias_professor", { headers: authHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar referências");
        return res.json();
      })
      .then((data) => setUniversidades(data.universidades || []))
      .catch((err) => console.log("Erro ao buscar referências:", err));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    carregarReferencias();
    carregarDepartamentos();
  }, [navigate]);

  const limparFormulario = () => {
    setNome("");
    setEmail("");
    setLocal("");
    setIdUniversidade("");
    setEditandoId(null);
  };

  async function salvarDepartamento() {
    if (nome.trim() === "") {
      alert("O nome do departamento é obrigatório.");
      return;
    }
    const url =
      editandoId === null
        ? "http://localhost:8000/admin/departamentos"
        : `http://localhost:8000/admin/departamentos/${editandoId}`;
    const response = await fetch(url, {
      method: editandoId === null ? "POST" : "PUT",
      headers: authHeaders(),
      body: JSON.stringify({
        nome,
        email,
        local,
        idUniversidade: idUniversidade === "" ? "" : Number(idUniversidade),
      }),
    });
    if (response.ok) {
      alert("Departamento salvo com sucesso!");
      limparFormulario();
      carregarDepartamentos();
    } else {
      const erro = await response.json();
      alert(`Erro ao salvar departamento: ${erro.detail || "Erro desconhecido"}`);
    }
  }

  function editarDepartamento(item) {
    setEditandoId(item.idDepartamento);
    setNome(item.nome || "");
    setEmail(item.email || "");
    setLocal(item.local || "");
    setIdUniversidade(item.idUniversidade ? String(item.idUniversidade) : "");
  }

  async function excluirDepartamento(id) {
    if (!window.confirm("Tem certeza que deseja excluir este departamento?")) return;
    const response = await fetch(`http://localhost:8000/admin/departamentos/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (response.ok) {
      alert("Departamento excluído com sucesso!");
      if (editandoId === id) limparFormulario();
      carregarDepartamentos();
    } else {
      const erro = await response.json();
      alert(`Erro ao excluir departamento: ${erro.detail || "Erro desconhecido"}`);
    }
  }

  return (
    <>
      <div className={styles.separa}>
        <div className={styles.container}>
          <h1>{editandoId === null ? "Cadastro de departamento" : "Editar departamento"}</h1>
          <p>Preencha os campos abaixo</p>
          <div className={styles.formulario}>
            <label>Nome</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Local</label>
            <input value={local} onChange={(e) => setLocal(e.target.value)} />

            <label>Universidade</label>
            <select value={idUniversidade} onChange={(e) => setIdUniversidade(e.target.value)}>
              <option value="">Selecione...</option>
              {universidades.map((u) => (
                <option key={u.idUniversidade} value={u.idUniversidade}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
          <button className={styles.button} onClick={salvarDepartamento}>
            {editandoId === null ? "salvar informações" : "salvar edição"}
          </button>
          {editandoId !== null && (
            <button className={styles.button} onClick={limparFormulario}>
              cancelar edição
            </button>
          )}
        </div>

        <div className={styles.containerLista}>
          <h2>Departamentos cadastrados</h2>
          <div className={styles.lista}>
            {departamentos.map((item) => (
              <article className={styles.card} key={item.idDepartamento}>
                <p className={styles.nome}>
                  <strong>{item.nome}</strong>
                </p>
                <p>
                  <strong>email: </strong>
                  {item.email}
                </p>
                <p>
                  <strong>local: </strong>
                  {item.local}
                </p>
                <p>
                  <strong>universidade: </strong>
                  {item.universidade}
                </p>
                <div className={styles.botao}>
                  <button className={styles.editar} onClick={() => editarDepartamento(item)}>
                    editar
                  </button>
                  <button className={styles.excluir} onClick={() => excluirDepartamento(item.idDepartamento)}>
                    excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Gerenciar_departamento;
