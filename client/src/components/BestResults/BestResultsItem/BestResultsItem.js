import React from 'react';
import { string, shape, number } from 'prop-types';

const BestResultsItem = ({ item }) => [
  <div className="col cell-table" key="dictionaryName">
    {item.dictionaryName}
  </div>,
  <div className="col cell-table" key="countWords">
    {`${item.countCorrectAnswers}/${item.countWords}`}
  </div>,
];

BestResultsItem.propTypes = {
  item: shape({
    dictionaryName: string,
    countCorrectAnswers: number,
    countWords: number,
  }).isRequired,
};

export default BestResultsItem;
