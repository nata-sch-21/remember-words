import isFetching from '../../HOCs/isFetching';
import isError from '../../HOCs/isError';
import BestResultsList from './BestResultsList';

export default isFetching(isError(BestResultsList));
