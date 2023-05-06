import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const method = "put";

/**
 * Updates data on api either avatar, booking or venue.
 * @param {object} data
 * @param {string} apiDestination
 * @param {string} id
 * @returns Response.
 */
export async function updatePut(data, apiDestination, id) {
  const updateVenueUrl = apiPath + "/venues/" + id;
  const updateAvatarUrl = apiPath + "/profiles/" + id + "/media";
  const updateBookingUrl = apiPath + "/bookings/" + id;
  let useUrl;
  if (apiDestination === "Avatar") {
    useUrl = updateAvatarUrl;
  }
  if (apiDestination === "Venue") {
    useUrl = updateVenueUrl;
  }
  if (apiDestination === "Booking") {
    useUrl = updateBookingUrl;
  }

  const response = await authFetch(useUrl, {
    method,
    body: JSON.stringify(data),
  });

  if (response.ok) {
    let result = await response.json();
    alert(apiDestination + " has been updated");
    return result;
  } else {
    let result = await response.json();
    alert("Error could not update " + apiDestination + result.errors[0].message);
    return result;
  }
}
