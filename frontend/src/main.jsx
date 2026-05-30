import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./pages/home";
import Cadastro_aluno from "./pages/aluno/cadastro_aluno";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cadastro_aluno" element={<Cadastro_aluno />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
