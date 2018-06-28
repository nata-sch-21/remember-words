import { nest } from 'recompose';
import ResultsList from './ResultsList';
import PageWrapper from '../PageWrapper';

export default nest(PageWrapper, ResultsList);
