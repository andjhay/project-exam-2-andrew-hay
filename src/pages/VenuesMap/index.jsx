import React from "react";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "../../components/MapMarker";
import DraggableMarker from "../../components/MapMarkerSelect";

function VenuesMap() {
  const corner1 = Leaflet.latLng(-60, -175);
  const corner2 = Leaflet.latLng(90, 190);
  const bounds = Leaflet.latLngBounds(corner1, corner2);
  const { data } = useApi(apiPath + "/venues");
  return (
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
      {data?.map((venue) => (
        <MapMarker key={venue.id} venue={venue} />
      ))}
    </MapContainer>
  );
}

export default VenuesMap;
