import SELECT_LANGUAGES from '../../constants/languages';

const selectLanguages = data => ({ payload: { ...data }, type: SELECT_LANGUAGES });

export default selectLanguages;
