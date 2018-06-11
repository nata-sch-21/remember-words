import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers/index';

const middleware = [thunk, reduxPromise];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
