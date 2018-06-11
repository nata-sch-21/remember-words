import { handleActions } from 'redux-actions';

import {
  FETCH_BEST_RESULTS,
} from '../../constants';

export const initialState = {
  data: {
    bestResults: [],
  },
  response: {
    status: '',
    message: '',
  },
};

const reducerName = 'home';

const getLocalState = state => state[reducerName];

// selectors
export const getBestResults = state => (getLocalState(state).data.bestResults);
export const getResponse = state => (getLocalState(state).response);

// reducer
export default handleActions({
  [FETCH_BEST_RESULTS]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, initialState);
