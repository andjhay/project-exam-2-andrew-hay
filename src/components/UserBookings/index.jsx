import React from "react";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";

function UserBookings({ userName }) {
  const { data } = useApi(apiPath + "/profiles/" + userName + "/bookings");
  return (
    <div className="flex m-5">
      <h2 className="font-subheader text-xl">Bookings</h2>
      <div>{data ? "Is Bookings" : "No Bookings"}</div>
    </div>
  );
}

export default UserBookings;
