import React from 'react';
import PropTypes from 'prop-types';

const ResultsItem = ({ result }) => (
  <div className="col">
    <div className="grid-3">
      <div className="col cell-table"> {result.fromWord}</div>
      <div className="col cell-table">{result.toWord}</div>
      <div className={`col cell-table text-type-${result.status}`}>{result.answer}</div>
    </div>
  </div>
);

ResultsItem.propTypes = {
  result: PropTypes.shape({
    fromWord: PropTypes.string,
    toWord: PropTypes.string,
    answer: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default ResultsItem;
