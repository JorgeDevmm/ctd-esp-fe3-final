import { Link } from "react-router-dom";
import { routes } from "../Utils/routes";
import Select from "react-select";
//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
import darkModeTitle from "../assets/DarkModeTitle.png";
import lightModeTitle from "../assets/LightModeTitle.png";

import { LuSunMoon } from "react-icons/lu";
import { RiMoonFill } from "react-icons/ri";
import { useGlobalContext } from "../Context/global.context";
import {
  getCurrentLanguage,
  getCurrentLanguage_Obj,
  languageOptions,
  defaultOption,
} from "../Utils/languageUtils";

const Navbar = () => {
  const { theme, toggleTheme, language, setLanguage } = useGlobalContext();

  if (language === "") return;

  const currentLanguage = getCurrentLanguage(language);
  const { home, favs, contact } = currentLanguage.words;

  return (
    <nav className={`${theme === "dark" ? "dark-bg" : ""}`}>
      <Link className="nav-link" to={routes.home}>
        <img
          className="nav-icon"
          src={theme === "light" ? lightModeTitle : darkModeTitle}
          alt="Main image"
        />
      </Link>

      <div className="link-container">
        {/* Aqui deberan agregar los liks correspondientes a las rutas definidas */}
        <Link
          className={`nav-link ${theme === "dark" ? "dark-nav-link" : ""}`}
          to={routes.home}
        >
          {home}
        </Link>
        <Link
          className={`nav-link ${theme === "dark" ? "dark-nav-link" : ""}`}
          to={routes.favs}
        >
          {favs}
        </Link>
        <Link
          className={`nav-link ${theme === "dark" ? "dark-nav-link" : ""}`}
          to={routes.contact}
        >
          {contact}
        </Link>
        {/* Deberan implementar ademas la logica para cambiar de Theme con el button */}
        <button
          className={`nav-button ${theme === "dark" ? "light-button" : ""}`}
          onClick={() => toggleTheme()}
        >
          {theme === "dark" ? <LuSunMoon /> : <RiMoonFill />}
        </button>

        <Select
          options={languageOptions()}
          styles={{
            control: (base) => ({
              ...base,
              width: 120,
            }),
          }}
          defaultValue={() => defaultOption(language)}
          onChange={(selectedOption) => {
            getCurrentLanguage_Obj(selectedOption);
            setLanguage(selectedOption.value);
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
