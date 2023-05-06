import PropTypes from "prop-types";
import React from "react";
import VenueCard from "../VenueCard";

/**
 * @typedef {object} Props
 * @property {string} userName name of the user used to determine if a user is logged in.
 * @property {object} venues the users venue data.
 * @property {object} userData all userData.
 * @property {function} setUserData function to update the user date to update elements on the page this component is used within.
 */

/**
 * Venue component to display a list of all venues the user manages.
 * @param {Props} props
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
