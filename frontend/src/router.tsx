// src/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ScreenLayout } from "./components/layout/MainScreenLayout";

import { LoginForm } from "./components/login/loginForm";
import { PrivateRoute } from "./components/PrivateRoute";

import { Dashboard } from "./components/dashboard/dashboard";
import { OrderEntry } from "./components/orders/orderEntry";
// import { Billing } from "./components/billing/Billing";
// import { Customers } from "./components/customers/Customers";
// import { CustomerDetail } from "./components/customers/CustomerDetail";
import { NotFound } from "./components/NotFound"; // crea este si no lo tienes

export const router = createBrowserRouter(
  [
    // RUTAS PÚBLICAS
    {
      path: "/",
      element: <Navigate to="/login" replace />
    },
    {
      path: "/login",
      element: <LoginForm />,
      handle: { crumb: (t: any) => ({ label: t("breadcrumb:login") }) },
    },
    // RUTAS PROTEGIDAS (envueltas por PrivateRoute)
    {
      element: <PrivateRoute />,          // protege todo lo de abajo
      errorElement: <NotFound />,         // fallback de errores/404 dentro de este árbol
      children: [
        {
          path: "/",
          element: <ScreenLayout />,      // layout con sidebar/topbar/breadcrumbs
          handle: { 
            crumb: () => ({ key: "breadcrumb:home", icon: FaHome, to: "/user/dashboard" }), 
            titleKey: "titles:dashboard"
          },
          children: [
            // Rutas hijas protegidas
            {
              path: "user/dashboard",
              element: <Dashboard />,
              handle: { crumb: () => ({ key: "breadcrumb:dashboard" }), titleKey: "titles:dashboard" },
            },
            {
              path: "user/order-entry",
              element: <OrderEntry />,
              handle: { crumb: () => ({ key: "breadcrumb:menus.orders.entry" }) },
            },
            // {
            //   path: "user/billing",
            //   element: <Billing />,
            //   handle: { crumb: (t: any) => ({ label: t("sidebar:menus.billing.label") }) },
            // },
            // {
            //   path: "customers",
            //   element: <Customers />,
            //   handle: { crumb: (t: any) => ({ label: t("sidebar:menus.customers.label") }) },
            // },
            // {
            //   path: "customers/:id",
            //   element: <CustomerDetail />,
            //   handle: {
            //     crumb: (t: any, params: any) => ({
            //       label: t("breadcrumb.customerDetail", { id: params.id }),
            //     }),
            //   },
            // },
            { path: "*", element: <NotFound /> }, // catch-all protegido
          ],
        },
      ],
    },

    // Catch-all global para cualquier otra cosa (fuera de PrivateRoute)
    { path: "*", element: <NotFound /> },
  ],
  // Si despliegas bajo subcarpeta (Vite base), descomenta:
  // { basename: import.meta.env.BASE_URL }
);