import PropTypes from "prop-types";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteItem } from "../../utilities/delete";
import useUser from "../../hooks/useUser";

/**
 * Bookings component to display a list of all bookings the user has current and upcoming filtering out bookings before the current date.
 * @param {string} userName name of the user used to determine if a user is logged in.
 * @param {object} bookings the users bookings data.
 * @param {object} userData all userData.
 * @param {function} setUserData function to update the user date to update elements on the page this component is used within.
 */
function UserBookings({ userName, bookings, userData, setUserData }) {
  UserBookings.propTypes = {
    bookings: PropTypes.array,
    setUserData: PropTypes.func,
    userData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    userName: PropTypes.string,
  };
  const { user } = useUser();
  let loggedInUser = false;
  if (userName === user.name) {
    loggedInUser = true;
  }

  const navigate = useNavigate();

  /**
   * Handles deleting a booking and updating the current session user data to display the information correctly on the page.
   * @param {string} id The selected bookings ID to pass to delete api call.
   */
  function handleDelete(id) {
    deleteItem(id, "/bookings");
    setUserData({
      ...userData,
      bookings: bookings.filter((booking) => booking.id !== id),
      _count: {
        ...userData._count,
        bookings: userData._count.bookings - 1,
      },
    });
  }

  bookings?.sort((a, b) => {
    return new Date(a.dateFrom) - new Date(b.dateFrom);
  });

  let filteredBookings = bookings?.filter((booking) => new Date(booking.dateTo) >= new Date());

  return (
    <div className="flex flex-wrap justify-center md:justify-start ">
      {filteredBookings?.length >= 1
        ? filteredBookings?.map((booking) => {
            return (
              <div key={booking.id} className="m-2 rounded-lg p-3 shadow-lg">
                Booking at: {booking.venue.name} - {booking.guests} {booking.guests > 1 ? "guests" : "guest"} from{" "}
                {new Date(booking.dateFrom).toLocaleString("en-GB").slice(0, 10)} to{" "}
                {new Date(booking.dateTo).toLocaleString("en-GB").slice(0, 10)}
                <div>
                  <button onClick={() => navigate("/venue/" + booking.venue.id)} className="main-button shadow">
                    View Venue
                  </button>
                  {loggedInUser ? (
                    <Link to={"/bookingedit/" + booking.venue.id + "/" + booking.id}>
                      <button className="main-button m-2 shadow">Edit Booking</button>
                    </Link>
                  ) : null}
                  {loggedInUser ? (
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="main-button m-2 !bg-red-600 shadow shadow hover:!bg-red-400 hover:!text-white"
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        : "No current bookings"}
    </div>
  );
}

export default UserBookings;
