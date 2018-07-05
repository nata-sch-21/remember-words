import wordsReducer, { initialState } from '../words';
import { dictionaries, words } from '../../../test/testData';
import { STATUS_ERROR, STATUS_OK, FETCH_DICTIONARY_WITH_WORDS } from '../../constants';

const dictionary = dictionaries[0];

describe('words reducer', () => {
  // deepFreeze protect from state mutating

  it('it should return initial state', () => {
    const newState = wordsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type FETCH_DICTIONARY_WITH_WORDS_SUCCESS and pass on the data we pass in', () => {
    const successResponse = {
      response: { status: STATUS_OK, message: '' },
      data: { dictionary, words },
    };

    const action = {
      type: FETCH_DICTIONARY_WITH_WORDS,
      payload: successResponse,
    };

    const newState = wordsReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      dictionary,
      words,
      response: successResponse.response,
    });
  });

  it('should react to an action with the type FETCH_DICTIONARY_WITH_WORDS_SUCCESS and pass on the error message we pass in', () => {
    const successResponse = {
      response: { status: STATUS_ERROR, message: 'error message' },
    };

    const action = {
      type: FETCH_DICTIONARY_WITH_WORDS,
      payload: successResponse,
    };

    const newState = wordsReducer(deepFreeze(initialState), action);

    expect(newState).toEqual({
      ...initialState,
      response: successResponse.response,
    });
  });
});
