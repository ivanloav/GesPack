import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import {
  FaGem, FaChartBar, FaShoppingCart, FaPalette, FaCalendar,
  FaFileAlt, FaHeart, FaChartPie, FaChevronLeft, FaChevronRight, FaBars
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
  const [expandedNestedSubMenu, setExpandedNestedSubMenu] = useState<string | null>(null);

  const navigate = useNavigate();

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggleCollapse(newCollapsedState);
  };

  const toggleMobileSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const handleSubMenuClick = (menuId: string) => {
    setExpandedSubMenu(prev => {
      const next = prev === menuId ? null : menuId;
      if (prev !== menuId) setIsSidebarVisible(true);
      if (prev !== menuId) setExpandedNestedSubMenu(null);
      return next;
    });
  };

  const handleNestedSubMenuClick = (nestedMenuId: string) => {
    setExpandedNestedSubMenu(prev => (prev === nestedMenuId ? null : nestedMenuId));
  };

  const handleItemClick = (path: string) => {
    setExpandedSubMenu(null);
    setExpandedNestedSubMenu(null);
    navigate(path);
  };

  return (
    <div className="dashboard-container" style={{ width: isCollapsed ? "80px" : "300px" }}>
      {isMobile && (
        <button className="hamburger-button" onClick={toggleMobileSidebar} aria-label="Toggle sidebar">
          <FaBars />
        </button>
      )}

      <Sidebar
        className={`sidebar-container ${isCollapsed ? "collapsed" : ""} ${isMobile && isSidebarVisible ? "expanded" : "collapsed"}`}
        collapsed={isCollapsed && !isMobile}
        width={isMobile ? "100vw" : "300px"}
        collapsedWidth="80px"
        backgroundColor="#0c1b33"
        rootStyles={{
          [`.${sidebarClasses.container}`]: { overflow: "visible" },
          ".ps-submenu-content": { backgroundColor: "#112546" }
        }}
      >
        <div className="sidebar-logo">
          <img
            src={`${import.meta.env.BASE_URL}${isCollapsed ? "GesPack-Icono.png" : "GesPack-Sidebar.png"}`}
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

          <SubMenu
            icon={<FaGem size={isCollapsed ? 16 : 20} />}
            suffix={!isCollapsed && (
              <div style={{ display: "flex", gap: "4px" }}>
                <Label color="#7e22ce">{t("badges.hot")}</Label>
                <Label color="#22c55e">{t("badges.beta")}</Label>
              </div>
            )}
            label={t("menus.orders.label")}
            open={expandedSubMenu === "orders"}
            onClick={() => handleSubMenuClick("orders")}
          >
            <MenuItem
              icon={<FaChartPie size={isCollapsed ? 16 : 20} />}
              onClick={(e) => { e.stopPropagation(); handleItemClick("/user/order-entry"); }}
            >
              {t("menus.orders.entry")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.orders.edit")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.orders.query")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.orders.cancel")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.orders.unpaid")}
            </MenuItem>

            <SubMenu
              icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
              label={t("menus.orders.correspondence.label")}
              open={expandedNestedSubMenu === "correspondence"}
              onClick={() => handleNestedSubMenuClick("correspondence")}
            >
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                {t("menus.orders.correspondence.pie")}
              </MenuItem>
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                {t("menus.orders.correspondence.line")}
              </MenuItem>
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                {t("menus.orders.correspondence.bar")}
              </MenuItem>
            </SubMenu>
          </SubMenu>

          <MenuItem icon={<FaShoppingCart size={isCollapsed ? 16 : 20} />}>
            {t("menus.collect")}
          </MenuItem>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            suffix={!isCollapsed && <Label color="#22c55e">{t("badges.beta")}</Label>}
            label={t("menus.billing.label")}
            open={expandedSubMenu === "billing"}
            onClick={() => handleSubMenuClick("billing")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.billing.pie")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.billing.line")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.billing.bar")}
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label={t("menus.customers.label")}
            open={expandedSubMenu === "customers"}
            onClick={() => handleSubMenuClick("customers")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.customers.create")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.customers.edit")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.customers.delete")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.customers.participants")}
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label={t("menus.actions.label")}
            open={expandedSubMenu === "actions"}
            onClick={() => handleSubMenuClick("actions")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.actions.create")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.actions.edit")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.actions.delete")}
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label={t("menus.products.label")}
            open={expandedSubMenu === "products"}
            onClick={() => handleSubMenuClick("products")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.products.create")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.products.edit")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.products.delete")}
            </MenuItem>
          </SubMenu>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label={t("menus.refunds.label")}
            open={expandedSubMenu === "refunds"}
            onClick={() => handleSubMenuClick("refunds")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.refunds.pie")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.refunds.line")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.refunds.bar")}
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FaPalette size={isCollapsed ? 16 : 20} />}>
            {t("menus.theme")}
          </MenuItem>

          <SubMenu
            icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
            label={t("menus.reports.label")}
            open={expandedSubMenu === "reports"}
            onClick={() => handleSubMenuClick("reports")}
          >
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.reports.actions")}
            </MenuItem>
            <SubMenu
              icon={<FaChartBar size={isCollapsed ? 16 : 20} />}
              label={t("menus.reports.orders.label")}
              open={expandedNestedSubMenu === "listadoPedidos"}
              onClick={() => handleNestedSubMenuClick("listadoPedidos")}
            >
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                {t("menus.reports.orders.all")}
              </MenuItem>
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                {t("menus.reports.orders.byDate")}
              </MenuItem>
              <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
                {t("menus.reports.orders.bar")}
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.reports.line")}
            </MenuItem>
            <MenuItem icon={<FaChartPie size={isCollapsed ? 16 : 20} />}>
              {t("menus.reports.bar")}
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FaShoppingCart size={isCollapsed ? 16 : 20} />}>
            {t("menus.import")}
          </MenuItem>

          {!isCollapsed && <h4 className="sidebar-section-title">{t("sections.admin")}</h4>}

          <MenuItem icon={<FaFileAlt size={isCollapsed ? 16 : 20} />} suffix={!isCollapsed && <Label color="#22c55e">{t("badges.beta")}</Label>}>
            {t("menus.documentation")}
          </MenuItem>
          <MenuItem icon={<FaCalendar size={isCollapsed ? 16 : 20} />}>
            {t("menus.calendar")}
          </MenuItem>
          <MenuItem icon={<FaHeart size={isCollapsed ? 16 : 20} />}>
            {t("menus.examples")}
          </MenuItem>

          <div className="sidebar-footer">
            <FaGem size={32} color="#61dafb" />
            {!isCollapsed && <p>{t("footer.text1")}</p>}
            {!isCollapsed && (
              <div className="footer-button">
                <button>{t("footer.btn")}</button>
                <span>1.7k</span>
              </div>
            )}
            {!isCollapsed && <p style={{ fontWeight: "bold" }}>{t("footer.text2")}</p>}
          </div>
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