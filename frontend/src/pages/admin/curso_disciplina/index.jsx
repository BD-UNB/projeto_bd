import "../../../index.css";
import styles from "./style.module.css";

function Cursos() {
  const curso = [
    {
      universidade: "UnB",
      dep: "Computação",
      nome: "Ciência da Computação",
      semestres: "10",
      descricao: "finja que tem uma descrição",
    },
    {
      universidade: "UnB",
      dep: "Faculdade de Engenharia",
      nome: "Engenharia da Computação",
      semestres: "12",
      descricao: "finja que tem uma descrição",
    },
  ];
  const disciplina = [
    {
      universidade: "UnB",
      dep: "Computação",
      curso_pertencente: "CIC",
      nome: "Estrutura de Dados",
      carga_horaria: "90h",
      ementa: "pipipi popopo",
      pre_requisito: "naosei1, naosei2, naosei3",
    },
    {
      universidade: "UnB",
      dep: "Computação",
      curso_pertencente: "CIC",
      nome: "Banco de dados 1",
      carga_horaria: "60h",
      ementa: "blablablablablabla",
      pre_requisito: "naosei1, naosei2, naosei3",
    },
    {
      universidade: "UnB",
      dep: "Computação",
      curso_pertencente: "CIC",
      nome: "Banco de dados 2",
      carga_horaria: "60h",
      ementa: "blablablablablabla",
      pre_requisito: "naosei1, naosei2, naosei3",
    },
  ];

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

      <div className={styles.containerListas}>
        <div className={styles.tituloListas}>
          <h1>
            <strong>Listas de cursos e Disciplinas</strong>
          </h1>
        </div>

        <div className={styles.containerCurso}>
          <h2>Lista de cursos</h2>
          <div className={styles.listaCurso}>
            {curso.map((item) => (
              <article className={styles.cardCurso} key={item.nome}>
                <p className={styles.nomeCurso}>
                  <strong>{item.nome}</strong>
                </p>
                <div className={styles.infoCurso}>
                  <p>
                    <strong>universidade: </strong>
                    {item.universidade}
                  </p>
                  <p>
                    <strong>departamento: </strong>
                    {item.dep}
                  </p>
                  <p>
                    <strong>semestre total: </strong>
                    {item.semestres}
                  </p>
                  <p>
                    <strong>descrição: </strong>
                    {item.descricao}
                  </p>
                </div>
                <div className={styles.botao}>
                  <button className={styles.editar}>editar</button>
                  <button className={styles.excluir}>excluir</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.containerDisciplina}>
          <h2>Lista de disciplinas</h2>
          <div className={styles.listaDisciplina}>
            {disciplina.map((item) => (
              <article className={styles.cardDisciplina} key={item.nome}>
                <p className={styles.nomeDisc}>
                  <strong>{item.nome}</strong>
                </p>
                <div className={styles.infoDisciplina}>
                  <p>
                    <strong>universidade: </strong>
                    {item.universidade}
                  </p>
                  <p>
                    <strong>departamento: </strong>
                    {item.dep}
                  </p>
                  <p>
                    <strong>curso pertencente: </strong>
                    {item.curso_pertencente}
                  </p>
                  <p>
                    <strong>carga horária: </strong>
                    {item.carga_horaria}
                  </p>
                  <p>
                    <strong>pré-requisito: </strong>
                    {item.pre_requisito}
                  </p>
                  <p>
                    <strong>ementa: </strong>
                    {item.ementa}
                  </p>
                </div>
                <div className={styles.botao}>
                  <button className={styles.editar}>editar</button>
                  <button className={styles.excluir}>excluir</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cursos;
