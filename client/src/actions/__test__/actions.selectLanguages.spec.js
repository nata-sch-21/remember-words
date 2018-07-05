import config from '../../../config/app.config';
import { mockStore } from '../../../test/testData';
import { SELECT_LANGUAGE } from '../../constants';
import { initialState } from '../../reducers/languages';
import selectLanguages from '../languages';

describe('selectLanguages() action creator', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ ...initialState });
  });

  it('should return correct action and data on dispatch selectLanguages', () => {
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
