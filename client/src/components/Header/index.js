import React from 'react';
import PropTypes from 'prop-types';

const headers = {
  '/': 'Let\'s remember the words',
  '/start': 'Select languages',
};

const Header = ({ path }) => (
  <header className="col block margin-bottom_20">
    <h2>{headers[path] || ''}</h2>
  </header>
);

Header.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Header;
