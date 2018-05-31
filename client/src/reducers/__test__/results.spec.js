import resultsReducer, { initialState } from '../results';
import { errorCalculateCurrentResults, successCalculateCurrentResults, errorSaveResults, fetchSaveResults, successSaveResults } from '../../actions/results';
import { currentResult, answerData } from '../../../test/testData';
import { STATUS_ERROR, STATUS_OK } from '../../constants';

describe('Reducer words', () => {
  // deepFreeze protect from state mutating

  it('it should return initial state', () => {
    const newState = resultsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type CALCULATE_CURRENT_RESULTS_SUCCESS and pass on the data we pass in', () => {
    const newState = resultsReducer(deepFreeze(initialState), successCalculateCurrentResults({
      result: currentResult,
      answerData,
    }));
    expect(newState).toEqual({
      ...initialState,
      answerData,
      result: currentResult,
      response: {
        status: STATUS_OK,
        message: '',
      },
    });
  });

  it('should react to an action with the type CALCULATE_CURRENT_RESULTS_ERROR and pass on the data we pass in', () => {
    const errorData = {
      status: STATUS_ERROR, message: 'Internal error. Not enough answers',
    };

    const newState = resultsReducer(
      deepFreeze(initialState),
      errorCalculateCurrentResults(errorData),
    );
    expect(newState).toEqual({
      ...initialState,
      response: {
        ...errorData,
      },
    });
  });


  it('should react to an action with the type FETCH_SAVE_RESULTS and pass on the data we pass in', () => {
    const newState = resultsReducer(deepFreeze(initialState), fetchSaveResults());
    expect(newState).toEqual({
      ...initialState,
      saving: { ...initialState.saving, isFetching: true },
    });
  });

  it('should react to an action with the type FETCH_SAVE_RESULTS_SUCCESS and pass on the data we pass in', () => {
    const successResponse = {
      status: STATUS_OK, message: 'Success',
    };
    const newState = resultsReducer(deepFreeze(initialState), successSaveResults({
      ...successResponse,
    }));
    expect(newState).toEqual({
      ...initialState,
      saving: { response: { ...successResponse }, isFetching: false },
    });
  });

  it('should react to an action with the type FETCH_SAVE_RESULTS_ERROR and pass on the error message we pass in', () => {
    const message = 'error message';
    const newState = resultsReducer(deepFreeze(initialState), errorSaveResults({
      message,
    }));
    expect(newState).toEqual({
      ...initialState,
      saving: { response: { status: STATUS_ERROR, message }, isFetching: false },
    });
  });
});
