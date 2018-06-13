import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../../config/app.config';
import selectLanguages from '../../actions/languages';
import Header from '../Header';

class SelectLanguages extends React.Component {
  constructor() {
    super();

    this.handleOnChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };

    this.goToDictionaries = () => {
      if (this.state.languageTo && this.state.languageFrom) {
        this.props.dispatch(selectLanguages({ ...this.state }));
        this.props.history.push('/dictionaries');
      }
    };
  }

  state = {
    languageFrom: '',
    languageTo: '',
  };

  componentWillMount() {
    this.setState({
      languageFrom: this.props.languageFrom,
      languageTo: this.props.languageTo,
    });
  }

  renderLinkToDictionaties() {
    let classButton = 'inactive-button';
    let textButton = 'Please select both languages';

    if (this.state.languageTo && this.state.languageFrom) {
      textButton = 'Go to dictionaries';
      classButton = 'green';
    }

    return (
      <div className={`col block ${classButton} button-text`} onClick={this.goToDictionaries}>
        <span>{textButton}</span>
      </div>
    );
  }

  renderSelectLanguageFrom() {
    return (
      <select name="languageFrom" id="languageFrom" value={this.state.languageFrom} onChange={this.handleOnChange}>
        <option value="">Select language</option>
        {
          config.availableLanguages.map((lang) => {
            if (lang === this.state.languageTo) {
              return null;
            }
            return (
              <option key={lang} value={lang}>
                {config.languageTitles[lang]}
              </option>
            );
          })
        }
      </select>
    );
  }

  renderSelectLanguageTo() {
    return (
      <select name="languageTo" id="languageTo" value={this.state.languageTo} onChange={this.handleOnChange}>
        <option value="">Select language</option>
        {
          config.availableLanguages.map((lang) => {
            if (lang === this.state.languageFrom) {
              return null;
            }
            return (
              <option key={lang} value={lang}>
                {config.languageTitles[lang]}
              </option>
            );
          })
        }
      </select>
    );
  }

  render() {
    return (
      <div className="grid-1">
        <Header header="Select languages" />
        <div className="col-6 block margin-bottom_20">
          <h3>From:</h3>
          {this.renderSelectLanguageFrom()}
        </div>
        <div className="col-6 block margin-bottom_20">
          <h3>To:</h3>
          {this.renderSelectLanguageTo()}
        </div>
        {this.renderLinkToDictionaties()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentState = state.languages;
  return { ...currentState };
};

SelectLanguages.propTypes = {
  languageFrom: PropTypes.string.isRequired,
  languageTo: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export { SelectLanguages };
export default connect(mapStateToProps)(SelectLanguages);
