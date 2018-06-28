import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './stores/configureStore';
import Router from './routes';

import '../styles/index.scss';

const store = configureStore();

const render = (NextRouter) => {
  try {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <div className="wrapper">
            <NextRouter />
          </div>
        </Provider>
      </AppContainer>,
      document.getElementById('app'),
    );
  } catch (err) {
    console.error(err);
  }
};


if (module.hot) {
  module.hot.accept('./routes', () => {
    System.import('./routes').then(({ default: NextRouter }) => render(NextRouter)); // eslint-disable-line
  });
}

render(Router);
