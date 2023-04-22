import { useState, useEffect } from "react";
import { authFetch } from "../../utilities/authFetch";
import * as storage from "../../utilities/storage.js";

function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let token = storage.load("token");

  useEffect(() => {
    async function getData() {
      let fetchedData;
      try {
        setIsLoading(true);
        setIsError(false);
        if (token === null) {
          fetchedData = await fetch(url);
        } else {
          fetchedData = await authFetch(url);
        }
        setData(await fetchedData.json());
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, token]);

  return { data, isLoading, isError };
}

export default useApi;
