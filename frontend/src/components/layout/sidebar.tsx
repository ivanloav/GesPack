import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import { RiDashboard2Line } from "react-icons/ri";
import {
  FaShoppingCart, FaFileAlt, FaChevronLeft, FaChevronRight, FaBars, 
  FaRegMoneyBillAlt, FaUsers, FaListUl, FaClipboardList, FaUndo, FaCogs, FaFileImport, FaUserCircle, FaChartLine
} from "react-icons/fa";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface CustomSidebarProps {
  onToggleCollapse: (isCollapsed: boolean) => void;
}

export const CustomSidebar: React.FC<CustomSidebarProps> = ({ onToggleCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth >= 768 && window.innerWidth <= 1024
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth >= 1024
  );

  // 👇 Usamos el namespace 'sidebar' y opcionalmente un keyPrefix si quieres
  const { t } = useTranslation("sidebar");

  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  //const [expandedNestedSubMenu, setExpandedNestedSubMenu] = useState<string | null>(null);

  const navigate = useNavigate();

  const applySidebarWidthVar = (collapsed: boolean, mobile: boolean) => {
    const w = mobile ? "0px" : (collapsed ? "80px" : "300px");
    document.documentElement.style.setProperty("--sidebar-w", w);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);

      if (width >= 768 && width <= 1024) {
        setIsCollapsed(true);
        setIsSidebarVisible(true);
        applySidebarWidthVar(true, mobile);
      } else if (width > 1024) {
        setIsCollapsed(false);
        setIsSidebarVisible(true);
        applySidebarWidthVar(false, mobile);
      } else if (width < 768) {
        setIsCollapsed(false);
        setIsSidebarVisible(false);
        applySidebarWidthVar(false, mobile);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggleCollapse(newCollapsedState);
    applySidebarWidthVar(newCollapsedState, isMobile);
  };

  const toggleMobileSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const handleSubMenuClick = (menuId: string) => {
    setExpandedSubMenu(prev => {
      const next = prev === menuId ? null : menuId;
      if (prev !== menuId) setIsSidebarVisible(true);
      //if (prev !== menuId) setExpandedNestedSubMenu(null);
      return next;
    });
  };
/*
  const handleNestedSubMenuClick = (nestedMenuId: string) => {
    setExpandedNestedSubMenu(prev => (prev === nestedMenuId ? null : nestedMenuId));
  };
*/
  const handleItemClick = (path: string) => {
    setExpandedSubMenu(null);
  //  setExpandedNestedSubMenu(null);
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {isMobile && (
        <button className="hamburger-button" onClick={toggleMobileSidebar} aria-label="Toggle sidebar">
          <FaBars />
        </button>
      )}

      <Sidebar
        className={`sidebar-container ${isMobile ? (isSidebarVisible ? "expanded" : "collapsed") : ""}`}
        collapsed={isCollapsed && !isMobile}
        width={isMobile ? "100vw" : "300px"}
        collapsedWidth="80px"
        backgroundColor="#0c1b33"
        rootStyles={{
          // Anima el elemento que realmente recibe el width del componente
          [`.${sidebarClasses.root}`]: {
            transition: "width 0.3s ease-in-out",
            willChange: "width"
          },
          [`.${sidebarClasses.container}`]: {
            overflow: "visible"
          },
          ".ps-submenu-content": { backgroundColor: "#112546" }
        }}
      >
        <div className="sidebar-logo">
          <img
            src={`${import.meta.env.BASE_URL}${isCollapsed ? "images/GesPack-Icono.png" : "images/GesPack-Sidebar.png"}`}
            alt="Logo"
            style={{ width: isCollapsed ? "40px" : "120px" }}
            onClick={(e) => { e.preventDefault(); handleItemClick("/user/dashboard"); }}
          />
        </div>

        <Menu
          menuItemStyles={{
            button: ({ level, active }) => ({
              color: "#b6c1cd",
              fontSize: level === 0 ? "16px" : "14px",
              backgroundColor: active ? "#1a273a" : "transparent",
              "&:hover": { backgroundColor: "#1a273a" },
              paddingLeft: level === 1 ? "30px" : "20px"
            }),
          }}
        >
          {!isCollapsed && <h4 className="sidebar-section-title">{t("sections.general")}</h4>}
          
          <MenuItem
            icon={<RiDashboard2Line color="#fffb00ff" size={24} />}
            //suffix={!isCollapsed && <Label color="#22c55e">{t("badges.beta")}</Label>}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/dashboard"); }}
          >
            {t("menus.dashboard.label")}
          </MenuItem>

          <MenuItem
            icon={<FaClipboardList color="#ffffffff" size={24} />}
            suffix={!isCollapsed && (
              <div style={{ display: "flex", gap: "8px" }}>
                {/*<Label color="#7e22ce">{t("badges.hot")}</Label>
                <Label color="#22c55e">{t("badges.beta")}</Label>*/}
                <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>
              </div>
            )}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/order-list"); }}
          >
            {t("menus.orders.label")}
          </MenuItem>
          
          <MenuItem
            icon={<FaRegMoneyBillAlt color="#19b102ff" size={24} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            //suffix={!isCollapsed && <Label color="#22c55e">{t("badges.beta")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/billing-list"); }}
          >
            {t("menus.billing.label")}
          </MenuItem>

          <MenuItem
            icon={<FaUsers color="#00fff7ff" size={24} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/customer-list"); }}
          >
            {t("menus.customers.label")}
          </MenuItem>

          <MenuItem
            icon={<FaListUl color="#857d7dff" size={24} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/action-list"); }}
          >
            {t("menus.actions.label")}
        </MenuItem>

          <MenuItem
            icon={<FaShoppingCart color="#b94c03d7" size={24} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/product-list"); }}
          >
            {t("menus.products.label")}
          </MenuItem>

          <MenuItem
            icon={<FaUndo color="#aeb102ff" size={24} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/return-list"); }}
          >
            {t("menus.returns.label")}
          </MenuItem>

          <MenuItem 
            icon={<FaFileImport color="#e34f4fff" size={24} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/import-list"); }}
          >
            {t("menus.import")}
          </MenuItem>

          {!isCollapsed && <h4 className="sidebar-section-title">{t("sections.admin")}</h4>}

          <SubMenu
            icon={<FaUserCircle color="#8c00ffff" size={24} />}
            label={t("menus.admin.users.label")}
            open={expandedSubMenu === "users"}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={() => handleSubMenuClick("users")}
          >
            <MenuItem icon={<FaChartLine size={20} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/user-stats"); }}
            >
              {t("menus.admin.users.stats")}
            </MenuItem>
            <MenuItem icon={<FaUserCircle size={20} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/user-list"); }}
            >
              {t("menus.admin.users.label")}
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FaFileAlt color="#557ed7ff" size={24} />} 
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/documentation"); }}
          >
            {t("menus.documentation")}
          </MenuItem>

          <MenuItem icon={<FaCogs color="#4f544fff" size={24} />}
            suffix={!isCollapsed && <Label color="#ffa200ff">🚧 {t("badges.wip")}</Label>}
            onClick={(e) => { e.stopPropagation(); handleItemClick("/user/settings"); }}
          >
            {t("menus.admin.settings.label")}
          </MenuItem>
        </Menu>

        {!isMobile && (
          <button className="collapse-button" onClick={toggleSidebar} aria-label="Collapse sidebar">
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        )}
      </Sidebar>
    </div>
  );
};

const Label = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
`;