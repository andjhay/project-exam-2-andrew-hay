import React from "react";
import VenueCard from "../VenueCard";

function UserVenues({ userName, venues, userData, setUserData }) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {venues?.map((venue) => (
        <div key={venue.id} className="m-2">
          <VenueCard userName={userName} venue={venue} venues={venues} userData={userData} setUserData={setUserData} />
        </div>
      ))}
    </div>
  );
}

export default UserVenues;
