import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// export for tests
export const Home = () => (
  <div>
    <div>Home</div>
    <Link to="/dictionaries">Start</Link>
  </div>
);

const mapStateToProps = (state) => {
  const newState = state.toString();
  return {
    newData: newState,
  };
};

// connect redux
export default connect(mapStateToProps)(Home);
