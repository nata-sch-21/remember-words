import 'whatwg-fetch';
import config from '../../../config';
import { FETCH_DICTIONARIES, FETCH_DICTIONARIES_ERROR, FETCH_DICTIONARIES_SUCCESS } from '../../constants/dictionaries';

const successFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_SUCCESS });

const errorFetchDictionaries = data => ({ ...data, type: FETCH_DICTIONARIES_ERROR });

const fetchDictionaries = () => ({ type: FETCH_DICTIONARIES });


const requestGetDictionaries = () => {
  return async (dispatch, getState) => {
    const url = `${config.apiPath}dictionaries`;
    dispatch(fetchDictionaries());
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });
      console.log(response);
      // dispatch(authenticationSuccess());
    } catch (error) {
      // dispatch(authenticationFailed());
    }
  };
};

// https://www.netguru.co/tips/flawless-react/redux-testing-with-the-jest-framework-part-1

export {
  successFetchDictionaries,
  errorFetchDictionaries,
  fetchDictionaries,
  requestGetDictionaries,
};
