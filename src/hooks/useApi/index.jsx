import { useState, useEffect } from "react";
import { authFetch } from "../../utils/api/authFetch.js";

function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await authFetch(url);
        setData(fetchedData.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);

  return { data, isLoading, isError };
}

export default useApi;
