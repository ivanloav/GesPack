// auth.js
import { NavigateFunction } from "react-router-dom"; // Importa los hooks useNavigate y useLocation de React Router

export const handleLogout = (navigate: NavigateFunction): void => {
  // Eliminar el token de localStorage o sessionStorage
  localStorage.removeItem("accessToken");

  // Si es necesario, también puedes hacer una petición al servidor para invalidar la sesión.
  // Por ejemplo:
  // fetch("/api/auth/logout", { method: "POST" });

  // Redirigir al usuario a la página de inicio de sesión
  //window.location.href = "/login";
  // Usa el hook useNavigate para redirigir
  navigate("/login", { state: { successMessage: "Sesión cerrada correctamente" } });
  window.location.reload();
};
