import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";

/**
 * @typedef {object} Props
 * @property {object} venue - Venue data that provides location information for the map marker.
 * @property {object} venue.location - Location information for the venue, including latitude and longitude.
 * @property {string} venue.name - Name of the venue.
 * @property {string} venue.id - ID of the venue.
 */

/**
 * A marker component that displays location information for a venue.
 * @component
 * @param {Props} props
 */
function MapMarker({ venue: { location, name, id } }) {
  MapMarker.propTypes = {
    venue: PropTypes.shape({
      location: PropTypes.object,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  // Due to lack of location data making the map boring randomized locations for venues with default 0,0
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
        location.lat === 0 && location.lng === 0 ? [getRandomLat(), getRandomLng()] : [location.lat, location.lng]
      }
    >
      <Popup>
        {name}
        <Link to={"/venue/" + id}>
          <button className="mx-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand">
            View
          </button>
        </Link>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
