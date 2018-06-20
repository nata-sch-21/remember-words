import React from 'react';
import PropTypes from 'prop-types';

const headers = {
  '/': {
    header: 'Let\'s remember the words',
    route: '/',
  },
  '/start': {
    header: 'Select languages',
    route: '/start',
  },
  '/dictionaries': {
    header: 'Dictionaries',
    route: '/dictionaries',
  },
};

const Header = ({ path }) => (
  <header className="col block margin-bottom_20">
    <h2>{headers[path].header || ''}</h2>
  </header>
);

Header.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Header;
