import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const method = "post";

/**
 * Creates new object on api either a venue or booking.
 * @param {object} data form data from venue creation or booking.
 * @param {string} apiDestination string to determine what path to use.
 * @returns 
 */
export async function createPost(data, apiDestination) {
  const createVenueUrl = apiPath + "/venues";
  const createBookingUrl = apiPath + "/bookings";
  let useUrl;
  if (apiDestination === "Venue") {
    useUrl = createVenueUrl;
  }
  if (apiDestination === "Booking") {
    useUrl = createBookingUrl;
  }
  const response = await authFetch(useUrl, {
    method,
    body: JSON.stringify(data),
  });
  if (response.ok) {
    let result = await response.json();
    alert(apiDestination + " has been created");
    return result;
  } else {
    let result = await response.json();
    alert("Error Could not create " + apiDestination + " - " + result.errors[0].message);
    return result;
  }
}
