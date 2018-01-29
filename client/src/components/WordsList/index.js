import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { requestGetDictionaryWithWords } from '../../actions/words';
import { calculateCurrentResults } from '../../actions/results';
import { STATUS_ERROR } from '../../constants/app';
import config from '../../../config/app.config';
import Header from '../Header';
import Loader from '../Loader';
import CurrentWord from '../CurrentWord';

class WordsList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentWordIndex: null,
      prevWordIndex: null,
      nextWordIndex: null,
      errorMessage: '',
      currentAnswer: '',
      answers: [],
    };

    this.addAnswer = () => {
      if (!this.state.currentAnswer) {
        this.toggleErrorMessage('Please put answer');
        return false;
      }

      const { answers } = this.state;
      answers[this.state.currentWordIndex] = this.state.currentAnswer.trim();
      this.setState({
        answers,
      });
      return true;
    };

    this.onChangeAnswer = (e) => {
      this.setState({
        currentAnswer: e.target.value,
      });
    };

    this.next = () => {
      if (!this.addAnswer()) {
        return;
      }

      this.setState({
        prevWordIndex: this.state.currentWordIndex,
        currentWordIndex: this.state.nextWordIndex,
        nextWordIndex: this.state.nextWordIndex + 1,
        currentAnswer: this.state.answers[this.state.nextWordIndex] || '',
      });
    };

    this.prev = () => {
      if (!this.addAnswer()) {
        return;
      }

      const { words } = this.props;
      this.setState({
        prevWordIndex: words[this.state.prevWordIndex] ? this.state.prevWordIndex - 1 : null,
        currentWordIndex: this.state.prevWordIndex,
        nextWordIndex: this.state.currentWordIndex,
        currentAnswer: this.state.answers[this.state.prevWordIndex] || '',
      });
    };

    this.goToFinishTest = () => {
      if (!this.addAnswer()) {
        return;
      }

      const { words, dispatch } = this.props;

      if (words.length !== this.state.answers.length) {
        this.toggleErrorMessage('Please put all answers');
        return;
      }
      dispatch(calculateCurrentResults(
        words,
        this.state.answers,
        this.props.dictionary.translations[config.defaultLanguage],
      ));
      this.props.history.push('/results');
    };

    this.toggleErrorMessage = (message) => {
      this.setState({
        errorMessage: message,
      });
    };
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    const path = history.location.pathname;
    const paths = path.split('/');
    dispatch(requestGetDictionaryWithWords(paths[2]));
  }

  componentWillReceiveProps() {
    if (this.state.currentWordIndex === null && this.state.nextWordIndex === null) {
      this.setState({
        currentWordIndex: 0,
        nextWordIndex: 1,
      });
    }
  }

  renderCurrentWord() {
    if (this.state.currentWordIndex === null) {
      return null;
    }

    const { words, languageFrom } = this.props;

    return (
      <CurrentWord
        title={words[this.state.currentWordIndex].translations[languageFrom]}
        image={words[this.state.currentWordIndex].image}
        onChangeAnswer={this.onChangeAnswer}
        currentAnswer={this.state.currentAnswer}
        toggleErrorMessage={this.toggleErrorMessage}
      />
    );
  }

  renderHeader() {
    const { dictionary } = this.props;
    if (!dictionary.translations) {
      return null;
    }

    return <Header header={dictionary.translations[this.props.languageFrom]} />;
  }

  renderError() {
    return (
      <div className="col block red">
        <h3>{this.props.response.message}</h3>
      </div>
    );
  }

  renderPreviousButton() {
    let classButton = 'inactive-button';
    const { words } = this.props;
    if (words[this.state.prevWordIndex]) {
      classButton = 'yellow';
    }

    return (
      <div className="col">
        <div className={`block button-text ${classButton}`}>
          <span onClick={this.prev}>Previous</span>
        </div>
      </div>
    );
  }

  renderNextButton() {
    let textButton = 'Next';
    let onClick = this.next;

    if (this.state.nextWordIndex === this.props.words.length) {
      textButton = 'Check results';
      onClick = this.goToFinishTest;
    }

    return (
      <div className="col">
        <div className="block button-text green">
          <span onClick={onClick}>{textButton}</span>
        </div>
      </div>
    );
  }

  renderErrorPopup() {
    const { errorMessage } = this.state;

    if (!errorMessage) {
      return null;
    }

    return (
      <div className="red block button-text">
        <p>
          <i className="icon-close" onClick={() => this.toggleErrorMessage('')}>x</i>
          {errorMessage}
        </p>
      </div>
    );
  }

  renderContent() {
    if (!this.props.response.status && this.props.isFetching === false) {
      return null;
    }

    if (this.props.response.status === STATUS_ERROR) {
      return this.renderError();
    }

    if (this.props.isFetching === true) {
      return <Loader />;
    }

    return (
      <div className="col block">
        {this.renderErrorPopup()}
        <div className="pure-block">
          <div className="red quit button-text">
            <Link to="/">Quit</Link>
          </div>
          {this.renderCurrentWord()}
        </div>
        <div className="grid-2">
          {this.renderPreviousButton()}
          {this.renderNextButton()}
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.languageFrom) {
      return <Redirect to="/start" push />;
    }

    return (
      <div className="grid-1">
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.words;
  return {
    words: currentState.words,
    isFetching: currentState.isFetching,
    response: currentState.response,
    dictionary: currentState.dictionary,
    languageFrom: state.languages.languageFrom,
  };
};

WordsList.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  dictionary: PropTypes.shape({
    _id: PropTypes.string,
    translations: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  languageFrom: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export { WordsList };
export default connect(mapStateToProps)(WordsList);
