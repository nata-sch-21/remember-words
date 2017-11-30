import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import config from '../../../../config';
import SELECT_LANGUAGES from '../../../constants/selectLanguages';
import { initialState } from '../../../reducers/selectLanguages';
import selectLanguages from '../';

const mockStore = configureMockStore([thunk]);

describe('selectLanguage action', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ ...initialState });
  });

  it('should dispatch correct action and pass on the data we pass in', () => {
    const data = {

    };
    // const expectedActions = [
    //   { type: FETCH_DICTIONARIES },
    //   { type: FETCH_DICTIONARIES_SUCCESS, dictionaries },
    // ];
    //
    // await store.dispatch(requestGetDictionaries());
    // expect(store.getActions()).toEqual(expectedActions);
  });
});
