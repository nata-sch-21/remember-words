import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../../config';

const DictionaryItem = props => (
  <div className="block-item">
    <div className="wrapper no-back">
      <div className="row">
        <div className="col-6">
          <h3>
            {props.dictionary.translations[config.defaultLanguage]}
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-6 green">
          <Link to={`/dictionaries/${props.dictionary._id}`}>Go to dictionary</Link>
        </div>
      </div>
    </div>
  </div>
);

DictionaryItem.propTypes = {
  dictionary: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    translations: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DictionaryItem;
