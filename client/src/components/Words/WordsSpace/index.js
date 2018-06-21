import React from 'react';
import { compose, lifecycle, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { requestGetDictionaryWithWords } from '../../../actions/words';
import { calculateCurrentResults } from '../../../actions/results';
import config from '../../../../config/app.config';
import WordsSpace from './WordsSpace';
import isFetching from '../../HOCs/isFetching';
import isError from '../../HOCs/isError';

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

const mapDispatchToProps = dispatch => ({
  // fetchDictionary: () => dispatch(fetchDictionaries()),
  dispatch
});

export default compose(
  setDisplayName('WordsSpaceContainer'),
  connect(mapStateToProps, mapDispatchToProps),
)((WordsSpace));



// dictionary.translations[this.props.languageFrom]