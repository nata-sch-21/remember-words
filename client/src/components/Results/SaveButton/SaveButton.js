import React from 'react';
import PropTypes from 'prop-types';
import {
  STATUS_ERROR,
  STATUS_OK,
} from '../../../constants';

const SaveButton = ({ response }) => {
  let saveSpan = (<span onClick={this.props.saveResult}>Save result</span>);
  let buttonState = 'yellow';

  if (response.status === STATUS_OK) {
    saveSpan = (<span>{response.message}</span>);
    buttonState = 'inactive-button';
  } else if (response.status === STATUS_ERROR) {
    saveSpan = (<span onClick={this.props.saveResult}>{response.message}</span>);
  }

  return (
    <div className={`block button-text ${buttonState}`}>
      {saveSpan}
    </div>
  );
};

SaveButton.propTypes = {
  response: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default SaveButton;
