import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { requestGetDictionaryWithWords } from '../../../actions/words';
import { calculateCurrentResults } from '../../../actions/results';
import config from '../../../../config/app.config';
import Word from '../Word';

class WordsSpace extends React.Component {
  constructor() {
    super();

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

  state = {
    currentWordIndex: null,
    prevWordIndex: null,
    nextWordIndex: null,
    errorMessage: '',
    currentAnswer: '',
    answers: [],
  };

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
return <div>word</div>
    return (
      <Word
        title={words[this.state.currentWordIndex].translations[languageFrom]}
        image={words[this.state.currentWordIndex].image}
        onChangeAnswer={this.onChangeAnswer}
        currentAnswer={this.state.currentAnswer}
        toggleErrorMessage={this.toggleErrorMessage}
      />
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

  render() {
    if (!this.props.languageFrom) {
      return <Redirect to="/start" push />;
    }


    if (!this.props.response.status && this.props.isFetching === false) {
      return null;
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
}

WordsSpace.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  dictionary: PropTypes.shape({
    _id: PropTypes.string,
    translations: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  languageFrom: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default WordsSpace;

// dictionary.translations[this.props.languageFrom]