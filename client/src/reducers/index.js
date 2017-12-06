import { combineReducers } from 'redux';
import dictionaries from './dictionaries';
import languages from './languages';
import words from './words';

export default combineReducers({
  dictionaries,
  languages,
  words,
});
