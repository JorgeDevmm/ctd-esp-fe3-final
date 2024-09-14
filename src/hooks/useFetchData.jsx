import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData(url) {
  const [data, setData] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const filteredData = (arr) => {
    if (arr === null) return data;

    const filtered = [...data].filter((value) => arr.includes(value.id));

    return filtered;
  };

  return { data, error, isLoading, filteredData };
}

export default useFetchData;
