import { useGlobalContext } from "../Context/global.context";
import { getCurrentLanguage } from "../Utils/languageUtils";
import Lottie from "lottie-react";
// import animationAsset from "../assets/NotFound.json";
// import animationAsset from "../assets/Hamster.json";
import animationAsset from "../assets/Robot404.json";

const Error = () => {
  const { theme, language } = useGlobalContext();

  const style = {
    height: 600,
  };

  if (language === "") return;

  const currentLanguage = getCurrentLanguage(language);
  const { error404 } = currentLanguage.words;

  return (
    <div className={`layout min-height ${theme === "dark" && "layout-bg"}`}>
      <h1>{error404}</h1>

      <Lottie animationData={animationAsset} style={style} />
    </div>
  );
};

export default Error;
