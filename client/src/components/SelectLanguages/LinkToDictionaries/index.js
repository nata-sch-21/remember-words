import { connect } from 'react-redux';
import LinkToDictionaries from './LinkToDictionaries';
import selectLanguages from '../../../actions/languages';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, props) => ({
  goToDictionaries: () => {
    props.history.push('/dictionaries');
    dispatch(selectLanguages(props.languages));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkToDictionaries);
