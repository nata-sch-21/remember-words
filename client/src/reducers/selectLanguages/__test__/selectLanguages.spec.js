// import dictionariesReducer, { initialState } from '../';
// import { fetchDictionaries, errorFetchDictionaries, successFetchDictionaries } from '../../../actions/dictionaries';
// import { dictionaries } from '../../../../test/testData';
// import { STATUS_ERROR, STATUS_OK } from '../../../constants/app';

// check if state wasn't change
describe('Reducer dictionaries', () => {
  // it('it should return initial state', () => {
  //   const newState = dictionariesReducer(undefined, {});
  //   expect(newState).toEqual(initialState);
  // });
  //
  // it('should react to an action with the type FETCH_DICTIONARIES and return isFetching true', () => {
  //   const newState = dictionariesReducer(undefined, fetchDictionaries());
  //   expect(newState).toEqual({ ...initialState, isFetching: true });
  // });
  //
  // it('should react to an action with the type FETCH_DICTIONARIES_SUCCESS and pass on the dictionaries we pass in', () => {
  //   const newState = dictionariesReducer(undefined, successFetchDictionaries({
  //     dictionaries,
  //   }));
  //   expect(newState).toEqual({
  //     ...initialState,
  //     dictionaries,
  //     response: {
  //       status: STATUS_OK,
  //       message: '',
  //     },
  //   });
  // });
  //
  // it('should react to an action with the type FETCH_DICTIONARIES_ERROR and pass on the error message we pass in', () => {
  //   const message = 'error message';
  //   const newState = dictionariesReducer(undefined, errorFetchDictionaries({
  //     message,
  //   }));
  //   expect(newState).toEqual({
  //     ...initialState,
  //     response: {
  //       status: STATUS_ERROR,
  //       message,
  //     },
  //   });
  // });
});
