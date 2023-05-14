import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import Logo from "../../assets/holidazelogosmallblack.png";
import UserBookings from "../../components/UserBookings";
import UserVenues from "../../components/UserVenues";
import useUser from "../../hooks/useUser";
import { updatePut } from "../../utilities/update";
import * as storage from "../../utilities/storage.js";
import LoadingElement from "../../components/LoadingElement";
import ErrorElement from "../../components/Error";

/**
 * Account Page component that displays all the required sub components and information of the account page.
 */
function Account() {
  let { user, setUser } = useUser();
  let { userName } = useParams();
  const { data, isLoading, isError, errorMsg } = useApi(
    apiPath + "/profiles/" + userName + "?_bookings=true&_venues=true"
  );
  const [userData, setUserData] = useState(data);
  const { name, avatar, email, venueManager, _count } = userData;
  let loggedInUser = false;
  if (userName === user.name) {
    loggedInUser = true;
  }

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const submitUpdate = async (event) => {
    let avatarInput = document.getElementById("avatar");
    event.preventDefault();
    const form = [...event.target];
    let formData = {};
    form.forEach((target) => {
      if (target.type === "submit") {
        return null;
      } else {
        let key = target.id;
        let value = target.value;
        formData[key] = value;
      }
    });
    await updatePut(formData, "Avatar", user.name);
    const updatedUserData = { ...userData, avatar: formData.avatar };
    setUserData(updatedUserData);
    setUser(updatedUserData);
    storage.save("user", updatedUserData);
    avatarInput.value = "";
  };

  /**
   * Displays guide message for form validation requirements when user interacts with input and indicates when input is acceptable.
   * @param {object} event The event information when the input has a value change
   */
  function inputValidate(event) {
    let inputCurrent = document.getElementById(event.target.id);
    if (event.target.validity.valid === false && event.target.value !== "") {
      inputCurrent.nextSibling.classList.remove("hidden");
      inputCurrent.classList.remove("bg-green-200");
    } else if (event.target.validity.valid === true && event.target.value !== "") {
      inputCurrent.nextSibling.classList.add("hidden");
      inputCurrent.classList.add("bg-green-200");
    } else {
      inputCurrent.nextSibling.classList.add("hidden");
    }
  }

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError || data.errors) {
    return <ErrorElement errorMsg={errorMsg} data={data} />;
  }

  return (
    <div className="mx-auto flex flex-col font-paragraph">
      <h1 className="m-2 text-center font-header text-3xl">Account</h1>
      <div className="flex min-w-full flex-col md:flex-row">
        <div className="m-5 flex basis-1/2 flex-col items-center md:items-end">
          <div>
            <img className="max-h-60 rounded-lg" src={avatar ? avatar : Logo} alt="user avatar" />
            {loggedInUser ? (
              <form className="my-2 flex flex-col items-center" onSubmit={submitUpdate}>
                <label htmlFor="avatar" className="font-paragraph">
                  Update Profile Picture
                </label>
                <input
                  id="avatar"
                  required
                  className="rounded-md border-2 border-black p-1 font-paragraph"
                  type="url"
                  onChange={inputValidate}
                  placeholder="https:// Image URL"
                />
                <p className="hidden text-red-500">Must be an URL to an img file type starting with https://</p>
                <button id="submit-avatar" type="submit" className="main-button shadow">
                  Update
                </button>
              </form>
            ) : null}
          </div>
        </div>
        <div className="m-5 basis-1/2 ">
          <h2 className="mb-3 font-subheader text-xl">Account Details</h2>
          <div className="my-5 font-paragraph">
            <p>Username: {name}</p>
            <p>Email: {email}</p>
            <p>Account Type: {venueManager ? "Manager" : "Customer"}</p>
            {venueManager ? <p>Venues: {_count?.venues}</p> : null}
            <p>All Time Total Bookings: {_count?.bookings}</p>
          </div>
          {loggedInUser ? (
            <Link to={"/venuecreate/" + user.name}>
              <button id="create-venue" className="main-button shadow">
                Create New Venue
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      <div id="users-bookings" className="m-5">
        <h2 className="font-subheader text-xl">
          {loggedInUser ? "Your Current Bookings" : "The Users Current Bookings"}
        </h2>
        <UserBookings userName={userName} bookings={userData?.bookings} userData={userData} setUserData={setUserData} />
      </div>
      <div id="users-venues" className="m-5">
        {user.venueManager ? (
          <>
            <h2 className="font-subheader text-xl">{loggedInUser ? "Your Venues" : "The Users Venues"}</h2>
            <UserVenues userName={userName} venues={userData.venues} userData={userData} setUserData={setUserData} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Account;
