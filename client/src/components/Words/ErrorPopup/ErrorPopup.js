import React from 'react';
import PropTypes from 'prop-types';

const ErrorPopup = ({ errorMessage, toggleErrorMessage }) => (
  <div className="red block button-text">
    <p>
      <i className="icon-close" onClick={toggleErrorMessage}>x</i>
      {errorMessage}
    </p>
  </div>
);

ErrorPopup.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  toggleErrorMessage: PropTypes.func.isRequired,
};

export default ErrorPopup;
