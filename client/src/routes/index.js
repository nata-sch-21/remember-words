import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import routes from './routes';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      {
        Object.keys(routes).map(key => (
          <Route
            key={routes[key].path}
            exact
            path={routes[key].path}
            component={routes[key].component}
          />
        ))
      }
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
);

export default Router;
