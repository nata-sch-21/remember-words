import { createAction } from 'redux-actions';

import Api from '../../services/Api';
import tools from '../../../src/services/tools';
import {
  UPLOAD_RESULT,
  STATUS_ERROR,
  STATUS_OK,
  CALCULATE_CURRENT_RESULTS,
} from '../../constants';

const uploadResult = createAction(UPLOAD_RESULT, async (answerData) => {
  const result = await Api.postRequest('results', {
    body: JSON.stringify({ result: answerData }),
  });

  return result;
});


const calculateCurrentResults = createAction(CALCULATE_CURRENT_RESULTS, (data) => {
  const {
    words, answers, dictionaryName, languages: { languageTo, languageFrom },
  } = data;

  const result = [];
  let countCorrectAnswers = 0;

  if (answers.length !== words.length) {
    return {
      response: { status: STATUS_ERROR, message: 'Internal error. Incorrect number of answers' },
    };
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
    return {
      response: { status: STATUS_ERROR, message: 'Internal error. Some translations weren\'t found' },
    };
  }

  return {
    result,
    answerData: {
      countCorrectAnswers,
      countWords: words.length,
      dictionaryName,
      coefficient: tools.modRound(countCorrectAnswers / words.length, 5),
    },
    response: { status: STATUS_OK, message: '' },
  };
});

export {
  calculateCurrentResults,
  uploadResult,
};
