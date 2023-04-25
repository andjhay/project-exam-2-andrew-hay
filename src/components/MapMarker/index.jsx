import React from "react";
import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";

function MapMarker({ venue }) {
  function getRandomLat() {
    let min = Math.ceil(90);
    let max = Math.floor(-60);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomLng() {
    let min = Math.ceil(190);
    let max = Math.floor(-175);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <Marker
      position={
        venue.location.lat === 0 && venue.location.lng === 0
          ? [getRandomLat(), getRandomLng()]
          : [venue.location.lat, venue.location.lng]
      }
    >
      <Popup>
        {venue.name}
        <Link to={"/venue/" + venue.id}>
          <button className="mx-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand">
            View
          </button>
        </Link>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
