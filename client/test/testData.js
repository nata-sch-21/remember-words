import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

import { STATUS_ERROR, STATUS_OK } from '../src/constants';
import tools from '../src/services/tools';


export const mockStore = configureMockStore([thunk, reduxPromise]);

export const dictionaries = [
  {
    _id: '2VJtLNEw55quOU5z',
    translations: {
      en: 'Fruits',
      ru: 'Фрукты',
    },
  },
  {
    _id: 'LefmBixVc9OQgohe',
    translations: {
      en: 'Animals',
      ru: 'Животные',
    },
  },
];

export const words = [
  {
    image_name: 'image1.jpg', image: 'http://localhost:8000/static/uploads/image1.jpg', translations: { en: 'apple', ru: 'яблоко' }, dictionary_id: '2VJtLNEw55quOU5z', _id: 'mFyIYE3xg7mcDFwv',
  },
  {
    image_name: 'image2.jpg', image: 'http://localhost:8000/static/uploads/image2.jpg', translations: { en: 'pear', ru: 'груша' }, dictionary_id: '2VJtLNEw55quOU5z', _id: 'cxCMozceuNRLcCv1',
  },
];

export const answers = [
  'яблоко',
  'неправильное слово',
];

export const results = [
  {
    countCorrectAnswers: 3, countWords: 10, dictionaryName: 'Fruits', coefficient: 0.3, _id: 'WARwzuZTgu1KCboQ',
  },
  {
    countCorrectAnswers: 1, countWords: 10, dictionaryName: 'Fruits', coefficient: 0.1, _id: 'u86AUbwMVRkpDm',
  },
  {
    countCorrectAnswers: 5, countWords: 10, dictionaryName: 'Fruits', coefficient: 0.5, _id: 'dHRCeyMSzYOxApn4',
  },
];

export const bestResults = [
  {
    _id: 1, dictionaryName: 'dictionaryName1', countCorrectAnswers: 2, countWords: 10,
  },
  {
    _id: 2, dictionaryName: 'dictionaryName2', countCorrectAnswers: 2, countWords: 10,
  },
  {
    _id: 3, dictionaryName: 'dictionaryName3', countCorrectAnswers: 2, countWords: 10,
  },
];

export const languageFrom = 'en';
export const languageTo = 'ru';

export const currentResult = [
  {
    answer: answers[0],
    fromWord: words[0].translations[languageFrom],
    toWord: words[0].translations[languageTo],
    status: STATUS_OK,
  },
  {
    answer: answers[1],
    fromWord: words[1].translations[languageFrom],
    toWord: words[1].translations[languageTo],
    status: STATUS_ERROR,
  },
];

export const dictionaryName = 'dictionary name';

export const answerData = {
  countCorrectAnswers: 1,
  countWords: words.length,
  dictionaryName,
  coefficient: tools.modRound(1 / words.length, 5),
};
