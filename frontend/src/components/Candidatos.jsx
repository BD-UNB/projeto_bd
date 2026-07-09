import { useState, useEffect } from "react";
import styles from "./Candidatos.module.css";

function Candidatos({ idVaga }) {
  const [candidatos, setCandidatos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarCandidatos = () => {
    setCarregando(true);
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/candidaturas/vaga/${idVaga}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar candidatos");
        return res.json();
      })
      .then((data) => setCandidatos(data))
      .catch((err) => console.log("Erro ao buscar candidatos:", err))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarCandidatos();
  }, [idVaga]);

  const mudarStatus = (idAluno, novoStatus) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/candidaturas/vaga/${idVaga}/aluno/${idAluno}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: novoStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar status");
        return res.json();
      })
      .then(() => carregarCandidatos())
      .catch((err) => console.log("Erro ao atualizar status:", err));
  };

  if (carregando) {
    return <p>Carregando candidatos...</p>;
  }

  if (candidatos.length === 0) {
    return <p>Nenhum candidato ainda.</p>;
  }

  return (
    <div className={styles.lista}>
      {candidatos.map((c) => (
        <div key={c.idAluno} className={styles.card}>
          <p>
            <strong>{c.nome_aluno}</strong> ({c.matricula})
          </p>
          <p>
            <label>nível: </label>
            {c.nivel}
          </p>
          <p>
            <label>área: </label>
            {c.area_interesse}
          </p>
          <p>
            <label>mensagem: </label>
            {c.mensagem_apresentacao}
          </p>
          <p>
            <label>status: </label>
            <span className={styles.status}>{c.status}</span>
          </p>
          <div className={styles.acoes}>
            <button
              className={styles.aprovar}
              onClick={() => mudarStatus(c.idAluno, "aprovado")}
            >
              aprovar
            </button>
            <button
              className={styles.recusar}
              onClick={() => mudarStatus(c.idAluno, "recusado")}
            >
              recusar
            </button>
            <button onClick={() => mudarStatus(c.idAluno, "em_analise")}>
              em análise
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Candidatos;
