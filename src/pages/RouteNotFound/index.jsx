import React from "react";
import { useNavigate } from "react-router-dom";

function RouteNotFound() {
  const navigate = useNavigate();
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="font-subheader text-lg">404</p>
        <h1 className="mt-4 font-header text-3xl sm:text-5xl">Oops! Page not found</h1>
        <p className="text-paragraph mt-6 text-gray-600">Sorry, this page doesn&apos;t exist</p>
        <div className="mt-5">
          <button onClick={() => navigate("/")} className="main-button shadow">
            Go back to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default RouteNotFound;
