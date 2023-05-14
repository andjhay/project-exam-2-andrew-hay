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
            <li className="hover:text-blue-500">Venues</li>
          </Link>
          <Link to="/venuesmap">
            <li className="hover:text-blue-500">Venues Map</li>
          </Link>
          <Link to="/privacy">
            <li className="hover:text-blue-500">Privacy Policy</li>
          </Link>
          <Link to="/cookies">
            <li className="hover:text-blue-500">Cookie Policy</li>
          </Link>
          <Link to="/faq">
            <li className="hover:text-blue-500">FAQ</li>
          </Link>
          <Link to="*">
            <li className="hover:text-blue-500">Route Not Found</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sitemap;
