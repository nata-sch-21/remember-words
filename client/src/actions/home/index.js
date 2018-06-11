import { createAction } from 'redux-actions';
import Api from '../../services/Api';

import {
  FETCH_BEST_RESULTS,
} from '../../constants';

const fetchBestResults = createAction(FETCH_BEST_RESULTS, async () => {
  const json = await Api.getRequest('results');
  return json;
});


export default fetchBestResults;
