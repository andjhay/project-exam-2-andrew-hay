import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../utilities/delete";
import useUser from "../../hooks/useUser";
import Logo from "../../assets/holidazelogotextlargebg.png";

function VenueCard({ venue, userName, venues, userData, setUserData }) {
  const { user } = useUser();
  const [img, setImg] = useState(0);
  const navigate = useNavigate();
  let loggedInUser = false;
  if (userName === user.name && user.name !== undefined) {
    loggedInUser = true;
  }

  function handleDelete(id) {
    deleteItem(id, "/venues");
    setUserData({
      ...userData,
      venues: venues.filter((venue) => venue.id !== id),
    });
  }

  let mediaCount = venue.media.length;

  function handleClickAdd() {
    if (img === mediaCount - 1) {
      setImg(0);
    } else {
      setImg(img + 1);
    }
  }

  function handleClickRemove() {
    if (img - 1 < 0) {
      setImg(mediaCount - 1);
    } else {
      setImg(img - 1);
    }
  }

  return (
    <div className="flex flex-col rounded-lg border font-paragraph">
      <div className="flex basis-1/2 items-center justify-center">
        <div className="me-auto basis-1/12">
          <button className={mediaCount <= 1 ? "pointer-events-none opacity-25" : ""} onClick={handleClickRemove}>
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z" />
            </svg>
          </button>
        </div>
        <div className="basis-10/12">
          <img
            className="card-img m-auto rounded-b-md shadow"
            src={mediaCount === 0 ? Logo : venue.media[img]}
            alt={venue.name}
          />
        </div>
        <div className="ms-auto basis-1/12">
          <button className={mediaCount <= 1 ? "pointer-events-none opacity-25" : ""} onClick={handleClickAdd}>
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="m-3 flex grow basis-1/2 flex-col justify-end">
        <div className="mx-6">
          <h2 className="font-subheader text-xl">{venue.name}</h2>
          <p>
            NOK <b>{venue.price}</b> per night
          </p>
          <p>
            Guests: <b>{venue.maxGuests}</b>
          </p>
          <p>
            Rating: <b>{venue.rating === 0 ? "No Rating Yet" : venue.rating}</b>
          </p>
        </div>
        <div className="my-2 flex flex-wrap justify-center">
          <button onClick={() => navigate("/venue/" + venue.id)} className="main-button shadow">
            View Venues Bookings
          </button>
          {loggedInUser ? (
            <>
              <button onClick={() => navigate("/venueedit/" + venue.id)} className="main-button shadow">
                Edit Venue
              </button>
              <button
                onClick={() => handleDelete(venue.id)}
                className="main-button !bg-red-600 shadow hover:!bg-red-400 hover:!text-white"
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default VenueCard;
