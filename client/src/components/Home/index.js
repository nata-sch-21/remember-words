import { connect } from 'react-redux';
import Home from './Home';
import fetchBestResults from '../../actions/home';
import { homeSelector } from '../../reducers/home';

const mapStateToProps = state => ({
  ...homeSelector(state),
});

const mapDispatchToProps = dispatch => ({
  requestBestResults: () => dispatch(fetchBestResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
