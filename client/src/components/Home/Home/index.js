import { connect } from 'react-redux';
import { compose, lifecycle, setDisplayName } from 'recompose';
import Home from './Home';
import fetchBestResults from '../../../actions/home';
import { homeSelector } from '../../../reducers/home';

const mapStateToProps = state => homeSelector(state);

const mapDispatchToProps = dispatch => ({
  fetchBestResults: () => dispatch(fetchBestResults()),
});

export default compose(
  setDisplayName('HomeContainer'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.fetchBestResults();
    },
  }),
)(Home);
