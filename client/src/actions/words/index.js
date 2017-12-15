import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { FETCH_DICTIONARY_WITH_WORDS_SUCCESS, FETCH_DICTIONARY_WITH_WORDS_ERROR, FETCH_DICTIONARY_WITH_WORDS } from '../../constants/words';
import { STATUS_ERROR } from '../../constants/app';

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
  const url = `${config.apiPath}dictionaries/${id}`;
  dispatch(fetchDictionaryWithWords());
  try {
    const response = await fetch(url);
    const json = await response.json();
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
