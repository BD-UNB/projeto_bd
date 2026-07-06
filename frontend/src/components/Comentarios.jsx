import { useState, useEffect } from "react";
import styles from "./Comentarios.module.css";

function getIdUsuario() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.idUsuario;
  } catch {
    return null;
  }
}

function Comentarios({ idVaga }) {
  const [comentarios, setComentarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novoTexto, setNovoTexto] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  const idUsuario = getIdUsuario();

  const carregarComentarios = () => {
    setCarregando(true);
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/comentarios/vaga/${idVaga}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar comentários");
        return res.json();
      })
      .then((data) => setComentarios(data))
      .catch((err) => console.log("Erro ao buscar comentários:", err))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarComentarios();
  }, [idVaga]);

  const adicionarComentario = () => {
    if (novoTexto.trim() === "") return;

    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/comentarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ idVagas: idVaga, texto: novoTexto }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao adicionar comentário");
        return res.json();
      })
      .then(() => {
        setNovoTexto("");
        carregarComentarios();
      })
      .catch((err) => console.log("Erro ao adicionar comentário:", err));
  };

  const salvarEdicao = (idComentario) => {
    if (textoEdicao.trim() === "") return;

    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/comentarios/${idComentario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ texto: textoEdicao }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao editar comentário");
        return res.json();
      })
      .then(() => {
        setEditandoId(null);
        setTextoEdicao("");
        carregarComentarios();
      })
      .catch((err) => console.log("Erro ao editar comentário:", err));
  };

  const deletarComentario = (idComentario) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/comentarios/${idComentario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar comentário");
        return res.json();
      })
      .then(() => carregarComentarios())
      .catch((err) => console.log("Erro ao deletar comentário:", err));
  };

  return (
    <div className={styles.comentarios}>
      <div className={styles.lista}>
        {carregando && (
          <div className={styles.carregando}>
            <div className={styles.spinner}></div>
            Carregando comentários...
          </div>
        )}
        {!carregando && comentarios.length === 0 && <p>Nenhum comentário ainda.</p>}
        {!carregando &&
          comentarios.map((c) => (
            <div key={c.idComentario} className={styles.card}>
              <p>
                <label>nome: </label>
                {c.nome_usuario}
              </p>
              {editandoId === c.idComentario ? (
                <div className={styles.edicao}>
                  <input
                    value={textoEdicao}
                    onChange={(e) => setTextoEdicao(e.target.value)}
                  />
                  <button onClick={() => salvarEdicao(c.idComentario)}>Salvar</button>
                  <button onClick={() => setEditandoId(null)}>Cancelar</button>
                </div>
              ) : (
                <p>
                  <label>mensagem: </label>
                  {c.texto}
                </p>
              )}
              {c.idUsuario === idUsuario && editandoId !== c.idComentario && (
                <div className={styles.acoes}>
                  <button
                    onClick={() => {
                      setEditandoId(c.idComentario);
                      setTextoEdicao(c.texto);
                    }}
                  >
                    editar
                  </button>
                  <button onClick={() => deletarComentario(c.idComentario)}>
                    deletar
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className={styles.escreve_comentario}>
        <textarea
          placeholder="digite sua mensagem aqui."
          value={novoTexto}
          onChange={(e) => setNovoTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              adicionarComentario();
            }
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default Comentarios;
