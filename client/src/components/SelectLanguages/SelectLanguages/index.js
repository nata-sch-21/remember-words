import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import SelectLanguages from './SelectLanguages';
import selectLanguages from '../../../actions/languages';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, props) => ({
  goToDictionaries: (data) => {
    props.history.push('/dictionaries');
    dispatch(selectLanguages(data));
  },
  resetLanguages: () => {
    dispatch(selectLanguages({}));
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.resetLanguages();
    },
  }),
)(SelectLanguages);
