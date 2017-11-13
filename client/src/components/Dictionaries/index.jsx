import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import DictionaryItem from './DictionaryItem';

class Dictionaries extends React.Component {
  renderDictionaryItems() {
    return (
      <div className="block">
        {this.props.dictionaries.map(item => <DictionaryItem key={item._id} dictionary={item} />)}
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.dictionaries.length === 0 ? <Loader /> : this.renderDictionaryItems()}
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
