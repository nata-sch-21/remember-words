import { FETCH_SAVE_RESULTS_SUCCESS, CALCULATE_CURRENT_RESULTS_SUCCESS, FETCH_SAVE_RESULTS_ERROR, CALCULATE_CURRENT_RESULTS_ERROR, FETCH_SAVE_RESULTS } from '../../constants/results';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';

export const initialState = {
  result: [],
  response: {
    status: '',
    message: '',
  },
  answerData: null,
  saving: {
    response: {
      status: '',
      message: '',
    },
    isFetching: false,
  },
};

export default function results(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_CURRENT_RESULTS_SUCCESS:
      return {
        ...initialState,
        result: action.payload.result,
        answerData: action.payload.answerData,
        response: { status: STATUS_OK, message: action.payload.message },
      };
    case CALCULATE_CURRENT_RESULTS_ERROR:
      return {
        ...initialState,
        response: { status: STATUS_ERROR, message: action.payload.message },
      };
    case FETCH_SAVE_RESULTS:
      return {
        ...state,
        saving: { ...initialState.saving.response, isFetching: true },
      };
    case FETCH_SAVE_RESULTS_SUCCESS:
      return {
        ...state,
        saving: {
          response: { status: STATUS_OK, message: action.payload.message },
          isFetching: false,
        },
      };
    case FETCH_SAVE_RESULTS_ERROR:
      return {
        ...state,
        saving: {
          response: { status: STATUS_ERROR, message: action.payload.message },
          isFetching: false,
        },
      };
    default:
      return state;
  }
}
