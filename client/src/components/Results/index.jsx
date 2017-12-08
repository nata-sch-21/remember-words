import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header';
import ResultsItem from '../ResultsItem';
import { STATUS_ERROR } from '../../constants/app';
import { saveResult } from '../../actions/results';

class Results extends React.Component {
  constructor() {
    super();

    this.saveResult = () => {
      this.props.dispatch(saveResult(this.props.countCorrectAnswer));
    };
  }

  renderResultItems() {
    return (
      <div className="col block results text-left">
        <div className="grid-1">
          {this.props.result.map((item, key) => (<ResultsItem key={key} result={item} />))}
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
          <div className="grid-3">
            <div className="col">
              <div className="block button-text red">
                <Link to="/">Out</Link>
              </div>
            </div>
            <div className="col">
              <div className="block button-text yellow">
                <span onClick={this.saveResult}>Best results</span>
              </div>
            </div>
            <div className="col">
              <div className="block button-text blue">
                <span onClick={this.saveResult}>Save result</span>
              </div>
            </div>
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
  dispatch: PropTypes.func.isRequired,
  countCorrectAnswer: PropTypes.string.isRequired,
};

export { Results };
export default connect(mapStateToProps)(Results);
