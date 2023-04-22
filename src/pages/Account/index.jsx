import React from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import Logo from "../../assets/holidazelogosmallblack.png";
import UserBookings from "../../components/UserBookings";
import UserVenues from "../../components/UserVenues";

function Account() {
  let { userName } = useParams();
  const { data } = useApi(apiPath + "/profiles/" + userName);
  let userData = data;
  const { name, avatar, email, venueManager, _count } = userData;
  console.log(data);
  return (
    <div>
      <h1 className="m-2 text-center font-header text-3xl">Account</h1>
      <div className="flex min-w-full flex-col sm:flex-row">
        <div className="m-5 flex basis-1/2 justify-center sm:justify-end">
          <img className="max-h-60" src={avatar ? avatar : Logo} alt="user avatar" />
        </div>
        <div className="m-5 basis-1/2 ">
          <h2>Account Details</h2>
          <p>Username: {name}</p>
          <p>Email: {email}</p>
          <p>Account Type: {venueManager ? "Manager" : "Customer"}</p>
          <p>Venues: {_count?.venues}</p>
          <p>Bookings: {_count?.bookings}</p>
          <Link to="/venuemanage">
            <button className="w-50 my-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand ">
              Create New Venue
            </button>
          </Link>
        </div>
      </div>
      <UserBookings userName={userName} />
      <UserVenues userName={userName} />
    </div>
  );
}

export default Account;
