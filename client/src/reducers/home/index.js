import { FETCH_LAST_RESULTS, FETCH_LAST_RESULTS_ERROR, FETCH_LAST_RESULTS_SUCCESS } from '../../constants/home';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';

export const initialState = {
  lastResults: [],
  response: {
    status: '',
    message: '',
  },
  isFetching: false,
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case FETCH_LAST_RESULTS:
      return { ...initialState, isFetching: true };
    case FETCH_LAST_RESULTS_SUCCESS:
      return {
        lastResults: action.payload.lastResults,
        response: { ...state.response, status: STATUS_OK },
        isFetching: false,
      };
    case FETCH_LAST_RESULTS_ERROR:
      return {
        ...state,
        response: { status: STATUS_ERROR, message: action.payload.message },
        isFetching: false,
      };
    default:
      return state;
  }
}
