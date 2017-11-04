import React from 'react';
import { connect } from 'react-redux';

// export for tests
export class Home extends React.Component {
  render() {
    return (
      <div>
                Home
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const newState = state.toString();
  return {
    newData: newState,
  };
};

// connect redux
export default connect(mapStateToProps)(Home);
