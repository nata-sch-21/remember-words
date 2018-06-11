import Api from '../../services/Api';
import {
  FETCH_DICTIONARY_WITH_WORDS_SUCCESS,
  FETCH_DICTIONARY_WITH_WORDS_ERROR,
  FETCH_DICTIONARY_WITH_WORDS,
  STATUS_ERROR,
} from '../../constants';

const successFetchDictionaryWithWords = data => ({
  payload: { ...data },
  type: FETCH_DICTIONARY_WITH_WORDS_SUCCESS,
});

const errorFetchDictionaryWithWords = data => ({
  payload: { ...data },
  type: FETCH_DICTIONARY_WITH_WORDS_ERROR,
});

const fetchDictionaryWithWords = () => ({ type: FETCH_DICTIONARY_WITH_WORDS });

const requestGetDictionaryWithWords = id => async (dispatch) => {
  dispatch(fetchDictionaryWithWords());
  try {
    const json = await Api.getRequest(`dictionaries/${id}`);
    if (json.response.status === STATUS_ERROR) {
      dispatch(errorFetchDictionaryWithWords({ message: json.response.message }));
    } else {
      dispatch(successFetchDictionaryWithWords({ ...json.data }));
    }
  } catch (error) {
    dispatch(errorFetchDictionaryWithWords({ message: 'Server error. Please try again.' }));
  }
};

export {
  successFetchDictionaryWithWords,
  errorFetchDictionaryWithWords,
  fetchDictionaryWithWords,
  requestGetDictionaryWithWords,
};
