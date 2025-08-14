import React, { useEffect, useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import { FaGlobe, FaTimes } from "react-icons/fa"; // ← Aquí usamos FaTimes
import "./SiteDropdown.css";

interface Site {
  siteId: number;
  siteName: string;
}

interface SiteDropdownProps {
  selectedSite: number | null;
  onSiteChange: (siteId: number | null) => void;
}

const SiteDropdown: React.FC<SiteDropdownProps> = ({ selectedSite, onSiteChange }) => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await fetch("/api/sites");
        const data = await res.json();
        setSites(data);
      } catch (error) {
        console.error("Error al cargar los sitios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return (
    <MenuItem>
      <div className="site-dropdown-container">
        <select
          value={selectedSite ?? ""}
          onChange={(e) => onSiteChange(Number(e.target.value))}
          className="site-dropdown"
        >
          <option value="" disabled>
            {loading ? "Cargando sitios..." : "Selecciona un sitio"}
          </option>
          {sites.map((site) => (
            <option key={site.siteId} value={site.siteId}>
              {site.siteName}
            </option>
          ))}
        </select>

        {selectedSite !== null && (
          <button
            className="clear-site-button"
            onClick={(e) => {
              e.stopPropagation();
              onSiteChange(null);
            }}
            title="Quitar selección"
          >
            <FaTimes className="clear-site-icon" />
          </button>
        )}
      </div>
    </MenuItem>
  );
};

export default SiteDropdown;