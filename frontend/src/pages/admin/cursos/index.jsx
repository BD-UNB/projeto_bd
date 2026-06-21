import "../../../index.css";
import styles from "./style.module.css";

function Cursos() {
  return (
    <>
      <nav className={styles.nav}>
        <h1>Área de criação</h1>
      </nav>
      <div className={styles.criacao}>
        <div className={styles.curso}>
          <h3 className={styles.titulocurso}>Criação de curso</h3>
          <label>Universidade</label>
          <input></input>

          <label>Departamento</label>
          <input></input>

          <label>Nome do curso</label>
          <input></input>

          <label>Semestre</label>
          <input type="number"></input>

          <label>Descrição</label>
          <textarea></textarea>
        </div>
        <div className={styles.disciplina}>
          <h3>Criação de Disciplina</h3>
          <label>Universidade</label>
          <input></input>

          <label>Departamento</label>
          <input></input>

          <label>Curso</label>
          <input></input>

          <label>Nome da discplina</label>
          <input></input>

          <label>Carga horária</label>
          <input type="number"></input>
          <label>Pré-requisito</label>
          <input></input>
          <label>Ementa</label>
          <textarea></textarea>
        </div>
        <button>criar curso</button>
        <button>criar disciplina</button>
      </div>
    </>
  );
}

export default Cursos;
