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
const bestResults = state => (getLocalState(state).bestResults);
const response = state => (getLocalState(state).response);

export const homeSelector = createStructuredSelector({
  bestResults,
  response,
});

// reducer
export default handleActions({
  [FETCH_BEST_RESULTS]: (state, { payload }) => ({
    ...state,
    ...payload.data,
    response: { ...payload.response },
  }),
}, initialState);
