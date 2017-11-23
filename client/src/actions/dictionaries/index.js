import axios from 'axios';
import config from '../../../config';
import { FETCH_DICTIONARIES, FETCH_DICTIONARIES_ERROR, FETCH_DICTIONARIES_SUCCESS } from '../../constants/dictionaries';

const successFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_SUCCESS });

const errorFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_ERROR });

const fetchDictionaries = () => ({ type: FETCH_DICTIONARIES });

const requestGetDictionaries = () => async (dispatch) => {
  const url = `${config.apiPath}dictionaries`;
  dispatch(fetchDictionaries());
  try {
    const response = await axios.get(url);
    dispatch(successFetchDictionaries({ dictionaries: response.data }));
  } catch (error) {
    dispatch(errorFetchDictionaries(error));
  }
};

export {
  successFetchDictionaries,
  errorFetchDictionaries,
  fetchDictionaries,
  requestGetDictionaries,
};
