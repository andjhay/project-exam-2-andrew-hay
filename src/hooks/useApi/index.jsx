import { useState, useEffect } from "react";
import { authFetch } from "../../utilities/authFetch";
import * as storage from "../../utilities/storage.js";

/**
 * API hook to fetch data uses the input of the URL to fetch data from.
 * @param {string} url path to desired data from API
 */
function useApi(url) {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState({ message: "", statuscode: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let token = storage.load("token");
  useEffect(() => {
    async function getData() {
      let fetchedData;
      try {
        setIsLoading(true);
        if (token === null) {
          fetchedData = await fetch(url);
        } else {
          fetchedData = await authFetch(url);
        }
        setData(await fetchedData.json());
      } catch (error) {
        console.log(error);
        const statusCode = fetchedData ? fetchedData.status : null;
        setErrorMsg({ message: error.message, statuscode: statusCode });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, token]);

  return { data, isLoading, isError, errorMsg };
}

export default useApi;
