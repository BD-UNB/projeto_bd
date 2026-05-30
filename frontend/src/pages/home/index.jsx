import { Link } from "react-router-dom";
import styles from "./style.module.css";
import "../../index.css";

function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1>Acesse sua conta</h1>
        <div className={styles.acesso}>
          <form>
            <p>número de usuario</p>
            <input placeholder="numero de usuario" type="number"></input>
            <p>senha</p>
            <input placeholder="digite sua senha"></input>
            <button>entrar</button>
          </form>
        </div>
        <div className={styles.cadastro}>
          <Link to="/cadastro_aluno">cadastro de aluno</Link>
          <Link to="/cadastro_professor">cadastro de professor</Link>
        </div>
      </div>
    </>
  );
}

export default Home;
