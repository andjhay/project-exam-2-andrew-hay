import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteItem } from "../../utilities/delete";
import useUser from "../../hooks/useUser";

function UserBookings({ userName, bookings, userData, setUserData }) {
  const { user } = useUser();
  let loggedInUser = false;
  if (userName === user.name) {
    loggedInUser = true;
  }

  const navigate = useNavigate();

  function handleDelete(id) {
    deleteItem(id, "/bookings");
    setUserData({
      ...userData,
      bookings: bookings.filter((booking) => booking.id !== id),
    });
  }

  bookings?.sort((a, b) => {
    return new Date(a.dateFrom) - new Date(b.dateFrom);
  });

  return (
    <div className="flex flex-wrap justify-center md:justify-start ">
      {bookings?.length >= 1
        ? bookings?.map((booking) => {
            if (new Date().toISOString() <= booking.dateTo) {
              return (
                <div key={booking.id} className="m-2 rounded-lg border p-3">
                  Booking at: {booking.venue.name} - {booking.guests} guests from{" "}
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
            }
            return null;
          })
        : "No current bookings"}
    </div>
  );
}

export default UserBookings;
