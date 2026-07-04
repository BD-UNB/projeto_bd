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
        <label>Matrícula: </label>
        <label>matricula</label>
        <label>Nome: </label>
        <label>nome</label>
        <label>Email: </label>
        <label>email</label>
        <label>Curriculo: </label>
        <label>anexo</label>
        <label>Áreas de interesse: </label>
        <label>blablabla</label>
      </div>
    </>
  );
}

export default Perfil_aluno;
