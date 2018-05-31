import { SELECT_LANGUAGE } from '../../constants';

const selectLanguages = data => ({ payload: { ...data }, type: SELECT_LANGUAGE });

export default selectLanguages;
