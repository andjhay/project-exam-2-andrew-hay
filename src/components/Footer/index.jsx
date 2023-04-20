import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="grid grid-cols-2 divide-x divide-black bg-sand p-2 ">
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2">
        <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/account/:id" className="hover:text-white">Account</Link>
        <Link to="/venues" className="hover:text-white">Venues</Link>
      </div>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2">
        <span>&copy;Copyright 2023</span>
        <Link to="/policy" className="hover:text-white">Privacy Policy</Link>
        <Link to="/cookies" className="hover:text-white">Cookies</Link>
        <Link to="/faq" className="hover:text-white">FAQ</Link>
      </div>
    </footer>
  );
}

export default Footer;
