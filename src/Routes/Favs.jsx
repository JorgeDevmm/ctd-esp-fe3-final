import Card from "../Components/Card";
//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
import { useGlobalContext } from "../Context/global.context";
import useFetchData from "../hooks/useFetchData";
import { Loader } from "../Components/Loader";
import { ToastContainer } from "react-toastify";
import { getCurrentLanguage } from "../Utils/languageUtils";
import { EmptyFavs } from "../Components/EmptyFavs";

const Favs = () => {
  const { theme, favIds, language } = useGlobalContext();

  const { filteredData, error, isLoading } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (language === "") return;

  const currentLanguage = getCurrentLanguage(language);
  const { dentistFavs } = currentLanguage.words;

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
    <div className={`layout min-height ${theme === "dark" && "layout-bg"}`}>
      <h1>{dentistFavs}</h1>
      <div className="card-grid">
        {/* este componente debe consumir los destacados del localStorage */}
        {/* Deberan renderizar una Card por cada uno de ellos */}

        {favIds.length > 0 &&
          filteredData(favIds).map((item) => (
            <Card
              key={item.id}
              name={item.name}
              username={item.username}
              id={item.id}
              item={item}
            />
          ))}

        {favIds.length <= 0 && <EmptyFavs language={language} theme={theme} />}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Favs;
