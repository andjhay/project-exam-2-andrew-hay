import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import Calendar from "react-calendar";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { isWithinInterval, parseISO } from "date-fns";
import useUser from "../../hooks/useUser";

function Venue() {
  let { id } = useParams();
  const { user } = useUser();
  const { data, isLoading, isError } = useApi(apiPath + "/venues/" + id + "?_owner=true&_bookings=true");
  const [img, setImg] = useState(0);
  const [value, onChange] = useState(new Date());
  const media = data.media || [];
  const owner = data.owner || [];
  const meta = data.meta || {};
  const bookings = data.bookings || [];
  const { name, price, rating, maxGuests, description } = data;

  function handleClickAdd() {
    if (img === media.length - 1) {
      setImg(0);
    } else {
      setImg(img + 1);
    }
  }

  function handleClickRemove() {
    if (img - 1 < 0) {
      setImg(media.length - 1);
    } else {
      setImg(img - 1);
    }
  }
  let disabledRanges;

  if (data.bookings?.length >= 1) {
    disabledRanges = bookings.map((booking) => {
      if (booking.dateFrom === undefined) {
        return [];
      } else {
        return [parseISO(booking.dateFrom), parseISO(booking.dateTo)];
      }
    });
  }
  function tileDisabled({ date, view }) {
    if (view === "month") {
      return isWithinRanges(date, disabledRanges);
    }
  }

  function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
  }

  function isWithinRanges(date, ranges) {
    return ranges.some((range) => isWithinRange(date, range));
  }

  let facilities = Object.values(meta).every((item) => item === false);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <h1 className="m-3 text-center font-header text-3xl">{name}</h1>
      <div className="m-3 flex flex-col md:flex-row">
        <div className="basis-1/2">
          <div className="flex items-center justify-center">
            <div>
              <button
                className={media.length === 1 ? "pointer-events-none opacity-25" : ""}
                onClick={handleClickRemove}
              >
                <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z" />
                </svg>
              </button>
            </div>
            <div>
              <img className="venue-img my-5 max-h-[50vh] rounded-md shadow" src={media[img]} alt={name} />
            </div>
            <div>
              <button className={media.length === 1 ? "pointer-events-none opacity-25" : ""} onClick={handleClickAdd}>
                <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="m-5 flex w-full basis-1/2 flex-col ">
          <h2 className="mb-3 font-subheader text-xl">Details</h2>
          <div>
            <Disclosure>
              <Disclosure.Button className="flex items-center rounded-lg bg-gray-100 px-1 text-left hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Description</span>
                <ChevronDownIcon className="h-10" />
              </Disclosure.Button>
              <Disclosure.Panel className="rounded-lg bg-gray-200 p-4">{description}</Disclosure.Panel>
            </Disclosure>
            <p></p>
            <p>Max Guests: {maxGuests}</p>
            <p>Price per night: {price} Kr</p>
            <p>Rating: {rating === 0 ? "No Rating Yet" : rating + ""}</p>
            <p>
              Owner:{" "}
              <Link className={user.name ? "underline" : "pointer-events-none"} to={"/account/" + owner.name}>
                {user.name ? owner.name : owner.name + " (Log in to view profile)"}
              </Link>{" "}
            </p>
          </div>

          <Link to={"/venuebook/" + id}>
            <button className=" my-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand ">
              Book Venue
            </button>
          </Link>
          {facilities ? null : <h2 className="my-3 font-subheader text-xl">Venue Facilities</h2>}

          <div className="flex max-w-[50vw] md:max-w-[25vw]">
            {meta.wifi === true ? (
              <div className="flex basis-1/4 flex-col items-center p-2">
                <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="m230 724-77-76q73-73 153.5-110.5T480 500q93 0 173.5 37.5T807 647l-77 77q-61-61-123.5-87.5T480 610q-64 0-126 26.5T230 724ZM32 527l-77-77Q56 347 190.5 283.5T480 220q155 0 289.5 64T1005 450l-77 77q-93-88-205.5-142.5T480 330q-130 0-242.5 54T32 527Zm448 448 137-138q-27-26-62-41.5T480 780q-40 0-75 15.5T344 837l136 138Z" />
                </svg>
                <p className="text-center">Wifi</p>
              </div>
            ) : null}
            {meta.parking === true ? (
              <div className="flex basis-1/4 flex-col items-center p-2">
                <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M227 951V200h302.526Q635 200 705.5 270.382q70.5 70.383 70.5 175.5Q776 551 705.583 622 635.167 693 530 693H373v258H227Zm146-404h153.106Q569 547 597.5 518q28.5-29 28.5-72t-28.5-71.5Q569 346 526.106 346H373v201Z" />
                </svg>
                <p className="text-center">Parking</p>
              </div>
            ) : null}
            {meta.breakfast === true ? (
              <div className="flex basis-1/4 flex-col items-center p-2">
                <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M275 988V615q-54-13-91.5-57T146 454V168h73v286h56V168h73v286h56V168h73v286q0 60-37.5 104T348 615v373h-73Zm428 0V665H580V351q0-85 54.5-135.5T776 167v821h-73Z" />
                </svg>
                <p className="text-center">Breakfast</p>
              </div>
            ) : null}
            {meta.pets === true ? (
              <div className="flex basis-1/4 flex-col items-center p-2">
                <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M166.817 577Q126 577 98 548.817q-28-28.183-28-69T98.183 411q28.183-28 69-28T236 411.183q28 28.183 28 69T235.817 549q-28.183 28-69 28Zm187-171Q313 406 285 377.817q-28-28.183-28-69T285.183 240q28.183-28 69-28T423 240.183q28 28.183 28 69T422.817 378q-28.183 28-69 28Zm252 0Q565 406 537 377.817q-28-28.183-28-69T537.183 240q28.183-28 69-28T675 240.183q28 28.183 28 69T674.817 378q-28.183 28-69 28Zm187 171Q752 577 724 548.817q-28-28.183-28-69T724.183 411q28.183-28 69-28T862 411.183q28 28.183 28 69T861.817 549q-28.183 28-69 28ZM264 991q-44.972 0-73.986-33.608Q161 923.784 161 878q0-43.6 26.5-77.3Q214 767 243 735q21-23 41-47t37-51q30.2-44.6 67.489-83.8 37.289-39.2 91.178-39.2 53.889 0 92.161 39.397Q610.1 592.793 640 639q16 26 35.5 50t41.5 46q30 31 56 65.3t26 77.7q0 45.784-29.014 79.392T696 991q-55.009 0-108-9t-108-9q-55.009 0-108 9t-108 9Z" />
                </svg>
                <p className="text-center">Pets Allowed</p>
              </div>
            ) : null}
          </div>
          <div>
            <h2 className="my-3 font-subheader text-xl">Availability</h2>
            <span className="flex items-center">
              <svg className="fill-red-400">
                <rect width="45" height="35" />
              </svg>
              <p className="m-2">Booked/Unavailable</p>
            </span>
            <span className="flex items-center">
              <svg className="fill-lightblue">
                <rect width="45" height="35" />
              </svg>
              <p className="m-2">Available</p>
            </span>

            <Calendar
              className="h-80 !bg-lightblue"
              onChange={onChange}
              value={value}
              tileDisabled={data.bookings?.length >= 1 ? tileDisabled : null}
              minDate={new Date()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venue;
