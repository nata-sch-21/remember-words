import { branch, renderNothing } from 'recompose';
import Word from './Word';

export default branch(
  ({ title }) => !title,
  renderNothing,
)(Word);
