import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose, withStateHandlers, setDisplayName } from 'recompose';
import config from '../../../../config/app.config';
import Word from '../Word';
import NavigateButton from '../NavigateButton';
import ErrorPopup from '../ErrorPopup';

class WordsSpace extends Component {
  constructor() {
    super();

    this.addAnswer = () => {
      if (!this.state.currentAnswer) {
        this.props.toggleErrorMessage('Please put answer');
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

      const { words } = this.props;

      if (words.length !== this.state.answers.length) {
        this.props.toggleErrorMessage('Please put all answers');
        return;
      }

      this.props.goToResults(
        words,
        this.state.answers,
        this.props.dictionary.translations[config.defaultLanguage],
      );
    };
  }

  state = {
    currentWordIndex: 0,
    prevWordIndex: null,
    nextWordIndex: 1,
    currentAnswer: '',
    answers: [],
  };

  render() {
    const { words, languageFrom } = this.props;
    const { nextWordIndex, prevWordIndex } = this.state;

    const word = words[this.state.currentWordIndex];

    return (
      <div className="col block">
        <ErrorPopup
          errorMessage={this.props.errorMessage}
          toggleErrorMessage={() => this.props.toggleErrorMessage('')}
        />
        <div className="pure-block">
          <div className="red quit button-text">
            <Link to="/">Quit</Link>
          </div>
          <Word
            currentWordIndex={this.state.currentWordIndex}
            title={word ? word.translations[languageFrom] : ''}
            image={word ? word.image : ''}
            onChangeAnswer={this.onChangeAnswer}
            currentAnswer={this.state.currentAnswer}
            toggleErrorMessage={() => this.props.toggleErrorMessage('')}
          />
        </div>
        <div className="grid-2">
          <NavigateButton
            classButton={words[prevWordIndex] ? 'yellow' : 'inactive-button'}
            onClick={() => this.prev()}
            textButton="Previous"
          />

          <NavigateButton
            textButton={nextWordIndex === words.length ? 'Check results' : 'Next'}
            onClick={nextWordIndex === words.length
              ? () => this.goToFinishTest()
              : () => this.next()}
          />
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
  goToResults: PropTypes.func.isRequired,
};

export default compose(
  setDisplayName('EnhancedWordsSpace'),
  withStateHandlers(
    ({ errorMessage = '' }) => ({
      errorMessage,
    }),
    {
      toggleErrorMessage: () => message => ({
        errorMessage: message,
      }),
    },
  ),
)(WordsSpace);
