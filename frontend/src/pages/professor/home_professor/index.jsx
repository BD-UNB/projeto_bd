import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import Comentarios from "../../../components/Comentarios";
import BarraPesquisa, { filtrarVagas } from "../../../components/BarraPesquisa";

function Home_professor() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [termo, setTermo] = useState("");
  const [mostraMensagem, setMostraMensagem] = useState(false);
  const [comentarioAberto, setComentarioAberto] = useState(null);

  const [vagas, setVagas] = useState([]);
  const [referencias, setReferencias] = useState({ tipos: [], campi: [], departamentos: [] });
  const [editandoId, setEditandoId] = useState(null);

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

  const carregarMinhasVagas = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/vagas/minhas", {
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
    fetch("http://localhost:8000/vagas/referencias", {
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

    fetch("http://localhost:8000/profile/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
      })
      .then((data) => setPerfil(data))
      .catch((err) => {
        console.log("Erro ao buscar perfil do professor:", err);
        navigate("/");
      });

    carregarReferencias();
    carregarMinhasVagas();
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
    if (titulo.trim() === "" || descricao.trim() === "" || cargaHoraria === "" || numMax === "") {
      alert("Preencha título, descrição, carga horária e número máximo de inscrições.");
      return;
    }

    const token = localStorage.getItem("token");
    const url =
      editandoId === null
        ? "http://localhost:8000/vagas/"
        : `http://localhost:8000/vagas/${editandoId}`;
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
      carregarMinhasVagas();
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
    const response = await fetch(`http://localhost:8000/vagas/${idVaga}`, {
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
      carregarMinhasVagas();
    } else {
      const errorData = await response.json();
      alert(`Erro ao excluir vaga: ${errorData.detail || "Erro desconhecido"}`);
      console.error("Erro ao excluir vaga", response, errorData);
    }
  }

  const mensagem = [
    {
      tipo: "professor",
      nome_usuario: "usuario 1",
      mensagem: "mensagem 1",
      data: "01/01/2001",
    },
    {
      tipo: "aluno",
      nome_usuario: "usuario 2",
      mensagem: "mensagem 2",
      data: "01/01/2001",
    },
  ];

  if (!perfil) {
    return (
      <div className={styles.carregando}>
        <div className={styles.spinner}></div>
        Carregando perfil...
      </div>
    );
  }

  return (
    <>
      <div className={styles.h}>
        <header className={styles.header}>
          <h2>{perfil.nome}</h2>
          <h2>{perfil.nomeUniversidade}</h2>
          <h2>{perfil.nomeDepartamento}</h2>
        </header>
      </div>
      <nav className={styles.nav}>
        <BarraPesquisa valor={termo} onChange={setTermo} />
        <button>
          <Link to="/perfil_professor">Perfil</Link>
        </button>
        <div>
          <button
            className={styles.botaoMensagem}
            onClick={() => setMostraMensagem(true)}
          >
            Mensagens
          </button>
          {mostraMensagem && (
            <div className={styles.mensagem}>
              <button
                onClick={() => setMostraMensagem(false)}
                className={styles.fechar}
              >
                ✕ Fechar
              </button>
              <h2 style={{ fontSize: "30px" }}>Mensagens</h2>
              <div className={styles.conteudoMensagem}>
                {mensagem.map((mensagemItem, index) => (
                  <div key={index} className={styles.cardMensagem}>
                    <p>
                      <label>tipo: </label>
                      {mensagemItem.tipo}
                    </p>
                    <p>
                      <label>nome: </label>
                      {mensagemItem.nome_usuario}
                    </p>
                    <p>
                      <label>mensagem: </label>
                      {mensagemItem.mensagem}
                    </p>
                    <p>
                      <label>data: </label>
                      {mensagemItem.data}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <h1 className={styles.subtitulo}>
        {editandoId === null ? "Criar vaga" : "Editar vaga"}
      </h1>
      <div className={styles.container}>
        <form className={styles.formVaga}>
          <label>título</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

          <label>tipo de vaga</label>
          <select value={idTipoVaga} onChange={(e) => setIdTipoVaga(e.target.value)}>
            <option value="">Selecione...</option>
            {referencias.tipos.map((t) => (
              <option key={t.idTipoVaga} value={t.idTipoVaga}>
                {t.nome}
              </option>
            ))}
          </select>

          <label>departamento</label>
          <select value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)}>
            <option value="">Selecione...</option>
            {referencias.departamentos.map((d) => (
              <option key={d.idDepartamento} value={d.idDepartamento}>
                {d.nome}
              </option>
            ))}
          </select>

          <label>campus</label>
          <select value={idCampus} onChange={(e) => setIdCampus(e.target.value)}>
            <option value="">Selecione...</option>
            {referencias.campi.map((c) => (
              <option key={c.idCampus} value={c.idCampus}>
                {c.nome}
              </option>
            ))}
          </select>

          <label>nível</label>
          <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="graduacao">Graduação</option>
            <option value="pos-graduacao">Pós-graduação</option>
            <option value="ambos">Ambos</option>
          </select>

          <label>modalidade</label>
          <select value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="hibrido">Híbrido</option>
          </select>

          <label>status</label>
          <select value={statusVaga} onChange={(e) => setStatusVaga(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="publicada">Publicada</option>
            <option value="em_analise">Em análise</option>
            <option value="finalizada">Finalizada</option>
            <option value="cancelada">Cancelada</option>
          </select>

          <label>requisitos</label>
          <input type="text" value={requisitos} onChange={(e) => setRequisitos(e.target.value)} />

          <label>local</label>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />

          <label>carga horária</label>
          <input type="number" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} />

          <label>máximo de inscrições</label>
          <input type="number" value={numMax} onChange={(e) => setNumMax(e.target.value)} />

          <label>data início</label>
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />

          <label>data fim</label>
          <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />

          <label>descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </form>
        <div className={styles.acoesForm}>
          <button type="button" onClick={enviarVaga}>
            {editandoId === null ? "criar vaga" : "salvar edição"}
          </button>
          {editandoId !== null && (
            <button type="button" onClick={limparFormulario}>
              cancelar edição
            </button>
          )}
        </div>
      </div>

      <h1 className={styles.subtitulo}>Responsável por</h1>
      <div className={styles.container}>
        <section className={styles.listaVagas}>
          {filtrarVagas(vagas, termo).map((vaga) => (
            <article key={vaga.idVagas} className={styles.card}>
              <h2 className={styles.card_titulo}>{vaga.titulo}</h2>
              <div className={styles.card_info}>
                <p>
                  <label>status: </label>
                  {vaga.status}
                </p>
                <p>
                  <label>candidatos: </label>
                  {vaga.total_candidatos}
                </p>
                <p>
                  <label>nível: </label>
                  {vaga.nivel}
                </p>
                <p>
                  <label>
                    <strong>modalidade: </strong>
                  </label>
                  {vaga.modalidade}
                </p>
                <p>
                  <label>
                    <strong>local: </strong>
                  </label>
                  {vaga.local}
                </p>
                <p>
                  <label>carga horária: </label>
                  {vaga.carga_horaria}
                </p>
                <p>
                  <label>
                    <strong>máximo de pessoas: </strong>
                  </label>
                  {vaga.num_max}
                </p>
                <p>
                  <label>data início: </label>
                  {vaga.data_inicio_candidatura}
                </p>
                <p>
                  <label>data final: </label>
                  {vaga.data_fim_candidatura}
                </p>
                <p>
                  <label>
                    <strong>tipo: </strong>
                  </label>
                  {vaga.tipo}
                </p>
                <p>
                  <label>
                    <strong>campus: </strong>
                  </label>
                  {vaga.campus}
                </p>
                <p>
                  <label>
                    <strong>departamento: </strong>
                  </label>
                  {vaga.departamento}
                </p>

                <div className={styles.acoesVaga}>
                  <button className={styles.editar} onClick={() => editarVaga(vaga)}>
                    editar
                  </button>
                  <button className={styles.excluir} onClick={() => excluirVaga(vaga.idVagas)}>
                    excluir
                  </button>
                </div>

                <div>
                  <button
                    className={styles.botaoComentario}
                    onClick={() => setComentarioAberto(vaga.idVagas)}
                  >
                    comentários
                  </button>
                  {comentarioAberto === vaga.idVagas && (
                    <div className={styles.comentario}>
                      <button
                        className={styles.fechar}
                        onClick={() => setComentarioAberto(null)}
                      >
                        ✕ Fechar
                      </button>
                      <h2 style={{ fontSize: "30px" }}>Comentários</h2>
                      <div className={styles.conteudoComentario}>
                        <div className={styles.fundoComentario}>
                          <Comentarios idVaga={vaga.idVagas} />
                        </div>
                      </div>
                      <div className={styles.escreve_comentario}>
                        <textarea placeholder="digite seu comentário aqui."></textarea>
                        <button>Enviar</button>
                      </div>
                    </div>
                  )}
                </div>
                <p>
                  <label>
                    <strong>descrição: </strong>
                  </label>
                  {vaga.descricao}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
export default Home_professor;
