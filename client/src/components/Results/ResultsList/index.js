import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, branch, renderComponent } from 'recompose';
import { Redirect } from 'react-router';

import ResultsList from './ResultsList';
import { resultSelector } from '../../../reducers/results';
import isError from '../../HOCs/isError';

const mapStateToProps = state => resultSelector(state);

const mapDispatchToProps = () => ({});

export default compose(
  setDisplayName('ResultsListContainer'),
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ result, response }) => result.length === 0 && !response.status,
    renderComponent(() => <Redirect to="/start" push />),
  ),
  isError,
)(ResultsList);
