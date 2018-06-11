import Api from '../../services/Api';

import {
  FETCH_BEST_RESULTS,
  FETCH_BEST_RESULTS_SUCCESS,
  FETCH_BEST_RESULTS_ERROR,
  STATUS_ERROR,
} from '../../constants';

const successFetchBestResults = data => ({
  payload: { ...data }, type: FETCH_BEST_RESULTS_SUCCESS,
});

const errorFetchBestResults = data => ({ payload: { ...data }, type: FETCH_BEST_RESULTS_ERROR });

const fetchBestResults = () => ({ type: FETCH_BEST_RESULTS });

const requestBestResults = () => async (dispatch) => {
  dispatch(fetchBestResults());
  try {
    const json = await Api.getRequest('results');
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
