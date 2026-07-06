import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Login from "./pages/login";
import Cadastro_aluno from "./pages/admin/gerenciar_aluno";
import Cadastro_professor from "./pages/admin/gerenciar_professor";
import Home_aluno from "./pages/aluno/home_aluno";
import Home_professor from "./pages/professor/home_professor";
import Home_admin from "./pages/admin/home_admin";
import Cursos from "./pages/admin/curso_disciplina";
import VagasOportunidades from "./pages/admin/gerenciar_vagas";
import Perfil_aluno from "./pages/aluno/perfil_aluno";
import Perfil_professor from "./pages/professor/perfil_professor";
import AcessaProfessor from "./pages/professor/acessa_professor";

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
        <Route path="gerenciar_vagas" element={<VagasOportunidades />} />
        <Route path="perfil_aluno" element={<Perfil_aluno />} />
        <Route path="perfil_professor" element={<Perfil_professor />} />
        <Route path="acessa_professor" element={<AcessaProfessor />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
