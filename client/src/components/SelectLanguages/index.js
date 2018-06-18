import { nest } from 'recompose';
import SelectLanguages from './SelectLanguages';
import PageWrapper from '../PageWrapper';

export default nest(PageWrapper, SelectLanguages);
