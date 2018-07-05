import homeReducer, { initialState } from '../home';
import { bestResults } from '../../../test/testData';
import { STATUS_ERROR, STATUS_OK, FETCH_BEST_RESULTS } from '../../constants';

describe('home reducer', () => {
  // deepFreeze protect from state mutating

  it('should return initial state', () => {
    const newState = homeReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type FETCH_BEST_RESULTS and pass on the data we pass in', () => {
    const successResponse = {
      response: { status: STATUS_OK, message: '' },
      data: { bestResults },
    };

    const action = {
      type: FETCH_BEST_RESULTS,
      payload: successResponse,
    };

    const newState = homeReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      bestResults,
      response: {
        status: STATUS_OK,
        message: '',
      },
    });
  });

  it('should react to an action with the type FETCH_BEST_RESULTS and pass on the error message we pass in', () => {
    const errorResponse = {
      response: { status: STATUS_ERROR, message: 'Error message' },
    };

    const action = {
      type: FETCH_BEST_RESULTS,
      payload: errorResponse,
    };

    const newState = homeReducer(deepFreeze(initialState), action);
    expect(newState).toEqual({
      ...initialState,
      response: errorResponse.response,
    });
  });
});
