import { branch, renderNothing } from 'recompose';

export default branch(
  props => !props.response.status,
  renderNothing,
);
