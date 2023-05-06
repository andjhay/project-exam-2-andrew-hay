import { apiPath } from "../shared/api.js";
import * as storage from "./storage.js";

const apiLogin = "/auth/login";
const method = "post";

/**
 * Logs the user in to get auth token from api.
 * @param {object} input form data password and email.
 * @returns Response including auth token.
 */
export async function login(input) {
  const loginUrl = apiPath + apiLogin;
  const body = JSON.stringify(input);

  const response = await fetch(loginUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (response.ok) {
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("user", user);
    let responseData = user;
    responseData["token"] = accessToken;
    return responseData;
  } else {
    const result = await response.json();
    alert("Error " + result.errors[0].message);
  }
}
