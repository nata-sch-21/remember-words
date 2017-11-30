import { combineReducers } from 'redux';
import dictionaries from './dictionaries';
import selectLanguages from './selectLanguages';

export default combineReducers({
  dictionaries,
  selectLanguages,
});
