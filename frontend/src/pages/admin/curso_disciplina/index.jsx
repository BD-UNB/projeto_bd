import "../../../index.css";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cursos() {
  const navigate = useNavigate();

  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  // formulário de curso
  const [cursoNome, setCursoNome] = useState("");
  const [cursoSemestres, setCursoSemestres] = useState("");
  const [cursoDescricao, setCursoDescricao] = useState("");
  const [cursoUniversidade, setCursoUniversidade] = useState("");
  const [editandoCurso, setEditandoCurso] = useState(null);

  // formulário de disciplina
  const [discNome, setDiscNome] = useState("");
  const [discCarga, setDiscCarga] = useState("");
  const [discEmenta, setDiscEmenta] = useState("");
  const [discDepartamento, setDiscDepartamento] = useState("");
  const [editandoDisc, setEditandoDisc] = useState(null);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const carregarCursos = () => {
    fetch("http://localhost:8000/admin/cursos", { headers: authHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar cursos");
        return res.json();
      })
      .then((data) => setCursos(data))
      .catch((err) => console.log("Erro ao buscar cursos:", err));
  };

  const carregarDisciplinas = () => {
    fetch("http://localhost:8000/admin/disciplinas", { headers: authHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar disciplinas");
        return res.json();
      })
      .then((data) => setDisciplinas(data))
      .catch((err) => console.log("Erro ao buscar disciplinas:", err));
  };

  const carregarReferencias = () => {
    fetch("http://localhost:8000/admin/referencias_professor", { headers: authHeaders() })
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    carregarReferencias();
    carregarCursos();
    carregarDisciplinas();
  }, [navigate]);

  // ----- Curso -----
  const limparCurso = () => {
    setCursoNome("");
    setCursoSemestres("");
    setCursoDescricao("");
    setCursoUniversidade("");
    setEditandoCurso(null);
  };

  async function salvarCurso() {
    if (cursoNome.trim() === "" || cursoSemestres === "") {
      alert("Preencha o nome e a duração (semestres) do curso.");
      return;
    }
    const url =
      editandoCurso === null
        ? "http://localhost:8000/admin/cursos"
        : `http://localhost:8000/admin/cursos/${editandoCurso}`;
    const response = await fetch(url, {
      method: editandoCurso === null ? "POST" : "PUT",
      headers: authHeaders(),
      body: JSON.stringify({
        nome: cursoNome,
        duracao_semestres: Number(cursoSemestres),
        descricao: cursoDescricao,
        idUniversidade: cursoUniversidade === "" ? "" : Number(cursoUniversidade),
      }),
    });
    if (response.ok) {
      alert("Curso salvo com sucesso!");
      limparCurso();
      carregarCursos();
    } else {
      const erro = await response.json();
      alert(`Erro ao salvar curso: ${erro.detail || "Erro desconhecido"}`);
    }
  }

  function editarCurso(item) {
    setEditandoCurso(item.idCurso);
    setCursoNome(item.nome || "");
    setCursoSemestres(item.duracao_semestres ?? "");
    setCursoDescricao(item.descricao || "");
    setCursoUniversidade(item.idUniversidade ? String(item.idUniversidade) : "");
  }

  async function excluirCurso(idCurso) {
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) return;
    const response = await fetch(`http://localhost:8000/admin/cursos/${idCurso}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (response.ok) {
      alert("Curso excluído com sucesso!");
      if (editandoCurso === idCurso) limparCurso();
      carregarCursos();
    } else {
      const erro = await response.json();
      alert(`Erro ao excluir curso: ${erro.detail || "Erro desconhecido"}`);
    }
  }

  // ----- Disciplina -----
  const limparDisc = () => {
    setDiscNome("");
    setDiscCarga("");
    setDiscEmenta("");
    setDiscDepartamento("");
    setEditandoDisc(null);
  };

  async function salvarDisciplina() {
    if (discNome.trim() === "" || discCarga === "") {
      alert("Preencha o nome e a carga horária da disciplina.");
      return;
    }
    const url =
      editandoDisc === null
        ? "http://localhost:8000/admin/disciplinas"
        : `http://localhost:8000/admin/disciplinas/${editandoDisc}`;
    const response = await fetch(url, {
      method: editandoDisc === null ? "POST" : "PUT",
      headers: authHeaders(),
      body: JSON.stringify({
        nome: discNome,
        carga_horaria: Number(discCarga),
        ementa: discEmenta,
        idDepartamento: discDepartamento === "" ? "" : Number(discDepartamento),
      }),
    });
    if (response.ok) {
      alert("Disciplina salva com sucesso!");
      limparDisc();
      carregarDisciplinas();
    } else {
      const erro = await response.json();
      alert(`Erro ao salvar disciplina: ${erro.detail || "Erro desconhecido"}`);
    }
  }

  function editarDisciplina(item) {
    setEditandoDisc(item.idDisciplina);
    setDiscNome(item.nome || "");
    setDiscCarga(item.carga_horaria ?? "");
    setDiscEmenta(item.ementa || "");
    setDiscDepartamento(item.idDepartamento ? String(item.idDepartamento) : "");
  }

  async function excluirDisciplina(idDisciplina) {
    if (!window.confirm("Tem certeza que deseja excluir esta disciplina?")) return;
    const response = await fetch(`http://localhost:8000/admin/disciplinas/${idDisciplina}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (response.ok) {
      alert("Disciplina excluída com sucesso!");
      if (editandoDisc === idDisciplina) limparDisc();
      carregarDisciplinas();
    } else {
      const erro = await response.json();
      alert(`Erro ao excluir disciplina: ${erro.detail || "Erro desconhecido"}`);
    }
  }

  return (
    <>
      <nav className={styles.nav}>
        <h1>Área de criação</h1>
      </nav>
      <div className={styles.criacao}>
        <div className={styles.curso}>
          <h3 className={styles.titulocurso}>
            {editandoCurso === null ? "Criação de curso" : "Edição de curso"}
          </h3>
          <label>
            <strong>Universidade</strong>
          </label>
          <select value={cursoUniversidade} onChange={(e) => setCursoUniversidade(e.target.value)}>
            <option value="">Selecione...</option>
            {universidades.map((u) => (
              <option key={u.idUniversidade} value={u.idUniversidade}>
                {u.nome}
              </option>
            ))}
          </select>

          <label>
            <strong>Nome do curso</strong>
          </label>
          <input value={cursoNome} onChange={(e) => setCursoNome(e.target.value)}></input>

          <label>
            <strong>Semestres</strong>
          </label>
          <input
            type="number"
            value={cursoSemestres}
            onChange={(e) => setCursoSemestres(e.target.value)}
          ></input>

          <label>
            <strong>Descrição</strong>
          </label>
          <textarea value={cursoDescricao} onChange={(e) => setCursoDescricao(e.target.value)}></textarea>

          <button onClick={salvarCurso}>
            {editandoCurso === null ? "criar curso" : "salvar curso"}
          </button>
          {editandoCurso !== null && <button onClick={limparCurso}>cancelar</button>}
        </div>
        <div className={styles.disciplina}>
          <h3>
            {editandoDisc === null ? "Criação de Disciplina" : "Edição de Disciplina"}
          </h3>
          <label>
            <strong>Departamento</strong>
          </label>
          <select value={discDepartamento} onChange={(e) => setDiscDepartamento(e.target.value)}>
            <option value="">Selecione...</option>
            {departamentos.map((d) => (
              <option key={d.idDepartamento} value={d.idDepartamento}>
                {d.nome}
              </option>
            ))}
          </select>

          <label>
            <strong>Nome da disciplina</strong>
          </label>
          <input value={discNome} onChange={(e) => setDiscNome(e.target.value)}></input>

          <label>
            <strong>Carga horária</strong>
          </label>
          <input
            type="number"
            value={discCarga}
            onChange={(e) => setDiscCarga(e.target.value)}
          ></input>

          <label>
            <strong>Ementa</strong>
          </label>
          <textarea value={discEmenta} onChange={(e) => setDiscEmenta(e.target.value)}></textarea>

          <button onClick={salvarDisciplina}>
            {editandoDisc === null ? "criar disciplina" : "salvar disciplina"}
          </button>
          {editandoDisc !== null && <button onClick={limparDisc}>cancelar</button>}
        </div>
      </div>

      <div className={styles.containerListas}>
        <div className={styles.tituloListas}>
          <h1>
            <strong>Listas de cursos e Disciplinas</strong>
          </h1>
        </div>

        <div className={styles.containerCurso}>
          <h2>Lista de cursos</h2>
          <div className={styles.listaCurso}>
            {cursos.map((item) => (
              <article className={styles.cardCurso} key={item.idCurso}>
                <p className={styles.nomeCurso}>
                  <strong>{item.nome}</strong>
                </p>
                <div className={styles.infoCurso}>
                  <p>
                    <strong>universidade: </strong>
                    {item.universidade}
                  </p>
                  <p>
                    <strong>semestres: </strong>
                    {item.duracao_semestres}
                  </p>
                  <p>
                    <strong>descrição: </strong>
                    {item.descricao}
                  </p>
                </div>
                <div className={styles.botao}>
                  <button className={styles.editar} onClick={() => editarCurso(item)}>
                    editar
                  </button>
                  <button className={styles.excluir} onClick={() => excluirCurso(item.idCurso)}>
                    excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.containerDisciplina}>
          <h2>Lista de disciplinas</h2>
          <div className={styles.listaDisciplina}>
            {disciplinas.map((item) => (
              <article className={styles.cardDisciplina} key={item.idDisciplina}>
                <p className={styles.nomeDisc}>
                  <strong>{item.nome}</strong>
                </p>
                <div className={styles.infoDisciplina}>
                  <p>
                    <strong>departamento: </strong>
                    {item.departamento}
                  </p>
                  <p>
                    <strong>carga horária: </strong>
                    {item.carga_horaria}
                  </p>
                  <p>
                    <strong>ementa: </strong>
                    {item.ementa}
                  </p>
                </div>
                <div className={styles.botao}>
                  <button className={styles.editar} onClick={() => editarDisciplina(item)}>
                    editar
                  </button>
                  <button className={styles.excluir} onClick={() => excluirDisciplina(item.idDisciplina)}>
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

export default Cursos;
