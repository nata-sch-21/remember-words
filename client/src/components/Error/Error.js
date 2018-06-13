import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => (
  <div className="col block red">
    <h3>{message}</h3>
  </div>
);


Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
