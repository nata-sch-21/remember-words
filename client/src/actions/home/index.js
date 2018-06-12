import { createAction } from 'redux-actions';
import Api from '../../services/Api';

import {
  FETCH_BEST_RESULTS,
} from '../../constants';

const fetchBestResults = createAction(FETCH_BEST_RESULTS, async () => {
  const result = await Api.getRequest('results');
  return result;
});


export default fetchBestResults;
