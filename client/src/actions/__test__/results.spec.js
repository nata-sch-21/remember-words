import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
// import config from '../../../config/app.config';
import {
  words,
  answers,
  currentResult,
  languageTo,
  languageFrom,
  dictionaryName,
  answerData,
} from '../../../test/testData';
import {
  // FETCH_SAVE_RESULTS,
  CALCULATE_CURRENT_RESULTS_ERROR,
  // FETCH_SAVE_RESULTS_ERROR,
  CALCULATE_CURRENT_RESULTS_SUCCESS,
  // FETCH_SAVE_RESULTS_SUCCESS,
  STATUS_ERROR,
} from '../../constants';
import { initialState } from '../../reducers/home';
import { calculateCurrentResults } from '../results';

const mockStore = configureMockStore([thunk]);

// const url = '/results';

describe('calculating and saving current results action creators', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ languages: { languageFrom, languageTo }, ...initialState });
  });

  describe('test calculateCurrentResults action creator', () => {
    it('successful calculates and dispatches the correct actions with appropriate data', () => {
      const successResponse = {
        result: currentResult,
        answerData,
      };

      const expectedActions = [
        { type: CALCULATE_CURRENT_RESULTS_SUCCESS, payload: successResponse },
      ];

      store.dispatch(calculateCurrentResults(words, answers, dictionaryName));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('error calculates (not found word) and dispatches the correct actions with appropriate data', () => {
      const errorResponse = { status: STATUS_ERROR, message: 'Internal error. Some translations weren\'t found' };

      const expectedActions = [
        { type: CALCULATE_CURRENT_RESULTS_ERROR, payload: { message: errorResponse.message } },
      ];

      // remove one word
      delete words[1];

      store.dispatch(calculateCurrentResults(words, answers, dictionaryName));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('error calculates (not enough answers) and dispatches the correct actions with appropriate data', () => {
      const errorResponse = { status: STATUS_ERROR, message: 'Internal error. Not enough answers' };

      const expectedActions = [
        { type: CALCULATE_CURRENT_RESULTS_ERROR, payload: { message: errorResponse.message } },
      ];

      store.dispatch(calculateCurrentResults(words, [answers[0]], dictionaryName));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('test saveResult action creator', async () => {
    beforeEach(() => {
      nock.cleanAll();
      store = mockStore({
        languages: { languageFrom, languageTo },
        results: { answerData },
        ...initialState,
      });
    });

    // it('dispatches the correct actions on successful fetch request',
    // async () => {
    // const successResponse = {
    // response: { status: STATUS_OK, message: 'Your result successfully saved' }, data: null};
    // nock(config.apiPath, {
    //   reqheaders: {
    //     Accept: 'application/json, application/xml, text/play, text/html, *.*',
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    //   },
    // })
    //   .post(url, { body: JSON.stringify({ result: answerData }) })
    //   .reply(200, successResponse);
    //
    // const expectedActions = [
    //   { type: FETCH_SAVE_RESULTS },
    //   { type: CALCULATE_CURRENT_RESULTS_SUCCESS, payload: { ...successResponse } },
    // ];
    //
    // await store.dispatch(saveResult());
    // expect(store.getActions()).toEqual(expectedActions);
    // }
    // );
  });
});
