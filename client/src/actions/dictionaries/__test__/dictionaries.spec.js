import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import config from '../../../../config';
import { dictionaries } from '../../../../test/testData';
import { FETCH_DICTIONARIES, FETCH_DICTIONARIES_ERROR, FETCH_DICTIONARIES_SUCCESS } from '../../../constants/dictionaries';
import { STATUS_ERROR, STATUS_OK } from '../../../constants/app';
import { requestGetDictionaries } from '../';

const mockStore = configureMockStore([thunk]);

describe('fetch dictionaries action creator', () => {
  let store;

  beforeEach(() => {
    nock.cleanAll();
    store = mockStore({});
  });

  it('dispatches the correct actions on successful fetch request', async () => {
    const successResponse = { response: { status: STATUS_OK, message: '' }, data: dictionaries };
    nock(config.apiPath)
      .get('/dictionaries')
      .reply(200, successResponse);

    const expectedActions = [
      { type: FETCH_DICTIONARIES },
      { type: FETCH_DICTIONARIES_SUCCESS, dictionaries },
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
      { type: FETCH_DICTIONARIES_ERROR, ...errorResponse.response },
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
      { type: FETCH_DICTIONARIES_ERROR, ...errorResponse },
    ];

    await store.dispatch(requestGetDictionaries());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
