import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LanguageSelector from '../LanguageSelector';

const Aux = props => props.children;

class SelectLanguages extends Component {
  constructor() {
    super();

    this.handleOnChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };

    this.goToDictionaries = () => {
      if (this.state.languageTo && this.state.languageFrom) {
        this.props.selectLanguages({ ...this.state });
        this.props.goTo('/dictionaries');
      }
    };
  }

  state = {
    languageFrom: '',
    languageTo: '',
  };

  renderLinkToDictionaries() {
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

  render() {
    return (
      <Aux>
        <div className="col-6 block margin-bottom_20">
          <h3>From:</h3>
          <LanguageSelector
            id="languageFrom"
            selectedLanguage={this.state.languageFrom}
            excludedLanguage={this.state.languageTo}
            handleOnChangeLanguage={this.handleOnChange}
          />
        </div>
        <div className="col-6 block margin-bottom_20">
          <h3>To:</h3>
          <LanguageSelector
            id="languageTo"
            selectedLanguage={this.state.languageTo}
            excludedLanguage={this.state.languageFrom}
            handleOnChangeLanguage={this.handleOnChange}
          />
        </div>
        {this.renderLinkToDictionaries()}
      </Aux>
    );
  }
}

SelectLanguages.propTypes = {
  selectLanguages: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
};

export default SelectLanguages;

