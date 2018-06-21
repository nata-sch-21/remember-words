import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import DictionaryItem from '../DictionariesItem';

const DictionariesList = ({ language, dictionaries }) => (
  !language
    ? <Redirect to="/start" push />
    : (
      <div className="col block">
        <div className="grid-4">
          {
            dictionaries.map(item => (<DictionaryItem
              key={item._id}
              dictionary={item}
              language={language}
            />))
          }
        </div>
      </div>
    )
);

DictionariesList.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  language: PropTypes.string.isRequired,
};

export default DictionariesList;
