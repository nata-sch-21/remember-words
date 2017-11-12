import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// export for tests
export const Home = () => (
  <div className="wrapper no-back">
    <div className="row">
      <div className="col-6">
        <h2>
          Let&apos;s remember the words
        </h2>
      </div>
    </div>
    <div className="row">
      <div className="col-6 green">
        <Link to="/dictionaries">Start</Link>
      </div>
    </div>
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
