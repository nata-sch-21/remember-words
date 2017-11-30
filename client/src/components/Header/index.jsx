import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <header className="col block margin-bottom_20">
    <h2>{props.header}</h2>
  </header>
);

Header.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Header;
