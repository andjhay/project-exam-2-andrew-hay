import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiPath } from "../../shared/api";
import Calendar from "react-calendar";
import useApi from "../../hooks/useApi";
import LoadingElement from "../../components/LoadingElement";
import ErrorElement from "../../components/Error";
import { isWithinInterval, addDays } from "date-fns";
import useSearch from "../../hooks/useSearch";
import { updatePut } from "../../utilities/update";
import { createPost } from "../../utilities/create";
import useUser from "../../hooks/useUser";

/**
 * Booking Page component that allows a user to submit a new booking or edit existing bookings.
 */
function VenueBooking() {
  let { user } = useUser();
  let { venueId, bookingId } = useParams();
  const { data, isLoading, isError, errorMsg } = useApi(apiPath + "/venues/" + venueId + "?_bookings=true");
  let { name, price, maxGuests } = data;
  let bookingData = data.bookings?.filter((booking) => booking.id === bookingId)[0];
  const bookings = useMemo(() => data.bookings || [], [data.bookings]);
  const navigate = useNavigate();
  const pageLocation = useLocation();
  let editMode = false;
  if (pageLocation.pathname.includes("edit")) {
    editMode = true;
  }

  const { search } = useSearch();
  let guestsValue = search.guests;

  if (editMode) {
    guestsValue = bookingData?.guests;
  }
  const [guestsSelected, setGuestsSelected] = useState(1);
  useEffect(() => {
    setGuestsSelected(guestsValue);
  }, [guestsValue]);
  function handleGuestsSelected(event) {
    setGuestsSelected(event.target.value);
  }

  /**
   * Submits the current page data to the booking api url to create or update
   */
  async function submitBooking() {
    let formData = {};
    if (!editMode) {
      formData["venueId"] = venueId;
    }
    formData["dateFrom"] = valueFrom;
    formData["dateTo"] = valueTo;
    formData["guests"] = Number(guestsSelected);
    if (editMode) {
      await updatePut(formData, "Booking", bookingId);
    } else {
      await createPost(formData, "Booking");
    }
    navigate("/account/" + user.name);
  }

  const allOtherBookings = bookings.filter((booking) => booking.id !== bookingId);
  let disabledRangesFrom = null;
  let disabledRangesTo = null;
  let allDisabledRange = null;
  if (editMode) {
    disabledRangesFrom = allOtherBookings.map((booking) => {
      if (
        booking.dateFrom === undefined ||
        new Date(booking.dateFrom) > new Date(new Date(booking.dateTo).setDate(new Date(booking.dateTo).getDate() - 1))
      ) {
        return [new Date(), new Date()];
      } else {
        return [
          new Date(new Date(booking.dateFrom).setDate(new Date(booking.dateFrom).getDate() - 1)),
          new Date(booking.dateTo).setDate(new Date(booking.dateTo).getDate() - 1),
        ];
      }
    });
    disabledRangesTo = allOtherBookings.map((booking) => {
      if (
        booking.dateFrom === undefined ||
        new Date(new Date(booking.dateFrom).setDate(new Date(booking.dateFrom).getDate() + 1)) >
          new Date(booking.dateTo)
      ) {
        return [new Date(), new Date()];
      } else {
        return [new Date(booking.dateFrom).setDate(new Date(booking.dateFrom).getDate() + 1), new Date(booking.dateTo)];
      }
    });
  } else {
    disabledRangesFrom = bookings.map((booking) => {
      if (
        booking.dateFrom === undefined ||
        new Date(booking.dateFrom) > new Date(new Date(booking.dateTo).setDate(new Date(booking.dateTo).getDate() - 1))
      ) {
        return [new Date(), new Date()];
      } else {
        return [
          new Date(new Date(booking.dateFrom).setDate(new Date(booking.dateFrom).getDate() - 1)),
          new Date(new Date(booking.dateTo).setDate(new Date(booking.dateTo).getDate() - 1)),
        ];
      }
    });
    disabledRangesTo = bookings.map((booking) => {
      if (booking.dateFrom === undefined || new Date(booking.dateFrom) > new Date(booking.dateTo)) {
        return [new Date(), new Date()];
      } else {
        return [
          new Date(booking.dateFrom),
          new Date(new Date(booking.dateTo).setDate(new Date(booking.dateTo).getDate() + 1)),
        ];
      }
    });

    allDisabledRange = bookings.map((booking) => {
      if (booking.dateFrom === undefined || new Date(booking.dateFrom) > new Date(booking.dateTo)) {
        return [new Date(), new Date()];
      } else {
        return [new Date(booking.dateFrom), new Date(booking.dateTo)];
      }
    });
  }

  /**
   * Function determines what tiles to disable in month view. For the calender showing date selection From
   * @param {date} date a date on the calender.
   * @param {string} view the calenders current view mode.
   */
  function tileDisabledFrom({ date, view }) {
    if (view === "month") {
      return isWithinRanges(date, disabledRangesFrom);
    }
  }

  /**
   * Function determines what tiles to disable in month view. For the calender showing date selection To
   * @param {date} date a date on the calender.
   * @param {string} view the calenders current view mode.
   */
  function tileDisabledTo({ date, view }) {
    if (view === "month") {
      return isWithinRanges(date, disabledRangesTo);
    }
  }

  /**
   * Checks if a date is within a range to decide if it should be disabled.
   * @param {date} date the date to be checked
   * @param {array} range an array of the dates to be checked.
   */
  function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
  }

 /**
   * Checks if a date is within the range and returns it or not.
   * @param {date} date the date to be checked
   * @param {array} ranges an array of the booking ranges to be checked.
   */
  function isWithinRanges(date, ranges) {
    return ranges.some((range) => isWithinRange(date, range));
  }

  /**
   * Checks if a date is within the range and returns it or not.
   * @param {date} date the date to be checked, should be the valueFrom to be displayed on the calender.
   */
  const isDateDisabled = (date) => {
    return allDisabledRange.some((range) => isWithinInterval(date, { start: range[0], end: range[1] }));
  };

 /**
   * Adds to the date then rechecks to see if still a disabled date, if true continues to add until date is not diabled.
   * @param {date} startDate the current date.
   */
  const getNextAvailableDate = (startDate) => {
    let nextDate = startDate;
    while (!editMode && isDateDisabled(nextDate)) {
      nextDate = addDays(nextDate, 1);
    }
    return nextDate;
  };

  let from = new Date(new Date().setHours(2, 0, 0, 0));
  let to = new Date(new Date().setHours(2, 0, 0, 0));
  let nextDate = getNextAvailableDate(new Date());
  const [valueFrom, onChangeFrom] = useState(from);
  const [valueTo, onChangeTo] = useState(to);
  const [datesSet, setDatesSet] = useState(false);
  const [dayAfterSelected, setDayAfterSelected] = useState(null);
  const [closestDate, setClosestDate] = useState(null);

  useEffect(() => {
    if (editMode && bookingData !== undefined && datesSet === false) {
      setDatesSet(true);
      onChangeFrom(new Date(bookingData?.dateFrom));
      onChangeTo(new Date(bookingData?.dateTo));
    } else if (!editMode) {
      if (valueFrom < new Date(nextDate.setHours(2, 0, 0, 0))) {
        onChangeFrom(new Date(nextDate.setHours(2, 0, 0, 0)));
      }
    }
  }, [bookingData, editMode, nextDate, valueFrom, datesSet]);

  /**
   * Gets the closest date in the future to the selected date from an array of all the bookings.
   * @param {date} date the date to be checked, should be the input from date.
   * @param {array} array an array of all the booking dates.
   */
  function closestLaterDate(array, date) {
    let closestDate = null;
    let closestDiff = Infinity;
    array.forEach((d) => {
      let diff = d.getTime() - date.getTime();
      if (diff > 0 && diff < closestDiff) {
        closestDate = d;
        closestDiff = diff;
      }
    });
    return closestDate;
  }

  useEffect(() => {
    let date = new Date(valueFrom.setHours(2, 0, 0, 0));
    date = addDays(date, 1);
    setDayAfterSelected(date);
  }, [valueFrom]);

  useEffect(() => {
    const allOtherBookings = bookings.filter((booking) => booking.id !== bookingId);
    const allDates = allOtherBookings.map((booking) => new Date(new Date(booking.dateFrom).setHours(2, 0, 0, 0)));
    const targetDate = new Date(valueFrom.setHours(2, 0, 0, 0));
    const closestDate = closestLaterDate(allDates, targetDate);
    setClosestDate(closestDate);
  }, [valueFrom, bookings, bookingId]);

  useEffect(() => {
    if (valueFrom >= valueTo || new Date(valueFrom.setHours(2, 0, 0, 0)) >= new Date(valueTo.setHours(2, 0, 0, 0))) {
      onChangeTo(dayAfterSelected);
    }
    if (closestDate < valueFrom) {
      return undefined;
    } else if (valueTo > closestDate && closestDate !== null) {
      onChangeTo(dayAfterSelected);
    }
  }, [valueFrom, valueTo, dayAfterSelected, closestDate]);

  let totalNights = Math.floor((Date.parse(valueTo) - Date.parse(valueFrom)) / 86400000);
  let totalPrice = totalNights * price;

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError || data.errors) {
    return <ErrorElement errorMsg={errorMsg} data={data} />;
  }
  return (
    <div>
      <h1 className="m-3 text-center font-header text-3xl">
        {editMode ? "Edit Booking at" : "New Booking at"} {name}
      </h1>
      <div className="flex flex-col items-center">
        <div>
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
        </div>

        <div className="my-2 flex w-fit flex-col">
          <label htmlFor="guests">Guests</label>
          <input
            id="guests"
            className="rounded-md border-2 border-black p-1"
            defaultValue={guestsValue}
            onChange={handleGuestsSelected}
            required
            min={1}
            max={maxGuests}
            type="number"
          />
        </div>
        <div className="my-2 flex flex-wrap justify-center">
          <div>
            <h2 className="mx-2 font-subheader text-lg">Date from</h2>
            <Calendar
              calendarType="ISO 8601"
              className="m-2 !bg-lightblue shadow-lg"
              onChange={onChangeFrom}
              returnValue={"start"}
              minDetail="year"
              value={[valueFrom, valueTo]}
              tileDisabled={data.bookings?.length >= 1 ? tileDisabledFrom : null}
              minDate={getNextAvailableDate(new Date())}
            />
          </div>

          <div>
            <h2 className="mx-2 font-subheader text-lg">Date to</h2>
            <Calendar
              className="m-2 !bg-lightblue shadow-lg"
              onChange={onChangeTo}
              returnValue={"end"}
              minDetail="year"
              tileDisabled={data.bookings?.length >= 1 ? tileDisabledTo : null}
              value={[valueFrom, valueTo]}
              minDate={dayAfterSelected}
              maxDate={closestDate}
            />
          </div>
        </div>
        <p className="mx-5 text-center">
          Booking {guestsSelected} {guestsSelected > 1 ? "Guests" : "Guest"} for {totalNights} nights <br /> check in{" "}
          {valueFrom.toLocaleString().slice(0, 10)} - departure {valueTo.toLocaleString().slice(0, 10)} <br /> A total
          of {totalPrice} NOK payment at arrival.
        </p>
        <button id="submit-booking" onClick={() => submitBooking()} className="main-button w-fit shadow">
          {" "}
          {editMode ? "Update Booking" : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default VenueBooking;
