import React from 'react';
import { Link } from 'react-router-dom';
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
  constructor() {
    super();
    this.state = {
      currentWordIndex: 0, // null
      prevWordIndex: null,
      nextWordIndex: 1, // null
    };

    this.next = () => {
      this.setState({
        prevWordIndex: this.state.currentWordIndex,
        currentWordIndex: this.state.nextWordIndex,
        nextWordIndex: this.state.nextWordIndex + 1,
      });
    };

    this.prev = () => {
      this.setState({
        prevWordIndex: this.state.prevWordIndex - 1,
        currentWordIndex: this.state.prevWordIndex,
        nextWordIndex: this.state.currentWordIndex,
      });
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(requestGetDictionaries());
  }

  componentWillReceiveProps() {
    if (this.state.currentWordIndex === null && this.state.nextWordIndex === null) {
      this.setState({
        currentWordIndex: 0,
        nextWordIndex: 1,
      });
    }
  }

  getCurrentWord() {
    if (this.state.currentWordIndex === null) {
      return null;
    }

    return <CurrentWord word={words[this.state.currentWordIndex]} />;
  }

  render() {
    return (
      <div className="grid-1">
        <Header header="dictionary name" />
        <div className="col block">
          <div className="pure-block">
            <div className="red quit button-text">
              <Link to="/">Quit</Link>
            </div>
            {this.getCurrentWord()}
          </div>
          <div className="grid-2">
            <div className="col">
              <div className="block yellow button-text">
                <span onClick={this.prev}>Previous</span>
              </div>
            </div>
            <div className="col">
              <div className="block green button-text">
                <span onClick={this.next}>Next</span>
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
