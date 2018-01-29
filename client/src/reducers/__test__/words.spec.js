import wordsReducer, { initialState } from '../words';
import { fetchDictionaryWithWords, errorFetchDictionaryWithWords, successFetchDictionaryWithWords } from '../../actions/words';
import { dictionaries, words } from '../../../test/testData';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';

const dictionary = dictionaries[0];

describe('Reducer words', () => {
  // deepFreeze protect from state mutating

  it('it should return initial state', () => {
    const newState = wordsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type FETCH_DICTIONARY_WITH_WORDS and return isFetching true', () => {
    const newState = wordsReducer(deepFreeze(initialState), fetchDictionaryWithWords());
    expect(newState).toEqual({ ...initialState, isFetching: true });
  });

  it('should react to an action with the type FETCH_DICTIONARY_WITH_WORDS_SUCCESS and pass on the data we pass in', () => {
    const newState = wordsReducer(deepFreeze(initialState), successFetchDictionaryWithWords({
      dictionary, words,
    }));
    expect(newState).toEqual({
      ...initialState,
      dictionary,
      words,
      response: {
        status: STATUS_OK,
        message: '',
      },
    });
  });

  it('should react to an action with the type FETCH_DICTIONARY_WITH_WORDS_ERROR and pass on the error message we pass in', () => {
    const message = 'error message';
    const newState = wordsReducer(deepFreeze(initialState), errorFetchDictionaryWithWords({
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
