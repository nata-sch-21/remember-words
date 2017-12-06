import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_ERROR } from '../../constants/app';
import config from '../../../config';

class CurrentWord extends React.Component {
  render() {
    return (
      <div className="grid-1 block">
        <h4 className="col">
          {this.props.title}
        </h4>
        <div className="col">
          <img src={this.props.image} alt="" />
        </div>
        <div className="col container">
          <div className="group">
            <input type="text" required name="name" onChange={this.props.onChangeAnswer} value={this.props.currentAnswer} />
            <span className="highlight" />
            <span className="bar" />
            <label htmlFor="name">Translation</label>
          </div>
        </div>
      </div>
    );
  }
}


CurrentWord.propTypes = {
  // words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CurrentWord;
