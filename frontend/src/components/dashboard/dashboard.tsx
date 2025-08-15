import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StatusCard from "./StatusCard";
import { fetchDashboardKpis, KpisResponse } from "../../api/Dashboard";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const navigate = useNavigate();

  const [kpis, setKpis] = useState<KpisResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const token = localStorage.getItem("token") ?? undefined;

 useEffect(() => {
  let mounted = true;

  const fetchData = async () => {
    try {
      const data = await fetchDashboardKpis(token); // ← sin siteId
      if (mounted) {
        setKpis(data);
        setErr(null);
      }
    } catch (e: any) {
      if (mounted) setErr(e?.message ?? 'Error');
    }
  };

  fetchData();                     // carga inicial
  const id = setInterval(fetchData, 15000); // auto‑refresh 15s

  return () => {
    mounted = false;
    clearInterval(id);
  };
}, [token]); // ← depende solo del token

  // manejadores para clicks (filtrar listas)
  const goOrders = (query: string) => () => navigate(`/orders?${query}`);
  const goProducts = (query: string) => () => navigate(`/products?${query}`);

  if (err) return <div style={{color:'crimson'}}>Error: {err}</div>;

  return (
    <div className="dashboard-content">
      <div className="dashboard-grid">
        <StatusCard
          title={t("card.orders.pendingInvoicing")}
          count={kpis?.ordersPendingInvoicing ?? 0}
          color="#8B0000"
          footerLabel={t("card.footer.orders")}
          onClick={goOrders("status=reserved")}
        />
        <StatusCard
          title={t("card.products.pendingInvoicing")}
          count={kpis?.productsPendingInvoicing ?? 0}
          color="#A52A2A"
          footerLabel={t("card.footer.products")}
          onClick={goProducts("pendingInvoicing=true")}
        />
        <StatusCard
          title={t("card.products.outOfStock")}
          count={kpis?.productsOutOfStock ?? 0}
          color="#D32F2F"
          footerLabel={t("card.footer.products")}
          onClick={goProducts("stock=0")}
        />
        <StatusCard
          title={t("card.orders.recorded")}
          count={kpis?.ordersRecorded ?? 0}
          color="#16A349"
          footerLabel={t("card.footer.orders")}
          onClick={goOrders("status=pending")}
        />
        <StatusCard
          title={t("card.orders.pendingPayment")}
          count={kpis?.ordersPendingPayment ?? 0}
          color="#FBBF24"
          footerLabel={t("card.footer.orders")}
          onClick={goOrders("paid=false")}
        />
        <StatusCard
          title={t("card.orders.invoiced")}
          count={kpis?.ordersInvoiced ?? 0}
          color="#F59E0B"
          footerLabel={t("card.footer.orders")}
          onClick={goOrders("status=invoiced")}
        />
      </div>
    </div>
  );
};