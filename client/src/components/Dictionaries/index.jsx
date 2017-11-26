import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import DictionaryItem from './DictionaryItem';
import { requestGetDictionaries } from '../../actions/dictionaries';
import { STATUS_ERROR } from '../../constants/app';

class Dictionaries extends React.Component {
  constructor() {
    super();

    this.header = (
      <div className="row">
        <div className="col-12">
          <h2>Dictionaries</h2>
        </div>
      </div>
    );
  }

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

  render() {
    if (!this.props.response.status && this.props.isFetching === false) {
      return <div className="wrapper">{this.header}</div>;
    }

    if (this.props.response.status === STATUS_ERROR) {
      return <div className="wrapper"><h2 className="red">{this.props.response.message}</h2></div>;
    }

    return (
      <div className="wrapper">
        {this.header}
        {this.props.isFetching === true ? <Loader /> : this.renderDictionaryItems()}
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
