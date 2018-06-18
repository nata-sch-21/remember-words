import { connect } from 'react-redux';
import { compose, setPropTypes, setDisplayName } from 'recompose';
import { func } from 'prop-types';
import SelectLanguages from './SelectLanguages';
import selectLanguages from '../../../actions/languages';

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch, props) => ({
  selectLanguages: data => dispatch(selectLanguages(data)),
  goTo: path => props.history.push(path),
});

const propTypes = {
  selectLanguages: func.isRequired,
  goTo: func.isRequired,
};

const SelectLanguageContainer = compose(
  setDisplayName('SelectLanguageContainer'),
  connect(mapStateToProps, mapDispatchToProps),
  setPropTypes(propTypes),
)(SelectLanguages);

export default SelectLanguageContainer;

