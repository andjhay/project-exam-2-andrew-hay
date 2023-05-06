import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "../../components/MapMarkerSelect";
import { createPost } from "../../utilities/create";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import { updatePut } from "../../utilities/update";
import LoadingElement from "../../components/LoadingElement";
import ErrorElement from "../../components/Error";

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

/**
 * Venue Manager Page component to create and edit venues by submitting data on the venue through a form.
 */
function VenueManage() {
  const pageLocation = useLocation();
  let editMode = false;
  let path = "/venues";
  let { id } = useParams();
  if (pageLocation.pathname.includes("edit")) {
    editMode = true;
    path = "/venues/" + id;
  }
  const { data, isLoading, isError, errorMsg } = useApi(apiPath + path);
  const { name, description, media, price, maxGuests, rating, meta, location } = data;
  const navigate = useNavigate();
  const [position, setPosition] = useState(center);
  const corner1 = Leaflet.latLng(-60, -175);
  const corner2 = Leaflet.latLng(90, 190);
  const bounds = Leaflet.latLngBounds(corner1, corner2);
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

  /**
   * Checks or unchecks the checkboxes while allowing them to be consitionally rendered.
   * @param {number} index The position of the checkbox to update in the array of checkboxs.
   */
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
        return null;
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
          return null;
        } else {
          let mediaItems = target.value.split(",").map((media) => media);
          let key = target.id;
          formData[key] = mediaItems;
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
      let response = await updatePut(formData, "Venue", id);
      if (response.errors) {
        console.log(response);
      } else {
        navigate("/venue/" + id);
      }
    } else {
      let response = await createPost(formData, "Venue");
      if (response.errors) {
        console.log(response);
      } else {
        navigate("/account/" + id);
      }
    }
  };

  /**
   * Displays guide message for form validation requirements when user interacts with input and indicates when input is acceptable.
   * @param {object} event The event information when the input has a value change
   */
  function inputValidate(event) {
    let inputCurrent = document.getElementById(event.target.id);
    if (event.target.validity.valid === false && event.target.value !== "") {
      inputCurrent.nextSibling.classList.remove("hidden");
      inputCurrent.classList.remove("bg-green-200");
    } else if (event.target.validity.valid === true && event.target.value !== "") {
      inputCurrent.nextSibling.classList.add("hidden");
      inputCurrent.classList.add("bg-green-200");
    } else {
      inputCurrent.nextSibling.classList.add("hidden");
      inputCurrent.classList.remove("bg-green-200");
    }
  }

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError || data.errors) {
    return <ErrorElement errorMsg={errorMsg} data={data} />;
  }

  return (
    <div className="flex w-full flex-col font-paragraph md:m-auto md:w-[50vw]">
      <h1 className="m-2 text-center font-header text-3xl">{editMode ? "Edit Venue" : "Create New Venue"}</h1>
      <form onSubmit={submitForm} className="flex flex-col p-3">
        <h2 className="my-3 font-subheader text-xl">Venue Details</h2>
        <div className="my-2 flex flex-col">
          <label htmlFor="name">Venue Name</label>
          <input
            id="name"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? name : null}
            required
            onChange={inputValidate}
            minLength={3}
            type="name"
            placeholder={editMode ? name : "(required)"}
          />
          <p className="hidden text-red-500">Venue Name must be 3 characters or more.</p>
        </div>

        <div className="my-2 flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? description : null}
            required
            onChange={inputValidate}
            type="text"
            placeholder={editMode ? description : "(required)"}
          />
          <p className="hidden text-red-500"></p>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="maxGuests">Max Guests</label>
          <input
            id="maxGuests"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? maxGuests : 1}
            required
            onChange={inputValidate}
            min={1}
            type="number"
          />
          <p className="hidden text-red-500"></p>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? price : 0}
            required
            onChange={inputValidate}
            min={0}
            type="number"
          />
          <p className="hidden text-red-500"></p>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="rating">Rating</label>
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
          <label htmlFor="media">Media</label>
          <input
            id="media"
            className="rounded-md border-2 border-black p-1"
            defaultValue={editMode ? media : null}
            type="url"
            onChange={inputValidate}
            placeholder="(https://) Media URL (url,url,...)"
          />
          <p className="hidden text-red-500">Must be an URL to an img file type starting with https://</p>
        </div>
        <h2 className="my-3 font-subheader text-xl">Facilities:</h2>
        <div className="flex flex-wrap justify-center py-4">
          {checkboxes.map((checkbox, index) => (
            <label key={checkbox.id} htmlFor={checkbox.id} className="mx-3 flex items-center">
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
        <h2 className="my-3 font-subheader text-xl">Location</h2>
        <div className="my-2 flex flex-col">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            className="rounded-md border-2 border-black p-1"
            minLength={3}
            onChange={inputValidate}
            type="text"
            defaultValue={editMode ? data.location?.address : null}
            placeholder={editMode ? data.location?.address : null}
          />
          <p className="hidden text-red-500">Must be 3 characters or more.</p>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="city">City</label>
          <input
            id="city"
            className="rounded-md border-2 border-black p-1"
            minLength={3}
            type="text"
            onChange={inputValidate}
            defaultValue={editMode ? data.location?.city : null}
            placeholder={editMode ? data.location?.city : null}
          />
          <p className="hidden text-red-500">Must be 3 characters or more.</p>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="zip">Zip Code</label>
          <input
            id="zip"
            className="rounded-md border-2 border-black p-1"
            type="text"
            onChange={inputValidate}
            defaultValue={editMode ? data.location?.zip : null}
            placeholder={editMode ? data.location?.zip : null}
          />
          <p className="hidden text-red-500"></p>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            className="rounded-md border-2 border-black p-1"
            type="text"
            onChange={inputValidate}
            defaultValue={editMode ? data.location?.country : null}
            placeholder={editMode ? data.location?.country : null}
          />
          <p className="hidden text-red-500"></p>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="continent">Continent</label>
          <input
            id="continent"
            className="rounded-md border-2 border-black p-1"
            type="text"
            onChange={inputValidate}
            defaultValue={editMode ? data.location?.continent : null}
            placeholder={editMode ? data.location?.continent : null}
          />
          <p className="hidden text-red-500"></p>
        </div>
        <div className="flex justify-center">
          <button id="submit-venue" type="submit" className="main-button shadow">
            {editMode ? "Update Venue" : "Create Venue"}
          </button>
        </div>
        <p>Optional drag to select position on map below</p>
        <div className="my-2 flex flex-col">
          <label htmlFor="lat">Latitude</label>
          <input
            id="lat"
            className="rounded-md border-2 border-black p-1"
            value={position.lat}
            type="number"
            readOnly
          />
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="lng">Longitude</label>
          <input
            id="lng"
            className="rounded-md border-2 border-black p-1"
            value={position.lng}
            type="number"
            readOnly
          />
        </div>
      </form>
      <div className="m-3 rounded-lg border-2 border-black">
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
