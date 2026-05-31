import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Login from "./pages/login";
import Cadastro_aluno from "./pages/aluno/cadastro_aluno";
import Cadastro_professor from "./pages/professor/cadastro_professor";
import Home_aluno from "./pages/aluno/home_aluno";
import Home_professor from "./pages/professor/home_professor";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="cadastro_aluno" element={<Cadastro_aluno />} />
        <Route path="cadastro_professor" element={<Cadastro_professor />} />
        <Route path="home_aluno" element={<Home_aluno />} />
        <Route path="home_professor" element={<Home_professor />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
