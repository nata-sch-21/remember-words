import { connect } from 'react-redux';
import { compose, lifecycle, setDisplayName, nest } from 'recompose';
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

export default nest(PageWrapper, compose(
  setDisplayName('HomeContainer'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchBestResults();
    },
  }),
)(Home));

