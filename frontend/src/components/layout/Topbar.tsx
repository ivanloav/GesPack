import "./Topbar.css";
import { useNavigate } from "react-router-dom";
//import { usePageTitle } from "../../hooks/usePageTitle";
import { handleLogout } from "../../hooks/chechAuth";
import { FaSignOutAlt } from "react-icons/fa";
import LanguageDropdown from "../LanguageDropdown"; // Asegúrate de que la ruta sea correcta
import { useTranslation } from "react-i18next";

interface TopbarProps {
  className?: string;
}

export function Topbar({ className = "" }: TopbarProps) {
  const navigate = useNavigate();
  // const title = usePageTitle();
  const { t } = useTranslation("sidebar"); // si quieres traducir el botón logout

  const logout = () => handleLogout(navigate);

  return (
    <div className={`head flex ${className}`}>
      {/*<div className="title">{title}</div>*/}

      <div className="configButtons">
        <div className="language-dropdown">
          <LanguageDropdown />
        </div>

        <button className="btn btn-light logout-button" onClick={logout}>
          <FaSignOutAlt size="lg" />
          <span style={{ marginLeft: 8 }}>{t("common.logout")}</span>
        </button>
      </div>
    </div>
  );
}