import React from "react";
import { Link } from "react-router-dom";
import { deleteItem } from "../../utilities/delete";
import useUser from "../../hooks/useUser";

function UserBookings({ userName, bookings, userData, setUserData }) {
  const { user } = useUser();
  let loggedInUser = false;
  if (userName === user.name) {
    loggedInUser = true;
  }

  function handleDelete(id) {
    deleteItem(id, "/bookings");
    setUserData({
      ...userData,
      bookings: bookings.filter((booking) => booking.id !== id),
    });
  }

  return (
    <div className="m-5">
      <h2 className="font-subheader text-xl">Bookings</h2>
      <div>
        {bookings?.map((booking) => (
          <li key={booking.id}>
            {booking.name}
            {loggedInUser ? (
              <Link to={"/venuebook/" + booking.id}>
                <button className="m-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand">
                  Edit
                </button>
              </Link>
            ) : null}
            {loggedInUser ? (
              <button
                onClick={() => handleDelete(booking.id)}
                className="m-2 rounded-lg border-2 border-darkbrown bg-red-500 px-2 py-1 font-subheader text-white hover:border-yellowsand"
              >
                Delete
              </button>
            ) : null}
          </li>
        ))}
      </div>
    </div>
  );
}

export default UserBookings;
