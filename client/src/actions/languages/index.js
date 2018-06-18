import { createAction } from 'redux-actions';
import { SELECT_LANGUAGE } from '../../constants';

const selectLanguages = createAction(SELECT_LANGUAGE, data => data);

export default selectLanguages;
