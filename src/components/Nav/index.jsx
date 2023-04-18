import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/holidazelogoblack.png";
import LogoText from "../../assets/holidazelogotextblack.png";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NavLink to="/">
            <span className="sr-only">Holidaze</span>
            <img className="h-24 w-auto" src={Logo} alt="" />
          </NavLink>
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex">
          <NavLink
            className="text-md m-2 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white active:decoration-white"
            to=""
          >
            Home
          </NavLink>
          <NavLink
            className="text-md m-2 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white active:decoration-white"
            to="*"
          >
            Features
          </NavLink>
          <NavLink
            className="text-md m-2 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white"
            to="/"
          >
            Marketplace
          </NavLink>
          <NavLink
            className="text-md m-2 font-subheader underline decoration-transparent underline-offset-8 hover:text-white hover:decoration-white"
            to="/"
          >
            Company
          </NavLink>
        </div>
        <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
          <NavLink to="/" className="text-md m-2 font-header hover:text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </NavLink>
          <button className="m-2 h-9 w-24 rounded-2xl border-2 border-darkbrown bg-darkbrown font-header text-white hover:border-yellowsand ">
            Sign up
          </button>
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
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </NavLink>
                <NavLink
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </NavLink>
                <NavLink
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </NavLink>
              </div>
              <div className="py-6">
                <NavLink
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </NavLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Nav;
