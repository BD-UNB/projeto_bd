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
          <label>
            <strong>Universidade</strong>
          </label>
          <input></input>

          <label>
            <strong>Departamento</strong>
          </label>
          <input></input>

          <label>
            <strong>Nome do curso</strong>
          </label>
          <input></input>

          <label>
            <strong>Semestre</strong>
          </label>
          <input type="number"></input>

          <label>
            <strong>Descrição</strong>
          </label>
          <textarea></textarea>
        </div>
        <div className={styles.disciplina}>
          <h3>Criação de Disciplina</h3>
          <label>
            <strong>Universidade</strong>
          </label>
          <input></input>

          <label>
            <strong>Departamento</strong>
          </label>
          <input></input>

          <label>
            <strong>Curso</strong>
          </label>
          <input></input>

          <label>
            <strong>Nome da discplina</strong>
          </label>
          <input></input>

          <label>
            <strong>Carga horária</strong>
          </label>
          <input type="number"></input>
          <label>
            <strong>Pré-requisito</strong>
          </label>
          <input></input>
          <label>
            <strong>Ementa</strong>
          </label>
          <textarea></textarea>
        </div>
        <button>criar curso</button>
        <button>criar disciplina</button>
      </div>
    </>
  );
}

export default Cursos;
