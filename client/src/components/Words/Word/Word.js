import React from 'react';
import PropTypes from 'prop-types';

import '../input.scss';

const Word = ({
  title, image, toggleErrorMessage, onChangeAnswer, currentAnswer,
}) => (
  <div className="grid-1 block">
    <h4 className="col">
      {title}
      {/* <i className="ion-android-volume-up audio-icon" /> */}
    </h4>
    <div className="col img-container">
      <img src={image} alt="" />
    </div>
    <div className="col container">
      <div className="group">
        <input
          type="text"
          required
          name="name"
          onFocus={toggleErrorMessage}
          onChange={onChangeAnswer}
          value={currentAnswer}
        />
        <span className="highlight" />
        <span className="bar" />
        <span className="label">Translation</span>
      </div>
    </div>
  </div>
);


Word.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onChangeAnswer: PropTypes.func.isRequired,
  toggleErrorMessage: PropTypes.func.isRequired,
  currentAnswer: PropTypes.string.isRequired,
};

export default Word;
