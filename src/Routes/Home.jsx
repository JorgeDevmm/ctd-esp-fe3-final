import Card from "../Components/Card";
import useFetchData from "../hooks/useFetchData";
//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
import { Loader } from "../Components/Loader";
import { useGlobalContext } from "../Context/global.context";
import { ToastContainer } from "react-toastify";
import { getCurrentLanguage } from "../Utils/languageUtils";

const Home = () => {
  const { theme, language } = useGlobalContext();

  const { data, error, isLoading } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (language === "") return;

  const currentLanguage = getCurrentLanguage(language);
  const { home } = currentLanguage.words;

  if (isLoading) {
    return (
      <Loader
        theme={theme}
        color={`${theme === "dark" ? "#ededed" : "#303030"}`}
        loading={isLoading}
        size={150}
      />
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className={`layout min-height ${theme === "dark" && "layout-bg"}`}>
      <h1>{home}</h1>
      <div className="card-grid">
        {/* Aqui deberias renderizar las cards */}
        {data.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            username={item.username}
            id={item.id}
          />
        ))}
      </div>
      <ToastContainer />
    </main>
  );
};

export default Home;
