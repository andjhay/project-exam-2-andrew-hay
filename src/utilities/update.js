import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const method = "put";

export async function updatePut(data, apiDestination, username) {
  const updateVenueUrl = apiPath + "/venues/" + data.id;
  const updateAvatarUrl = apiPath + "/profiles/" + username + "/media";
  const updateBookingUrl = apiPath + "/bookings/" + data.id;
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
    return result;
  } else {
    let result = await response.json();
    alert("ERROR " + result.errors[0].message);
    return result;
  }
}
