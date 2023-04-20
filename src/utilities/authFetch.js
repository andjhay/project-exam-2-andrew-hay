import * as storage from "../utilities/storage.js";

let auth = storage.load("auth");

function headers() {
  if (auth)
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    };
}

export async function authFetch(url, options = {}) {
  let response = await fetch(url, {
    headers: headers(),
    ...options,
  });

  return response.json();
}
