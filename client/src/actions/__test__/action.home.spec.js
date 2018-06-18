import nock from 'nock';
import config from '../../../config/app.config';
import { results, mockStore } from '../../../test/testData';
import {
  FETCH_BEST_RESULTS,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';
import { initialState } from '../../reducers/home';
import fetchBestResults from '../home';

const url = '/results';

describe('fetch best results action creator', () => {
  let store;

  beforeEach(() => {
    nock.cleanAll();
    store = mockStore({ ...initialState });
  });

  it('best results SUCCESSFUL api response', async () => {
    const successResponse = {
      response: { status: STATUS_OK, message: '' },
      data: { bestResults: results },
    };

    nock(config.apiPath)
      .get(url)
      .reply(200, successResponse);

    const expectedActions = [
      { type: FETCH_BEST_RESULTS, payload: successResponse },
    ];

    await store.dispatch(fetchBestResults());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('best results API ERROR response', async () => {
    const errorResponse = {
      response: { status: STATUS_ERROR, message: 'Error message' },
    };

    nock(config.apiPath)
      .get(url)
      .reply(200, errorResponse);

    const expectedActions = [
      { type: FETCH_BEST_RESULTS, payload: errorResponse },
    ];

    await store.dispatch(fetchBestResults());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('best results SERVER ERROR response', async () => {
    const errorResponse = {
      message: 'Server error. Please try again.',
      status: STATUS_ERROR,
    };

    nock(config.apiPath)
      .get('/dictionaries')
      .replyWithError();

    const expectedActions = [
      { type: FETCH_BEST_RESULTS, payload: { response: errorResponse } },
    ];

    await store.dispatch(fetchBestResults());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
