import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

function Perfil_professor() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [areaPesquisa, setAreaPesquisa] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [departamentoCoordenado, setDepartamentoCoordenado] = useState("");
  const [mensagem, setMensagem] = useState("");

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
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        return res.json();
      })
      .then((data) => {
        setPerfil(data);
        setNome(data.nome || "");
        setEmail(data.email || "");
        setAreaPesquisa(data.areaPesquisa || "");
        setDepartamento(data.nomeDepartamento || "");
        setDepartamentoCoordenado(data.departamentoCoordenado || "");
      })
      .catch((err) => {
        console.log("Erro ao buscar perfil do professor:", err);
        navigate("/");
      });
  }, [navigate]);

  const salvarPerfil = () => {
    setMensagem("");
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/profile/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome,
        email,
        areaPesquisa,
        departamento,
        departamentoCoordenado,
      }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          setMensagem(data.detail || "Erro ao atualizar perfil.");
          return;
        }
        setPerfil(data);
        setNome(data.nome || "");
        setEmail(data.email || "");
        setAreaPesquisa(data.areaPesquisa || "");
        setDepartamento(data.nomeDepartamento || "");
        setDepartamentoCoordenado(data.departamentoCoordenado || "");
        setMensagem("Perfil atualizado com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao atualizar perfil:", err);
        setMensagem("Não foi possível conectar ao servidor.");
      });
  };

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
      <div className={styles.nav}>
        <nav>
          <h1>{perfil.nomeUniversidade}</h1>
          <h1>{perfil.nomeDepartamento}</h1>
        </nav>
      </div>
      <div className={styles.container}>
        <div className={styles.dados}>
          <label>Matrícula</label>
          <input type="text" value={perfil.matricula || ""} disabled />
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Área de Pesquisa</label>
          <input
            type="text"
            value={areaPesquisa}
            onChange={(e) => setAreaPesquisa(e.target.value)}
          />
          <label>Departamento</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          />
          <label>Coordena departamento</label>
          <input
            type="text"
            value={departamentoCoordenado}
            onChange={(e) => setDepartamentoCoordenado(e.target.value)}
          />
        </div>
        {mensagem && <p>{mensagem}</p>}
        <div className={styles.botao}>
          <button onClick={salvarPerfil}>salvar</button>
        </div>
      </div>
    </>
  );
}

export default Perfil_professor;
