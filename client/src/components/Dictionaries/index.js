import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Loader from '../Loader';
import Header from '../Header';
import Error from '../Error';
import DictionaryItem from '../DictionaryItem';
import { requestGetDictionaries } from '../../actions/dictionaries';
import { STATUS_ERROR } from '../../constants';

class Dictionaries extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestGetDictionaries());
  }

  renderDictionaryItems() {
    return (
      <div className="col block">
        <div className="grid-4">
          {this.props.dictionaries.map(item => (<DictionaryItem
            key={item._id}
            dictionary={item}
            language={this.props.language}
          />))}
        </div>
      </div>
    );
  }

  renderContent() {
    const {
      status,
      message,
    } = this.props.response;

    if (!status && this.props.isFetching === false) {
      return null;
    }

    if (status === STATUS_ERROR) {
      return <Error message={message} />;
    }

    if (this.props.isFetching === true) {
      return <Loader />;
    }

    return this.renderDictionaryItems();
  }

  render() {
    if (!this.props.language) {
      return <Redirect to="/start" push />;
    }

    return (
      <div className="grid-1">
        <Header header="Dictionaries" />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.dictionaries;
  return {
    dictionaries: currentState.dictionaries,
    isFetching: currentState.isFetching,
    response: currentState.response,
    language: state.languages.languageFrom,
  };
};

Dictionaries.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  language: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export { Dictionaries };
export default connect(mapStateToProps)(Dictionaries);
