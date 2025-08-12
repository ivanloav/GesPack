import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CustomSidebar } from "./sidebar";
import { Topbar } from "./Topbar";
import "./MainScreenLayout.css";
import { usePageTitle } from "../../hooks/usePageTitle";

export function ScreenLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleCollapse = (isCollapsed: boolean) => {
    setIsSidebarCollapsed(isCollapsed);
  };

  usePageTitle();

  return (
    <div className={`backgroundUser ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <Topbar className="topbar" />
      <CustomSidebar onToggleCollapse={handleToggleCollapse} />
      <main className="main-content">
        <Outlet />
      </main>
      <div className="footer">{/* <Footer /> */}</div>
    </div>
  );
}
