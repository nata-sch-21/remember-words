import React from 'react';
import PropTypes from 'prop-types';

const CurrentWord = props => (
  <div className="grid-1 block">
    <h4 className="col">
      {props.title}
      {/* <i className="ion-android-volume-up audio-icon" /> */}
    </h4>
    <div className="col img-container">
      <img src={props.image} alt="" />
    </div>
    <div className="col container">
      <div className="group">
        <input type="text" required name="name" onChange={props.onChangeAnswer} value={props.currentAnswer} />
        <span className="highlight" />
        <span className="bar" />
        <label htmlFor="name">Translation</label>
      </div>
    </div>
  </div>
);


CurrentWord.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onChangeAnswer: PropTypes.func.isRequired,
  currentAnswer: PropTypes.string.isRequired,
};

export default CurrentWord;
