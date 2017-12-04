import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';
import Header from '../Header';
import DictionaryItem from './DictionaryItem';
import { requestGetDictionaries } from '../../actions/dictionaries';
import { STATUS_ERROR } from '../../constants/app';
import config from '../../../config';

class Dictionaries extends React.Component {
  constructor() {
    super();

    this.header = (
      <header className="row">
        <div className="col-12">
          <h2>Dictionaries</h2>
        </div>
      </header>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestGetDictionaries());
  }

  renderError() {
    return (
      <div className="col block red">
        <h3 className="red">{this.props.response.message}</h3>
      </div>
    );
  }

  renderDictionaryItems() {
    return (
      <div className="col block">
        <div className="grid-5">
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
    if (!this.props.response.status && this.props.isFetching === false) {
      return null;
    }

    if (this.props.response.status === STATUS_ERROR) {
      return this.renderError();
    }

    if (this.props.isFetching === true) {
      return <Loader />;
    }

    return this.renderDictionaryItems();
  }

  render() {
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
    language: state.languages.languageFrom || config.defaultLanguage,
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
