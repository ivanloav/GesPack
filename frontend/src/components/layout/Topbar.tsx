import "./Topbar.css";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle"; // Importar el hook
import { handleLogout } from "../../hooks/chechAuth"; // Importar la función de logout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // ícono de salida

interface TopbarProps {
  className?: string;
}

export function Topbar({ className }: TopbarProps) {
  const navigate = useNavigate();
  const title = usePageTitle(); // Usar el hook para obtener el título

  const logout = () => {
    handleLogout(navigate);
  };

  return (
    <div className={`head flex ${className}`}>
      <div className="title">{title}</div>
      <div className="configButtons flex">
        <button className="btn btn-light logout-button" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" /> 
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
