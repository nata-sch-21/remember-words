import { branch, renderNothing } from 'recompose';
import Word from './Word';

export default branch(
  ({ currentWordIndex }) => currentWordIndex === null,
  renderNothing,
)(Word);
