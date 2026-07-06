import style from "./style.module.css";
import "../../../index.css";

function Perfil_aluno() {
  return (
    <>
      <div>
        <nav className={style.nav}>
          <label>UNIVERSIDADE</label>
          <label>DEPARTAMENTO</label>
          <label>CURSO QUE O ALUNO FAZ</label>
        </nav>
      </div>

      <div className={style.container}>
        <div className={style.dados}>
          <label>Matrícula: </label>
          <input></input>
          <label>Nome: </label>
          <input></input>
          <label>Email: </label>
          <input className={style.pode_editar}></input>
          <label>Curriculo (pdf): </label>
          <input type="file" accept="pdf" className={style.pode_editar}></input>
          <label>Áreas de interesse: </label>
          <textarea className={style.pode_editar}></textarea>
          <button>editar</button>
        </div>
      </div>
    </>
  );
}

export default Perfil_aluno;
