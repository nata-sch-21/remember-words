import { nest } from 'recompose';
import WordsSpace from './WordsSpace';
import PageWrapper from '../PageWrapper';

export default nest(PageWrapper, WordsSpace);
