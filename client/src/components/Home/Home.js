import React from 'react';
import { Link } from 'react-router-dom';
import { string, shape, arrayOf, object } from 'prop-types';
import BestResultsList from '../BestResults/BestResultsList';

const Aux = props => props.children;

const Home = ({ response, bestResults }) => (
  <Aux>
    <div className="col block green button-text margin-bottom_20">
      <Link to="/start">Start</Link>
    </div>
    <div className="col block">
      <h3>Best results</h3>
      <BestResultsList response={response} bestResults={bestResults} />
    </div>
  </Aux>
);

Home.propTypes = {
  bestResults: arrayOf(object).isRequired,
  response: shape({
    status: string,
    message: string,
  }).isRequired,
};

export default Home;
