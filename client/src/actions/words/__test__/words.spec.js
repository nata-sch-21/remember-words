import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import config from '../../../../config';
import { dictionaries, words } from '../../../../test/testData';
import { FETCH_DICTIONARY_WITH_WORDS, FETCH_DICTIONARY_WITH_WORDS_ERROR, FETCH_DICTIONARY_WITH_WORDS_SUCCESS } from '../../../constants/words';
import { initialState } from '../../../reducers/dictionaries';
import { STATUS_ERROR, STATUS_OK } from '../../../constants/app';
import { requestGetDictionaryWithWords } from '../';

const mockStore = configureMockStore([thunk]);
const dictionaryId = dictionaries[0]._id;
const url = `/dictionaries/${dictionaryId}`;

describe('fetch words action creator', () => {
  let store;

  beforeEach(() => {
    nock.cleanAll();
    store = mockStore({ ...initialState });
  });

  it('dispatches the correct actions on successful fetch request', async () => {
    const successResponse = { response: { status: STATUS_OK, message: '' }, data: { dictionary: dictionaries[0], words } };
    nock(config.apiPath)
      .get(url)
      .reply(200, successResponse);

    const expectedActions = [
      { type: FETCH_DICTIONARY_WITH_WORDS },
      {
        type: FETCH_DICTIONARY_WITH_WORDS_SUCCESS,
        payload: { dictionary: dictionaries[0], words },
      },
    ];

    await store.dispatch(requestGetDictionaryWithWords(dictionaryId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the correct actions on api error response', async () => {
    const errorResponse = { response: { status: STATUS_ERROR, message: 'Error message' } };
    nock(config.apiPath)
      .get(url)
      .reply(200, errorResponse);

    const expectedActions = [
      { type: FETCH_DICTIONARY_WITH_WORDS },
      { type: FETCH_DICTIONARY_WITH_WORDS_ERROR, payload: { ...errorResponse.response } },
    ];

    await store.dispatch(requestGetDictionaryWithWords(dictionaryId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the correct actions on server error response', async () => {
    const errorResponse = {
      message: 'Server error. Please try again.',
    };

    nock(config.apiPath)
      .get(url)
      .replyWithError();

    const expectedActions = [
      { type: FETCH_DICTIONARY_WITH_WORDS },
      { type: FETCH_DICTIONARY_WITH_WORDS_ERROR, payload: { ...errorResponse } },
    ];

    await store.dispatch(requestGetDictionaryWithWords(dictionaryId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});