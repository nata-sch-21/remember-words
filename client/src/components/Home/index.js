import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestBestResults } from '../../actions/home';
import Loader from '../Loader';
import Header from '../Header';
import { STATUS_ERROR } from '../../constants';

class Home extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestBestResults());
  }

  renderError() {
    return (
      <div className="col block red">
        <h3>{this.props.response.message}</h3>
      </div>
    );
  }

  renderBestResultsItems() {
    const { bestResults } = this.props;

    if (bestResults.length === 0) {
      return <div className="col block cell-table">There is noe results yet</div>;
    }

    return (
      <div className="col block">
        <div className="grid-2">
          {[
            <div className="col head-table" key="dictionaryName">Dictionary name</div>,
            <div className="col head-table" key="countWords">Correct answers / Number of words</div>,
          ]}
          {bestResults.map(item =>
            [
              <div className="col cell-table" key={`${item._id}-dictionaryName`}>{item.dictionaryName}</div>,
              <div className="col cell-table" key={`${item._id}-countWords`}>{`${item.countCorrectAnswers}/${item.countWords}`}</div>,
            ])}
        </div>
      </div>
    );
  }

  renderContent() {
    if (!this.props.response.status && this.props.isFetching === false) {
      return null;
    }

    if (this.props.response.status === STATUS_ERROR) {
      return this.renderError();
    }

    if (this.props.isFetching === true) {
      return <Loader />;
    }

    return this.renderBestResultsItems();
  }

  render() {
    return (
      <div className="grid-1">
        <Header header="Let's remember the words" />
        <div className="col block green button-text margin-bottom_20">
          <Link to="/start">Start</Link>
        </div>
        <div className="col block">
          <h3>Best results</h3>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { home } = state;
  return { ...home };
};

Home.propTypes = {
  bestResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export { Home };
export default connect(mapStateToProps)(Home);
