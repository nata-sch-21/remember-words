import config from '../../../config';
import { SUCCESS_CALCULATE_CURRENT_RESULTS, ERROR_CALCULATE_CURRENT_RESULTS, FETCH_SAVE_RESULTS, SUCCESS_SAVE_RESULTS, ERROR_SAVE_RESULTS } from '../../constants/results';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';

const successCalculateCurrentResults = data => ({
  payload: { ...data },
  type: SUCCESS_CALCULATE_CURRENT_RESULTS,
});

const errorCalculateCurrentResults = data => ({
  payload: { ...data },
  type: ERROR_CALCULATE_CURRENT_RESULTS,
});

const fetchSaveResults = () => ({
  type: FETCH_SAVE_RESULTS,
});

const errorSaveResults = data => ({
  payload: { ...data },
  type: ERROR_SAVE_RESULTS,
});

const successSaveResults = data => ({
  payload: { ...data },
  type: ERROR_SAVE_RESULTS,
});

const saveResult = result => async (dispatch) => {
  dispatch(fetchSaveResults());
  const url = `${config.apiPath}results`;
  try {
    const json = await fetch(url, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({ result }),
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
    });
    if (json.response.status === STATUS_ERROR) {
      dispatch(errorSaveResults(json.response));
    } else {
      dispatch(successSaveResults(json.response));
    }
  } catch (error) {
    dispatch(errorSaveResults({ message: 'Server error. Your result wasn\'t saved on server.' }));
  }
}

const calculateCurrentResults = (words, answers) => (dispatch, getState) => {
  const { languageTo, languageFrom } = getState().languages;
  const result = [];
  let countCorrectAnswer = 0;

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
      countCorrectAnswer += 1;
    }

    result.push(item);
  });

  if (result.length !== words.length) {
    dispatch(errorCalculateCurrentResults({ status: STATUS_ERROR, message: 'Internal error. Some translations weren\'t found' }));
    return;
  }

  dispatch(successCalculateCurrentResults({ result, countCorrectAnswer: `${countCorrectAnswer}/${words.length}` }));
};

export {
  calculateCurrentResults,
  successCalculateCurrentResults,
  errorCalculateCurrentResults,
  saveResult
};
