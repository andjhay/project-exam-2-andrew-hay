import PropTypes from "prop-types"
import React, { useRef, useMemo } from "react";
import { Marker } from "react-leaflet";

/**
 * draggable Marker component for using to pick a location position for venues.
 * @param {object} position Lat and Lng coordinates in an object.
 * @param {function} setPosition sets Lat and Lng coordinates to be used in form data.
 */
function DraggableMarker({ position, setPosition }) {
  DraggableMarker.propTypes = {
  position: PropTypes.object,
  setPosition: PropTypes.func
}
  console.log(typeof position)
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

export default DraggableMarker;
