import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { requestGetDictionaries } from '../../actions/dictionaries';
import { STATUS_ERROR } from '../../constants/app';
import config from '../../../config';

class WordsList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(requestGetDictionaries());
  }

  renderHeader() {
    return (
      <div className="row">
        <div className="col-12">
          <h2>{this.props.currentDictionary[config.defaultLanguage]}</h2>
        </div>
      </div>
    );
  }

  // renderDictionaryItems() {
    // return (
    //   <div className="block">
    //      {this.props.dictionaries.map(item => <DictionaryItem key={item._id} dictionary={item} />)}
    //   </div>
    // );
  // }

  render() {
    if (!this.props.response.status && this.props.isFetching === false) {
      return <div className="wrapper">{this.renderHeader()}</div>;
    }

    if (this.props.response.status === STATUS_ERROR) {
      return <div className="wrapper"><h2 className="red">{this.props.response.message}</h2></div>;
    }

    return (
      <div className="wrapper">
          <div className="row"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.dictionaries;
  return {
    words: currentState.words || [],
    isFetching: currentState.isFetching || false,
    response: currentState.response || {},
    currentDictionary: currentState.currentDictionary || {},
  };
};

WordsList.propTypes = {
  // words: PropTypes.arrayOf(PropTypes.object).isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // response: PropTypes.shape({
  //   status: PropTypes.string,
  //   message: PropTypes.string,
  // }).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export { WordsList };
export default connect(mapStateToProps)(WordsList);
