import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_ERROR } from '../../constants/app';
import config from '../../../config';

class CurrentWord extends React.Component {
  render() {
    return (
      <div className="grid-1 block">
        <div className="col">
          <img src={this.props.word.image} alt="" />
        </div>
      </div>
    );
  }
}


CurrentWord.propTypes = {
  // words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CurrentWord;
