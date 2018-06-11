import Api from '../../services/Api';

import {
  FETCH_DICTIONARIES,
  FETCH_DICTIONARIES_ERROR,
  FETCH_DICTIONARIES_SUCCESS,
  STATUS_ERROR,
} from '../../constants';

const successFetchDictionaries = data => ({
  payload: { ...data }, type: FETCH_DICTIONARIES_SUCCESS,
});

const errorFetchDictionaries = data => ({ payload: { ...data }, type: FETCH_DICTIONARIES_ERROR });

const fetchDictionaries = () => ({ type: FETCH_DICTIONARIES });

const requestGetDictionaries = () => async (dispatch) => {
  dispatch(fetchDictionaries());
  try {
    const json = await Api.getRequest('dictionaries');
    if (json.response.status === STATUS_ERROR) {
      dispatch(errorFetchDictionaries({ message: json.response.message }));
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
