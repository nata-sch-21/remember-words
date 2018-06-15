import React from 'react';
import { shape, string } from 'prop-types';

const Error = ({ response: { message } }) => (
  <div className="col block red">
    <h3>{message}</h3>
  </div>
);


Error.propTypes = {
  response: shape({
    message: string,
  }).isRequired,
};

export default Error;
