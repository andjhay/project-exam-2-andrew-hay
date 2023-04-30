import PropTypes from "prop-types"
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
    [setPosition]
  );

  return <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}></Marker>;
}

DraggableMarker.propTypes = {
  position: PropTypes.any,
  setPosition: PropTypes.func
}

export default DraggableMarker;
