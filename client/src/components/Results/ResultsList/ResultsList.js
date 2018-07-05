import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ResultsItem from '../ResultsItem';
import SaveButton from '../SaveButton';

const ResultsList = ({ result }) => (
  <Fragment>
    <div className="col block results text-left">
      <div className="grid-1 pure-block">
        <div className="col">
          <div className="grid-3">
            <div className="col head-table">Word</div>
            <div className="col head-table">Translation</div>
            <div className="col head-table">Answer</div>
          </div>
        </div>
        {result.map(item => (<ResultsItem key={item.fromWord} result={item} />))}
      </div>
    </div>
    <div className="col block">
      <div className="grid-2">
        <div className="col">
          <div className="block button-text red">
            <Link to="/">Out</Link>
          </div>
        </div>
        <div className="col">
          <SaveButton />
        </div>
      </div>
    </div>
  </Fragment>
);

ResultsList.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResultsList;
