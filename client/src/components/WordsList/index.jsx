import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectLanguages from '../../components/SelectLanguages';
// import { requestGetDictionaries } from '../../actions/dictionaries';
import { STATUS_ERROR } from '../../constants/app';
import config from '../../../config';
import Header from '../Header';
import CurrentWord from './CurrentWord';
import { words } from '../../../test/testData';

class WordsList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(requestGetDictionaries());
  }

  getCurrentWord() {
    return <CurrentWord word={words[0]} />;
  }

  render() {
    return (
      <div className="grid-1">
        <Header header="dictionary name" />
        <div className="col block">
          <div className="pure-block">
            {this.getCurrentWord()}
          </div>
          <div className="grid-2">
            <div className="col">
              <div className="block yellow">
                prev
              </div>
            </div>
            <div className="col">
              <div className="block green">
                next
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.dictionaries;
  return {
    // words: currentState.words || [],
    // isFetching: currentState.isFetching || false,
    // response: currentState.response || {},
    // currentDictionary: currentState.currentDictionary || {},
  };
};

WordsList.propTypes = {
  // words: PropTypes.arrayOf(PropTypes.object).isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // response: PropTypes.shape({
  //   status: PropTypes.string,
  //   message: PropTypes.string,
  // }).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export { WordsList };
export default connect(mapStateToProps)(WordsList);
