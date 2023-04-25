import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const method = "post";

export async function createPost(data, apiDestination) {
  const createVenueURL = apiPath + apiDestination;
  const response = await authFetch(createVenueURL, {
    method,
    body: JSON.stringify(data),
  });
  alert(`Post Created`);
  return await response.json();
}


