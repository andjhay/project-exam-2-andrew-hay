import React, { useState } from "react";
import useSearch from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";

/**
 * Search component that stores the search object and redirects to view results
 */
function Search() {
  const { search, setSearchInput } = useSearch();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState();
  const navigate = useNavigate();

  const submitSearch = async (event) => {
    event.preventDefault();
    const form = [...event.target];
    let formData = {};
    form.forEach((target) => {
      if (target.type === "submit") {
        return null;
      } else if (target.type === "date") {
        let key = target.id;
        let value = target.value;
        formData[key] = value;
      } else {
        let key = target.id;
        let value = target.value;
        formData[key] = value;
      }
    });
    setSearchInput(formData);
    navigate("/venues");
  };

  let date = new Date().toISOString();
  let today = date.slice(0, 10);
  let dayAfterToday;

  /**
   * Date selection function that does not allow date to to be < or = to date from.
   * @param {object} event when a date is selected in type date search inputs dateTo or dateFrom.
   */
  function dateSelected(event) {
    let dateToInput = document.getElementById("dateTo");
    let inputToDate = new Date(dateToInput.value);

    let inputFromDate = new Date(event.target.value);
    let compareDate = inputFromDate < inputToDate;
    if (compareDate === false) {
      dateToInput.value = "";
    }
    if (isNaN(inputFromDate.getTime()) === true) {
      dateToInput.value = "";
      setFromDate("");
    } else {
      inputFromDate.setDate(inputFromDate.getDate() + 1);
      dayAfterToday = inputFromDate.toISOString().slice(0, 10);
      setToDate(dayAfterToday);
      setFromDate(event.target.value);
    }
  }

  return (
    <form className="flex flex-col items-center font-paragraph lg:flex-row lg:justify-center" onSubmit={submitSearch}>
      <label
        className="flex w-full flex-row items-center rounded-t-lg border-2 border-b-0 border-black bg-lightblue lg:flex-col lg:rounded-l-lg lg:rounded-tr-none lg:border-b-2 lg:border-r-0"
        htmlFor="searchTerm"
      >
        <p className="w-24 text-center">Looking For</p>
        <input
          id="searchTerm"
          defaultValue={search.searchTerm}
          type="text"
          className="h-10 rounded-tr-lg border-l-2 border-black p-1 px-3 placeholder-black shadow-xl focus:outline-none lg:rounded-t-none lg:rounded-bl-lg lg:border-l-0 lg:border-r-0 lg:border-t-2"
          placeholder="Search"
          aria-label="Search"
        />
      </label>
      <label
        className="flex w-full flex-row items-center border-2 border-b-0 border-black bg-lightblue lg:flex-col lg:border-b-2"
        htmlFor="dateFrom"
      >
        <p className="w-24 text-center">Date From</p>
        <input
          type="date"
          min={today}
          id="dateFrom"
          defaultValue={search.dateFrom}
          onChange={dateSelected}
          className="h-10 grow border-l-2 border-black p-1 px-3 placeholder-black shadow-xl focus:outline-none lg:border-b-0 lg:border-l-0 lg:border-t-2"
          placeholder="Search"
          aria-label="Date From"
        />
      </label>
      <label
        className={
          search.dateFrom !== "" || fromDate !== ""
            ? "flex w-full flex-row items-center border-2 border-b-0 border-black bg-lightblue lg:flex-col lg:border-b-2 lg:border-l-0"
            : "pointer-events-none flex w-full flex-row items-center border-2 border-b-0 border-black bg-lightblue opacity-75 lg:flex-col lg:border-b-2 lg:border-l-0"
        }
        htmlFor="dateTo"
      >
        <span className="w-24 text-center">Date To</span>
        <input
          type="date"
          defaultValue={search.dateTo}
          min={toDate}
          id="dateTo"
          className="h-10 grow border-l-2 border-black p-1 px-3 placeholder-black shadow-xl focus:outline-none lg:border-l-0 lg:border-t-2"
          placeholder="Search"
          aria-label="Date To"
        />
      </label>
      <label
        className="flex w-full flex-row items-center border-2 border-b-0 border-black bg-lightblue lg:flex-col lg:rounded-r-lg lg:border-b-2 lg:border-l-0 lg:border-l-0"
        htmlFor="guests"
      >
        <span className="w-24 text-center">Guests</span>
        <input
          min={1}
          defaultValue={search.guests > 1 ? search.guests : 1}
          type="number"
          id="guests"
          className="h-10 border-l-2 border-black p-1 px-3 placeholder-black shadow-xl focus:outline-none lg:w-24 lg:rounded-br-lg lg:border-l-0 lg:border-t-2"
          placeholder="Number of Guests"
          aria-label="Guests"
        />
      </label>
      <button
        id="submit-search"
        aria-label="submit-search"
        type="submit"
        className="flex w-full justify-center rounded-b-lg border-2 border-black bg-lightblue shadow-xl hover:bg-darkblue lg:m-2 lg:flex-col lg:rounded-lg"
      >
        <svg className="h-10 hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
          <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
        </svg>
      </button>
    </form>
  );
}

export default Search;
