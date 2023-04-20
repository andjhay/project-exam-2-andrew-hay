import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/holidazelogoblack.png";
import LogoText from "../../assets/holidazelogotextblack.png";
import Search from "../Search";
import Form from "../Form";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [currentForm, setForm] = useState("");

  const formType = (event) => {
    setForm(event.target.innerText);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8" aria-label="Global">
        <div>
          <NavLink to="/">
            <img className="h-24 w-auto" src={Logo} alt="Logo" />
          </NavLink>
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden flex-1 lg:flex">
          <NavLink
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
        <div className="hidden lg:flex">
          <Search />
        </div>
        <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={formType}
            className="mx-2 h-8 w-24 rounded-lg border-2 border-darkbrown bg-darkbrown font-header text-white hover:border-yellowsand "
          >
            Log In
          </button>
          <button
            onClick={formType}
            className="mx-2 h-8 w-24 rounded-lg border-2 border-darkbrown bg-darkbrown font-header text-white hover:border-yellowsand "
          >
            Sign Up
          </button>
          <NavLink to="/account" className={({ isActive }) => (isActive ? "mx-2 fill-white" : "mx-2 hover:fill-white")}>
            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z" />
            </svg>
          </NavLink>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Holidaze</span>
              <img className="h-8 w-auto" src={LogoText} alt="" />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/venues"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Venues
                </NavLink>
              </div>
              <div className="py-6">
                <button
                  onClick={formType}
                  className="m-2 h-9 w-24 rounded-2xl border-2 border-darkbrown bg-darkbrown font-header text-white hover:border-yellowsand "
                >
                  Log In
                </button>
                <button
                  onClick={formType}
                  className="m-2 h-9 w-24 rounded-2xl border-2 border-darkbrown bg-darkbrown font-header text-white hover:border-yellowsand "
                >
                  Sign Up
                </button>
              </div>
              <Search />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <Dialog open={isOpen} className="relative z-20" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
            <Dialog.Title className="flex">
              {currentForm}
              <button type="button" className="-m-2.5 ms-auto rounded-md p-2.5 text-gray-700" onClick={closeModal}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-10 w-10" aria-hidden="true" />
              </button>
            </Dialog.Title>
            <Form currentForm={currentForm} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default Nav;
