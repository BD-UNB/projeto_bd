import "../../../index.css";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VagasOportunidades() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [nivel, setNivel] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [statusVaga, setStatusVaga] = useState("");
  const [local, setLocal] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [numMax, setNumMax] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [idTipoVaga, setIdTipoVaga] = useState("");
  const [idCampus, setIdCampus] = useState("");
  const [idDepartamento, setIdDepartamento] = useState("");

  const [vagas, setVagas] = useState([]);
  const [referencias, setReferencias] = useState({ tipos: [], campi: [], departamentos: [] });
  const [editandoId, setEditandoId] = useState(null);

  const carregarVagas = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/admin/vagas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar vagas");
        return res.json();
      })
      .then((data) => setVagas(data))
      .catch((err) => console.log("Erro ao buscar vagas:", err));
  };

  const carregarReferencias = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/admin/referencias", {
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
      .then((data) => setReferencias(data))
      .catch((err) => console.log("Erro ao buscar referências:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    carregarReferencias();
    carregarVagas();
  }, [navigate]);

  const limparFormulario = () => {
    setTitulo("");
    setDescricao("");
    setRequisitos("");
    setNivel("");
    setModalidade("");
    setStatusVaga("");
    setLocal("");
    setCargaHoraria("");
    setNumMax("");
    setDataInicio("");
    setDataFim("");
    setIdTipoVaga("");
    setIdCampus("");
    setIdDepartamento("");
    setEditandoId(null);
  };

  const montaDados = () => ({
    titulo,
    descricao,
    requisitos,
    nivel: nivel || null,
    modalidade: modalidade || null,
    status: statusVaga || null,
    local,
    carga_horaria: cargaHoraria === "" ? "" : Number(cargaHoraria),
    num_max: numMax === "" ? "" : Number(numMax),
    data_inicio_candidatura: dataInicio,
    data_fim_candidatura: dataFim,
    idTipoVaga: idTipoVaga === "" ? "" : Number(idTipoVaga),
    idCampus: idCampus === "" ? "" : Number(idCampus),
    idDepartamento: idDepartamento === "" ? "" : Number(idDepartamento),
  });

  async function enviarVaga() {
    if (
      titulo.trim() === "" ||
      descricao.trim() === "" ||
      cargaHoraria === "" ||
      numMax === ""
    ) {
      alert("Preencha título, descrição, carga horária e número máximo de inscrições.");
      return;
    }

    const token = localStorage.getItem("token");
    const url =
      editandoId === null
        ? "http://localhost:8000/admin/vagas"
        : `http://localhost:8000/admin/vagas/${editandoId}`;
    const metodo = editandoId === null ? "POST" : "PUT";

    const response = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(montaDados()),
    });

    if (response.ok) {
      alert(editandoId === null ? "Vaga criada com sucesso!" : "Vaga atualizada com sucesso!");
      limparFormulario();
      carregarVagas();
    } else {
      const errorData = await response.json();
      alert(`Erro ao salvar vaga: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao salvar vaga", response, errorData);
    }
  }

  function editarVaga(vaga) {
    setEditandoId(vaga.idVagas);
    setTitulo(vaga.titulo || "");
    setDescricao(vaga.descricao || "");
    setRequisitos(vaga.requisitos || "");
    setNivel(vaga.nivel || "");
    setModalidade(vaga.modalidade || "");
    setStatusVaga(vaga.status || "");
    setLocal(vaga.local || "");
    setCargaHoraria(vaga.carga_horaria ?? "");
    setNumMax(vaga.num_max ?? "");
    setDataInicio(vaga.data_inicio_candidatura || "");
    setDataFim(vaga.data_fim_candidatura || "");
    setIdTipoVaga(vaga.idTipoVaga ? String(vaga.idTipoVaga) : "");
    setIdCampus(vaga.idCampus ? String(vaga.idCampus) : "");
    setIdDepartamento(vaga.idDepartamento ? String(vaga.idDepartamento) : "");
  }

  async function excluirVaga(idVaga) {
    if (!window.confirm("Tem certeza que deseja excluir esta vaga?")) {
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/admin/vagas/${idVaga}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Vaga excluída com sucesso!");
      if (editandoId === idVaga) {
        limparFormulario();
      }
      carregarVagas();
    } else {
      const errorData = await response.json();
      alert(`Erro ao excluir vaga: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao excluir vaga", response, errorData);
    }
  }

  return (
    <>
      <div className={styles.separa}>
        <div className={styles.container}>
          <h1>
            {editandoId === null
              ? "Criação de vagas e oportunidades"
              : "Edição de vaga"}
          </h1>
          <h2>Preencha os campos abaixo</h2>
          <div>
            <form className={styles.formulario}>
              <label>
                <strong>título da vaga</strong>
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              ></input>

              <label>
                <strong>tipo de vaga</strong>
              </label>
              <select value={idTipoVaga} onChange={(e) => setIdTipoVaga(e.target.value)}>
                <option value="">Selecione...</option>
                {referencias.tipos.map((t) => (
                  <option key={t.idTipoVaga} value={t.idTipoVaga}>
                    {t.nome}
                  </option>
                ))}
              </select>

              <label>
                <strong>departamento</strong>
              </label>
              <select value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)}>
                <option value="">Selecione...</option>
                {referencias.departamentos.map((d) => (
                  <option key={d.idDepartamento} value={d.idDepartamento}>
                    {d.nome}
                  </option>
                ))}
              </select>

              <label>
                <strong>campus</strong>
              </label>
              <select value={idCampus} onChange={(e) => setIdCampus(e.target.value)}>
                <option value="">Selecione...</option>
                {referencias.campi.map((c) => (
                  <option key={c.idCampus} value={c.idCampus}>
                    {c.nome}
                  </option>
                ))}
              </select>

              <label>
                <strong>nível</strong>
              </label>
              <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="graduacao">Graduação</option>
                <option value="pos-graduacao">Pós-graduação</option>
                <option value="ambos">Ambos</option>
              </select>

              <label>
                <strong>modalidade</strong>
              </label>
              <select value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="presencial">Presencial</option>
                <option value="remoto">Remoto</option>
                <option value="hibrido">Híbrido</option>
              </select>

              <label>
                <strong>status</strong>
              </label>
              <select value={statusVaga} onChange={(e) => setStatusVaga(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="publicada">Publicada</option>
                <option value="em_analise">Em análise</option>
                <option value="finalizada">Finalizada</option>
                <option value="cancelada">Cancelada</option>
              </select>

              <label>
                <strong>requisitos</strong>
              </label>
              <input
                type="text"
                value={requisitos}
                onChange={(e) => setRequisitos(e.target.value)}
              ></input>

              <label>
                <strong>local</strong>
              </label>
              <input
                type="text"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              ></input>

              <label>
                <strong>carga horária</strong>
              </label>
              <input
                type="number"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
              ></input>

              <label>
                <strong>número máximo de inscrições</strong>
              </label>
              <input
                type="number"
                value={numMax}
                onChange={(e) => setNumMax(e.target.value)}
              ></input>

              <label>
                <strong>data de início de candidatura</strong>
              </label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              ></input>

              <label>
                <strong>data de fim de candidatura</strong>
              </label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              ></input>

              <label>
                <strong>descrição</strong>
              </label>
              <textarea
                className={styles.descricao}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </form>
            <button type="button" onClick={enviarVaga}>
              {editandoId === null ? "criar" : "salvar edição"}
            </button>
            {editandoId !== null && (
              <button type="button" onClick={limparFormulario}>
                cancelar edição
              </button>
            )}
          </div>
        </div>
        <div className={styles.containerVagas}>
          <div className={styles.cabecalhoLista}>
            <h1>Vagas criadas</h1>
            <h2>Lista de vagas cadastradas</h2>
          </div>
          <div className={styles.lista_vagas}>
            {vagas.map((vaga) => (
              <article className={styles.vaga} key={vaga.idVagas}>
                <div className={styles.cabecalho_vaga}>
                  <h3>{vaga.titulo}</h3>
                  <span>{vaga.status}</span>
                </div>

                <div className={styles.informacoes_vaga}>
                  <p>
                    <strong>tipo:</strong> {vaga.tipo}
                  </p>
                  <p>
                    <strong>departamento:</strong> {vaga.departamento}
                  </p>
                  <p>
                    <strong>campus:</strong> {vaga.campus}
                  </p>
                  <p>
                    <strong>modalidade:</strong> {vaga.modalidade}
                  </p>
                  <p>
                    <strong>nível:</strong> {vaga.nivel}
                  </p>
                  <p>
                    <strong>carga horária:</strong> {vaga.carga_horaria}
                  </p>
                  <p>
                    <strong>máximo de inscrições:</strong> {vaga.num_max}
                  </p>
                  <p>
                    <strong>candidatos:</strong> {vaga.total_candidatos}
                  </p>
                  <p>
                    <strong>local:</strong> {vaga.local}
                  </p>
                  <p>
                    <strong>responsável:</strong> {vaga.responsavel}
                  </p>
                  <p>
                    <strong>data início:</strong> {vaga.data_inicio_candidatura}
                  </p>
                  <p>
                    <strong>data fim:</strong> {vaga.data_fim_candidatura}
                  </p>
                  <p>
                    <strong>requisitos:</strong> {vaga.requisitos}
                  </p>
                  <p>
                    <strong>descrição:</strong> {vaga.descricao}
                  </p>
                </div>
                <div className={styles.botao}>
                  <button className={styles.editar} onClick={() => editarVaga(vaga)}>
                    <strong>editar</strong>
                  </button>
                  <button className={styles.excluir} onClick={() => excluirVaga(vaga.idVagas)}>
                    <strong>excluir</strong>
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

export default VagasOportunidades;
