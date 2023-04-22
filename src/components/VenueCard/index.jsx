import React, { useState } from "react";
import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  const [img, setImg] = useState(0);

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
        <div>
          <button className={mediaCount === 1 ? "pointer-events-none opacity-25" : ""} onClick={handleClickRemove}>
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z" />
            </svg>
          </button>
        </div>
        <div>
          <img className="card-img rounded shadow" src={venue.media[img]} alt={venue.name} />
        </div>
        <div>
          <button className={mediaCount === 1 ? "pointer-events-none opacity-25" : ""} onClick={handleClickAdd}>
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex grow basis-1/2 flex-col items-center justify-end">
        {venue.name}
        {venue.price}
        <Link to={"/venue/" + venue.id}>
          <button className="flex items-center rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand ">
            View Venue
          </button>
        </Link>
      </div>
    </div>
  );
}

export default VenueCard;
