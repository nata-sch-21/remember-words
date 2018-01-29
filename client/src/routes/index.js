import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Home from '../components/Home';
import SelectLanguages from '../components/SelectLanguages';
import Dictionaries from '../components/Dictionaries';
import WordsList from '../components/WordsList';
import Results from '../components/Results';
import NotFound from '../components/NotFound';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/start" component={SelectLanguages} />
      <Route exact path="/dictionaries" component={Dictionaries} />
      <Route exact path="/dictionaries/:id" component={WordsList} />
      <Route exact path="/results" component={Results} />
      <Route exact path="/404" component={NotFound} />

      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
);

export default Router;
