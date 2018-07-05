import nock from 'nock';
import config from '../../../config/app.config';

import { dictionaries, mockStore } from '../../../test/testData';
import {
  FETCH_DICTIONARIES,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';
import { initialState } from '../../reducers/dictionaries';
import fetchDictionaries from '../dictionaries';

const url = '/dictionaries';

describe('fetchDictionaries() action creator', () => {
  let store;

  beforeEach(() => {
    nock.cleanAll();
    store = mockStore({ ...initialState });
  });

  it('should return correct action and data on fetch dictionaries SUCCESSFUL api response', async () => {
    const successResponse = { response: { status: STATUS_OK, message: '' }, data: dictionaries };
    nock(config.apiPath)
      .get(url)
      .reply(200, successResponse);

    const expectedActions = [
      { type: FETCH_DICTIONARIES, payload: successResponse },
    ];

    await store.dispatch(fetchDictionaries());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return correct action and data on fetch dictionaries API ERROR response', async () => {
    const errorResponse = { response: { status: STATUS_ERROR, message: 'Error message' } };
    nock(config.apiPath)
      .get(url)
      .reply(200, errorResponse);

    const expectedActions = [
      { type: FETCH_DICTIONARIES, payload: errorResponse },
    ];

    await store.dispatch(fetchDictionaries());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return correct action and data on fetch dictionaries SERVER ERROR response', async () => {
    const errorResponse = {
      message: 'Server error. Please try again.',
      status: STATUS_ERROR,
    };

    nock(config.apiPath)
      .get(url)
      .replyWithError();

    const expectedActions = [
      { type: FETCH_DICTIONARIES, payload: { response: errorResponse } },
    ];

    await store.dispatch(fetchDictionaries());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
