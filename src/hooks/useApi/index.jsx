import { useState, useEffect } from "react";
import { authFetch } from "../../utilities/authFetch";
import * as storage from "../../utilities/storage.js";

function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let auth = storage.load("auth");

  useEffect(() => {
    async function getData() {
      let fetchedData;
      try {
        setIsLoading(true);
        setIsError(false);
        if (auth === null) {
          fetchedData = await (await fetch(url)).json();
        } else {
          fetchedData = await authFetch(url);
        }
        setData(fetchedData);
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
