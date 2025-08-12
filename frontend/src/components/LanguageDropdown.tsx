import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageDropdown.css";

type Lang = { code: string; flag: string };
const LANGS: Lang[] = [
  { code: "es", flag: "/flags/es.svg" },
  { code: "fr", flag: "/flags/fr.svg" },
  { code: "en", flag: "/flags/en.svg" },
];

export default function LanguageDropdown() {
  const { i18n, t } = useTranslation("lang");
  const current = (i18n.resolvedLanguage || i18n.language || "es").slice(0, 2);
  const currentLang = LANGS.find(l => current.startsWith(l.code)) || LANGS[0];

  const [open, setOpen] = useState(false);

  const change = async (code: string) => {
    await i18n.changeLanguage(code);
    setOpen(false); // 👈 se cierra al seleccionar
  };

  return (
    <div
      className="lang-dd"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="lang-dd__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        <img src={currentLang.flag} alt="" className="lang-dd__flag" />
        <span className="lang-dd__label">{t(currentLang.code)}</span>
        <span className="lang-dd__chev">▼</span>
      </button>

      {open && (
        <ul role="listbox" className="lang-dd__menu">
          {LANGS.map((l) => (
            <li
              key={l.code}
              role="option"
              className="lang-dd__item"
              onClick={() => change(l.code)}
            >
              <img src={l.flag} alt="" className="lang-dd__flag" />
              <span>{t(l.code)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}