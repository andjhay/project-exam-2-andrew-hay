import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const method = "delete";

export async function deleteItem(id, apiDestination) {
  const deleteVenueURL = apiPath + apiDestination + "/" + id;

  const response = await authFetch(deleteVenueURL, {
    method,
  });

  if (response.ok === false) {
    const result = await response.json();
    alert("Error " + result.errors[0].message);
  }
}
