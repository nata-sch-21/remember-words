import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { FETCH_LAST_RESULTS, FETCH_LAST_RESULTS_SUCCESS, FETCH_LAST_RESULTS_ERROR } from '../../constants/home';
import { STATUS_ERROR } from '../../constants/app';

const successFetchLastResults = data => ({
  payload: { ...data }, type: FETCH_LAST_RESULTS_SUCCESS,
});

const errorFetchLastResults = data => ({ payload: { ...data }, type: FETCH_LAST_RESULTS_ERROR });

const fetchLastResults = () => ({ type: FETCH_LAST_RESULTS });

const requestLastResults = () => async (dispatch) => {
  const url = `${config.apiPath}results`;
  dispatch(fetchLastResults());
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.response.status === STATUS_ERROR) {
      dispatch(errorFetchLastResults(json.response));
    } else {
      dispatch(successFetchLastResults({ ...json.data }));
    }
  } catch (error) {
    dispatch(errorFetchLastResults({ message: 'Server error. Please try again.' }));
  }
};

export {
  successFetchLastResults,
  errorFetchLastResults,
  fetchLastResults,
  requestLastResults,
};
