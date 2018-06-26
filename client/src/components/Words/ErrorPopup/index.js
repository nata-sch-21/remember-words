import { branch, renderNothing } from 'recompose';
import ErrorPopup from './ErrorPopup';

export default branch(
  ({ errorMessage }) => !errorMessage,
  renderNothing,
)(ErrorPopup);
