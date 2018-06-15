import { connect } from 'react-redux';
import { compose, lifecycle, setPropTypes, setDisplayName, nest } from 'recompose';
import { string, shape, arrayOf, object, func } from 'prop-types';
import Home from './Home';
import PageWrapper from '../PageWrapper';
import fetchBestResults from '../../actions/home';
import { homeSelector } from '../../reducers/home';

const mapStateToProps = state => ({
  ...homeSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBestResults: () => dispatch(fetchBestResults()),
});

const propTypes = {
  bestResults: arrayOf(object).isRequired,
  response: shape({
    status: string,
    message: string,
  }).isRequired,
  fetchBestResults: func.isRequired,
};

const HomeContainer = nest(PageWrapper, compose(
  setDisplayName('HomeContainer'),
  connect(mapStateToProps, mapDispatchToProps),
  setPropTypes(propTypes),
  lifecycle({
    componentDidMount() {
      this.props.fetchBestResults();
    },
  }),
)(Home));

export default HomeContainer;

