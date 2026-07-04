import "../../../index.css";
import styles from "./style.module.css";

function VagasOportunidades() {
  return (
    <>
      <div className={styles.container}>
        <h1>Criação de vagas e oportunidades</h1>
        <h2>Preencha os campos abaixo</h2>
        <div>
          <form className={styles.formulario}>
            <label>
              <strong>universidade</strong>
            </label>
            <input></input>

            <label>
              <strong>departamento</strong>
            </label>
            <input></input>

            <label>
              <strong>cursos</strong>
            </label>
            <input></input>

            <label>
              <strong>título da vaga</strong>
            </label>
            <input type="text"></input>

            <label>
              <strong>requisitos</strong>
            </label>
            <input type="text"></input>

            <label>
              <strong>nível</strong>
            </label>
            <input type="text"></input>

            <label>
              <strong>modalidade</strong>
            </label>
            <input type="text"></input>

            <label>
              <strong>status</strong>
            </label>
            <input type="text"></input>

            <label>
              <strong>local</strong>
            </label>
            <input type="text"></input>

            <label>
              <strong>carga horária</strong>
            </label>
            <input type="number"></input>

            <label>
              <strong>número máximo de inscrições</strong>
            </label>
            <input type="number"></input>

            <label>
              <strong>data de início de candidatura</strong>
            </label>
            <input type="date"></input>

            <label>
              <strong>data de fim de candidatura</strong>
            </label>
            <input type="date"></input>

            <label>
              <strong>descrição</strong>
            </label>
            <textarea className={styles.descricao}></textarea>
          </form>
          <button type="button">criar</button>
        </div>
      </div>{" "}
    </>
  );
}

export default VagasOportunidades;
