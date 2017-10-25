import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './stores/configureStore';
import App from './components/App';

require('../styles/index.scss');

const store = configureStore();

const appContainer = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  appContainer
);

if (module.hot) {
  module.hot.accept();
}
