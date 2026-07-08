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
  const [curriculoArquivo, setCurriculoArquivo] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const selecionaCurriculo = (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    const reader = new FileReader();
    reader.onload = () => setCurriculoArquivo(reader.result);
    reader.readAsDataURL(arquivo);
  };

  const verCurriculo = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/profile/me/curriculo", {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar currículo");
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      })
      .catch((err) => console.log("Erro ao ver currículo:", err));
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
        curriculo: curriculoArquivo,
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
        setCurriculoArquivo(null);
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
      <nav className={style.nav}>
        <span>{perfil.nomeUniversidade}</span>
        <span>{perfil.nomeDepartamento}</span>
        <span>{perfil.nomeCurso}</span>
      </nav>

      <div className={style.container}>
        <h1>Seus dados</h1>
        <div className={style.dados}>
          <label>Matrícula</label>
          <input value={perfil.matricula || ""} disabled></input>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)}></input>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label>Currículo (pdf)</label>
          <div className={style.curriculo}>
            <input
              type="file"
              accept="application/pdf"
              onChange={selecionaCurriculo}
            ></input>
            {perfil.curriculo && (
              <button
                type="button"
                className={style.linkCurriculo}
                onClick={verCurriculo}
              >
                ver currículo atual
              </button>
            )}
          </div>
          <label>Áreas de interesse</label>
          <textarea
            value={areaInteresse}
            onChange={(e) => setAreaInteresse(e.target.value)}
          ></textarea>
        </div>
        {mensagem && <p className={style.mensagem}>{mensagem}</p>}
        <button className={style.button} onClick={salvarPerfil}>
          salvar
        </button>
      </div>
    </>
  );
}

export default Perfil_aluno;
