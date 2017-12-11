import React from 'react';
import PropTypes from 'prop-types';

const ResultsItem = props => (
  <div className="col">
    <div className="grid-3">
      <div className="col cell-table"> {props.result.fromWord}</div>
      <div className="col cell-table">{props.result.toWord}</div>
      <div className={`col cell-table text-type-${props.result.status}`}>{props.result.answer}</div>
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
