import React, { Fragment } from 'react';
import { shape, func } from 'prop-types';
import { compose, withStateHandlers, setDisplayName, setPropTypes } from 'recompose';
import LanguageSelector from '../LanguageSelector';
import LinkToDictionaries from '../LinkToDictionaries';

const propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default compose(
  setDisplayName('SelectLanguages'),
  withStateHandlers(
    ({ languageFrom = '', languageTo = '' }) => ({
      languageFrom,
      languageTo,
    }),
    {
      onChangeLanguageFrom: () => e => ({
        languageFrom: e.target.value,
      }),
      onChangeLanguageTo: () => e => ({
        languageTo: e.target.value,
      }),
    },
  ),
  setPropTypes(propTypes),
)(({
  onChangeLanguageFrom,
  onChangeLanguageTo,
  languageFrom,
  languageTo,
  history,
}) => (
  <Fragment>
    <div className="col-6 block margin-bottom_20">
      <h3>From:</h3>
      <LanguageSelector
        id="languageFrom"
        selectedLanguage={languageFrom}
        excludedLanguage={languageTo}
        handleOnChangeLanguage={onChangeLanguageFrom}
      />
    </div>
    <div className="col-6 block margin-bottom_20">
      <h3>To:</h3>
      <LanguageSelector
        id="languageTo"
        selectedLanguage={languageTo}
        excludedLanguage={languageFrom}
        handleOnChangeLanguage={onChangeLanguageTo}
      />
    </div>
    <LinkToDictionaries
      enabled={languageFrom && languageTo}
      languages={{ languageFrom, languageTo }}
      history={history}
    />
  </Fragment>
));
