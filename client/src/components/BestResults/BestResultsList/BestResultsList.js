import React from 'react';
import { arrayOf, object } from 'prop-types';
import BestResultsItem from '../BestResultsItem';

const BestResultsList = ({ bestResults }) => (
  <div className="col">
    {
      bestResults.length === 0
        ? <div className="col block cell-table">There is no results yet</div>
        : (
          <div className="col block">
            <div className="grid-2">
              {[
                <div className="col head-table" key="dictionaryName">Dictionary name</div>,
                <div className="col head-table" key="countWords">Correct answers / Number of words</div>,
              ]}
              {bestResults.map(item => (<BestResultsItem key={item._id} item={item} />))}
            </div>
          </div>
        )
    }
  </div>
);

BestResultsList.propTypes = {
  bestResults: arrayOf(object).isRequired,
};

export default BestResultsList;
