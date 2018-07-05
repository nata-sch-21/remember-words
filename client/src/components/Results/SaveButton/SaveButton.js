import React from 'react';
import PropTypes from 'prop-types';
import {
  STATUS_ERROR,
  STATUS_OK,
} from '../../../constants';

const SaveButton = ({ response, uploadResult, answerData }) => {
  let saveSpan = (<span onClick={uploadResult}>Save result</span>);
  let buttonState = 'yellow';

  if (response.status === STATUS_OK) {
    saveSpan = (<span>{response.message}</span>);
    buttonState = 'inactive-button';
  } else if (response.status === STATUS_ERROR) {
    saveSpan = (
      <span onClick={() => uploadResult(answerData)}>
        Error: {response.message}. Save again
      </span>
    );
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
  uploadResult: PropTypes.func.isRequired,
  answerData: PropTypes.shape({
    countCorrectAnswers: PropTypes.number.isRequired,
    countWords: PropTypes.number.isRequired,
    dictionaryName: PropTypes.string.isRequired,
    coefficient: PropTypes.number.isRequired,
  }).isRequired,
};

export default SaveButton;
