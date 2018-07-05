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
  mockStore,
} from '../../../test/testData';
import {
  // UPLOAD_RESULT,
  CALCULATE_CURRENT_RESULTS,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';
import { initialState } from '../../reducers/home';
import { calculateCurrentResults } from '../results';


// const url = '/results';

describe('calculateCurrentResults() action creator', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ ...initialState });
  });

  it('should return correct action and data on SUCCESSFUL result calculation', () => {
    const successResponse = {
      result: currentResult,
      answerData,
      response: { message: '', status: STATUS_OK },
    };

    const expectedActions = [
      { type: CALCULATE_CURRENT_RESULTS, payload: successResponse },
    ];

    const data = {
      words, answers, dictionaryName, languages: { languageTo, languageFrom },
    };

    store.dispatch(calculateCurrentResults(data));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return correct action and data on ERROR (translation wasn\'t found) result calculation', () => {
    const errorResponse = {
      response: { status: STATUS_ERROR, message: 'Internal error. Some translations weren\'t found' },
    };

    const expectedActions = [
      { type: CALCULATE_CURRENT_RESULTS, payload: errorResponse },
    ];

    // remove one word
    delete words[1];

    const data = {
      words, answers, dictionaryName, languages: { languageTo, languageFrom },
    };

    store.dispatch(calculateCurrentResults(data));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return correct action and data on ERROR (Incorrect number of answers) result calculation', () => {
    const errorResponse = {
      response: { status: STATUS_ERROR, message: 'Internal error. Incorrect number of answers' },
    };

    const expectedActions = [
      { type: CALCULATE_CURRENT_RESULTS, payload: errorResponse },
    ];

    const data = {
      words, answers: [answers[0]], dictionaryName, languages: { languageTo, languageFrom },
    };

    store.dispatch(calculateCurrentResults(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('tuploadResult() action creator', async () => {
  // let store;
  //
  // beforeEach(() => {
  //   nock.cleanAll();
  //   store = mockStore({
  //     languages: { languageFrom, languageTo },
  //     results: { answerData },
  //     ...initialState,
  //   });
  // });

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