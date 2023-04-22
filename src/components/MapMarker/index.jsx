import React from "react";
import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";

function MapMarker({ venue }) {
  return (
    <Marker position={[venue.location.lat, venue.location.lng]}>
      <Popup>
        {venue.name}
        <Link to={"/venue/" + venue.id}>
          <button className="m-auto rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand">
            View
          </button>
        </Link>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
