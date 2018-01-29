import languagesReducer, { initialState } from '../languages';
import SELECT_LANGUAGE from '../../constants/languages';
import config from '../../../config/app.config';

describe('Reducer languages', () => {
  it('it should return initial state', () => {
    const newState = languagesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should react to an action with the type SELECT_LANGUAGE and pass on the dictionaries we pass in', () => {
    const data = {
      languageFrom: config.availableLanguages[0],
      languageTo: config.availableLanguages[1],
    };

    const newState = languagesReducer(deepFreeze(initialState), {
      payload: data,
      type: SELECT_LANGUAGE,
    });

    expect(newState).toEqual({
      languageFrom: data.languageFrom,
      languageTo: data.languageTo,
    });
  });
});
