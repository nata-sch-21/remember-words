import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import config from '../../../config/app.config';
import { results } from '../../../test/testData';
import { FETCH_BEST_RESULTS, FETCH_BEST_RESULTS_SUCCESS, FETCH_BEST_RESULTS_ERROR } from '../../constants/home';
import { initialState } from '../../reducers/home';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';
import { requestBestResults } from '../home';

const mockStore = configureMockStore([thunk]);
const url = '/results';

describe('fetch best results action creator', () => {
  let store;

  beforeEach(() => {
    nock.cleanAll();
    store = mockStore({ ...initialState });
  });

  it('dispatches the correct actions on successful fetch request', async () => {
    const successResponse = { response: { status: STATUS_OK, message: '' }, data: { bestResults: results } };
    nock(config.apiPath)
      .get(url)
      .reply(200, successResponse);

    const expectedActions = [
      { type: FETCH_BEST_RESULTS },
      { type: FETCH_BEST_RESULTS_SUCCESS, payload: { bestResults: results } },
    ];

    await store.dispatch(requestBestResults());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the correct actions on api error response', async () => {
    const errorResponse = { response: { status: STATUS_ERROR, message: 'Error message' } };
    nock(config.apiPath)
      .get(url)
      .reply(200, errorResponse);

    const expectedActions = [
      { type: FETCH_BEST_RESULTS },
      { type: FETCH_BEST_RESULTS_ERROR, payload: { message: errorResponse.response.message } },
    ];

    await store.dispatch(requestBestResults());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the correct actions on server error response', async () => {
    const errorResponse = {
      message: 'Server error. Please try again.',
    };

    nock(config.apiPath)
      .get('/dictionaries')
      .replyWithError();

    const expectedActions = [
      { type: FETCH_BEST_RESULTS },
      { type: FETCH_BEST_RESULTS_ERROR, payload: { ...errorResponse } },
    ];

    await store.dispatch(requestBestResults());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
