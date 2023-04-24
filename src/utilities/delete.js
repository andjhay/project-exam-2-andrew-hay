import { apiPath } from "../api.mjs";
import { authFetch } from "../authFetch.mjs";

const apiVenues = "/venues";
const apiBookings = "/bookings";
const method = "delete";

export async function removeListing(venueId) {
  const deletePostURL = `${apiPath}${apiVenues}/${venueId}`;

  const response = await authFetch(deletePostURL, {
    method,
  });

  if (response.ok === true) {
    window.location.href = "userprofile.html";
    alert(`Listing Deleted`);
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
}
