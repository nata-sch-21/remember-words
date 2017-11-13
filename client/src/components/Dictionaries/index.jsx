import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../../config';

class Dictionaries extends React.Component {
  renderDictionaryItems() {
    const lang = config.defaultLanguage;
    return (
      <div className="block">
        {this.props.dictionaries.map(item => <div className="col-12" key={item._id}>{item.translations[lang]}</div>)}
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.dictionaries.length === 0 ? <div className="loader">Loader ...</div> : this.renderDictionaryItems()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dictionaries: state.dictionaries || [],
});

Dictionaries.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { Dictionaries };
export default connect(mapStateToProps)(Dictionaries);
