import config from '../../../config';
import { CALCULATE_CURRENT_RESULTS_ERROR, FETCH_SAVE_RESULTS_ERROR, FETCH_SAVE_RESULTS, CALCULATE_CURRENT_RESULTS_SUCCESS, FETCH_SAVE_RESULTS_SUCCESS, GET_BESTS_RESULTS } from '../../constants/results';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';

const successCalculateCurrentResults = data => ({
  payload: { ...data },
  type: CALCULATE_CURRENT_RESULTS_SUCCESS,
});

const errorCalculateCurrentResults = data => ({
  payload: { ...data },
  type: CALCULATE_CURRENT_RESULTS_ERROR,
});

const fetchSaveResults = () => ({
  type: FETCH_SAVE_RESULTS,
});

const errorSaveResults = data => ({
  payload: { ...data },
  type: FETCH_SAVE_RESULTS_ERROR,
});

const successSaveResults = data => ({
  payload: { ...data },
  type: FETCH_SAVE_RESULTS_SUCCESS,
});

const saveResult = () => async (dispatch, getState) => {
  const { answerData } = getState().results;
  dispatch(fetchSaveResults());
  const url = `${config.apiPath}results`;
  try {
    const response = await fetch(url, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({ result: answerData }),
      headers: {
        Accept: 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    });
    const json = await response.json();
    if (json.response.status === STATUS_ERROR) {
      dispatch(errorSaveResults(json.response));
    } else {
      dispatch(successSaveResults(json.response));
    }
  } catch (error) {
    dispatch(errorSaveResults({ message: 'Your result wasn\'t saved on server.' }));
  }
};

const calculateCurrentResults = (words, answers, dictionaryName) => (dispatch, getState) => {
  const { languageTo, languageFrom } = getState().languages;
  const result = [];
  let countCorrectAnswers = 0;

  answers.forEach((answer, key) => {
    const word = words[key];
    if (!word.translations[languageTo]) {
      return;
    }

    const item = {
      fromWord: word.translations[languageFrom],
      toWord: word.translations[languageTo],
      answer,
      status: STATUS_ERROR,
    };

    if (answer === word.translations[languageTo]) {
      item.status = STATUS_OK;
      countCorrectAnswers += 1;
    }

    result.push(item);
  });

  if (result.length !== words.length) {
    dispatch(errorCalculateCurrentResults({ status: STATUS_ERROR, message: 'Internal error. Some translations weren\'t found' }));
    return;
  }

  dispatch(successCalculateCurrentResults({
    result,
    answerData: {
      countCorrectAnswers,
      countWords: words.length,
      dictionaryName,
      coefficient: (countCorrectAnswers / words.length.toFixed(5)),
    },
  }));
};

export {
  calculateCurrentResults,
  successCalculateCurrentResults,
  errorCalculateCurrentResults,
  saveResult,
};
