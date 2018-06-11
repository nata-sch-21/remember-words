import { connect } from 'react-redux';
import Home from './Home';
import fetchBestResults from '../../actions/home';
import { getBestResults, getResponse } from '../../reducers/home';

const mapStateToProps = state => ({
  bestResults: getBestResults(state),
  response: getResponse(state),
});

const mapDispatchToProps = dispatch => ({
  requestBestResults: () => dispatch(fetchBestResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
