import { createAction } from 'redux-actions';

import Api from '../../services/Api';
import { FETCH_DICTIONARIES } from '../../constants';

const fetchDictionaries = createAction(FETCH_DICTIONARIES, async () => {
  const result = await Api.getRequest('dictionaries');
  return result;
});

export default fetchDictionaries;
