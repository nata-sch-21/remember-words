import nock from 'nock';
import config from '../../../config/app.config';
import { dictionaries, words, mockStore } from '../../../test/testData';
import {
  FETCH_DICTIONARY_WITH_WORDS,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';
import { initialState } from '../../reducers/dictionaries';
import fetchDictionaryWithWords from '../words';

const dictionaryId = dictionaries[0]._id;
const url = `/dictionaries/${dictionaryId}`;

describe('fetchDictionaryWithWords() action creator', () => {
  let store;

  beforeEach(() => {
    nock.cleanAll();
    store = mockStore({ ...initialState });
  });

  it('should return correct action and data on fetch words SUCCESSFUL api response', async () => {
    const successResponse = { response: { status: STATUS_OK, message: '' }, data: { dictionary: dictionaries[0], words } };
    nock(config.apiPath)
      .get(url)
      .reply(200, successResponse);

    const expectedActions = [
      {
        type: FETCH_DICTIONARY_WITH_WORDS,
        payload: successResponse,
      },
    ];

    await store.dispatch(fetchDictionaryWithWords(dictionaryId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return correct action and data on fetch words API ERROR response', async () => {
    const errorResponse = { response: { status: STATUS_ERROR, message: 'Error message' } };
    nock(config.apiPath)
      .get(url)
      .reply(200, errorResponse);

    const expectedActions = [
      {
        type: FETCH_DICTIONARY_WITH_WORDS,
        payload: errorResponse,
      },
    ];

    await store.dispatch(fetchDictionaryWithWords(dictionaryId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return correct action and data on fetch words SERVER ERROR response', async () => {
    const errorResponse = {
      message: 'Server error. Please try again.',
      status: STATUS_ERROR,
    };

    nock(config.apiPath)
      .get(url)
      .replyWithError();

    const expectedActions = [
      { type: FETCH_DICTIONARY_WITH_WORDS, payload: { response: errorResponse } },
    ];

    await store.dispatch(fetchDictionaryWithWords(dictionaryId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
