import { auth } from "./api.js";

function headers() {
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
