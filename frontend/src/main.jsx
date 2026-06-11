import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Login from "./pages/login";
import Cadastro_aluno from "./pages/admin/cadastro_aluno";
import Cadastro_professor from "./pages/admin/cadastro_professor";
import Home_aluno from "./pages/aluno/home_aluno";
import Home_professor from "./pages/professor/home_professor";
import Home_admin from "./pages/admin/home_admin";
import Cursos from "./pages/admin/cursos";
import Disciplinas from "./pages/admin/disciplinas";
import VagasOportunidades from "./pages/admin/vagas_oportunidades";
import Vagas_criadas from "./pages/admin/vagas_criadas";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="cadastro_aluno" element={<Cadastro_aluno />} />
        <Route path="cadastro_professor" element={<Cadastro_professor />} />
        <Route path="home_aluno" element={<Home_aluno />} />
        <Route path="home_professor" element={<Home_professor />} />
        <Route path="home_admin" element={<Home_admin />} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="disciplinas" element={<Disciplinas />} />
        <Route path="vagas_oportunidades" element={<VagasOportunidades />} />
        <Route path="vagas_criadas" element={<Vagas_criadas />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
