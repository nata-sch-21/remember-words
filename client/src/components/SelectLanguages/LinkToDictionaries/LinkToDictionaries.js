import React from 'react';
import PropTypes from 'prop-types';
import { branch, renderComponent } from 'recompose';

const EnabledLink = ({ goToDictionaries }) => (
  <div className="col block button-text green" onClick={goToDictionaries}>
    <span>Go to dictionaries</span>
  </div>
);

EnabledLink.propTypes = {
  goToDictionaries: PropTypes.func.isRequired,
};

const DisabledLink = () => (
  <div className="col block button-text inactive-button">
    <span>Please select both languages</span>
  </div>
);

export default branch(
  ({ enabled }) => !enabled,
  renderComponent(DisabledLink),
)(EnabledLink);
