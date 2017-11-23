import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import DictionaryItem from './DictionaryItem';

class Dictionaries extends React.Component {
  renderItems() {
    return (
      <div className="block">
        {this.props.dictionaries.map(item => <DictionaryItem key={item._id} dictionary={item} />)}
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-12">
            <h2>Dictionaries</h2>
          </div>
        </div>
        {this.props.dictionaries.length === 0 ? <Loader /> : this.renderItems()}
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
