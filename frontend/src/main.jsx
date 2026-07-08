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
import Gerenciar_departamento from "./pages/admin/gerenciar_departamento";
import Perfil_aluno from "./pages/aluno/perfil_aluno";
import Perfil_professor from "./pages/professor/perfil_professor";
import AcessaProfessor from "./pages/professor/acessa_professor";

import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="cadastro_aluno" element={<ProtectedRoute perfil="admin"><Cadastro_aluno /></ProtectedRoute>} />
        <Route path="cadastro_professor" element={<ProtectedRoute perfil="admin"><Cadastro_professor /></ProtectedRoute>} />
        <Route path="home_aluno" element={<ProtectedRoute perfil="aluno"><Home_aluno /></ProtectedRoute>} />
        <Route path="home_professor" element={<ProtectedRoute perfil="professor"><Home_professor /></ProtectedRoute>} />
        <Route path="home_admin" element={<ProtectedRoute perfil="admin"><Home_admin /></ProtectedRoute>} />
        <Route path="cursos" element={<ProtectedRoute perfil="admin"><Cursos /></ProtectedRoute>} />
        <Route path="gerenciar_vagas" element={<ProtectedRoute perfil="admin"><VagasOportunidades /></ProtectedRoute>} />
        <Route path="gerenciar_departamento" element={<ProtectedRoute perfil="admin"><Gerenciar_departamento /></ProtectedRoute>} />
        <Route path="perfil_aluno" element={<ProtectedRoute perfil="aluno"><Perfil_aluno /></ProtectedRoute>} />
        <Route path="perfil_professor" element={<ProtectedRoute perfil="professor"><Perfil_professor /></ProtectedRoute>} />
        <Route path="acessa_professor" element={<ProtectedRoute perfil="professor"><AcessaProfessor /></ProtectedRoute>} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
