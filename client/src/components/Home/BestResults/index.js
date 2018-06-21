import { compose } from 'recompose';
import isFetching from '../../HOCs/isFetching';
import isError from '../../HOCs/isError';
import BestResultsList from './BestResultsList';

export default compose(
  isFetching,
  isError,
)(BestResultsList);
