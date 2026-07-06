import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import "../../../index.css";

function Perfil_aluno() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [areaInteresse, setAreaInteresse] = useState("");
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
        setAreaInteresse(data.area_interesse || "");
      })
      .catch((err) => {
        console.log("Erro ao buscar perfil do aluno:", err);
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
        area_interesse: areaInteresse,
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
        setAreaInteresse(data.area_interesse || "");
        setMensagem("Perfil atualizado com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao atualizar perfil:", err);
        setMensagem("Não foi possível conectar ao servidor.");
      });
  };

  if (!perfil) {
    return (
      <div className={style.carregando}>
        <div className={style.spinner}></div>
        Carregando perfil...
      </div>
    );
  }

  return (
    <>
      <div>
        <nav className={style.nav}>
          <label>{perfil.nomeUniversidade}</label>
          <label>{perfil.nomeDepartamento}</label>
          <label>{perfil.nomeCurso}</label>
        </nav>
      </div>

      <div className={style.container}>
        <div className={style.dados}>
          <label>Matrícula: </label>
          <input value={perfil.matricula || ""} disabled></input>
          <label>Nome: </label>
          <input value={nome} onChange={(e) => setNome(e.target.value)}></input>
          <label>Email: </label>
          <input
            className={style.pode_editar}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Curriculo (pdf): </label>
          <input type="file" accept="pdf" className={style.pode_editar}></input>
          <label>Áreas de interesse: </label>
          <textarea
            className={style.pode_editar}
            value={areaInteresse}
            onChange={(e) => setAreaInteresse(e.target.value)}
          ></textarea>
          {mensagem && <p>{mensagem}</p>}
          <button onClick={salvarPerfil}>editar</button>
        </div>
      </div>
    </>
  );
}

export default Perfil_aluno;
