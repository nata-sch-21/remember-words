import { handleActions } from 'redux-actions';
import { createStructuredSelector } from 'reselect';

import {
  UPLOAD_RESULT,
  CALCULATE_CURRENT_RESULTS,
} from '../../constants';

export const initialState = {
  result: [],
  response: {
    status: '',
    message: '',
  },
  answerData: null,
  uploadResultResponse: {
    status: '',
    message: '',
  },
};

const reducer = 'results';

const getLocalState = state => state[reducer];

// selectors
const answerData = state => (getLocalState(state).answerData);
const response = state => (getLocalState(state).response);
const uploadResultResponse = state => (getLocalState(state).uploadResultResponse);
const result = state => (getLocalState(state).result);
const languageFrom = state => (state.languages.languageFrom);
const languageTo = state => (state.languages.languageTo);

export const resultSelector = createStructuredSelector({
  response,
  result,
  languageTo,
  languageFrom,
});

export const uploadResultSelector = createStructuredSelector({
  answerData,
  uploadResultResponse,
});

// reducer
export default handleActions({
  [CALCULATE_CURRENT_RESULTS]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [UPLOAD_RESULT]: (state, { payload }) => ({
    ...state,
    uploadResultResponse: { ...initialState.uploadResultResponse, ...payload },
  }),
}, initialState);
