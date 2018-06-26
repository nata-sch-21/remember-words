import React from 'react';
import PropTypes from 'prop-types';

const NavigateButton = ({
  onClick, classButton, textButton,
}) => (
  <div className="col">
    <div className={`block button-text ${classButton}`}>
      <span onClick={onClick}>{textButton}</span>
    </div>
  </div>
);

NavigateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classButton: PropTypes.string,
  textButton: PropTypes.string.isRequired,
};

NavigateButton.defaultProps = {
  classButton: 'green',
};

export default NavigateButton;
