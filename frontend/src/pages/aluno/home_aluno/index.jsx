import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./style.module.css";

function Home_aluno() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [mostraMensagem, setMostraMensagem] = useState(false);
  const [mostraComentario, setMostraComentario] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/profile/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
      })
      .then((data) => setPerfil(data))
      .catch((err) => {
        console.log("Erro ao buscar perfil do aluno:", err);
        navigate("/login");
      });

    fetch("http://localhost:8000/vagas/", {
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
      .catch((err) => {
        console.log("Erro ao buscar vagas:", err);
      });
  }, [navigate]);

  if (!perfil) {
    return (
      <div className={styles.carregando}>
        <div className={styles.spinner}></div>
        Carregando perfil...
      </div>
    );
  }
  const comentario = [
    {
      nome_usuario: "aluno 1",
      mensagem: "comentario teste 1",
      data: "01/01/2001",
    },
    {
      nome_usuario: "aluno 2",
      mensagem: "comentario teste 2",
      data: "01/01/2001",
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
        <input placeholder="pesquise por vagas"></input>
        <button>
          <Link to="/perfil_aluno">Perfil</Link>
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
      <h1 className={styles.subtitulo}>vagas publicadas</h1>
      <div className={styles.container}>
        <section className={styles.listaVagas}>
          {vagas.map((vaga) => (
            <article key={vaga.idVagas} className={styles.card}>
              <h2 className={styles.card_titulo}>{vaga.titulo}</h2>
              <div className={styles.card_info}>
                <p>
                  <label>reponsavel: </label>
                  <Link to="/acessa_professor">{vaga.reponsavel}</Link>
                </p>
                <p>
                  <label>nível: </label>
                  {vaga.nivel}
                </p>
                <p>
                  <label>modalidade: </label>
                  {vaga.modalidade}
                </p>
                <p>
                  <label>status: </label>
                  {vaga.status}
                </p>
                <p>
                  <label>local: </label>
                  {vaga.local}
                </p>
                <p>
                  <label>carga horária: </label>
                  {vaga.carga_horaria}
                </p>
                <p>
                  <label>máximo de pessoas: </label>
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
                  <label>tipo: </label>
                  {vaga.tipo}
                </p>
                <p>
                  <label>campus: </label>
                  {vaga.campus}
                </p>
                <p>
                  <label>departamento: </label>
                  {vaga.departamento}
                </p>

                <div>
                  <button
                    className={styles.botaoComentario}
                    onClick={() => setMostraComentario(true)}
                  >
                    comentários
                  </button>
                  {mostraComentario && (
                    <div className={styles.comentario}>
                      <button
                        className={styles.fechar}
                        onClick={() => setMostraComentario(false)}
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
                        {comentario.map((comentarioItem, index) => (
                          <div key={index} className={styles.cardComentario}>
                            <p>
                              <label>nome: </label>
                              {comentarioItem.nome_usuario}
                            </p>
                            <p>
                              <label>mensagem: </label>
                              {comentarioItem.mensagem}
                            </p>
                            <p>
                              <label>data: </label>
                              {comentarioItem.data}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p>
                  <label>descrição: </label>
                  {vaga.descricao}
                </p>
              </div>
              <button className={styles.botaoInscrever}>Inscrever-se</button>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
export default Home_aluno;
