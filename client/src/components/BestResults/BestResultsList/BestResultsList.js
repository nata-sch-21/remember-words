import React from 'react';
import { arrayOf, object } from 'prop-types';
import { branch, renderComponent } from 'recompose';
import BestResultsItem from '../BestResultsItem';

const Aux = props => props.children;

const BestResultsList = ({ bestResults }) => (
  <div className="col">
    <div className="col block">
      <div className="grid-2">
        <Aux>
          <div className="col head-table">Dictionary name</div>
          <div className="col head-table">Correct answers / Number of words</div>
        </Aux>
        {bestResults.map(item => (<BestResultsItem key={item._id} item={item} />))}
      </div>
    </div>
  </div>
);

BestResultsList.propTypes = {
  bestResults: arrayOf(object).isRequired,
};

const EmptyBestResults = () => <div className="col block cell-table">There is no results yet</div>;

export default branch(
  ({ bestResults }) => bestResults.length === 0,
  renderComponent(EmptyBestResults),
)(BestResultsList);
