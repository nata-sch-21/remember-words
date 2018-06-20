import { handleActions } from 'redux-actions';
import { createStructuredSelector } from 'reselect';

import { SELECT_LANGUAGE } from '../../constants';

export const initialState = {
  languageFrom: '',
  languageTo: '',
};

const reducer = 'languages';

const getLocalState = state => state[reducer];

// selectors
export const languagesSelector = createStructuredSelector({
  languageFrom: state => (getLocalState(state).languageFrom),
  languageTo: state => (getLocalState(state).languageTo),
});

// reducer
export default handleActions({
  [SELECT_LANGUAGE]: (state, { payload }) => ({
    ...state,
    languageFrom: payload.languageFrom || initialState.languageFrom,
    languageTo: payload.languageTo || initialState.languageTo,
  }),
}, initialState);
