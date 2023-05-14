import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * @typedef {object} Props
 * @property {object} errorMsg - The error message object, which contains a status code and message.
 * @property {array} data - The data object, which contains additional error information.
 */

/**
 * Error component to display errors.
 * @param {Props} props
 */
function ErrorElement({ errorMsg: { statuscode, message }, data: { statusCode, status, errors } }) {
  ErrorElement.propTypes = {
    errorMsg: PropTypes.shape({
      statuscode: PropTypes.string,
      message: PropTypes.string,
    }),
    data: PropTypes.shape({
      statusCode: PropTypes.number,
      status: PropTypes.string,
      errors: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string,
        })
      ),
    }),
  };

  const navigate = useNavigate();
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="font-subheader text-lg">
          {statuscode}
          {statusCode + " " + status}
        </p>
        <h1 className="mt-4 font-header text-3xl sm:text-5xl">Oops! an Error</h1>
        <p className="text-paragraph mt-6 text-red-500">
          {message}
          {errors[0].message}
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

export default ErrorElement;
