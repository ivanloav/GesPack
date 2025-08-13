import { useState } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CustomSidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import Breadcrumbs from "../Breadcrumbs";
import "./MainScreenLayout.css";

export function ScreenLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { t } = useTranslation(["titles", "translation", "sidebar", "breadcrumb"]);
  const matches = useMatches();

  // título de la página desde las rutas (handle.titleKey o handle.title)
  const last = matches[matches.length - 1];
  const title =
    (last?.handle as any)?.titleKey
      ? t((last?.handle as any).titleKey)
      : (last?.handle as any)?.title || "";

  return (
    <div className={`backgroundUser ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <Topbar className="topbar" />
      <div className="layout-flex">
        <CustomSidebar onToggleCollapse={(v) => setIsSidebarCollapsed(v)} />

        <main className="main-content">
          <header className="page-header">
            {title && <h1 className="page-title">{title}</h1>}
            <Breadcrumbs />
          </header>

          <section className="page-body">
            <Outlet />
          </section>
        </main>

        <div className="footer">{/* <Footer /> */}</div>
      </div>
    </div>
  );
}