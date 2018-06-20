import { nest } from 'recompose';
import DictionariesList from './DictionariesList';
import PageWrapper from '../PageWrapper';

export default nest(PageWrapper, DictionariesList);
