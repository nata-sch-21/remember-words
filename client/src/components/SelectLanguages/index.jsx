import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../../config';
import Header from '../Header';

class SelectLanguages extends React.Component {
  render() {
    return (
      <div className="grid-1">
        <Header header="Select languages" />
        <div className="col-6 block margin-bottom_20">
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
        <div className="col-6 block margin-bottom_20">
          <h3>To:</h3>
          <select name="from_language" id="from_language">
            <option value="">1serferreer</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>
        <div className="col block green button-text">
          <Link to="/dictionaries">Go to dictionaries</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.dictionaries;
  return {
    // dictionaries: currentState.dictionaries || [],
    // isFetching: currentState.isFetching || false,
    // response: currentState.response || null,
  };
};

SelectLanguages.propTypes = {
  // words: PropTypes.arrayOf(PropTypes.object).isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // response: PropTypes.shape({
  //   status: PropTypes.string,
  //   message: PropTypes.string,
  // }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export { SelectLanguages };
export default connect(mapStateToProps)(SelectLanguages);