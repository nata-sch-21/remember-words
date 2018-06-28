import { connect } from 'react-redux';
import { compose } from 'recompose';
import SaveButton from './SaveButton';
import { uploadResult } from '../../../actions/results';
import { resultsSelector } from '../../../reducers/results';

const mapStateToProps = state => resultsSelector(state).uploadResult;

const mapDispatchToProps = (dispatch, props) => ({
  uploadResult: () => {
    dispatch(uploadResult(props.answerData));
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SaveButton);
