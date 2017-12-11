import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header';
import ResultsItem from '../ResultsItem';
import { STATUS_ERROR, STATUS_OK } from '../../constants/app';
import { saveResult } from '../../actions/results';

class Results extends React.Component {
  constructor() {
    super();

    this.saveResult = () => {
      this.props.dispatch(saveResult());
    };
  }

  renderResultItems() {
    return (
      <div className="col block results text-left">
        <div className="grid-1 pure-block">
          <div className="col">
            <div className="grid-3">
              <div className="col head-table">Word</div>
              <div className="col head-table">Translation</div>
              <div className="col head-table">Answer</div>
            </div>
          </div>
          {this.props.result.map((item, key) => (<ResultsItem key={key} result={item} />))}
        </div>
      </div>
    );
  }

  renderSaveResultButton() {
    const { response, isFetching } = this.props.saving;

    let saveSpan = (<span onClick={this.saveResult}>Save result</span>);
    let buttonState = 'yellow';

    if (isFetching) {
      saveSpan = (<span>Saving...</span>);
    } else if (!isFetching && response.status === STATUS_OK) {
      saveSpan = (<span>{response.message}</span>);
      buttonState = 'inactive-button';
    } else if (!isFetching && response.status === STATUS_ERROR) {
      saveSpan = (<span onClick={this.saveResult}>{response.message}</span>);
    }

    return (
      <div className="col">
        <div className={`block button-text ${buttonState}`}>
          {saveSpan}
        </div>
      </div>
    );
  }

  renderContent() {
    if (!this.props.response.status) {
      return null;
    }

    if (this.props.response.status === STATUS_ERROR) {
      return this.renderError();
    }

    return this.renderResultItems();
  }

  render() {
    return (
      <div className="grid-1">
        <Header header="Results" />
        {this.renderContent()}
        <div className="col block">
          <div className="grid-2">
            <div className="col">
              <div className="block button-text red">
                <Link to="/">Out</Link>
              </div>
            </div>
            {this.renderSaveResultButton()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.results;
  return { ...currentState };
};

Results.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  saving: PropTypes.shape({
    response: PropTypes.shape({
      status: PropTypes.string,
      message: PropTypes.string,
    }),
    isFetching: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export { Results };
export default connect(mapStateToProps)(Results);
