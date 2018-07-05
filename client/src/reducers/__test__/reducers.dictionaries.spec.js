import dictionariesReducer, { initialState } from '../dictionaries';
import { dictionaries } from '../../../test/testData';
import { STATUS_OK, STATUS_ERROR, FETCH_DICTIONARIES } from '../../constants';

describe('dictionaries reducer', () => {
  it('should return initial state', () => {
    const newState = dictionariesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type FETCH_DICTIONARIES and pass on the dictionaries we pass in', () => {
    const successResponse = {
      response: { status: STATUS_OK, message: '' },
      data: { dictionaries },
    };

    const action = {
      type: FETCH_DICTIONARIES,
      payload: successResponse,
    };

    const newState = dictionariesReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      dictionaries,
      response: successResponse.response,
    });
  });

  it('should react to an action with the type FETCH_DICTIONARIES and pass on the error message we pass in', () => {
    const errorResponse = {
      response: { status: STATUS_ERROR, message: 'Error message' },
    };

    const action = {
      type: FETCH_DICTIONARIES,
      payload: errorResponse,
    };

    const newState = dictionariesReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      response: errorResponse.response,
    });
  });
});
