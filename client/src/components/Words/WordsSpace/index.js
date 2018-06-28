import React from 'react';
import { compose, lifecycle, setDisplayName, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import fetchDictionaryWithWords from '../../../actions/words';
import selectLanguages from '../../../actions/languages';
import { calculateCurrentResults } from '../../../actions/results';
import { wordsSelector } from '../../../reducers/words';
import WordsSpace from './WordsSpace';
import isFetching from '../../HOCs/isFetching';
import isError from '../../HOCs/isError';

const mapStateToProps = state => wordsSelector(state);

const mapDispatchToProps = (dispatch, props) => ({
  fetchDictionaryWithWords: () => dispatch(fetchDictionaryWithWords(props.match.params.id)),
  goToResults: (words, answers, dictionaryName, languages) => {
    dispatch(calculateCurrentResults({
      words,
      answers,
      dictionaryName,
      languages,
    }));
    props.history.push('/results');
    dispatch(selectLanguages({}));
  },
});

export default compose(
  setDisplayName('WordsSpaceContainer'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchDictionaryWithWords();
    },
  }),
  branch(
    ({ languages }) => !languages.languageFrom,
    renderComponent(() => <Redirect to="/start" push />),
  ),
  isFetching,
  isError,
)((WordsSpace));
