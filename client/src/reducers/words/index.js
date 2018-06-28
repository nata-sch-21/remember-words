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
const dictionary = state => (getLocalState(state).dictionary);
const response = state => (getLocalState(state).response);
const words = state => (getLocalState(state).words);
const languages = state => (state.languages);

export const wordsSelector = createStructuredSelector({
  words,
  response,
  dictionary,
  languages,
});

// reducer
export default handleActions({
  [FETCH_DICTIONARY_WITH_WORDS]: (state, { payload }) => ({
    ...state,
    ...payload.data,
    response: { ...payload.response },
  }),
}, initialState);
