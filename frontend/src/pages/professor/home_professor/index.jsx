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
  }, [navigate]);

  if (!perfil) {
    return <p>Carregando...</p>;
  }
  const vagas = [
    {
      idVagas: 1,
      titulo: "Título 1",
      descricao: "Descrição 1",
      reponsavel: "Professor 1",
      nível: "graduação 1",
      modalidade: "presencial 1",
      status: "status",
      local: "local 1",
      carga_hor: 100,
      num_max: 60,
      data_inicio: "01/01/2026",
      data_final: "01/05/2026",
      tipo: "tipo 1",
      campus: "campus 1",
      departamento: "departamento 1",
      comentarios: (
        <button type="button" className={styles.bu}>
          comentários
        </button>
      ),
    },
    {
      idVagas: 2,
      titulo: "Título 1",
      descricao: "Descrição 1",
      reponsavel: "Professor 1",
      nível: "graduação 1",
      modalidade: "presencial 1",
      status: "status",
      local: "local 1",
      carga_hor: 100,
      num_max: 60,
      data_inicio: "01/01/2026",
      data_final: "01/05/2026",
      tipo: "tipo 1",
      campus: "campus 1",
      departamento: "departamento 1",
      comentarios: (
        <button type="button" className={styles.bu}>
          comentários
        </button>
      ),
    },
  ];
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
              <h2
                style={{
                  fontSize: "30px",
                }}
              >
                Mensagens
              </h2>
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
      <h1 className={styles.subtitulo}>Responsável por</h1>
      <div className={styles.container}>
        <section className={styles.listaVagas}>
          {filtrarVagas(vagas, termo).map((vaga) => (
            <article key={vaga.idVagas} className={styles.card}>
              <h2 className={styles.card_titulo}>{vaga.titulo}</h2>
              <div className={styles.card_info}>
                <p>
                  <label>
                    <strong>reponsável: </strong>
                  </label>
                  {vaga.reponsavel}
                </p>
                <p>
                  <label>
                    <strong>nível: </strong>
                  </label>
                  {vaga.nível}
                </p>
                <p>
                  <label>
                    <strong>modalidade: </strong>
                  </label>
                  {vaga.modalidade}
                </p>
                <p>
                  <label>
                    <strong>status: </strong>
                  </label>
                  {vaga.status}
                </p>
                <p>
                  <label>
                    <strong>local: </strong>
                  </label>
                  {vaga.local}
                </p>
                <p>
                  <label>
                    <strong>carga horária: </strong>
                  </label>
                  {vaga.carga_hor}
                </p>
                <p>
                  <label>
                    <strong>máximo de pessoas: </strong>
                  </label>
                  {vaga.num_max}
                </p>
                <p>
                  <label>
                    <strong>data início: </strong>
                  </label>
                  {vaga.data_inicio}
                </p>
                <p>
                  <label>
                    <strong>data final: </strong>
                  </label>
                  {vaga.data_final}
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
                      <h2
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        Comentários
                      </h2>

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
