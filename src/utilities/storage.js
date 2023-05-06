/**
 * Stores a value to a key in local storage.
 * @param {*} key the key to store value to.
 * @param {*} value value to be set to key in local storage.
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Returns a spesified keys stored data from local storage.
 * @param {string} key the key to fetch value from
 * @returns {object} value of key.
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Removes a spesified key from local storage.
 * @param {string} key
 */
export function remove(key) {
  localStorage.removeItem(key);
}
