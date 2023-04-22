import React from "react";
import { Marker, Popup } from "react-leaflet";

function MapMarker({ venue }) {
  return (
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}

export default MapMarker;
