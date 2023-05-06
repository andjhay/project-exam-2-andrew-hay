import React from "react";
import { Link } from "react-router-dom";

/**
 * Sitemap Page to display a list of links around the site the user can access.
 */
function Sitemap() {
  return (
    <div className="flex flex-col items-center font-paragraph">
      <h1 className="m-3 text-center font-header text-2xl">Sitemap</h1>
      <div>
        <ul className="list-disc">
          <Link to="/venues">
            <li>Venues</li>
          </Link>
          <Link to="/venuesmap">
            <li>Venues Map</li>
          </Link>
          <Link to="/privacy">
            <li>Privacy Policy</li>
          </Link>
          <Link to="/cookies">
            <li>Cookie Policy</li>
          </Link>
          <Link to="/faq">
            <li>FAQ</li>
          </Link>
          <Link to="*">
            <li>Route Not Found</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sitemap;
