import * as storage from "./storage.js";

/**
 * Logs user out, clearing auth token and user data from local storage when user presses button.
 */
export function logOut() {
  storage.remove("token");
  storage.remove("user");
  return;
}
