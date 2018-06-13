import React from 'react';
import { Link } from 'react-router-dom';
import { string, shape, arrayOf, object } from 'prop-types';
import Header from '../Header';
import Error from '../Error';
import BestResultsList from '../BestResults/BestResultsList';
import { STATUS_ERROR } from '../../constants';

const getContent = (response, bestResults) => {
  const {
    status,
    message,
  } = response;

  if (!status) {
    return null;
  }

  return status === STATUS_ERROR
    ? <Error message={message} />
    : <BestResultsList bestResults={bestResults} />;
};

const Home = ({ response, bestResults }) => (
  <div className="grid-1">
    <Header header="Let's remember the words" />
    <div className="col block green button-text margin-bottom_20">
      <Link to="/start">Start</Link>
    </div>
    <div className="col block">
      <h3>Best results</h3>
      {getContent(response, bestResults)}
    </div>
  </div>
);

Home.propTypes = {
  bestResults: arrayOf(object).isRequired,
  response: shape({
    status: string,
    message: string,
  }).isRequired,
};

export default Home;
