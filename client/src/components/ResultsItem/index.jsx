import React from 'react';
import PropTypes from 'prop-types';

const ResultsItem = props => (
  <div className="col">
    <p><span className="label">Word:</span> <span className="value"> {props.result.fromWord} - </span></p>
    <p><span className="label">Translation:</span> <span className="value"> {props.result.toWord} - </span></p>
    <p><span className="label">Answer:</span> <span className={`value text-type-${props.result.status}`}> {props.result.answer}</span></p>
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
