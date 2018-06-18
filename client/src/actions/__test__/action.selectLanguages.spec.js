import config from '../../../config/app.config';
import { mockStore } from '../../../test/testData';
import { SELECT_LANGUAGE } from '../../constants';
import { initialState } from '../../reducers/languages';
import selectLanguages from '../languages';

describe('selectLanguage action', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ ...initialState });
  });

  it('should dispatch correct action and pass on the data we pass in', () => {
    const data = {
      languageFrom: config.availableLanguages[0],
      languageTo: config.availableLanguages[1],
    };

    const expectedActions = [
      { type: SELECT_LANGUAGE, payload: { ...data } },
    ];

    store.dispatch(selectLanguages(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
