import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import DictionaryItem from './DictionaryItem';
import { requestGetDictionaries } from '../../actions/dictionaries';

class Dictionaries extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestGetDictionaries());
  }

  renderDictionaryItems() {
    return (
      <div className="block">
        {this.props.dictionaries.map(item => <DictionaryItem key={item._id} dictionary={item} />)}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className="row">
        <div className="col-12">
          <h2>Dictionaries</h2>
        </div>
      </div>
    );
  }

  renderContent() {
    if (!this.props.response.status) {
      return this.renderHeader();
    }

    return (
      <div className="wrapper">
        {this.renderHeader()}
        {this.props.isFetching === true ? <Loader /> : this.renderDictionaryItems()}
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.dictionaries;
  return {
    dictionaries: currentState.dictionaries || [],
    isFetching: currentState.isFetching || false,
    response: currentState.response || null,
  };
};

Dictionaries.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export { Dictionaries };
export default connect(mapStateToProps)(Dictionaries);
