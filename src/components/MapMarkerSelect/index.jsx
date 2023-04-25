import React, { useRef, useMemo } from "react";
import { Marker } from "react-leaflet";

function DraggableMarker({ position, setPosition }) {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}></Marker>;
}

export default DraggableMarker;
