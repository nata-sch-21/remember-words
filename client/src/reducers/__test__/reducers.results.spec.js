import resultsReducer, { initialState } from '../results';
import { currentResult, answerData } from '../../../test/testData';
import { STATUS_ERROR, STATUS_OK, CALCULATE_CURRENT_RESULTS, UPLOAD_RESULT } from '../../constants';

describe('words reducer', () => {
  // deepFreeze protect from state mutating

  it('it should return initial state', () => {
    const newState = resultsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type CALCULATE_CURRENT_RESULTS and pass on the data we pass in', () => {
    const successResponse = {
      response: { status: STATUS_OK, message: '' },
      result: currentResult,
      answerData,
    };

    const action = {
      type: CALCULATE_CURRENT_RESULTS,
      payload: successResponse,
    };

    const newState = resultsReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      answerData,
      result: currentResult,
      response: successResponse.response,
    });
  });

  it('should react to an action with the type CALCULATE_CURRENT_RESULTS and pass on the error Not enough answers', () => {
    const errorData = {
      response: { status: STATUS_ERROR, message: 'Internal error. Not enough answers' },
    };

    const action = {
      type: CALCULATE_CURRENT_RESULTS,
      payload: errorData,
    };

    const newState = resultsReducer(deepFreeze(initialState), action);
    expect(newState).toEqual({
      ...initialState,
      response: errorData.response,
    });
  });

  it('should react to an action with the type UPLOAD_RESULT and pass on the data we pass in', () => {
    const successResponse = {
      response: { status: STATUS_OK, message: 'Success' },
    };

    const action = {
      type: UPLOAD_RESULT,
      payload: successResponse,
    };

    const newState = resultsReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      uploadResultResponse: { ...successResponse.response },
    });
  });

  it('should react to an action with the type UPLOAD_RESULT and pass on the error message we pass in', () => {
    const errorResponse = {
      response: { status: STATUS_ERROR, message: 'error message' },
    };

    const action = {
      type: UPLOAD_RESULT,
      payload: errorResponse,
    };

    const newState = resultsReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      uploadResultResponse: { ...errorResponse.response },
    });
  });
});
