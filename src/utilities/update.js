import { apiPath } from "../shared/api.js";
import { authFetch } from "./authFetch.js";

const apiAvatar = "/profiles";
const method = "put";

export async function updatePut(data, apiDestination) {
  const updatePostURL = apiPath + apiDestination + "/" + data.id;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(data),
  });

  if (response.ok) {
    let result = await response.json();
    return result;
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
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
