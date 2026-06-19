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
      <h1 className={style.titulo}>Seus dados</h1>
      <div className={style.container}>
        <label>Matrícula</label>
        <input type="number"></input>
        <label>Nome</label>
        <input type="text"></input>
        <label>Email</label>
        <input type="email"></input>
        <label>Curriculo</label>
        <input></input>
        <label>Áreas de interesse</label>
        <textarea typeof="text" className={style.textarea}></textarea>
      </div>
    </>
  );
}

export default Perfil_aluno;
