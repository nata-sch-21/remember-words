import { createAction } from 'redux-actions';
import Api from '../../services/Api';

import { FETCH_DICTIONARY_WITH_WORDS } from '../../constants';

const fetchDictionaryWithWords = createAction(FETCH_DICTIONARY_WITH_WORDS, async (id) => {
  const result = await Api.getRequest(`dictionaries/${id}`);
  return result;
});

export default fetchDictionaryWithWords;
