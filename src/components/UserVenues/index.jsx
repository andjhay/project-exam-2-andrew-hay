import React from "react";
import VenueCard from "../VenueCard";

function UserVenues({ userName, venues, userData, setUserData }) {
  return (
    <div className="m-5">
      <h2 className="font-subheader text-xl">Venues</h2>
      <div className="flex flex-wrap">
        {venues?.map((venue) => (
          <VenueCard userName={userName} venue={venue} venues={venues} userData={userData} setUserData={setUserData}  />
        ))}
      </div>
    </div>
  );
}

export default UserVenues;
