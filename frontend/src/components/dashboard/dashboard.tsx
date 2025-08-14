import React from "react";
import { useTranslation } from "react-i18next";
import StatusCard from "./StatusCard";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="dashboard-content">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        <StatusCard
          title={t("card.orders.pendingInvoicing")}
          count={0}
          color="#8B0000"
          footerLabel={t("card.footer.orders")}
        />
        <StatusCard
          title={t("card.products.pendingInvoicing")}
          count={0}
          color="#A52A2A"
          footerLabel={t("card.footer.products")}
        />
        <StatusCard
          title={t("card.products.outOfStock")}
          count={0}
          color="#D32F2F"
          footerLabel={t("card.footer.products")}
        />
        <StatusCard
          title={t("card.orders.recorded")}
          count={0}
          color="#16A349"
          footerLabel={t("card.footer.orders")}
        />
        <StatusCard
          title={t("card.orders.pendingPayment")}
          count={0}
          color="#FBBF24"
          footerLabel={t("card.footer.orders")}
        />
        <StatusCard
          title={t("card.orders.invoiced")}
          count={0}
          color="#FBBF24"
          footerLabel={t("card.footer.orders")}
        />
      </div>
    </div>
      );
};
