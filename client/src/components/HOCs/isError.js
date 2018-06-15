import { branch, renderComponent } from 'recompose';
import Error from '../Error';
import { STATUS_ERROR } from '../../constants';

export default branch(
  ({ response: { status } }) => status && status === STATUS_ERROR,
  renderComponent(Error),
);
