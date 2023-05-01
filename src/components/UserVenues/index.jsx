import PropTypes from "prop-types";
import React from "react";
import VenueCard from "../VenueCard";

/**
 * Venue component to display a list of all venues the user manages.
 * @param {string} userName name of the user used to determine if a user is logged in.
 * @param {object} venues the users venue data.
 * @param {object} userData all userData.
 * @param {function} setUserData function to update the user date to update elements on the page this component is used within.
 */
function UserVenues({ userName, venues, userData, setUserData }) {
  UserVenues.propTypes = {
    venues: PropTypes.array,
    setUserData: PropTypes.func,
    userData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    userName: PropTypes.string,
  };
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

export default UserVenues;
