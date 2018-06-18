import { branch, renderComponent } from 'recompose';
import Loader from '../Loader';

export default branch(
  props => !props.response.status,
  renderComponent(Loader),
);
