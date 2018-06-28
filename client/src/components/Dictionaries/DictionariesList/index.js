import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, setDisplayName, branch, renderComponent } from 'recompose';
import { Redirect } from 'react-router';

import { dictionariesSelector } from '../../../reducers/dictionaries';
import fetchDictionaries from '../../../actions/dictionaries';
import DictionariesList from './DictionariesList';
import isFetching from '../../HOCs/isFetching';
import isError from '../../HOCs/isError';

const mapStateToProps = state => dictionariesSelector(state);

const mapDispatchToProps = dispatch => ({
  fetchDictionaries: () => dispatch(fetchDictionaries()),
});

export default compose(
  setDisplayName('DictionariesContainer'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchDictionaries();
    },
  }),
  branch(
    ({ languageFrom }) => !languageFrom,
    renderComponent(() => <Redirect to="/start" push />),
  ),
  isFetching,
  isError,
)(DictionariesList);
