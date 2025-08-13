import React from "react";
import { useTranslation } from "react-i18next";
import "./dashboard.css";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="dashboard-content">
      <h1>{t("title")}</h1>
      <div className="dashboard-description">
        <p>{t("description")}</p>
      </div>
    </div>
  );
};
