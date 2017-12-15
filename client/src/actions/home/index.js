import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { FETCH_BEST_RESULTS, FETCH_BEST_RESULTS_SUCCESS, FETCH_BEST_RESULTS_ERROR } from '../../constants/home';
import { STATUS_ERROR } from '../../constants/app';

const successFetchBestResults = data => ({
  payload: { ...data }, type: FETCH_BEST_RESULTS_SUCCESS,
});

const errorFetchBestResults = data => ({ payload: { ...data }, type: FETCH_BEST_RESULTS_ERROR });

const fetchBestResults = () => ({ type: FETCH_BEST_RESULTS });

const requestBestResults = () => async (dispatch) => {
  const url = `${config.apiPath}results`;
  dispatch(fetchBestResults());
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.response.status === STATUS_ERROR) {
      dispatch(errorFetchBestResults({ message: json.response.message }));
    } else {
      dispatch(successFetchBestResults({ ...json.data }));
    }
  } catch (error) {
    dispatch(errorFetchBestResults({ message: 'Server error. Please try again.' }));
  }
};

export {
  successFetchBestResults,
  errorFetchBestResults,
  fetchBestResults,
  requestBestResults,
};
