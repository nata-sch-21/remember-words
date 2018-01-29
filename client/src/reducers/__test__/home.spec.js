import homeReducer, { initialState } from '../home';
import { fetchBestResults, errorFetchBestResults, successFetchBestResults } from '../../actions/home';
import { bestResults } from '../../../test/testData';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';

describe('Reducer words', () => {
  // deepFreeze protect from state mutating

  it('it should return initial state', () => {
    const newState = homeReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type FETCH_BEST_RESULTS and return isFetching true', () => {
    const newState = homeReducer(deepFreeze(initialState), fetchBestResults());
    expect(newState).toEqual({ ...initialState, isFetching: true });
  });

  it('should react to an action with the type FETCH_BEST_RESULTS_SUCCESS and pass on the data we pass in', () => {
    const newState = homeReducer(deepFreeze(initialState), successFetchBestResults({
      bestResults,
    }));
    expect(newState).toEqual({
      ...initialState,
      bestResults,
      response: {
        status: STATUS_OK,
        message: '',
      },
    });
  });

  it('should react to an action with the type FETCH_BEST_RESULTS_ERROR and pass on the error message we pass in', () => {
    const message = 'error message';
    const newState = homeReducer(deepFreeze(initialState), errorFetchBestResults({
      message,
    }));
    expect(newState).toEqual({
      ...initialState,
      response: {
        status: STATUS_ERROR,
        message,
      },
    });
  });
});
