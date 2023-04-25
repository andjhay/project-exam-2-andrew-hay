import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteItem } from "../../utilities/delete";
import useUser from "../../hooks/useUser";

function VenueCard({ venue, userName, venues, userData, setUserData }) {
  const { user } = useUser();
  const [img, setImg] = useState(0);

  let loggedInUser = false;
  if (userName === user.name) {
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
    <div className="flex flex-col">
      <div className="flex basis-1/2 items-center justify-center">
        <div className="me-auto basis-1/12">
          <button className={mediaCount === 1 ? "pointer-events-none opacity-25" : ""} onClick={handleClickRemove}>
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z" />
            </svg>
          </button>
        </div>
        <div className="basis-10/12">
          <img className="card-img m-auto rounded-md shadow" src={venue.media[img]} alt={venue.name} />
        </div>
        <div className="ms-auto basis-1/12">
          <button className={mediaCount === 1 ? "pointer-events-none opacity-25" : ""} onClick={handleClickAdd}>
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="m-3 flex grow basis-1/2 flex-col justify-end">
        <h3>{venue.name}</h3>
        <p>
          NOK <b>{venue.price}</b> per night
        </p>
        <p>
          Guests: <b>{venue.maxGuests}</b>
        </p>
        <p>
          Rating: <b>{venue.rating === 0 ? "No Rating Yet" : venue.rating}</b>
        </p>
        <div className="flex justify-center">
          <Link to={"/venue/" + venue.id}>
            <button className="m-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand ">
              View Venue
            </button>
          </Link>
          {loggedInUser ? (
            <Link to={"/venuemanage/" + venue.id}>
              <button className="m-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand">
                Edit
              </button>
            </Link>
          ) : null}
          {loggedInUser ? (
            <button
              onClick={() => handleDelete(venue.id)}
              className="m-2 rounded-lg border-2 border-darkbrown bg-red-500 px-2 py-1 font-subheader text-white hover:border-yellowsand"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default VenueCard;
