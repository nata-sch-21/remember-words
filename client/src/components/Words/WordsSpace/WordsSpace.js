import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose, withStateHandlers, setDisplayName } from 'recompose';
import config from '../../../../config/app.config';
import Word from '../Word';
import NavigateButton from '../NavigateButton';
import ErrorPopup from '../ErrorPopup';

const WordsSpace = ({
  words,
  languageFrom,
  nextWordIndex,
  prevWordIndex,
  currentWordIndex,
  errorMessage,
  toggleErrorMessage,
  onChangeAnswer,
  currentAnswer,
  prev,
  next,
  goToResults,
  answers,
  dictionary,
}) => (
  <div className="col block">
    <ErrorPopup
      errorMessage={errorMessage}
      toggleErrorMessage={() => toggleErrorMessage('')}
    />
    <div className="pure-block">
      <div className="red quit button-text">
        <Link to="/">Quit</Link>
      </div>
      <Word
        currentWordIndex={currentWordIndex}
        title={words[currentWordIndex] ? words[currentWordIndex].translations[languageFrom] : ''}
        image={words[currentWordIndex] ? words[currentWordIndex].image : ''}
        onChangeAnswer={e => onChangeAnswer(e)}
        currentAnswer={currentAnswer}
        toggleErrorMessage={() => toggleErrorMessage('')}
      />
    </div>
    <div className="grid-2">
      <NavigateButton
        classButton={words[prevWordIndex] ? 'yellow' : 'inactive-button'}
        onClick={() => prev(words)}
        textButton="Previous"
      />

      <NavigateButton
        textButton={nextWordIndex > words.length ? 'Check results' : 'Next'}
        onClick={nextWordIndex > words.length
          ? () => {
              if (words.length === answers.length) {
                goToResults(
                  words,
                  answers,
                  dictionary.translations[config.defaultLanguage],
                );
              }
          }
          : () => next(words)}
      />
    </div>
  </div>
);

WordsSpace.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  languageFrom: PropTypes.string.isRequired,
  nextWordIndex: PropTypes.number.isRequired,
  prevWordIndex: PropTypes.number.isRequired,
  currentWordIndex: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
  toggleErrorMessage: PropTypes.func.isRequired,
  onChangeAnswer: PropTypes.func.isRequired,
  currentAnswer: PropTypes.string.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  goToResults: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  dictionary: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const putAnswerError = { errorMessage: 'Please put answer' };

export default compose(
  setDisplayName('EnhancedWordsSpace'),
  withStateHandlers(
    ({
      errorMessage = '',
      currentWordIndex = 0,
      prevWordIndex = null,
      nextWordIndex = 1,
      currentAnswer = '',
      answers = [],
    }) => ({
      errorMessage,
      currentWordIndex,
      prevWordIndex,
      nextWordIndex,
      currentAnswer,
      answers,
    }),
    {
      toggleErrorMessage: () => message => ({
        errorMessage: message,
      }),
      onChangeAnswer: () => e => ({
        currentAnswer: e.target.value,
      }),
      next: state => (words) => {
        const {
          currentAnswer, answers, currentWordIndex, nextWordIndex,
        } = state;

        if (!currentAnswer && nextWordIndex <= words.length) {
          return {
            ...state,
            ...putAnswerError,
          };
        }
        answers[currentWordIndex] = currentAnswer.trim();

        return {
          prevWordIndex: currentWordIndex,
          currentWordIndex: nextWordIndex,
          nextWordIndex: nextWordIndex + 1,
          currentAnswer: answers[nextWordIndex] || '',
          answers,
        };
      },
      prev: state => (words) => {
        const {
          currentAnswer, answers, currentWordIndex, prevWordIndex, nextWordIndex,
        } = state;

        if (!currentAnswer && nextWordIndex <= words.length) {
          return {
            ...state,
            ...putAnswerError,
          };
        }

        if (currentAnswer) {
          answers[currentWordIndex] = currentAnswer.trim();
        }

        return {
          prevWordIndex: words[prevWordIndex] && prevWordIndex !== 0 ? prevWordIndex - 1 : null,
          currentWordIndex: prevWordIndex,
          nextWordIndex: currentWordIndex,
          currentAnswer: answers[prevWordIndex] || '',
          answers,
        };
      },
    },
  ),
)(WordsSpace);
