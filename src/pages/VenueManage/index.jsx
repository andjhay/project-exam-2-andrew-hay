import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "../../components/MapMarkerSelect";
import { createPost } from "../../utilities/create";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import useUser from "../../hooks/useUser";
import { updatePut } from "../../utilities/update";

const center = {
  lat: 0,
  lng: 0,
};

const initialCheckboxes = [
  { id: "wifi", label: "Wifi", checked: false },
  { id: "parking", label: "Parking", checked: false },
  { id: "breakfast", label: "Breakfast", checked: false },
  { id: "pets", label: "Pets", checked: false },
];

function VenueManage() {
  let { id } = useParams();
  let { user } = useUser();
  const { data, isLoading, isError } = useApi(apiPath + "/venues/" + id);
  const { name, description, media, price, maxGuests, rating, meta, location } = data;
  const navigate = useNavigate();
  const [position, setPosition] = useState(center);
  const corner1 = Leaflet.latLng(-60, -175);
  const corner2 = Leaflet.latLng(90, 190);
  const bounds = Leaflet.latLngBounds(corner1, corner2);

  let editMode = false;
  if (id !== user.name) {
    editMode = true;
  }

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  useEffect(() => {
    if (meta) {
      const updatedCheckboxes = initialCheckboxes.map((checkbox) => {
        return {
          ...checkbox,
          checked: meta[checkbox.id],
        };
      });
      setCheckboxes(updatedCheckboxes);
    }
    if (location?.lat && location?.lat) {
      let locationData = {
        lat: location.lat,
        lng: location.lng,
      };
      setPosition(locationData);
    }
  }, [location, meta]);

  function handleCheckboxChanges(index) {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
  }

  const submitForm = async (event) => {
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
        if (target.value === "") {
        } else {
          let key = target.id;
          let value = target.value;
          formData[key] = [value];
        }
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
    if (editMode) {
      formData["id"] = id;
      console.log(formData);
      updatePut(formData, "/venues");
      navigate("/venue/" + id);
    } else {
      console.log(formData);
      createPost(formData, "/venues");
      navigate("/account/" + id);
    }
  };

  console.log(rating);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex w-full flex-col p-5 md:m-auto md:w-[50vw]">
      <h1 className="m-2 text-center font-header text-3xl">{editMode ? "Edit Venue" : "Create New Venue"}</h1>
      <form onSubmit={submitForm} className="flex flex-col">
        <h2 className="m-3 font-subheader text-xl">Venue Details</h2>
        <div className="my-2 flex flex-col">
          <label>Venue Name</label>
          <input
            id="name"
            className="rounded-md border-2 border-black p-1"
            required
            defaultValue={editMode ? name : null}
            minLength={3}
            type="name"
            placeholder={editMode ? name : "(required)"}
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Description</label>
          <textarea
            id="description"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? description : null}
            required
            type="text"
            placeholder={editMode ? description : "(required)"}
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Max Guests</label>
          <input
            id="maxGuests"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? maxGuests : 1}
            required
            min={1}
            type="number"
            placeholder="Min 8 (required)"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Price</label>
          <input
            id="price"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? price : 0}
            required
            min={0}
            type="number"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Rating</label>
          <input
            id="rating"
            className="rounded-md border-2 border-black p-1"
            min={0}
            defaultValue={editMode ? rating : 0}
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
            // add a loop for each potential image
            defaultValue={editMode ? media : null}
            type="url"
            pattern=".*\.jpeg|.*\.png|.*\.gif|.*\.jpg$"
            placeholder="URL (.jpg .png .jpeg .gif)"
          />
        </div>
        <h2 className="m-3 font-subheader text-xl">Facilities:</h2>
        <div className="flex flex-wrap justify-center py-4">
          {checkboxes.map((checkbox, index) => (
            <label key={checkbox.id} className="mx-3 flex items-center">
              <input
                id={checkbox.id}
                className="custom-radio m-2"
                onClick={() => handleCheckboxChanges(index)}
                checked={checkbox.checked}
                type="checkbox"
                readOnly
                name={checkbox.id}
              />
              {checkbox.label}
            </label>
          ))}
        </div>
        <h2 className="m-3 font-subheader text-xl">Location</h2>
        <div className="my-2 flex flex-col">
          <label>Address</label>
          <input
            id="address"
            className="rounded-md border-2 border-black p-1"
            minLength={3}
            type="text"
            defaultValue={editMode ? data.location?.address : null}
            placeholder={editMode ? data.location?.address : null}
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>City</label>
          <input
            id="city"
            className="rounded-md border-2 border-black p-1"
            minLength={3}
            type="text"
            defaultValue={editMode ? data.location?.city : null}
            placeholder={editMode ? data.location?.city : null}
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Zip Code</label>
          <input
            id="zip"
            className="rounded-md border-2 border-black p-1"
            type="text"
            defaultValue={editMode ? data.location?.zip : null}
            placeholder={editMode ? data.location?.zip : null}
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Country</label>
          <input
            id="country"
            className="rounded-md border-2 border-black p-1"
            type="text"
            defaultValue={editMode ? data.location?.country : null}
            placeholder={editMode ? data.location?.country : null}
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Continent</label>
          <input
            id="continent"
            className="rounded-md border-2 border-black p-1"
            type="text"
            defaultValue={editMode ? data.location?.continent : null}
            placeholder={editMode ? data.location?.continent : null}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="my-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand"
          >
            {editMode ? "Update Venue" : "Create Venue"}
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
          center={editMode ? position : center}
          zoom={1}
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
