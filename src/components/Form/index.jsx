import PropTypes from "prop-types";
import React from "react";
import { register } from "../../utilities/register";
import { login } from "../../utilities/login";
import * as storage from "../../utilities/storage.js";

/**
 * @typedef {object} Props
 * @property {string} currentForm Log In or Sign Up in order to determine what inputs to render
 * @property {function} closeModal Closes Modal that the form is to be displayed inside.
 * @property {function} setLoggedIn updates a value on whether user has logged in through the form.
 * @property {function} setUser Updates a user hook storing session data.
 */

/**
 * Form component that displays and handles different inputs for logging in or registering a user.
 * @param {Props} props
 */
function Form({ currentForm, closeModal, setLoggedIn, setUser }) {
  Form.propTypes = {
    closeModal: PropTypes.func,
    currentForm: PropTypes.string,
    setLoggedIn: PropTypes.func,
    setUser: PropTypes.func,
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const form = [...event.target];
    let formData = {};
    form.forEach((target) => {
      if (target.id === "customer" || target.value === "") {
        return null;
      } else if (target.id === "venueManager") {
        let key = target.id;
        let value = target.checked;
        formData[key] = value;
      } else if (target.id) {
        let key = target.id;
        let value = target.value;
        formData[key] = value;
      }
    });
    if (currentForm === "Log In") {
      await login(formData);
    } else {
      await register(formData);
    }
    let user = storage.load("user");
    let token = storage.load("token");
    if (token === null) {
      return null;
    } else {
      setUser(user);
      setLoggedIn(true);
      closeModal();
    }
  };

  /**
   * Displays guide message for form validation requirements when user interacts with input and indicates when input is acceptable.
   * @param {object} event The event information when the input has a value change
   */
  function inputValidate(event) {
    let inputCurrent = document.getElementById(event.target.id);
    if (event.target.validity.valid === false && event.target.value !== "" && currentForm === "Sign Up") {
      inputCurrent.nextSibling.classList.remove("hidden");
      inputCurrent.classList.remove("bg-green-200");
    } else if (event.target.validity.valid === true && event.target.value !== "" && currentForm === "Sign Up") {
      inputCurrent.nextSibling.classList.add("hidden");
      inputCurrent.classList.add("bg-green-200");
    } else {
      inputCurrent.nextSibling.classList.add("hidden");
    }
  }

  return (
    <div>
      <form className="font-paragraph" onSubmit={submitForm}>
        {currentForm === "Sign Up" ? (
          <div className="my-2 flex flex-col">
            <label>Username</label>
            <input
              id="name"
              className="rounded-md border-2 border-black p-1"
              required
              minLength={2}
              maxLength={25}
              onChange={inputValidate}
              type="name"
              pattern="^[\w]+$"
              placeholder="(required)"
            />
            <p className="hidden text-red-500">
              Username must be one word between 2 and 25 characters. Can include letters, numbers and _
            </p>
          </div>
        ) : null}
        <div className="my-2 flex flex-col">
          <label>Email address</label>
          <input
            id="email"
            className="rounded-md border-2 border-black p-1"
            required
            onChange={inputValidate}
            type="email"
            pattern="^[\w]+@stud.noroff.no|[\w]+@noroff.no$"
            placeholder={currentForm === "Sign Up" ? "@stud.noroff.no or @noroff.no (required)" : "Email"}
          />
          <p className="hidden text-red-500">Email must end with @stud.noroff.no or @noroff.no </p>
        </div>
        <div className="my-2 flex flex-col">
          <label>Password</label>
          <input
            id="password"
            className="rounded-md border-2 border-black p-1"
            required
            onChange={inputValidate}
            minLength={8}
            type="password"
            placeholder={currentForm === "Sign Up" ? "Min 8 characters (required)" : "Password"}
          />
          <p className="hidden text-red-500">Password must be 8 or more characters</p>
        </div>
        {currentForm === "Sign Up" ? (
          <div className="my-2 flex flex-col">
            <label>Profile Picture</label>
            <input
              id="avatar"
              className="rounded-md border-2 border-black p-1"
              type="url"
              onChange={inputValidate}
              placeholder="https:// Image URL (optional)"
            />
            <p className="hidden text-red-500">Must be an URL to an img file type starting with https://</p>
          </div>
        ) : null}
        {currentForm === "Sign Up" ? (
          <div id="account-selector" className="flex justify-center py-4">
            Account Type:
            <label className="mx-3 flex items-center">
              <input
                id="customer"
                className="custom-radio mx-2"
                value="customer"
                type="radio"
                name="account_type"
                defaultChecked
              />
              Customer
            </label>
            <label className="mx-3 flex items-center">
              <input
                id="venueManager"
                className="custom-radio mx-2"
                type="radio"
                name="account_type"
                value="venueManager"
              />
              Manager
            </label>
          </div>
        ) : null}
        <div className="flex justify-end">
          <button id="submit-modal-form" type="submit" className="main-button shadow-lg">
            {currentForm}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
