import Api from '../../services/Api';
import tools from '../../../src/services/tools';
import {
  CALCULATE_CURRENT_RESULTS_ERROR,
  FETCH_SAVE_RESULTS_ERROR,
  FETCH_SAVE_RESULTS,
  CALCULATE_CURRENT_RESULTS_SUCCESS,
  FETCH_SAVE_RESULTS_SUCCESS,
  STATUS_ERROR,
  STATUS_OK,
} from '../../constants';

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
  try {
    const json = await Api.postRequest('results', {
      body: JSON.stringify({ result: answerData }),
    });

    if (json.response.status === STATUS_ERROR) {
      dispatch(errorSaveResults({ message: json.response.message }));
    } else {
      dispatch(successSaveResults(json.response));
    }
  } catch (error) {
    dispatch(errorSaveResults({ message: 'Your result wasn\'t saved on server. Try again.' }));
  }
};

const calculateCurrentResults = (words, answers, dictionaryName) => (dispatch, getState) => {
  const { languageTo, languageFrom } = getState().languages;
  const result = [];
  let countCorrectAnswers = 0;

  if (answers.length !== words.length) {
    dispatch(errorCalculateCurrentResults({ message: 'Internal error. Not enough answers' }));
    return;
  }

  answers.forEach((answer, key) => {
    const word = words[key];
    if (!word || !word.translations || !word.translations[languageTo]) {
      return;
    }

    const item = {
      fromWord: word.translations[languageFrom],
      toWord: word.translations[languageTo],
      answer,
      status: STATUS_ERROR,
    };

    if (answer.toLowerCase() === word.translations[languageTo].toLowerCase()) {
      item.status = STATUS_OK;
      countCorrectAnswers += 1;
    }

    result.push(item);
  });

  if (result.length !== words.length) {
    dispatch(errorCalculateCurrentResults({ message: 'Internal error. Some translations weren\'t found' }));
    return;
  }

  dispatch(successCalculateCurrentResults({
    result,
    answerData: {
      countCorrectAnswers,
      countWords: words.length,
      dictionaryName,
      coefficient: tools.modRound(countCorrectAnswers / words.length, 5),
    },
  }));
};

export {
  calculateCurrentResults,
  successCalculateCurrentResults,
  errorCalculateCurrentResults,
  saveResult,
  fetchSaveResults,
  errorSaveResults,
  successSaveResults,
};
