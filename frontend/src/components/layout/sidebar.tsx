import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import {
  FaGem,
  FaChartBar,
  FaShoppingCart,
  FaPalette,
  FaCalendar,
  FaFileAlt,
  FaHeart,
  FaChartPie,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import styled from "@emotion/styled";
import "./sidebar.css";

interface CustomSidebarProps {
  onToggleCollapse: (isCollapsed: boolean) => void;
}

export const CustomSidebar: React.FC<CustomSidebarProps> = ({
  onToggleCollapse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth >= 768 && window.innerWidth <= 1024
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 1024
  );

  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const [expandedNestedSubMenu, setExpandedNestedSubMenu] = useState<
    string | null
  >(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      if (width >= 768 && width <= 1024) {
        setIsCollapsed(true);
        setIsSidebarVisible(true);
      } else if (width > 1024) {
        setIsCollapsed(false);
        setIsSidebarVisible(true);
      } else if (width < 768) {
        setIsCollapsed(false);
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggleCollapse(newCollapsedState);
  };

  const toggleMobileSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSubMenuClick = (menuId: string) => {
    setExpandedSubMenu((prev) => {
      const newExpandedSubMenu = prev === menuId ? null : menuId;
      if (prev !== menuId) {
        setExpandedNestedSubMenu(null);
      }
      return newExpandedSubMenu;
    });
  };

  const handleNestedSubMenuClick = (nestedMenuId: string) => {
    setExpandedNestedSubMenu((prev) =>
      prev === nestedMenuId ? null : nestedMenuId
    );
  };

  return (
    <div
      className="dashboard-container"
      style={{ width: isCollapsed ? "80px" : "300px" }}
    >
      {isMobile && (
        <button className="hamburger-button" onClick={toggleMobileSidebar}>
          <FaBars />
        </button>
      )}
      <Sidebar
        className={`sidebar-container ${isCollapsed ? "collapsed" : ""} ${
          isMobile && isSidebarVisible ? "expanded" : "collapsed"
        }`}
        collapsed={isCollapsed && !isMobile}
        width={isMobile ? "100vw" : "300px"}
        collapsedWidth="80px"
        backgroundColor="#0c1b33"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            overflow: "visible",
          },
          ".ps-submenu-content": {
            backgroundColor: "#112546",
          },
        }}
      >
        <div className="sidebar-logo">
          <img
            src={`${import.meta.env.BASE_URL}${isCollapsed ? "GesPack-Icono.png" : "GesPack-Sidebar.png"}`}
            alt="Logo"
            style={{ width: isCollapsed ? "40px" : "120px" }}
          />
        </div>

        <Menu
          menuItemStyles={{
            button: ({ level, active }) => ({
              color: "#b6c1cd",
              fontSize: level === 0 ? "16px" : "14px",
              backgroundColor: active ? "#1a273a" : "transparent",
              "&:hover": {
                backgroundColor: "#1a273a",
              },
              paddingLeft: level === 1 ? "30px" : "20px",
            }),
          }}
        >
          {!isCollapsed && <h4 className="sidebar-section-title">GENERAL</h4>}

          <SubMenu
            icon={<FaGem size={isCollapsed ? 16 : 20} />}
            suffix={
              !isCollapsed && (
                <div style={{ display: "flex", gap: "4px" }}>
                  <Label color="#7e22ce">Hot</Label>
                  <Label color="#22c55e">Beta</Label>
                </div>
              )
            }
            label="Pedidos"
            open={expandedSubMenu === "pedidos"}
            onClick={() => handleSubMenuClick("pedidos")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Grabación de pedidos
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Modificación de pedidos
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Consulta de pedidos
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Anulación de pedidos
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Pedidos impagados
            </MenuItem>

            <SubMenu
              icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
              label="Correspondencia"
              open={expandedNestedSubMenu === "correspondencia"}
              onClick={() => handleNestedSubMenuClick("correspondencia")}
            >
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                Pie chart
              </MenuItem>
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                Line chart
              </MenuItem>
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                Bar chart
              </MenuItem>
            </SubMenu>
          </SubMenu>

          <MenuItem icon={<FaShoppingCart size={isCollapsed ? 16 : 20} />}>
            Cobro de pedidos
          </MenuItem>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            suffix={!isCollapsed && <Label color="#22c55e">Beta</Label>}
            label="Facturación"
            open={expandedSubMenu === "Facturación"}
            onClick={() => handleSubMenuClick("Facturación")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Pie chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Line chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Bar chart
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label="Clientes"
            open={expandedSubMenu === "Clientes"}
            onClick={() => handleSubMenuClick("Clientes")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Alta de clientes
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Modificación de clientes
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Baja de clientes
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Clientes participantes
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label="Acciones"
            open={expandedSubMenu === "Acciones"}
            onClick={() => handleSubMenuClick("Acciones")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Alta de acciones
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Modificación de acciones
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Baja de acciones
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label="Productos"
            open={expandedSubMenu === "Productos"}
            onClick={() => handleSubMenuClick("Productos")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Pie chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Line chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Bar chart
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label="Devoluciones"
            open={expandedSubMenu === "Devoluciones"}
            onClick={() => handleSubMenuClick("Devoluciones")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Pie chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Line chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Bar chart
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FaPalette size={isCollapsed ? 16 : 20} />}>
            Theme
          </MenuItem>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label="Listados"
            open={expandedSubMenu === "Listados"}
            onClick={() => handleSubMenuClick("Listados")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Pie chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Line chart
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              Bar chart
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FaShoppingCart size={isCollapsed ? 16 : 20} />}>
            Importar ficheros
          </MenuItem>

          {!isCollapsed && <h4 className="sidebar-section-title">ADMIN</h4>}

          <MenuItem
            icon={<FaFileAlt size={isCollapsed ? 16 : 20} />}
            suffix={!isCollapsed && <Label color="#22c55e">Beta</Label>}
          >
            Documentation
          </MenuItem>
          <MenuItem icon={<FaCalendar size={isCollapsed ? 16 : 20} />}>
            Calendar
          </MenuItem>
          <MenuItem icon={<FaHeart size={isCollapsed ? 16 : 20} />}>
            Examples
          </MenuItem>

          <div className="sidebar-footer">
            <FaGem size={32} color="#61dafb" />
            {!isCollapsed && (
              <p>Pro sidebar is also available as a react package</p>
            )}
            {!isCollapsed && (
              <div className="footer-button">
                <button>Stars</button>
                <span>1.7k</span>
              </div>
            )}
            {!isCollapsed && (
              <p style={{ fontWeight: "bold" }}>Check it out!</p>
            )}
          </div>
        </Menu>

        {!isMobile && (
          <button className="collapse-button" onClick={toggleSidebar}>
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        )}
      </Sidebar>
    </div>
  );
};

// Componente para las etiquetas de "Hot" y "Beta"
const Label = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
`;
