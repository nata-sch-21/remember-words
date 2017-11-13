import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from '../components/Home';
import Dictionaries from '../components/Dictionaries';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dictionaries" component={Dictionaries} />
    </Switch>
  </BrowserRouter>
);

export default Router;
