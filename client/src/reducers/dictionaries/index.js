import { FETCH_DICTIONARIES, FETCH_DICTIONARIES_ERROR, FETCH_DICTIONARIES_SUCCESS } from '../../constants';
import { STATUS_ERROR, STATUS_OK } from '../../constants';

export const initialState = {
  dictionaries: [],
  response: {
    status: '',
    message: '',
  },
  isFetching: false,
};

export default function dictionaries(state = initialState, action) {
  switch (action.type) {
    case FETCH_DICTIONARIES:
      return { ...initialState, isFetching: true };
    case FETCH_DICTIONARIES_SUCCESS:
      return {
        dictionaries: action.payload.dictionaries,
        response: { ...state.response, status: STATUS_OK },
        isFetching: false,
      };
    case FETCH_DICTIONARIES_ERROR:
      return {
        ...state,
        response: { status: STATUS_ERROR, message: action.payload.message },
        isFetching: false,
      };
    default:
      return state;
  }
}
