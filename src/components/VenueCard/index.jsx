import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteItem } from "../../utilities/delete";
import useUser from "../../hooks/useUser";
import Logo from "../../assets/holidazelogotextlargebg.png";

/**
 * @typedef {object} Props
 * @property {string} id the venues individual ID
 * @property {object} venue data of a specific venue
 * @property {string} userName string value of the users user name, used to check if a user is logged in.
 * @property {userData} userData all the users current session data.
 * @property {function} setUserData function to update the current sessions user data when changes occur.
 * @property {array} venues list of all venues managed by the user to filter out a specific venue upon deletion.
 */

/**
 * Venue Card component used to display a venue to select either to view or to manage.
 * @param {Props} props
 */
function VenueCard({ venue: { price, rating, media, id, name, maxGuests }, userName, venues, userData, setUserData }) {
  VenueCard.propTypes = {
    setUserData: PropTypes.func,
    userData: PropTypes.object,
    userName: PropTypes.string,
    venue: PropTypes.object,
    venues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };
  const { user } = useUser();
  const [img, setImg] = useState(0);
  const navigate = useNavigate();
  const pageLocation = useLocation();
  let loggedInUser = false;
  if (userName === user.name && user.name !== undefined) {
    loggedInUser = true;
  }

  function handleDelete(id) {
    deleteItem(id, "/venues");
    setUserData({
      ...userData,
      venues: venues.filter((venue) => venue.id !== id),
      _count: {
        ...userData._count,
        venues: userData._count.venues - 1,
      },
    });
  }

  let mediaCount = media.length;

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

  function defaultSrc(img) {
    img.target.src = Logo;
  }

  return (
    <div className="flex flex-col rounded-lg border-2 border-gray-200 font-paragraph shadow-lg">
      <div className="flex basis-1/2 items-center justify-center">
        <div className="me-auto basis-1/12">
          <span
            className={mediaCount <= 1 ? "pointer-events-none opacity-25" : "h-fill cursor-pointer"}
            onClick={handleClickRemove}
          >
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z" />
            </svg>
          </span>
        </div>
        <div className="basis-10/12">
          <img
            className="card-img m-auto rounded-b-md shadow"
            src={mediaCount === 0 ? Logo : media[img]}
            onError={defaultSrc}
            alt={name}
          />
        </div>
        <div className="ms-auto basis-1/12">
          <span
            className={mediaCount <= 1 ? "pointer-events-none opacity-25" : "cursor-pointer"}
            onClick={handleClickAdd}
          >
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="m-3 flex grow basis-1/2 flex-col justify-end">
        <div className="mx-6">
          {name ? <h2 className="font-subheader text-xl">{name}</h2> : null}
          <p>
            NOK <b>{price}</b> per night
          </p>
          <p>
            Guests: <b>{maxGuests}</b>
          </p>
          <p>
            Rating: <b>{rating === 0 ? "No Rating Yet" : rating}</b>
          </p>
        </div>
        <div className="my-2 flex flex-wrap justify-center">
          <button onClick={() => navigate("/venue/" + id)} className="main-button shadow">
            {pageLocation.pathname.includes("account") && loggedInUser ? "Bookings at your Venue" : "View Venue"}
          </button>
          {loggedInUser ? (
            <>
              <button onClick={() => navigate("/venueedit/" + id)} className="main-button shadow">
                Edit Venue
              </button>
              <button
                onClick={() => handleDelete(id)}
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
