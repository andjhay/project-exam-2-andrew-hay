import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/holidazelogoblack.png";
import LogoText from "../../assets/holidazelogotextblack.png";
import Form from "../Form";
import { logOut } from "../../utilities/logout";
import * as storage from "../../utilities/storage.js";
import useUser from "../../hooks/useUser";

let userData = storage.load("user");

/**
 * Nav component contains logo, navlinks and mobile menu and log in/sign up modal
 */
function Nav() {
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [isLoggedIn, setLoggedIn] = useState(false);
  let [currentForm, setForm] = useState("");
  let { user, setUser } = useUser(userData);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let token = storage.load("token");
    if (token) {
      setLoggedIn(true);
      setUser(storage.load("user"));
    } else {
      setLoggedIn(false);
      setUser({});
    }
  }, [setUser]);

  const formType = (event) => {
    setForm(event.target.innerText);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function handelLogOut() {
    logOut();
    setLoggedIn(false);
    setUser({});
    if (!location.pathname.includes("venues")) {
      navigate("/");
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8" aria-label="Global">
        <div>
          <NavLink to="/">
            <img className="h-24 w-auto" src={Logo} alt="Holidaze Logo" />
          </NavLink>
        </div>
        <div className="lg:hidden">
          <button
            aria-label="open mobile menu"
            type="button"
            id="mobile-open"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-darkbrown"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden flex-1 lg:flex">
          <NavLink
            id="nav-home"
            className={({ isActive }) =>
              isActive
                ? "text-md m-2 font-subheader text-white underline decoration-white underline-offset-8"
                : "text-md m-2 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white "
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            id="nav-venues"
            className={({ isActive }) =>
              isActive
                ? "text-md m-2 font-subheader text-white underline decoration-white underline-offset-8"
                : "text-md m-2 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white "
            }
            to="/venues"
          >
            Venues
          </NavLink>
        </div>
        <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <>
              <NavLink
                id="nav-username"
                to={"/account/" + user?.name}
                className={({ isActive }) =>
                  isActive
                    ? "mx-2 font-paragraph text-white underline underline-offset-4"
                    : "mx-2 font-paragraph underline underline-offset-4 hover:text-white"
                }
              >
                {user?.name}
              </NavLink>
              <button id="nav-log-out" onClick={handelLogOut} className="main-button shadow">
                Log Out
              </button>
            </>
          ) : (
            <>
              <button id="nav-log-in" onClick={formType} className="main-button shadow">
                Log In
              </button>
              <button id="nav-sign-up" onClick={formType} className="main-button shadow">
                Sign Up
              </button>
            </>
          )}
          <NavLink
            id="nav-account"
            aria-label="to-account"
            to={"/account/" + user?.name}
            className={
              isLoggedIn
                ? ({ isActive }) => (isActive ? "mx-2 fill-white" : "mx-2 hover:fill-white")
                : "pointer-events-none mx-2 opacity-50"
            }
          >
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z" />
            </svg>
          </NavLink>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-20" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-darkblue px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="-mt-1 flex items-center justify-between">
            <NavLink onClick={() => setMobileMenuOpen(false)} to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Holidaze</span>
              <img className="ms-4 h-12 w-auto" src={LogoText} alt="" />
            </NavLink>
            <button
              id="mobile-close"
              type="button"
              className="me-2 rounded-md p-2.5 text-darkbrown"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
          <div className="my-4 divide-y divide-darkbrown">
            <div className="flex flex-col space-y-2 py-6">
              <NavLink
                id="mobile-home"
                onClick={() => setMobileMenuOpen(false)}
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-md my-4 font-subheader text-white underline decoration-white underline-offset-8"
                    : "text-md my-4 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white "
                }
              >
                Home
              </NavLink>
              <NavLink
                id="mobile-venues"
                onClick={() => setMobileMenuOpen(false)}
                to="/venues"
                className={({ isActive }) =>
                  isActive
                    ? "text-md my-4 font-subheader text-white underline decoration-white underline-offset-8"
                    : "text-md my-4 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white "
                }
              >
                Venues
              </NavLink>
            </div>
            <div className="flex items-center justify-center py-4">
              {isLoggedIn ? (
                <>
                  <NavLink
                    id="mobile-username"
                    onClick={() => setMobileMenuOpen(false)}
                    to={"/account/" + user?.name}
                    className={({ isActive }) =>
                      isActive
                        ? "mx-2 font-paragraph text-white underline underline-offset-4"
                        : "mx-2 font-paragraph underline underline-offset-4 hover:text-white"
                    }
                  >
                    {user?.name}
                  </NavLink>
                  <button id="mobile-log-out" onClick={handelLogOut} className="main-button shadow">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button id="mobile-log-in" onClick={formType} className="main-button shadow">
                    Log In
                  </button>
                  <button id="mobile-sign-up" onClick={formType} className="main-button shadow">
                    Sign Up
                  </button>
                </>
              )}
              <NavLink
                id="mobile-account"
                aria-label="to-account"
                to={"/account/" + user?.name}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  isLoggedIn
                    ? ({ isActive }) => (isActive ? "mx-2 fill-white" : "mx-2 hover:fill-white")
                    : "pointer-events-none mx-2 opacity-50"
                }
              >
                <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z" />
                </svg>
              </NavLink>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <Dialog open={isOpen} className="relative z-20" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-75" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
            <Dialog.Title className="flex font-subheader text-xl">
              {currentForm}
              <button
                id="modal-close"
                type="button"
                className="-m-2.5 ms-auto rounded-md p-2.5 text-gray-700"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-10 w-10" aria-hidden="true" />
              </button>
            </Dialog.Title>
            <Form currentForm={currentForm} closeModal={closeModal} setLoggedIn={setLoggedIn} setUser={setUser} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default Nav;
