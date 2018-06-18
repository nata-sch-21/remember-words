import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../config/app.config';

const LanguageSelector = ({
  id, selectedLanguage,
  excludedLanguage,
  handleOnChangeLanguage,
}) => (
  <select name={id} id={id} value={selectedLanguage} onChange={handleOnChangeLanguage}>
    <option value="">Select language</option>
    {
      config.availableLanguages.map((lang) => {
        if (lang === excludedLanguage) {
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

LanguageSelector.propTypes = {
  id: PropTypes.string.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  excludedLanguage: PropTypes.string.isRequired,
  handleOnChangeLanguage: PropTypes.func.isRequired,
};

export default LanguageSelector;
