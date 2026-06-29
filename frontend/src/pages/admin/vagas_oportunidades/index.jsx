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
            <label>universidade</label>
            <input></input>

            <label>departamento</label>
            <input></input>

            <label>cursos</label>
            <input></input>

            <label>título da vaga</label>
            <input type="text"></input>

            <label>requisitos</label>
            <input type="text"></input>

            <label>nível</label>
            <input type="text"></input>

            <label>modalidade</label>
            <input type="text"></input>

            <label>status</label>
            <input type="text"></input>

            <label>local</label>
            <input type="text"></input>

            <label>carga horária</label>
            <input type="number"></input>

            <label>número máximo de inscrições</label>
            <input type="number"></input>

            <label>data de início de candidatura</label>
            <input type="date"></input>

            <label>data de fim de candidatura</label>
            <input type="date"></input>

            <label>descrição</label>
            <textarea className={styles.descricao}></textarea>
          </form>
          <button type="button">criar</button>
        </div>
      </div>{" "}
    </>
  );
}

export default VagasOportunidades;
