import { combineReducers } from 'redux';
import dictionaries from './dictionaries';
import languages from './languages';

export default combineReducers({
  dictionaries,
  languages,
});
