import { FETCH_DICTIONARIES, FETCH_DICTIONARIES_ERROR, FETCH_DICTIONARIES_SUCCESS } from '../../constants/dictionaries';

const successFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_SUCCESS });

const errorFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_ERROR });

const fetchDictionaries = () => ({ type: FETCH_DICTIONARIES });

export {
  successFetchDictionaries,
  errorFetchDictionaries,
  fetchDictionaries,
};
