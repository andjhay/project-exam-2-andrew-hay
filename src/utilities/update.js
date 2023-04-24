import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const apiVenues = "/venues";
const apiAvatar = "/profiles";
const method = "put";

export async function updateVenue(venueData) {
  const updatePostURL = `${apiPath}${apiVenues}/${venueData.id}`;
  if (venueData.media[0] == [""]) {
    delete venueData.media;
  }
  delete venueData.id;
  delete venueData.endsAt;
  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(venueData),
  });

  return await response.json();
}

export async function updateAvatar(newAvatar, username) {
  const updateAvatarURL = `${apiPath}${apiAvatar}/${username}/media`;
  const response = await authFetch(updateAvatarURL, {
    method,
    body: JSON.stringify(newAvatar),
  });

  if (response.ok) {
    let result = await response.json();
    return result;
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
}
