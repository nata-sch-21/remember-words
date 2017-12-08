import { combineReducers } from 'redux';
import dictionaries from './dictionaries';
import languages from './languages';
import words from './words';
import results from './results';

export default combineReducers({
  dictionaries,
  languages,
  words,
  results,
});
