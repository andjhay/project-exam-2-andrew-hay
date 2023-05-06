import PropTypes from "prop-types";
import React, { useRef, useMemo } from "react";
import { Marker } from "react-leaflet";

/**
 * @typedef {object} Props
 * @property {object} position Lat and Lng coordinates in an object.
 * @property {function} setPosition sets Lat and Lng coordinates to be used in form data.
 */

/**
 * draggable Marker component for using to pick a location position for venues.
 * @param {Props} props
 */
function DraggableMarker({ position, setPosition }) {
  DraggableMarker.propTypes = {
    position: PropTypes.object,
    setPosition: PropTypes.func,
  };
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
