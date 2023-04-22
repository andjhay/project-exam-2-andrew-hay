import React from "react";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";

function UserVenues({ userName }) {
  const { data } = useApi(apiPath + "/profiles/" + userName + "/venues");
  return (
    <div className="m-5 flex">
      <h2 className="font-subheader text-xl">Venues</h2>
      <div>{data ? "Is Bookings" : "No Bookings"}</div>
    </div>
  );
}

export default UserVenues;
