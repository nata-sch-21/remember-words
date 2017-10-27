import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from '../components/Home'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={Home}/>
    </Switch>
  </BrowserRouter>
);

export default Router;