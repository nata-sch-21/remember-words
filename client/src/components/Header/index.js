import React from 'react';
import PropTypes from 'prop-types';

import routes from '../../routes/routes';

const Header = ({ path }) => (
  <header className="col block margin-bottom_20">
    <h2>{routes[path] ? routes[path].header : ''}</h2>
  </header>
);

Header.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Header;
