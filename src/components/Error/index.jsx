import PropTypes from "prop-types"
import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorElement({ errorMsg, data }) {
  const navigate = useNavigate();
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="font-subheader text-lg">
          {errorMsg.statuscode}
          {data.statusCode + " " + data.status}
        </p>
        <h1 className="mt-4 font-header text-3xl sm:text-5xl">Oops! an Error</h1>
        <p className="text-paragraph mt-6 text-red-500">
          {errorMsg.message}
          {data.errors[0].message}
        </p>
        <div className="mt-5">
          <button onClick={() => navigate("/")} className="main-button shadow">
            Go back to home
          </button>
        </div>
      </div>
    </div>
  );
}

ErrorElement.propTypes = {
  data: PropTypes.shape({
    errors: PropTypes.any,
    status: PropTypes.any,
    statusCode: PropTypes.string
  }),
  errorMsg: PropTypes.shape({
    message: PropTypes.any,
    statuscode: PropTypes.any
  })
}

export default ErrorElement;
