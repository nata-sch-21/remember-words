import { handleActions } from 'redux-actions';
import { createStructuredSelector } from 'reselect';

import { FETCH_DICTIONARIES } from '../../constants';

export const initialState = {
  dictionaries: [],
  response: {
    status: '',
    message: '',
  },
};

const reducer = 'dictionaries';

const getLocalState = state => state[reducer];

// selectors
const getDictionaries = state => (getLocalState(state).dictionaries);
const getResponse = state => (getLocalState(state).response);
const getLanguage = state => (state.languages.languageFrom);

export const dictionariesSelector = createStructuredSelector({
  dictionaries: getDictionaries,
  response: getResponse,
  language: getLanguage,
});

// reducer
export default handleActions({
  [FETCH_DICTIONARIES]: (state, { payload }) => ({
    ...state,
    ...payload.data,
    response: payload.response,
  }),
}, initialState);
