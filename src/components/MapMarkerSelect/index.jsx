import React, { useRef, useMemo, useCallback, useState } from "react";
import { Marker, Popup } from "react-leaflet";

const center = {
  lat: 0,
  lng: 0,
};

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(marker.getLatLng())
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  

  return (
    <Marker draggable={draggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? "Marker is draggable" : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

export default DraggableMarker;