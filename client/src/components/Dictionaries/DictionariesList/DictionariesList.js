import React from 'react';
import PropTypes from 'prop-types';
import DictionaryItem from '../DictionariesItem';

const DictionariesList = ({ languageFrom, dictionaries }) => (
  <div className="col block">
    <div className="grid-4">
      {
        dictionaries.map(item => (<DictionaryItem
          key={item._id}
          dictionary={item}
          languageFrom={languageFrom}
        />))
      }
    </div>
  </div>
);

DictionariesList.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  languageFrom: PropTypes.string.isRequired,
};


export default DictionariesList;
