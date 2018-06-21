import { handleActions } from 'redux-actions';
import { createStructuredSelector } from 'reselect';

import { FETCH_BEST_RESULTS } from '../../constants';

export const initialState = {
  bestResults: [],
  response: {
    status: '',
    message: '',
  },
};

const reducer = 'home';

const getLocalState = state => state[reducer];

// selectors
export const getBestResults = state => (getLocalState(state).bestResults);
export const getResponse = state => (getLocalState(state).response);

export const homeSelector = createStructuredSelector({
  bestResults: getBestResults,
  response: getResponse,
});

// reducer
export default handleActions({
  [FETCH_BEST_RESULTS]: (state, { payload }) => ({
    ...state,
    ...payload.data,
    response: payload.response,
  }),
}, initialState);
