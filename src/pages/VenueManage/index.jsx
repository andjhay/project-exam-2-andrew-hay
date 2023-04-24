import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "../../components/MapMarkerSelect";
import { createVenue } from "../../utilities/create";

const center = {
  lat: 0,
  lng: 0,
};

function VenueManage() {
  let { venueId } = useParams();
  const [position, setPosition] = useState(center);
  const corner1 = Leaflet.latLng(-60, -175);
  const corner2 = Leaflet.latLng(90, 190);
  const bounds = Leaflet.latLngBounds(corner1, corner2);

  const submitForm = async (event) => {
    console.log(event);
    event.preventDefault();
    const form = [...event.target];
    let meta = {};
    let location = {};
    let formData = {};
    form.forEach((target) => {
      if (target.type === "submit") {
      } else if (target.type === "checkbox") {
        let key = target.id;
        let value = target.checked;
        meta[key] = value;
      } else if (
        target.id === "address" ||
        target.id === "city" ||
        target.id === "zip" ||
        target.id === "country" ||
        target.id === "continent"
      ) {
        let key = target.id;
        let value = target.value;
        location[key] = value;
      } else if (target.id === "lat" || target.id === "lng") {
        let key = target.id;
        let value = target.valueAsNumber;
        location[key] = value;
      } else if (target.id === "media") {
        let key = target.id;
        let value = target.value;
        formData[key] = [value];
      } else if (target.id === "price" || target.id === "maxGuests" || target.id === "rating") {
        let key = target.id;
        let value = target.valueAsNumber;
        formData[key] = value;
      } else {
        let key = target.id;
        let value = target.value;
        formData[key] = value;
      }
      formData["location"] = location;
      formData["meta"] = meta;
    });
    console.log(formData);
    createVenue(formData);
  };

  useEffect(() => {
    console.log(position.lat);
  }, [position]);

  return (
    <div className="flex w-full flex-col p-5 md:m-auto md:w-[50vw]">
      <h1 className="m-2 text-center font-header text-3xl">Create New Venue</h1>
      <form onSubmit={submitForm} className="flex flex-col">
        <h2 className="m-3 font-subheader text-xl">Venue Details</h2>
        <div className="my-2 flex flex-col">
          <label>Venue Name</label>
          <input
            id="name"
            className="rounded-md border-2 border-black p-1"
            required
            minLength={3}
            type="name"
            placeholder="(required)"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Description</label>
          <input
            id="description"
            className="rounded-md border-2 border-black p-1"
            required
            type="text"
            placeholder="(required)"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Max Guests</label>
          <input
            id="maxGuests"
            className="rounded-md border-2 border-black p-1"
            required
            min={1}
            defaultValue={1}
            type="number"
            placeholder="Min 8 (required)"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Price</label>
          <input
            id="price"
            className="rounded-md border-2 border-black p-1"
            required
            min={0}
            defaultValue={0}
            type="number"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Rating</label>
          <input
            id="rating"
            className="rounded-md border-2 border-black p-1"
            min={0}
            defaultValue={0}
            max={5}
            type="range"
          />
          <div className="flex">
            <span className="basis-1/5">0</span>
            <span className="basis-1/5">1</span>
            <span className="basis-1/5">2</span>
            <span className="basis-1/5">3</span>
            <span className="basis-1/5">4</span>
            <span>5</span>
          </div>
        </div>
        <div className="my-2 flex flex-col">
          <label>Media</label>
          <input
            id="media"
            className="rounded-md border-2 border-black p-1"
            type="url"
            pattern=".*\.jpeg|.*\.png|.*\.gif|.*\.jpg$"
            placeholder="URL (.jpg .png .jpeg .gif)"
          />
        </div>
        <h2 className="m-3 font-subheader text-xl">Facilities:</h2>
        <div className="flex flex-wrap justify-center py-4">
          <label className="mx-3 flex items-center">
            <input id="wifi" className="custom-radio m-2" type="checkbox" name="account_type" />
            Wifi
          </label>
          <label className="mx-3 flex items-center">
            <input id="parking" className="custom-radio m-2" type="checkbox" name="account_type" />
            Parking
          </label>
          <label className="mx-3 flex items-center">
            <input id="breakfast" className="custom-radio m-2" type="checkbox" name="account_type" />
            Breakfast
          </label>
          <label className="mx-3 flex items-center">
            <input id="pets" className="custom-radio m-2" type="checkbox" name="account_type" />
            Pets
          </label>
        </div>
        <h2 className="m-3 font-subheader text-xl">Location</h2>
        <div className="my-2 flex flex-col">
          <label>Address</label>
          <input id="address" className="rounded-md border-2 border-black p-1" minLength={3} type="text" />
        </div>
        <div className="my-2 flex flex-col">
          <label>City</label>
          <input id="city" className="rounded-md border-2 border-black p-1" minLength={3} type="text" />
        </div>
        <div className="my-2 flex flex-col">
          <label>Zip Code</label>
          <input id="zip" className="rounded-md border-2 border-black p-1" type="text" />
        </div>
        <div className="my-2 flex flex-col">
          <label>Country</label>
          <input id="country" className="rounded-md border-2 border-black p-1" type="text" />
        </div>
        <div className="my-2 flex flex-col">
          <label>Continent</label>
          <input id="continent" className="rounded-md border-2 border-black p-1" type="text" />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="my-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand"
          >
            Create Venue
          </button>
        </div>
        <h3>Optional drag to select position on map below</h3>
        <div className="my-2 flex flex-col">
          <label>Latitude</label>
          <input
            id="lat"
            className="rounded-md border-2 border-black p-1"
            value={position.lat}
            type="number"
            readOnly
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Longitude</label>
          <input
            id="lng"
            className="rounded-md border-2 border-black p-1"
            value={position.lng}
            type="number"
            readOnly
          />
        </div>
      </form>
      <div className="m-3 border-2 border-black">
        <MapContainer
          id="set-position"
          center={[45, 10]}
          zoom={2}
          minZoom={2}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
    </div>
  );
}

export default VenueManage;
