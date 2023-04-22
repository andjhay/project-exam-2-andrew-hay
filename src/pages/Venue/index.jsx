import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";

function Venue() {
  let { id } = useParams();
  const { data } = useApi(apiPath + "/venues/" + id);
  return <div>Single Venue</div>;
}

export default Venue;
