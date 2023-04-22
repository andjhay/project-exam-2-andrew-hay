import * as storage from "../utilities/storage.js";

function headers() {
  let token = storage.load("token");
  if (token)
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
}

export async function authFetch(url, options = {}) {
  let response = await fetch(url, {
    headers: headers(),
    ...options,
  });

  return response;
}
