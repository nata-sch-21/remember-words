import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { FETCH_DICTIONARIES, FETCH_DICTIONARIES_ERROR, FETCH_DICTIONARIES_SUCCESS } from '../../constants/dictionaries';
import { STATUS_ERROR } from '../../constants/app';

const successFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_SUCCESS });

const errorFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_ERROR });

const fetchDictionaries = () => ({ type: FETCH_DICTIONARIES });

const requestGetDictionaries = () => async (dispatch) => {
  const url = `${config.apiPath}dictionaries`;
  dispatch(fetchDictionaries());
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.response.status === STATUS_ERROR) {
      dispatch(errorFetchDictionaries(json.response));
    } else {
      dispatch(successFetchDictionaries({ dictionaries: json.data }));
    }
  } catch (error) {
    dispatch(errorFetchDictionaries({ message: 'Server error. Please try again.' }));
  }
};

export {
  successFetchDictionaries,
  errorFetchDictionaries,
  fetchDictionaries,
  requestGetDictionaries,
};
