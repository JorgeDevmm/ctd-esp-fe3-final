import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContext, useEffect, useContext, useReducer } from "react";

export const initialState = { theme: "", favIds: [], language: "" };

export const GlobalContext = createContext(undefined);

const favIdsKey = "favIds";
const darkModeKey = "darkMode";
const languageKey = "language";

const reducer = (state, action) => {
  const theme = state.theme === "light" ? "dark" : "light";

  switch (action.type) {
    // Dark Mode
    case "INITIAL_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_THEME":
      localStorage.setItem(darkModeKey, JSON.stringify({ theme }));
      return { ...state, theme: theme };

    // Favorites
    case "ADD_FAV":
      if (state.favIds.includes(action.payload)) {
        console.warn("Fav ID already exists:", action.payload);
        return state;
      }

      return {
        ...state,
        favIds: [...state.favIds, action.payload],
      };
    case "REMOVE_FAV":
      const index = state.favIds.findIndex((favId) => favId === action.payload);
      if (index === -1) {
        console.warn("Fav ID not found:", action.payload);
        return state;
      }

      const remainingFavIds = state.favIds.filter(
        (favId) => favId !== action.payload
      );
      return {
        ...state,
        favIds: remainingFavIds,
      };
    case "LOAD_FAVS":
      return {
        ...state,
        favIds: action.payload,
      };

    // Language
    case "SET_LANGUAGE":
      localStorage.setItem(
        languageKey,
        JSON.stringify({ language: action.payload })
      );
      return { ...state, language: action.payload };

    default:
      return state;
  }
};

export const Context = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo
  const [state, dispatch] = useReducer(reducer, initialState);

  const { favIds, theme, language } = state;

  const notifyAdding = (name) => toast(`${name} added to favs`);
  const notifyRemoving = (name) => toast(`${name} removed from favs`);

  useEffect(() => {
    const tempTheme = localStorage.getItem(darkModeKey);
    dispatch({
      type: "INITIAL_THEME",
      payload: tempTheme ? JSON.parse(tempTheme).theme : "light",
    });

    const tempLanguage = localStorage.getItem(languageKey);

    setLanguage(tempTheme ? JSON.parse(tempLanguage).language : "EN")

    loadFavs();
  }, []);

  // THEME
  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  // FAVORITES
  const addFav = async (id) => {
    if (!id) {
      console.error("Invalid fav ID");
      return;
    }

    dispatch({ type: "ADD_FAV", payload: id });

    try {
      await saveFavs(favIds);
    } catch (error) {
      console.error("Error saving fav IDs:", error);
    }
  };

  const removeFav = async (id) => {
    if (!id) {
      console.error("Invalid fav ID");
      return;
    }

    dispatch({ type: "REMOVE_FAV", payload: id });

    try {
      await saveFavs(favIds);
    } catch (error) {
      console.error("Error saving fav IDs:", error);
    }
  };

  const checkIfIsFavorite = (id) => {
    return favIds.includes(id);
  };

  const loadFavs = async () => {
    const storedFavIds = localStorage.getItem(favIdsKey);

    if (storedFavIds) {
      try {
        const parsedFavIds = JSON.parse(storedFavIds);
        dispatch({ type: "LOAD_FAVS", payload: parsedFavIds });
      } catch (error) {
        console.error("Error parsing stored fav IDs:", error);
      }
    } else {
      saveFavs([]);
    }
  };

  const saveFavs = async (favIdsToSave) => {
    try {
      localStorage.setItem(favIdsKey, JSON.stringify(favIdsToSave));
    } catch (error) {
      console.error("Error saving fav IDs:", error);
    }
  };

  // LANGUAGE
  const setLanguage = (la) => {
    dispatch({ type: "SET_LANGUAGE", payload: la });
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,

        favIds,
        addFav,
        removeFav,
        checkIfIsFavorite,
        notifyAdding,
        notifyRemoving,

        language,
        setLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
