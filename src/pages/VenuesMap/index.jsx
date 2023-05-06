import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "../../components/MapMarker";
import LoadingElement from "../../components/LoadingElement";
import ErrorElement from "../../components/Error";

/**
 * Venue map component displaying the venues list on a map, and rendering random locations for venues without lat and lng coordinates in the marker component.
 */
function VenuesMap() {
  const [allVenues, setAllVenues] = useState(false);
  const corner1 = Leaflet.latLng(-60, -175);
  const corner2 = Leaflet.latLng(90, 190);
  const bounds = Leaflet.latLngBounds(corner1, corner2);
  const { data, isLoading, isError, errorMsg } = useApi(apiPath + "/venues");

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError || data.errors) {
    return <ErrorElement errorMsg={errorMsg} data={data} />;
  }

  return (
    <>
      <div className="top-30 absolute z-10 w-full text-center">
        <button onClick={() => setAllVenues(!allVenues)} className="main-button">
          {allVenues ? "All Venues" : "Venues With Position"}
        </button>
      </div>
      <MapContainer
        className="z-0 flex-1"
        center={[45, 10]}
        zoom={3}
        minZoom={3}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((venue) =>
          allVenues || (venue.location.lat !== 0 && venue.location.lng !== 0) ? (
            <MapMarker key={venue.id} venue={venue} />
          ) : null
        )}
      </MapContainer>
    </>
  );
}

export default VenuesMap;
