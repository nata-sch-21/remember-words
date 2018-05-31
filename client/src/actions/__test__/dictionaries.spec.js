import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import config from '../../../config/app.config';
import { dictionaries } from '../../../test/testData';
import {
  FETCH_DICTIONARIES,
  FETCH_DICTIONARIES_ERROR,
  FETCH_DICTIONARIES_SUCCESS,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';
import { initialState } from '../../reducers/dictionaries';
import { requestGetDictionaries } from '../dictionaries';

const mockStore = configureMockStore([thunk]);

describe('fetch dictionaries action creator', () => {
  let store;

  beforeEach(() => {
    nock.cleanAll();
    store = mockStore({ ...initialState });
  });

  it('dispatches the correct actions on successful fetch request', async () => {
    const successResponse = { response: { status: STATUS_OK, message: '' }, data: dictionaries };
    nock(config.apiPath)
      .get('/dictionaries')
      .reply(200, successResponse);

    const expectedActions = [
      { type: FETCH_DICTIONARIES },
      { type: FETCH_DICTIONARIES_SUCCESS, payload: { dictionaries } },
    ];

    await store.dispatch(requestGetDictionaries());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the correct actions on api error response', async () => {
    const errorResponse = { response: { status: STATUS_ERROR, message: 'Error message' } };
    nock(config.apiPath)
      .get('/dictionaries')
      .reply(200, errorResponse);

    const expectedActions = [
      { type: FETCH_DICTIONARIES },
      { type: FETCH_DICTIONARIES_ERROR, payload: { message: errorResponse.response.message } },
    ];

    await store.dispatch(requestGetDictionaries());
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
      { type: FETCH_DICTIONARIES },
      { type: FETCH_DICTIONARIES_ERROR, payload: { ...errorResponse } },
    ];

    await store.dispatch(requestGetDictionaries());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
