import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import config from '../../../../config';
import SELECT_LANGUAGES from '../../../constants/languages';
import { initialState } from '../../../reducers/languages';
import selectLanguages from '../';

const mockStore = configureMockStore([thunk]);

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
      { type: SELECT_LANGUAGES, payload: { ...data } },
    ];

    store.dispatch(selectLanguages(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
