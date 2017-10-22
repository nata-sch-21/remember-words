import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                </Switch>
            </div>
        );
    }
}
