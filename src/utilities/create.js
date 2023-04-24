import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const apiVenues = "/venues";
const apiBookings = "/bookings";
const method = "post";


export async function createVenue(venueData) {
  const createVenueURL = apiPath + apiVenues;
  const response = await authFetch(createVenueURL, {
    method,
    body: JSON.stringify(venueData),
  });
  alert(`Listing Created`);
  return await response.json();
}


// export async function createBooking(venueId, bidData) {
//   const placeBidURL = apiPath + action + `/${venueId}` + "/bids";
//   const body = JSON.stringify(bidData);
//   const response = await authFetch(placeBidURL, {
//     method,
//     body,
//   });
//   const user = await userProfile();
//   storage.save("user", user);
//   alert(`Bid Placed`);
//   return await response.json();
// }
