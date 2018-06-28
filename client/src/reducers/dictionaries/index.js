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
const dictionaries = state => (getLocalState(state).dictionaries);
const response = state => (getLocalState(state).response);
const languageFrom = state => (state.languages.languageFrom);

export const dictionariesSelector = createStructuredSelector({
  dictionaries,
  response,
  languageFrom,
});

// reducer
export default handleActions({
  [FETCH_DICTIONARIES]: (state, { payload }) => ({
    ...state,
    ...payload.data,
    response: { ...payload.response },
  }),
}, initialState);
