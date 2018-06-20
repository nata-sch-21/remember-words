import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestGetDictionaries } from '../../../actions/dictionaries';
import Dictionaries from './DictionariesList';

const mapStateToProps = (state) => {
  console.log(state);
  const currentState = state.dictionaries;
  return {
    dictionaries: currentState.dictionaries,
    isFetching: currentState.isFetching,
    response: currentState.response,
    language: state.languages.languageFrom,
  };
};

export default connect(mapStateToProps)(Dictionaries);
