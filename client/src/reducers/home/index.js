import {
  FETCH_BEST_RESULTS,
  FETCH_BEST_RESULTS_ERROR,
  FETCH_BEST_RESULTS_SUCCESS,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';

export const initialState = {
  bestResults: [],
  response: {
    status: '',
    message: '',
  },
  isFetching: false,
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case FETCH_BEST_RESULTS:
      return { ...initialState, isFetching: true };
    case FETCH_BEST_RESULTS_SUCCESS:
      return {
        bestResults: action.payload.bestResults || [],
        response: { ...state.response, status: STATUS_OK },
        isFetching: false,
      };
    case FETCH_BEST_RESULTS_ERROR:
      return {
        ...state,
        response: { status: STATUS_ERROR, message: action.payload.message },
        isFetching: false,
      };
    default:
      return state;
  }
}
