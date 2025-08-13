import { Link, useMatches } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Breadcrumbs.css";

type Crumb = {
  key?: string;                         // i18n key (p. ej. "breadcrumb:home")
  label?: string;                       // fallback: texto literal si no usas key
  Icon?: React.ComponentType<any>;
  to?: string;                          // destino explícito (opcional)
  toComputed: string;                   // destino inferido del match
};

export default function Breadcrumbs() {
  const matches = useMatches();
  const { t } = useTranslation(["breadcrumb", "sidebar", "translation"]);

  const crumbs: Crumb[] = matches
    .filter((m) => m.handle && typeof (m.handle as any).crumb === "function")
    .map((m) => {
      // El router puede devolver { key, icon, to } o { label, icon, to }
      const { key, label, icon: Icon, to } = (m.handle as any).crumb() as {
        key?: string;
        label?: string;
        icon?: React.ComponentType<any>;
        to?: string;
      };

      const toComputed =
        (m as any).pathname || (m as any).pathnameBase || "/";

      return { key, label, Icon, to, toComputed };
    });

  if (!crumbs.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ul>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          const text = c.key ? t(c.key) : (c.label ?? "");
          const linkTo = c.to ?? c.toComputed;

          return (
            <li key={linkTo} className={last ? "current" : ""}>
              {!last ? (
                <Link to={linkTo}>
                  {c.Icon ? <c.Icon className="crumb-icon" /> : null}
                  <span>{text}</span>
                </Link>
              ) : (
                <>
                  {c.Icon ? <c.Icon className="crumb-icon" /> : null}
                  <span>{text}</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}