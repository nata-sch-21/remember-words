import { handleActions } from 'redux-actions';
import { createStructuredSelector } from 'reselect';

import { FETCH_DICTIONARY_WITH_WORDS } from '../../constants';

export const initialState = {
  dictionary: {},
  words: [],
  response: {
    status: '',
    message: '',
  },
};

const reducer = 'words';

const getLocalState = state => state[reducer];

// selectors
const getDictionary = state => (getLocalState(state).dictionary);
const getResponse = state => (getLocalState(state).response);
const getWords = state => (getLocalState(state).words);
const getLanguage = state => (state.languages.languageFrom);

export const wordsSelector = createStructuredSelector({
  words: getWords,
  response: getResponse,
  dictionary: getDictionary,
  languageFrom: getLanguage,
});

// reducer
export default handleActions({
  [FETCH_DICTIONARY_WITH_WORDS]: (state, { payload }) => ({
    ...state,
    ...payload.data,
    response: { ...payload.response },
  }),
}, initialState);
