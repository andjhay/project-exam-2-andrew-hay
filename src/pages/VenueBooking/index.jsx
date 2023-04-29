import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiPath } from "../../shared/api";
import Calendar from "react-calendar";
import useApi from "../../hooks/useApi";
import LoadingElement from "../../components/LoadingElement";
import ErrorElement from "../../components/Error";
import { isWithinInterval, addDays, parseISO } from "date-fns";
import useSearch from "../../hooks/useSearch";
import { updatePut } from "../../utilities/update";
import { createPost } from "../../utilities/create";
import useUser from "../../hooks/useUser";

function VenueBooking() {
  let { user } = useUser();
  let { venueId, bookingId } = useParams();
  const navigate = useNavigate();
  // All data to display
  const { data, isLoading, isError, errorMsg } = useApi(apiPath + "/venues/" + venueId + "?_bookings=true");
  let { name, price, maxGuests } = data;
  let bookingData = data.bookings?.filter((booking) => booking.id === bookingId)[0];
  const bookings = useMemo(() => data.bookings || [], [data.bookings]);
  // Conditional statement between modes
  const pageLocation = useLocation();
  let editMode = false;
  if (pageLocation.pathname.includes("edit")) {
    editMode = true;
  }
  // Guest input value management
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
  // Handel button press to submit create or update booking
  function submitBooking() {
    let formData = {};
    if (!editMode) {
      formData["venueId"] = venueId;
    }
    formData["dateFrom"] = valueFrom;
    formData["dateTo"] = valueTo;
    formData["guests"] = Number(guestsSelected);

    if (editMode) {
      updatePut(formData, "Booking", bookingId);
    } else {
      createPost(formData, "Booking");
    }
    navigate("/account/" + user.name);
  }

  // Calender date values

  const allOtherBookings = bookings.filter((booking) => booking.id !== bookingId);
  let disabledRangesFrom = null;
  let disabledRangesTo = null;
  let allDisabledRange = null;
  if (editMode) {
    disabledRangesFrom = allOtherBookings.map((booking) => {
      if (
        booking.dateFrom === undefined ||
        parseISO(booking.dateFrom) > new Date(parseISO(booking.dateTo).setDate(parseISO(booking.dateTo).getDate() - 1))
      ) {
        return [new Date(), new Date()];
      } else {
        return [parseISO(booking.dateFrom), parseISO(booking.dateTo).setDate(parseISO(booking.dateTo).getDate() - 1)];
      }
    });
    disabledRangesTo = allOtherBookings.map((booking) => {
      if (
        booking.dateFrom === undefined ||
        new Date(parseISO(booking.dateFrom).setDate(parseISO(booking.dateFrom).getDate() + 1)) >
          parseISO(booking.dateTo)
      ) {
        return [new Date(), new Date()];
      } else {
        return [parseISO(booking.dateFrom).setDate(parseISO(booking.dateFrom).getDate() + 1), parseISO(booking.dateTo)];
      }
    });
  } else {
    disabledRangesFrom = bookings.map((booking) => {
      if (
        booking.dateFrom === undefined ||
        parseISO(booking.dateFrom) > new Date(parseISO(booking.dateTo).setDate(parseISO(booking.dateTo).getDate() - 1))
      ) {
        return [new Date(), new Date()];
      } else {
        return [
          parseISO(booking.dateFrom),
          new Date(parseISO(booking.dateTo).setDate(parseISO(booking.dateTo).getDate() - 1)),
        ];
      }
    });
    disabledRangesTo = bookings.map((booking) => {
      if (
        booking.dateFrom === undefined ||
        new Date(parseISO(booking.dateFrom).setDate(parseISO(booking.dateFrom).getDate() + 1)) >
          parseISO(booking.dateTo)
      ) {
        return [new Date(), new Date()];
      } else {
        return [
          new Date(parseISO(booking.dateFrom).setDate(parseISO(booking.dateFrom).getDate() + 1)),
          parseISO(booking.dateTo),
        ];
      }
    });
    allDisabledRange = bookings.map((booking) => {
      if (booking.dateFrom === undefined) {
        return [new Date(), new Date()];
      } else {
        return [parseISO(booking.dateFrom), parseISO(booking.dateTo)];
      }
    });
  }

  function tileDisabledFrom({ date, view }) {
    if (view === "month") {
      return isWithinRanges(date, disabledRangesFrom);
    }
  }

  function tileDisabledTo({ date, view }) {
    if (view === "month") {
      return isWithinRanges(date, disabledRangesTo);
    }
  }

  function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
  }

  function isWithinRanges(date, ranges) {
    return ranges.some((range) => isWithinRange(date, range));
  }

  const isDateDisabled = (date) => {
    return allDisabledRange.some((range) => isWithinInterval(date, { start: range[0], end: range[1] }));
  };

  const getNextAvailableDate = (startDate) => {
    let nextDate = startDate;

    while (!editMode && isDateDisabled(nextDate)) {
      nextDate = addDays(nextDate, 1);
    }
    return nextDate;
  };

  let from = new Date(new Date().setHours(0, 0, 0, 0));
  let to = new Date(new Date().setHours(0, 0, 0, 0));

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
      if (valueFrom < new Date(nextDate.setHours(0, 0, 0, 0))) {
        onChangeFrom(new Date(nextDate.setHours(0, 0, 0, 0)));
      }
    }
  }, [bookingData, editMode, nextDate, valueFrom, datesSet]);

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
    const date = new Date(valueFrom.setHours(0, 0, 0, 0));
    date.setDate(date.getDate() + 1);
    setDayAfterSelected(date);
  }, [valueFrom]);

  useEffect(() => {
    const allOtherBookings = bookings.filter((booking) => booking.id !== bookingId);
    const allDates = allOtherBookings.map((booking) => new Date(new Date(booking.dateFrom).setHours(0, 0, 0, 0)));
    const targetDate = new Date(valueFrom.setHours(0, 0, 0, 0));
    const closestDate = closestLaterDate(allDates, targetDate);
    setClosestDate(closestDate);
  }, [valueFrom, bookings, bookingId]);

  useEffect(() => {
    if (valueFrom >= valueTo) {
      onChangeTo(dayAfterSelected);
    }
    if (closestDate < valueFrom) {
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
          {valueFrom.toLocaleString().slice(0, 10)} - departure{" "}
          {valueTo === null ? "not selected" : valueTo.toLocaleString().slice(0, 10)} <br /> A total of {totalPrice} NOK
          payment at arrival.
        </p>
        <button
          onClick={() => submitBooking()}
          className={
            valueTo === null ? "main-button pointer-events-none w-fit opacity-80 shadow" : "main-button w-fit shadow"
          }
        >
          {" "}
          {editMode ? "Update Booking" : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default VenueBooking;
