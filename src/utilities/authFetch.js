import * as storage from "../utilities/storage.js";

/**
 * Compiles the headers to be sent with requests
 * @returns {object} headers to be sent.
 */
function headers() {
  let token = storage.load("token");
  if (token)
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
}

/**
 * Fetch function with included auth token headers.
 * @param {string} url
 * @param {object} options
 * @returns
 */
export async function authFetch(url, options = {}) {
  let response = await fetch(url, {
    headers: headers(),
    ...options,
  });

  return response;
}
