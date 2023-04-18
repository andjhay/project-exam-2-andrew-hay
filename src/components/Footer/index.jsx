import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="grid divide-y divide-yellowsand bg-sand p-2 lg:grid-cols-2 lg:divide-x lg:divide-y-0 ">
      <div className="grid grid-cols-2 justify-items-center sm:grid-cols-4">
        <Link className="m-1">Sitemap</Link>
        <Link className="m-1">Home</Link>
        <Link className="m-1">Profile</Link>
        <Link className="m-1">Venues</Link>
      </div>
      <div className="grid grid-cols-2 justify-items-center sm:grid-cols-4">
        <Link className="m-1">Privacy Policy</Link>
        <Link className="m-1">Cookies</Link>
        <Link className="m-1">FAQ</Link>
        <span className="m-1">&copy;Copyright 2023</span>
      </div>
    </footer>
  );
}

export default Footer;
