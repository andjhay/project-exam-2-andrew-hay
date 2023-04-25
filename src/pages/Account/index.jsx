import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { apiPath } from "../../shared/api";
import Logo from "../../assets/holidazelogosmallblack.png";
import UserBookings from "../../components/UserBookings";
import UserVenues from "../../components/UserVenues";
import useUser from "../../hooks/useUser";
import { updateAvatar } from "../../utilities/update";
import * as storage from "../../utilities/storage.js";

function Account() {
  let { userName } = useParams();
  const { data, isLoading, isError } = useApi(apiPath + "/profiles/" + userName + "?_bookings=true&_venues=true");
  let { user, setUser } = useUser();
  const [userData, setUserData] = useState(data);
  const { name, avatar, email, venueManager, _count } = userData;
  let loggedInUser = false;
  if (userName === user.name) {
    loggedInUser = true;
  }

  console.log(data);

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
      } else {
        let key = target.id;
        let value = target.value;
        formData[key] = value;
      }
    });
    await updateAvatar(formData, user.name);
    const updatedUserData = { ...userData, avatar: formData.avatar };
    setUserData(updatedUserData);
    setUser(updatedUserData);
    storage.save("user", updatedUserData);
    avatarInput.value = "";
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="mx-auto flex w-[75vw] flex-col">
      <h1 className="m-2 text-center font-header text-3xl">Account</h1>
      <div className="flex min-w-full flex-col sm:flex-row">
        <div className="m-5 flex basis-1/2 flex-col items-center xl:items-end">
          {loggedInUser ? (
            <div className="m-auto">
              <img className="max-h-60 rounded-lg" src={avatar ? avatar : Logo} alt="user avatar" />
              <form className="my-2 flex flex-col items-center" onSubmit={submitUpdate}>
                <label>Update Avatar</label>
                <input
                  id="avatar"
                  className="rounded-md border-2 border-black p-1"
                  type="url"
                  pattern=".*\.jpeg|.*\.png|.*\.gif|.*\.jpg$"
                  placeholder="URL (.jpg .png .jpeg .gif)"
                />
                <button
                  type="submit"
                  className="my-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand"
                >
                  Update
                </button>
              </form>
            </div>
          ) : null}
        </div>
        <div className="m-5 basis-1/2 ">
          <h2 className="mb-3 font-subheader text-xl">Account Details</h2>
          <p>Username: {name}</p>
          <p>Email: {email}</p>
          <p>Account Type: {venueManager ? "Manager" : "Customer"}</p>
          <p>Venues: {_count?.venues}</p>
          <p>Bookings: {_count?.bookings}</p>
          {loggedInUser ? (
            <Link to={"/venuemanage/" + user.name}>
              <button className="my-2 rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand">
                Create New Venue
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      <UserBookings userName={userName} bookings={userData?.bookings} userData={userData} setUserData={setUserData} />
      <UserVenues userName={userName} venues={userData.venues} userData={userData} setUserData={setUserData} />
    </div>
  );
}

export default Account;
