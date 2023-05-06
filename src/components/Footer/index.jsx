import React from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

/**
 * Footer component with links to site information.
 */
function Footer() {
  let { user } = useUser();
  return (
    <footer className="grid grid-cols-2 divide-x divide-black bg-sand p-2 font-paragraph ">
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2">
        <Link id="footer-sitemap" to="/sitemap" className="hover:text-white">
          Sitemap
        </Link>
        <Link id="footer-home" to="/" className="hover:text-white">
          Home
        </Link>
        <Link
          id="footer-account"
          to={"/account/" + user?.name}
          className={user?.name === undefined ? "pointer-events-none opacity-50" : "hover:text-white"}
        >
          Account
        </Link>
        <Link id="footer-venues" to="/venues" className="hover:text-white">
          Venues
        </Link>
      </div>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2">
        <span>&copy;Copyright 2023</span>
        <Link id="footer-privacy" to="/privacy" className="hover:text-white">
          Privacy Policy
        </Link>
        <Link id="footer-cookies" to="/cookies" className="hover:text-white">
          Cookies
        </Link>
        <Link id="footer-faq" to="/faq" className="hover:text-white">
          FAQ
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
