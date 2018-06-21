import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DictionaryItem = ({ dictionary, language }) => (
  <div className="col">
    <div className="block">
      <h3>
        {dictionary.translations[language]}
      </h3>
      <div className="block green button-text">
        <Link to={`/dictionaries/${dictionary._id}`}>Go to dictionary</Link>
      </div>
    </div>
  </div>
);

DictionaryItem.propTypes = {
  dictionary: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    translations: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default DictionaryItem;
