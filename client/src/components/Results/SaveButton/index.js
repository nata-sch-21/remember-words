import { connect } from 'react-redux';
import SaveButton from './SaveButton';
import { uploadResult } from '../../../actions/results';
import { uploadResultSelector } from '../../../reducers/results';

const mapStateToProps = state => uploadResultSelector(state);

const mapDispatchToProps = dispatch => ({
  uploadResult: (answerData) => {
    dispatch(uploadResult(answerData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
