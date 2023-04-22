import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";

function Account() {
  let { name } = useParams();
  const { data } = useApi(apiPath + "/profiles/" + name);
  return <div>account</div>;
}

export default Account;
