import { Navigate } from "react-router-dom";

function ProtectedRoute({ perfil, children }) {
  const token = localStorage.getItem("token");
  const perfilAtual = localStorage.getItem("perfil");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (perfil) {
    const permitidos = Array.isArray(perfil) ? perfil : [perfil];
    if (!permitidos.includes(perfilAtual)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
