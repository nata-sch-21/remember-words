import React, { Fragment } from 'react';
import { func, string } from 'prop-types';
import { compose, withStateHandlers, setDisplayName } from 'recompose';
import LanguageSelector from '../LanguageSelector';
import LinkToDictionaries from '../LinkToDictionaries';

const propTypes = {
  goToDictionaries: func.isRequired,
  onChangeLanguageFrom: func.isRequired,
  onChangeLanguageTo: func.isRequired,
  languageFrom: string.isRequired,
  languageTo: string.isRequired,
};

const SelectLanguages = ({
  onChangeLanguageFrom, onChangeLanguageTo, languageFrom, languageTo, goToDictionaries,
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
      goToDictionaries={() => goToDictionaries({ languageFrom, languageTo })}
    />
  </Fragment>
);

SelectLanguages.propTypes = propTypes;

export default compose(
  setDisplayName('EnhancedSelectLanguages'),
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
)(SelectLanguages);
