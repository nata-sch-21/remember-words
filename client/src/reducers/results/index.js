import { SUCCESS_CALCULATE_CURRENT_RESULTS, ERROR_CALCULATE_CURRENT_RESULTS } from '../../constants/results';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';

export const initialState = {
  result: [],
  response: {
    status: '',
    message: '',
  },
  countCorrectAnswer: '',
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
    case SUCCESS_CALCULATE_CURRENT_RESULTS:
      console.log('ksdmcdkmkd')
      return {
        ...initialState,
        result: action.payload.result,
        countCorrectAnswer: action.payload.countCorrectAnswer,
        response: { status: STATUS_OK, message: action.payload.message },
      };
    case ERROR_CALCULATE_CURRENT_RESULTS:
      return {
        ...initialState,
        response: { status: STATUS_ERROR, message: action.payload.message },
      };
    default:
      return state;
  }
}
