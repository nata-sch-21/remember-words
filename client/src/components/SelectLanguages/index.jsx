import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../../config';
import Header from '../Header';

class SelectLanguages extends React.Component {
  render() {
    return (
      <div className="grid-1">
        <Header header="Select languages" />
        <div className="col-6 block">
          <h3>From:</h3>
          <div>
            <select name="from_language" id="from_language">
              <option value="">1serferreer</option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
            </select>
          </div>
        </div>
        <div className="col-6 block">
          <h3>To:</h3>
          <select name="from_language" id="from_language">
            <option value="">1serferreer</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>
        <div className="col block green">
          <Link to="/dictionaries">Go to dictionaries</Link>
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
