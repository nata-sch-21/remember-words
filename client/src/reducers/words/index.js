import {
  FETCH_DICTIONARY_WITH_WORDS,
  FETCH_DICTIONARY_WITH_WORDS_ERROR,
  FETCH_DICTIONARY_WITH_WORDS_SUCCESS,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';

export const initialState = {
  dictionary: {},
  words: [],
  response: {
    status: '',
    message: '',
  },
  isFetching: false,
};

export default function words(state = initialState, action) {
  switch (action.type) {
    case FETCH_DICTIONARY_WITH_WORDS:
      return { ...initialState, isFetching: true };
    case FETCH_DICTIONARY_WITH_WORDS_SUCCESS:
      return {
        ...action.payload,
        response: { ...state.response, status: STATUS_OK },
        isFetching: false,
      };
    case FETCH_DICTIONARY_WITH_WORDS_ERROR:
      return {
        ...state,
        response: { status: STATUS_ERROR, message: action.payload.message },
        isFetching: false,
      };
    default:
      return state;
  }
}
