import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';

class SelectLanguages extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-1 full-width">
          <h3>From:</h3>
        </div>
        <div className="col-1 full-width">
          <h3>To:</h3>
        </div>
      </div>
    );
  }
}

SelectLanguages.propTypes = {
  // words: PropTypes.arrayOf(PropTypes.object).isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // response: PropTypes.shape({
  //   status: PropTypes.string,
  //   message: PropTypes.string,
  // }).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export default SelectLanguages;
