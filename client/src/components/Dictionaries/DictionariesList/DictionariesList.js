import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import DictionaryItem from '../../DictionaryItem';
import { requestGetDictionaries } from '../../../actions/dictionaries';

class Dictionaries extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestGetDictionaries());
  }

  render() {
    if (!this.props.language) {
      return <Redirect to="/start" push />;
    }

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
}

Dictionaries.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  language: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Dictionaries;