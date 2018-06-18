import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="col">
    <div className="text-center">
      <h2>Page not found.</h2>
      <Link to="/">Go to Home page</Link>
    </div>
  </div>
);

export default NotFound;
