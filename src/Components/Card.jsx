import doctorImage from "../assets/doctor.jpg";
import { Link } from "react-router-dom";
import { routes } from "../Utils/routes";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "../Context/global.context";
import { getCurrentLanguage } from "../Utils/languageUtils";
import { motion } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";
import { FaRegAddressBook } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";


const Card = ({ name, username, id }) => {
  const {
    theme,
    addFav,
    removeFav,
    checkIfIsFavorite,
    notifyAdding,
    notifyRemoving,
    language,
  } = useGlobalContext();

  if (language === "") return;

  const currentLanguage = getCurrentLanguage(language);
  const { addFV } = currentLanguage.words;

  const deleteFavorites = async (e) => {
    e.preventDefault();
    await removeFav(id);
    notifyRemoving(name);
  };

  const addFavourite = async (e) => {
    e.preventDefault();
    await addFav(id);
    notifyAdding(name);
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      initial={{ opacity: 0, scale: 0.5, y: 1000 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Link
        className={`card ${
          theme === "dark" ? "card-dark layout" : "layout-bg"
        }`}
        to={`${routes.detail}/${id}`}
      >
        <img src={doctorImage} alt={`avatar`} />
        {/* En cada card deberan mostrar en name - username y el id */}
        {/* No debes olvidar que la Card a su vez servira como Link hacia la pagina de detalle */}
        {/* Ademas deberan integrar la logica para guardar cada Card en el localStorage
         */}
        <div>
          <FaRegAddressBook size={20} />
          <p>{name}</p>
        </div>
        <div>
          <IoPersonOutline size={20} />
          <p>{username}</p>
        </div>
        <button
          onClick={async (e) => {
            if (checkIfIsFavorite(id)) await deleteFavorites(e);
            else await addFavourite(e);
          }}
          className={`favButton ${
            checkIfIsFavorite(id)
              ? theme === "dark"
                ? "isFavorite"
                : "isFavorite-dark"
              : theme === "dark"
              ? "isNotFavorite"
              : "isNotFavorite-dark"
          }`}
        >
          {checkIfIsFavorite(id) ? (
            <FaStar size={25} />
          ) : (
            <>
              <CiBookmarkCheck size={25} /> <p>{addFV}</p>
            </>
          )}
        </button>
      </Link>
    </motion.div>
  );
};

export default Card;
