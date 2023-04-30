import PropTypes from "prop-types";
import React from "react";
import { register } from "../../utilities/register";
import { login } from "../../utilities/login";
import * as storage from "../../utilities/storage.js";

function Form({ currentForm, closeModal, setLoggedIn, setUser }) {
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

  return (
    <div>
      <form onSubmit={submitForm}>
        {currentForm === "Sign Up" ? (
          <div className="my-2 flex flex-col">
            <label>Username</label>
            <input
              id="name"
              className="rounded-md border-2 border-black p-1"
              required
              minLength={3}
              type="name"
              pattern="^[\w]+$"
              placeholder="(required)"
            />
          </div>
        ) : null}
        <div className="my-2 flex flex-col">
          <label>Email address</label>
          <input
            id="email"
            className="rounded-md border-2 border-black p-1"
            required
            type="email"
            pattern="^[\w]+@stud.noroff.no|[\w]+@noroff.no$"
            placeholder="@stud.noroff.no/@noroff.no(required)"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label>Password</label>
          <input
            id="password"
            className="rounded-md border-2 border-black p-1"
            required
            minLength={8}
            type="password"
            placeholder="Min 8 (required)"
          />
        </div>
        {currentForm === "Sign Up" ? (
          <div className="my-2 flex flex-col">
            <label>Avatar</label>
            <input
              id="avatar"
              className="rounded-md border-2 border-black p-1"
              type="url"
              placeholder="(https://) Image URL (optional)"
            />
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

Form.propTypes = {
  closeModal: PropTypes.func,
  currentForm: PropTypes.string,
  setLoggedIn: PropTypes.func,
  setUser: PropTypes.func,
};

export default Form;
