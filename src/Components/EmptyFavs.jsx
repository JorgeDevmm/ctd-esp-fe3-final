import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../Utils/languageUtils";
import animationAsset from "../assets/Hamster.json";
import Lottie from "lottie-react";
import { routes } from "../Utils/routes";

export const EmptyFavs = ({ theme, language }) => {
  const currentLanguage = getCurrentLanguage(language);
  const { noFavsYet, goToHome, noFavsText } = currentLanguage.words;
  const style = {
    height: 600,
  };

  return (
    <div className="error-container">
      <p>{noFavsYet}</p>
      {/* Img */}
      <Lottie animationData={animationAsset} style={style} />

      <Link
        className={`${theme === "dark" ? "dark-nav-link" : ""}`}
        to={routes.home}
      >
        {goToHome}
      </Link>
      <p>{noFavsText}</p>
    </div>
  );
};
