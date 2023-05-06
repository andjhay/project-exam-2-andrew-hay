import { apiPath } from "../shared/api.js";
import { login } from "./login.js";

const apiReg = "/auth/register";
const method = "post";

/**
 * Registers an account from form data.
 * @param {object} input contains form data in this case email, username, password and optional profile pictrue url.
 * @returns Response.
 */
export async function register(input) {
  const registerUrl = apiPath + apiReg;
  const body = JSON.stringify(input);
  const response = await fetch(registerUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (response.ok) {
    const result = await response.json();
    alert("Registered Successfully");
    delete input["avatar"];
    delete input["venueManager"];
    delete input["name"];
    login(input);
    return result;
  } else {
    const result = await response.json();
    alert("Error " + result.errors[0].message);
  }
}
