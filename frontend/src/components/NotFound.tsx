import { useNavigate } from "react-router-dom";
import "./NotFound.css"; // si quieres estilos

export function NotFound() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken"); // ajusta si usas otro nombre

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/user/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <button onClick={handleClick} className="btn">
        Volver al inicio
      </button>
    </div>
  );
}