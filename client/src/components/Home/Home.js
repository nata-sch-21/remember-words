import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import { STATUS_ERROR } from '../../constants';


class Home extends Component {
  componentDidMount() {
    this.props.requestBestResults();
  }

  renderError() {
    const { message } = this.props.response;

    return (
      <div className="col block red">
        <h3>{message}</h3>
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
    const { status } = this.props.response;

    if (!status) {
      return null;
    }

    if (status === STATUS_ERROR) {
      return this.renderError();
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

Home.propTypes = {
  bestResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  requestBestResults: PropTypes.func.isRequired,
};

export default Home;
