import PropTypes from "prop-types";
import React from "react";
import VenueCard from "../VenueCard";

function UserVenues({ userName, venues, userData, setUserData }) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {venues?.length > 0 ? (
        venues?.map((venue) => (
          <div key={venue.id} className="m-2">
            <VenueCard
              userName={userName}
              venue={venue}
              venues={venues}
              userData={userData}
              setUserData={setUserData}
            />
          </div>
        ))
      ) : (
        <p>No venues</p>
      )}
    </div>
  );
}

UserVenues.propTypes = {
  setUserData: PropTypes.any,
  userData: PropTypes.any,
  userName: PropTypes.any,
  venues: PropTypes.array,
};

export default UserVenues;
