import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import VenueCard from "../../components/VenueCard";
import Search from "../../components/Search";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useSearch from "../../hooks/useSearch";

const sortBy = [
  { id: 1, value: "Price (low)", sort: "?sort=price&sortOrder=asc&_owner=true&_bookings=true" },
  { id: 2, value: "Price (high)", sort: "?sort=price&sortOrder=desc&_owner=true&_bookings=true" },
  { id: 3, value: "Guests (less)", sort: "?sort=maxGuests&sortOrder=asc&_owner=true&_bookings=true" },
  { id: 4, value: "Guests (more)", sort: "?sort=maxGuests&sortOrder=desc&_owner=true&_bookings=true" },
  { id: 5, value: "Rating (low)", sort: "?sort=rating&sortOrder=asc&_owner=true&_bookings=true" },
  { id: 6, value: "Rating (High)", sort: "?sort=rating&sortOrder=asc&_owner=true&_bookings=true" },
];

function Venues() {
  const [selected, setSelected] = useState(sortBy[0]);
  const { search } = useSearch();
  const { data } = useApi(apiPath + "/venues" + selected.sort);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const searchResults = data?.filter((venue) => {
      if (
        (venue.name.toLowerCase().includes(search.searchTerm?.toLowerCase()) === true ||
          venue.description.toLowerCase().includes(search.searchTerm?.toLowerCase()) === true) &&
        venue.maxGuests >= Number(search.guests) &&
        !venue.bookings.some((booking) => {
          const bookingFrom = new Date(booking.dateFrom).getTime();
          const bookingTo = new Date(booking.dateTo).getTime();
          const searchFrom = new Date(search.dateFrom).getTime();
          const searchTo = new Date(search.dateTo).getTime();
          return (
            (searchFrom <= bookingTo && searchFrom >= bookingFrom) ||
            (searchTo <= bookingTo && searchTo >= bookingFrom) ||
            (searchFrom <= bookingFrom && searchTo >= bookingTo)
          );
        })
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredData(searchResults);
  }, [search, data]);

  return (
    <div className="">
      <div className="m-2 flex flex-col flex-wrap items-center justify-center lg:flex-row">
        <Link to="/venuesmap">
          <button className="m-2 flex items-center rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand ">
            View on Map
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 fill-white"
              height="19"
              viewBox="0 96 960 960"
              width="19"
            >
              <path d="m269.333 786.667 295-125.667L690 366 395 491.667l-125.667 295ZM480 616q-17 0-28.5-11.5T440 576q0-17 11.5-28.5T480 536q17 0 28.5 11.5T520 576q0 17-11.5 28.5T480 616Zm-.214 389.33q-88.426 0-167.253-33.267-78.827-33.271-137.076-91.52-58.249-58.249-91.52-137.071-33.27-78.823-33.27-167.38 0-89.238 33.33-167.666 33.329-78.427 91.859-136.922 58.53-58.494 136.966-91.999Q391.257 146 479.557 146q89.329 0 168.082 33.437 78.753 33.436 137.028 91.826 58.275 58.391 91.804 137.006Q910 486.885 910 576.389q0 88.795-33.505 167.002-33.505 78.208-91.999 136.746-58.495 58.537-136.928 91.867-78.433 33.326-167.782 33.326Zm-.015-105.996q134.742 0 229.152-94.096 94.411-94.096 94.411-229.009 0-134.742-94.182-229.152-94.181-94.411-229.256-94.411-134.409 0-228.819 94.182-94.411 94.181-94.411 229.256 0 134.409 94.096 228.819 94.096 94.411 229.009 94.411ZM480 576Z" />
            </svg>
          </button>
        </Link>
        <div className="m-2">
          <Search />
        </div>
        <div>
          <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button className="relative w-48 rounded-lg border-2 border-black bg-white p-2 pr-10 text-left shadow-md">
              <span className="block truncate">{selected.value}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-lg border-2 border-black bg-white py-1 text-base text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {sortBy.map((value, valueIdx) => (
                <Listbox.Option
                  key={valueIdx}
                  className={({ active }) => `relative p-2 pr-4 ${active ? "bg-lightblue" : "text-darkbrown"}`}
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {value.value}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 me-3 flex items-center pl-3 text-darkbrown">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData?.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

export default Venues;
