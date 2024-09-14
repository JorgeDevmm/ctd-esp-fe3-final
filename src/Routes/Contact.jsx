import Form from "../Components/Form";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
import { useGlobalContext } from "../Context/global.context";
import { getCurrentLanguage } from "../Utils/languageUtils";
import { ToastContainer } from "react-toastify";

const Contact = () => {
  const { theme, language } = useGlobalContext();

  if (language === "") return;

  const currentLanguage = getCurrentLanguage(language);
  const { contactTitle, contactText } = currentLanguage.words;

  return (
    <div className={`layout min-height ${theme === "dark" ? "layout-bg" : ""}`}>
      <div className="contact-container">
        <h2>{contactTitle}</h2>
        <p>{contactText}</p>
      </div>
      <Form theme={theme} language={language} />
      <ToastContainer />
    </div>
  );
};

export default Contact;
