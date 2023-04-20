import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function VenuesMap({ data }) {
  return (
    <MapContainer className="z-0 flex-1" center={[40, 0]} zoom={2} minZoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[30.2, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default VenuesMap;
